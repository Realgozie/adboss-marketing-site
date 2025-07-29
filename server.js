import express from "express";
import cors from "cors";
import Database from "@replit/database";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix for __filename and __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = new Database();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// ✅ Serve static files from React build
app.use(express.static(path.join(__dirname, "dist")));

// ✅ API: Register route
app.post("/api/register", async (req, res) => {
  const { name, email } = req.body;

  try {
    const existing = await db.get(email);
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    await db.set(email, { name, email });
    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /api/register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Fallback route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
