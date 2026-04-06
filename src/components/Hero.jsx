// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center gap-16">

        {/* Left — copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            The #1 Marketing Platform for Growth
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Turn ads into<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">real revenue.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            AdBOSS gives you the campaign tools, analytics, and automation to grow faster — all from one beautiful dashboard.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2 justify-center lg:justify-start mb-8">
            <div className="flex -space-x-2">
              {["SN","AO","CE","TF","NA"].map((i, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[9px] font-black text-white ${["bg-blue-600","bg-violet-600","bg-emerald-600","bg-orange-600","bg-pink-600"][idx]}`}>{i}</div>
              ))}
            </div>
            <div className="ml-1">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-slate-400 text-xs font-medium">Trusted by <span className="text-white font-bold">150+ businesses</span></p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link to="/register" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-blue-900/40">
              Get Started Free →
            </Link>
            <Link to="/pricing" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-xl font-black text-sm transition-all">
              See Pricing
            </Link>
          </div>
          <p className="text-slate-500 text-xs font-medium mt-3 text-center lg:text-left">No credit card required · Free forever plan available</p>
        </div>

        {/* Right — dashboard mockup */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Fake browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-900/60">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <div className="flex-1 ml-2 bg-slate-700/60 rounded-md h-5 flex items-center px-3">
                <span className="text-slate-500 text-[10px] font-mono">app.adboss.io/dashboard</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Revenue", value: "$48,290", change: "+12.4%", up: true },
                  { label: "Active Campaigns", value: "24", change: "+3 this week", up: true },
                  { label: "Conv. Rate", value: "6.8%", change: "+0.9%", up: true },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-700/50 rounded-xl p-3">
                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-white text-base font-black">{s.value}</p>
                    <p className="text-emerald-400 text-[9px] font-bold mt-0.5">{s.change}</p>
                  </div>
                ))}
              </div>

              {/* Fake chart bar */}
              <div className="bg-slate-700/40 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-300 text-xs font-black">Campaign Performance</p>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">Last 7 days</span>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${h}%`, opacity: 0.7 + i * 0.05 }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                    <span key={d} className="text-slate-500 text-[8px] font-bold flex-1 text-center">{d}</span>
                  ))}
                </div>
              </div>

              {/* Campaign rows */}
              <div className="space-y-2">
                {[
                  { name: "Summer Launch", status: "Active", budget: "$1,200", leads: "348" },
                  { name: "Brand Awareness Q2", status: "Active", budget: "$800", leads: "215" },
                  { name: "Retargeting A", status: "Paused", budget: "$500", leads: "89" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                      <span className="text-slate-200 text-[10px] font-bold">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 text-[9px] font-bold">{c.budget}</span>
                      <span className="text-blue-400 text-[9px] font-bold">{c.leads} leads</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg hidden lg:block">
            📈 +34% ROI this month
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
