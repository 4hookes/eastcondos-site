import type { Metadata } from "next";
import Link from "next/link";
import indexData from "@/content/journal/index.json";
import hdbBotox from "@/content/journal/your-hdb-looks-young-inside-its-old.json";
import earlierPhasePlay from "@/content/journal/yesterdays-launch-price-earlier-phase-play.json";
import waitingTrap from "@/content/journal/the-waiting-trap.json";

type JournalSummary = {
  slug: string;
  title: string;
  titleHtml: string;
  kicker: string;
  standfirst: string;
  excerpt: string;
  publishDate: string;
  readingTimeMinutes: number;
  topicCluster: string;
  author: { name: string; role: string };
  framework?: { name: string; id: string };
};

const articles: JournalSummary[] = [waitingTrap as JournalSummary, earlierPhasePlay as JournalSummary, hdbBotox as JournalSummary];

export const metadata: Metadata = {
  title: `${indexData.heading} — The Journal · EastCondos.sg`,
  description: indexData.subtext,
  openGraph: {
    title: `The Journal — EastCondos.sg`,
    description: indexData.subtext,
    type: "website",
    url: "https://eastcondos.sg/journal",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function JournalIndexPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Masthead ===== */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            {indexData.sectionLabel}
          </span>
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
        </div>
        <h1
          className="font-serif text-charcoal mx-auto"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.028em",
            maxWidth: "20ch",
            marginBottom: "22px",
          }}
        >
          {indexData.heading}
        </h1>
        <p
          className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug mx-auto"
          style={{ maxWidth: "56ch" }}
        >
          {indexData.subtext}
        </p>
      </section>

      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        {/* ===== Featured Cover Story ===== */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            The Cover Story · Current Issue
          </span>
        </div>
        <h2
          className="font-serif text-charcoal mb-6 sm:mb-8"
          style={{
            fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Read first.
        </h2>

        <Link
          href={`/journal/${featured.slug}`}
          className="block border border-charcoal bg-paper hover:bg-amber/10 transition-colors group"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
            {/* Left — data strip */}
            <div className="bg-charcoal text-cream p-6 sm:p-10 border-b md:border-b-0 md:border-r border-charcoal flex flex-col justify-between">
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.28em] mb-5 sm:mb-6"
                  style={{ color: "rgba(242, 235, 219, 0.6)" }}
                >
                  {featured.kicker}
                </div>
                <div className="grid grid-cols-2 gap-5 sm:gap-7">
                  <div>
                    <div
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                      style={{ color: "rgba(242, 235, 219, 0.55)" }}
                    >
                      Topic
                    </div>
                    <div className="font-serif text-amber text-[17px] sm:text-[19px] leading-tight">
                      {featured.topicCluster}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                      style={{ color: "rgba(242, 235, 219, 0.55)" }}
                    >
                      Reading time
                    </div>
                    <div className="font-serif text-amber text-[17px] sm:text-[19px] leading-tight">
                      {featured.readingTimeMinutes} min
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                      style={{ color: "rgba(242, 235, 219, 0.55)" }}
                    >
                      Published
                    </div>
                    <div className="font-serif text-amber text-[15px] sm:text-[17px] leading-tight">
                      {formatDate(featured.publishDate)}
                    </div>
                  </div>
                  {featured.framework && (
                    <div>
                      <div
                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                        style={{ color: "rgba(242, 235, 219, 0.55)" }}
                      >
                        Framework
                      </div>
                      <div className="font-serif text-amber text-[15px] sm:text-[17px] leading-tight">
                        {featured.framework.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="mt-8 pt-6 border-t text-[11px] sm:text-[12px] italic font-serif"
                style={{
                  borderColor: "rgba(242, 235, 219, 0.15)",
                  color: "rgba(242, 235, 219, 0.65)",
                }}
              >
                By {featured.author.name} · {featured.author.role}
              </div>
            </div>

            {/* Right — story */}
            <div className="p-6 sm:p-10">
              <h3
                className="font-serif text-charcoal mb-4 sm:mb-5 group-hover:text-amber-deep transition-colors"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.022em",
                }}
                dangerouslySetInnerHTML={{
                  __html: featured.titleHtml.replace(
                    /<em>/g,
                    '<em class="italic text-amber-deep">'
                  ),
                }}
              />
              <p
                className="font-serif italic text-charcoal text-[16px] sm:text-[18px] leading-snug mb-5 sm:mb-6"
                style={{ maxWidth: "42ch" }}
              >
                {featured.standfirst}
              </p>
              <p className="text-body text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-[52ch]">
                {featured.excerpt}
              </p>
              <span className="inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-amber-deep font-medium">
                Read the full dispatch →
              </span>
            </div>
          </div>
        </Link>

        {/* ===== Back issues ===== */}
        {rest.length > 0 && (
          <div className="mt-16 sm:mt-20 border-t border-charcoal pt-10 sm:pt-14">
            <div className="flex items-center gap-3 sm:gap-4 mb-5">
              <span className="w-5 sm:w-7 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
                Back issues
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/journal/${a.slug}`}
                  className="block border-t-2 border-charcoal pt-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-[0.22em] text-amber-deep">
                    <span>{a.topicCluster}</span>
                    <span>·</span>
                    <span>{a.readingTimeMinutes} min</span>
                  </div>
                  <h3
                    className="font-serif text-charcoal mb-3 group-hover:text-amber-deep transition-colors"
                    style={{
                      fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-body text-[14px] leading-relaxed">
                    {a.excerpt}
                  </p>
                  <div className="mt-3 text-[11px] italic font-serif text-gray-600">
                    {formatDate(a.publishDate)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {rest.length === 0 && (
          <p className="text-center mt-14 sm:mt-16 text-[13px] sm:text-[14px] text-gray-600 italic font-serif max-w-[50ch] mx-auto">
            More dispatches are in the pipeline. Each is written and reviewed personally before it ships — no templated copy, no fabricated numbers.
          </p>
        )}

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
            If a dispatch resonates with your situation, book a 10-minute Clarity Call. Same frameworks, applied to your numbers.
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
