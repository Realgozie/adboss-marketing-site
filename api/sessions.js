import Database from "@replit/database";
import { randomUUID } from "crypto";

const db = new Database();

function sessionsKey(email) {
  return `sessions_${email.toLowerCase().trim()}`;
}

async function getSessions(email) {
  try {
    const data = await db.get(sessionsKey(email));
    if (!data) return [];
    return Array.isArray(data) ? data : (data?.value || []);
  } catch {
    return [];
  }
}

function parseDevice(ua = "") {
  let device = "Unknown Device";
  let type = "desktop";

  if (/iPhone|iPad|iPod/.test(ua)) {
    type = "mobile";
    device = /iPad/.test(ua) ? "Safari on iPad" : "Safari on iPhone";
  } else if (/Android/.test(ua)) {
    type = "mobile";
    device = /Chrome/.test(ua) ? "Chrome on Android" : "Browser on Android";
  } else if (/Windows/.test(ua)) {
    if (/Edg\//.test(ua)) device = "Edge on Windows";
    else if (/Chrome/.test(ua)) device = "Chrome on Windows";
    else if (/Firefox/.test(ua)) device = "Firefox on Windows";
    else device = "Browser on Windows";
  } else if (/Mac OS X/.test(ua)) {
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) device = "Safari on Mac";
    else if (/Chrome/.test(ua)) device = "Chrome on Mac";
    else if (/Firefox/.test(ua)) device = "Firefox on Mac";
    else device = "Browser on Mac";
  } else if (/Linux/.test(ua)) {
    device = /Chrome/.test(ua) ? "Chrome on Linux" : "Browser on Linux";
  }

  return { device, type };
}

export async function createSession(email, ua, ip) {
  const sessions = await getSessions(email);
  const { device, type } = parseDevice(ua);
  const id = randomUUID();
  const now = new Date().toISOString();

  const newSession = { id, device, type, ip: ip || "Unknown", createdAt: now, lastSeen: now };

  // Keep last 5 sessions
  const updated = [newSession, ...sessions].slice(0, 5);
  await db.set(sessionsKey(email), updated);
  return id;
}

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  const currentSessionId = req.headers["x-session-id"] || "";
  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  // GET — list sessions
  if (req.method === "GET") {
    const sessions = await getSessions(email);
    const enriched = sessions.map((s) => ({
      ...s,
      isCurrent: s.id === currentSessionId,
    }));
    return res.json({ success: true, sessions: enriched });
  }

  // DELETE — revoke a session
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Session ID required" });
    if (id === currentSessionId) {
      return res.status(400).json({ success: false, message: "Cannot revoke current session" });
    }
    const sessions = await getSessions(email);
    const filtered = sessions.filter((s) => s.id !== id);
    await db.set(sessionsKey(email), filtered);
    return res.json({ success: true });
  }

  // DELETE all other sessions (sign out everywhere else)
  if (req.method === "PUT") {
    const sessions = await getSessions(email);
    const onlyCurrent = sessions.filter((s) => s.id === currentSessionId);
    await db.set(sessionsKey(email), onlyCurrent);
    return res.json({ success: true, count: sessions.length - onlyCurrent.length });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
