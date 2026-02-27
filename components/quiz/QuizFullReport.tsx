import { CheckCircle } from "lucide-react";

interface CategoryScores {
  financial: number;
  lifestyle: number;
  knowledge: number;
}

interface QuizFullReportProps {
  score: number;
  tierLabel: string;
  categoryScores: CategoryScores;
  insights: {
    financial: string;
    lifestyle: string;
    knowledge: string;
  };
  reportContent: {
    reportHeading: string;
    nextStepsHeading: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  nextSteps: string[];
}

export default function QuizFullReport({
  score,
  tierLabel,
  categoryScores,
  insights,
  reportContent,
  nextSteps,
}: QuizFullReportProps) {
  const categories = [
    { label: "Financial Readiness", value: categoryScores.financial, insight: insights.financial },
    { label: "Lifestyle Readiness", value: categoryScores.lifestyle, insight: insights.lifestyle },
    { label: "Knowledge Readiness", value: categoryScores.knowledge, insight: insights.knowledge },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-2">
          {reportContent.reportHeading}
        </h2>
        <p className="text-body">
          Your score: <span className="font-bold text-gold text-xl">{score}/100</span> — {tierLabel}
        </p>
      </div>

      {/* Category Breakdowns */}
      <div className="space-y-6 mb-12">
        {categories.map((cat) => (
          <div key={cat.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy">{cat.label}</h3>
              <span className="text-lg font-bold text-gold">{cat.value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${cat.value}%` }}
              />
            </div>
            <p className="text-body text-sm leading-relaxed">{cat.insight}</p>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="bg-sage-light rounded-xl p-6 md:p-8 mb-12">
        <h3 className="text-xl font-bold text-navy font-serif mb-4">
          {reportContent.nextStepsHeading}
        </h3>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-body">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-sage-dark rounded-xl p-8 md:p-12">
        <h3 className="text-2xl font-bold text-white font-serif mb-3">
          {reportContent.ctaHeading}
        </h3>
        <p className="text-gray-300 mb-6">{reportContent.ctaText}</p>
        <a href="/calculator" className="btn-primary text-lg">
          {reportContent.ctaButton}
        </a>
      </div>
    </div>
  );
}
