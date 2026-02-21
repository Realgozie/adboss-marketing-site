// src/components/dashboard/Campaigns.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    { id: 1, name: "Summer Sale 2024", status: "Active", budget: "$5,000", leads: 1240, conv: "4.2%" },
    { id: 2, name: "New Product Launch", status: "Draft", budget: "$12,000", leads: 0, conv: "0%" },
    { id: 3, name: "Retargeting Q3", status: "Paused", budget: "$3,500", leads: 850, conv: "3.8%" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Campaigns</h2>
          <p className="text-slate-500 mt-1">Manage and track your marketing initiatives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <PlusIcon className="h-5 w-5" />
          Create Campaign
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search campaigns..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Conv. Rate</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {campaigns.map((camp) => (
                <tr 
                  key={camp.id} 
                  onClick={() => { setSelectedCampaign(camp); setIsModalOpen(true); }}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{camp.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">Created 2 days ago</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      camp.status === "Active" ? "bg-green-100 text-green-700" : 
                      camp.status === "Draft" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700"
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{camp.budget}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{camp.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{camp.conv}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => { setIsModalOpen(false); setSelectedCampaign(null); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedCampaign ? `Edit: ${selectedCampaign.name}` : "Create New Campaign"}
                </h3>
                <p className="text-slate-500 mt-1 font-medium">Configure your marketing objective and budget.</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Campaign Name</label>
                  <input type="text" defaultValue={selectedCampaign?.name} placeholder="e.g. Winter Holiday Sale" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Budget</label>
                    <input type="text" defaultValue={selectedCampaign?.budget} placeholder="$0.00" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Leads</label>
                    <input type="number" defaultValue={selectedCampaign?.leads} placeholder="1,000" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium outline-none" />
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => { setIsModalOpen(false); setSelectedCampaign(null); }} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-colors">Cancel</button>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  {selectedCampaign ? "Save Changes" : "Create Campaign"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
