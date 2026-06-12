"use client";

import { useState, useMemo, useCallback } from "react";
import SpotGraphic from "@/components/SpotGraphic";
import Link from "next/link";
import styles from "./planner.module.css";
import LastUpdated from "@/components/editorial/LastUpdated";
import { PLANNER_LAST_UPDATED } from "./meta";
import { compute, DEFAULT_INPUTS, type PlannerInputs } from "@/lib/newLaunchVsResale";
import { downloadPlannerPdf } from "@/lib/plannerPdf";
import EcIcon, { type EcIconName } from "@/components/EcIcon";

// Shared column template. Mobile: 2 columns (the two homes) with the row label stacked above.
// Desktop: 3 columns (label · new launch · resale).
const GRID3 = "grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_1fr] gap-2 sm:gap-x-4";

// Each comparison row's leading icon (from the EastCondos icon library).
const ROW_ICON: Record<string, EcIconName> = {
  price: "coins-stack",
  size: "floor-area",
  tenure: "lease",
  renovation: "renovation",
  maintenance: "maintenance",
  tax: "property-tax",
  rent: "rent",
};

const CURRENT_YEAR = 2026;

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
const fmtSigned = (n: number) => {
  const r = Math.round(n);
  if (r === 0) return "S$0";
  return `${r < 0 ? "−" : "+"}S$${Math.abs(r).toLocaleString("en-SG")}`;
};
const fmtInt = (n: number) => (n || 0).toLocaleString("en-SG");
const parseDigits = (s: string) => {
  const d = s.replace(/[^\d]/g, "");
  return d ? parseInt(d, 10) : 0;
};

export default function NewLaunchVsResalePage() {
  const [inputs, setInputs] = useState<PlannerInputs>(DEFAULT_INPUTS);
  const [generating, setGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const revealResult = useCallback(() => {
    setShowResult(true);
    requestAnimationFrame(() =>
      document.getElementById("nlr-result")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }, []);

  const upd = useCallback(
    (patch: Partial<PlannerInputs>) => setInputs((p) => ({ ...p, ...patch })),
    [],
  );

  const r = useMemo(() => compute(inputs), [inputs]);

  const handlePdf = useCallback(async () => {
    setGenerating(true);
    try {
      const dateLabel = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      await downloadPlannerPdf(r, dateLabel);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setGenerating(false);
    }
  }, [r]);

  const freehold = inputs.resaleTenureType === "freehold";
  const waitYrs = inputs.horizonYears;
  const liveYrs = inputs.liveAfterTopYears;
  const yrs = r.totalYears; // wait + live, the comparison window for both homes
  const selectedYear = CURRENT_YEAR - (99 - inputs.resaleLeaseYears);
  const leaseYears = [];
  for (let y = 2025; y >= 1980; y--) leaseYears.push(y);

  // All-in cost of each path over the SAME (wait+live) window. The difference IS the real gap.
  const nlAllIn =
    inputs.nlPrice + inputs.nlReno + r.nlInterest + r.rentCost + r.nlMaintCost + r.nlPropTaxCost + r.nlCPFAccrued;
  const resaleAllIn =
    r.resaleFresh99 + inputs.resaleReno + r.maintCost + r.propTaxCost + r.resaleInterest + r.resaleCPFAccrued;

  // Usable space after GFA harmonisation (new-launch sqft is ~all usable; older floor plans aren't).
  const resaleUsable = Math.round(inputs.resaleSize * (1 - inputs.phantomPct / 100));
  const fmtSqft = (n: number) => Math.round(n).toLocaleString("en-SG") + " sqft";

  return (
    <div className="bg-charcoal-deep min-h-screen">
      {/* ===== Opener ===== */}
      <section className="relative gridlines border-b hairline px-6 md:px-12 pt-16 md:pt-20 pb-12 overflow-hidden">
        <SpotGraphic
          name="spot-nl-resale"
          variant="light"
          className="hidden md:block absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 w-[36%] max-w-[420px] opacity-25 pointer-events-none"
        />
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-7">Tools / New Launch vs Resale · Real-Cost Planner</div>
          <h1 className="display-hero !text-[clamp(2.4rem,5.5vw,4.6rem)] max-w-[18ch]">
            Is a new launch <em>really</em> more expensive?
          </h1>
          <p className="annot mt-8 max-w-[46ch]">
            A resale always looks cheaper on the sticker. Reset the lease, normalise the space, and
            count what you&apos;d actually spend on each — then read the real gap.
          </p>
          <div className="mt-7">
            <LastUpdated
              date={PLANNER_LAST_UPDATED}
              tone="onDark"
              note="Lease values use the official URA leasehold table"
            />
          </div>
        </div>
      </section>

      <main className="surface-light gridlines-light px-4 sm:px-10 py-8 sm:py-12">
       <div className="max-w-broadsheet mx-auto">
        {/* ===== THE CALCULATOR ===== */}
        <div className="bg-offwhite border border-charcoal shadow-premium">
          {/* Disclaimer — shown before anyone uses the planner */}
          <div className="px-5 sm:px-8 pt-5 sm:pt-6">
            <div className="flex gap-3 items-start bg-cream/70 border border-charcoal p-3.5 sm:p-4" style={{ borderLeft: "3px solid #D4A843" }}>
              <span className={styles.caveatIcon}>i</span>
              <p className="text-[12.5px] sm:text-[13.5px] text-body leading-snug">
                <span className="font-medium text-charcoal">These numbers are a guide, not a quote.</span> They&apos;re
                illustrative — every home, loan and timeline is different. Use this as a starting point, then check the real
                figures with a consultant before you act on them.
              </p>
            </div>
          </div>
          {/* Step 1 header */}
          <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-4">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-amber-deep mb-2">Step 1</div>
            <h2 className="font-serif text-charcoal leading-tight" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)", letterSpacing: "-0.02em" }}>
              Compare the two homes
            </h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px] mt-2 max-w-[58ch]">
              The same details, side by side. Type over any field.
            </p>
          </div>

          {/* Comparison — aligned columns, not a grid of boxes */}
          <div className="px-4 sm:px-8 pb-2">
            {/* column headers */}
            <div className={`${GRID3} mb-2`}>
              <div className="hidden sm:block" />
              <div className="bg-amber text-charcoal px-3 sm:px-4 py-2.5 flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold">
                <EcIcon name="building-new" size={24} className="shrink-0" />
                <span>New launch</span>
              </div>
              <div className="bg-charcoal text-cream px-3 sm:px-4 py-2.5 flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold">
                <EcIcon name="key" variant="light" size={24} className="shrink-0" />
                <span>Resale</span>
              </div>
            </div>

            <CompareInputRow icon={ROW_ICON.price} label="Price">
              <CellMoney value={inputs.nlPrice} onChange={(v) => upd({ nlPrice: v })} />
              <CellMoney value={inputs.resalePrice} onChange={(v) => upd({ resalePrice: v })} />
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.size} label="Size" sub="sq ft">
              <CellNum value={inputs.nlSize} onChange={(v) => upd({ nlSize: v })} />
              <CellNum value={inputs.resaleSize} onChange={(v) => upd({ resaleSize: v })} />
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.tenure} label="Tenure & age">
              <CellStatic>Brand new · 99 yrs</CellStatic>
              <CellSelect
                value={freehold ? "FH" : String(selectedYear)}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "FH") upd({ resaleTenureType: "freehold" });
                  else
                    upd({
                      resaleTenureType: "leasehold99",
                      resaleLeaseYears: Math.max(1, Math.min(99, 99 - (CURRENT_YEAR - parseInt(v)))),
                    });
                }}
              >
                <option value="FH">Freehold</option>
                {leaseYears.map((y) => (
                  <option key={y} value={y}>
                    Built {y} · {Math.max(1, 99 - (CURRENT_YEAR - y))} yrs left
                  </option>
                ))}
              </CellSelect>
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.renovation} label="Renovation">
              <CellMoney value={inputs.nlReno} onChange={(v) => upd({ nlReno: v })} />
              <CellMoney value={inputs.resaleReno} onChange={(v) => upd({ resaleReno: v })} />
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.maintenance} label="Maintenance" sub="per month">
              <CellNote>None until you move in</CellNote>
              <CellMoney value={inputs.resaleMaintMonthly} onChange={(v) => upd({ resaleMaintMonthly: v })} />
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.tax} label="Property tax" sub="per year">
              <CellNote>None until you move in</CellNote>
              <CellMoney value={inputs.resalePropTaxAnnual} onChange={(v) => upd({ resalePropTaxAnnual: v })} />
            </CompareInputRow>

            <CompareInputRow icon={ROW_ICON.rent} label="Rent while you wait" sub="per month · 0 if you keep your home">
              <CellMoney value={inputs.rentMonthly} onChange={(v) => upd({ rentMonthly: v, renting: v > 0 })} />
              <CellNote>You move in now — no rent</CellNote>
            </CompareInputRow>
          </div>

          {/* Step 2 — your scenario (applies to both homes) */}
          <div className="border-t border-charcoal mt-5 px-5 sm:px-8 pt-7 pb-7">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-amber-deep mb-2">Step 2</div>
            <h2 className="font-serif text-charcoal leading-tight mb-5" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)", letterSpacing: "-0.02em" }}>
              Your scenario
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 items-start">
              <Slider label="Years until new launch is ready" display={`${waitYrs} yrs`} min={2} max={6} step={1} value={waitYrs} onChange={(v) => upd({ horizonYears: v })} />
              <Slider label="Years you'll live there after TOP" display={`${liveYrs} ${liveYrs === 1 ? "yr" : "yrs"}`} min={0} max={10} step={1} value={liveYrs} onChange={(v) => upd({ liveAfterTopYears: v })} />
              <Slider label="Mortgage rate" display={`${inputs.ratePct.toFixed(1)}%`} min={1} max={4} step={0.1} value={inputs.ratePct} onChange={(v) => upd({ ratePct: v })} />
              <Slider label="Loan-to-value" display={`${inputs.ltvPct}%`} min={55} max={75} step={5} value={inputs.ltvPct} onChange={(v) => upd({ ltvPct: v })} />
              <MoneyField label="CPF used / mo" prefix="S$" value={inputs.cpfMonthly} onChange={(v) => upd({ cpfMonthly: v })} small hint="CPF toward the instalment — accrues 2.5%. 0 = pay cash." />
            </div>
            <p className="text-[11.5px] sm:text-[12.5px] text-gray-500 mt-4 leading-snug">
              We compare both homes over the <span className="text-charcoal font-medium tabular-nums">{yrs} years</span>{" "}
              you&apos;ll hold them — {waitYrs} years waiting for the new launch + {liveYrs} {liveYrs === 1 ? "year" : "years"} living there after TOP.
            </p>
          </div>

          {/* ===== See the result (button only — the answer lives in the table below) ===== */}
          {!showResult && (
            <div className="border-t-2 border-charcoal p-5 sm:p-7 bg-cream">
              <button
                type="button"
                onClick={revealResult}
                className="w-full bg-charcoal text-cream py-4 sm:py-5 text-[13px] sm:text-[15px] uppercase tracking-[0.18em] font-semibold hover:bg-amber hover:text-charcoal transition-colors"
              >
                See the result
              </button>
              <p className="text-center text-gray-500 text-[12px] sm:text-[13px] mt-3">
                Fill in your numbers above, then see the real difference.
              </p>
            </div>
          )}
        </div>

        {showResult && (
          <div id="nlr-result" className="mt-10 sm:mt-14 scroll-mt-4">
            <SectionLabel>The full picture</SectionLabel>
            <h2 className="font-serif text-[24px] sm:text-[32px] text-charcoal leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
              What each home really costs over {yrs} years
            </h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[58ch] mb-6 sm:mb-7">
              Every cost, both homes, added up — with the real difference at the bottom.
            </p>

            <div className="border border-charcoal overflow-hidden bg-offwhite">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] text-[10px] sm:text-[11px] uppercase tracking-[0.14em]">
                <div className="px-3 sm:px-6 py-3 bg-offwhite" />
                <div className="px-2 sm:px-5 py-3 text-right bg-amber text-charcoal font-semibold">New launch</div>
                <div className="px-2 sm:px-5 py-3 text-right bg-charcoal text-cream font-semibold">Resale</div>
              </div>
              <CompareRow label="Price" nl={fmt(inputs.nlPrice)} re={fmt(inputs.resalePrice)} />
              <CompareRow
                label="Lease Reset Formula™"
                hint="Resale has less lease. We reset it to a fresh 99 years (official URA table) so the two prices compare fairly."
                nl="Already fresh 99"
                re={fmtSigned(r.leaseAdjustment)}
                shaded
              />
              <CompareRow
                label="Usable space (harmonised)"
                hint={`Estimate: older floor plans lose roughly 6–8% to air-con ledges, bay windows and planters that you can't really live in. New-launch sqft is harmonised — almost all usable.`}
                nl={`${fmtSqft(inputs.nlSize)} · all usable`}
                re={`${fmtSqft(resaleUsable)} of ${inputs.resaleSize.toLocaleString("en-SG")}`}
                muted
              />
              <CompareRow label="Renovation" nl={fmt(inputs.nlReno)} re={fmt(inputs.resaleReno)} shaded lowerBetter nlVal={inputs.nlReno} reVal={inputs.resaleReno} />
              <CompareRow label={`Loan interest · ${yrs} yrs`} nl={fmt(r.nlInterest)} re={fmt(r.resaleInterest)} hint={`New launch: progressive draw during the ${waitYrs}-yr wait + full loan during the ${liveYrs} live-in ${liveYrs === 1 ? "year" : "years"}. Resale: fully drawn from day one for all ${yrs} years. See the full schedule in the Progressive Payment calculator.`} link={{ href: "/progressive-payment-calculator", label: "Progressive payment →" }} lowerBetter nlVal={r.nlInterest} reVal={r.resaleInterest} />
              <CompareRow label={`Maintenance · ${yrs} yrs`} nl={liveYrs > 0 ? fmt(r.nlMaintCost) : "None till move-in"} re={fmt(r.maintCost)} hint={liveYrs > 0 ? `New launch only pays during the ${liveYrs} ${liveYrs === 1 ? "year" : "years"} after TOP. Same monthly rate assumed.` : undefined} shaded />
              <CompareRow label={`Property tax · ${yrs} yrs`} nl={liveYrs > 0 ? fmt(r.nlPropTaxCost) : "None till move-in"} re={fmt(r.propTaxCost)} hint={liveYrs > 0 ? `Tax tracks Annual Value (≈3% of property value), so the new launch's tax scales with its price.` : undefined} />
              <CompareRow label={`Rent · ${yrs} yrs`} nl={fmt(r.rentCost)} re="Move in now" hint="Rent only counts during the wait years — once you move in, it stops." shaded />
              {inputs.cpfMonthly > 0 && (
                <CompareRow label={`CPF locked up · ${yrs} yrs`} nl={fmt(r.nlCPFAccrued)} re={fmt(r.resaleCPFAccrued)} hint="2.5% building on CPF used to service the loan — repaid to your own CPF on sale." lowerBetter nlVal={r.nlCPFAccrued} reVal={r.resaleCPFAccrued} />
              )}
              <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center bg-paper border-t-2 border-charcoal">
                <div className="px-3 sm:px-6 py-4 font-serif text-[15px] sm:text-[18px] text-charcoal">All-in over {yrs} yrs</div>
                <div className="px-2 sm:px-5 py-4 text-right font-sans tabular-nums font-bold text-charcoal text-[15px] sm:text-[19px]">{fmt(nlAllIn)}</div>
                <div className="px-2 sm:px-5 py-4 text-right font-sans tabular-nums font-bold text-charcoal text-[15px] sm:text-[19px]">{fmt(resaleAllIn)}</div>
              </div>
              <div className="bg-charcoal text-cream px-4 sm:px-6 py-5">
                <div className="pb-3 mb-3 border-b border-white/15">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[13px] sm:text-[15px]" style={{ color: "rgba(242,235,219,0.7)" }}>What you think you save</div>
                    <div className="font-sans tabular-nums text-[16px] sm:text-[20px]" style={{ color: "rgba(242,235,219,0.45)", textDecoration: "line-through" }}>
                      {fmt(r.apparentGap)}
                    </div>
                  </div>
                  <div className="text-[11.5px] sm:text-[12.5px] mt-1.5 tabular-nums" style={{ color: "rgba(242,235,219,0.5)" }}>
                    {fmt(inputs.nlPrice)} new launch − {fmt(inputs.resalePrice)} resale = {fmt(r.apparentGap)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-serif text-[18px] sm:text-[24px]">{r.realGap >= 0 ? "Actual difference" : "New launch is cheaper"}</div>
                  <div className="font-sans tabular-nums font-bold text-amber text-[26px] sm:text-[36px]" style={{ letterSpacing: "-0.02em" }}>
                    {fmt(Math.abs(r.realGap))}
                  </div>
                </div>
                <div className="text-[12px] sm:text-[13px] mt-2" style={{ color: "rgba(242,235,219,0.6)" }}>
                  {r.realGap >= 0
                    ? `The new launch really costs about ${fmtShort(Math.abs(r.realGap))} more — not the ${fmtShort(r.apparentGap)} the sticker suggests.`
                    : "Once everything is counted, the new launch works out cheaper."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Three intangibles the calculator can't price ===== */}
        <div className="mt-10 sm:mt-14">
          <SectionLabel>The upside we didn&apos;t put in the numbers</SectionLabel>
          <h2 className="font-serif text-[24px] sm:text-[32px] text-charcoal leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
            Three intangibles worth another <em className="text-amber-deep italic tabular-nums">{fmtShort(Math.round(inputs.nlPrice * 0.05 / 10000) * 10000)}+</em>
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[64ch] mb-6 sm:mb-8">
            These don&apos;t show up in any spreadsheet — but they&apos;re real money, easily another ~5% on the new launch.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <ConceptCard
              icon="growth-staircase"
              title="First-mover advantage"
              text="Everyone in a new launch bought near one price band. The collective floor holds — and when the project hands over to its second wave of buyers, you&apos;re the early one with the lower entry."
            />
            <ConceptCard
              icon="chart-up"
              title="New always sells faster"
              text={`Buyers pay a premium for fresh. New launches typically outperform resale by ~5–6% in the first 4–5 years — on your ${fmtShort(
                inputs.nlPrice,
              )} home, that's roughly ${fmtShort(Math.round(inputs.nlPrice * 0.05 / 10000) * 10000)} of paper upside the calculator above ignores.`}
            />
            <ConceptCard
              icon="clock"
              title="Far from the 40-yr wall"
              text={`Banks tighten loans and CPF usage when a lease falls below ~60 years. A fresh 99 stays clear of that danger zone for decades; an ${
                freehold ? "older" : `${inputs.resaleLeaseYears}-year`
              } resale is already on the clock.`}
            />
          </div>
        </div>

        {/* ===== Download PDF (after result) ===== */}
        {showResult && (
          <div className="mt-8 sm:mt-10 bg-offwhite border border-charcoal p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-serif text-[20px] sm:text-[24px] text-charcoal mb-1.5" style={{ letterSpacing: "-0.01em" }}>
                Take the numbers with you
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-500 max-w-[48ch]">
                Download a one-page summary of this comparison to keep or forward.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePdf}
              disabled={generating}
              className="shrink-0 inline-block bg-charcoal text-cream px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors disabled:opacity-50"
            >
              {generating ? "Preparing…" : "Download PDF summary"}
            </button>
          </div>
        )}

        {/* ===== Caveat ===== */}
        <div className="bg-offwhite border border-charcoal mt-8 p-5 sm:p-7 grid gap-4 sm:gap-5" style={{ borderLeft: "3px solid #D4A843", gridTemplateColumns: "auto 1fr" }}>
          <div className={styles.caveatIcon}>i</div>
          <div>
            <h4 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-2 sm:mb-2.5" style={{ letterSpacing: "-0.01em" }}>
              How to read this
            </h4>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">
              This is the cost of <em className="font-serif italic text-charcoal">getting in</em>, not the return on getting
              out. The real gap usually buys a brand-new home, a fresh 99-year lease, no renovation, and a stronger floor on
              exit. (CPF accrued interest goes back to your own CPF — not lost.) Indicative only — your figures depend on the
              actual homes, financing and timing.
            </p>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="mt-8 sm:mt-10 bg-charcoal text-cream text-center py-9 sm:py-12 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">The advisory</span>
          </div>
          <h3 className="font-serif text-[24px] sm:text-[32px] mb-2 sm:mb-3" style={{ letterSpacing: "-0.02em" }}>
            You&apos;ve seen the numbers.
          </h3>
          <p className="max-w-[54ch] mx-auto text-[15px] sm:text-base mb-6 sm:mb-7" style={{ color: "rgba(242, 235, 219, 0.7)" }}>
            Want an in-depth walk-through on your own two homes — or help choosing a new launch that fits your lifestyle and
            budget? That&apos;s the conversation.
          </p>
          <Link href="/discovery" className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors">
            Request a 7-min discovery call
          </Link>
        </div>
       </div>
      </main>

      {/* ===== Footnote ===== */}
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-6 sm:py-8 border-t hairline font-mono text-[11px] text-cream/40 leading-relaxed">
        Lease normalisation uses the official URA &ldquo;Leasehold values as a percentage of freehold value&rdquo; table (DC
        Circular dc22-08, Appendix 2). Progressive payment interest follows the Normal Payment Scheme; resale interest is the
        amortising interest on a fully-drawn loan over the same window. CPF accrued interest is the 2.5% that builds on CPF used
        for monthly instalments (the deposit is treated as comparable across both). Maintenance, property tax and rent are
        counted only for the years before the new launch is ready. Figures are indicative for planning only and are not
        financial advice or a valuation.
      </div>
    </div>
  );
}

/* ===================== helpers ===================== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
      <span className="w-5 sm:w-7 h-px bg-amber-deep" />
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">{children}</span>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-deep mb-2">{children}</label>;
}
function FieldHint({ children }: { children: React.ReactNode }) {
  return <span className="block text-[11px] sm:text-xs text-gray-500 mt-1.5 leading-snug">{children}</span>;
}

function MoneyField({
  label,
  prefix,
  suffix,
  value,
  onChange,
  hint,
  small,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
  small?: boolean;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className={styles.inputWrap} data-prefix={prefix || undefined} data-suffix={suffix || undefined}>
        <input
          type="text"
          inputMode="numeric"
          className={`${styles.numberInput} ${prefix ? "" : styles.numberInputNoPrefix}`}
          style={small ? { fontSize: "18px", paddingTop: "11px", paddingBottom: "11px" } : undefined}
          value={fmtInt(value)}
          onChange={(e) => onChange(parseDigits(e.target.value))}
        />
      </div>
      {hint && <FieldHint>{hint}</FieldHint>}
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
      <input type="range" className={`${styles.range} ${styles.rangeLight}`} min={min} max={max} step={step} value={value} aria-label={label} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
}

// ---- Comparison primitives: aligned columns, real input fields, plain-text statics ----
function CompareInputRow({
  icon,
  label,
  sub,
  children,
}: {
  icon?: EcIconName;
  label: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-2.5 sm:py-2">
      {/* mobile: label sits above the two inputs */}
      <div className="flex sm:hidden items-center gap-2 mb-1.5">
        {icon && <EcIcon name={icon} size={22} className="shrink-0" />}
        <span className="text-[13.5px] text-charcoal font-medium">{label}</span>
        {sub && <span className="text-[10.5px] text-gray-400">· {sub}</span>}
      </div>
      <div className={`${GRID3} items-center`}>
        <div className="hidden sm:flex items-center gap-3 pr-2">
          {icon && <EcIcon name={icon} size={26} className="shrink-0" />}
          <div className="leading-tight">
            <div className="text-[15px] text-charcoal font-medium">{label}</div>
            {sub && <div className="text-[11px] text-gray-400">{sub}</div>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// An actual fillable field — bordered white box, so it's obvious you type here.
function fieldBox(extra = "") {
  return `flex items-center gap-1 border border-charcoal/30 bg-white px-2.5 py-2 transition-colors focus-within:border-amber-deep focus-within:ring-1 focus-within:ring-amber-deep ${extra}`;
}

function CellMoney({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className={fieldBox()}>
      <span className="text-[11px] text-gray-400 shrink-0">S$</span>
      <input
        type="text"
        inputMode="numeric"
        value={fmtInt(value)}
        onChange={(e) => onChange(parseDigits(e.target.value))}
        className="w-full bg-transparent text-[14px] sm:text-[16px] font-sans tabular-nums font-semibold text-charcoal outline-none min-w-0"
      />
    </div>
  );
}

function CellNum({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className={fieldBox()}>
      <input
        type="text"
        inputMode="numeric"
        value={fmtInt(value)}
        onChange={(e) => onChange(parseDigits(e.target.value))}
        className="w-full bg-transparent text-[14px] sm:text-[16px] font-sans tabular-nums font-semibold text-charcoal outline-none min-w-0"
      />
    </div>
  );
}

function CellSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={fieldBox("!px-0 !py-0")}>
      <select className={styles.cellSelect} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

// Static value — just text, no box, so it clearly isn't an input.
function CellStatic({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 text-[13px] sm:text-[15px] text-charcoal/80 font-medium leading-snug">{children}</div>
  );
}

// Explains WHY there's nothing to enter (replaces a bare dash).
function CellNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 text-[11.5px] sm:text-[12.5px] text-gray-400 italic leading-snug">{children}</div>
  );
}

function CompareRow({
  label,
  nl,
  re,
  hint,
  shaded,
  muted,
  lowerBetter,
  nlVal,
  reVal,
  link,
}: {
  label: string;
  nl: string;
  re: string;
  hint?: string;
  shaded?: boolean;
  muted?: boolean;
  lowerBetter?: boolean;
  nlVal?: number;
  reVal?: number;
  link?: { href: string; label: string };
}) {
  const nlBetter = lowerBetter && nlVal !== undefined && reVal !== undefined && nlVal < reVal;
  const reBetter = lowerBetter && nlVal !== undefined && reVal !== undefined && reVal < nlVal;
  const numCls = muted ? "font-sans text-charcoal text-[13px] sm:text-[15px]" : "font-sans tabular-nums text-charcoal text-[14px] sm:text-[16px]";
  const cell = (v: string, better: boolean) =>
    v === "—" ? <span className="text-charcoal/25">—</span> : <span className={better ? "font-bold" : ""}>{v}</span>;
  return (
    <div className={`grid grid-cols-[1.4fr_1fr_1fr] items-center ${shaded ? "bg-cream/60" : "bg-offwhite"}`}>
      <div className="px-3 sm:px-6 py-3.5">
        <div className="text-[12.5px] sm:text-[14.5px] text-charcoal leading-snug">{label}</div>
        {hint && <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">{hint}</div>}
        {link && (
          <Link href={link.href} className="inline-block mt-1 text-[11px] sm:text-[12px] text-amber-deep hover:text-charcoal underline decoration-amber-deep/40 hover:decoration-charcoal">
            {link.label}
          </Link>
        )}
      </div>
      <div className={`px-2 sm:px-5 py-3.5 text-right ${numCls}`}>{cell(nl, !!nlBetter)}</div>
      <div className={`px-2 sm:px-5 py-3.5 text-right ${numCls}`}>{cell(re, !!reBetter)}</div>
    </div>
  );
}

function ConceptCard({ icon, title, text }: { icon: EcIconName; title: string; text: string }) {
  return (
    <div className="bg-offwhite border border-charcoal p-6 sm:p-7 flex flex-col">
      <EcIcon name={icon} size={50} className="mb-4" />
      <h3 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-2 leading-snug" style={{ letterSpacing: "-0.01em" }}>
        {title}
      </h3>
      <p className="text-[13.5px] sm:text-[14px] text-body leading-snug">{text}</p>
    </div>
  );
}
