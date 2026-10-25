const FLAWS = [
  {
    title: "The bad floor plan",
    body: "A long corridor. A bedroom that cannot fit a queen bed and a wardrobe. A kitchen you walk through to reach every other room. It looks fine in the brochure and feels wrong on day one.",
    check: "Your check: draw your own furniture onto the plan before you view.",
  },
  {
    title: "The dead space",
    body: "Bay windows, planter boxes, and air-con ledges. Some of that area is counted in the square footage you pay for, even though none of it can hold a sofa or a bed.",
    check: "Your check: work out the price per square foot you can actually live in.",
  },
  {
    title: "The overpriced stack",
    body: "The developer charges a premium for the marquee view. You pay that extra price on day one, and the next buyer often will not pay it again when you sell.",
    check: "Your check: compare stacks of the same size using real resale sales.",
  },
];

export default function FlawMethod() {
  return (
    <section
      id="method"
      className="surface-light py-24 md:py-28 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end mb-14">
          <div className="md:col-span-2">
            <h2 className="display-section max-w-[18ch]">
              How I check an East condo, for free.
            </h2>
          </div>
          <p className="prose-dark">
            These are the three flaws I look for first on every floor plan and
            site map. Now you can look for them too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FLAWS.map((f) => (
            <div
              key={f.title}
              data-reveal
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="display-block">{f.title}</h3>
                <p className="prose-dark mt-4">{f.body}</p>
              </div>
              <p className="mt-6 text-[16px] leading-[1.6] text-charcoal font-medium">
                {f.check}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-14 bg-charcoal-deep text-cream p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
        >
          <div>
            <p className="font-serif text-[24px] leading-[1.25] tracking-[-0.015em] text-cream">
              The water view cost more on day one. The flats inland grew more.
            </p>
            <p className="mt-4 text-[16px] leading-[1.65] text-cream/85">
              Bedok Reservoir condos, same road and unit sizes. I never pay for
              a view without checking what it did for the last owners.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { v: "9–16%", l: "Paid extra for the water view at launch" },
              { v: "10 of 12", l: "Same-size checks where inland stacks grew more" },
              { v: "1,052", l: "Real buy-then-sell pairs checked in Bedok" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-amber text-[24px] leading-tight tracking-[-0.015em]">
                  {s.v}
                </div>
                <div className="mt-2 text-[16px] leading-[1.55] text-cream/85">
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
