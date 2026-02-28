import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import indexData from "@/content/case-studies/index.json";

// Dynamically import each case study by slug
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

const caseStudyMap: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export const metadata: Metadata = {
  title: "Success Stories – eastcondos.sg",
  description:
    "Real HDB-to-condo upgrade success stories from East Singapore families. See how Elfi helped families upgrade with zero cash outlay.",
  openGraph: {
    title: "Success Stories – eastcondos.sg",
    description:
      "Real HDB-to-condo upgrade success stories from East Singapore families. See how Elfi helped families upgrade with zero cash outlay.",
    type: "website",
    url: "https://eastcondos.sg/case-studies",
  },
};

export default function CaseStudiesPage() {
  const caseStudies = indexData.slugs
    .map((slug) => caseStudyMap[slug])
    .filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-sage-dark py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label text-white/70">{indexData.sectionLabel}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {indexData.heading}
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            {indexData.subtext}
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  slug={study.slug}
                  title={study.title}
                  headline={study.headline}
                  category={study.category}
                  coverImage={study.coverImage}
                  stats={study.stats}
                  client={study.client}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-body text-lg">
              No case studies available yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-sage-light py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
            Ready to write your own success story?
          </h2>
          <p className="text-body text-lg mb-8 leading-relaxed">
            Get a personalised upgrade strategy from Elfi — no obligation, no pressure.
          </p>
          <a href="/calculator" className="btn-primary">
            Get Your Free Strategy
          </a>
        </div>
      </section>
    </>
  );
}
