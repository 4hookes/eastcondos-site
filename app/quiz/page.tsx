import type { Metadata } from "next";
import QuizClient from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "Upgrade Readiness Quiz – eastcondos.sg",
  description:
    "Take the 2-minute quiz to find out your HDB-to-condo upgrade readiness score. Get a personalized report with actionable next steps.",
  openGraph: {
    title: "What's Your Upgrade Readiness Score?",
    description:
      "Take the 2-minute quiz to find out if you're ready to upgrade from HDB to condo.",
    type: "website",
    url: "https://eastcondos.sg/quiz",
  },
};

export default function QuizPage() {
  return (
    <section className="bg-cream min-h-screen">
      <QuizClient />
    </section>
  );
}
