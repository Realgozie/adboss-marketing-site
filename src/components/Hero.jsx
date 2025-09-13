import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import heroImage from "../assets/marketing-team.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Hero() {
  const [imageRef, imageVisible] = useScrollAnimation(0.1);
  const [headingRef, headingVisible] = useScrollAnimation(0.1);
  const [textRef, textVisible] = useScrollAnimation(0.1);
  const [buttonsRef, buttonsVisible] = useScrollAnimation(0.1);

  return (
    <section className="relative h-screen text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden flex items-center justify-center">
      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <img
          ref={imageRef}
          src={heroImage}
          alt="Marketing Team"
          className={`mx-auto rounded-lg shadow-lg mb-6 animate-scale ${imageVisible ? 'visible' : ''}`}
          style={{ transitionDelay: "0.3s" }}
        />
        <h2 
          ref={headingRef}
          className={`text-3xl md:text-4xl font-bold mb-4 animate-fade-in ${headingVisible ? 'visible' : ''}`}
          style={{ transitionDelay: "0.6s" }}>
          Grow Your Business with{" "}
          <span className="text-white font-bold">AdBOSS</span>
        </h2>
        <p 
          ref={textRef}
          className={`text-lg md:text-xl mb-6 animate-fade-in ${textVisible ? 'visible' : ''}`}
          style={{ transitionDelay: "0.9s" }}>
          We help you generate more leads, conversions, and revenue.
        </p>

        {/* ✅ Action buttons */}
        <div 
          ref={buttonsRef}
          className={`space-x-4 animate-slide-right ${buttonsVisible ? 'visible' : ''}`}
          style={{ transitionDelay: "1.2s" }}>
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
