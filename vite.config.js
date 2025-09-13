// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use your actual Replit public hostname
const allowedReplitHost =
  "44a449ab-7c87-40b8-bc12-6ea0ce7ed7f9-00-3ff4q9ithgr9r.riker.replit.dev";

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
    hmr: {
      protocol: "wss", // ✅ Use wss on Replit HTTPS
      host: allowedReplitHost, // ✅ Your actual Replit domain
      port: 5000, // ✅ HMR port should match your Vite dev port
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
