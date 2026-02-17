// src/components/dashboard/Settings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Settings({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSave = () => {
    // In a real app, this would be an API call
    localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
    alert("Profile updated successfully!");
  };

  return (
    <motion.div 
      key="settings"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-10"
    >
      <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900">{formData.name}</h2>
          <p className="text-slate-500 font-medium">{formData.email}</p>
          <button className="mt-3 text-blue-600 font-bold text-sm hover:underline">Change Profile Photo</button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" 
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
          <button className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Discard</button>
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
