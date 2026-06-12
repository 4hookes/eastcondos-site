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
    lbl: "Transactions on file",
    num: "435",
    suffix: "k",
    note: "Resale records behind every recommendation.",
  },
];

export default function ByTheNumbers() {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline">
      <div className="max-w-broadsheet mx-auto">
        <div className="flex flex-wrap gap-4 justify-between items-end border-b hairline-strong pb-5 mb-14">
          <div className="display-block">By the numbers</div>
          <div className="mono-label-dim">2013 — 2026</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t hairline">
          {STATS.map((s) => (
            <div key={s.lbl} className="p-8 border-r border-b hairline">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber mb-5">
                {s.lbl}
              </div>
              <div
                className="font-display font-extralight text-cream"
                style={{
                  fontSize: "clamp(64px, 7vw, 96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                }}
              >
                {s.num}
                <span className="text-amber">{s.suffix}</span>
              </div>
              <div className="prose-dark text-[14px] mt-4 max-w-[24ch]">
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
