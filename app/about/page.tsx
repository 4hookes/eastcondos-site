import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import aboutData from "@/content/about.json";
import teamData from "@/content/team.json";

export const metadata: Metadata = {
  title: "About | EastCondos.sg",
  description:
    "Meet Elfi Abdullah and the EastCondos team — 13 years, 500+ families helped, 80% referral rate. East Singapore's specialist HDB-to-condo upgrade advisory.",
  openGraph: {
    title: "About | EastCondos.sg",
    description:
      "Meet Elfi Abdullah and the EastCondos team — 13 years, 500+ families helped, 80% referral rate. East Singapore's specialist HDB-to-condo upgrade advisory.",
    type: "website",
    url: "https://eastcondos.sg/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Badge variant="amber-outline" className="mb-6">
            About EastCondos
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-white leading-tight mb-6">
            Depth over breadth.
            <br />
            Trust over volume.
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            EastCondos was built on one belief: that families deserve an advisor
            who knows their patch of Singapore inside out — and will tell them
            the truth, even when the truth is &ldquo;not yet.&rdquo;
          </p>
        </div>
      </section>

      {/* Elfi's Story */}
      <SectionWrapper background="white">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Photo */}
          <div className="flex-shrink-0 w-full md:w-80">
            {aboutData.image?.src ? (
              <img
                src={aboutData.image.src}
                alt={aboutData.image.alt}
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                Elfi photo
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="flex-1">
            <p className="section-label">{aboutData.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-charcoal leading-tight mb-2">
              {aboutData.heading}
            </h2>
            <p className="text-amber font-semibold text-lg mb-6">
              {aboutData.subtitle}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {aboutData.body}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-0 mt-10 border-t border-gray-100 pt-8">
              {aboutData.stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  accentChar="+"
                  className="flex-1 min-w-[100px]"
                />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper background="offwhite">
        <p className="section-label text-center">{teamData.sectionLabel}</p>
        <h2 className="text-4xl md:text-5xl font-serif font-normal text-charcoal leading-tight text-center mb-4">
          A dedicated team behind
          <br className="hidden md:block" /> every transaction.
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          {teamData.subtext}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamData.members.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  {/* Photo */}
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {member.name[0]}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-xl font-serif text-charcoal">
                        {member.name}
                      </h3>
                      {"tag" in member && member.tag && (
                        <span className="text-xs font-semibold uppercase tracking-wider bg-amber/10 text-amber px-2.5 py-1 rounded-full">
                          {member.tag as string}
                        </span>
                      )}
                    </div>
                    <p className="text-amber font-semibold text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>

                    {/* Contact links */}
                    <div className="flex flex-wrap gap-4 mt-5">
                      {"phone" in member && member.phone && (
                        <a
                          href={`tel:${member.phone as string}`}
                          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-charcoal transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{member.phone as string}</span>
                        </a>
                      )}
                      {"whatsapp" in member && member.whatsapp && (
                        <a
                          href={member.whatsapp as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 transition-colors font-semibold"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-label="WhatsApp"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      )}
                      {"email" in member && member.email && (
                        <a
                          href={`mailto:${member.email as string}`}
                          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-charcoal transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{member.email as string}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-charcoal py-24 text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white leading-tight mb-6">
            Ready to work with us?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Book a free strategy session. We&rsquo;ll review your numbers and
            tell you exactly where you stand — no obligations, no pressure.
          </p>
          <a href="/strategy-session" className="btn-primary">
            Book a Strategy Session
          </a>
        </div>
      </section>
    </>
  );
}
