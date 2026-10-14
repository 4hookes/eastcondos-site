import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a 7-Minute Fit-Check | EastCondos.sg",
  description:
    "Tell Elfi your budget and what your family needs. In 7 minutes he tells you which 3 East side condos pass his test, and which to skip.",
  openGraph: {
    title: "Book a 7-Minute Fit-Check",
    description:
      "Tell me a bit about your property plans. If we're a good fit, I'll WhatsApp you to set up a short call.",
    type: "website",
    url: "https://eastcondos.sg/discovery",
  },
};

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
