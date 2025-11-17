import Database from "@replit/database";
import bcrypt from "bcrypt";

const db = new Database();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  let { email, password } = req.body;
  email = email.toLowerCase().trim();
  password = password.trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : [];

    const user = users.find((u) => u.email === email);
    const valid = user ? await bcrypt.compare(password, user.password) : false;

    if (user && valid) {
      res.status(200).json({
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
}
