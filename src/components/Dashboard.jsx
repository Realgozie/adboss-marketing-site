// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChartBarIcon, 
  UsersIcon, 
  ArrowTrendingUpIcon, 
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
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
            <UsersIcon className="h-16 w-16" />
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

  const menuItems = [
    { id: "overview", name: 'Dashboard', icon: ChartBarIcon },
    { id: "campaigns", name: 'Campaigns', icon: UsersIcon },
    { id: "messages", name: 'Messages', icon: EnvelopeIcon },
    { id: "settings", name: 'Settings', icon: Cog6ToothIcon },
  ];

  const stats = [
    { name: 'Active Campaigns', value: '12', icon: ChartBarIcon, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12.5%' },
    { name: 'Total Leads', value: '2,450', icon: UsersIcon, color: 'text-green-600', bg: 'bg-green-50', change: '+18.2%' },
    { name: 'Conversion Rate', value: '4.8%', icon: ArrowTrendingUpIcon, color: 'text-purple-600', bg: 'bg-purple-50', change: '+2.4%' },
    { name: 'Pending Emails', value: '85', icon: EnvelopeIcon, color: 'text-orange-600', bg: 'bg-orange-50', change: '-5.1%' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      {/* Sidebar */}
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
            onClick={handleLogout}
            className="flex items-center space-x-3 p-4 w-full text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

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
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="max-w-7xl mx-auto"
              >
                <header className="mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketing Performance</h2>
                  <p className="text-slate-500 mt-1">Real-time insights across your campaigns.</p>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={stat.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={cn(stat.bg, stat.color, "p-3 rounded-xl transition-transform group-hover:scale-110")}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <span className={cn(
                          "text-xs font-bold px-2 py-1 rounded-full",
                          stat.change.startsWith("+") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                        )}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.name}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-slate-900">Campaign Analytics</h3>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-600">Weekly</button>
                        <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">Monthly</button>
                      </div>
                    </div>
                    
                    {/* Mock Chart Area */}
                    <div className="h-64 flex items-end justify-between gap-4 mb-8 px-4">
                      {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                          className="flex-1 bg-blue-600/10 rounded-t-lg relative group cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-blue-600 rounded-t-lg scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
                          <p className="text-lg font-black text-slate-900">$45,231</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Avg. CPC</p>
                          <p className="text-lg font-black text-slate-900">$1.24</p>
                        </div>
                      </div>
                      <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors">Download Report</button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <h3 className="text-xl font-bold relative z-10">Pro Insights</h3>
                      <p className="text-slate-400 text-sm mt-2 mb-6 relative z-10 leading-relaxed">AI analysis suggests increasing budget on "Referral" for 2x ROI.</p>
                      <button className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors relative z-10">View Analysis</button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
                      <div className="space-y-6">
                        {[
                          { text: 'Campaign "Summer" active', time: '2m ago', color: 'bg-green-500' },
                          { text: 'New lead from Facebook', time: '14m ago', color: 'bg-blue-500' },
                          { text: 'Payment successful', time: '1h ago', color: 'bg-purple-500' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", item.color)}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-700 leading-tight">{item.text}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-10"
              >
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                  <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
                    <p className="text-slate-500 font-medium">{user.email}</p>
                    <button className="mt-3 text-blue-600 font-bold text-sm hover:underline">Change Profile Photo</button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue={user.name} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue={user.email} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                    <button className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Discard</button>
                    <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all">Save Changes</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
