"use client";

import { useInView } from "@/hooks/useInView";
import { HelpCircle, Building, AlertTriangle } from "lucide-react";
import data from "@/content/pain-points.json";

const icons = [HelpCircle, Building, AlertTriangle];

export default function PainPoints() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="pain-points"
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} bg-light-gray`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="section-label">{data.sectionLabel}</div>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subtext">{data.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {data.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <Icon className="w-12 h-12 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-body leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
