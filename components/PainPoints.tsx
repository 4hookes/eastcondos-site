"use client";

import { HelpCircle, Shield, DollarSign, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";
import data from "@/content/pain-points.json";

/**
 * PainPoints — "The Problem" empathy section addressing 4 HDB upgrader fears.
 *
 * Layout: 60% left (2x2 card grid) + 40% right (image placeholder) on desktop.
 * On mobile: image first, then cards stacked.
 *
 * Usage:
 *   import PainPoints from "@/components/PainPoints";
 *   <PainPoints />
 */

const ICONS = [HelpCircle, Shield, DollarSign, Clock] as const;

const STAGGER_CLASSES = [
  "stagger-1",
  "stagger-2",
  "stagger-3",
  "stagger-4",
] as const;

export default function PainPoints() {
  const { ref, isVisible } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="pain-points" background="offwhite">
      {/* Section header */}
      <div className="mb-12">
        <div className="section-label">{data.sectionLabel}</div>
        <h2 className="section-heading max-w-2xl">{data.heading}</h2>
      </div>

      {/* Main layout: cards left, image right */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start"
      >
        {/* ── Card grid (60% = 3 of 5 cols) ─────────────────────────────── */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {data.items.map((item, index) => {
            const Icon = ICONS[index] ?? HelpCircle;
            const stagger = STAGGER_CLASSES[index] ?? "stagger-1";

            return (
              <article
                key={item.title}
                className={[
                  // Fade-in animation
                  "fade-in-section",
                  stagger,
                  isVisible ? "is-visible" : "",
                  // Card base
                  "bg-white rounded-2xl p-6",
                  "border border-gray-100",
                  "relative overflow-hidden",
                  // Hover state (amber top accent via pseudo is not possible
                  // in pure Tailwind; we use a real element instead)
                  "hover:-translate-y-1 hover:shadow-lg hover:border-transparent",
                  "transition-all duration-300",
                  "group card-glow",
                ].join(" ")}
              >
                {/* Amber top-accent line — revealed on hover */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-amber origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  aria-hidden="true"
                />

                {/* Amber left border — revealed on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
                  aria-hidden="true"
                />

                {/* Icon container */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(212, 168, 67, 0.10)" }}
                  aria-hidden="true"
                >
                  <Icon
                    className="w-5 h-5 text-amber"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg font-semibold text-charcoal mt-4">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* ── Image placeholder (40% = 2 of 5 cols) ─────────────────────── */}
        <div
          className={[
            "md:col-span-2 order-first md:order-last",
            "fade-in-section stagger-1",
            isVisible ? "is-visible" : "",
          ].join(" ")}
        >
          <div
            className="w-full h-64 md:h-full min-h-[320px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center px-6 py-8 text-center"
            role="img"
            aria-label="Image placeholder: Couple overwhelmed by property research"
          >
            {/* Camera icon — inline SVG, no emoji */}
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
                aria-hidden="true"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <p className="text-gray-400 text-sm font-medium leading-snug max-w-[200px]">
                IMAGE: Couple overwhelmed by property research
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
