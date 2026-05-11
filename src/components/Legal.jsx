// src/components/Legal.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ShieldCheckIcon, DocumentTextIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const LegalLayout = ({ title, icon: Icon, lastUpdated, children }) => {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600">AdBOSS</Link>
        <button onClick={toggle} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-10 transition-colors text-sm">
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 lg:p-12 space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed">
            {children}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400 dark:text-slate-500 font-medium">
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
          <a href="mailto:info.adboss@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const P = ({ children }) => <p className="text-sm leading-7 text-slate-600 dark:text-slate-400 font-medium">{children}</p>;
const Li = ({ children }) => <li className="text-sm leading-7 text-slate-600 dark:text-slate-400 font-medium">{children}</li>;

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" icon={ShieldCheckIcon} lastUpdated="April 5, 2026">
    <P>
      AdBOSS ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our marketing platform and website. Please read this policy carefully before using our services.
    </P>

    <Section title="1. Information We Collect">
      <P>We collect the following categories of information when you use AdBOSS:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li><strong className="text-slate-800 dark:text-slate-300">Account Information:</strong> Your name, email address, and password when you create an account.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Usage Data:</strong> Information about how you interact with our platform, including pages visited, features used, and actions taken.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Device & Technical Data:</strong> IP address, browser type, operating system, and session identifiers for security purposes.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Campaign Data:</strong> Marketing campaign details, budgets, leads, and performance metrics you enter into the platform.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Communication Data:</strong> Any messages or support requests you send to us.</Li>
      </ul>
    </Section>

    <Section title="2. How We Use Your Information">
      <P>We use the information we collect for the following purposes:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li>To create and manage your account and provide our services.</Li>
        <Li>To process and track your marketing campaigns.</Li>
        <Li>To send transactional emails, such as password resets and email verification.</Li>
        <Li>To send security alerts, including new login notifications and 2FA codes.</Li>
        <Li>To monitor and improve platform performance and security.</Li>
        <Li>To respond to your support requests and communications.</Li>
        <Li>To comply with applicable laws and regulations.</Li>
      </ul>
    </Section>

    <Section title="3. Cookies and Tracking Technologies">
      <P>We use cookies and similar technologies to operate our platform. These include:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li><strong className="text-slate-800 dark:text-slate-300">Strictly Necessary Cookies:</strong> Required for authentication and security. These cannot be disabled.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Functional Cookies:</strong> Store your preferences, such as dark mode and language settings.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Analytics Cookies:</strong> Help us understand how visitors use our site (only placed with your consent).</Li>
      </ul>
      <P>You can manage cookie preferences via the cookie consent banner displayed on your first visit to our website.</P>
    </Section>

    <Section title="4. Data Sharing and Disclosure">
      <P>We do not sell, rent, or trade your personal information to third parties. We may share data only in the following limited circumstances:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li><strong className="text-slate-800 dark:text-slate-300">Service Providers:</strong> Trusted third parties that help us operate our platform (e.g., email delivery services), bound by strict confidentiality obligations.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Legal Requirements:</strong> When required by law, court order, or governmental authority.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the acquiring entity.</Li>
      </ul>
    </Section>

    <Section title="5. Data Retention">
      <P>We retain your personal data for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your data within 30 days, except where retention is required by law.</P>
    </Section>

    <Section title="6. Your Rights (GDPR & Data Protection)">
      <P>Depending on your location, you may have the following rights regarding your personal data:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li><strong className="text-slate-800 dark:text-slate-300">Right to Access:</strong> Request a copy of the data we hold about you.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Right to Rectification:</strong> Request correction of inaccurate personal data.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Right to Erasure:</strong> Request deletion of your personal data.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Right to Object:</strong> Object to processing of your personal data for certain purposes.</Li>
        <Li><strong className="text-slate-800 dark:text-slate-300">Right to Portability:</strong> Receive your data in a structured, machine-readable format.</Li>
      </ul>
      <P>To exercise any of these rights, contact us at <a href="mailto:info.adboss@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">info.adboss@gmail.com</a>.</P>
    </Section>

    <Section title="7. Data Security">
      <P>We implement industry-standard security measures to protect your information, including encrypted password storage, two-factor authentication (2FA), session tracking, HTTPS encryption on all data transmissions, and access controls. Despite these measures, no internet transmission is 100% secure.</P>
    </Section>

    <Section title="8. Children's Privacy">
      <P>AdBOSS is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</P>
    </Section>

    <Section title="9. Changes to This Policy">
      <P>We may update this Privacy Policy periodically. When we do, we will revise the "Last Updated" date at the top of this page and, where appropriate, notify you by email. Continued use of our services after changes constitutes your acceptance of the updated policy.</P>
    </Section>

    <Section title="10. Contact Us">
      <P>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us at:</P>
      <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">AdBOSS Privacy Team</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Email: <a href="mailto:info.adboss@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">info.adboss@gmail.com</a></p>
      </div>
    </Section>
  </LegalLayout>
);

export const TermsOfService = () => (
  <LegalLayout title="Terms of Service" icon={DocumentTextIcon} lastUpdated="April 5, 2026">
    <P>
      These Terms of Service ("Terms") govern your access to and use of AdBOSS's marketing platform and related services. By creating an account or using any part of our services, you agree to be bound by these Terms. If you do not agree, do not use our services.
    </P>

    <Section title="1. Acceptance of Terms">
      <P>By accessing AdBOSS, you confirm that you are at least 18 years old, have the legal capacity to enter into a binding agreement, and agree to comply with these Terms and all applicable local, national, and international laws.</P>
    </Section>

    <Section title="2. Description of Services">
      <P>AdBOSS provides a cloud-based marketing management platform that allows users to create, manage, and track advertising campaigns, manage team members, monitor leads and conversions, and access performance analytics. We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.</P>
    </Section>

    <Section title="3. Account Registration and Security">
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li>You must provide accurate, complete, and current information when registering.</Li>
        <Li>You are solely responsible for maintaining the confidentiality of your password and account.</Li>
        <Li>You must notify us immediately at <a href="mailto:info.adboss@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">info.adboss@gmail.com</a> of any unauthorized use of your account.</Li>
        <Li>You may not share your account credentials or allow others to access your account.</Li>
        <Li>We strongly recommend enabling Two-Factor Authentication (2FA) for added security.</Li>
      </ul>
    </Section>

    <Section title="4. Acceptable Use">
      <P>You agree not to use AdBOSS to:</P>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <Li>Violate any applicable law, regulation, or third-party rights.</Li>
        <Li>Conduct fraudulent, deceptive, or misleading advertising campaigns.</Li>
        <Li>Distribute spam, malware, or any harmful content.</Li>
        <Li>Interfere with, damage, or disrupt the integrity or performance of our services.</Li>
        <Li>Attempt to gain unauthorized access to any part of our systems.</Li>
        <Li>Scrape, reverse engineer, or decompile any part of the platform.</Li>
        <Li>Engage in any activity that constitutes false advertising or consumer fraud.</Li>
      </ul>
    </Section>

    <Section title="5. Intellectual Property">
      <P>All content, designs, software, trademarks, and materials on the AdBOSS platform are the exclusive property of AdBOSS and protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the platform solely for its intended purpose. This license does not include the right to copy, modify, create derivative works, or distribute any part of the platform.</P>
    </Section>

    <Section title="6. User Content">
      <P>You retain ownership of all data and content you upload to AdBOSS (your "User Content"). By uploading content, you grant us a limited license to use, store, and process it solely to provide our services. You represent and warrant that your User Content does not violate any law or third-party rights.</P>
    </Section>

    <Section title="7. Payment and Billing">
      <P>Certain features of AdBOSS may be offered on a paid subscription basis. By subscribing, you agree to pay all applicable fees as described on our Pricing page. All fees are non-refundable unless otherwise stated. We reserve the right to change pricing with 30 days' prior notice. Failure to pay may result in suspension or termination of your account.</P>
    </Section>

    <Section title="8. Limitation of Liability">
      <P>To the maximum extent permitted by law, AdBOSS and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our services. Our total liability to you for any claim arising under these Terms shall not exceed the amount you paid to us in the 12 months preceding the claim.</P>
    </Section>

    <Section title="9. Disclaimer of Warranties">
      <P>AdBOSS is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the service will be uninterrupted, error-free, or free of viruses or harmful components.</P>
    </Section>

    <Section title="10. Indemnification">
      <P>You agree to indemnify and hold harmless AdBOSS and its affiliates, directors, officers, and employees from any claims, losses, damages, liabilities, or expenses (including legal fees) arising from your use of the services, your User Content, or your violation of these Terms.</P>
    </Section>

    <Section title="11. Termination">
      <P>We reserve the right to suspend or terminate your account at our discretion, with or without notice, if we believe you have violated these Terms. Upon termination, your right to use the services ceases immediately. You may also terminate your account at any time by contacting our support team.</P>
    </Section>

    <Section title="12. Governing Law">
      <P>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms shall be resolved through binding arbitration, except where prohibited by law. You waive any right to bring claims as a class action or class arbitration.</P>
    </Section>

    <Section title="13. Changes to Terms">
      <P>We may revise these Terms at any time. Material changes will be communicated via email or a prominent notice on our website. Continued use of our services after changes take effect constitutes your acceptance of the revised Terms.</P>
    </Section>

    <Section title="14. Contact">
      <P>For questions about these Terms, please contact:</P>
      <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">AdBOSS Legal Team</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Email: <a href="mailto:info.adboss@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">info.adboss@gmail.com</a></p>
      </div>
    </Section>
  </LegalLayout>
);

export const About = ({ onGetStarted } = {}) => {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black text-blue-600">AdBOSS</Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
          </nav>
          <button onClick={toggle} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-violet-700 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-white/10 backdrop-blur text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">Built by marketers,<br />for marketers.</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            AdBOSS was founded with a single belief — that professional marketing tools should be powerful, accessible, and beautiful by default.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { emoji: "🎯", title: "Our Mission", text: "To empower every business and SaaS founder with the clarity, tools, and insights they need to scale their marketing operations globally — without complexity." },
            { emoji: "🔭", title: "Our Vision", text: "A world where marketing data is clear, actionable, and beautiful by default — where every business has the same quality of tools as Fortune 500 companies." },
            { emoji: "🤝", title: "Our Values", text: "Transparency in everything we build, integrity in how we handle your data, and an obsession with delivering genuine value to every user on our platform." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">What AdBOSS Does</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">A complete marketing operations platform — from campaign creation to performance analytics — all in one dashboard.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { emoji: "📊", title: "Campaign Management", desc: "Create, edit, and track advertising campaigns across all your channels with real-time performance metrics." },
            { emoji: "👥", title: "Team Collaboration", desc: "Invite team members, assign roles, and work together on campaigns with role-based access control." },
            { emoji: "🔒", title: "Enterprise Security", desc: "Two-factor authentication, active session tracking, and encrypted data storage keep your account protected." },
            { emoji: "📬", title: "Lead Tracking", desc: "Monitor your leads, conversion rates, and campaign ROI from a single unified dashboard." },
            { emoji: "🌙", title: "Dark Mode", desc: "A beautiful dark interface built for marketers who spend long hours at their screens." },
            { emoji: "📱", title: "Mobile Ready", desc: "Access your dashboard from any device. AdBOSS is fully responsive and optimized for mobile use." },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-2xl shrink-0 mt-0.5">{f.emoji}</div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "10,000+", label: "Campaigns Managed" },
            { value: "$4.2M+", label: "Ad Budget Tracked" },
            { value: "98%", label: "Uptime Guarantee" },
            { value: "150+", label: "Happy Clients" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-black mb-2">{s.value}</p>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Ready to grow?</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">{onGetStarted ? "Head to Campaigns and create your first campaign now." : "Start your free account today. No credit card required."}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {onGetStarted ? (
              <button onClick={onGetStarted} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
                Go to Campaigns
              </button>
            ) : (
              <Link to="/register" className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
                Get Started Free
              </Link>
            )}
            <Link to="/pricing" className="px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-8 px-6 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} AdBOSS. All rights reserved. &nbsp;·&nbsp;
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
          &nbsp;·&nbsp;
          <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
        </p>
      </div>
    </div>
  );
};
