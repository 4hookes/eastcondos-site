"use client";

const STEPS = [
  { n: 1, label: "Bio" },
  { n: 2, label: "HDB" },
  { n: 3, label: "Verdict" },
];

export function StepRail({ current, onStepClick }: { current: number; onStepClick?: (n: number) => void }) {
  return (
    <div className="flex justify-center gap-0 pt-4">
      {STEPS.map((s, i) => {
        const done = current > s.n;
        const isCurrent = current === s.n;
        return (
          <div key={s.n} className="flex items-center">
            <button
              type="button"
              onClick={() => onStepClick && done && onStepClick(s.n)}
              disabled={!done}
              aria-label={`Step ${s.n}: ${s.label}${done ? ' (done)' : isCurrent ? ' (current)' : ''}`}
              className={`flex items-center gap-2.5 px-3 sm:px-3.5 ${done ? "cursor-pointer" : "cursor-default"}`}
            >
              <span
                className={`w-7 h-7 border border-charcoal flex items-center justify-center font-serif text-[14px] leading-none transition-colors ${
                  done
                    ? "bg-charcoal text-amber"
                    : isCurrent
                      ? "bg-amber text-charcoal border-amber"
                      : "bg-cream text-charcoal"
                }`}
              >
                {done ? "✓" : s.n}
              </span>
              <span
                className={`hidden sm:inline text-[11px] uppercase tracking-[0.2em] ${
                  isCurrent ? "text-charcoal font-medium" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="block w-7 sm:w-10 h-px bg-charcoal/30 mx-1 sm:mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
