

import Database from "@replit/database";
import bcrypt from "bcrypt";

const db = new Database();

export default async function handler(req, res) {
  let { name, email, password } = req.body;
  
  email = email.toLowerCase().trim();
  password = password.trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : (userData?.value || []);

    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUsers = [...users, { name, email, password: hashedPassword }];
    await db.set("users", updatedUsers);

    console.log("User registered successfully:", email);
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /api/register:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

