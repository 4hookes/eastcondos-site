"use client";

import { useInView } from "@/hooks/useInView";
import { Check } from "lucide-react";
import data from "@/content/why-me.json";

export default function WhyMe() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="why-me"
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="section-label">{data.sectionLabel}</div>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subtext">{data.subtext}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            {data.features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-sage" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Image */}
          <div>
            <img
              src={data.mapImage.src}
              alt={data.mapImage.alt}
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
