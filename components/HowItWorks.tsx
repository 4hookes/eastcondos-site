"use client";

import { useInView } from "@/hooks/useInView";
import data from "@/content/how-it-works.json";

export default function HowItWorks() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} bg-light-gray`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="section-label">{data.sectionLabel}</div>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subtext mx-auto">{data.subtext}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {data.steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="text-5xl font-bold text-gold mb-4">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold text-navy mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-body leading-relaxed">{step.description}</p>

              {/* Connecting Line (desktop only, not on last step) */}
              {index < data.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gold/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
