import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import indexData from "@/content/case-studies/index.json";
import case27 from "@/content/case-studies/case-27-staircase-wealth.json";
import PhotoBlock from "@/components/PhotoBlock";
import FrameworkIcon from "@/components/FrameworkIcon";

type IconName =
  | "staircase-wealth"
  | "quantum-positioning"
  | "ssd-timing"
  | "leverage-amplification"
  | "next-better-property"
  | "burst-framework";

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

  if (!study) return { title: "Not Found — EastCondos.sg" };

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
    // Schema.org FAQPage embedded for SEO
    mainEntity: study.faqs?.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
            fontSize: "clamp(1.9rem, 5vw, 3.8rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            maxWidth: "24ch",
          }}
        >
          {study.title}
        </h1>

        <p
          className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-6 sm:mb-8"
          style={{ maxWidth: "42ch" }}
        >
          {study.subtitle}
        </p>

        <p className="text-body text-[16px] sm:text-[18px] leading-relaxed max-w-[56ch] mb-5 sm:mb-7">
          {study.standfirst}
        </p>

        {study.editorialCredit && (
          <p className="text-[12px] sm:text-[13px] italic font-serif text-gray-600 pt-4 border-t border-dotted border-[#c9bfa3] max-w-[60ch]">
            {study.editorialCredit}
          </p>
        )}
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
        {/* ============ CLIENTS BLOCK ============ */}
        <ChapterMarker chapter="01" title="The Clients" />
        <div className="bg-paper border border-charcoal p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-[1fr_130px] sm:grid-cols-[1fr_140px] gap-5 sm:gap-7 items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-3">
                Client Details
              </div>
              <div
                className="font-serif text-charcoal text-[22px] sm:text-[26px] mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {study.clients.names}
              </div>
              <div className="text-[13px] text-gray-600 mb-5 italic font-serif">
                {study.clients.location}
              </div>
              <ul className="space-y-2 sm:space-y-2.5 pt-4 border-t border-dotted border-[#c9bfa3]">
                {study.clientDetails.map((d, i) => (
                  <li key={i} className="flex gap-3 text-[14px] sm:text-[15px] text-body leading-relaxed">
                    <span className="text-amber-deep flex-shrink-0 pt-0.5">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Small portrait thumbnail — editorial artifact, not hero */}
            <PhotoBlock
              src={study.clients.portrait}
              alt={`Portrait of ${study.clients.names}`}
              caption={study.clients.portraitCaption}
              label="Portrait"
              aspect="3 / 4"
            />
          </div>
        </div>

        {/* ============ BUYER'S BRIEF + CHALLENGES (two-column) ============ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
          <BulletBlock title="Buyer's Brief" subtitle="What they were looking for" items={study.buyersBrief} />
          <BulletBlock title="Challenges They Faced" subtitle="The real pain points" items={study.challenges} />
        </div>

        {/* ============ SOFT CTA ============ */}
        {study.softCta && (
          <div
            className="border border-charcoal bg-paper p-5 sm:p-7 mb-14 sm:mb-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 md:gap-8 items-center"
            style={{ borderLeft: "3px solid #D4A843" }}
          >
            <p className="font-serif italic text-charcoal text-[15px] sm:text-[17px] leading-snug">
              {study.softCta.text}
            </p>
            <Link
              href={study.softCta.ctaHref}
              className="inline-block bg-charcoal text-cream px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors text-center whitespace-nowrap"
            >
              {study.softCta.ctaLabel} →
            </Link>
          </div>
        )}

        {/* ============ CHAPTERS: THE MOVES ============ */}
        {study.moves.map((move, idx) => (
          <div key={move.number} className="mb-14 sm:mb-20">
            <ChapterMarker
              chapter={String(idx + 2).padStart(2, "0")}
              title={move.chapterTitle || move.title}
            />

            {/* Market context */}
            {move.marketContext && (
              <div className="mb-6 sm:mb-8 flex gap-4 sm:gap-5 items-start">
                <div
                  className="text-[10px] uppercase tracking-[0.22em] text-amber-deep pt-1 flex-shrink-0"
                  style={{ minWidth: "120px" }}
                >
                  Market context
                </div>
                <p className="text-[14px] sm:text-[15px] text-body italic font-serif leading-relaxed max-w-[58ch]">
                  {move.marketContext}
                </p>
              </div>
            )}

            {/* Move card */}
            <div className="border border-charcoal bg-cream">
              <div className="flex items-baseline justify-between border-b border-charcoal px-6 sm:px-8 py-4 sm:py-5 bg-paper">
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span
                    className="font-serif text-amber-deep"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", letterSpacing: "-0.02em" }}
                  >
                    Move {move.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gray-600">
                    {move.year}
                  </span>
                </div>
                <span
                  className="font-serif italic text-charcoal text-[13px] sm:text-[16px] text-right"
                  style={{ maxWidth: "24ch" }}
                >
                  {move.title}
                </span>
              </div>
              <div className="p-5 sm:p-7">
                {/* Small thumbnail floated right — editorial artifact, not card hero */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-5 sm:gap-7 items-start">
                  <dl className="divide-y divide-dotted divide-[#c9bfa3] order-2 sm:order-1">
                    {move.rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep pt-1">
                          {row.label}
                        </dt>
                        <dd className="text-[14px] sm:text-[15px] text-body leading-relaxed">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="order-1 sm:order-2 w-full max-w-[200px] mx-auto sm:mx-0">
                    <PhotoBlock
                      src={move.image}
                      alt={move.imageAlt || move.title}
                      caption={move.imageCaption}
                      label={`Move ${move.number}`}
                      aspect="4 / 3"
                    />
                  </div>
                </div>
              </div>
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

            {/* Elfi quote after the move */}
            {move.quote && <PullQuote text={move.quote.text} attribution={move.quote.attribution} />}
          </div>
        ))}

        {/* ============ Current Position ============ */}
        <ChapterMarker
          chapter={String(study.moves.length + 2).padStart(2, "0")}
          title={`Where they stand in ${study.currentPosition.year}`}
        />
        {study.currentPosition.marketContext && (
          <div className="mb-6 sm:mb-8 flex gap-4 sm:gap-5 items-start">
            <div
              className="text-[10px] uppercase tracking-[0.22em] text-amber-deep pt-1 flex-shrink-0"
              style={{ minWidth: "120px" }}
            >
              Market context
            </div>
            <p className="text-[14px] sm:text-[15px] text-body italic font-serif leading-relaxed max-w-[58ch]">
              {study.currentPosition.marketContext}
            </p>
          </div>
        )}
        <div
          className="border border-charcoal bg-paper p-6 sm:p-9 mb-14 sm:mb-20"
          style={{ borderLeft: "3px solid #D4A843" }}
        >
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

        {/* ============ Problem / Mistake / What Elfi Did ============ */}
        <ChapterMarker
          chapter={String(study.moves.length + 3).padStart(2, "0")}
          title="The problem — and the mistake most people make"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-14 sm:mb-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-3">
              The Problem
            </div>
            <p
              className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug max-w-[46ch]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {study.problem}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-3">
              The Mistake
            </div>
            <p className="text-body text-[15px] sm:text-[17px] leading-relaxed">{study.mistake}</p>
          </div>
        </div>

        <ChapterMarker
          chapter={String(study.moves.length + 4).padStart(2, "0")}
          title="What Elfi did"
        />
        <ol className="mb-10 sm:mb-12 space-y-5 sm:space-y-6 max-w-[60ch]">
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

        {study.closingQuote && (
          <div className="mb-14 sm:mb-20">
            <PullQuote text={study.closingQuote.text} attribution={study.closingQuote.attribution} />
          </div>
        )}

        {/* ============ Result ============ */}
        <ChapterMarker
          chapter={String(study.moves.length + 5).padStart(2, "0")}
          title="The Result"
        />
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

        {/* ============ Frameworks Applied ============ */}
        <ChapterMarker
          chapter={String(study.moves.length + 6).padStart(2, "0")}
          title="Frameworks applied"
        />
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
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-charcoal bg-cream flex items-center justify-center">
                  <FrameworkIcon name={f.iconName as IconName} size={28} className="text-amber-deep" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-1.5">
                    PBD Framework
                  </div>
                  <h3
                    className="font-serif text-charcoal text-[19px] sm:text-[21px] mb-2"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {f.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-body leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ Takeaway ============ */}
        {study.takeaway && (
          <div className="border-t border-b border-charcoal py-10 sm:py-14 mb-14 sm:mb-20 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
              <span className="w-5 sm:w-8 h-px bg-amber-deep" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
                The takeaway
              </span>
              <span className="w-5 sm:w-8 h-px bg-amber-deep" />
            </div>
            <p
              className="font-serif italic text-charcoal text-[20px] sm:text-[26px] leading-snug max-w-[42ch] mx-auto"
              style={{ letterSpacing: "-0.015em" }}
            >
              &ldquo;{study.takeaway}&rdquo;
            </p>
          </div>
        )}

        {/* ============ FAQs ============ */}
        {study.faqs && study.faqs.length > 0 && (
          <>
            <ChapterMarker
              chapter={String(study.moves.length + 7).padStart(2, "0")}
              title="Frequently asked"
            />
            <div className="mb-14 sm:mb-20 space-y-4 sm:space-y-5 max-w-[72ch]">
              {study.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group border border-charcoal bg-paper open:bg-cream transition-colors"
                >
                  <summary className="cursor-pointer list-none px-5 sm:px-7 py-4 sm:py-5 flex items-start justify-between gap-4">
                    <span className="font-serif text-charcoal text-[16px] sm:text-[18px] leading-snug" style={{ letterSpacing: "-0.01em" }}>
                      {f.q}
                    </span>
                    <span
                      className="font-serif text-amber-deep text-[20px] leading-none flex-shrink-0 group-open:rotate-45 transition-transform"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 sm:px-7 pb-5 pt-1 text-[14px] sm:text-[15px] text-body leading-relaxed border-t border-dotted border-[#c9bfa3]">
                    <div className="pt-4">{f.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </>
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
    <div className="flex items-baseline gap-4 sm:gap-5 mb-5 sm:mb-7">
      <span
        className="font-serif text-amber-deep leading-none flex-shrink-0"
        style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", letterSpacing: "-0.02em" }}
      >
        Chapter {chapter}
      </span>
      <span className="flex-1 h-px bg-charcoal" />
      <span
        className="font-serif text-charcoal text-[16px] sm:text-[22px] text-right"
        style={{ letterSpacing: "-0.015em", maxWidth: "34ch" }}
      >
        {title}
      </span>
    </div>
  );
}

// ===== Pull quote (Elfi's voice) =====
function PullQuote({ text, attribution }: { text: string; attribution: string }) {
  return (
    <blockquote className="my-8 sm:my-10 border-l-2 border-amber-deep pl-5 sm:pl-7 max-w-[52ch]">
      <p
        className="font-serif italic text-charcoal text-[18px] sm:text-[22px] leading-snug mb-3"
        style={{ letterSpacing: "-0.015em" }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <cite className="not-italic text-[11px] uppercase tracking-[0.22em] text-amber-deep">
        — {attribution}
      </cite>
    </blockquote>
  );
}

// ===== Bullet block (for Buyer's Brief + Challenges) =====
function BulletBlock({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="bg-paper border border-charcoal p-6 sm:p-8">
      <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">{title}</div>
      <p className="font-serif italic text-gray-600 text-[13px] sm:text-[14px] mb-5">{subtitle}</p>
      <ul className="space-y-2.5 sm:space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[14px] sm:text-[15px] text-body leading-relaxed">
            <span className="text-amber-deep flex-shrink-0 pt-0.5">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
