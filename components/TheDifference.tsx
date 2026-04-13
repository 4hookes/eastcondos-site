"use client";

import { useInView } from "@/hooks/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ComparisonCard } from "@/components/ui/ComparisonCard";
import data from "@/content/difference.json";

/*
 * Usage:
 * import TheDifference from "@/components/TheDifference";
 * <TheDifference />
 */

export default function TheDifference() {
  const { ref, isVisible } = useInView();

  const typicalItems = data.comparison.map((row) => ({
    label: row.label,
    value: row.typical,
  }));

  const eastcondosItems = data.comparison.map((row) => ({
    label: row.label,
    value: row.eastcondos,
  }));

  return (
    <SectionWrapper id="the-difference" background="white" className="grain">
      {/* Section header */}
      <div
        ref={ref}
        className={`text-center fade-in-section ${isVisible ? "is-visible" : ""}`}
      >
        <p className="section-label">{data.sectionLabel}</p>
        <h2 className="section-heading">{data.heading}</h2>
      </div>

      {/* Amber divider */}
      <div className="w-16 h-px bg-amber/40 mx-auto my-8" aria-hidden="true" />

      {/* Team photo placeholder */}
      <div className="mt-10 w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 text-sm text-center px-4">
        IMAGE: The EastCondos team — your dedicated advisory operation
      </div>

      {/* Comparison cards */}
      <div
        className={`relative mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-section stagger-2 ${isVisible ? "is-visible" : ""}`}
      >
        {/* "vs" badge — visible only on md+ screens, centered between the two cards */}
        <div
          aria-hidden="true"
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-amber text-white font-bold text-sm items-center justify-center shadow-md"
        >
          vs
        </div>

        <ComparisonCard
          variant="muted"
          title="Typical Agent"
          items={typicalItems}
        />

        <ComparisonCard
          variant="highlighted"
          title="EastCondos"
          items={eastcondosItems}
        />
      </div>
    </SectionWrapper>
  );
}
