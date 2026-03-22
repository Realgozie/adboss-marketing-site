import Database from "@replit/database";

const db = new Database();

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : (userData?.value || []);

    // Only the first registered user (admin) can access this
    const admin = users[0];
    if (!admin || admin.email !== email) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    if (req.method === "GET" && req.path === "/users") {
      const safeUsers = users.map((u, i) => ({
        name: u.name,
        email: u.email,
        joinedAt: u.joinedAt || null,
        isVerified: u.isVerified || false,
        isAdmin: i === 0,
      }));
      return res.json({ success: true, users: safeUsers, total: safeUsers.length });
    }

    return res.status(404).json({ success: false, message: "Not found" });
  } catch (err) {
    console.error("Admin error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
