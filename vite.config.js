// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use environment variable for Replit hostname
const allowedReplitHost = process.env.REPLIT_DEV_DOMAIN;

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
      clientPort: 443, // ✅ Use HTTPS proxy port for client connections
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
