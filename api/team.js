import Database from "@replit/database";
import { randomUUID } from "crypto";

const db = new Database();

function teamKey(email) {
  return `team_${email.toLowerCase().trim()}`;
}

async function getTeam(email) {
  try {
    const data = await db.get(teamKey(email));
    if (!data) return null;
    return Array.isArray(data) ? data : (data?.value || null);
  } catch {
    return null;
  }
}

const GRADIENT_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-400 to-pink-500",
  "from-rose-500 to-red-600",
  "from-amber-400 to-orange-500",
  "from-cyan-500 to-blue-500",
];

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  const userName = req.headers["x-user-name"] || email.split("@")[0];
  const isAdmin = req.headers["x-user-is-admin"] === "true";

  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  // GET — return team, initialize if first time
  if (req.method === "GET") {
    let team = await getTeam(email);
    if (!team) {
      // Bootstrap with just the current user
      team = [
        {
          id: randomUUID(),
          name: userName,
          email,
          role: isAdmin ? "Administrator" : "Member",
          status: "Active",
          avatar: (userName).charAt(0).toUpperCase(),
          color: "from-blue-500 to-indigo-600",
          isOwner: true,
        },
      ];
      await db.set(teamKey(email), team);
    }
    return res.json({ success: true, team });
  }

  // POST — add a member
  if (req.method === "POST") {
    const { memberEmail, memberName, role } = req.body;
    if (!memberEmail?.includes("@")) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }
    let team = await getTeam(email) || [];
    if (team.find((m) => m.email === memberEmail.toLowerCase())) {
      return res.status(400).json({ success: false, message: "This email is already on the team" });
    }
    const newMember = {
      id: randomUUID(),
      name: memberName || memberEmail.split("@")[0],
      email: memberEmail.toLowerCase(),
      role: role || "Editor",
      status: "Pending",
      avatar: (memberName || memberEmail).charAt(0).toUpperCase(),
      color: GRADIENT_COLORS[team.length % GRADIENT_COLORS.length],
      isOwner: false,
    };
    team.push(newMember);
    await db.set(teamKey(email), team);
    return res.status(201).json({ success: true, member: newMember });
  }

  // DELETE — remove a member by id
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Member ID required" });
    let team = await getTeam(email) || [];
    const filtered = team.filter((m) => m.id !== id);
    await db.set(teamKey(email), filtered);
    return res.json({ success: true });
  }

  // PUT — update a member's role
  if (req.method === "PUT") {
    const { id, role } = req.body;
    if (!id || !role) return res.status(400).json({ success: false, message: "ID and role required" });
    let team = await getTeam(email) || [];
    const updated = team.map((m) => (m.id === id ? { ...m, role } : m));
    await db.set(teamKey(email), updated);
    return res.json({ success: true, team: updated });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
