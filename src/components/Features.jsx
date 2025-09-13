import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import featuresImg from "../assets/features-1.jpg";

export default function Features() {
  const features = [
    {
      title: "Smart Ads",
      description: "Use AI-driven ads to reach your exact audience.",
      delay: "0",
    },
    {
      title: "Performance Tracking",
      description: "Real-time insights to help you optimize campaigns.",
      delay: "100",
    },
    {
      title: "Automated Reports",
      description: "Get detailed reports automatically every week.",
      delay: "200",
    },
    {
      title: "Targeted Reach",
      description: "Precision targeting based on demographics and behavior.",
      delay: "300",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* data-aos="fade-up" */}
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Our Features
        </h2>

        {/* data-aos="fade-up" data-aos-delay="100" */}
        <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
          Use AI-driven tools to supercharge your ad campaigns and reach the
          right audience.
        </p>

        {/* ✅ Image above feature list */}
        {/* data-aos="zoom-in" */}
        <div className="flex justify-center mb-12">
          <img
            src={featuresImg}
            alt="AdBOSS Features"
            className="rounded-lg shadow-lg w-full max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            // data-aos="fade-up" data-aos-delay={feature.delay}
            <div
              key={index}
              className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <CheckCircleIcon className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
