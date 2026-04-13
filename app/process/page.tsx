import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import processData from "@/content/process.json";

export const metadata: Metadata = {
  title: "How It Works | EastCondos.sg",
  description:
    "A structured 4-8 month path from HDB to your new condo. See every phase of the EastCondos upgrade process — qualify, sell, buy, and execute without a gap period.",
  openGraph: {
    title: "How It Works | EastCondos.sg",
    description:
      "A structured 4-8 month path from HDB to your new condo. See every phase of the EastCondos upgrade process.",
    type: "website",
    url: "https://eastcondos.sg/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Badge variant="amber-outline" className="mb-6">
            {processData.sectionLabel}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-white leading-tight mb-6">
            {processData.heading}
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            {processData.subtext}
          </p>
        </div>
      </section>

      {/* Overview */}
      <SectionWrapper background="white" narrow>
        <div className="text-center mb-8">
          <span className="inline-block bg-amber/10 text-amber font-semibold text-sm px-5 py-2 rounded-full">
            {processData.timelineStat}
          </span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          {processData.overviewBody}
        </p>
      </SectionWrapper>

      {/* Phase Sections */}
      {processData.phases.map((phase, index) => {
        const isEven = index % 2 === 0;
        return (
          <SectionWrapper
            key={phase.number}
            background={isEven ? "offwhite" : "white"}
          >
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
              {/* Content side */}
              <div className={`flex-1 ${!isEven ? "md:order-2" : ""}`}>
                <span className="text-7xl font-bold text-amber/20 leading-none block mb-2 font-sans">
                  {phase.number}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal leading-tight mb-5">
                  {phase.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {phase.description}
                </p>

                {/* Deliverable callout */}
                <div className="flex items-start gap-3 bg-amber/5 border-l-4 border-amber rounded-r-xl px-5 py-4">
                  <svg
                    className="w-5 h-5 text-amber flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber mb-1">
                      Key Deliverable
                    </p>
                    <p className="text-base text-charcoal font-medium">
                      {phase.deliverable}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image side */}
              <div className={`flex-1 w-full ${!isEven ? "md:order-1" : ""}`}>
                <div className="w-full aspect-[4/3] bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                  {phase.imagePlaceholder}
                </div>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      {/* CTA */}
      <section className="bg-charcoal py-24 text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white leading-tight mb-6">
            {processData.cta.heading}
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            We&rsquo;ll review your numbers and tell you exactly where you
            stand — before anything moves.
          </p>
          <a href={processData.cta.href} className="btn-primary">
            {processData.cta.label}
          </a>
        </div>
      </section>
    </>
  );
}
