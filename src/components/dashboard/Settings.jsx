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
  PlusIcon,
  TrashIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <div>
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{label}</p>
      {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ml-4",
        enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
      />
    </button>
  </div>
);

export default function Settings({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "AdBOSS Marketing",
    role: "Administrator",
    timezone: "UTC+1 West Africa Time",
  });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [twoFactor, setTwoFactor] = useState(false);

  const [notifs, setNotifs] = useState({
    emailCampaign: true, emailLeads: true, emailBilling: true,
    pushAlerts: false, securityAlerts: true,
    weeklyDigest: true, productUpdates: false, marketingTips: true,
  });

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: user?.name || "You", email: user?.email || "", role: "Administrator", status: "Active", avatar: (user?.name || "U").charAt(0).toUpperCase(), color: "from-blue-500 to-indigo-600" },
    { id: 2, name: "Sarah Chen", email: "sarah@adboss.com", role: "Editor", status: "Active", avatar: "S", color: "from-violet-500 to-purple-600" },
    { id: 3, name: "James Okafor", email: "james@adboss.com", role: "Viewer", status: "Pending", avatar: "J", color: "from-emerald-500 to-teal-600" },
  ]);

  const handleSaveProfile = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.includes("@")) return toast.error("Invalid email");
    localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
    toast.success("Profile saved successfully!");
  };

  const handleChangePassword = () => {
    if (!passwords.current) return toast.error("Enter your current password");
    if (passwords.newPass.length < 8) return toast.error("New password must be at least 8 characters");
    if (passwords.newPass !== passwords.confirm) return toast.error("Passwords do not match");
    setPasswords({ current: "", newPass: "", confirm: "" });
    toast.success("Password changed successfully!");
  };

  const handleInvite = () => {
    if (!inviteEmail.includes("@")) return toast.error("Enter a valid email address");
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      avatar: inviteEmail.charAt(0).toUpperCase(),
      color: "from-orange-400 to-pink-500",
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail("");
    toast.success(`Invite sent to ${inviteEmail}`);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
    toast.success("Member removed");
  };

  const tabs = [
    { id: "profile", name: "Account", icon: UserCircleIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
    { id: "billing", name: "Plan & Billing", icon: CreditCardIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "team", name: "Team Members", icon: UserGroupIcon },
  ];

  const inputClass = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all font-medium outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400";

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Settings Nav */}
      <div className="w-full lg:w-64 shrink-0">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Settings</h2>
        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm whitespace-nowrap shrink-0 lg:w-full",
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
                  : "text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-transparent"
              )}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >

            {/* ── PROFILE ── */}
            {activeTab === "profile" && (
              <div>
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-100 shrink-0">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">Personal Information</h3>
                      <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Update your profile and account details.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Company</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Timezone</label>
                      <select value={formData.timezone} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} className={inputClass}>
                        <option>UTC+1 West Africa Time</option>
                        <option>UTC+0 Greenwich Mean Time</option>
                        <option>UTC-5 Eastern Time</option>
                        <option>UTC-8 Pacific Time</option>
                        <option>UTC+1 Central European Time</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Role</label>
                      <input type="text" value={formData.role} disabled className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed text-sm" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button onClick={() => setFormData({ name: user?.name || "", email: user?.email || "", company: "AdBOSS Marketing", role: "Administrator", timezone: "UTC+1 West Africa Time" })} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Reset</button>
                    <button onClick={handleSaveProfile} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeTab === "security" && (
              <div>
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Security Settings</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">Manage your password and account security.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div>
                    <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Change Password</h4>
                    <div className="space-y-4">
                      {[
                        { key: "current", label: "Current Password", show: showPass.current, toggle: () => setShowPass(p => ({ ...p, current: !p.current })), value: passwords.current, onChange: (v) => setPasswords(p => ({ ...p, current: v })) },
                        { key: "new", label: "New Password", show: showPass.new, toggle: () => setShowPass(p => ({ ...p, new: !p.new })), value: passwords.newPass, onChange: (v) => setPasswords(p => ({ ...p, newPass: v })) },
                        { key: "confirm", label: "Confirm New Password", show: showPass.confirm, toggle: () => setShowPass(p => ({ ...p, confirm: !p.confirm })), value: passwords.confirm, onChange: (v) => setPasswords(p => ({ ...p, confirm: v })) },
                      ].map((field) => (
                        <div key={field.key} className="space-y-1.5">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{field.label}</label>
                          <div className="relative">
                            <input
                              type={field.show ? "text" : "password"}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="••••••••"
                              className={inputClass + " pr-12"}
                            />
                            <button onClick={field.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                              {field.show ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                      {passwords.newPass && (
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {["Length (8+)", "Uppercase", "Number", "Symbol"].map((req, i) => {
                            const checks = [passwords.newPass.length >= 8, /[A-Z]/.test(passwords.newPass), /[0-9]/.test(passwords.newPass), /[^A-Za-z0-9]/.test(passwords.newPass)];
                            return (
                              <span key={i} className={cn("text-[10px] font-bold px-2 py-1 rounded-full", checks[i] ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400")}>
                                {checks[i] ? "✓ " : ""}{req}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <button onClick={handleChangePassword} className="mt-2 px-8 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-black text-sm hover:bg-blue-600 transition-all active:scale-95">Update Password</button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                    <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-start justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-start gap-4">
                        <div className={cn("p-3 rounded-xl shrink-0", twoFactor ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400")}>
                          <ShieldCheckIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{twoFactor ? "2FA is Enabled" : "2FA is Disabled"}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Add an extra layer of security using your phone.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setTwoFactor(!twoFactor); toast.success(twoFactor ? "2FA disabled" : "2FA enabled!"); }}
                        className={cn("shrink-0 px-4 py-2 rounded-xl font-black text-xs transition-all active:scale-95", twoFactor ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50" : "bg-blue-600 text-white hover:bg-blue-700")}
                      >
                        {twoFactor ? "Disable 2FA" : "Enable 2FA"}
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                    <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: "Chrome on Windows", location: "Lagos, Nigeria", time: "Current session", icon: ComputerDesktopIcon, current: true },
                        { device: "Safari on iPhone", location: "Abuja, Nigeria", time: "2 hours ago", icon: DevicePhoneMobileIcon, current: false },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
                              <session.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{session.device}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{session.location} · {session.time}</p>
                            </div>
                          </div>
                          {session.current ? (
                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>Active
                            </span>
                          ) : (
                            <button onClick={() => toast.success("Session revoked")} className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-red-100 dark:border-red-900/30 pt-8">
                    <h4 className="text-sm font-black text-red-500 uppercase tracking-widest mb-4">Danger Zone</h4>
                    <div className="p-5 rounded-2xl border border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/10 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Delete Account</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">Permanently delete your account and all data.</p>
                      </div>
                      <button onClick={() => toast.error("Please contact support to delete your account.")} className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-xs hover:bg-red-700 transition-all active:scale-95">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── BILLING ── */}
            {activeTab === "billing" && (
              <div>
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Plan & Billing</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">Manage your subscription and payment details.</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-blue-200">Current Plan</span>
                      <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full">Pro</span>
                    </div>
                    <div className="text-4xl font-black mb-1">$49<span className="text-lg font-bold text-blue-200">/mo</span></div>
                    <p className="text-blue-200 text-sm font-medium">Next billing: March 12, 2026</p>
                    <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-4">
                      {[["Campaigns", "Unlimited"], ["Team seats", "5"], ["Storage", "50GB"]].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">{label}</p>
                          <p className="text-white font-black text-sm mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => toast.success("Redirecting to billing portal...")} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-left transition-all group">
                      <p className="font-black text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Manage Subscription</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Upgrade, downgrade or cancel</p>
                    </button>
                    <button onClick={() => toast.success("Opening payment method editor...")} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-left transition-all group">
                      <p className="font-black text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Payment Method</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Visa ending in •••• 4242</p>
                    </button>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Recent Invoices</h4>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                      {[["Feb 12, 2026", "Pro Plan - Monthly", "$49.00"], ["Jan 12, 2026", "Pro Plan - Monthly", "$49.00"], ["Dec 12, 2025", "Pro Plan - Monthly", "$49.00"]].map(([date, desc, amount]) => (
                        <div key={date} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{desc}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-black text-slate-900 dark:text-white text-sm">{amount}</span>
                            <button onClick={() => toast.success("Downloading invoice...")} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeTab === "notifications" && (
              <div>
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Notification Preferences</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">Choose what updates and alerts you receive.</p>
                </div>
                <div className="p-8 space-y-8">
                  {[
                    {
                      title: "Email Notifications",
                      items: [
                        { key: "emailCampaign", label: "Campaign updates", description: "Get notified when a campaign starts, pauses or ends" },
                        { key: "emailLeads", label: "New leads", description: "Receive an email each time a new lead is captured" },
                        { key: "emailBilling", label: "Billing & invoices", description: "Payment receipts and upcoming renewal reminders" },
                      ]
                    },
                    {
                      title: "Push Notifications",
                      items: [
                        { key: "pushAlerts", label: "Real-time alerts", description: "Instant alerts on your device for critical events" },
                        { key: "securityAlerts", label: "Security alerts", description: "Notify me of new logins and account changes" },
                      ]
                    },
                    {
                      title: "Reports & Digest",
                      items: [
                        { key: "weeklyDigest", label: "Weekly performance digest", description: "A summary of your campaigns sent every Monday" },
                        { key: "productUpdates", label: "Product updates", description: "New features and platform improvements" },
                        { key: "marketingTips", label: "Marketing tips", description: "Best practices and campaign optimization ideas" },
                      ]
                    }
                  ].map((group) => (
                    <div key={group.title}>
                      <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{group.title}</h4>
                      <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/30 dark:bg-slate-800/20 px-5">
                        {group.items.map((item) => (
                          <Toggle
                            key={item.key}
                            enabled={notifs[item.key]}
                            onChange={(val) => setNotifs(n => ({ ...n, [item.key]: val }))}
                            label={item.label}
                            description={item.description}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <button onClick={() => toast.success("Notification preferences saved!")} className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all active:scale-95">Save Preferences</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── TEAM ── */}
            {activeTab === "team" && (
              <div>
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Team Members</h3>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">{teamMembers.length} of 5 seats used on your Pro plan.</p>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
                    <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Invite New Member</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@company.com"
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                      />
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white"
                      >
                        <option>Administrator</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                      <button
                        onClick={handleInvite}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all active:scale-95 shrink-0"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Send Invite
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{member.name}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-[10px] font-black px-2.5 py-1 rounded-full",
                            member.status === "Active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                          )}>
                            {member.status}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:block">{member.role}</span>
                          {member.id !== 1 && (
                            <button onClick={() => handleRemoveMember(member.id)} className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                          {member.id === 1 && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold px-2 py-1">You</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 p-5">
                    <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-3">Role Permissions</h4>
                    <div className="space-y-2">
                      {[
                        { role: "Administrator", desc: "Full access — manage campaigns, team, billing and settings." },
                        { role: "Editor", desc: "Can create and edit campaigns, view analytics and messages." },
                        { role: "Viewer", desc: "Read-only access to campaigns and analytics dashboards." },
                      ].map((r) => (
                        <div key={r.role} className="flex gap-3 items-start">
                          <CheckCircleIcon className="h-4 w-4 text-blue-400 dark:text-blue-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium"><span className="font-black text-slate-800 dark:text-slate-200">{r.role}:</span> {r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
