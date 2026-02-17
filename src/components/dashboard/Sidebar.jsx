// src/components/dashboard/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  ChartBarIcon, 
  UsersIcon, 
  EnvelopeIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

const menuItems = [
  { id: "overview", name: 'Dashboard', icon: ChartBarIcon },
  { id: "campaigns", name: 'Campaigns', icon: UsersIcon },
  { id: "messages", name: 'Messages', icon: EnvelopeIcon },
  { id: "settings", name: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-8">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-black tracking-tighter text-blue-600 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">A</span>
          </div>
          AdBOSS
        </motion.h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center space-x-3 w-full p-4 rounded-xl transition-all duration-200 group font-medium",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
            )}
          >
            <item.icon className={cn("h-5 w-5", activeTab === item.id ? "text-white" : "group-hover:scale-110 transition-transform")} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 p-4 w-full text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
