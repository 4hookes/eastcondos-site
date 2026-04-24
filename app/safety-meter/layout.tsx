import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HDB to Condo Safety Meter — Can you actually afford the upgrade? | EastCondos",
  description:
    "A Singapore upgrader affordability test that goes beyond 'bank approved'. Get your 7-tier persona verdict in 3 steps — Strategic Sam, Balanced Bala, House-Poor Harry, and more. Free. No sign-up required for your score.",
  openGraph: {
    title: "HDB to Condo Safety Meter",
    description:
      "Bank approval is easy. Surviving the payments is the real test. Find your upgrader archetype in 60 seconds.",
    type: "website",
    url: "https://eastcondos.sg/safety-meter",
  },
};

export default function SafetyMeterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
