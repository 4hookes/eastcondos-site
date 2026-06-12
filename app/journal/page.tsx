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
    <div className="bg-charcoal-deep min-h-screen">
      {/* ===== Opener ===== */}
      <section className="relative gridlines border-b hairline px-6 md:px-12 pt-20 md:pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden
          className="meganum absolute right-6 md:right-12 top-2 md:top-6"
        >
          03
        </div>
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-8">Index / {indexData.sectionLabel}</div>
          <h1 className="display-hero max-w-[16ch]">{indexData.heading}</h1>
          <p className="annot mt-10 max-w-[44ch]">{indexData.subtext}</p>
        </div>
      </section>

      <main className="max-w-broadsheet mx-auto px-6 md:px-12 py-16 md:py-24 gridlines">
        {/* ===== Featured Cover Story ===== */}
        <div className="mono-label mb-8">The Cover Story · Read first</div>

        <Link
          href={`/journal/${featured.slug}`}
          className="block border hairline hover:border-amber/50 transition-colors group"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
            {/* Left — data strip */}
            <div className="bg-charcoal p-6 sm:p-10 border-b md:border-b-0 md:border-r hairline flex flex-col justify-between">
              <div>
                <div className="mono-label-dim mb-7">{featured.kicker}</div>
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  {[
                    { lbl: "Topic", v: featured.topicCluster },
                    { lbl: "Reading time", v: `${featured.readingTimeMinutes} min` },
                    { lbl: "Published", v: formatDate(featured.publishDate) },
                    ...(featured.framework
                      ? [{ lbl: "Framework", v: featured.framework.name }]
                      : []),
                  ].map((d) => (
                    <div key={d.lbl}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 mb-2">
                        {d.lbl}
                      </div>
                      <div className="font-display font-light text-amber text-[17px] sm:text-[19px] leading-tight">
                        {d.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-9 pt-6 border-t hairline font-serif italic text-[13px] text-cream/60">
                By {featured.author.name} · {featured.author.role}
              </div>
            </div>

            {/* Right — story */}
            <div className="p-6 sm:p-10">
              <h3
                className="font-display font-light text-cream mb-5 group-hover:text-amber transition-colors"
                style={{
                  fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
                dangerouslySetInnerHTML={{
                  __html: featured.titleHtml.replace(
                    /<em>/g,
                    '<em class="font-serif italic text-amber">'
                  ),
                }}
              />
              <p className="font-serif italic text-amber/90 text-[16px] sm:text-[18px] leading-snug mb-6 max-w-[42ch]">
                {featured.standfirst}
              </p>
              <p className="prose-dark text-[15px] mb-7 max-w-[52ch]">
                {featured.excerpt}
              </p>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                Read the full dispatch →
              </span>
            </div>
          </div>
        </Link>

        {/* ===== Back issues ===== */}
        {rest.length > 0 && (
          <div className="mt-16 sm:mt-20 border-t hairline pt-10 sm:pt-14">
            <div className="mono-label mb-8">Back issues</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/journal/${a.slug}`}
                  className="block border-t hairline-strong pt-5 group"
                >
                  <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
                    <span>{a.topicCluster}</span>
                    <span>·</span>
                    <span>{a.readingTimeMinutes} min</span>
                  </div>
                  <h3 className="font-display font-light text-cream text-[21px] leading-snug tracking-[-0.02em] mb-3 group-hover:text-amber transition-colors">
                    {a.title}
                  </h3>
                  <p className="prose-dark text-[14px]">{a.excerpt}</p>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40">
                    {formatDate(a.publishDate)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {rest.length === 0 && (
          <p className="mt-14 prose-dark italic font-serif max-w-[50ch]">
            More dispatches are in the pipeline. Each is written and reviewed
            personally before it ships — no templated copy, no fabricated
            numbers.
          </p>
        )}
      </main>

      {/* ===== Bottom CTA — cream band ===== */}
      <section className="surface-light gridlines-light py-20 md:py-24 px-6 md:px-12">
        <div className="max-w-broadsheet mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <div className="mono-label mb-6">Work with Elfi</div>
            <h3 className="display-section !text-[clamp(1.8rem,3.4vw,2.6rem)] max-w-[18ch]">
              Turn the <em>reading</em> into a plan.
            </h3>
            <p className="mt-5 text-[16px] leading-[1.75] text-body max-w-[50ch]">
              If a dispatch resonates with your situation, book a 7-minute
              discovery call. Same frameworks, applied to your numbers.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/discovery"
              className="inline-flex items-center justify-center bg-charcoal text-cream font-sans text-[12px] uppercase font-semibold px-10 py-5 transition-all duration-200 hover:bg-charcoal-light"
              style={{ letterSpacing: "0.24em" }}
            >
              Request a 7-Min Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
