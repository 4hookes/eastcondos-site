import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import teamData from "@/content/team.json";

export const metadata: Metadata = {
  title: "Our Team – eastcondos.sg",
  description:
    "Meet the EastCondo Specialist team - Elfi, Jimmy, Alyssa, and Aaron. Expert property consultants helping East Singapore families upgrade from HDB to condo.",
  openGraph: {
    title: "Our Team – eastcondos.sg",
    description:
      "Meet the EastCondo Specialist team - Elfi, Jimmy, Alyssa, and Aaron. Expert property consultants helping East Singapore families upgrade from HDB to condo.",
    type: "website",
    url: "https://eastcondos.sg/team",
  },
};

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {teamData.heading}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {teamData.subtext}
          </p>
          <img
            src={teamData.teamPhoto.src}
            alt={teamData.teamPhoto.alt}
            className="rounded-xl max-w-3xl w-full mx-auto mt-8 shadow-2xl"
          />
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12 mt-8">
            {teamData.members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="flex-shrink-0">
                  <img
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy">
                      {member.name}
                    </h2>
                    {member.tag && (
                      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full w-fit">
                        {member.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-gold font-semibold text-lg mb-2">
                    {member.role}
                  </p>

                  <p className="text-body leading-relaxed mt-4">{member.bio}</p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-sm text-body hover:text-navy transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                    {member.whatsapp && (
                      <a
                        href={member.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors font-semibold"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-sm text-body hover:text-navy transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {teamData.teamPageCta.heading}
          </h2>
          <a
            href={teamData.teamPageCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {teamData.teamPageCta.label}
          </a>
        </div>
      </section>
    </>
  );
}
