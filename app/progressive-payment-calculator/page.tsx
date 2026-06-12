"use client";

import { useState, useMemo, useCallback } from "react";
import SpotGraphic from "@/components/SpotGraphic";
import Link from "next/link";
import styles from "./calc.module.css";
import LastUpdated from "@/components/editorial/LastUpdated";
import { PPC_LAST_UPDATED } from "./meta";
import EcIcon from "@/components/EcIcon";
import {
  compute,
  DEFAULT_PPC_INPUTS,
  BUYER_PROFILE_LABELS,
  type PpcInputs,
  type BuyerProfile,
} from "@/lib/progressivePayment";

const BUYER_OPTIONS: BuyerProfile[] = [
  "sc-1st",
  "sc-2nd",
  "sc-3rd+",
  "pr-1st",
  "pr-2nd+",
  "foreigner",
];

const fmt = (n: number) => {
  if (!isFinite(n) || isNaN(n)) return "S$0";
  const r = Math.round(n);
  return (r < 0 ? "-S$" : "S$") + Math.abs(r).toLocaleString("en-SG");
};
const fmtShort = (n: number) => {
  if (!isFinite(n) || isNaN(n)) return "S$0";
  const a = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (a >= 1_000_000) return `${sign}S$${(a / 1_000_000).toFixed(2)}M`;
  if (a >= 1_000) return `${sign}S$${Math.round(a / 1_000)}K`;
  return `${sign}S$${Math.round(a)}`;
};
const fmtInt = (n: number) => (n || 0).toLocaleString("en-SG");
const parseDigits = (s: string) => {
  const d = s.replace(/[^\d]/g, "");
  return d ? parseInt(d, 10) : 0;
};

export default function ProgressivePaymentCalculatorPage() {
  const [inputs, setInputs] = useState<PpcInputs>(DEFAULT_PPC_INPUTS);
  const upd = useCallback(
    (patch: Partial<PpcInputs>) => setInputs((p) => ({ ...p, ...patch })),
    [],
  );
  const r = useMemo(() => compute(inputs), [inputs]);

  return (
    <div className="bg-charcoal-deep min-h-screen">
      {/* ===== Opener ===== */}
      <section className="relative gridlines border-b hairline px-6 md:px-12 pt-16 md:pt-20 pb-12 overflow-hidden">
        <SpotGraphic
          name="spot-numbers"
          variant="light"
          className="hidden md:block absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-[36%] max-w-[420px] opacity-25 pointer-events-none"
        />
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-7">Tools / New Launch · Progressive Payment</div>
          <h1 className="display-hero !text-[clamp(2.4rem,5.5vw,4.6rem)] max-w-[20ch]">
            See exactly what you pay, <em>and when.</em>
          </h1>
          <p className="annot mt-8 max-w-[48ch]">
            The full 10-stage Normal Payment Scheme. Your cash + CPF outlay, when the loan disburses,
            and how your monthly instalment ramps up — from booking fee to keys.
          </p>
          <div className="mt-7">
            <LastUpdated
              date={PPC_LAST_UPDATED}
              tone="onDark"
              note="Uses the standard URA Normal Payment Scheme"
            />
          </div>
        </div>
      </section>

      <main className="surface-light gridlines-light px-4 sm:px-10 py-8 sm:py-12">
       <div className="max-w-broadsheet mx-auto">
        {/* ===== Disclaimer ===== */}
        <div className="flex gap-3 items-start bg-paper border border-charcoal p-3.5 sm:p-4 mb-6 sm:mb-8" style={{ borderLeft: "3px solid #D4A843" }}>
          <span className={styles.caveatIcon}>i</span>
          <p className="text-[12.5px] sm:text-[13.5px] text-body leading-snug">
            <span className="font-medium text-charcoal">A guide, not a quote.</span> Banks may vary the
            disbursement and interest treatment slightly. Use this to plan your cash flow — then check
            the exact figures with a banker and your consultant before you commit.
          </p>
        </div>

        {/* ===== Inputs ===== */}
        <div className="bg-offwhite border border-charcoal shadow-premium p-5 sm:p-8">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-amber-deep mb-2">Your numbers</div>
          <h2 className="font-serif text-charcoal leading-tight mb-5 sm:mb-6" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)", letterSpacing: "-0.02em" }}>
            The new launch you&apos;re looking at
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            <Field label="Purchase price" prefix="S$" value={inputs.price} step={50000} onChange={(v) => upd({ price: v })} />
            <div>
              <FieldLabel>Buyer profile (sets ABSD)</FieldLabel>
              <select
                className={styles.select}
                value={inputs.buyer}
                onChange={(e) => upd({ buyer: e.target.value as BuyerProfile })}
              >
                {BUYER_OPTIONS.map((b) => (
                  <option key={b} value={b}>{BUYER_PROFILE_LABELS[b]}</option>
                ))}
              </select>
            </div>
            <Slider label="Loan-to-value" display={`${inputs.ltvPct}%`} min={55} max={75} step={5} value={inputs.ltvPct} onChange={(v) => upd({ ltvPct: v })} />
            <Slider label="Loan tenure" display={`${inputs.termYears} yrs`} min={10} max={30} step={1} value={inputs.termYears} onChange={(v) => upd({ termYears: v })} />
            <Slider label="Mortgage rate" display={`${inputs.ratePct.toFixed(1)}%`} min={1} max={4} step={0.1} value={inputs.ratePct} onChange={(v) => upd({ ratePct: v })} />
            <Slider label="Years to TOP" display={`${inputs.yearsToTop} yrs`} min={2} max={5} step={1} value={inputs.yearsToTop} onChange={(v) => upd({ yearsToTop: v })} />
          </div>
        </div>

        {/* ===== Summary cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-6 sm:mt-8">
          <SummaryCard
            label="Total cash + CPF you need"
            value={fmt(r.totalBuyerCashCpf)}
            sub={`${fmtShort(r.downpayment)} downpayment + ${fmtShort(r.stamps)} stamp duty`}
            featured
          />
          <SummaryCard
            label="Peak monthly instalment"
            value={fmt(r.peakMonthlyInstalment)}
            sub={`Full P&I on ${fmtShort(r.loan)} loan — only after the building is fully drawn`}
          />
          <SummaryCard
            label="Interest you DON'T pay"
            value={fmt(r.constructionInterestPaid)}
            sub={`Roughly what you save vs a fully-drawn loan during the ${inputs.yearsToTop}-yr build`}
          />
        </div>

        {/* ===== The schedule ===== */}
        <div className="mt-10 sm:mt-14">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-amber-deep mb-2">The schedule</div>
          <h2 className="font-serif text-charcoal leading-tight mb-2" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)", letterSpacing: "-0.02em" }}>
            10 stages, from booking fee to keys
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[64ch] mb-5">
            You pay the first 5% in cash on the day you book. The next 15% (with CPF) when you sign
            the S&amp;P. The bank disburses the rest of the loan stage by stage as construction
            progresses. <span className="text-amber-deep">Swipe the table on mobile →</span>
          </p>

          <div className="border border-charcoal bg-offwhite overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-charcoal text-cream text-[10px] sm:text-[11px] uppercase tracking-[0.14em]">
                <tr>
                  <th className="px-2.5 sm:px-4 py-3 text-center w-[36px]">#</th>
                  <th className="px-2.5 sm:px-4 py-3">Stage</th>
                  <th className="px-2.5 sm:px-4 py-3 text-right">% of price</th>
                  <th className="px-2.5 sm:px-4 py-3 text-right">Total at stage</th>
                  <th className="px-2.5 sm:px-4 py-3 text-right bg-amber text-charcoal">Cash + CPF</th>
                  <th className="px-2.5 sm:px-4 py-3 text-right">Loan disbursed</th>
                  <th className="px-2.5 sm:px-4 py-3 text-right">Monthly interest from here</th>
                </tr>
              </thead>
              <tbody>
                {r.schedule.map((s, i) => {
                  const isTop = s.key === "top";
                  const isCsc = s.key === "csc";
                  const shaded = i % 2 === 1;
                  const milestoneClass = isTop ? "bg-amber/15" : isCsc ? "bg-charcoal text-cream" : shaded ? "bg-cream/50" : "bg-offwhite";
                  return (
                    <tr key={s.key} className={`border-t border-charcoal/15 ${milestoneClass} align-top`}>
                      <td className="px-2.5 sm:px-4 py-3 text-center font-sans tabular-nums font-semibold text-[12px] sm:text-[14px]">{s.no}</td>
                      <td className="px-2.5 sm:px-4 py-3">
                        <div className="text-[12.5px] sm:text-[14px] leading-snug font-medium">{s.label}</div>
                        <div className={`text-[10.5px] sm:text-[11px] mt-0.5 ${isCsc ? "text-cream/65" : "text-gray-500"}`}>
                          {s.cashOnly && <span className="uppercase tracking-[0.1em] text-amber-deep mr-2">Cash only</span>}
                          ~month {s.monthRough}
                        </div>
                      </td>
                      <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums text-[12.5px] sm:text-[14px]">
                        {s.pctOfPrice}%
                        <div className={`text-[10.5px] sm:text-[11px] ${isCsc ? "text-cream/60" : "text-gray-400"}`}>cum {s.pctCumulative}%</div>
                      </td>
                      <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums text-[12.5px] sm:text-[14px]">{fmt(s.totalAtStage)}</td>
                      <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums font-semibold text-[12.5px] sm:text-[14px]">
                        {s.buyerOutlay > 0 ? fmt(s.buyerOutlay) : <span className={isCsc ? "text-cream/30" : "text-charcoal/25"}>—</span>}
                      </td>
                      <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums text-[12.5px] sm:text-[14px]">
                        {s.loanDisbursed > 0 ? fmt(s.loanDisbursed) : <span className={isCsc ? "text-cream/30" : "text-charcoal/25"}>—</span>}
                        {s.cumulativeLoan > 0 && (
                          <div className={`text-[10.5px] sm:text-[11px] ${isCsc ? "text-cream/60" : "text-gray-400"}`}>cum {fmtShort(s.cumulativeLoan)}</div>
                        )}
                      </td>
                      <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums text-[12.5px] sm:text-[14px]">
                        {fmt(s.monthlyInterest)}
                      </td>
                    </tr>
                  );
                })}
                {/* Stamp duty note row */}
                <tr className="border-t-2 border-charcoal bg-paper">
                  <td className="px-2.5 sm:px-4 py-3 text-center text-charcoal/40">+</td>
                  <td className="px-2.5 sm:px-4 py-3">
                    <div className="text-[12.5px] sm:text-[14px] font-medium">Stamp duty (BSD + ABSD)</div>
                    <div className="text-[10.5px] sm:text-[11px] text-gray-500 mt-0.5">Payable within 14 days of S&amp;P (essentially with stage 2).</div>
                  </td>
                  <td className="px-2.5 sm:px-4 py-3 text-right" />
                  <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums text-[12.5px] sm:text-[14px]">{fmt(r.stamps)}</td>
                  <td className="px-2.5 sm:px-4 py-3 text-right font-sans tabular-nums font-semibold text-[12.5px] sm:text-[14px]">{fmt(r.stamps)}</td>
                  <td className="px-2.5 sm:px-4 py-3 text-right text-charcoal/25">—</td>
                  <td className="px-2.5 sm:px-4 py-3 text-right text-charcoal/25">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Stamp duty breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mt-4">
            <MiniRow label="Buyer's Stamp Duty (BSD)" value={fmt(r.bsd)} sub="Progressive on the price — paid by every buyer." />
            <MiniRow
              label={r.absd === 0 ? "ABSD" : `Additional Buyer's Stamp Duty (ABSD)`}
              value={r.absd === 0 ? "S$0 — first SG property" : fmt(r.absd)}
              sub={r.absd === 0 ? "No ABSD on your first Singapore home." : BUYER_PROFILE_LABELS[inputs.buyer]}
            />
          </div>
        </div>

        {/* ===== The insight ===== */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 sm:gap-7 items-start bg-charcoal text-cream p-6 sm:p-9 border border-charcoal">
          <EcIcon name="growth-staircase" variant="light" size={64} className="shrink-0" />
          <div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-amber mb-2">Why this matters</div>
            <h3 className="font-serif text-[20px] sm:text-[26px] leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
              Your mortgage barely bites until the building is up.
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(242,235,219,0.82)" }}>
              Notice the &ldquo;Monthly interest from here&rdquo; column. In the first year or two,
              you might be paying just{" "}
              <span className="font-sans tabular-nums font-semibold text-amber">
                {fmt(r.schedule[3]?.monthlyInterest ?? 0)}
              </span>{" "}
              a month on the loan — vs the full{" "}
              <span className="font-sans tabular-nums font-semibold text-amber">{fmt(r.peakMonthlyInstalment)}</span>{" "}
              you&apos;d pay if you bought a resale and drew the whole loan on day one. That gap
              compounds — see{" "}
              <Link href="/new-launch-vs-resale" className="underline decoration-amber/50 hover:decoration-amber text-amber">
                the New Launch vs Resale planner
              </Link>{" "}
              for what it adds up to.
            </p>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="mt-8 sm:mt-10 bg-paper text-center py-9 sm:py-12 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber-deep" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">The advisory</span>
          </div>
          <h3 className="font-serif text-charcoal text-[24px] sm:text-[32px] mb-2 sm:mb-3" style={{ letterSpacing: "-0.02em" }}>
            Plan your cash flow before you book
          </h3>
          <p className="max-w-[54ch] mx-auto text-[15px] sm:text-base text-body mb-6 sm:mb-7">
            The progressive scheme is generous, but each milestone is a real cash call. Let&apos;s map
            your downpayment, CPF, and monthly servicing against your timeline before you sign.
          </p>
          <Link href="/discovery" className="inline-block bg-charcoal text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors">
            Request a 7-min discovery call
          </Link>
        </div>
       </div>
      </main>

      {/* ===== Footnote ===== */}
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-6 sm:py-8 border-t hairline font-mono text-[11px] text-cream/40 leading-relaxed">
        Stage percentages follow the standard Singapore Normal Payment Scheme (URA / BCA — the same
        schedule every project uses). Loan disbursement assumes the bank pays out only after your
        downpayment is exhausted. Monthly interest during construction is interest-only on the
        disbursed amount (the common practice). BSD uses current progressive rates (Feb 2024+). ABSD
        rates reflect the December 2023 review. Stage timings are typical; the actual months depend
        on construction progress. Figures here are indicative only — not a quote, not advice.
      </div>
    </div>
  );
}

/* ===================== helpers ===================== */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-deep mb-2">{children}</label>;
}

function Field({
  label,
  prefix,
  value,
  step,
  onChange,
}: {
  label: string;
  prefix?: string;
  value: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className={styles.inputWrap} data-prefix={prefix || undefined}>
        <input
          type="text"
          inputMode="numeric"
          className={`${styles.numberInput} ${prefix ? "" : styles.numberInputNoPrefix}`}
          value={fmtInt(value)}
          step={step}
          onChange={(e) => onChange(parseDigits(e.target.value))}
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-amber-deep">{label}</span>
        <span className="font-sans tabular-nums font-semibold text-charcoal text-[16px]">{display}</span>
      </div>
      <input
        type="range"
        className={`${styles.range} ${styles.rangeLight}`}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

function SummaryCard({ label, value, sub, featured }: { label: string; value: string; sub: string; featured?: boolean }) {
  return (
    <div className={`border border-charcoal p-5 sm:p-6 ${featured ? "bg-amber text-charcoal" : "bg-offwhite"}`}>
      <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 ${featured ? "text-charcoal/70" : "text-amber-deep"}`}>{label}</div>
      <div className="font-sans tabular-nums font-bold text-charcoal leading-none" style={{ fontSize: "clamp(1.6rem, 4vw, 2.1rem)", letterSpacing: "-0.02em" }}>
        {value}
      </div>
      <div className={`text-[12px] mt-2 leading-snug ${featured ? "text-charcoal/70" : "text-gray-500"}`}>{sub}</div>
    </div>
  );
}

function MiniRow({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-offwhite border border-charcoal px-4 sm:px-5 py-3.5 flex items-baseline justify-between gap-4">
      <div>
        <div className="text-[13px] sm:text-[14px] text-charcoal font-medium">{label}</div>
        <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">{sub}</div>
      </div>
      <div className="font-sans tabular-nums font-semibold text-charcoal text-[14px] sm:text-[16px] shrink-0">{value}</div>
    </div>
  );
}
