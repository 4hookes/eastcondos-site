"use client";

import { useState } from "react";

// The planner's own stress test, with the sample family's numbers from the master sheet.
const RATES = {
  today: { label: "2.15%", instalment: "$5,552", topUp: "$2,686", note: "This is the rate the sheet uses for today." },
  stress: { label: "4%", instalment: "$6,606", topUp: "$3,740", note: "That's $1,054 more cash every month, for the same condo." },
};

export default function RateCheck() {
  const [rate, setRate] = useState<keyof typeof RATES>("today");
  const r = RATES[rate];
  return (
    <div className="bg-amber text-charcoal-deep p-6 sm:p-10">
      <h3 className="font-sans text-[28px] sm:text-[36px] font-light leading-[1.1] tracking-[-0.02em]">
        What if the interest rate goes up?
      </h3>
      <div className="mt-6 flex" role="group" aria-label="Choose an interest rate">
        {(Object.keys(RATES) as Array<keyof typeof RATES>).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={rate === k}
            onClick={() => setRate(k)}
            className={`flex-1 sm:flex-none sm:px-10 py-3.5 text-[18px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-deep ${
              rate === k ? "bg-charcoal-deep text-cream" : "bg-amber-light text-charcoal-deep hover:bg-cream"
            }`}
          >
            {RATES[k].label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6" aria-live="polite">
        <div>
          <p className="font-sans text-[40px] lg:text-[76px] font-extralight leading-none tracking-[-0.03em] tabular-nums">
            {r.instalment}
          </p>
          <p className="mt-3 text-[16px] sm:text-[18px]">Monthly loan payment</p>
        </div>
        <div>
          <p className="font-sans text-[40px] lg:text-[76px] font-extralight leading-none tracking-[-0.03em] tabular-nums">
            {r.topUp}
          </p>
          <p className="mt-3 text-[16px] sm:text-[18px]">Cash you top up, after CPF</p>
        </div>
      </div>
      <p className="mt-6 text-[18px] leading-[1.5]">{r.note}</p>
    </div>
  );
}
