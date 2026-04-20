const STATS = [
  {
    lbl: "Years in practice",
    num: "13",
    suffix: "",
    note: "Specialising in D14, D15, D16, D17, D18.",
  },
  {
    lbl: "Families guided",
    num: "500",
    suffix: "+",
    note: "Through the upgrade decision since 2013.",
  },
  {
    lbl: "From referrals",
    num: "80",
    suffix: "%",
    note: "Of new clients arrive through past clients.",
  },
  {
    lbl: "Google rating",
    num: "4.9",
    suffix: "\u2605",
    note: "Across 200+ verified reviews.",
  },
];

export default function ByTheNumbers() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12 border-t border-charcoal">
      <div className="max-w-broadsheet mx-auto">
        <div className="flex justify-between items-end border-b-2 border-charcoal pb-4 mb-12">
          <div className="font-serif text-[36px] tracking-[-0.02em]">
            By the numbers
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#6B6B6B]">
            2013 &mdash; 2026 &middot; Verified
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-charcoal">
          {STATS.map((s) => (
            <div
              key={s.lbl}
              className="p-7 border-r border-b border-charcoal"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-amber-deep mb-3.5">
                {s.lbl}
              </div>
              <div
                className="font-serif text-charcoal"
                style={{
                  fontSize: "108px",
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                }}
              >
                {s.num}
                <span className="text-amber-deep">{s.suffix}</span>
              </div>
              <div className="mt-3.5 text-sm leading-[1.5] text-body max-w-[24ch]">
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
