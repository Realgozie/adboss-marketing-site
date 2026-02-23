// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BellIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Sidebar from "./dashboard/Sidebar";
import Home from "./dashboard/Home";
import Settings from "./dashboard/Settings";
import Campaigns from "./dashboard/Campaigns";
import Messages from "./dashboard/Messages";
import { About } from "./Legal";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) user = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-10 bg-white shadow-xl rounded-2xl max-w-md border border-gray-100"
        >
          <div className="text-red-500 mb-4 flex justify-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the marketing dashboard.</p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Login to AdBOSS
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96 hidden md:block">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data, campaigns..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <Home />}
            {activeTab === "campaigns" && <Campaigns />}
            {activeTab === "messages" && <Messages />}
            {activeTab === "settings" && <Settings user={user} />}
            {activeTab === "about" && <About />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
