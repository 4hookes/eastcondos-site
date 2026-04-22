import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator — How Much Can You Borrow? | EastCondos.sg",
  description:
    "Free Singapore loan calculator. See your maximum loan for private property, HDB with HDB loan, and HDB with bank loan in one view. Adjust tenure and rate to fit your situation.",
  openGraph: {
    title: "Loan Eligibility Calculator — How Much Can You Borrow?",
    description:
      "Free Singapore loan calculator. Three answers, one calculation — your max loan for private property, HDB loan, and HDB bank loan.",
    type: "website",
    url: "https://eastcondos.sg/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
