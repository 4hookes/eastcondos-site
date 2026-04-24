"use client";

import { useCallback, useMemo } from "react";
import type { HdbInputs } from "@/lib/safetyMeter";
import { netCashProceeds } from "@/lib/safetyMeter";
import { fmt } from "@/lib/format";
import styles from "../safety-meter.module.css";

type Props = {
  hdb: HdbInputs;
  hasCouple: boolean;
  onChange: (h: HdbInputs) => void;
  onBack: () => void;
  onNext: () => void;
};

export function HdbStep({ hdb, hasCouple, onChange, onBack, onNext }: Props) {
  const num = useCallback((s: string) => {
    const cleaned = s.replace(/,/g, "");
    return parseFloat(cleaned) || 0;
  }, []);

  const netProceeds = useMemo(() => netCashProceeds(hdb), [hdb]);
  const canContinue = hdb.sellingPrice > 0;

  return (
    <div className="bg-paper border border-charcoal p-5 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-amber-deep" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-amber-deep">Step 02 · Your HDB</span>
        </div>
        <h2 className="font-serif text-[24px] sm:text-[28px] text-charcoal leading-tight" style={{ letterSpacing: "-0.02em" }}>
          What will you walk away with?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Estimated selling price</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={hdb.sellingPrice || ""}
              min={0}
              step={10000}
              onChange={(e) => onChange({ ...hdb, sellingPrice: num(e.target.value) })}
            />
          </div>
          <span className="block text-[11px] text-gray-500 mt-1 font-serif italic">Be conservative. Market comps recommended.</span>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">Outstanding HDB/bank loan</label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={hdb.outstandingLoan || ""}
              min={0}
              step={5000}
              onChange={(e) => onChange({ ...hdb, outstandingLoan: num(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
            CPF used by Buyer 1
          </label>
          <div className={styles.numberInput} data-prefix="S$">
            <input
              type="number"
              value={hdb.cpfUsedBuyer1 || ""}
              min={0}
              step={5000}
              onChange={(e) => onChange({ ...hdb, cpfUsedBuyer1: num(e.target.value) })}
            />
          </div>
          <span className="block text-[11px] text-gray-500 mt-1 font-serif italic">Refunded back to CPF on sale.</span>
        </div>

        {hasCouple && (
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-2">
              CPF used by Buyer 2
            </label>
            <div className={styles.numberInput} data-prefix="S$">
              <input
                type="number"
                value={hdb.cpfUsedBuyer2 || ""}
                min={0}
                step={5000}
                onChange={(e) => onChange({ ...hdb, cpfUsedBuyer2: num(e.target.value) })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Live net cash proceeds preview */}
      <div className="mt-6 border border-charcoal bg-charcoal text-cream grid grid-cols-2">
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber mb-1">Estimated agency fees</div>
          <div className="font-serif text-[22px]">{fmt(hdb.sellingPrice * 0.02 * 1.09)}</div>
          <div className="text-[11px] text-cream/60 mt-1 italic font-serif">2% + 9% GST</div>
        </div>
        <div className="p-4 border-l border-amber/30">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber mb-1">Net cash proceeds</div>
          <div className="font-serif text-[22px] text-amber">{fmt(netProceeds)}</div>
          <div className="text-[11px] text-cream/60 mt-1 italic font-serif">After CPF refund &amp; fees</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 gap-3">
        <button type="button" onClick={onBack} className="text-[11px] uppercase tracking-[0.22em] text-gray-500 hover:text-charcoal transition-colors">
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="bg-charcoal text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.22em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors disabled:opacity-40 inline-flex items-center gap-2.5"
        >
          Next · Target
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
