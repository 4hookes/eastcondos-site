"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StatCard } from "@/components/ui/StatCard";

/**
 * TrustBar — horizontal strip of four social-proof stats.
 *
 * Sits directly below the Hero. Uses StatCard for each metric.
 * Vertical dividers appear between items on md+ screens.
 *
 * Usage:
 *   import TrustBar from "@/components/TrustBar";
 *   <TrustBar />
 */

const STATS = [
  { value: "13", label: "Years of Experience" },
  { value: "500+", label: "Families Served", accentChar: "+" },
  { value: "80%", label: "Referral Rate", accentChar: "%" },
  { value: "4.9", label: "Google Rating" },
] as const;

export default function TrustBar() {
  return (
    <SectionWrapper
      background="white"
      className="py-0 border-y border-gray-100"
    >
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        role="list"
        aria-label="Trust statistics"
      >
        {STATS.map((stat, index) => {
          const isLastOnDesktop = index === STATS.length - 1;
          const isOddOnMobile = index % 2 === 0;
          const isTopRowOnMobile = index < 2;

          return (
            <div
              key={stat.label}
              role="listitem"
              className={[
                "flex items-center justify-center",
                // Mobile: right border on odd items, bottom border on first row
                isOddOnMobile && !isLastOnDesktop
                  ? "border-r border-gray-100"
                  : "",
                isTopRowOnMobile ? "border-b border-gray-100 md:border-b-0" : "",
                // Desktop: right border on all but last
                !isLastOnDesktop
                  ? "md:border-r md:border-gray-200 md:border-b-0"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <StatCard
                value={stat.value}
                label={stat.label}
                accentChar={"accentChar" in stat ? stat.accentChar : undefined}
                className="py-8 md:py-12"
              />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
