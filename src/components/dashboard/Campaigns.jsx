// src/components/dashboard/Campaigns.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, TrashIcon, PencilIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

function apiHeaders(user) {
  return {
    "Content-Type": "application/json",
    "x-user-email": user?.email || "",
  };
}

export default function Campaigns({ user }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [form, setForm] = useState({ name: "", budget: "", targetLeads: "", description: "", status: "Draft" });
  const [saving, setSaving] = useState(false);

  const fetchCampaigns = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns", { headers: apiHeaders(user) });
      const data = await res.json();
      if (data.success) setCampaigns(data.campaigns);
    } catch {
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const openModal = (camp = null) => {
    setSelectedCampaign(camp);
    setForm(
      camp
        ? { name: camp.name, budget: camp.budget, targetLeads: camp.targetLeads || "", description: camp.description || "", status: camp.status }
        : { name: "", budget: "", targetLeads: "", description: "", status: "Draft" }
    );
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
    setForm({ name: "", budget: "", targetLeads: "", description: "", status: "Draft" });
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Campaign name is required");
    setSaving(true);
    try {
      if (selectedCampaign) {
        // Update
        const res = await fetch("/api/campaigns", {
          method: "PUT",
          headers: apiHeaders(user),
          body: JSON.stringify({ ...form, id: selectedCampaign.id }),
        });
        const data = await res.json();
        if (data.success) {
          setCampaigns((prev) => prev.map((c) => (c.id === selectedCampaign.id ? data.campaign : c)));
          toast.success("Campaign updated!");
          closeModal();
        } else {
          toast.error(data.message || "Update failed");
        }
      } else {
        // Create
        const res = await fetch("/api/campaigns", {
          method: "POST",
          headers: apiHeaders(user),
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          setCampaigns((prev) => [data.campaign, ...prev]);
          toast.success("Campaign created!");
          closeModal();
        } else {
          toast.error(data.message || "Create failed");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/campaigns", {
        method: "DELETE",
        headers: apiHeaders(user),
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
        toast.success("Campaign deleted");
        setMenuOpen(null);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (camp, newStatus) => {
    try {
      const res = await fetch("/api/campaigns", {
        method: "PUT",
        headers: apiHeaders(user),
        body: JSON.stringify({ ...camp, id: camp.id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns((prev) => prev.map((c) => (c.id === camp.id ? data.campaign : c)));
        toast.success(`Campaign ${newStatus.toLowerCase()}`);
      }
    } catch {
      toast.error("Failed to update status");
    }
    setMenuOpen(null);
  };

  const filtered = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Campaigns</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {campaigns.length === 0 ? "Create your first campaign to get started." : `${campaigns.length} campaign${campaigns.length !== 1 ? "s" : ""} total`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchCampaigns} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ArrowPathIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <PlusIcon className="h-5 w-5" /> Create Campaign
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
              <PlusIcon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {search ? "No campaigns match your search" : "No campaigns yet"}
            </h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 max-w-xs">
              {search ? "Try a different search term." : "Create your first campaign to start tracking leads and performance."}
            </p>
            {!search && (
              <button onClick={() => openModal()} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Create first campaign
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
                  {["Campaign", "Status", "Budget", "Leads", "Conv. Rate", "Created", ""].map((h, i) => (
                    <th key={i} className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filtered.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer" onClick={() => openModal(camp)}>
                        {camp.name}
                      </div>
                      {camp.description && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium truncate max-w-[200px]">{camp.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        camp.status === "Active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                        camp.status === "Draft" ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" :
                        "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}>{camp.status}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{camp.budget || "—"}</td>
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{camp.leads?.toLocaleString() || "0"}</td>
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{camp.conv || "0%"}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {camp.createdAt ? new Date(camp.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === camp.id ? null : camp.id)}
                        className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                      {menuOpen === camp.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                          <div className="absolute right-4 top-12 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 min-w-[160px] overflow-hidden">
                            <button onClick={() => openModal(camp)} className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                              <PencilIcon className="h-4 w-4" /> Edit
                            </button>
                            {camp.status !== "Active" && (
                              <button onClick={() => handleStatusChange(camp, "Active")} className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Set Active
                              </button>
                            )}
                            {camp.status === "Active" && (
                              <button onClick={() => handleStatusChange(camp, "Paused")} className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-amber-400" /> Pause
                              </button>
                            )}
                            <button onClick={() => handleDelete(camp.id)} className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-slate-100 dark:border-slate-700">
                              <TrashIcon className="h-4 w-4" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedCampaign ? "Edit Campaign" : "Create New Campaign"}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {selectedCampaign ? "Update your campaign details." : "Set up your new marketing campaign."}
                </p>
              </div>
              <div className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Campaign Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Summer Sale 2025"
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Budget</label>
                    <input
                      type="text"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      placeholder="$5,000"
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Target Leads</label>
                    <input
                      type="number"
                      value={form.targetLeads}
                      onChange={(e) => setForm({ ...form, targetLeads: e.target.value })}
                      placeholder="1000"
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-slate-900 dark:text-white"
                  >
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Paused</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Description (optional)</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Campaign goal, target audience, notes…"
                    rows={3}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                <button onClick={closeModal} className="px-6 py-3 font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-60"
                >
                  {saving ? "Saving…" : selectedCampaign ? "Save Changes" : "Create Campaign"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
