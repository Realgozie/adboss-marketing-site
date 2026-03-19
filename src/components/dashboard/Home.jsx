// src/components/dashboard/Home.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import StatsGrid from "./StatsGrid";
import { ArrowDownTrayIcon, ArrowTrendingUpIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weeklyData = [40, 70, 45, 90, 65, 85, 55];
const monthlyData = [60, 55, 80, 75, 90, 70, 95];

const topCampaigns = [
  { name: "Summer Sale 2024", status: "Active", leads: 1240, budget: "$5,000", roi: "210%" },
  { name: "Retargeting Q3", status: "Active", leads: 850, budget: "$3,500", roi: "180%" },
  { name: "Brand Awareness", status: "Paused", leads: 420, budget: "$2,000", roi: "95%" },
];

export default function Home({ user }) {
  const [period, setPeriod] = useState("weekly");
  const data = period === "weekly" ? weeklyData : monthlyData;
  const maxVal = Math.max(...data);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {greeting}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
          </h2>
          <p className="text-slate-400 font-medium mt-1 text-sm">Here's what's happening with your campaigns today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            All systems operational
          </span>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Chart + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-slate-900">Campaign Analytics</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Leads generated per day</p>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {["weekly", "monthly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                    period === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-52 flex items-end gap-2 mb-3">
            {/* Y-axis guides */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25, 0].map((pct) => (
                <div key={pct} className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-300 font-medium w-6 text-right shrink-0">{pct}</span>
                  <div className="flex-1 border-t border-dashed border-slate-100"></div>
                </div>
              ))}
            </div>

            <div className="flex-1 flex items-end gap-2 pl-8 h-full">
              {data.map((val, i) => {
                const heightPct = (val / maxVal) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10">
                        {val} leads
                      </div>
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                      className="w-full bg-blue-100 rounded-t-lg relative overflow-hidden cursor-pointer group-hover:bg-blue-200 transition-colors"
                      style={{ maxHeight: "100%" }}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ delay: 0.9 + i * 0.07, duration: 0.4 }}
                        className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg"
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex pl-8 gap-2">
            {days.map((d) => (
              <div key={d} className="flex-1 text-center text-[10px] font-bold text-slate-400">{d}</div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">$45,231</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. CPC</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">$1.24</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. ROI</p>
                <p className="text-xl font-black text-emerald-600 mt-0.5">+162%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          {/* AI Insight */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-violet-500/20 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <ArrowTrendingUpIcon className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">AI Insight</span>
              </div>
              <h3 className="text-base font-black mb-2">Boost ROI by 2x</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                Increasing budget on "Referral" campaign by 20% could yield a 2x ROI based on current trends.
              </p>
              <button className="w-full bg-blue-600 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors">
                View Full Analysis
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-5 uppercase tracking-wider">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { text: 'Campaign "Summer" went live', time: '2m ago', icon: CheckCircleIcon, color: 'text-emerald-500' },
                { text: '14 new leads from Facebook', time: '14m ago', icon: ArrowTrendingUpIcon, color: 'text-blue-500' },
                { text: 'Monthly report ready', time: '1h ago', icon: ArrowDownTrayIcon, color: 'text-violet-500' },
                { text: 'Subscription renewed', time: '3h ago', icon: CheckCircleIcon, color: 'text-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start group cursor-pointer">
                  <div className={`mt-0.5 shrink-0 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors">{item.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Top Performing Campaigns</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Your highest ROI campaigns this month</p>
          </div>
          <button
            onClick={() => {}}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topCampaigns.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{c.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full ${
                      c.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-500" : "bg-amber-400"}`}></span>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{c.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{c.budget}</td>
                  <td className="px-6 py-4 text-sm font-black text-emerald-600">{c.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
