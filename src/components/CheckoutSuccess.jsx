import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";

export default function CheckoutSuccess() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 text-center transition-colors duration-300">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-20 w-20 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
          You're all set!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-2">
          Your subscription is now active. Welcome to AdBOSS.
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mb-10">
          Redirecting you to your dashboard in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black text-sm transition-all active:scale-95"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
