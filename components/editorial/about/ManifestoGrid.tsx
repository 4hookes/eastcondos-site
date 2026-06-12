import EcIcon, { type EcIconName } from "@/components/EcIcon";

const BELIEFS: { no: string; icon: EcIconName; title: string; body: string }[] = [
  {
    no: "01",
    icon: "chart-up",
    title: "The model comes first.",
    body: "No place is shown until your numbers have been run. Every time. The model is the condition, not the consequence.",
  },
  {
    no: "02",
    icon: "location-pin",
    title: "Depth over breadth.",
    body: "Five districts, not the whole island. We would rather know one street perfectly than fifty streets in passing.",
  },
  {
    no: "03",
    icon: "shield-check",
    title: "The honest “no”.",
    body: "If the answer is “not yet” or “not ever”, that is the answer. A lost sale is cheaper than a wrong buy.",
  },
  {
    no: "04",
    icon: "checklist",
    title: "Twelve factors, every time.",
    body: "The 12-factor check is not something we use only sometimes. It runs on every place on your shortlist, full stop.",
  },
  {
    no: "05",
    icon: "handshake",
    title: "Referrals, not advertising.",
    body: "Eight in ten of our clients come from past clients. We have never bought a lead. We never will.",
  },
  {
    no: "06",
    icon: "calendar",
    title: "Concurrent timelines.",
    body: "Your HDB sale, your new keys, and your move are lined up so you never sit in a rental and never pay two home loans at once.",
  },
];

export default function ManifestoGrid() {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline">
      <div className="max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b hairline-strong pb-7">
          <div className="mono-label">The Practice / Six Principles</div>
          <h2 className="display-section max-w-[20ch]">
            What this advisory believes, <b>written down</b> so you can hold us
            to it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t hairline">
          {BELIEFS.map((b) => (
            <div
              key={b.no}
              className="p-8 border-r border-b hairline min-h-[280px] flex flex-col hover:bg-charcoal/60 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="font-display font-extralight text-[46px] leading-none tracking-[-0.04em] text-cream/25">
                  {b.no}
                </div>
                <EcIcon name={b.icon} variant="light" size={36} className="opacity-75" />
              </div>
              <h4 className="display-block !text-[22px] mb-4 max-w-[16ch]">
                {b.title}
              </h4>
              <p className="prose-dark text-[14.5px]">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
