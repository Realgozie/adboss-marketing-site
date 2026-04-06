// src/components/Features.jsx
import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const features = [
  {
    emoji: "📊",
    title: "Campaign Management",
    description: "Create, launch, and manage unlimited ad campaigns across all your channels from a single, clean dashboard.",
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/40",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    emoji: "📈",
    title: "Real-Time Analytics",
    description: "Track impressions, clicks, conversions, and ROI as they happen. No more waiting for weekly reports.",
    color: "bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-900/40",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
  },
  {
    emoji: "🎯",
    title: "Precision Targeting",
    description: "Reach your exact audience with demographic, behavioral, and interest-based targeting that maximizes every dollar.",
    color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/40",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    emoji: "🤖",
    title: "Smart Automation",
    description: "Set rules, triggers, and automated reports so your campaigns optimize themselves while you sleep.",
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/40",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
  },
  {
    emoji: "👥",
    title: "Team Collaboration",
    description: "Invite your team, assign roles, and work together on campaigns with granular access controls.",
    color: "bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-900/40",
    iconBg: "bg-pink-100 dark:bg-pink-900/40",
  },
  {
    emoji: "🔒",
    title: "Enterprise Security",
    description: "Two-factor authentication, active session tracking, and encrypted storage keep your account locked down.",
    color: "bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700",
    iconBg: "bg-slate-100 dark:bg-slate-700",
  },
];

function FeatureCard({ feature, index }) {
  const [ref, visible] = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group p-6 rounded-2xl border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${feature.color} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
        {feature.emoji}
      </div>
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Everything you need to scale.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            One platform replaces five tools. Manage campaigns, track performance, and grow your revenue — all in one place.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t border-b border-slate-100 dark:border-slate-800">
          {[
            { value: "10,000+", label: "Campaigns managed" },
            { value: "$4.2M+", label: "Ad budget tracked" },
            { value: "98%", label: "Customer satisfaction" },
            { value: "34%", label: "Avg. ROI improvement" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{s.value}</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
