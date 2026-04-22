import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a 7-Minute Discovery Call | EastCondos.sg",
  description:
    "Book a short discovery call with Elfi to talk through your property plans. Specialising in private property purchases and HDB-to-private upgrades in Singapore.",
  openGraph: {
    title: "Request a 7-Minute Discovery Call",
    description:
      "Tell me a bit about your property plans. If we're a good fit, I'll WhatsApp you to set up a short call.",
    type: "website",
    url: "https://eastcondos.sg/discovery",
  },
};

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
