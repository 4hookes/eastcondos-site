export default function HeroCover() {
  return (
    <section className="relative bg-charcoal-deep gridlines overflow-hidden">
      {/* Atmospheric skyline backdrop — desaturated, gradient-masked so type stays crisp */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img
          src="/broll/hero-skyline.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.32]"
          style={{ filter: "grayscale(0.35) contrast(1.05) brightness(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0E0E1F 0%, rgba(14,14,31,0.92) 38%, rgba(14,14,31,0.55) 70%, rgba(14,14,31,0.78) 100%), linear-gradient(0deg, #0E0E1F 0%, rgba(14,14,31,0) 45%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 top-2 md:top-6 z-10"
      >
        01
      </div>

      <div className="relative z-10 max-w-broadsheet mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-24">
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
              <div className="font-display font-light text-[28px] md:text-[32px] text-cream tracking-[-0.02em]">
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
          By Elfi Abdullah &middot; D14&ndash;18 Specialist &middot; East
          Singapore &middot; Est. 2013
        </div>
      </div>
    </section>
  );
}
