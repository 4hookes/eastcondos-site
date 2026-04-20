const CHAPTERS = [
  { no: "01", title: "The financial model, before everything.", page: "P. 14" },
  { no: "02", title: "The seven-key property report.", page: "P. 26" },
  { no: "03", title: "The eleven-factor x-ray.", page: "P. 41" },
  { no: "04", title: "Stories from 500 families.", page: "P. 58" },
];

export default function IndexRibbon() {
  return (
    <section className="bg-charcoal text-cream py-9 px-6 md:px-12">
      <div className="max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        <div>
          <h6 className="text-[10px] uppercase tracking-[0.28em] text-amber mb-1.5">
            In this issue
          </h6>
          <div className="font-serif text-[24px] tracking-[-0.01em] leading-tight">
            Six chapters on the upgrade decision.
          </div>
        </div>
        {CHAPTERS.map((c) => (
          <div key={c.no}>
            <div className="font-serif text-[22px] text-cream/50">{c.no}</div>
            <div className="font-serif text-[18px] tracking-[-0.01em] leading-tight mt-1">
              {c.title}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber mt-2">
              {c.page}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
