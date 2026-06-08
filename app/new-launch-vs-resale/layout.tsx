import type { Metadata } from "next";
import { PLANNER_LAST_UPDATED } from "./meta";

export const metadata: Metadata = {
  title: "New Launch vs Resale — The Real Gap Planner | EastCondos.sg",
  description:
    "A new launch looks more expensive than a resale — until you reset the lease to 99 years and count what you'd actually spend on each over the years you wait. See the real gap, line by line.",
  openGraph: {
    title: "New Launch vs Resale — The Real Gap Planner",
    description:
      "Reset the lease, normalise the space, and count renovation, maintenance, property tax, interest and rent. The headline price gap is rarely the real one.",
    type: "website",
    url: "https://eastcondos.sg/new-launch-vs-resale",
  },
  other: {
    "article:modified_time": PLANNER_LAST_UPDATED,
  },
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
