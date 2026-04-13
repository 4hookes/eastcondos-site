"use client";

import { useEffect, useState } from "react";

interface CategoryScores {
  financial: number;
  lifestyle: number;
  knowledge: number;
}

interface Tier {
  label: string;
  summary: string;
  color: string;
}

interface QuizScoreRevealProps {
  score: number;
  categoryScores: CategoryScores;
  tier: Tier;
  teaserInsights: string[];
  onContinue: () => void;
}

const colorMap: Record<string, string> = {
  gold: "text-amber",
  amber: "text-amber",
  sage: "text-gray-600",
  blue: "text-blue-600",
  navy: "text-charcoal",
  charcoal: "text-charcoal",
};

const bgColorMap: Record<string, string> = {
  gold: "bg-amber",
  amber: "bg-amber",
  sage: "bg-gray-500",
  blue: "bg-blue-600",
  navy: "bg-charcoal",
  charcoal: "bg-charcoal",
};

export default function QuizScoreReveal({
  score,
  categoryScores,
  tier,
  teaserInsights,
  onContinue,
}: QuizScoreRevealProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(score / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setDisplayScore(current);
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  const categories = [
    { label: "Financial", value: categoryScores.financial },
    { label: "Lifestyle", value: categoryScores.lifestyle },
    { label: "Knowledge", value: categoryScores.knowledge },
  ];

  return (
    <div className="text-center animate-fadeIn">
      {/* Score */}
      <div className="mb-6">
        <div className={`text-7xl md:text-8xl font-bold font-serif ${colorMap[tier.color] || "text-charcoal"}`}>
          {displayScore}
        </div>
        <div className="text-lg text-body/60 mt-1">out of 100</div>
      </div>

      {/* Tier Label */}
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif mb-3">
        {tier.label}
      </h2>
      <p className="text-body text-lg mb-8 max-w-md mx-auto">{tier.summary}</p>

      {/* Category Bars */}
      <div className="max-w-sm mx-auto mb-8 space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-charcoal">{cat.label}</span>
              <span className="text-body/60">{cat.value}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${bgColorMap[tier.color] || "bg-charcoal"}`}
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Teaser Insights */}
      <div className="bg-offwhite rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
        <h3 className="font-semibold text-charcoal mb-3 text-sm uppercase tracking-wider">Key Insights</h3>
        {teaserInsights.map((insight, i) => (
          <p key={i} className="text-body text-sm mb-2 last:mb-0">
            {insight}
          </p>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="btn-primary text-lg px-8 py-4"
      >
        Unlock Your Full Report
      </button>
    </div>
  );
}
