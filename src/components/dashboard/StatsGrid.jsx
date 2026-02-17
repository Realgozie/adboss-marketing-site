// src/components/dashboard/StatsGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChartBarIcon, UsersIcon, ArrowTrendingUpIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

const stats = [
  { name: 'Active Campaigns', value: '12', icon: ChartBarIcon, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12.5%' },
  { name: 'Total Leads', value: '2,450', icon: UsersIcon, color: 'text-green-600', bg: 'bg-green-50', change: '+18.2%' },
  { name: 'Conversion Rate', value: '4.8%', icon: ArrowTrendingUpIcon, color: 'text-purple-600', bg: 'bg-purple-50', change: '+2.4%' },
  { name: 'Pending Emails', value: '85', icon: EnvelopeIcon, color: 'text-orange-600', bg: 'bg-orange-50', change: '-5.1%' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div 
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={cn(stat.bg, stat.color, "p-3 rounded-xl transition-transform group-hover:scale-110")}>
              <stat.icon className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded-full",
              stat.change.startsWith("+") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
            )}>
              {stat.change}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{stat.value}</div>
          <div className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.name}</div>
        </motion.div>
      ))}
    </div>
  );
}
