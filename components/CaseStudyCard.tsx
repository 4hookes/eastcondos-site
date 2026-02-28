import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  headline: string;
  category: string;
  coverImage?: string;
  stats: {
    savings: string;
    timeline: string;
    propertyType: string;
  };
  client: {
    name: string;
    initials: string;
    photo?: string;
  };
}

export default function CaseStudyCard({
  slug,
  title,
  headline,
  category,
  coverImage,
  stats,
  client,
}: CaseStudyCardProps) {
  return (
    <a
      href={`/case-studies/${slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Cover image */}
      {coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Top section: sage-light bg with category badge + headline */}
      <div className="bg-sage-light px-6 pt-6 pb-5">
        <span className="inline-block px-3 py-1 bg-sage/20 text-sage text-xs font-semibold rounded-full mb-3">
          {category}
        </span>
        <p className="text-2xl font-bold text-gold font-serif leading-tight">
          {headline}
        </p>
      </div>

      {/* Content section */}
      <div className="px-6 py-5">
        <h3 className="font-bold text-navy text-lg leading-snug mb-4 group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>

        {/* Stats row */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1 text-center bg-sage-light rounded-lg py-2 px-3">
            <p className="text-xs text-sage font-semibold uppercase tracking-wide mb-0.5">
              Savings
            </p>
            <p className="text-sm font-bold text-navy">{stats.savings}</p>
          </div>
          <div className="flex-1 text-center bg-sage-light rounded-lg py-2 px-3">
            <p className="text-xs text-sage font-semibold uppercase tracking-wide mb-0.5">
              Timeline
            </p>
            <p className="text-sm font-bold text-navy">{stats.timeline}</p>
          </div>
        </div>

        {/* Client avatar + Read Story link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {client.photo ? (
              <img
                src={client.photo}
                alt={client.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {client.initials}
              </div>
            )}
            <span className="text-sm text-body font-medium">{client.name}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all duration-200">
            Read Story
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
