import React from "react";
import ctaBanner from "../assets/cta-banner.jpg"; // ✅ Image import

export default function CTA() {
  return (
    <section
      className="py-20 text-white text-center"
      style={{ backgroundColor: "#787160" }} // ✅ Custom background color
    >
      {/* ✅ CTA Image */}
      <div className="flex justify-center mb-8">
        <img
          src={ctaBanner}
          alt="AdBOSS CTA Banner"
          className="rounded-lg shadow-lg w-full max-w-xl"
        />
      </div>

      {/* ✅ CTA Content */}
      <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
      <p className="mb-6 text-lg">
        Let AdBOSS handle your marketing so you can focus on scaling.
      </p>

      <button className="bg-white text-[#787160] px-6 py-3 font-semibold rounded-lg hover:bg-gray-100 transition">
        Get Started Now
      </button>
    </section>
  );
}
