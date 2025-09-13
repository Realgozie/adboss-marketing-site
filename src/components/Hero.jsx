import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import heroImage from "../assets/marketing-team.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden flex items-center justify-center">
      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <img
          src={heroImage}
          alt="Marketing Team"
          className="mx-auto rounded-lg shadow-lg mb-6 animate-fadeIn"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeIn"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          Grow Your Business with{" "}
          <span className="text-white font-bold">AdBOSS</span>
        </h2>
        <p className="text-lg md:text-xl mb-6 animate-fadeIn"
           style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
          We help you generate more leads, conversions, and revenue.
        </p>

        {/* ✅ Action buttons */}
        <div className="space-x-4 animate-fadeIn" 
             style={{ animationDelay: "1.2s", animationFillMode: "both" }}>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-200 transition inline-block"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
