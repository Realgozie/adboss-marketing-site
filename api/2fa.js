import Database from "@replit/database";
import { generateSecret, generate, verify } from "otplib";
import QRCode from "qrcode";
import { createSession } from "./sessions.js";

const db = new Database();

async function getUsers() {
  const data = await db.get("users");
  return Array.isArray(data) ? data : (data?.value || []);
}

async function saveUsers(users) {
  await db.set("users", users);
}

function buildOtpURI(email, secret) {
  return `otpauth://totp/AdBOSS:${encodeURIComponent(email)}?secret=${secret}&issuer=AdBOSS`;
}

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  const action = req.path?.split("/").pop(); // "setup" | "verify" | "disable" | "check" | "status"

  // POST /api/2fa/setup — generate secret + QR code
  if (action === "setup") {
    try {
      const secret = generateSecret();
      const otpauth = buildOtpURI(email, secret);
      const qrDataUrl = await QRCode.toDataURL(otpauth);

      // Store secret temporarily (not yet active)
      const users = await getUsers();
      const updated = users.map((u) =>
        u.email === email ? { ...u, twoFactorPending: secret } : u
      );
      await saveUsers(updated);

      return res.json({ success: true, secret, qrCode: qrDataUrl });
    } catch (err) {
      console.error("2FA setup error:", err);
      return res.status(500).json({ success: false, message: "Failed to set up 2FA" });
    }
  }

  // POST /api/2fa/verify — verify TOTP code and activate 2FA
  if (action === "verify") {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Code required" });

    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === email);
      if (!user?.twoFactorPending) {
        return res.status(400).json({ success: false, message: "No pending 2FA setup. Please restart setup." });
      }

      const isValid = verify({ token: code.trim(), secret: user.twoFactorPending });
      if (!isValid) {
        return res.status(400).json({ success: false, message: "Invalid code. Please try again." });
      }

      const updated = users.map((u) =>
        u.email === email
          ? { ...u, twoFactorSecret: u.twoFactorPending, twoFactorEnabled: true, twoFactorPending: null }
          : u
      );
      await saveUsers(updated);

      return res.json({ success: true, message: "2FA enabled successfully!" });
    } catch (err) {
      console.error("2FA verify error:", err);
      return res.status(500).json({ success: false, message: "Verification failed" });
    }
  }

  // POST /api/2fa/disable — disable 2FA (requires current TOTP code)
  if (action === "disable") {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Current 2FA code required" });

    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === email);
      if (!user?.twoFactorEnabled || !user?.twoFactorSecret) {
        return res.status(400).json({ success: false, message: "2FA is not enabled" });
      }

      const isValid = verify({ token: code.trim(), secret: user.twoFactorSecret });
      if (!isValid) {
        return res.status(400).json({ success: false, message: "Invalid code. 2FA not disabled." });
      }

      const updated = users.map((u) =>
        u.email === email
          ? { ...u, twoFactorSecret: null, twoFactorEnabled: false, twoFactorPending: null }
          : u
      );
      await saveUsers(updated);

      return res.json({ success: true, message: "2FA disabled." });
    } catch (err) {
      console.error("2FA disable error:", err);
      return res.status(500).json({ success: false, message: "Failed to disable 2FA" });
    }
  }

  // POST /api/2fa/check — verify TOTP at login step
  if (action === "check") {
    const { code, loginEmail } = req.body;
    const targetEmail = (loginEmail || email).toLowerCase().trim();

    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === targetEmail);
      if (!user?.twoFactorEnabled || !user?.twoFactorSecret) {
        return res.status(400).json({ success: false, message: "2FA not enabled for this account" });
      }

      const isValid = verify({ token: code?.trim(), secret: user.twoFactorSecret });
      if (!isValid) {
        return res.status(400).json({ success: false, message: "Invalid code. Please try again." });
      }

      // Create session after successful 2FA login
      const ua = req.headers["user-agent"] || "";
      const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "Unknown";
      const sessionId = await createSession(targetEmail, ua, ip);

      const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
      const isAdmin = adminEmail ? targetEmail === adminEmail : users[0]?.email === targetEmail;

      return res.json({
        success: true,
        user: { name: user.name, email: user.email, isAdmin },
        sessionId,
      });
    } catch (err) {
      console.error("2FA check error:", err);
      return res.status(500).json({ success: false, message: "Verification failed" });
    }
  }

  // GET /api/2fa — check if 2FA is enabled for the user
  if (req.method === "GET") {
    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === email);
      return res.json({ success: true, enabled: !!user?.twoFactorEnabled });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Failed to check 2FA status" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
