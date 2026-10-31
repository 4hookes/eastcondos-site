import Image from "next/image";
import PlannerForm from "./PlannerForm";

// The sample family already in the master sheet: $770,000 flat, $1.5M condo.
const RESULT = [
  { label: "Cash from the flat", value: "$352,214" },
  { label: "Monthly loan payment", value: "$5,552" },
  { label: "Extra safety from savings", value: "10.6 years" },
];

function ResultCard() {
  return (
    <figure data-ui className="bg-cream text-charcoal-deep p-5 sm:p-6 w-full">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[18px] font-medium">Robust plan</p>
        <p className="text-[44px] font-extralight leading-none tracking-[-0.03em] tabular-nums">
          90<span className="text-[18px] font-normal tracking-normal">/100</span>
        </p>
      </div>
      <dl className="mt-4 space-y-2">
        {RESULT.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 text-[16px]">
            <dt>{r.label}</dt>
            <dd className="font-medium tabular-nums">{r.value}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-4 text-[14px] text-[#4A4D55]">
        Sample family in the planner, $1.5M condo.
      </figcaption>
    </figure>
  );
}

export default function HdbToCondoPlannerPage() {
  return (
    <div className="bg-charcoal-deep text-cream selection:bg-amber selection:text-charcoal-deep lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:min-h-[100dvh]">
      <div className="flex flex-col px-5 sm:px-12 xl:px-20 pt-6 sm:pt-10 lg:min-h-[100dvh]">
        <p className="font-serif text-[24px] tracking-[-0.02em]">EastCondos</p>

        <div className="my-auto py-10 lg:py-12">
          <h1 className="font-sans font-extralight text-[40px] sm:text-[64px] xl:text-[72px] 2xl:text-[84px] leading-[1.04] tracking-[-0.035em] [text-wrap:balance] animate-fadeInUp">
            Can your HDB flat pay for a condo?
          </h1>
          <p className="mt-5 max-w-[600px] text-[18px] sm:text-[20px] leading-[1.5]">
            Find out with our free Google Sheet. Type in your flat and your pay, and see the cash
            you keep and your monthly payment.
          </p>
          <div className="mt-8 max-w-[640px]">
            <PlannerForm id="planner" />
          </div>
        </div>

        <p className="hidden lg:block pb-8 text-[14px] text-[#CBC8C0]">
          Elfi Abdullah, CEA R040487C. ERA Singapore, L3002382K.{" "}
          <a href="/privacy" className="underline underline-offset-2 text-cream">
            Privacy policy
          </a>
        </p>
      </div>

      <div className="relative bg-[#B4BBC4] min-h-[560px] overflow-hidden">
        <Image
          src="/images/home/elfi-6244.jpg"
          alt="Elfi Abdullah of EastCondos"
          fill
          priority
          sizes="(min-width: 1024px) 43vw, 100vw"
          className="object-cover object-[50%_8%]"
        />
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:right-8 sm:bottom-8 sm:w-[380px]">
          <ResultCard />
        </div>
      </div>

      <p className="lg:hidden px-5 py-6 text-[14px] text-[#CBC8C0]">
        Elfi Abdullah, CEA R040487C. ERA Singapore, L3002382K.{" "}
        <a href="/privacy" className="underline underline-offset-2 text-cream">
          Privacy policy
        </a>
      </p>
    </div>
  );
}
