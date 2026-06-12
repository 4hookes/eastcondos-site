export default function QuizBand() {
  return (
    <section className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        <div>
          <div className="mono-label mb-7">Begin Here</div>
          <h3 className="display-section max-w-[16ch]">
            Are you <em>actually</em> ready to upgrade?
          </h3>
          <p className="mt-7 text-[17px] leading-[1.75] text-body max-w-[46ch]">
            The Safety Meter runs your real numbers — income, CPF, loan limits —
            and tells you where you stand. No email required to see the result.
            If the answer is &ldquo;not yet&rdquo;, it tells you exactly which
            lever to pull first.
          </p>
        </div>
        <div className="shrink-0">
          <a
            href="/safety-meter"
            className="inline-flex items-center justify-center bg-charcoal text-cream font-sans text-[12px] uppercase font-semibold px-10 py-5 transition-all duration-200 hover:bg-charcoal-light"
            style={{ letterSpacing: "0.24em" }}
          >
            Run the Safety Meter
          </a>
        </div>
      </div>
    </section>
  );
}
