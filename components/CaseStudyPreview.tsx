"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import CaseStudyCard from "./CaseStudyCard";
import indexData from "@/content/case-studies/index.json";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

const caseStudies: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export default function CaseStudyPreview() {
  const { ref, isVisible } = useInView();

  const stories = indexData.slugs
    .map((slug) => caseStudies[slug])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <section className="bg-white py-16 md:py-24" ref={ref}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="text-center">
          <p className="section-label">{indexData.sectionLabel}</p>
          <h2 className="section-heading">{indexData.heading}</h2>
          <p className="section-subtext mx-auto">{indexData.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          {stories.map((story) => (
            <CaseStudyCard
              key={story.slug}
              slug={story.slug}
              title={story.title}
              headline={story.headline}
              category={story.category}
              stats={story.stats}
              client={{
                name: story.client.name,
                initials: story.client.initials,
              }}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/case-studies"
            className="text-gold font-semibold hover:text-gold-light"
          >
            See All Success Stories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
