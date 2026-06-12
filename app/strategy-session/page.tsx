import type { Metadata } from "next";
import StrategyForm from "@/components/StrategyForm";

export const metadata: Metadata = {
  title: "Strategy Session | EastCondos.sg",
  description:
    "Book your free HDB-to-condo upgrade strategy session. No obligations. No pressure. Just your numbers — reviewed by East Singapore specialist Elfi.",
  openGraph: {
    title: "Strategy Session | EastCondos.sg",
    description:
      "Book your free HDB-to-condo upgrade strategy session. No obligations. No pressure. Just your numbers.",
    type: "website",
    url: "https://eastcondos.sg/strategy-session",
  },
};

const steps = [
  {
    number: "01",
    title: "Share your numbers",
    body: "Three short steps, about five minutes. Rough figures are fine — this is a starting point, not a test.",
  },
  {
    number: "02",
    title: "Elfi reviews them personally",
    body: "Not a calculator output. Elfi sits with your situation and works out what your money can actually do.",
  },
  {
    number: "03",
    title: "You get your plan",
    body: "A personal video walking through your numbers, plus a written summary on WhatsApp. Yours to keep either way.",
  },
];

export default function StrategySessionPage() {
  return (
    <>
      {/* Editorial opener */}
      <section className="bg-cream border-b border-charcoal">
        <div className="max-w-broadsheet mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="issue-line mb-8">The Strategy Session</div>
          <h1 className="headline-section max-w-[16ch] mb-7">
            Before you upgrade,{" "}
            <em className="text-amber-deep">know your numbers</em>.
          </h1>
          <p className="standfirst max-w-[34ch] mb-10">
            No obligations. No pressure. Just your numbers — read properly, by
            someone who does this every day.
          </p>
          <p className="text-[12px] uppercase tracking-[0.22em] text-gray-600">
            Conducted by Elfi Abdullah&ensp;·&ensp;13 years&ensp;·&ensp;500+
            families&ensp;·&ensp;East Singapore
          </p>
        </div>
      </section>

      {/* Form spread */}
      <section className="bg-paper py-16 md:py-24">
        <div className="max-w-broadsheet mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_1.7fr] gap-12 md:gap-20 items-start">
          {/* Marginalia — how it works */}
          <aside className="md:sticky md:top-28">
            <div className="kicker mb-8">How it works</div>
            <ol>
              {steps.map((step, i) => (
                <li
                  key={step.number}
                  className={`py-6 ${
                    i < steps.length - 1
                      ? "border-b border-dotted border-[#c9bfa3]"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl text-charcoal/30 leading-none">
                      {step.number}
                    </span>
                    <div>
                      <h2 className="font-serif text-xl text-charcoal mb-1.5">
                        {step.title}
                      </h2>
                      <p className="text-[15px] leading-relaxed text-body">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 pt-6 border-t border-charcoal text-[12px] uppercase tracking-[0.18em] text-gray-600 leading-loose">
              No fee. No obligation.
              <br />
              Your numbers stay private.
            </p>
          </aside>

          {/* Form in a bordered editorial cell */}
          <div className="border border-charcoal bg-cream p-6 sm:p-10 md:p-12">
            <StrategyForm />
          </div>
        </div>
      </section>
    </>
  );
}
