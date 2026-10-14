import EcIcon, { type EcIconName } from "@/components/EcIcon";

/**
 * The free secret (North Star §1): the Flaw-Finding method, given away.
 * Three checks any buyer can run, then one receipt from real sales.
 * Method only. No condo is called good or bad here.
 */
const FLAWS: {
  no: string;
  icon: EcIconName;
  title: string;
  body: string;
  check: string;
}[] = [
  {
    no: "01",
    icon: "floor-area",
    title: "The bad floor plan",
    body: "A long corridor. A bedroom that can't fit a queen bed and a wardrobe. A kitchen you walk through to reach every other room. It looks fine in the brochure. It feels wrong on day one.",
    check: "Draw your own furniture onto the plan before you view.",
  },
  {
    no: "02",
    icon: "magnifier",
    title: "The dead space",
    body: "Bay windows, planter boxes, air-con ledges. Some of it is counted in the size you pay for. None of it can hold a sofa or a bed.",
    check: "Work out the price per square foot you can actually live in.",
  },
  {
    no: "03",
    icon: "balance-scale",
    title: "The stack that costs too much",
    body: "The developer charges more for the good view. You pay that extra once. The next buyer often won't pay it again when you sell.",
    check: "Compare stacks of the same size using real resale sales.",
  },
];

export default function FlawMethod() {
  return (
    <section
      id="method"
      className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div aria-hidden className="meganum absolute right-6 md:right-12 -top-2 md:top-2">
        01
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-end border-b hairline pb-8 mb-14">
          <div className="mono-label">01 / The free part</div>
          <div>
            <h2 className="display-section max-w-[14ch]">
              How I check a condo. <em>Free.</em>
            </h2>
            <p className="prose-dark mt-6 max-w-[52ch]">
              These are the three things I look for first. Now you can look
              for them too.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t hairline">
          {FLAWS.map((f) => (
            <div
              key={f.no}
              data-reveal
              className="p-8 md:p-9 border-r border-b hairline flex flex-col"
            >
              <div className="flex items-start justify-between mb-7">
                <div className="font-display font-extralight text-[52px] leading-none tracking-[-0.04em] text-charcoal/25">
                  {f.no}
                </div>
                <EcIcon name={f.icon} size={44} />
              </div>
              <h3 className="display-block">{f.title}</h3>
              <p className="prose-dark text-[15.5px] mt-4">{f.body}</p>
              <div className="mt-auto pt-6">
                <div className="pt-5 border-t hairline">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                    Your check
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.6] text-charcoal font-medium">
                    {f.check}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The receipt: why flaw 03 matters, from real buy-and-sell pairs */}
        <div
          data-reveal
          className="mt-14 bg-charcoal-deep text-cream p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center"
        >
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber">
              Receipt &middot; the reservoir condos in Bedok
            </div>
            <p className="mt-5 font-display font-light text-[26px] md:text-[30px] leading-[1.2] tracking-[-0.02em] text-cream">
              The water view cost more on day one. The flats inland grew more.
            </p>
            <p className="mt-5 text-[14.5px] leading-[1.7] text-cream/60">
              Same road, same sizes, real sales. So I never pay for a view
              without checking what it did for the last owners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 border-l border-t border-cream/15">
            {[
              { v: "9–16%", l: "More, for the water view at launch" },
              { v: "10 of 12", l: "Same-size checks where the inland side grew more" },
              { v: "1,052", l: "Real buy-then-sell pairs checked" },
            ].map((s) => (
              <div key={s.l} className="p-6 border-r border-b border-cream/15">
                <div className="font-display font-extralight text-cream text-[40px] leading-none tracking-[-0.04em]">
                  {s.v}
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-cream/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
