import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const plans = [
  {
    name: "Starter",
    badge: null,
    monthly: 0,
    yearly: 0,
    monthlyPriceId: null,
    yearlyPriceId: null,
    description: "Perfect for freelancers and solo marketers getting started.",
    cta: "Get Started Free",
    ctaType: "link",
    ctaLink: "/register",
    color: "slate",
    features: [
      { text: "Up to 3 active campaigns", included: true },
      { text: "100 lead tracking / month", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "Email support", included: true },
      { text: "Dark mode interface", included: true },
      { text: "Team members", included: false },
      { text: "Advanced analytics & reports", included: false },
      { text: "Priority support", included: false },
      { text: "Custom integrations", included: false },
      { text: "White-label dashboard", included: false },
    ],
  },
  {
    name: "Growth",
    badge: "Most Popular",
    monthly: 49,
    yearly: 39,
    monthlyPriceId: process.env.STRIPE_PRICE_GROWTH_MONTHLY || "price_growth_monthly",
    yearlyPriceId: process.env.STRIPE_PRICE_GROWTH_YEARLY || "price_growth_yearly",
    description: "For growing teams that need real campaign power and collaboration.",
    cta: "Start Free Trial",
    ctaType: "checkout",
    color: "blue",
    features: [
      { text: "Up to 25 active campaigns", included: true },
      { text: "5,000 lead tracking / month", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "Up to 5 team members", included: true },
      { text: "Priority email support", included: true },
      { text: "Dark mode interface", included: true },
      { text: "Campaign export (CSV/PDF)", included: true },
      { text: "Custom integrations", included: false },
      { text: "White-label dashboard", included: false },
      { text: "Dedicated account manager", included: false },
    ],
  },
  {
    name: "Scale",
    badge: "Enterprise",
    monthly: 149,
    yearly: 119,
    monthlyPriceId: process.env.STRIPE_PRICE_SCALE_MONTHLY || "price_scale_monthly",
    yearlyPriceId: process.env.STRIPE_PRICE_SCALE_YEARLY || "price_scale_yearly",
    description: "For agencies and high-volume advertisers who need full control.",
    cta: "Get Scale Plan",
    ctaType: "checkout",
    color: "violet",
    features: [
      { text: "Unlimited active campaigns", included: true },
      { text: "Unlimited lead tracking", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "Unlimited team members", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Dark mode interface", included: true },
      { text: "Campaign export (CSV/PDF)", included: true },
      { text: "Custom integrations", included: true },
      { text: "White-label dashboard", included: true },
      { text: "Dedicated account manager", included: true },
    ],
  },
];

const colorMap = {
  slate: {
    card: "border-slate-200 dark:border-slate-800",
    btn: "bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white",
    badge: "",
    price: "text-slate-900 dark:text-white",
  },
  blue: {
    card: "border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-100/60 dark:shadow-blue-900/20",
    btn: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30",
    badge: "bg-blue-600 text-white",
    price: "text-blue-600 dark:text-blue-400",
  },
  violet: {
    card: "border-violet-300 dark:border-violet-700",
    btn: "bg-violet-700 hover:bg-violet-800 text-white",
    badge: "bg-violet-700 text-white",
    price: "text-violet-700 dark:text-violet-400",
  },
};

const faq = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period." },
  { q: "Is there a free trial?", a: "Our Growth plan includes a 14-day free trial with no credit card required. You'll only be charged when the trial ends, if you choose to continue." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers for annual plans. All payments are processed securely via Stripe." },
  { q: "Can I upgrade or downgrade?", a: "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the difference rolls over as credit." },
  { q: "Do you offer agency or volume pricing?", a: "Yes. For agencies managing multiple clients or high-volume campaigns, we offer custom pricing. Contact us at info.adboss@gmail.com to discuss your needs." },
  { q: "Is my data secure?", a: "Yes. We use industry-standard encryption, two-factor authentication, and active session monitoring. Your campaign data is stored securely and never sold to third parties." },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  async function handleCheckout(plan) {
    setError("");
    setLoadingPlan(plan.name);

    try {
      const priceId = yearly ? plan.yearlyPriceId : plan.monthlyPriceId;

      let userEmail = null;
      try {
        const session = JSON.parse(localStorage.getItem("adboss_user") || "{}");
        userEmail = session.email || null;
      } catch (_) {}

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          planName: plan.name,
          billing: yearly ? "yearly" : "monthly",
          userEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Could not start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Nav */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600">AdBOSS</Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
          </nav>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all">
            Get Started
          </Link>
          <button onClick={toggle} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Header */}
      <section className="py-20 px-6 text-center">
        <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Pricing</span>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Simple, honest pricing.</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto mb-10">No hidden fees. No surprises. Start free, scale when you're ready.</p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setYearly(false)}
            className={`px-5 py-2 rounded-lg font-black text-sm transition-all ${!yearly ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`px-5 py-2 rounded-lg font-black text-sm transition-all flex items-center gap-2 ${yearly ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
          >
            Yearly
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </section>

      {/* Error banner */}
      {error && (
        <div className="max-w-xl mx-auto px-6 mb-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        </div>
      )}

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const c = colorMap[plan.color];
            const price = yearly ? plan.yearly : plan.monthly;
            const isLoading = loadingPlan === plan.name;

            return (
              <div key={plan.name} className={`relative rounded-3xl border bg-white dark:bg-slate-900 p-8 ${c.card} transition-all`}>
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-widest ${c.badge}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className={`text-5xl font-black ${c.price}`}>${price}</span>
                  {price > 0 && <span className="text-slate-400 dark:text-slate-500 font-bold text-sm ml-1">/mo</span>}
                  {price === 0 && <span className="text-slate-400 dark:text-slate-500 font-bold text-sm ml-2">Forever free</span>}
                  {yearly && price > 0 && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black mt-1">Billed ${price * 12}/year</p>
                  )}
                </div>

                {plan.ctaType === "link" ? (
                  <Link
                    to={plan.ctaLink}
                    className={`block w-full text-center py-3 rounded-xl font-black text-sm transition-all active:scale-95 mb-8 ${c.btn}`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan)}
                    disabled={isLoading}
                    className={`block w-full text-center py-3 rounded-xl font-black text-sm transition-all active:scale-95 mb-8 disabled:opacity-60 disabled:cursor-not-allowed ${c.btn}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Redirecting...
                      </span>
                    ) : plan.cta}
                  </button>
                )}

                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {f.included
                        ? <CheckIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                        : <XMarkIcon className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />
                      }
                      <span className={`text-sm font-medium ${f.included ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600 line-through"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 px-6 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { emoji: "🔒", title: "Secure Payments", sub: "Stripe — 256-bit SSL" },
            { emoji: "🔄", title: "Cancel Anytime", sub: "No lock-in contracts" },
            { emoji: "📞", title: "Dedicated Support", sub: "We reply within 24 hours" },
            { emoji: "🌍", title: "GDPR Compliant", sub: "Your data stays private" },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-3xl">{b.emoji}</div>
              <p className="font-black text-slate-900 dark:text-white text-sm">{b.title}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="font-black text-slate-800 dark:text-slate-200 text-sm">{item.q}</span>
                  <span className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""} text-xl leading-none shrink-0 ml-4`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-violet-700 text-white text-center">
        <h2 className="text-4xl font-black tracking-tight mb-4">Still not sure? Start free.</h2>
        <p className="text-blue-100 font-medium mb-8 max-w-md mx-auto">No credit card needed. Get started with our Starter plan — zero cost, zero risk.</p>
        <Link to="/register" className="inline-block px-10 py-4 bg-white text-blue-700 rounded-xl font-black hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
          Create Free Account
        </Link>
      </section>

      {/* Footer strip */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-8 px-6 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} AdBOSS. All rights reserved. &nbsp;·&nbsp;
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
          &nbsp;·&nbsp;
          <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
          &nbsp;·&nbsp;
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
        </p>
      </div>
    </div>
  );
}
