import Image from "next/image";
import PlannerForm from "./PlannerForm";
import RateCheck from "./RateCheck";

const SAMPLE = [
  { label: "Flat sold for", value: "$770,000" },
  { label: "Cash left after the loan, CPF and fees", value: "$352,214" },
  { label: "Condo they want", value: "$1,500,000" },
  { label: "Needed upfront, cash and CPF", value: "$422,600" },
];

const TABS = [
  {
    title: "Bio: you and your pay",
    text: "Your age, salary, bonus, other loans and CPF. The sheet tells you where to find each number in your Singpass app.",
    src: "/images/planner/sheet-bio.png",
    alt: "The Bio tab of the planner, with sample numbers for two buyers",
    w: 845,
    h: 541,
  },
  {
    title: "My HDB: what your flat leaves you",
    text: "Your selling price, what's left on the loan, and the CPF that goes back to your account. Out comes the cash in your hand.",
    src: "/images/planner/sheet-my-hdb.png",
    alt: "The My HDB tab of the planner, working out cash from a $770,000 sale",
    w: 794,
    h: 539,
  },
];

const VERDICTS = [
  { name: "Elite or robust", say: "The sweet spot. Your monthly top-up stays easy to carry.", fill: "#6AA84F" },
  { name: "Balanced", say: "Safe and steady. Your plan works.", fill: "#3D85C6" },
  { name: "Too safe", say: "You can afford more than you're looking at.", fill: "#F1C232" },
  { name: "High commitment", say: "You can pay, but your savings run down faster.", fill: "#E69138" },
  { name: "Lifestyle risk", say: "Stop. Even if the bank says yes, this will hurt.", fill: "#CC0000" },
  { name: "Impossible", say: "Hard stop. This price doesn't work on these numbers.", fill: "#85200C" },
];

const QUESTIONS = [
  {
    q: "Is it really free?",
    a: "Yes. The planner costs nothing, and you don't need to book anything to get it.",
  },
  {
    q: "Who can see my numbers?",
    a: "Your copy is made for you. Only you and Elfi have the link, and Elfi can see what you type in.",
  },
  {
    q: "Is there an Excel version?",
    a: "No, it's Google Sheets only. It opens on your phone or your computer.",
  },
  {
    q: "What if I changed my mind?",
    a: "Tap No on our first WhatsApp message and we'll stop messaging you.",
  },
  {
    q: "Can I rely on the answer?",
    a: "It's an estimate to help you plan. Check the final figures with HDB, the CPF Board and your bank.",
  },
];

export default function HdbToCondoPlannerPage() {
  return (
    <main className="bg-charcoal-deep text-cream">
      <section className="px-4 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <h1 className="font-sans font-extralight text-[40px] sm:text-[64px] xl:text-[76px] leading-[1.04] tracking-[-0.035em]">
              Can your HDB flat pay for a condo?
            </h1>
            <p className="mt-6 max-w-[620px] text-[18px] sm:text-[20px] leading-[1.5]">
              Find out with our free Google Sheet. Type in your flat and your pay, and see the cash
              you keep, the monthly payment, and how long your savings last.
            </p>
            <figure className="mt-10 hidden lg:block">
              <Image
                src="/images/planner/sheet-condo.png"
                alt="The Condo tab of the planner, ending in a green verdict: robust plan, score 90 out of 100"
                width={1212}
                height={958}
                priority
                className="w-full h-auto"
              />
            </figure>
          </div>
          <div id="get-it" className="relative lg:sticky lg:top-24 scroll-mt-24">
            <PlannerForm id="top" />
          </div>
        </div>
      </section>

      <section className="surface-light bg-cream text-charcoal-deep px-4 sm:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <h2 data-reveal className="font-sans font-extralight text-[38px] sm:text-[61px] leading-[1.05] tracking-[-0.03em] max-w-[900px]">
            Here's a family the sheet has worked out
          </h2>
          <p data-reveal className="mt-5 max-w-[640px] text-[18px] leading-[1.55]">
            These are the sample numbers already in the sheet. Two buyers earn $13,200 a month
            between them. Yours will be different, which is the point.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {SAMPLE.map((s) => (
              <div key={s.label} data-reveal>
                <p className="font-sans text-[48px] lg:text-[76px] font-extralight leading-none tracking-[-0.03em] tabular-nums">
                  {s.value}
                </p>
                <p className="mt-3 text-[18px]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 lg:hidden">
            <Image
              src="/images/planner/sheet-condo.png"
              alt="The Condo tab of the planner, ending in a green verdict: robust plan, score 90 out of 100"
              width={1212}
              height={958}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-14">
            <div data-reveal><RateCheck /></div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <h2 data-reveal className="font-sans font-extralight text-[38px] sm:text-[61px] leading-[1.05] tracking-[-0.03em]">
            Fill in the beige cells. That's it.
          </h2>
          <div className="mt-14 space-y-16">
            {TABS.map((t, i) => (
              <div key={t.title} className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <h3 data-reveal className="font-sans text-[28px] sm:text-[36px] font-light leading-[1.12] tracking-[-0.02em]">{t.title}</h3>
                  <p data-reveal className="mt-4 text-[18px] leading-[1.55]">{t.text}</p>
                </div>
                <Image data-reveal src={t.src} alt={t.alt} width={t.w} height={t.h} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-4 sm:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
          <div>
            <h2 data-reveal className="font-sans font-extralight text-[38px] sm:text-[61px] leading-[1.05] tracking-[-0.03em]">
              You get a straight answer
            </h2>
            <p data-reveal className="mt-5 text-[18px] leading-[1.55]">
              A bank tells you what it will lend. This tells you if you can live with it. Type in
              the condo price and the sheet gives you a score out of 100, in one of six colours.
            </p>
          </div>
          <ul className="space-y-3">
            {VERDICTS.map((v) => (
              <li data-reveal key={v.name} className="flex bg-charcoal-deep">
                <span className="w-4 sm:w-6 shrink-0" style={{ background: v.fill }} aria-hidden="true" />
                <div className="p-4 sm:p-5">
                  <div className="text-[20px] font-medium">{v.name}</div>
                  <div className="mt-1 text-[16px] leading-[1.5]">{v.say}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-[1320px] grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start">
          <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-charcoal-light">
            <Image
              src="/images/home/elfi-6265.jpg"
              alt="Elfi Abdullah of EastCondos"
              fill
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
          <div>
            <h2 data-reveal className="font-sans font-extralight text-[38px] sm:text-[61px] leading-[1.05] tracking-[-0.03em]">
              Common questions
            </h2>
            <div className="mt-10 space-y-8">
              {QUESTIONS.map((x) => (
                <div key={x.q} data-reveal>
                  <h3 data-reveal className="text-[20px] font-medium">{x.q}</h3>
                  <p data-reveal className="mt-2 text-[18px] leading-[1.55]">{x.a}</p>
                </div>
              ))}
            </div>
            <p data-reveal className="mt-10 text-[16px] text-[#CBC8C0]">
              Made by Elfi Abdullah, EastCondos. CEA R040487C.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-amber text-charcoal-deep px-4 sm:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-[1.25fr_1fr] gap-10 items-center">
          <h2 data-reveal className="font-sans font-extralight text-[42px] sm:text-[72px] leading-[1.04] tracking-[-0.03em]">
            Know your numbers first.
          </h2>
          <PlannerForm id="end" />
        </div>
      </section>
    </main>
  );
}
