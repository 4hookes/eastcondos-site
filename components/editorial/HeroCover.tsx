import HeroMedia from "./HeroMedia";

export default function HeroCover() {
  return (
    <section
      data-hero
      className="relative bg-charcoal-deep gridlines overflow-hidden"
    >
      <HeroMedia />

      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 top-2 md:top-6 z-10"
      >
        01
      </div>

      <div
        data-hero-content
        className="relative z-10 max-w-broadsheet mx-auto px-6 md:px-12 w-full min-h-[calc(100svh-5rem)] flex flex-col justify-center pt-20 md:pt-28 pb-24 md:pb-28"
      >
        <div className="mono-label">Index / The Cover Story</div>

        <h1 className="display-hero mt-9 max-w-[14ch]">
          We run your numbers <em>before</em> we show you a single property.
        </h1>

        <p className="annot mt-11 max-w-[34ch]">
          &ldquo;I would rather lose a sale today than have a family lose ten
          years to a building they should never have bought.&rdquo;
        </p>

        <div className="mt-14 flex flex-wrap gap-x-14 gap-y-8">
          {[
            { num: "500+", lbl: "Families guided" },
            { num: "13 yrs", lbl: "In practice" },
            { num: "80%", lbl: "From referrals" },
            { num: "435k", lbl: "Transactions on file" },
          ].map((s) => (
            <div key={s.lbl}>
              <div
                data-countup
                className="font-display font-light text-[28px] md:text-[32px] text-cream tracking-[-0.02em]"
              >
                {s.num}
              </div>
              <div className="mono-label-dim mt-1.5">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-5 items-center">
          <a href="/safety-meter" className="btn-square">
            Run the Safety Meter
          </a>
          <a href="/discovery" className="btn-square-ghost">
            7-Min Discovery Call
          </a>
        </div>

        <div className="mono-label-dim mt-16 pt-6 border-t hairline">
          By Elfi Abdullah &middot; D14&ndash;18 Advisor &middot; East
          Singapore &middot; Est. 2013
        </div>
      </div>

      {/* Scroll cue — fades out as soon as the hero starts moving */}
      <div
        aria-hidden
        data-hero-cue
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
      >
        <span className="mono-label-dim !text-[10px]">Scroll</span>
        <span className="scroll-cue-line block w-px h-12 bg-cream/30 overflow-hidden" />
      </div>
    </section>
  );
}
