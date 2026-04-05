// src/components/CookieBanner.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const COOKIE_KEY = "adboss_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-slate-800 text-white rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-600 flex flex-col md:flex-row items-start md:items-center gap-4 px-6 py-5">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl shrink-0 mt-0.5">🍪</span>
          <div className="min-w-0">
            <p className="font-black text-sm text-white mb-0.5">We use cookies</p>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              We use essential cookies to operate our platform, and optional analytics cookies to improve your experience.
              Read our{" "}
              <Link to="/privacy" className="text-blue-400 hover:underline font-bold" onClick={accept}>
                Privacy Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={decline}
            className="px-5 py-2 text-slate-400 hover:text-white text-sm font-bold transition-colors border border-slate-600 hover:border-slate-400 rounded-xl"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black rounded-xl transition-all active:scale-95"
          >
            Accept All
          </button>
          <button
            onClick={decline}
            className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-700"
            aria-label="Dismiss"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
