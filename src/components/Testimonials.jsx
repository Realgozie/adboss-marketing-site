// src/components/Testimonials.jsx
import React, { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Solomon Nwapa",
    role: "Startup Founder",
    company: "GrowthLab Africa",
    initials: "SN",
    color: "from-blue-500 to-blue-700",
    rating: 5,
    text: "AdBOSS helped us double our ad ROI in just 3 months. The campaign tracking is incredibly detailed — I can see exactly where every naira is going and optimize in real time.",
  },
  {
    name: "Adaeze Obi",
    role: "Marketing Director",
    company: "BrandPeak Studios",
    initials: "AO",
    color: "from-violet-500 to-violet-700",
    rating: 5,
    text: "The insights and automation save us hours every week. We manage 12 active campaigns across 3 clients from a single dashboard. I genuinely can't imagine going back to spreadsheets.",
  },
  {
    name: "Chidera Eze",
    role: "Performance Marketer",
    company: "Konnect Digital",
    initials: "CE",
    color: "from-emerald-500 to-emerald-700",
    rating: 5,
    text: "Setting up took less than 10 minutes. The lead tracking is seamless, the dark mode is beautiful, and the team collaboration features are exactly what a growing agency needs.",
  },
  {
    name: "Tunde Fashola",
    role: "Head of Growth",
    company: "PayStackAlt",
    initials: "TF",
    color: "from-orange-500 to-orange-700",
    rating: 5,
    text: "I've tried 4 marketing platforms in the last 2 years. AdBOSS is the first one that actually feels built for how modern teams work. The security features with 2FA gave me peace of mind too.",
  },
  {
    name: "Ngozi Adeyemi",
    role: "Agency Owner",
    company: "Media Roots NG",
    initials: "NA",
    color: "from-pink-500 to-pink-700",
    rating: 5,
    text: "As an agency, managing multiple client accounts used to be a nightmare. Now I have a clean overview per client, beautiful reports, and my team loves the interface. Worth every penny.",
  },
  {
    name: "Emeka Uche",
    role: "CPA Marketer",
    company: "ConversionBoost",
    initials: "EU",
    color: "from-cyan-500 to-cyan-700",
    rating: 5,
    text: "The conversion rate analytics alone justified the subscription. I went from guessing which campaigns to scale to having clear data-driven answers. My CPA dropped by 34% in the first month.",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const [ref, visible] = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-500 flex flex-col gap-4 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Stars */}
      <StarRating count={t.rating} />

      {/* Quote */}
      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed flex-1">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-black shrink-0`}>
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 dark:text-white">{t.name}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [headingRef, headingVisible] = useScrollAnimation(0.2);
  const [statsRef, statsVisible] = useScrollAnimation(0.2);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            What our users say
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            Trusted by founders, agencies, and growth teams across Africa and beyond.
          </p>
        </div>

        {/* Social proof bar */}
        <div
          ref={statsRef}
          className={`flex flex-wrap justify-center gap-8 mb-16 transition-all duration-700 delay-100 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {[
            { value: "4.9/5", label: "Average rating" },
            { value: "150+", label: "Happy customers" },
            { value: "98%", label: "Would recommend" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
            Join <span className="font-black text-slate-700 dark:text-slate-300">150+ businesses</span> already growing with AdBOSS.{" "}
            <a href="/register" className="text-blue-600 dark:text-blue-400 font-black hover:underline">
              Start free today →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
