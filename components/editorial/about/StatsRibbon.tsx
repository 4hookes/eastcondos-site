const STATS = [
  { lbl: "Years in practice", num: "13", suffix: "", note: "D14, D15, D16, D17, D18" },
  { lbl: "Families guided", num: "500", suffix: "+", note: "Through the upgrade decision" },
  { lbl: "From referrals", num: "80", suffix: "%", note: "Of all new clients" },
  { lbl: "Google rating", num: "4.9", suffix: "\u2605", note: "Across 200+ reviews" },
];

export default function StatsRibbon() {
  return (
    <section className="bg-charcoal text-cream py-12 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-4 border-l border-white/15">
        {STATS.map((s) => (
          <div key={s.lbl} className="px-8 py-2 border-r border-white/15">
            <div className="text-[10px] uppercase tracking-[0.28em] text-amber mb-3.5">
              {s.lbl}
            </div>
            <div
              className="font-serif text-cream"
              style={{ fontSize: "84px", lineHeight: 0.95, letterSpacing: "-0.04em" }}
            >
              {s.num}
              <span className="text-amber">{s.suffix}</span>
            </div>
            <div className="mt-2 text-[13px] text-cream/70 max-w-[24ch] leading-[1.5]">
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
