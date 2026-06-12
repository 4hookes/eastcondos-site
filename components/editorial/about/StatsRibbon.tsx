const STATS = [
  { lbl: "Years in practice", num: "13", suffix: "", note: "D14, D15, D16, D17, D18" },
  { lbl: "Families guided", num: "500", suffix: "+", note: "Through the upgrade decision" },
  { lbl: "From referrals", num: "80", suffix: "%", note: "Of all new clients" },
  { lbl: "Transactions on file", num: "435", suffix: "k", note: "Behind every recommendation" },
];

export default function StatsRibbon() {
  return (
    <section className="bg-charcoal-deep gridlines text-cream py-14 px-6 md:px-12 border-y hairline">
      <div className="max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-4 border-l hairline">
        {STATS.map((s) => (
          <div key={s.lbl} className="px-8 py-4 border-r hairline">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber mb-4">
              {s.lbl}
            </div>
            <div
              className="font-display font-extralight text-cream"
              style={{ fontSize: "72px", lineHeight: 0.95, letterSpacing: "-0.05em" }}
            >
              {s.num}
              <span className="text-amber">{s.suffix}</span>
            </div>
            <div className="mt-2.5 text-[14px] text-cream/55 max-w-[24ch] leading-[1.55]">
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
