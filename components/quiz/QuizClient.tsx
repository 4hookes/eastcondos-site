"use client";

import { useState } from "react";
import quizData from "@/content/quiz.json";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizScoreReveal from "./QuizScoreReveal";
import QuizLeadGate from "./QuizLeadGate";
import QuizFullReport from "./QuizFullReport";

type QuizStep = "landing" | "question" | "score" | "gate" | "report";

type CategoryKey = "financial" | "lifestyle" | "knowledge";

function calculateScores(answers: Record<number, number>) {
  const categories: Record<CategoryKey, { total: number; count: number }> = {
    financial: { total: 0, count: 0 },
    lifestyle: { total: 0, count: 0 },
    knowledge: { total: 0, count: 0 },
  };

  quizData.questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      const cat = q.category as CategoryKey;
      categories[cat].total += answer;
      categories[cat].count += 1;
    }
  });

  const categoryScores: Record<CategoryKey, number> = {
    financial: categories.financial.count > 0
      ? Math.round((categories.financial.total / (categories.financial.count * 10)) * 100)
      : 0,
    lifestyle: categories.lifestyle.count > 0
      ? Math.round((categories.lifestyle.total / (categories.lifestyle.count * 10)) * 100)
      : 0,
    knowledge: categories.knowledge.count > 0
      ? Math.round((categories.knowledge.total / (categories.knowledge.count * 10)) * 100)
      : 0,
  };

  const weights = quizData.categoryWeights as Record<CategoryKey, number>;
  const totalScore = Math.round(
    categoryScores.financial * weights.financial +
    categoryScores.lifestyle * weights.lifestyle +
    categoryScores.knowledge * weights.knowledge
  );

  return { totalScore, categoryScores };
}

function getTier(score: number) {
  return quizData.tiers.find((t) => score >= t.min && score <= t.max) || quizData.tiers[quizData.tiers.length - 1];
}

function getInsightLevel(score: number): "high" | "mid" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}

function getNextSteps(categoryScores: Record<CategoryKey, number>): string[] {
  const sorted = Object.entries(categoryScores).sort(([, a], [, b]) => a - b);
  const weakest = sorted[0][0] as CategoryKey;

  const stepsMap: Record<CategoryKey, string[]> = {
    financial: [
      "Check your CPF OA balance and calculate your total available funds for the upgrade.",
      "Get an accurate HDB valuation — your equity is likely higher than you think.",
      "Speak to a mortgage specialist to understand your maximum loan and monthly commitment.",
    ],
    lifestyle: [
      "List your family's top 3 must-haves for your next home (space, location, amenities).",
      "Visit 2-3 condo showflats in your target area to get a feel for what's available.",
      "Discuss your upgrade timeline with your family to align on when to make the move.",
    ],
    knowledge: [
      "Check your MOP status — log into My HDBPage to confirm your eligibility date.",
      "Research the buy-first vs sell-first approach and understand the ABSD implications.",
      "Book a free strategy session to get a personalised upgrade roadmap.",
    ],
  };

  return stepsMap[weakest];
}

export default function QuizClient() {
  const [step, setStep] = useState<QuizStep>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => setStep("question");

  const handleAnswer = (score: number) => {
    const questionId = quizData.questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("score");
    }
  };

  const handleLeadSubmit = (contact: { name: string; phone: string }) => {
    // TODO: Wire to GoHighLevel webhook
    console.log("Quiz lead:", contact, "Score:", calculateScores(answers));
    setStep("report");
  };

  const { totalScore, categoryScores } = calculateScores(answers);
  const tier = getTier(totalScore);

  const sortedCategories = Object.entries(categoryScores).sort(([, a], [, b]) => b - a);
  const highestCat = sortedCategories[0][0] as CategoryKey;
  const lowestCat = sortedCategories[sortedCategories.length - 1][0] as CategoryKey;
  const insights = quizData.insights as Record<CategoryKey, Record<string, string>>;
  const teaserInsights = [
    insights[highestCat][getInsightLevel(categoryScores[highestCat])],
    insights[lowestCat][getInsightLevel(categoryScores[lowestCat])],
  ];

  const fullInsights = {
    financial: insights.financial[getInsightLevel(categoryScores.financial)],
    lifestyle: insights.lifestyle[getInsightLevel(categoryScores.lifestyle)],
    knowledge: insights.knowledge[getInsightLevel(categoryScores.knowledge)],
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[60vh]">
      {step === "landing" && (
        <div className="text-center animate-fadeIn">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy font-serif mb-4">
            {quizData.title}
          </h1>
          <p className="text-lg text-body mb-8 max-w-md mx-auto">
            {quizData.subtitle}
          </p>
          <button onClick={handleStart} className="btn-primary text-lg px-8 py-4">
            {quizData.startButton}
          </button>
          <p className="text-xs text-body/50 mt-4">Takes about 2 minutes</p>
        </div>
      )}

      {step === "question" && (
        <>
          <QuizProgress current={currentQuestion} total={quizData.questions.length} />
          <QuizQuestion
            key={currentQuestion}
            question={quizData.questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </>
      )}

      {step === "score" && (
        <QuizScoreReveal
          score={totalScore}
          categoryScores={categoryScores}
          tier={tier}
          teaserInsights={teaserInsights}
          onContinue={() => setStep("gate")}
        />
      )}

      {step === "gate" && (
        <QuizLeadGate
          heading={quizData.report.gateHeading}
          subtext={quizData.report.gateSubtext}
          buttonLabel={quizData.report.gateButton}
          secondaryLabel={quizData.report.gateSecondary}
          onSubmit={handleLeadSubmit}
        />
      )}

      {step === "report" && (
        <QuizFullReport
          score={totalScore}
          tierLabel={tier.label}
          categoryScores={categoryScores}
          insights={fullInsights}
          reportContent={quizData.report}
          nextSteps={getNextSteps(categoryScores)}
        />
      )}
    </div>
  );
}
