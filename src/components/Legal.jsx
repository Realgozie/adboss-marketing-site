// src/components/Legal.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const LegalLayout = ({ title, children }) => (
  <div className="min-h-screen bg-slate-50 py-20 px-6">
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 lg:p-16 shadow-sm">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-10 transition-colors">
        <ChevronLeftIcon className="h-4 w-4" />
        Back to Home
      </Link>
      <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{title}</h1>
      <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest text-xs">Last Updated: February 23, 2026</p>
      <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy">
    <p>At AdBoss, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our marketing services.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">1. Data Collection</h2>
    <p>We collect information you provide directly to us, such as when you create an account, including your name, email address, and company information.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">2. Data Usage</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, and to develop new tools for our marketing community.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">3. Data Sharing</h2>
    <p>We do not share your personal information with third parties except as required by law or to provide the services you have requested.</p>
  </LegalLayout>
);

export const TermsOfService = () => (
  <LegalLayout title="Terms of Service">
    <p>By using AdBoss, you agree to these terms. Please read them carefully.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">1. Acceptance of Terms</h2>
    <p>By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">2. User Accounts</h2>
    <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
    <h2 className="text-xl font-black text-slate-900 mt-10">3. Limitations</h2>
    <p>In no event shall AdBoss or its suppliers be liable for any damages arising out of the use or inability to use the materials on AdBoss.</p>
  </LegalLayout>
);

export const About = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Revolutionizing Marketing for SaaS.</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">AdBoss was built by marketers, for marketers. We believe that professional marketing tools should be accessible, beautiful, and powerful.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12 text-center">
        {[
          { title: "Our Mission", text: "To empower every SaaS founder with the tools they need to scale their vision globally." },
          { title: "Our Vision", text: "A world where marketing data is clear, actionable, and beautiful by default." },
          { title: "Our Values", text: "Integrity, innovation, and an obsession with user-centric design in everything we build." }
        ].map((item, i) => (
          <div key={i} className="p-10 bg-slate-50 rounded-3xl border border-slate-100 transition-transform hover:scale-105">
            <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
