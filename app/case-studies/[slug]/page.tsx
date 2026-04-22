import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import indexData from "@/content/case-studies/index.json";
import case27 from "@/content/case-studies/case-27-staircase-wealth.json";

// ===== Case Study Registry =====
// Every case study JSON is imported and added to this map.
// Keep the keys in sync with content/case-studies/index.json → slugs
type FlagshipCase = typeof case27;

const caseStudyMap: Record<string, FlagshipCase> = {
  "case-27-staircase-wealth": case27,
};

export async function generateStaticParams() {
  return indexData.slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyMap[slug];

  if (!study) {
    return { title: "Not Found — EastCondos.sg" };
  }

  return {
    title: `${study.title} — Case No. ${study.caseNumber} | EastCondos.sg`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
      url: `https://eastcondos.sg/case-studies/${slug}`,
      images: study.ogImage ? [{ url: study.ogImage }] : [],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyMap[slug];
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    url: `https://eastcondos.sg/case-studies/${study.slug}`,
    author: { "@type": "Person", name: "Elfi Abdullah", url: "https://eastcondos.sg/about" },
    publisher: { "@type": "Organization", name: "EastCondos.sg", url: "https://eastcondos.sg" },
  };

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ MASTHEAD ============ */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Case No. {study.caseNumber} · {study.bucket}
          </span>
        </div>

        <h1
          className="font-serif text-charcoal mb-4 sm:mb-6"
          style={{
            fontSize: "clamp(2.1rem, 5.6vw, 4.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.028em",
            maxWidth: "22ch",
          }}
        >
          {study.title}
        </h1>

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[24px] leading-snug mb-6 sm:mb-9"
          style={{ maxWidth: "38ch" }}
        >
          {study.subtitle}
        </p>

        <p className="text-body text-[16px] sm:text-[18px] leading-relaxed max-w-[54ch]">
          {study.standfirst}
        </p>
      </section>

      {/* ============ HEADLINE STAT BAND ============ */}
      <section className="bg-charcoal text-cream border-b border-charcoal">
        <div className="max-w-broadsheet mx-auto grid grid-cols-2 md:grid-cols-4 border-l border-cream/15">
          {study.headlineStats.map((s) => (
            <div
              key={s.label}
              className="border-r border-b md:border-b-0 border-cream/15 px-5 sm:px-8 py-7 sm:py-10"
            >
              <div
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] mb-2"
                style={{ color: "rgba(242, 235, 219, 0.6)" }}
              >
                {s.label}
              </div>
              <div
                className="font-serif text-amber leading-none"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.02em" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
        {/* ============ CHAPTER 01 — Clients ============ */}
        <ChapterMarker chapter="01" title="The Clients" />

        <div className="bg-paper border border-charcoal p-6 sm:p-10 mb-14 sm:mb-20 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-10 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Names</div>
            <div
              className="font-serif text-charcoal text-[26px] sm:text-[30px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {study.clients.names}
            </div>
            <div className="text-[13px] sm:text-[14px] text-gray-600 mt-2 italic font-serif">
              {study.clients.location}
            </div>
          </div>
          <dl className="space-y-4 sm:space-y-5">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-1">
                Starting point
              </dt>
              <dd className="text-[16px] sm:text-[17px] text-charcoal">
                {study.clients.startingPoint}
              </dd>
            </div>
            <div className="pt-4 border-t border-dotted border-[#c9bfa3]">
              <dt className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-1">
                Income note
              </dt>
              <dd className="text-[15px] sm:text-[16px] text-body font-serif italic">
                {study.clients.incomeNote}
              </dd>
            </div>
          </dl>
        </div>

        {/* ============ CHAPTER 02 — The Moves ============ */}
        <ChapterMarker chapter="02" title="The Moves" />

        <div className="space-y-8 sm:space-y-10 mb-10 sm:mb-14">
          {study.moves.map((move) => (
            <div key={move.number} className="border border-charcoal bg-cream">
              <div className="flex items-baseline justify-between border-b border-charcoal px-6 sm:px-8 py-4 sm:py-5 bg-paper">
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span
                    className="font-serif text-amber-deep"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
                  >
                    Move {move.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gray-600">
                    {move.year}
                  </span>
                </div>
                <span
                  className="font-serif italic text-charcoal text-[14px] sm:text-[18px] text-right"
                  style={{ maxWidth: "24ch" }}
                >
                  {move.title}
                </span>
              </div>
              <dl className="divide-y divide-dotted divide-[#c9bfa3]">
                {move.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 sm:px-8 py-4"
                  >
                    <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep pt-1">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] sm:text-[16px] text-body leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div
                className="px-6 sm:px-8 py-4 sm:py-5 bg-charcoal text-cream border-t border-charcoal"
                style={{ borderLeft: "3px solid #D4A843" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mb-1.5"
                  style={{ color: "rgba(242, 235, 219, 0.6)" }}
                >
                  Key decision
                </div>
                <div className="font-serif italic text-[15px] sm:text-[17px] leading-snug">
                  {move.keyDecision}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ Current Position ============ */}
        <div
          className="border border-charcoal bg-paper p-6 sm:p-9 mb-14 sm:mb-20"
          style={{ borderLeft: "3px solid #D4A843" }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <span className="w-5 sm:w-7 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
              Current Position · {study.currentPosition.year}
            </span>
          </div>
          <dl className="space-y-4">
            {study.currentPosition.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 pb-3 border-b border-dotted border-[#c9bfa3] last:border-b-0 last:pb-0"
              >
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep pt-1">
                  {row.label}
                </dt>
                <dd className="text-[15px] sm:text-[17px] text-charcoal leading-relaxed">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ============ CHAPTER 03 — Problem ============ */}
        <ChapterMarker chapter="03" title="The Problem" />
        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-14 sm:mb-20 max-w-[46ch]"
          style={{ letterSpacing: "-0.01em" }}
        >
          {study.problem}
        </p>

        {/* ============ CHAPTER 04 — Mistake ============ */}
        <ChapterMarker chapter="04" title="The mistake most people make" />
        <p className="text-body text-[16px] sm:text-[18px] leading-relaxed mb-14 sm:mb-20 max-w-[60ch]">
          {study.mistake}
        </p>

        {/* ============ CHAPTER 05 — What Elfi Did ============ */}
        <ChapterMarker chapter="05" title="What Elfi did" />
        <ol className="mb-14 sm:mb-20 space-y-5 sm:space-y-6 max-w-[60ch]">
          {study.whatElfiDid.map((step, i) => (
            <li key={i} className="grid grid-cols-[40px_1fr] gap-4 sm:gap-5">
              <span
                className="font-serif text-amber-deep text-[22px] sm:text-[24px] leading-none pt-0.5"
                style={{ letterSpacing: "-0.02em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-[16px] sm:text-[17px] leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        {/* ============ CHAPTER 06 — Result ============ */}
        <ChapterMarker chapter="06" title="The Result" />
        <div className="bg-charcoal text-cream p-6 sm:p-10 mb-14 sm:mb-20">
          <ul className="space-y-4 sm:space-y-5">
            {study.result.map((r, i) => (
              <li
                key={i}
                className="grid grid-cols-[22px_1fr] gap-4 pb-4 sm:pb-5 border-b last:border-b-0 last:pb-0"
                style={{ borderColor: "rgba(242, 235, 219, 0.15)" }}
              >
                <span className="text-amber font-serif text-[18px] leading-none pt-1">◆</span>
                <span className="text-[16px] sm:text-[17px] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ============ CHAPTER 07 — Frameworks Applied ============ */}
        <ChapterMarker chapter="07" title="Frameworks applied" />
        <p className="text-body text-[15px] sm:text-[16px] italic font-serif mb-6 sm:mb-8 max-w-[56ch]">
          Every move in this case is an application of one or more PBD™ frameworks. Each framework
          also appears across other cases in the bank.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-14 sm:mb-20">
          {study.frameworks.map((f) => (
            <div
              key={f.slug}
              className="bg-paper border border-charcoal p-5 sm:p-6 hover:bg-amber/10 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-1.5">
                PBD Framework
              </div>
              <h3
                className="font-serif text-charcoal text-[19px] sm:text-[21px] mb-2"
                style={{ letterSpacing: "-0.01em" }}
              >
                {f.name}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-body leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* ============ Takeaway ============ */}
        {study.takeaway && (
          <div className="border-t border-b border-charcoal py-10 sm:py-14 mb-12 sm:mb-16 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
              <span className="w-5 sm:w-8 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
                The takeaway
              </span>
              <span className="w-5 sm:w-8 h-px bg-amber-deep" />
            </div>
            <p
              className="font-serif italic text-charcoal text-[20px] sm:text-[28px] leading-snug max-w-[40ch] mx-auto"
              style={{ letterSpacing: "-0.015em" }}
            >
              &ldquo;{study.takeaway}&rdquo;
            </p>
          </div>
        )}

        {/* ============ CTA ============ */}
        <div className="bg-charcoal text-cream text-center py-10 sm:py-14 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="w-5 sm:w-7 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">
              Your turn
            </span>
          </div>
          <h3
            className="font-serif text-[24px] sm:text-[34px] mb-3 sm:mb-4"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Could a <em className="text-amber italic">staircase move</em> work for you?
          </h3>
          <p
            className="max-w-[52ch] mx-auto text-[15px] sm:text-[16px] mb-6 sm:mb-8 leading-relaxed"
            style={{ color: "rgba(242, 235, 219, 0.7)" }}
          >
            Run your numbers, then request a 7-minute discovery call. If the math supports a move,
            we&apos;ll talk through how to structure it. If it doesn&apos;t, I&apos;ll tell you
            straight.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/calculator"
              className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors"
            >
              Run the calculator
            </Link>
            <Link
              href="/discovery"
              className="inline-block bg-transparent text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-cream hover:bg-cream hover:text-charcoal transition-colors"
            >
              Request a discovery call
            </Link>
          </div>
        </div>

        {/* ============ Back to bank ============ */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/case-studies"
            className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-amber-deep hover:text-charcoal transition-colors"
          >
            ← Back to the Case Study Bank
          </Link>
        </div>
      </main>
    </div>
  );
}

// ===== Chapter marker helper =====
function ChapterMarker({ chapter, title }: { chapter: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 sm:gap-5 mb-5 sm:mb-6">
      <span
        className="font-serif text-amber-deep leading-none"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
      >
        Chapter {chapter}
      </span>
      <span className="flex-1 h-px bg-charcoal" />
      <span
        className="font-serif text-charcoal text-[18px] sm:text-[22px]"
        style={{ letterSpacing: "-0.015em" }}
      >
        {title}
      </span>
    </div>
  );
}
