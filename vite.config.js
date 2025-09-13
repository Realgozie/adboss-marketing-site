// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    host: "0.0.0.0", // ✅ Required by Replit
    port: 5000, // ✅ Required port for Replit
    strictPort: true,
    allowedHosts: true, // ✅ Allow all hosts
    hmr: true, // ✅ Let Vite handle HMR automatically
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
