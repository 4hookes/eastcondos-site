"use client";

import { useInView } from "@/hooks/useInView";
import { Quote } from "lucide-react";
import data from "@/content/testimonials.json";

export default function Testimonials() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="testimonials"
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="section-label">{data.sectionLabel}</div>
          <h2 className="section-heading">{data.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 border-l-4 border-sage hover:shadow-lg transition-shadow relative"
            >
              {/* Decorative Quote Mark */}
              <Quote
                className="absolute top-6 right-6 w-12 h-12 text-sage opacity-20"
                fill="currentColor"
              />

              {/* Client Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.initials}
                </div>
                <div>
                  <div className="font-bold text-navy">{item.names}</div>
                  <div className="text-sm italic text-body">{item.context}</div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-lg text-body leading-relaxed mt-4">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
