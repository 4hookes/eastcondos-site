"use client";

import { useInView } from "@/hooks/useInView";
import aboutData from "@/content/about.json";

export default function About() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="about"
      className="bg-white py-16 md:py-24"
      ref={ref}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <div className="order-2 lg:order-1">
            <img
              src={aboutData.image.src}
              alt={aboutData.image.alt}
              className="rounded-xl shadow-lg w-full max-w-md mx-auto"
            />
          </div>

          {/* Right column - Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label">{aboutData.sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              {aboutData.heading}
            </h2>
            <p className="text-lg text-gold mt-2 italic">
              {aboutData.subtitle}
            </p>
            <p className="text-body leading-relaxed mt-6">
              {aboutData.body}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-8">
              {aboutData.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-sm text-body">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a href={aboutData.cta.href} className="btn-primary">
                {aboutData.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
