export default function QuizBand() {
  return (
    <section className="grain bg-charcoal text-cream py-28 md:py-36 px-6 md:px-12 border-t-[6px] border-amber relative">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <div className="text-[12px] uppercase tracking-[0.28em] text-amber mb-6 font-medium">
            Begin Here
          </div>
          <h3
            className="font-serif text-cream"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Are you <em className="italic text-amber">actually</em> ready to upgrade?
          </h3>
        </div>
        <div>
          <p className="text-[17px] leading-[1.7] text-cream/80 max-w-[46ch]">
            A four-minute, eight-question reading of where you stand:
            financially, structurally, and on timeline. No email required to
            see the result.
          </p>
          <p className="mt-3.5 text-[17px] leading-[1.7] text-cream/80 max-w-[46ch]">
            If the answer is &ldquo;not yet&rdquo;, the report tells you exactly
            which lever to pull first.
          </p>
          <div className="mt-9 flex flex-wrap gap-8 items-center">
            <a
              href="/quiz"
              className="bg-amber text-charcoal px-7 py-4 text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-amber-light hover:-translate-y-0.5 transition-all duration-200"
            >
              Take the readiness quiz
            </a>
            <a
              href="/case-studies"
              className="text-[13px] uppercase tracking-[0.18em] text-cream border-b border-amber pb-1.5 hover:text-amber"
            >
              See a sample report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
