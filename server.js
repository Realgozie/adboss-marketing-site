import express from "express";
import cors from "cors";
import Database from "@replit/database";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"; // ✅ for password hashing

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
  let { name, email, password } = req.body;

  email = email.toLowerCase().trim();
  password = password.trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : [];

    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUsers = [...users, { name, email, password: hashedPassword }];
    await db.set("users", updatedUsers);

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /api/register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ API: Login route
app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;

  email = email.toLowerCase().trim();
  password = password.trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : [];

    const user = users.find((u) => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in /api/login:", err);
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
