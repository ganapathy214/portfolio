/* global process, __dirname */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// A custom plugin to serve and update db.json
function themeApiPlugin() {
  const dbPath = path.resolve(__dirname, "db.json");

  // Ensure db.json exists with default theme if not present
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ primaryColor: "#00D5D5" }, null, 2));
  }

  return {
    name: "theme-api-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = req.url.split("?")[0];
        if (cleanUrl === "/api/theme" || cleanUrl === "/portfolio/api/theme") {
          if (req.method === "GET") {
            const data = fs.readFileSync(dbPath, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(data);
            return;
          }
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const parsed = JSON.parse(body);
                if (parsed && typeof parsed === "object") {
                  fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2));
                  
                  // Also write to public/db.json so it gets copied during build for static hosting!
                  const publicDbPath = path.resolve(__dirname, "public/db.json");
                  if (!fs.existsSync(path.dirname(publicDbPath))) {
                    fs.mkdirSync(path.dirname(publicDbPath), { recursive: true });
                  }
                  fs.writeFileSync(publicDbPath, JSON.stringify(parsed, null, 2));

                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, ...parsed }));
                } else {
                  res.statusCode = 400;
                  res.end("Invalid request body");
                }
              } catch (e) {
                res.statusCode = 500;
                res.end("Error writing db.json");
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/portfolio", // Dynamic base path for Vercel vs GH Pages
  plugins: [react(), tailwindcss(), themeApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
