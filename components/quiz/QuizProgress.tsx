interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-body/60 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
