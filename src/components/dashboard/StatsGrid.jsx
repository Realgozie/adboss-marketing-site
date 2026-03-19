// src/components/dashboard/StatsGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChartBarIcon, UsersIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const stats = [
  { name: "Total Revenue", value: "$45,231", icon: CurrencyDollarIcon, change: "+20.1%", changeLabel: "vs last month", positive: true, color: "blue", progress: 72 },
  { name: "Active Campaigns", value: "12", icon: ChartBarIcon, change: "+3", changeLabel: "new this week", positive: true, color: "violet", progress: 60 },
  { name: "Total Leads", value: "2,450", icon: UsersIcon, change: "+18.2%", changeLabel: "vs last month", positive: true, color: "green", progress: 85 },
  { name: "Conv. Rate", value: "4.8%", icon: ArrowTrendingUpIcon, change: "-0.4%", changeLabel: "vs last month", positive: false, color: "orange", progress: 48 },
];

const colorMap = {
  blue:   { icon: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
  violet: { icon: "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  green:  { icon: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  orange: { icon: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", bar: "bg-orange-400" },
};

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => {
        const colors = colorMap[stat.color];
        return (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md dark:hover:shadow-slate-800/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`p-3 rounded-xl ${colors.icon} transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.positive ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30"}`}>
                {stat.change}
              </span>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
            </div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">{stat.name}</p>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${colors.bar}`}
                />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{stat.changeLabel}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
