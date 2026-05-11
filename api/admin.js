import Database from "@replit/database";

const db = new Database();

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : (userData?.value || []);

    // Admin = ADMIN_EMAIL env var if set, otherwise the first registered user
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const isAdmin = adminEmail ? email === adminEmail : users[0]?.email === email;
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    if (req.method === "GET") {
      const safeUsers = users.map((u) => ({
        name: u.name,
        email: u.email,
        joinedAt: u.joinedAt || null,
        isVerified: u.isVerified || false,
        isAdmin: adminEmail ? u.email === adminEmail : u.email === users[0]?.email,
      }));
      return res.json({ success: true, users: safeUsers, total: safeUsers.length });
    }

    return res.status(404).json({ success: false, message: "Not found" });
  } catch (err) {
    console.error("Admin error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
