import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/portfolio", // Dynamic base path for Vercel vs GH Pages
  plugins: [react(), tailwindcss()],
});
