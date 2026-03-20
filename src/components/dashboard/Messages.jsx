// src/components/dashboard/Messages.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIcon, StarIcon, ArchiveBoxIcon, TrashIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

function getStorageKey(user) {
  return `adboss_messages_${user?.email || "guest"}`;
}

function getInitialMessages(user) {
  try {
    const stored = localStorage.getItem(getStorageKey(user));
    if (stored) return JSON.parse(stored);
  } catch { }
  // First-time welcome message personalized to the user
  return [
    {
      id: 1,
      sender: "AdBOSS Team",
      subject: "Welcome to AdBOSS!",
      body: `Hi ${user?.name || "there"}, welcome aboard! 🎉\n\nYour account is all set up and ready to go. Head over to Campaigns to create your first campaign, or explore the dashboard to see your analytics.\n\nIf you have any questions, just reply to this message and our team will get back to you.\n\n— The AdBOSS Team`,
      date: "Today",
      unread: true,
    },
  ];
}

export default function Messages({ user }) {
  const [messages, setMessages] = useState(() => getInitialMessages(user));
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    localStorage.setItem(getStorageKey(user), JSON.stringify(messages));
  }, [messages, user]);

  const handleSelect = (msg) => {
    setSelectedMessage(msg);
    setReplyText("");
    // Mark as read
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
    );
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSelectedMessage(null);
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    const reply = {
      id: Date.now(),
      sender: user?.name || "You",
      subject: `Re: ${selectedMessage.subject}`,
      body: replyText.trim(),
      date: "Just now",
      unread: false,
      isSent: true,
    };
    setMessages((prev) => [reply, ...prev]);
    setReplyText("");
    setSelectedMessage(null);
  };

  const filtered = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex gap-6"
    >
      {/* Inbox list */}
      <div className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Messages</h3>
            {messages.some((m) => m.unread) && (
              <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {messages.filter((m) => m.unread).length} new
              </span>
            )}
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search inbox..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <EnvelopeIcon className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500">No messages found</p>
            </div>
          ) : (
            filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 relative group ${
                  selectedMessage?.id === msg.id ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                }`}
              >
                {msg.unread && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-600 rounded-r-full" />
                )}
                {msg.isSent && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-emerald-500 rounded-r-full" />
                )}
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-black ${msg.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                    {msg.isSent ? `You → ${msg.subject.replace("Re: ", "")}` : msg.sender}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{msg.date}</span>
                </div>
                <div className={`text-xs font-bold mb-1 ${msg.unread ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                  {msg.subject}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 font-medium">{msg.body}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message detail */}
      <div className="hidden lg:flex flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-col">
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-lg">
                    {selectedMessage.sender.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{selectedMessage.sender}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">{selectedMessage.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <StarIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    <ArchiveBoxIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-10 flex-1 overflow-y-auto">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedMessage.body}
                </p>
                {!selectedMessage.isSent && (
                  <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full bg-transparent border-none outline-none resize-none h-28 text-slate-600 dark:text-slate-300 font-medium placeholder:text-slate-400"
                    />
                    <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                      <button
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <PaperAirplaneIcon className="h-4 w-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
              <div className="h-20 w-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6">
                <EnvelopeIcon className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Select a message</h4>
              <p className="text-slate-400 dark:text-slate-500 font-medium max-w-xs mx-auto">
                Click on a conversation to view the full message and reply.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
