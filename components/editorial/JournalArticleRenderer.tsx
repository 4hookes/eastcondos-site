import Link from "next/link";
import { Fragment } from "react";

export type JournalBlock =
  | { type: "heading"; level: 2 | 3; text: string; number?: string }
  | { type: "prose"; content: string; dropcap?: boolean }
  | { type: "pull-quote"; text: string; cite?: string }
  | { type: "founder-quote"; text: string; cite: string; label?: string }
  | {
      type: "stat-grid";
      columns: 2 | 3 | 4;
      stats: Array<{ number: string; suffix?: string; label: string; note?: string }>;
    }
  | {
      type: "data-table";
      kicker?: string;
      headers: string[];
      rows: string[][];
      highlightRowIndex?: number;
    }
  | { type: "dotted-divider" }
  | { type: "cta-card"; kicker?: string; body: string; buttonLabel: string; buttonHref: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      credit?: string;
      aspect?: string;
      label?: string;
    }
  | {
      type: "faq";
      kicker?: string;
      heading?: string;
      items: Array<{ question: string; answer: string }>;
    };

export default function JournalArticleRenderer({ body }: { body: JournalBlock[] }) {
  return (
    <div className="max-w-[68ch] mx-auto">
      {body.map((block, idx) => (
        <Fragment key={idx}>{renderBlock(block, idx)}</Fragment>
      ))}
    </div>
  );
}

function renderBlock(block: JournalBlock, idx: number) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock {...block} />;
    case "prose":
      return <ProseBlock {...block} />;
    case "pull-quote":
      return <PullQuoteBlock {...block} />;
    case "founder-quote":
      return <FounderQuoteBlock {...block} />;
    case "stat-grid":
      return <StatGridBlock {...block} />;
    case "data-table":
      return <DataTableBlock {...block} />;
    case "dotted-divider":
      return <DottedDividerBlock />;
    case "cta-card":
      return <CtaCardBlock {...block} />;
    case "image":
      return <ImageBlock {...block} />;
    case "faq":
      return <FaqBlock {...block} />;
    default:
      return null;
  }
}

function FaqBlock({
  kicker,
  heading,
  items,
}: {
  kicker?: string;
  heading?: string;
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <section
      className="my-12 sm:my-16 border-t border-b border-charcoal py-10 sm:py-14"
      aria-label="Frequently asked questions"
    >
      {kicker && (
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
            {kicker}
          </span>
        </div>
      )}
      {heading && (
        <h2
          className="font-serif text-charcoal mb-8 sm:mb-10"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {heading}
        </h2>
      )}
      <dl className="space-y-7 sm:space-y-9">
        {items.map((it, i) => (
          <div
            key={i}
            className="pb-6 sm:pb-8 border-b border-dotted border-[#c9bfa3] last:border-b-0 last:pb-0"
          >
            <dt
              className="font-serif text-charcoal mb-3"
              style={{
                fontSize: "clamp(1.15rem, 1.9vw, 1.4rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
              }}
            >
              {it.question}
            </dt>
            <dd
              className="text-body leading-[1.75]"
              style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}
            >
              {it.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function HeadingBlock({
  level,
  text,
  number,
}: {
  level: 2 | 3;
  text: string;
  number?: string;
}) {
  if (level === 2) {
    return (
      <div className="mt-14 sm:mt-20 mb-6 sm:mb-8">
        {number && (
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-5 sm:w-7 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep font-medium">
              Chapter {number}
            </span>
          </div>
        )}
        <h2
          className="font-serif text-charcoal"
          style={{
            fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.022em",
          }}
        >
          {text}
        </h2>
      </div>
    );
  }
  return (
    <h3
      className="font-serif text-charcoal mt-10 sm:mt-14 mb-4"
      style={{
        fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
        lineHeight: 1.2,
        letterSpacing: "-0.015em",
      }}
    >
      {text}
    </h3>
  );
}

function ProseBlock({ content, dropcap }: { content: string; dropcap?: boolean }) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  return (
    <div className={dropcap ? "dropcap" : ""}>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-body leading-[1.75] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function PullQuoteBlock({ text, cite }: { text: string; cite?: string }) {
  return (
    <blockquote className="my-10 sm:my-14 text-center mx-auto" style={{ maxWidth: "48ch" }}>
      <p
        className="font-serif italic text-charcoal"
        style={{
          fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
          lineHeight: 1.25,
          letterSpacing: "-0.015em",
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {cite && (
        <cite className="block mt-5 not-italic text-[11px] uppercase tracking-[0.22em] text-amber-deep">
          — {cite}
        </cite>
      )}
    </blockquote>
  );
}

function FounderQuoteBlock({
  text,
  cite,
  label,
}: {
  text: string;
  cite: string;
  label?: string;
}) {
  return (
    <section className="my-12 sm:my-16 bg-charcoal text-cream py-12 sm:py-16 px-6 sm:px-10 border-t-[4px] border-amber -mx-5 sm:-mx-10 md:mx-0">
      {label && (
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-amber font-medium mb-5 sm:mb-6">
          {label}
        </div>
      )}
      <q
        className="block font-serif italic text-cream"
        style={{
          fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
          quotes: "none",
        }}
      >
        {text}
      </q>
      <cite className="block mt-6 sm:mt-7 not-italic text-[11px] uppercase tracking-[0.2em] text-amber">
        {cite}
      </cite>
    </section>
  );
}

function StatGridBlock({
  columns,
  stats,
}: {
  columns: 2 | 3 | 4;
  stats: Array<{ number: string; suffix?: string; label: string; note?: string }>;
}) {
  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";
  return (
    <div
      className={`my-10 sm:my-14 grid ${gridCols} border-l border-t border-charcoal bg-paper`}
    >
      {stats.map((s, i) => (
        <div key={i} className="border-r border-b border-charcoal p-5 sm:p-7">
          <div className="flex items-baseline gap-1">
            <span
              className="font-serif text-charcoal leading-none"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {s.number}
            </span>
            {s.suffix && (
              <span
                className="font-serif text-amber-deep leading-none"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.suffix}
              </span>
            )}
          </div>
          <div className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep font-medium">
            {s.label}
          </div>
          {s.note && (
            <div className="mt-2 text-[12px] sm:text-[13px] italic font-serif text-gray-600 leading-snug">
              {s.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DataTableBlock({
  kicker,
  headers,
  rows,
  highlightRowIndex,
}: {
  kicker?: string;
  headers: string[];
  rows: string[][];
  highlightRowIndex?: number;
}) {
  return (
    <div className="my-10 sm:my-14">
      {kicker && (
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep font-medium">
            {kicker}
          </span>
        </div>
      )}
      <div className="overflow-x-auto border border-charcoal">
        <table className="w-full border-collapse text-[13px] sm:text-[15px]">
          <thead>
            <tr className="bg-charcoal text-cream">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left font-medium uppercase tracking-[0.18em] text-[10px] sm:text-[11px] px-4 sm:px-5 py-3 sm:py-4 border-r border-cream/15 last:border-r-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isHighlight = i === highlightRowIndex;
              return (
                <tr
                  key={i}
                  className={`border-t border-charcoal ${
                    isHighlight ? "bg-amber/20" : "bg-paper"
                  }`}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 sm:px-5 py-3 sm:py-4 border-r border-charcoal last:border-r-0 leading-snug ${
                        isHighlight
                          ? "text-charcoal font-medium"
                          : "text-body"
                      } ${j === 0 ? "font-serif" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ImageBlock({
  src,
  alt,
  caption,
  credit,
  aspect = "16 / 9",
  label,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspect?: string;
  label?: string;
}) {
  return (
    <figure className="my-10 sm:my-14 -mx-5 sm:mx-0">
      {label && (
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 px-5 sm:px-0">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep font-medium">
            {label}
          </span>
        </div>
      )}
      <div
        className="relative w-full border border-charcoal overflow-hidden bg-paper"
        style={{ aspectRatio: aspect }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 sm:mt-4 pt-3 border-t border-dotted border-[#c9bfa3] flex items-start justify-between gap-4 sm:gap-6 px-5 sm:px-0">
          {caption && (
            <span className="flex-1 text-[12px] sm:text-[13px] italic font-serif text-gray-600 leading-snug">
              {caption}
            </span>
          )}
          {credit && (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-deep font-medium flex-shrink-0 pt-0.5">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function DottedDividerBlock() {
  return <hr className="my-12 sm:my-16 border-0 border-t border-dotted border-[#c9bfa3]" />;
}

function CtaCardBlock({
  kicker,
  body,
  buttonLabel,
  buttonHref,
}: {
  kicker?: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <div className="my-12 sm:my-16 bg-charcoal text-cream p-7 sm:p-10 border border-charcoal text-center">
      {kicker && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <span className="w-5 sm:w-7 h-px bg-amber" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber font-medium">
            {kicker}
          </span>
          <span className="w-5 sm:w-7 h-px bg-amber" />
        </div>
      )}
      <p
        className="mx-auto leading-relaxed mb-6 sm:mb-7"
        style={{
          maxWidth: "54ch",
          fontSize: "clamp(15px, 1.5vw, 17px)",
          color: "rgba(242, 235, 219, 0.85)",
        }}
      >
        {body}
      </p>
      <Link
        href={buttonHref}
        className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors"
      >
        {buttonLabel} →
      </Link>
    </div>
  );
}
