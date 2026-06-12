import type { Metadata } from "next";
import Link from "next/link";
import indexData from "@/content/case-studies/index.json";
import staircaseWealth from "@/content/case-studies/staircase-wealth.json";
import theScarcityTax from "@/content/case-studies/the-scarcity-tax.json";

export const metadata: Metadata = {
  title: `${indexData.heading} — EastCondos.sg`,
  description: indexData.subtext,
  openGraph: {
    title: `${indexData.heading} — EastCondos.sg`,
    description: indexData.subtext,
    type: "website",
    url: "https://eastcondos.sg/case-studies",
    images: [
      {
        url: "https://eastcondos.sg/images/og/case-studies-og.jpg",
        width: 1200,
        height: 630,
        alt: "Elfi Abdullah with clients at EastCondos.sg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${indexData.heading} — EastCondos.sg`,
    description: indexData.subtext,
    images: ["https://eastcondos.sg/images/og/case-studies-og.jpg"],
  },
};

export default function CaseStudiesPage() {
  const featured = staircaseWealth;
  const secondary = theScarcityTax;

  return (
    <div className="bg-charcoal-deep min-h-screen">
      {/* ===== Opener ===== */}
      <section className="relative gridlines border-b hairline px-6 md:px-12 pt-20 md:pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden
          className="meganum absolute right-6 md:right-12 top-2 md:top-6"
        >
          04
        </div>
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-8">Index / {indexData.sectionLabel}</div>
          <h1 className="display-hero max-w-[16ch]">{indexData.heading}</h1>
          <p className="annot mt-10 max-w-[44ch]">{indexData.subtext}</p>
        </div>
      </section>

      <main className="surface-light gridlines-light max-w-none px-5 sm:px-10 py-12 sm:py-20">
       <div className="max-w-broadsheet mx-auto">
        {/* ===== Featured Flagship ===== */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Flagship · Cover Story
          </span>
        </div>
        <h2
          className="font-serif text-charcoal mb-6 sm:mb-8"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Start here.
        </h2>

        <Link
          href={`/case-studies/${featured.slug}`}
          className="block border border-charcoal bg-paper hover:bg-amber/10 transition-colors group"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
            {/* Left — numbers */}
            <div className="bg-charcoal text-cream p-6 sm:p-10 border-b md:border-b-0 md:border-r border-charcoal">
              <div
                className="text-[10px] uppercase tracking-[0.28em] mb-3 sm:mb-4"
                style={{ color: "rgba(242, 235, 219, 0.6)" }}
              >
                {featured.bucket}
              </div>
              <div className="grid grid-cols-2 gap-5 sm:gap-7">
                {featured.headlineStats.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                      style={{ color: "rgba(242, 235, 219, 0.55)" }}
                    >
                      {s.label}
                    </div>
                    <div
                      className="font-serif text-amber leading-none"
                      style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", letterSpacing: "-0.02em" }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — story */}
            <div className="p-6 sm:p-10">
              <h3
                className="font-serif text-charcoal mb-3 sm:mb-4 group-hover:text-amber-deep transition-colors"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {featured.title}
              </h3>
              <p
                className="font-serif italic text-charcoal text-[16px] sm:text-[18px] leading-snug mb-5 sm:mb-6"
                style={{ maxWidth: "38ch" }}
              >
                {featured.subtitle}
              </p>
              <p className="text-body text-[14px] sm:text-[15px] leading-relaxed mb-6 max-w-[50ch]">
                {featured.standfirst}
              </p>
              <span className="inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-amber-deep font-medium">
                Read the full case →
              </span>
            </div>
          </div>
        </Link>

        {/* ===== Secondary feature — Latest issue ===== */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
              Latest issue · {secondary.bucket}
            </span>
          </div>
          <h2
            className="font-serif text-charcoal mb-6 sm:mb-8"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Also in the bank.
          </h2>

          <Link
            href={`/case-studies/${secondary.slug}`}
            className="block border border-charcoal bg-paper hover:bg-amber/10 transition-colors group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
              {/* Left — story */}
              <div className="p-6 sm:p-9 md:border-r border-charcoal border-b md:border-b-0">
                <div className="text-[10px] uppercase tracking-[0.28em] text-amber-deep mb-3 sm:mb-4">
                  {secondary.bucket}
                </div>
                <h3
                  className="font-serif text-charcoal mb-3 sm:mb-4 group-hover:text-amber-deep transition-colors"
                  style={{
                    fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {secondary.title}
                </h3>
                <p
                  className="font-serif italic text-charcoal text-[15px] sm:text-[17px] leading-snug mb-5 sm:mb-6"
                  style={{ maxWidth: "40ch" }}
                >
                  {secondary.subtitle}
                </p>
                <span className="inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-amber-deep font-medium">
                  Read the full case →
                </span>
              </div>

              {/* Right — numbers */}
              <div className="bg-charcoal text-cream p-6 sm:p-9">
                <div
                  className="text-[10px] uppercase tracking-[0.28em] mb-4 sm:mb-5"
                  style={{ color: "rgba(242, 235, 219, 0.6)" }}
                >
                  The numbers
                </div>
                <div className="grid grid-cols-2 gap-5 sm:gap-7">
                  {secondary.headlineStats.slice(0, 4).map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] mb-1.5"
                        style={{ color: "rgba(242, 235, 219, 0.55)" }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="font-serif text-amber leading-none"
                        style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", letterSpacing: "-0.02em" }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* More cases are in review — the by-challenge browse grid returns
            once each bucket has at least one published case. */}
        <p className="text-center mt-16 sm:mt-20 border-t border-charcoal pt-10 text-[13px] sm:text-[14px] text-gray-600 italic font-serif max-w-[46ch] mx-auto">
          More case studies from the bank are being prepared for publication. Each is reviewed
          personally before it goes live — no templated copy, no fabricated numbers.
        </p>

        {/* ===== Bottom CTA ===== */}
        <div className="mt-16 sm:mt-20 bg-charcoal text-cream text-center py-10 sm:py-14 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">
              Your story
            </span>
          </div>
          <h3
            className="font-serif text-[24px] sm:text-[34px] mb-3 sm:mb-4"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Want to <em className="text-amber italic">write your own</em> case study?
          </h3>
          <p
            className="max-w-[52ch] mx-auto text-[15px] sm:text-[16px] mb-6 sm:mb-8 leading-relaxed"
            style={{ color: "rgba(242, 235, 219, 0.7)" }}
          >
            Every case in this bank started with a calculator run and a 7-minute discovery call.
            Yours can too.
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
       </div>
      </main>
    </div>
  );
}
