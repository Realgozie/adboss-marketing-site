// src/components/dashboard/Settings.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  UserCircleIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  CreditCardIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

export default function Settings({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "AdBOSS Marketing",
    role: "Administrator",
    notifications: { email: true, push: false, updates: true }
  });

  const handleSave = () => {
    try {
      if (!formData.name.trim()) throw new Error("Name is required");
      if (!formData.email.includes("@")) throw new Error("Invalid email");
      
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      toast.success("Settings updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tabs = [
    { id: "profile", name: "Account", icon: UserCircleIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
    { id: "billing", name: "Plan & Billing", icon: CreditCardIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "team", name: "Team Members", icon: UserGroupIcon },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
      {/* Settings Nav */}
      <div className="w-full lg:w-72 shrink-0">
        <h2 className="text-3xl font-black text-slate-900 mb-8 px-4 lg:px-0 tracking-tight">Settings</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 group font-bold text-sm",
                activeTab === tab.id 
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200" 
                  : "text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent"
              )}
            >
              <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-900")} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm"
          >
            {activeTab === "profile" && (
              <div className="space-y-10">
                <header className="flex items-center gap-8 pb-10 border-b border-slate-100">
                  <div className="relative group">
                    <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-100 ring-4 ring-white transition-transform group-hover:scale-105">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 hover:text-blue-600 transition-colors">
                      <Cog6ToothIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Personal Information</h3>
                    <p className="text-slate-400 font-bold text-sm">Update your public profile and details.</p>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Role</label>
                    <input type="text" value={formData.role} disabled className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-400 cursor-not-allowed" />
                  </div>
                </div>

                <div className="pt-8 flex justify-end gap-4">
                  <button className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors">Reset</button>
                  <button onClick={handleSave} className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:scale-95">Save Profile</button>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-10 text-center py-10">
                <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCardIcon className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Current Plan: Pro</h3>
                  <p className="text-slate-400 font-bold mt-2">Your next billing date is March 12, 2024.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 max-w-sm mx-auto">
                  <div className="text-4xl font-black text-slate-900 mb-2">$49<span className="text-lg font-bold text-slate-400">/mo</span></div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Unlimited Campaigns</p>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all">Manage Subscription</button>
                </div>
              </div>
            )}

            {(activeTab === "security" || activeTab === "notifications" || activeTab === "team") && (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🏗️</div>
                <h3 className="text-xl font-black text-slate-900">Module Under Construction</h3>
                <p className="text-slate-400 font-bold max-w-xs mx-auto mt-2">We're building this feature to meet standard SaaS security protocols. Stay tuned!</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
