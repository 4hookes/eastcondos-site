"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export default function QuizBanner() {
  return (
    <SectionWrapper background="charcoal-gradient" id="quiz-banner" className="grain">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-white leading-tight tracking-[-0.02em]">
          Think you&apos;re ready to upgrade?
        </h2>
        <p className="text-lg text-white/70 mt-4 leading-relaxed">
          Take our 2-minute Upgrade Readiness Quiz. Get a personalized score
          across financial, lifestyle, and knowledge readiness.
        </p>
        <div className="mt-8">
          <a href="/quiz">
            <Button variant="default" size="lg">
              Take the Quiz
            </Button>
          </a>
        </div>
        <p className="text-sm text-white/50 mt-4">
          Free. No email required to start.
        </p>
      </div>
    </SectionWrapper>
  );
}

/*
 * Usage:
 * import QuizBanner from "@/components/QuizBanner";
 * <QuizBanner />
 */
