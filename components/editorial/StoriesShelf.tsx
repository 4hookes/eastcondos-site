import Image from "next/image";

const FEATURE = {
  badge: "Cover Story",
  meta: "Case Study \u00b7 No. 47 \u00b7 Tampines",
  title: "From a 4-room HDB to a dream condo, with $0 cash outlay.",
  lede: "James and Sarah were ready to upgrade but had only $40,000 in cash savings. The model showed they could do it without touching a dollar \u2014 using CPF, sale proceeds, and a concurrent timeline.",
  data: [
    { lbl: "Cash Outlay", v: "$0" },
    { lbl: "Timeline", v: "3 mo" },
    { lbl: "Equity Released", v: "$312k" },
    { lbl: "New Mortgage", v: "1.8% \u00b7 30y" },
  ],
  image:
    "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=900&q=80",
};

const INDEX = [
  {
    meta: "Case \u00b7 No. 41 \u00b7 Bedok",
    title: "\u201cWe almost bought the wrong unit on the wrong floor.\u201d",
    summary: "Saved",
    summaryBold: "$84k",
    summaryRest: "on entry \u00b7 Hit",
    summaryBold2: "+18%",
    summaryRest2: "in 4 years",
  },
  {
    meta: "Case \u00b7 No. 39 \u00b7 Marine Parade",
    title: "Concurrent timeline: HDB sale + condo TOP, zero gap.",
    summary: "Avoided",
    summaryBold: "11 months",
    summaryRest: "of temporary rental",
    summaryBold2: "",
    summaryRest2: "",
  },
  {
    meta: "Case \u00b7 No. 35 \u00b7 Pasir Ris",
    title: "The model said wait. We waited. Saved $200k.",
    summary: "Re-entry",
    summaryBold: "14 months later",
    summaryRest: "at the cycle low",
    summaryBold2: "",
    summaryRest2: "",
  },
];

export default function StoriesShelf() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end border-b-2 border-charcoal pb-8 mb-16">
          <div className="chapter-marker">
            Chapter 03<b>The Stories</b>
          </div>
          <h2 className="headline-block max-w-[18ch]">
            Five hundred families. One method. Honest numbers.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-start pb-16 border-b border-charcoal mb-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-light">
            <span className="photo-badge">{FEATURE.badge}</span>
            <Image
              src={FEATURE.image}
              alt="Featured case study property"
              width={900}
              height={675}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-amber-deep mb-4">
              {FEATURE.meta}
            </div>
            <h3
              className="font-serif text-charcoal max-w-[18ch]"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {FEATURE.title}
            </h3>
            <p className="mt-6 text-[17px] leading-[1.7] text-body max-w-[42ch]">
              {FEATURE.lede}
            </p>
            <div className="mt-7 grid grid-cols-2 border-l border-t border-charcoal">
              {FEATURE.data.map((d) => (
                <div
                  key={d.lbl}
                  className="px-4 py-3.5 border-r border-b border-charcoal"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep">
                    {d.lbl}
                  </div>
                  <div className="mt-1.5 font-serif text-[24px] leading-none tracking-[-0.015em] text-charcoal">
                    {d.v}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/case-studies"
              className="mt-7 inline-block text-[11px] uppercase tracking-[0.22em] text-charcoal border-b border-amber pb-1 hover:text-amber-deep"
            >
              Read full case study &rarr;
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {INDEX.map((c) => (
            <div key={c.title} className="pt-4 border-t border-charcoal">
              <div className="text-[10px] uppercase tracking-[0.24em] text-amber-deep">
                {c.meta}
              </div>
              <h4 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.01em] text-charcoal max-w-[18ch]">
                {c.title}
              </h4>
              <div className="mt-3.5 text-[13px] text-body">
                {c.summary}{" "}
                <b className="font-serif font-normal text-amber-deep text-[18px] tracking-[-0.01em]">
                  {c.summaryBold}
                </b>{" "}
                {c.summaryRest}
                {c.summaryBold2 && (
                  <>
                    {" "}
                    <b className="font-serif font-normal text-amber-deep text-[18px] tracking-[-0.01em]">
                      {c.summaryBold2}
                    </b>{" "}
                    {c.summaryRest2}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
