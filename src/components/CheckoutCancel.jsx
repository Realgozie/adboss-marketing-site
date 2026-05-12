import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

export default function CheckoutCancel() {
  const { dark } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 text-center transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <XCircleIcon className="h-20 w-20 text-slate-300 dark:text-slate-600" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
          Payment cancelled
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-2">
          No worries — your free plan is still active.
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mb-10">
          You can upgrade anytime from the pricing page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/pricing"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
          >
            Back to Pricing
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black text-sm transition-all active:scale-95"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
