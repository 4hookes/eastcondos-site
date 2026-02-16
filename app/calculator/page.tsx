import type { Metadata } from "next";
import StrategyForm from "@/components/StrategyForm";

export const metadata: Metadata = {
  title: "Strategy Session – eastcondos.sg",
  description: "Get a personalized HDB to condo upgrade strategy. Free consultation with East Singapore specialist Elfi.",
  openGraph: {
    title: "Strategy Session – eastcondos.sg",
    description: "Get a personalized HDB to condo upgrade strategy.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <div>
      <div className="bg-navy py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Strategy Session</h1>
        <p className="text-gray-300 mt-3 text-lg">Get your personalized upgrade plan</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <StrategyForm />
      </div>
    </div>
  );
}
