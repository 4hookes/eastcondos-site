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

export default function StrategySessionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-20 text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-white leading-tight mb-4">
            Book Your Strategy Session
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            No obligations. No pressure. Just your numbers.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-offwhite py-16">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <StrategyForm />
        </div>
      </section>
    </>
  );
}
