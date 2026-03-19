import React from "react";
import testimonialImg from "../assets/testimonials-1.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Testimonials() {
  const [imageRef, imageVisible] = useScrollAnimation(0.3);
  const [headingRef, headingVisible] = useScrollAnimation(0.2);
  const [quote1Ref, quote1Visible] = useScrollAnimation(0.2);
  const [quote2Ref, quote2Visible] = useScrollAnimation(0.2);

  return (
    <section id="testimonials" className="py-20 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div
          ref={imageRef}
          className={`flex justify-center mb-8 animate-scale ${imageVisible ? "visible" : ""}`}
        >
          <img src={testimonialImg} alt="Happy AdBOSS clients" className="rounded-lg shadow-md w-full max-w-md" />
        </div>
        <h3
          ref={headingRef}
          className={`text-2xl font-bold mb-8 text-gray-900 dark:text-white animate-fade-in ${headingVisible ? "visible" : ""}`}
        >
          What Our Users Say
        </h3>
        <blockquote
          ref={quote1Ref}
          className={`mb-6 animate-slide-left ${quote1Visible ? "visible" : ""}`}
        >
          <p className="italic text-gray-700 dark:text-slate-300">
            "AdBOSS helped us double our ad ROI in just 3 months, here's the place to be!"
          </p>
          <span className="block mt-2 font-semibold text-gray-900 dark:text-slate-200">
            — Solomon Chigozie Nwapa, Startup Founder
          </span>
        </blockquote>
        <blockquote
          ref={quote2Ref}
          className={`animate-slide-right ${quote2Visible ? "visible" : ""}`}
        >
          <p className="italic text-gray-700 dark:text-slate-300">
            "The insights and automation save us hours every week and so highly dependable."
          </p>
          <span className="block mt-2 font-semibold text-gray-900 dark:text-slate-200">
            — Kachi, Marketing Director
          </span>
        </blockquote>
      </div>
    </section>
  );
}
