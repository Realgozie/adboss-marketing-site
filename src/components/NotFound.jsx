// src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex flex-col">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600">AdBOSS</Link>
        <button onClick={toggle} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-8xl font-black text-slate-100 dark:text-slate-800 mb-0 leading-none select-none">404</p>
        <div className="-mt-4">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Page not found</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm mx-auto">
            Looks like this page took a wrong turn. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="px-7 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all active:scale-95">
              Go Home
            </Link>
            <Link to="/dashboard" className="px-7 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="py-6 text-center text-slate-400 dark:text-slate-600 text-xs font-medium">
        <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
        {" · "}
        <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
        {" · "}
        <a href="mailto:info.adboss@gmail.com" className="hover:text-blue-600 transition-colors">Support</a>
      </div>
    </div>
  );
}
