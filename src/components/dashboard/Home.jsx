// src/components/dashboard/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon, ArrowTrendingUpIcon, CheckCircleIcon, ClockIcon, MegaphoneIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function computeStats(campaigns) {
  const active = campaigns.filter((c) => c.status === "Active");
  const totalLeads = campaigns.reduce((sum, c) => sum + (c.leads || 0), 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budgetNum || 0), 0);
  const avgConv = campaigns.length
    ? (campaigns.reduce((sum, c) => sum + parseFloat(c.conv || 0), 0) / campaigns.length).toFixed(1)
    : 0;
  return { activeCount: active.length, totalLeads, totalBudget, avgConv, total: campaigns.length };
}

function buildWeeklyChart(campaigns) {
  // Spread leads across the week for each campaign based on creation date
  const chart = [0, 0, 0, 0, 0, 0, 0];
  campaigns.forEach((c) => {
    if (!c.leads) return;
    const day = c.createdAt ? new Date(c.createdAt).getDay() : 0;
    const idx = day === 0 ? 6 : day - 1;
    chart[idx] += c.leads;
  });
  return chart;
}

export default function Home({ user, setActiveTab }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("weekly");

  const fetchCampaigns = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns", {
        headers: { "x-user-email": user.email },
      });
      const data = await res.json();
      if (data.success) setCampaigns(data.campaigns);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const stats = computeStats(campaigns);
  const chartData = buildWeeklyChart(campaigns);
  const maxVal = Math.max(...chartData, 1);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const handleExport = () => {
    if (campaigns.length === 0) return;
    const csvContent =
      "Campaign,Status,Budget,Leads,Conv Rate,Created\n" +
      campaigns
        .map((c) => `"${c.name}",${c.status},${c.budget},${c.leads || 0},${c.conv || "0%"},${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}`)
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "adboss-campaigns.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      name: "Total Budget",
      value: stats.totalBudget > 0 ? `$${stats.totalBudget.toLocaleString()}` : "$0",
      icon: ArrowTrendingUpIcon,
      color: "blue",
      sub: `${stats.total} campaign${stats.total !== 1 ? "s" : ""} total`,
    },
    {
      name: "Active Campaigns",
      value: stats.activeCount,
      icon: MegaphoneIcon,
      color: "violet",
      sub: stats.activeCount > 0 ? "Running now" : "None running yet",
    },
    {
      name: "Total Leads",
      value: stats.totalLeads.toLocaleString(),
      icon: ChartBarIcon,
      color: "green",
      sub: "Across all campaigns",
    },
    {
      name: "Avg Conv. Rate",
      value: `${stats.avgConv}%`,
      icon: ArrowTrendingUpIcon,
      color: "orange",
      sub: stats.avgConv > 0 ? "Good conversion" : "No data yet",
    },
  ];

  const colorMap = {
    blue: { icon: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
    violet: { icon: "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
    green: { icon: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
    orange: { icon: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", bar: "bg-orange-400" },
  };

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {greeting}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium mt-1 text-sm">
            {loading ? "Loading your dashboard…" : campaigns.length === 0 ? "Create your first campaign to get started." : "Here's what's happening with your campaigns today."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            All systems operational
          </span>
          <button
            onClick={handleExport}
            disabled={campaigns.length === 0}
            className="flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 h-36 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
              <div className="h-7 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => {
            const colors = colorMap[stat.color];
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-xl ${colors.icon} transition-transform group-hover:scale-110 duration-300`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Campaign Analytics</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Leads by day of week</p>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {["weekly", "monthly"].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${period === p ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {campaigns.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center">
              <ChartBarIcon className="h-10 w-10 text-slate-200 dark:text-slate-700 mb-3" />
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500">No campaign data yet</p>
              <button onClick={() => setActiveTab("campaigns")} className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Create your first campaign →
              </button>
            </div>
          ) : (
            <>
              <div className="relative h-48 flex items-end gap-2 mb-3 px-1">
                {chartData.map((val, i) => {
                  const heightPct = (val / maxVal) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                        {val} leads
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                        className="w-full rounded-t-lg bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors cursor-pointer relative overflow-hidden"
                      >
                        {heightPct > 0 && <div className="absolute bottom-0 w-full h-1/3 bg-blue-600 dark:bg-blue-500 rounded-t-lg opacity-80" />}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 px-1 mb-5">
                {DAYS.map((d) => (
                  <div key={d} className="flex-1 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500">{d}</div>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 gap-4">
            <div className="flex gap-6">
              {[
                ["Budget", stats.totalBudget > 0 ? `$${stats.totalBudget.toLocaleString()}` : "$0", "text-slate-900 dark:text-white"],
                ["Campaigns", stats.total, "text-slate-900 dark:text-white"],
                ["Total Leads", stats.totalLeads, "text-emerald-600 dark:text-emerald-400"],
              ].map(([label, val, cls]) => (
                <div key={label}>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className={`text-xl font-black mt-0.5 ${cls}`}>{val}</p>
                </div>
              ))}
            </div>
            <button onClick={handleExport} disabled={campaigns.length === 0} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-xl transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
              Download Report
            </button>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          {campaigns.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white">
              <h3 className="text-base font-black mb-2">Get started 🚀</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">Create your first campaign to start tracking leads, performance, and ROI in real time.</p>
              <button onClick={() => setActiveTab("campaigns")} className="w-full bg-blue-600 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors active:scale-95">
                Create Campaign →
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Summary</span>
                </div>
                <h3 className="text-base font-black mb-2">{stats.activeCount} active campaign{stats.activeCount !== 1 ? "s" : ""}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-5">{stats.totalLeads} leads generated across {stats.total} campaign{stats.total !== 1 ? "s" : ""}. Avg conversion: {stats.avgConv}%</p>
                <button onClick={() => setActiveTab("campaigns")} className="w-full bg-blue-600 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors active:scale-95">
                  Manage Campaigns →
                </button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Recent Campaigns</h3>
            {campaigns.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No campaigns yet.</p>
                <button onClick={() => setActiveTab("campaigns")} className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Create one →</button>
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.slice(0, 4).map((c) => (
                  <button key={c.id} onClick={() => setActiveTab("campaigns")} className="flex gap-3 items-start w-full text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-2 -mx-2 transition-colors group cursor-pointer">
                    <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${c.status === "Active" ? "bg-emerald-500" : c.status === "Paused" ? "bg-amber-400" : "bg-slate-300"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">{c.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                      </p>
                    </div>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${c.status === "Active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>{c.status}</span>
                  </button>
                ))}
                {campaigns.length > 4 && (
                  <button onClick={() => setActiveTab("campaigns")} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline w-full text-center pt-1">
                    View all {campaigns.length} campaigns →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Campaigns Table */}
      {campaigns.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Your Campaigns</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">All campaigns for your account</p>
            </div>
            <button onClick={() => setActiveTab("campaigns")} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-xl transition-colors">
              <MegaphoneIcon className="h-4 w-4" /> View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  {["Campaign", "Status", "Leads", "Budget", "Conv Rate"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {campaigns.slice(0, 5).map((c) => (
                  <tr key={c.id} onClick={() => setActiveTab("campaigns")} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{c.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full ${
                        c.status === "Active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                        c.status === "Paused" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                        "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-500 animate-pulse" : c.status === "Paused" ? "bg-amber-400" : "bg-slate-400"}`} />
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{(c.leads || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{c.budget || "—"}</td>
                    <td className="px-6 py-4 text-sm font-black text-emerald-600 dark:text-emerald-400">{c.conv || "0%"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
