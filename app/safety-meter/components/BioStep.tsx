"use client";

import type { BuyerBio } from "@/lib/safetyMeter";
import styles from "../safety-meter.module.css";

type Props = {
  buyer1: BuyerBio;
  buyer2: BuyerBio | null;
  cashSavings: number;
  onBuyer1Change: (b: BuyerBio) => void;
  onBuyer2Change: (b: BuyerBio | null) => void;
  onCashSavingsChange: (n: number) => void;
  onNext: () => void;
};

const parseNum = (s: string) => {
  const cleaned = s.replace(/,/g, "");
  return parseFloat(cleaned) || 0;
};

// Hoisted to module scope so React doesn't unmount + remount on every keystroke.
function BuyerFields({
  buyer,
  onChange,
  label,
  kicker,
}: {
  buyer: BuyerBio;
  onChange: (b: BuyerBio) => void;
  label: string;
  kicker: string;
}) {
  return (
    <div className="border border-charcoal bg-cream p-5 sm:p-6">
      <div className="text-[10px] uppercase tracking-[0.24em] text-amber-deep mb-3">{kicker}</div>
      <div className="font-serif text-[20px] text-charcoal mb-4" style={{ letterSpacing: "-0.02em" }}>
        {label}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Name</label>
          <div className={`${styles.numberInput} ${styles.noPrefix}`}>
            <input
              type="text"
              value={buyer.name}
              placeholder="First name"
              autoComplete="given-name"
              onChange={(e) => onChange({ ...buyer, name: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Age</label>
          <div className={`${styles.numberInput} ${styles.noPrefix}`}>
            <input
              type="number"
              value={buyer.age || ""}
              min={21}
              max={70}
              onChange={(e) => onChange({ ...buyer, age: parseNum(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Fixed monthly salary</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={buyer.fixedSalary || ""}
              min={0}
              step={500}
              onChange={(e) => onChange({ ...buyer, fixedSalary: parseNum(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Annual bonus (variable)</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={buyer.variableAnnual || ""}
              min={0}
              step={1000}
              onChange={(e) => onChange({ ...buyer, variableAnnual: parseNum(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Monthly obligations</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={buyer.obligations || ""}
              min={0}
              step={100}
              onChange={(e) => onChange({ ...buyer, obligations: parseNum(e.target.value) })}
            />
          </div>
          <span className="block text-[11px] text-gray-500 mt-1 font-serif italic">
            Car loans, credit card minimums, etc.
          </span>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">CPF OA balance</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={buyer.oaBalance || ""}
              min={0}
              step={1000}
              onChange={(e) => onChange({ ...buyer, oaBalance: parseNum(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-dotted border-[#c9bfa3] flex items-center justify-between">
        <div>
          <div className="text-[13px] text-charcoal">Actively contributing to CPF?</div>
          <div className="text-[11px] text-gray-500">Salaried employment with CPF deductions</div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={buyer.cpfYes}
          className={`${styles.toggleSwitch} ${buyer.cpfYes ? styles.toggleSwitchOn : ""}`}
          onClick={() => onChange({ ...buyer, cpfYes: !buyer.cpfYes })}
        />
      </div>
    </div>
  );
}

export function BioStep({
  buyer1,
  buyer2,
  cashSavings,
  onBuyer1Change,
  onBuyer2Change,
  onCashSavingsChange,
  onNext,
}: Props) {
  const hasCouple = buyer2 !== null;
  const canContinue = buyer1.fixedSalary > 0 && buyer1.age >= 21;

  return (
    <div className="bg-paper border border-charcoal p-5 sm:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-6 h-px bg-amber-deep" />
            <span className="text-[10px] uppercase tracking-[0.26em] text-amber-deep">Step 01 · Who&rsquo;s buying</span>
          </div>
          <h2 className="font-serif text-[24px] sm:text-[28px] text-charcoal leading-tight" style={{ letterSpacing: "-0.02em" }}>
            Tell us about yourself.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[13px] text-charcoal">Applying with a spouse?</div>
          <button
            type="button"
            role="switch"
            aria-checked={hasCouple}
            className={`${styles.toggleSwitch} ${hasCouple ? styles.toggleSwitchOn : ""}`}
            onClick={() => {
              if (hasCouple) onBuyer2Change(null);
              else
                onBuyer2Change({
                  name: "",
                  age: 35,
                  fixedSalary: 0,
                  variableAnnual: 0,
                  obligations: 0,
                  cpfYes: true,
                  oaBalance: 0,
                });
            }}
          />
        </div>
      </div>

      <div className="space-y-5">
        <BuyerFields buyer={buyer1} onChange={onBuyer1Change} label="Buyer 1" kicker="Owner 01" />
        {hasCouple && buyer2 && (
          <BuyerFields buyer={buyer2} onChange={(b) => onBuyer2Change(b)} label="Buyer 2" kicker="Owner 02" />
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-dotted border-[#c9bfa3]">
        <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Shared cash savings</label>
        <div className={`${styles.numberInput} max-w-xs`} data-prefix="S$">
          <input
            type="number"
            value={cashSavings || ""}
            min={0}
            step={5000}
            onChange={(e) => onCashSavingsChange(parseNum(e.target.value))}
          />
        </div>
        <span className="block text-[11px] text-gray-500 mt-1 font-serif italic">
          Liquid cash you&rsquo;ll add toward the purchase.
        </span>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="bg-charcoal text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.22em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2.5"
        >
          Next &middot; HDB sale
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
