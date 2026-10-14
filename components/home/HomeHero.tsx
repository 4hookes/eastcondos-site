import Image from "next/image";

/**
 * Homepage cover — product-first (North Star §1, re-locked 2026-09-27).
 * One promise (I find the flaw), one filter (East condos only), one close
 * (the 7-minute Fit-Check), and Elfi's real face beside it.
 */
export default function HomeHero() {
  return (
    <section
      data-hero
      className="relative bg-charcoal-deep gridlines overflow-hidden border-b hairline"
    >
      <div className="relative max-w-broadsheet mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center pt-16 md:pt-24 pb-20 md:pb-24">
        <div data-hero-content>
          <div className="mono-label">East side condos only</div>

          <h1 className="display-hero mt-8 max-w-[13ch]">
            I find the flaw <em>before</em> you buy the condo.
          </h1>

          <p className="mt-9 text-[18px] md:text-[19px] leading-[1.7] text-cream/80 max-w-[44ch]">
            Bad floor plans. Wasted space. Stacks that cost too much. I check
            every East condo for them, then tell you straight which ones pass.
          </p>

          <div className="mt-11 flex flex-wrap gap-4 items-center">
            <a href="/discovery" className="btn-square">
              Book a 7-min Fit-Check
            </a>
            <a href="#deep-dives" className="btn-square-ghost">
              Watch a condo check
            </a>
          </div>

          <div className="mt-14 pt-6 border-t hairline grid grid-cols-3 gap-6 max-w-[520px]">
            {[
              { num: "13", unit: "yrs", lbl: "In the East" },
              { num: "500", unit: "+", lbl: "Families helped" },
              { num: "80", unit: "%", lbl: "Come by referral" },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-display font-light text-[30px] md:text-[34px] text-cream tracking-[-0.02em] leading-none">
                  {s.num}
                  <span className="text-amber-light text-[0.7em] ml-0.5">
                    {s.unit}
                  </span>
                </div>
                <div className="mono-label-dim mt-2 !text-[10.5px]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-light border hairline">
            <Image
              src="/images/home/elfi-6265.jpg"
              alt="Elfi Abdullah, EastCondos"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[50%_18%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(14,14,31,0.92) 0%, rgba(14,14,31,0) 38%)",
              }}
            />
            <figcaption className="absolute left-5 right-5 bottom-5">
              <div className="font-display font-light text-[22px] text-cream tracking-[-0.01em]">
                Elfi Abdullah
              </div>
              <div className="mono-label-dim mt-1.5 !text-[10px]">
                ERA Realty &middot; CEA R040487C
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
