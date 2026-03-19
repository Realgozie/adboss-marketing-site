// src/components/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const location = useLocation();
  const { dark, toggle } = useTheme();

  const hideHeaderRoutes = ["/dashboard"];
  if (hideHeaderRoutes.includes(location.pathname)) return null;

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800/50 px-4 py-3 flex justify-between items-center transition-colors duration-300">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        AdBOSS
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/" className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Features
        </Link>
        <Link to="/" className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Testimonials
        </Link>
        <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">
          Register
        </Link>
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </nav>
    </header>
  );
}
