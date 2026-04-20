const STEPS = [
  {
    no: "01",
    when: "Days 1\u20133",
    title: "Qualify & Plan",
    body: "The financial model: TDSR, CPF, stress test, two-mortgage scenarios. We know what you can carry before we know what to look at.",
    deliverable: "Personalised model + roadmap",
  },
  {
    no: "02",
    when: "Weeks 1\u20136",
    title: "Sell High",
    body: "Tubear photography, listing across PropertyGuru, MIH, EdgeProp. Comparable sales analysis. Negotiation across multiple offers.",
    deliverable: "HDB resale at maximum price",
  },
  {
    no: "03",
    when: "Weeks 4\u201310",
    title: "Buy Smart",
    body: "The 7-key property report and 11-factor x-ray, run on every shortlist before a single viewing. No \u201cfeels right\u201d. Only \u201cpasses the test\u201d.",
    deliverable: "7-key report on every shortlist",
  },
  {
    no: "04",
    when: "Months 3\u20136",
    title: "Execute",
    body: "Concurrent timeline so HDB sale, condo completion, and your move all align. No temporary housing. No double-mortgage gap.",
    deliverable: "Keys to keys, no gap period",
  },
];

export default function MethodGrid() {
  return (
    <section
      id="method"
      className="bg-paper py-24 md:py-32 px-6 md:px-12 border-t border-charcoal"
    >
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b border-charcoal pb-8">
          <div className="chapter-marker">
            Chapter 02<b>The Method</b>
          </div>
          <h2 className="headline-block max-w-[22ch]">
            Every family receives the same four documents, in the same order,
            before any property is discussed.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-charcoal">
          {STEPS.map((s) => (
            <div
              key={s.no}
              className="p-8 border-r border-b border-charcoal flex flex-col min-h-[340px] hover:bg-cream transition-colors duration-300"
            >
              <div className="flex justify-between items-baseline mb-5">
                <div className="font-serif text-[48px] leading-none tracking-[-0.04em] text-charcoal/30">
                  {s.no}
                </div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-amber-deep">
                  {s.when}
                </div>
              </div>
              <h4 className="font-serif text-[26px] leading-tight tracking-[-0.01em] text-charcoal mb-3.5">
                {s.title}
              </h4>
              <p className="text-sm leading-[1.65] text-body">{s.body}</p>
              <div className="mt-auto pt-5 border-t border-dotted border-[#c9bfa3] text-[11px] uppercase tracking-[0.18em] text-amber-deep">
                Deliverable
                <b className="block font-serif font-normal text-charcoal text-[14px] normal-case tracking-normal mt-1">
                  {s.deliverable}
                </b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
