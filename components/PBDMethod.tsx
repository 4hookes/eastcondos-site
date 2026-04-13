"use client";

import { Target, TrendingUp, Users, Scale, LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import pbdData from "@/content/pbd-method.json";

// Map JSON icon string → Lucide component
const iconMap: Record<string, LucideIcon> = {
  Target,
  TrendingUp,
  Users,
  Scale,
};

interface Framework {
  icon: string;
  title: string;
  description: string;
}

function FrameworkCard({ framework }: { framework: Framework }) {
  const Icon = iconMap[framework.icon] ?? Target;

  return (
    <div className="bg-white rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
        <Icon className="text-amber w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-charcoal mt-4">
        {framework.title}
      </h3>
      <p className="text-base text-gray-600 mt-2 leading-relaxed">
        {framework.description}
      </p>
    </div>
  );
}

export default function PBDMethod() {
  return (
    <SectionWrapper background="offwhite" id="pbd-method">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="section-label">{pbdData.sectionLabel}</p>
        <h2 className="section-heading">{pbdData.heading}</h2>
        <p className="section-subtext mx-auto mt-4">{pbdData.subtext}</p>
      </div>

      {/* Framework cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pbdData.frameworks.map((framework) => (
          <FrameworkCard key={framework.title} framework={framework} />
        ))}
      </div>

      {/* Footer link */}
      <div className="text-center mt-12">
        <a
          href={pbdData.footerLink.href}
          className="text-base font-medium text-charcoal hover:text-amber transition-colors duration-200 inline-flex items-center gap-1"
        >
          {pbdData.footerLink.label}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </SectionWrapper>
  );
}

/*
 * Usage:
 * import PBDMethod from "@/components/PBDMethod";
 * <PBDMethod />
 *
 * Sits between the hero/how-it-works sections and the testimonials block.
 * Content lives in content/pbd-method.json — edit framework copy there.
 */
