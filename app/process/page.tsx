import type { Metadata } from "next";
import processData from "@/content/process.json";
import FounderQuote from "@/components/editorial/FounderQuote";
import PhotoBand from "@/components/editorial/PhotoBand";
import LastUpdated from "@/components/editorial/LastUpdated";

const LAST_UPDATED = "2026-04-25";

export const metadata: Metadata = {
  title: "How It Works | EastCondos.sg",
  description:
    "A structured 4-8 month path from HDB to your new condo. See every phase of the EastCondos upgrade process — qualify, sell, buy, and execute without a gap period.",
  openGraph: {
    title: "How It Works | EastCondos.sg",
    description:
      "A structured 4-8 month path from HDB to your new condo. See every phase of the EastCondos upgrade process.",
    type: "website",
    url: "https://eastcondos.sg/process",
  },
  other: {
    "article:modified_time": LAST_UPDATED,
  },
};

export default function ProcessPage() {
  return (
    <>
      {/* Opener */}
      <section className="relative bg-charcoal-deep gridlines px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-20 border-b hairline overflow-hidden">
        <div
          aria-hidden
          className="meganum absolute right-6 md:right-12 top-2 md:top-6"
        >
          02
        </div>
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-8">
            Index / The Method &middot; {processData.timelineStat}
          </div>
          <h1 className="display-hero max-w-[12ch]">
            Four documents. <br />
            <em>One order.</em> No gap.
          </h1>
          <p className="prose-dark mt-9 text-[17px] max-w-[56ch]">
            {processData.overviewBody}
          </p>
          <div className="mt-8">
            <LastUpdated date={LAST_UPDATED} tone="onDark" />
          </div>
        </div>
      </section>

      {/* Phases — full-width ledger rows */}
      <section id="method" className="bg-charcoal-deep gridlines px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-broadsheet mx-auto">
          {processData.phases.map((phase) => (
            <div
              key={phase.number}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-8 md:gap-14 py-14 border-t hairline items-start"
            >
              <div>
                <div
                  className="font-display font-extralight text-cream/25"
                  style={{ fontSize: "clamp(64px, 8vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.05em" }}
                >
                  {phase.number}
                </div>
                <h2 className="display-block mt-5">{phase.title}</h2>
              </div>
              <p className="prose-dark text-[16px] max-w-[58ch] md:pt-3">
                {phase.description}
              </p>
              <div className="md:pt-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber mb-3">
                  Deliverable
                </div>
                <div className="font-display font-light text-[19px] leading-snug text-cream max-w-[24ch]">
                  {phase.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PhotoBand
        src="/broll/keys-handover.jpg"
        position="center 40%"
        label="The end of the sequence"
        line={
          <>
            Four documents, in the right order &mdash; and the keys arrive{" "}
            <em>without</em> a gap in between.
          </>
        }
      />

      <FounderQuote
        quote="Most families try to manage the upgrade on their own — and end up with a gap period, a rushed purchase, or a condo that doesn't grow. Every date and every dollar is projected before we start."
        cite="— Elfi Abdullah, Founder · The Elfi Division, ERA Singapore"
      />

      {/* CTA — cream band */}
      <section className="surface-light gridlines-light py-24 md:py-28 px-6 md:px-12">
        <div className="max-w-broadsheet mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div>
            <div className="mono-label mb-7">Start the sequence</div>
            <h3 className="display-section max-w-[16ch]">
              Step one is <em>your numbers</em>, not a viewing.
            </h3>
            <p className="mt-6 text-[17px] leading-[1.75] text-body max-w-[46ch]">
              We review where you stand and tell you honestly — even if the
              answer is &ldquo;wait&rdquo;.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-5">
            <a
              href="/discovery"
              className="inline-flex items-center justify-center bg-charcoal text-cream font-sans text-[12px] uppercase font-semibold px-10 py-5 transition-all duration-200 hover:bg-charcoal-light"
              style={{ letterSpacing: "0.24em" }}
            >
              Book a 7-Min Discovery Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
