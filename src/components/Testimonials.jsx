import React from "react";
import testimonialImg from "../assets/testimonials-1.jpg"; // ✅ Import image

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* ✅ Image section */}
        <div className="flex justify-center mb-8">
          <img
            src={testimonialImg}
            alt="Happy AdBOSS clients"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>

        {/* ✅ Heading */}
        <h3 className="text-2xl font-bold mb-8">What Our Users Say</h3>

        {/* ✅ Testimonials */}
        <blockquote className="mb-6" data-aos="fade-up">
          <p className="italic">
            "AdBOSS helped us double our ad ROI in just 3 months, here’s the
            place to be!"
          </p>
          <span className="block mt-2 font-semibold">
            — Solomon Chigozie Nwapa, Startup Founder
          </span>
        </blockquote>
        <blockquote data-aos="fade-up" data-aos-delay="100">
          <p className="italic">
            "The insights and automation save us hours every week and so highly
            dependable."
          </p>
          <span className="block mt-2 font-semibold">
            — Kachi, Marketing Director
          </span>
        </blockquote>
      </div>
    </section>
  );
}
