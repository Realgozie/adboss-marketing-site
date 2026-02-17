// src/components/dashboard/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import StatsGrid from "./StatsGrid";
import { cn } from "../../lib/utils";

export default function Home() {
  return (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketing Performance</h2>
        <p className="text-slate-500 mt-1">Real-time insights across your campaigns.</p>
      </header>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Campaign Analytics</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-600">Weekly</button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">Monthly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 mb-8 px-4">
            {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                className="flex-1 bg-blue-600/10 rounded-t-lg relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-t-lg scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
                <p className="text-lg font-black text-slate-900">$45,231</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Avg. CPC</p>
                <p className="text-lg font-black text-slate-900">$1.24</p>
              </div>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors">Download Report</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xl font-bold relative z-10">Pro Insights</h3>
            <p className="text-slate-400 text-sm mt-2 mb-6 relative z-10 leading-relaxed">AI analysis suggests increasing budget on "Referral" for 2x ROI.</p>
            <button className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors relative z-10">View Analysis</button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { text: 'Campaign "Summer" active', time: '2m ago', color: 'bg-green-500' },
                { text: 'New lead from Facebook', time: '14m ago', color: 'bg-blue-500' },
                { text: 'Payment successful', time: '1h ago', color: 'bg-purple-500' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", item.color)}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 leading-tight">{item.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
