/* global process */
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

// Cache connection across serverless invocations
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("portfolio");

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("config");

    if (req.method === "GET") {
      let config = await collection.findOne({});
      
      if (!config) {
        console.log("No configuration found in MongoDB Atlas. Checking local db.json for initialization...");
        const defaultDbPath = path.join(process.cwd(), "db.json");
        
        if (fs.existsSync(defaultDbPath)) {
          const fileData = fs.readFileSync(defaultDbPath, "utf-8");
          const parsed = JSON.parse(fileData);
          delete parsed._id; // Strip potential Mongo ID field
          
          // Seed the database
          await collection.replaceOne({}, parsed, { upsert: true });
          console.log("Successfully initialized MongoDB Atlas with data from local db.json.");
          
          config = parsed;
        } else {
          return res.status(404).json({ error: "Configuration not found and local db.json fallback is missing." });
        }
      } else {
        // Strip MongoDB's internal ID so it matches the db.json structure exactly
        delete config._id;
      }

      return res.status(200).json(config);

    } else if (req.method === "POST") {
      const payload = req.body;
      if (!payload || typeof payload !== "object") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      // Strip potential Mongo ID field to prevent immutable field errors on replace
      delete payload._id;

      const result = await collection.replaceOne({}, payload, { upsert: true });
      return res.status(200).json({ success: true, result });

    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("Database connection or operation failed:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
