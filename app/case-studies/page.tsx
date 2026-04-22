import type { Metadata } from "next";
import Link from "next/link";
import indexData from "@/content/case-studies/index.json";
import case27 from "@/content/case-studies/case-27-staircase-wealth.json";

export const metadata: Metadata = {
  title: `${indexData.heading} — EastCondos.sg`,
  description: indexData.subtext,
  openGraph: {
    title: `${indexData.heading} — EastCondos.sg`,
    description: indexData.subtext,
    type: "website",
    url: "https://eastcondos.sg/case-studies",
  },
};

export default function CaseStudiesPage() {
  const featured = case27;

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Masthead ===== */}
      <section className="border-b border-charcoal max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
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
            maxWidth: "18ch",
            marginBottom: "22px",
          }}
        >
          {indexData.heading}
        </h1>
        <p
          className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug mx-auto"
          style={{ maxWidth: "52ch" }}
        >
          {indexData.subtext}
        </p>
      </section>

      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-12 sm:py-20">
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
                Case No. {featured.caseNumber} · {featured.bucket}
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

        {/* ===== Bucket placeholders (more cases coming) ===== */}
        <div className="mt-16 sm:mt-20 border-t border-charcoal pt-10 sm:pt-14">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
              The Bank · Coming in issues
            </span>
          </div>
          <h2
            className="font-serif text-charcoal mb-8 sm:mb-10 max-w-[24ch]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The full case study bank, organised by challenge.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {indexData.buckets.map((b) => (
              <div key={b.id} className="border border-charcoal bg-paper p-5 sm:p-7">
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                  Bucket
                </div>
                <h3
                  className="font-serif text-charcoal text-[20px] sm:text-[24px] mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {b.label}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-body italic font-serif">
                  Cases publishing shortly. Elfi is reviewing each one before release.
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 sm:mt-12 text-[13px] sm:text-[14px] text-gray-600 italic font-serif max-w-[46ch] mx-auto">
            26 more case studies from the bank are being prepared for publication. Each is reviewed
            personally before it goes live — no templated copy, no fabricated numbers.
          </p>
        </div>

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
      </main>
    </div>
  );
}
