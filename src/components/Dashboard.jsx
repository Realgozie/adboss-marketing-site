// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChartBarIcon, 
  UsersIcon, 
  ArrowTrendingUpIcon, 
  EnvelopeIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const navigate = useNavigate();
  
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="text-center p-10 bg-white shadow-xl rounded-2xl max-w-md">
          <div className="text-red-500 mb-4 flex justify-center">
            <UsersIcon className="h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the marketing dashboard.</p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Login to AdBOSS
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { name: 'Active Campaigns', value: '12', icon: ChartBarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Leads', value: '2,450', icon: UsersIcon, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Conversion Rate', value: '4.8%', icon: ArrowTrendingUpIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Pending Emails', value: '85', icon: EnvelopeIcon, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AdBOSS</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
            <ChartBarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <UsersIcon className="h-5 w-5" />
            <span>Campaigns</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <EnvelopeIcon className="h-5 w-5" />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {user.email}
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Marketing Overview</h2>
              <p className="text-gray-500">Welcome back, here's what's happening with your campaigns today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.name}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Campaign Performance */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Campaign Performance</h3>
                  <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Summer Launch 2024', status: 'Running', leads: 450, cr: '5.2%' },
                    { name: 'Retargeting Campaign', status: 'Paused', leads: 120, cr: '3.1%' },
                    { name: 'Referral Program', status: 'Running', leads: 890, cr: '7.8%' },
                  ].map((campaign) => (
                    <div key={campaign.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`h-2 w-2 rounded-full ${campaign.status === 'Running' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <div className="font-bold text-gray-900">{campaign.name}</div>
                          <div className="text-xs text-gray-500">{campaign.status}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{campaign.leads} Leads</div>
                        <div className="text-xs text-gray-500">{campaign.cr} Conv.</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center space-x-3 text-left">
                    <div className="bg-white/20 p-2 rounded-lg"><ChartBarIcon className="h-5 w-5" /></div>
                    <span className="font-medium">New Campaign</span>
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center space-x-3 text-left">
                    <div className="bg-white/20 p-2 rounded-lg"><UsersIcon className="h-5 w-5" /></div>
                    <span className="font-medium">Export Leads</span>
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors flex items-center space-x-3 text-left">
                    <div className="bg-white/20 p-2 rounded-lg"><EnvelopeIcon className="h-5 w-5" /></div>
                    <span className="font-medium">Bulk Email</span>
                  </button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="text-xs text-blue-100 uppercase font-black tracking-widest mb-2">Support</div>
                  <p className="text-sm text-blue-100 leading-relaxed">Need help with your marketing strategy? Contact our experts.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
