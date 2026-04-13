"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TimelineStep } from "@/components/ui/TimelineStep";
import data from "@/content/how-it-works.json";

/*
 * Usage:
 * import HowItWorks from "@/components/HowItWorks";
 * <HowItWorks />
 */

export default function HowItWorks() {
  const { ref, isVisible } = useInView();

  return (
    <SectionWrapper id="how-it-works" background="offwhite">
      {/* Section header */}
      <div
        ref={ref}
        className={`text-center fade-in-section ${isVisible ? "is-visible" : ""}`}
      >
        <p className="section-label">{data.sectionLabel}</p>
        <h2 className="section-heading tracking-[-0.01em]">{data.heading}</h2>
        <p className="section-subtext mx-auto">{data.subtext}</p>
      </div>

      {/* Desktop: horizontal amber connector line above the cards */}
      <div className="hidden md:block relative mt-16 mb-0 h-0.5 mx-10">
        <div className="absolute inset-0 bg-gradient-to-r from-amber/20 via-amber/40 to-amber/20 rounded-full" />
        {/* Amber dots at each step position */}
        {data.steps.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber"
            style={{ left: `calc(${(i / (data.steps.length - 1)) * 100}% - 6px)` }}
          />
        ))}
      </div>

      {/* Desktop: 4-column grid with number badges above */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 mt-6">
        {data.steps.map((step, index) => (
          <div
            key={step.number}
            className={`fade-in-section stagger-${index + 1} ${isVisible ? "is-visible" : ""}`}
          >
            {/* Number badge, aligned with the connector line above */}
            <div className="flex justify-center -mt-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber text-white font-bold text-base flex items-center justify-center shadow-sm">
                {step.number}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-serif text-charcoal">{step.title}</h3>
              <p className="text-base text-gray-600 mt-2 leading-relaxed">
                {step.description}
              </p>
              <div className="w-full h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-xs mt-4 px-2 text-center">
                {step.imagePlaceholder}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical stacked timeline */}
      <div className="md:hidden mt-10 space-y-0">
        {data.steps.map((step, index) => (
          <div
            key={step.number}
            className={`fade-in-section stagger-${index + 1} ${isVisible ? "is-visible" : ""}`}
          >
            <TimelineStep
              number={step.number}
              title={step.title}
              description={step.description}
              imagePlaceholder={step.imagePlaceholder}
              isLast={index === data.steps.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Bottom link */}
      <div
        className={`text-center mt-12 fade-in-section stagger-5 ${isVisible ? "is-visible" : ""}`}
      >
        <Link
          href="/process"
          className="inline-flex items-center gap-2 text-base font-semibold text-charcoal hover:text-amber transition-colors duration-200 underline-offset-4 hover:underline"
        >
          See the full process
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </SectionWrapper>
  );
}
