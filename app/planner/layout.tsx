import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 5-in-1 Affordability Planner — Free Google Sheet | EastCondos.sg",
  description:
    "A free Google Sheet that works out what your HDB flat leaves you in cash, what condo you can afford, and the real monthly payment after CPF. Watch the walkthrough, then get your own copy.",
  openGraph: {
    title: "The 5-in-1 Affordability Planner — Free Google Sheet",
    description:
      "See what your HDB flat leaves you in cash, and the real monthly on the condo you want. Free sheet, no sales talk.",
    type: "website",
    url: "https://eastcondos.sg/planner",
  },
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
