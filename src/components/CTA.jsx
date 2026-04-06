// src/components/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CTA() {
  const [ref, visible] = useScrollAnimation(0.2);

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Start today — it's free
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Ready to grow<br />your business?
        </h2>
        <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto leading-relaxed">
          Join 150+ businesses using AdBOSS to run smarter campaigns, track real results, and grow faster than ever before.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link
            to="/register"
            className="px-10 py-4 bg-white text-blue-700 rounded-xl font-black text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
          >
            Create Free Account →
          </Link>
          <Link
            to="/pricing"
            className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-black text-sm transition-all"
          >
            See Pricing Plans
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Free plan forever
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            GDPR compliant
          </span>
        </div>
      </div>
    </section>
  );
}
