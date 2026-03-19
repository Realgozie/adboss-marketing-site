import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import featuresImg from "../assets/features-1.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Features() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [textRef, textVisible] = useScrollAnimation(0.2);
  const [imageRef, imageVisible] = useScrollAnimation(0.3);
  const [gridRef, gridVisible] = useScrollAnimation(0.1);

  const features = [
    { title: "Smart Ads", description: "Use AI-driven ads to reach your exact audience.", delay: "0" },
    { title: "Performance Tracking", description: "Real-time insights to help you optimize campaigns.", delay: "100" },
    { title: "Automated Reports", description: "Get detailed reports automatically every week.", delay: "200" },
    { title: "Targeted Reach", description: "Precision targeting based on demographics and behavior.", delay: "300" },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          ref={headerRef}
          className={`text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white animate-fade-in ${headerVisible ? "visible" : ""}`}
        >
          Our Features
        </h2>
        <p
          ref={textRef}
          className={`text-gray-700 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto animate-fade-in ${textVisible ? "visible" : ""}`}
        >
          Use AI-driven tools to supercharge your ad campaigns and reach the right audience.
        </p>
        <div
          ref={imageRef}
          className={`flex justify-center mb-12 animate-scale ${imageVisible ? "visible" : ""}`}
        >
          <img src={featuresImg} alt="AdBOSS Features" className="rounded-lg shadow-lg w-full max-w-2xl" />
        </div>
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 animate-fade-in ${gridVisible ? "visible" : ""}`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md dark:shadow-slate-900/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out animate-slide-${index % 2 === 0 ? "left" : "right"} ${gridVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CheckCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
