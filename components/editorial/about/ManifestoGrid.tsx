const BELIEFS = [
  {
    no: "01",
    title: "The model comes first.",
    body: "No property is shown until your numbers have been run. Every time. Without exception. The model is the condition, not the consequence.",
  },
  {
    no: "02",
    title: "Depth over breadth.",
    body: "Five districts, not the whole island. We would rather know one street perfectly than fifty streets generally.",
  },
  {
    no: "03",
    title: "The honest \u201cno\u201d.",
    body: "If the answer is \u201cnot yet\u201d or \u201cnot ever\u201d, the answer is \u201cnot yet\u201d or \u201cnot ever\u201d. A lost sale is cheaper than a wrong purchase.",
  },
  {
    no: "04",
    title: "Eleven factors, every time.",
    body: "The 11-factor x-ray is not a checklist we sometimes use. It is the discipline that runs on every shortlist, full stop.",
  },
  {
    no: "05",
    title: "Referrals, not advertising.",
    body: "Eighty percent of clients arrive through past clients. We have never bought a lead. We never will.",
  },
  {
    no: "06",
    title: "Concurrent timelines.",
    body: "HDB sale, condo completion, and your move are sequenced so the family is never in temporary housing and never paying two mortgages longer than the model said.",
  },
];

export default function ManifestoGrid() {
  return (
    <section className="bg-paper py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b border-charcoal pb-6">
          <div className="chapter-marker">
            The Practice<b>Six Principles</b>
          </div>
          <h2 className="headline-block max-w-[18ch]">
            What this advisory believes, written down so you can hold us to it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-charcoal">
          {BELIEFS.map((b) => (
            <div
              key={b.no}
              className="p-8 border-r border-b border-charcoal min-h-[280px] flex flex-col"
            >
              <div className="font-serif text-[42px] leading-none tracking-[-0.04em] text-charcoal/25 mb-5">
                {b.no}
              </div>
              <h4 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-charcoal mb-3.5 max-w-[14ch]">
                {b.title}
              </h4>
              <p className="text-[15px] leading-[1.7] text-body">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
