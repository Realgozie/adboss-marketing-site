// src/components/dashboard/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Squares2X2Icon,
  MegaphoneIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

const menuItems = [
  { id: "overview", name: "Overview", icon: Squares2X2Icon },
  { id: "campaigns", name: "Campaigns", icon: MegaphoneIcon },
  { id: "messages", name: "Messages", icon: EnvelopeIcon, badge: 3 },
  { id: "settings", name: "Settings", icon: Cog6ToothIcon },
  { id: "about", name: "About AdBoss", icon: InformationCircleIcon },
];

export default function Sidebar({ activeTab, setActiveTab, onLogout, user }) {
  return (
    <aside className="w-64 bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen shrink-0">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
            <SparklesIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-tight">AdBOSS</span>
            <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Marketing Suite</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3 mb-3">Main Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 group relative text-sm font-semibold",
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className="h-4.5 w-4.5 shrink-0 h-5 w-5" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-blue-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-pill"
                className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-5 border-t border-slate-800 space-y-2">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/60">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{user.name}</p>
              <p className="text-slate-500 text-[10px] font-medium truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all font-semibold text-sm"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
