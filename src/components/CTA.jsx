import React from "react";
import ctaBanner from "../assets/cta-banner.jpg"; // ✅ Image import
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CTA() {
  const [imageRef, imageVisible] = useScrollAnimation(0.3);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);
  const [buttonRef, buttonVisible] = useScrollAnimation(0.2);

  return (
    <section
      className="py-20 text-white text-center"
      style={{ backgroundColor: "#787160" }} // ✅ Custom background color
    >
      <div 
        ref={imageRef}
        className={`flex justify-center mb-8 animate-scale ${imageVisible ? 'visible' : ''}`}
      >
        <img
          src={ctaBanner}
          alt="AdBOSS CTA Banner"
          className="rounded-lg shadow-lg w-full max-w-xl"
        />
      </div>

      <div 
        ref={contentRef}
        className={`animate-fade-in ${contentVisible ? 'visible' : ''}`}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
        <p className="mb-6 text-lg">
          Let AdBOSS handle your marketing so you can focus on scaling.
        </p>
      </div>

      <button 
        ref={buttonRef}
        className={`bg-white text-[#787160] px-6 py-3 font-semibold rounded-lg hover:bg-gray-100 transition animate-slide-right ${buttonVisible ? 'visible' : ''}`}
      >
        Get Started Now
      </button>
    </section>
  );
}
