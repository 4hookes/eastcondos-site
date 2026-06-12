import EcIcon, { type EcIconName } from "@/components/EcIcon";

const STEPS: {
  no: string;
  when: string;
  icon: EcIconName;
  title: string;
  body: string;
  deliverable: string;
}[] = [
  {
    no: "01",
    when: "Days 1–3",
    icon: "calculator",
    title: "Qualify & Plan",
    body: "We work out your loan limit, your CPF, and your stress test first. We know what you can carry before we know what to look at.",
    deliverable: "Personalised model + roadmap",
  },
  {
    no: "02",
    when: "Weeks 1–6",
    icon: "growth-staircase",
    title: "Sell High",
    body: "Pro photography, listed across PropertyGuru, MIH and EdgeProp. We check recent sales nearby and run the offers against each other.",
    deliverable: "HDB resale at maximum price",
  },
  {
    no: "03",
    when: "Weeks 4–10",
    icon: "magnifier",
    title: "Buy Smart",
    body: "The 7-key report and 12-factor check, run on every place before a single viewing. No “feels right”. Only “passes the test”.",
    deliverable: "7-key report on every shortlist",
  },
  {
    no: "04",
    when: "Months 3–6",
    icon: "key",
    title: "Execute",
    body: "We line up your HDB sale, your new keys, and your move so they meet. No temporary housing. No paying two home loans at once.",
    deliverable: "Keys to keys, no gap period",
  },
];

export default function MethodGrid() {
  return (
    <section
      id="method"
      className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden"
    >
      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 -top-2 md:top-2"
      >
        03
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-end mb-16 border-b hairline pb-8">
          <div className="mono-label">03 / The Method</div>
          <h2 className="display-section max-w-[24ch]">
            Every family receives the <b>same four documents</b>, in the same
            order, before any property is discussed.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-l hairline border-t">
          {STEPS.map((s) => (
            <div
              key={s.no}
              className="p-8 border-r border-b hairline flex flex-col min-h-[340px] hover:bg-charcoal/60 transition-colors duration-300"
            >
              <div className="flex justify-between items-baseline mb-6">
                <div className="font-display font-extralight text-[52px] leading-none tracking-[-0.04em] text-cream/25">
                  {s.no}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                  {s.when}
                </div>
              </div>
              <EcIcon name={s.icon} variant="light" size={40} className="mb-5" />
              <h4 className="display-block mb-4">{s.title}</h4>
              <p className="prose-dark text-[14.5px]">{s.body}</p>
              <div className="mt-auto pt-5 border-t hairline font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                Deliverable
                <b className="block font-sans font-normal text-cream/90 text-[15px] normal-case tracking-normal mt-1.5">
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
