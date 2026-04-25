import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://eastcondos.sg"),
  title: "Guides — Practical References for East Singapore HDB Upgraders · EastCondos.sg",
  description:
    "Working reference guides for HDB owners upgrading to a condo in East Singapore. Each guide covers the mechanics, numbers, and sequencing decisions that matter — structured for clarity, not content.",
  openGraph: {
    title: "Guides — EastCondos.sg",
    description:
      "Practical reference guides on HDB-to-condo upgrading in East Singapore. Buy-or-sell sequencing, ABSD timing, district selection, loan structure.",
    type: "website",
    url: "https://eastcondos.sg/guides",
  },
};

const guides = [
  {
    no: "01",
    slug: "east-singapore-hdb-upgrader",
    title: "The East Singapore HDB Upgrader's Guide",
    standfirst:
      "A structured reference for HDB owners in D14–18 who are seriously considering a condo upgrade — but want the full picture before moving.",
    covers: [
      "Is now a bad time to sell in East Singapore?",
      "At what age does the loan tenor math start working against you?",
      "How much cash do you actually need beyond HDB proceeds?",
      "Buy first or sell first — the short answer",
      "Which East Singapore districts should you target?",
      "New launch vs resale: what actually matters",
    ],
    readingTime: 12,
    updatedDate: "2026-04-25",
    cluster: "HDB Upgrade",
  },
  {
    no: "02",
    slug: "buy-or-sell-first",
    title: "Buy First or Sell First? The Complete Sequencing Guide",
    standfirst:
      "The most consequential sequencing decision in an HDB upgrade — and the one most commonly misunderstood. OTP exercise, ABSD timing, bridging loans: the full mechanics.",
    covers: [
      "Do you need to sell your HDB before buying a condo?",
      "What is OTP exercise — and why does it stop the ABSD clock?",
      "How long does an HDB resale actually take?",
      "The ABSD 6-month remission rule: what it is and when to use it",
      "Why you may still need a bridging loan even if you sell first",
      "What happens if your HDB buyer walks away?",
    ],
    readingTime: 10,
    updatedDate: "2026-04-25",
    cluster: "Transaction Mechanics",
  },
  {
    no: "03",
    slug: "d15-vs-d16-vs-d18",
    title: "D15 vs D16 vs D18 — Comparing East Singapore Districts for HDB Upgraders",
    standfirst:
      "Three districts. Three different exit audiences. The 2026 comparative read on D15 (Marine Parade / Katong / Joo Chiat), D16 (Bedok / Tanah Merah / Bayshore), and D18 (Tampines / Pasir Ris) for upgraders deciding where to go next.",
    covers: [
      "Why each district attracts a different kind of upgrader",
      "What $1.5M, $2M, and $2.5M actually buys you in each district today",
      "Who buys it from you in 7–10 years — the exit audience by district",
      "The Thomson-East Coast Line effect on D15 and D16",
      "Supply pipeline — and the contrarian read on D18",
      "Which district keeps the most options open for an East Singapore HDB upgrader?",
    ],
    readingTime: 14,
    updatedDate: "2026-04-25",
    cluster: "District Selection",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GuidesIndexPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://eastcondos.sg/guides",
                name: "Guides — EastCondos.sg",
                description:
                  "Practical reference guides for HDB owners upgrading to a condo in East Singapore. Covers sequencing, ABSD timing, district selection, and loan structure.",
                url: "https://eastcondos.sg/guides",
                isPartOf: { "@id": "https://eastcondos.sg/#website" },
                publisher: { "@id": "https://eastcondos.sg/#organization" },
                inLanguage: "en-SG",
                mainEntity: {
                  "@type": "ItemList",
                  name: "HDB Upgrade Guides — EastCondos.sg",
                  numberOfItems: guides.length,
                  itemListElement: guides.map((g, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `https://eastcondos.sg/guides/${g.slug}`,
                    name: g.title,
                  })),
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://eastcondos.sg/guides#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://eastcondos.sg",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Guides",
                    item: "https://eastcondos.sg/guides",
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* ===== Masthead ===== */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <div className="max-w-[720px]">
          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
            <span className="w-5 sm:w-8 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
              The Guides · EastCondos.sg
            </span>
          </div>
          <h1
            className="font-serif text-charcoal"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.028em",
              marginBottom: "20px",
            }}
          >
            Practical references
            <br />
            for serious upgraders.
          </h1>
          <p
            className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug"
            style={{ maxWidth: "54ch" }}
          >
            Each guide is a working reference — structured answers to the
            questions that actually come up in an upgrade advisory. No fluff, no
            generic copy.
          </p>
        </div>
      </section>

      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        {/* ===== Guides label ===== */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            {guides.length} guides published
          </span>
        </div>

        {/* ===== Guide cards ===== */}
        <div className="space-y-6 sm:space-y-8">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block border border-charcoal bg-paper hover:bg-amber/10 transition-colors group"
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
                {/* Left — meta strip */}
                <div className="bg-charcoal text-cream p-6 sm:p-8 border-b md:border-b-0 md:border-r border-charcoal flex flex-col justify-between">
                  <div>
                    <div
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] mb-4"
                      style={{ color: "rgba(242, 235, 219, 0.5)" }}
                    >
                      Guide {guide.no}
                    </div>
                    <div className="space-y-5">
                      <div>
                        <div
                          className="text-[9px] uppercase tracking-[0.22em] mb-1"
                          style={{ color: "rgba(242, 235, 219, 0.5)" }}
                        >
                          Cluster
                        </div>
                        <div className="font-serif text-amber text-[15px] sm:text-[16px] leading-tight">
                          {guide.cluster}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-[9px] uppercase tracking-[0.22em] mb-1"
                          style={{ color: "rgba(242, 235, 219, 0.5)" }}
                        >
                          Reading time
                        </div>
                        <div className="font-serif text-amber text-[15px] sm:text-[16px] leading-tight">
                          {guide.readingTime} min
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-[9px] uppercase tracking-[0.22em] mb-1"
                          style={{ color: "rgba(242, 235, 219, 0.5)" }}
                        >
                          Updated
                        </div>
                        <div className="font-serif text-amber text-[14px] sm:text-[15px] leading-tight">
                          {formatDate(guide.updatedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="mt-8 pt-5 border-t text-[10px] sm:text-[11px] italic font-serif"
                    style={{
                      borderColor: "rgba(242, 235, 219, 0.12)",
                      color: "rgba(242, 235, 219, 0.5)",
                    }}
                  >
                    Elfi Abdullah · EastCondos.sg
                  </div>
                </div>

                {/* Right — content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <h2
                    className="font-serif text-charcoal mb-3 sm:mb-4 group-hover:text-amber-deep transition-colors"
                    style={{
                      fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {guide.title}
                  </h2>
                  <p
                    className="font-serif italic text-charcoal text-[15px] sm:text-[17px] leading-snug mb-5 sm:mb-6"
                    style={{ maxWidth: "52ch" }}
                  >
                    {guide.standfirst}
                  </p>

                  {/* Covers list */}
                  <div className="mb-6 sm:mb-7">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep font-medium mb-3">
                      Covers
                    </div>
                    <ul className="space-y-1.5">
                      {guide.covers.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-baseline gap-2.5 text-body text-[13px] sm:text-[14px] leading-snug"
                        >
                          <span className="text-amber-deep text-[10px] mt-0.5 shrink-0">
                            ↳
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-amber-deep font-medium group-hover:underline underline-offset-4">
                    Read the guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== Guides vs Journal divider ===== */}
        <div className="mt-16 sm:mt-20 border-t border-charcoal pt-10 sm:pt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-px bg-amber-deep" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-amber-deep font-medium">
                  Guides
                </span>
              </div>
              <h3
                className="font-serif text-charcoal mb-3"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", letterSpacing: "-0.015em" }}
              >
                Reference material.
              </h3>
              <p className="text-body text-[14px] sm:text-[15px] leading-relaxed" style={{ maxWidth: "42ch" }}>
                Guides are structured Q&amp;A references designed to be consulted repeatedly. Updated when rules
                change. Built for upgraders who want the mechanics, not the marketing.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-px bg-amber-deep" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-amber-deep font-medium">
                  Journal
                </span>
              </div>
              <h3
                className="font-serif text-charcoal mb-3"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", letterSpacing: "-0.015em" }}
              >
                Market commentary.
              </h3>
              <p className="text-body text-[14px] sm:text-[15px] leading-relaxed" style={{ maxWidth: "42ch" }}>
                The Journal is Elfi's editorial lens on the market — opinion, analysis, and framework-teaching.
                Fewer pieces, each one written and reviewed before it ships.{" "}
                <Link href="/journal" className="text-amber-deep underline underline-offset-4 hover:text-charcoal transition-colors">
                  Read the Journal →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ===== Bottom CTA ===== */}
        <div className="mt-16 sm:mt-20 bg-charcoal text-cream text-center py-10 sm:py-14 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
              Work with Elfi
            </span>
            <span className="w-5 sm:w-7 h-px bg-amber" />
          </div>
          <h3
            className="font-serif text-[24px] sm:text-[34px] mb-3 sm:mb-4"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Turn the <em className="text-amber italic">reading</em> into a plan.
          </h3>
          <p
            className="max-w-[52ch] mx-auto text-[15px] sm:text-[16px] mb-6 sm:mb-8 leading-relaxed"
            style={{ color: "rgba(242, 235, 219, 0.7)" }}
          >
            If a guide resonates with your situation, book a 10-minute Clarity
            Call. Same frameworks, applied to your numbers.
          </p>
          <Link
            href="/strategy-session"
            className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors"
          >
            Request a Clarity Call
          </Link>
        </div>
      </main>
    </div>
  );
}
