"use client";

import { useInView } from "@/hooks/useInView";
import TeamCard from "./TeamCard";
import teamData from "@/content/team.json";

export default function TeamPreview() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="team"
      className="bg-light-gray py-16 md:py-24"
      ref={ref}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center">
          <p className="section-label">{teamData.sectionLabel}</p>
          <h2 className="section-heading">{teamData.heading}</h2>
          <p className="section-subtext mx-auto">{teamData.subtext}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {teamData.members.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              oneLiner={member.oneLiner}
              photo={member.photo}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/team"
            className="text-gold font-semibold hover:text-gold-light"
          >
            Meet the Full Team →
          </a>
        </div>
      </div>
    </section>
  );
}
