import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "db.json");

async function runMigration() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI is not defined in the environment. Make sure it is in your .env file.");
    process.exit(1);
  }

  if (!fs.existsSync(dbPath)) {
    console.error("Error: Local db.json not found in the workspace root.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to database cluster!");

    const db = client.db("portfolio");
    const collection = db.collection("config");

    console.log("Reading local db.json...");
    const rawData = fs.readFileSync(dbPath, "utf-8");
    const parsedData = JSON.parse(rawData);

    // Delete existing _id if present in file to prevent Mongo duplicate/immutable errors
    delete parsedData._id;

    console.log("Uploading data to MongoDB Atlas collection 'config'...");
    // Replace the single document if it exists, or insert it (upsert: true)
    const result = await collection.replaceOne({}, parsedData, { upsert: true });

    console.log("Migration complete!");
    console.log("Database Response:", result);
  } catch (error) {
    console.error("Migration failed with error:", error);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

runMigration();
