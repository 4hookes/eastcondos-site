interface QuizQuestionProps {
  question: {
    id: number;
    text: string;
    options: { label: string; score: number }[];
  };
  onAnswer: (score: number, label: string) => void;
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif mb-8 leading-tight">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.score, option.label)}
            className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-amber hover:bg-amber/5 transition-all duration-200 active:scale-[0.98] group"
          >
            <span className="text-lg text-charcoal group-hover:text-amber transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
