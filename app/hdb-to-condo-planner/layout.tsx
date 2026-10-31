import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free HDB-to-Condo Planner | EastCondos.sg",
  description:
    "A free Google Sheet for HDB owners. Type in your flat and your pay, and see the cash you keep, the monthly payment on the condo you want, and how long your savings last.",
  alternates: { canonical: "https://eastcondos.sg/hdb-to-condo-planner" },
  openGraph: {
    title: "Free HDB-to-Condo Planner",
    description:
      "See if your HDB flat can really pay for a condo. Free Google Sheet, sent to your WhatsApp.",
    type: "website",
    url: "https://eastcondos.sg/hdb-to-condo-planner",
  },
};

export default function PlannerLandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
