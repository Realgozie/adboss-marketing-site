import Database from "@replit/database";
import { randomUUID } from "crypto";

const db = new Database();

function campaignKey(email) {
  return `campaigns_${email.toLowerCase().trim()}`;
}

async function getCampaigns(email) {
  try {
    const data = await db.get(campaignKey(email));
    if (!data) return [];
    return Array.isArray(data) ? data : (data?.value || []);
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  const email = (req.headers["x-user-email"] || "").toLowerCase().trim();
  if (!email) return res.status(401).json({ success: false, message: "Unauthorized" });

  // GET all campaigns for user
  if (req.method === "GET") {
    const campaigns = await getCampaigns(email);
    return res.json({ success: true, campaigns });
  }

  // POST create campaign
  if (req.method === "POST") {
    const { name, budget, targetLeads, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Campaign name is required" });

    const campaigns = await getCampaigns(email);
    const newCampaign = {
      id: randomUUID(),
      name,
      status: "Draft",
      budget: budget || "$0",
      budgetNum: parseFloat((budget || "0").replace(/[^0-9.]/g, "")) || 0,
      leads: 0,
      targetLeads: parseInt(targetLeads) || 0,
      conv: "0%",
      description: description || "",
      createdAt: new Date().toISOString(),
      userEmail: email,
    };
    campaigns.unshift(newCampaign);
    await db.set(campaignKey(email), campaigns);
    return res.status(201).json({ success: true, campaign: newCampaign });
  }

  // PUT update campaign
  if (req.method === "PUT") {
    const { id } = req.params || {};
    const cid = req.body.id || id;
    if (!cid) return res.status(400).json({ success: false, message: "Campaign ID required" });

    const campaigns = await getCampaigns(email);
    const idx = campaigns.findIndex((c) => c.id === cid);
    if (idx === -1) return res.status(404).json({ success: false, message: "Campaign not found" });

    const updated = {
      ...campaigns[idx],
      ...req.body,
      id: cid,
      userEmail: email,
      updatedAt: new Date().toISOString(),
    };
    // Recalculate conv rate
    if (updated.leads > 0 && updated.targetLeads > 0) {
      updated.conv = ((updated.leads / updated.targetLeads) * 100).toFixed(1) + "%";
    }
    campaigns[idx] = updated;
    await db.set(campaignKey(email), campaigns);
    return res.json({ success: true, campaign: updated });
  }

  // DELETE campaign
  if (req.method === "DELETE") {
    const cid = req.body.id;
    if (!cid) return res.status(400).json({ success: false, message: "Campaign ID required" });

    const campaigns = await getCampaigns(email);
    const filtered = campaigns.filter((c) => c.id !== cid);
    await db.set(campaignKey(email), filtered);
    return res.json({ success: true });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
