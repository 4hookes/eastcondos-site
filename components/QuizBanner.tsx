"use client";

import { useInView } from "@/hooks/useInView";
import { Sparkles } from "lucide-react";

export default function QuizBanner() {
  const { ref, isVisible } = useInView();

  return (
    <section className="bg-gold py-12 md:py-16" ref={ref}>
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <Sparkles className="w-8 h-8 text-white mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-3">
          Think you&apos;re ready to upgrade?
        </h2>
        <p className="text-white/80 text-lg mb-6">
          Take the 2-minute quiz and find out your Upgrade Readiness Score.
        </p>
        <a
          href="/quiz"
          className="inline-flex items-center justify-center h-14 px-8 text-base font-semibold rounded-lg bg-white text-gold hover:bg-cream shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          Take the Quiz
        </a>
      </div>
    </section>
  );
}
