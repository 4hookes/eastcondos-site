"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { BuyerBio, HdbInputs, TargetInputs, VerdictResult } from "@/lib/safetyMeter";
import { computeVerdict, maxLoan, netCashProceeds } from "@/lib/safetyMeter";
import LastUpdated from "@/components/editorial/LastUpdated";
import { StepRail } from "./components/StepRail";

const SAFETY_METER_LAST_UPDATED = "2026-04-25";
import { BioStep } from "./components/BioStep";
import { HdbStep } from "./components/HdbStep";
import { TargetStep } from "./components/TargetStep";
import { VerdictReveal } from "./components/VerdictReveal";
import { StrategySection } from "./components/StrategySection";

const defaultBuyer1: BuyerBio = {
  name: "",
  age: 35,
  fixedSalary: 0,
  variableAnnual: 0,
  obligations: 0,
  cpfYes: true,
  oaBalance: 0,
};

const defaultHdb: HdbInputs = {
  sellingPrice: 0,
  outstandingLoan: 0,
  cpfUsedBuyer1: 0,
  cpfUsedBuyer2: 0,
};

const defaultTarget: TargetInputs = {
  price: 0,
  voluntaryTopUp: 0,
  earmarked: 0,
  interestRate: 0.015,
};

export default function SafetyMeterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [buyer1, setBuyer1] = useState<BuyerBio>(defaultBuyer1);
  const [buyer2, setBuyer2] = useState<BuyerBio | null>(null);
  const [cashSavings, setCashSavings] = useState(0);
  const [hdb, setHdb] = useState<HdbInputs>(defaultHdb);
  const [target, setTarget] = useState<TargetInputs>(defaultTarget);

  // Verdict state — set after user clicks "Run my Meter"
  const [verdict, setVerdict] = useState<VerdictResult | null>(null);
  const [revealKey, setRevealKey] = useState(0); // forces VerdictReveal to re-animate
  const verdictRef = useRef<HTMLDivElement>(null);

  // Live previews for the wizard (only depend on steps 1+2)
  const bankEligibility = useMemo(() => maxLoan(buyer1, buyer2), [buyer1, buyer2]);
  const cashAfterSale = useMemo(() => netCashProceeds(hdb) + cashSavings, [hdb, cashSavings]);

  const handleRunMeter = () => {
    const result = computeVerdict({ buyer1, buyer2, cashSavings, hdb, target });
    setVerdict(result);
    setRevealKey((k) => k + 1);
    // Scroll after a tick so DOM updates
    setTimeout(() => {
      verdictRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleReRun = () => {
    setVerdict(null);
    setStep(3);
    window.scrollTo({ top: document.body.scrollHeight * 0.3, behavior: "smooth" });
  };

  const handleShare = async () => {
    if (!verdict) return;
    const url = `${window.location.origin}/safety-meter`;
    const text = `I'm a ${verdict.persona.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} on the HDB→Condo Safety Meter (${verdict.score}/100). Run yours:`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "EastCondos Safety Meter", text, url });
        return;
      } catch {
        // fallthrough to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copied to clipboard.");
    } catch {
      // Silent fail
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Lean hero ===== */}
      <section className="border-b border-charcoal text-center px-5 sm:px-10 py-8 sm:py-12">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            HDB → Condo · Safety Meter
          </span>
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
        </div>
        <h1
          className="font-serif text-charcoal mx-auto"
          style={{
            fontSize: "clamp(1.9rem, 5.8vw, 3.2rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            maxWidth: "20ch",
          }}
        >
          Can you <em className="text-amber-deep italic">actually</em> afford the upgrade?
        </h1>
        <p className="font-serif italic text-charcoal text-[15px] sm:text-[18px] leading-snug max-w-[42ch] mx-auto mt-3 mb-5 text-gray-500">
          Bank approval is easy. Surviving the payments is the real test.
        </p>
        <LastUpdated
          date={SAFETY_METER_LAST_UPDATED}
          align="center"
          note="Scoring reflects TDSR, MSR and LTV rules current on this date"
        />
      </section>

      {/* ===== Step rail ===== */}
      <StepRail current={step} onStepClick={(n) => setStep(n as 1 | 2 | 3)} />

      {/* ===== Wizard body ===== */}
      <main className="max-w-broadsheet mx-auto px-4 sm:px-10 py-6 sm:py-10">
        {step === 1 && (
          <BioStep
            buyer1={buyer1}
            buyer2={buyer2}
            cashSavings={cashSavings}
            onBuyer1Change={setBuyer1}
            onBuyer2Change={setBuyer2}
            onCashSavingsChange={setCashSavings}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <HdbStep
            hdb={hdb}
            hasCouple={buyer2 !== null}
            onChange={setHdb}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <TargetStep
            target={target}
            bankEligibility={bankEligibility}
            cashAfterSale={cashAfterSale}
            onChange={setTarget}
            onBack={() => setStep(2)}
            onSubmit={handleRunMeter}
          />
        )}
      </main>

      {/* ===== Verdict ===== */}
      {verdict && (
        <div ref={verdictRef}>
          <VerdictReveal key={revealKey} verdict={verdict} onReRun={handleReRun} onShare={handleShare} />
          <StrategySection
            verdict={verdict}
            buyer1Name={buyer1.name}
            buyer2Name={buyer2?.name}
          />
        </div>
      )}

      {/* ===== Footer CTA band (only shown pre-verdict) ===== */}
      {!verdict && (
        <section className="bg-charcoal text-cream mt-12 py-14 sm:py-20 px-5 sm:px-10 relative" style={{ borderTop: "6px solid #D4A843" }}>
          <div className="max-w-[820px] mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-5 sm:w-7 h-px bg-amber" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">Beyond the meter</span>
            </div>
            <h2 className="font-serif text-[24px] sm:text-[32px] mb-3" style={{ letterSpacing: "-0.02em" }}>
              Want a <em className="text-amber italic">personalised</em> plan?
            </h2>
            <p className="max-w-[48ch] mx-auto text-[15px] sm:text-base mb-6" style={{ color: "rgba(242, 235, 219, 0.75)" }}>
              This meter is a snapshot. The full strategy — timing, pledging options, asset selection — takes a 15-min call.
            </p>
            <Link
              href="/strategy-session"
              className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors"
            >
              Book a Roadmap Call
            </Link>
          </div>
        </section>
      )}

      {/* ===== Footnote ===== */}
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-6 sm:py-8 border-t border-charcoal text-[11px] sm:text-xs text-gray-500 leading-relaxed italic">
        Calculations follow MAS Notice 645 (TDSR 55%), CPF Board Ordinary Account rates by age band, and IRAS Buyer's Stamp Duty tiers. Loan eligibility is stressed at 4% per MAS floor. Default mortgage rate is 1.5% (prevailing). Tenure is capped at 30 years with income-weighted average age for joint applicants. For planning only — actual approval depends on credit history, valuation, and underwriting.{" "}
        <Link href="/disclaimer-hdb-condo-meter-planner" className="underline decoration-amber-deep/40 underline-offset-2 hover:text-charcoal">
          Full disclaimer
        </Link>
        .
      </div>
    </div>
  );
}
