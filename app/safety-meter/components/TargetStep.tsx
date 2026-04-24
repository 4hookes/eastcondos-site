"use client";

import { useCallback, useMemo } from "react";
import type { TargetInputs } from "@/lib/safetyMeter";
import { fmt, fmtShort } from "@/lib/format";
import styles from "../safety-meter.module.css";

type Props = {
  target: TargetInputs;
  bankEligibility: number;
  cashAfterSale: number;
  onChange: (t: TargetInputs) => void;
  onBack: () => void;
  onSubmit: () => void;
};

const TOP_UP_CHIPS: number[] = [0, 500, 1000, 2000, 3000];
const EARMARKED_CHIPS: number[] = [0, 30000, 50000, 80000, 120000, 200000];

function ChipRow({ value, options, onChange, formatter }: { value: number; options: number[]; onChange: (n: number) => void; formatter: (n: number) => string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`${styles.chip} ${value === opt ? styles.active : ""}`}
        >
          {opt === 0 ? "None" : formatter(opt)}
        </button>
      ))}
    </div>
  );
}

export function TargetStep({ target, bankEligibility, cashAfterSale, onChange, onBack, onSubmit }: Props) {
  const num = useCallback((s: string) => {
    const cleaned = s.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  }, []);

  const priceDisplay = useMemo(() => {
    if (!target.price) return "";
    return target.price.toLocaleString("en-SG");
  }, [target.price]);

  const canSubmit = target.price > 0;

  return (
    <div className="bg-paper border border-charcoal p-5 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-amber-deep" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-amber-deep">Step 03 · The target</span>
        </div>
        <h2 className="font-serif text-[24px] sm:text-[28px] text-charcoal leading-tight" style={{ letterSpacing: "-0.02em" }}>
          Type in your target price.
        </h2>
      </div>

      {/* Price input (typed, large) */}
      <div className="mb-7">
        <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2.5">Target property price</label>
        <div className={styles.priceInput}>
          <input
            type="text"
            inputMode="numeric"
            value={priceDisplay}
            placeholder="0"
            onChange={(e) => onChange({ ...target, price: num(e.target.value) })}
          />
        </div>
        <p className="font-serif italic text-[12px] text-gray-500 mt-2">The condo you're eyeing, or your ballpark budget.</p>
      </div>

      {/* Voluntary monthly top-up */}
      <div className="mb-7 pt-6 border-t border-dotted border-[#c9bfa3]">
        <div className="flex items-baseline justify-between mb-2.5 gap-2">
          <label className="text-[10px] uppercase tracking-[0.22em] text-amber-deep">Voluntary monthly top-up</label>
          <span className="font-serif text-[18px] text-charcoal" style={{ letterSpacing: "-0.01em" }}>
            {target.voluntaryTopUp === 0 ? "None" : fmt(target.voluntaryTopUp) + "/mo"}
          </span>
        </div>
        <ChipRow
          value={target.voluntaryTopUp}
          options={TOP_UP_CHIPS}
          onChange={(n) => onChange({ ...target, voluntaryTopUp: n })}
          formatter={(n) => "S$" + (n >= 1000 ? (n / 1000) + "K" : n)}
        />
      </div>

      {/* Earmarked */}
      <div className="mb-7 pt-6 border-t border-dotted border-[#c9bfa3]">
        <div className="flex items-baseline justify-between mb-2.5 gap-2">
          <label className="text-[10px] uppercase tracking-[0.22em] text-amber-deep">Set aside for reno &amp; savings</label>
          <span className="font-serif text-[18px] text-charcoal" style={{ letterSpacing: "-0.01em" }}>
            {target.earmarked === 0 ? "None" : fmtShort(target.earmarked)}
          </span>
        </div>
        <ChipRow
          value={target.earmarked}
          options={EARMARKED_CHIPS}
          onChange={(n) => onChange({ ...target, earmarked: n })}
          formatter={(n) => "S$" + (n >= 1000 ? (n / 1000) + "K" : n)}
        />
      </div>

      {/* Rate slider */}
      <div className="mb-6 pt-6 border-t border-dotted border-[#c9bfa3]">
        <div className="flex items-baseline justify-between mb-4">
          <label className="text-[10px] uppercase tracking-[0.22em] text-amber-deep">Mortgage rate</label>
          <span className="font-serif text-[18px] text-charcoal" style={{ letterSpacing: "-0.01em" }}>
            {(target.interestRate * 100).toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          className={styles.range}
          min={0.01}
          max={0.04}
          step={0.001}
          value={target.interestRate}
          aria-label="Mortgage rate"
          onChange={(e) => onChange({ ...target, interestRate: parseFloat(e.target.value) })}
        />
      </div>

      {/* Live context strip */}
      <div className="grid grid-cols-2 border border-charcoal bg-charcoal text-cream mt-6">
        <div className="p-3.5 sm:p-4 border-r border-amber/25">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber mb-0.5">Your ceiling</div>
          <div className="font-serif text-[20px] sm:text-[22px]">{fmtShort(Math.round(bankEligibility / 0.75 / 10000) * 10000)}</div>
        </div>
        <div className="p-3.5 sm:p-4">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber mb-0.5">Cash after sale</div>
          <div className="font-serif text-[20px] sm:text-[22px]">{fmt(cashAfterSale)}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 gap-3">
        <button type="button" onClick={onBack} className="text-[11px] uppercase tracking-[0.22em] text-gray-500 hover:text-charcoal">
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="bg-charcoal text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.22em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors disabled:opacity-40 inline-flex items-center gap-2.5"
        >
          Run my Meter
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
