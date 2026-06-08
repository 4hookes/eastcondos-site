import type { Metadata } from "next";
import { PPC_LAST_UPDATED } from "./meta";

export const metadata: Metadata = {
  title: "Progressive Payment Calculator (New Launch) | EastCondos.sg",
  description:
    "See exactly what you pay and when on a Singapore new launch — the full 10-stage Normal Payment Scheme, your monthly instalment ramp, BSD/ABSD, and how much interest you save while construction goes up.",
  openGraph: {
    title: "Progressive Payment Calculator — New Launch (Singapore)",
    description:
      "10-stage Normal Payment Scheme, cash/CPF outlay, loan disbursement, monthly instalment ramp, and BSD/ABSD — all in one view.",
    type: "website",
    url: "https://eastcondos.sg/progressive-payment-calculator",
  },
  other: {
    "article:modified_time": PPC_LAST_UPDATED,
  },
};

export default function PpcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
