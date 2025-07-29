
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 Add your Replit hostname below
const allowedReplitHost = "44a449ab-7c87-40b8-bc12-6ea0ce7ed7f9-00-3ff4q9ithgr9r.riker.replit.dev";

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
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      port: 5000,
      host: "0.0.0.0",
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 👇 Add this line
    allowedHosts: [allowedReplitHost],
  },
});
