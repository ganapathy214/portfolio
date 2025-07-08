import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/portfolio/", // important!
  plugins: [react(), tailwindcss()],
});
