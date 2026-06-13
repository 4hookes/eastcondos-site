import Image from "next/image";

const FEATURE = {
  badge: "Cover Story",
  meta: "Case Study · No. 47 · Tampines",
  title: "From a 4-room HDB to a dream condo, with $0 cash outlay.",
  lede: "James and Sarah were ready to upgrade but had only $40,000 in cash savings. The model showed they could do it without touching a dollar — using CPF, sale proceeds, and a concurrent timeline.",
  data: [
    { lbl: "Cash Outlay", v: "$0" },
    { lbl: "Timeline", v: "3 mo" },
    { lbl: "Equity Released", v: "$312k" },
    { lbl: "New Mortgage", v: "1.8% · 30y" },
  ],
  image: "/images/homepage/stories-cover.png",
};

const INDEX = [
  {
    meta: "Case · No. 41 · Bedok",
    title: "“We almost bought the wrong unit on the wrong floor.”",
    summary: "Saved",
    summaryBold: "$84k",
    summaryRest: "on entry · Hit",
    summaryBold2: "+18%",
    summaryRest2: "in 4 years",
  },
  {
    meta: "Case · No. 39 · Marine Parade",
    title: "Concurrent timeline: HDB sale + condo TOP, zero gap.",
    summary: "Avoided",
    summaryBold: "11 months",
    summaryRest: "of temporary rental",
    summaryBold2: "",
    summaryRest2: "",
  },
  {
    meta: "Case · No. 35 · Pasir Ris",
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
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden">
      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 -top-2 md:top-2"
      >
        04
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end border-b hairline pb-8 mb-16">
          <div className="mono-label">04 / The Stories</div>
          <h2 className="display-section max-w-[20ch]">
            Five hundred families. One method. <b>Honest numbers.</b>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-start pb-16 border-b hairline mb-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-light">
            <span className="photo-badge">{FEATURE.badge}</span>
            <Image
              src={FEATURE.image}
              alt="Featured case study property"
              width={900}
              height={675}
              unoptimized
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.88) contrast(1.05)" }}
            />
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber mb-5">
              {FEATURE.meta}
            </div>
            <h3 className="display-block !text-[clamp(1.7rem,2.6vw,2.3rem)] max-w-[18ch]">
              {FEATURE.title}
            </h3>
            <p className="prose-dark mt-6 max-w-[42ch]">{FEATURE.lede}</p>
            <div className="mt-8 grid grid-cols-2 border-l border-t hairline">
              {FEATURE.data.map((d) => (
                <div key={d.lbl} data-reveal className="px-4 py-4 border-r border-b hairline">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                    {d.lbl}
                  </div>
                  <div className="mt-2 font-display font-light text-[24px] leading-none tracking-[-0.02em] text-cream">
                    {d.v}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/case-studies"
              className="mt-8 inline-block font-mono text-[12px] uppercase tracking-[0.2em] text-cream border-b border-amber pb-1.5 hover:text-amber transition-colors"
            >
              Read full case study &rarr;
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {INDEX.map((c) => (
            <div key={c.title} data-reveal className="pt-5 border-t hairline">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
                {c.meta}
              </div>
              <h4 className="mt-3 font-display font-light text-[22px] leading-snug tracking-[-0.015em] text-cream max-w-[20ch]">
                {c.title}
              </h4>
              <div className="mt-3.5 prose-dark text-[14.5px]">
                {c.summary}{" "}
                <b className="font-serif italic font-normal text-amber text-[17px]">
                  {c.summaryBold}
                </b>{" "}
                {c.summaryRest}
                {c.summaryBold2 && (
                  <>
                    {" "}
                    <b className="font-serif italic font-normal text-amber text-[17px]">
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
