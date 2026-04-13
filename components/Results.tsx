"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Button } from "@/components/ui/Button";
import CaseStudyCard from "@/components/CaseStudyCard";
import indexData from "@/content/case-studies/index.json";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";
import testimonialsData from "@/content/testimonials.json";

/*
 * Usage:
 * import Results from "@/components/Results";
 * <Results />
 */

// Map of all available case study data — extend as new slugs are added
const caseStudyMap: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export default function Results() {
  const { ref, isVisible } = useInView();

  const caseStudies = indexData.slugs
    .map((slug) => caseStudyMap[slug])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <SectionWrapper id="results" background="white">
      {/* Section header */}
      <div
        ref={ref}
        className={`text-center fade-in-section ${isVisible ? "is-visible" : ""}`}
      >
        <p className="section-label">REAL RESULTS</p>
        <h2 className="section-heading">Real results from real families.</h2>
      </div>

      {/* Case study cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 fade-in-section stagger-1 ${isVisible ? "is-visible" : ""}`}
      >
        {caseStudies.map((story) => (
          <CaseStudyCard
            key={story.slug}
            slug={story.slug}
            title={story.title}
            headline={story.headline}
            category={story.category}
            coverImage={story.coverImage}
            stats={story.stats}
            client={{
              name: story.client.name,
              initials: story.client.initials,
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="mt-16 mb-12 border-t border-gray-100" />

      {/* Testimonial cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-section stagger-2 ${isVisible ? "is-visible" : ""}`}
      >
        {testimonialsData.items.map((item, index) => (
          <div
            key={index}
            className={`fade-in-section stagger-${index + 2} card-glow rounded-2xl ${isVisible ? "is-visible" : ""}`}
          >
            <TestimonialCard
              quote={item.quote}
              name={item.names}
              context={item.context}
              initials={item.initials}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className={`text-center mt-12 fade-in-section stagger-5 ${isVisible ? "is-visible" : ""}`}
      >
        <Link href="/case-studies">
          <Button variant="outline" size="lg">
            See all success stories &rarr;
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
