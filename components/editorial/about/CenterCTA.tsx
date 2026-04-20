export default function CenterCTA() {
  return (
    <section className="bg-charcoal-light text-cream py-32 md:py-36 px-6 md:px-12 border-t-[6px] border-amber text-center">
      <div className="text-[12px] uppercase tracking-[0.28em] text-amber mb-6 font-medium">
        Ready when you are
      </div>
      <h3
        className="font-serif text-cream max-w-[22ch] mx-auto"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
        }}
      >
        The first conversation is always free, always honest, always private.
      </h3>
      <p className="mt-6 text-[17px] leading-[1.7] text-cream/75 max-w-[48ch] mx-auto">
        Book a Strategy Session. We review your numbers and tell you exactly
        where you stand &mdash; no obligations, no pressure.
      </p>
      <div className="mt-12 flex flex-wrap gap-8 justify-center items-center">
        <a
          href="/strategy-session"
          className="bg-amber text-charcoal px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-amber-light hover:-translate-y-0.5 transition-all duration-200"
        >
          Book a Strategy Session
        </a>
        <a
          href="/quiz"
          className="text-[13px] uppercase tracking-[0.18em] text-cream border-b border-amber pb-1.5 hover:text-amber"
        >
          Take the readiness quiz first
        </a>
      </div>
    </section>
  );
}
