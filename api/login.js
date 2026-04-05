import Database from "@replit/database";
import bcrypt from "bcrypt";
import { createSession } from "./sessions.js";

const db = new Database();

export default async function handler(req, res) {
  let { email, password } = req.body;

  email = email.toLowerCase().trim();
  password = password.trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : (userData?.value || []);

    const user = users.find((u) => u.email === email);

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
        const isAdmin = adminEmail ? email === adminEmail : users[0]?.email === email;

        // If 2FA is enabled, require the TOTP code before completing login
        if (user.twoFactorEnabled && user.twoFactorSecret) {
          console.log("Login requires 2FA for:", email);
          return res.status(200).json({
            success: false,
            requires2FA: true,
            email,
            message: "2FA code required",
          });
        }

        // Create session record
        const ua = req.headers["user-agent"] || "";
        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "Unknown";
        const sessionId = await createSession(email, ua, ip);

        console.log("Login successful for:", email, isAdmin ? "(admin)" : "");
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: { name: user.name, email: user.email, isAdmin },
          sessionId,
        });
      }
    }

    console.log("Login failed for:", email);
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  } catch (err) {
    console.error("Error in /api/login:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
