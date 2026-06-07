"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import styles from "./planner.module.css";
import LastUpdated from "@/components/editorial/LastUpdated";
import { PLANNER_LAST_UPDATED } from "./meta";
import { compute, DEFAULT_INPUTS, type PlannerInputs } from "@/lib/newLaunchVsResale";
import { downloadPlannerPdf } from "@/lib/plannerPdf";
import EcIcon, { type EcIconName } from "@/components/EcIcon";
import SpotGraphic from "@/components/SpotGraphic";

// Maps each bridge factor to its EastCondos icon.
const BRIDGE_ICON: Record<string, EcIconName> = {
  lease: "lease",
  reno: "renovation",
  maintenance: "maintenance",
  tax: "property-tax",
  interest: "interest",
  cpf: "cpf",
  rent: "rent",
};

// Shared column template so the comparison header and rows line up exactly.
const GRID3 = "grid grid-cols-[1.1fr_1fr_1fr] sm:grid-cols-[1.4fr_1fr_1fr] gap-x-2 sm:gap-x-4";

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
const psf = (n: number) => "S$" + Math.round(n).toLocaleString("en-SG");
const fmtInt = (n: number) => (n || 0).toLocaleString("en-SG");
const parseDigits = (s: string) => {
  const d = s.replace(/[^\d]/g, "");
  return d ? parseInt(d, 10) : 0;
};

export default function NewLaunchVsResalePage() {
  const [inputs, setInputs] = useState<PlannerInputs>(DEFAULT_INPUTS);
  const [generating, setGenerating] = useState(false);

  const upd = useCallback(
    (patch: Partial<PlannerInputs>) => setInputs((p) => ({ ...p, ...patch })),
    [],
  );

  const r = useMemo(() => compute(inputs), [inputs]);
  const maxStep = useMemo(() => Math.max(1, ...r.bridge.map((b) => Math.abs(b.amount))), [r.bridge]);

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
  const yrs = inputs.horizonYears;
  const selectedYear = CURRENT_YEAR - (99 - inputs.resaleLeaseYears);
  const leaseYears = [];
  for (let y = 2025; y >= 1980; y--) leaseYears.push(y);

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Hero ===== */}
      <section className="border-b border-charcoal text-center px-5 sm:px-10 pt-9 pb-8 sm:pt-12 sm:pb-10 max-w-broadsheet mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3.5">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            New Launch vs Resale · Real-Cost Planner
          </span>
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
        </div>
        <h1
          className="font-serif text-charcoal mx-auto"
          style={{
            fontSize: "clamp(1.9rem, 6vw, 3.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            maxWidth: "18ch",
            marginBottom: "14px",
          }}
        >
          Is a new launch <em className="text-amber-deep italic">really</em> more expensive?
        </h1>
        <p className="text-body text-[15px] sm:text-[17px] leading-snug max-w-[52ch] mx-auto mb-5">
          A resale always looks cheaper on the sticker. Reset the lease, normalise the space, and
          count what you&apos;d actually spend on each — then read the real gap.
        </p>
        <LastUpdated
          date={PLANNER_LAST_UPDATED}
          align="center"
          note="Lease values use the official URA leasehold table"
        />
        <div className="mt-7 sm:mt-9 max-w-[520px] mx-auto opacity-90">
          <SpotGraphic name="spot-nl-resale" variant="dark" priority />
        </div>
      </section>

      <main className="max-w-broadsheet mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* ===== THE CALCULATOR ===== */}
        <div className="bg-offwhite border border-charcoal shadow-premium">
          {/* Step 1 header */}
          <div className="px-5 sm:px-8 pt-7 sm:pt-9 pb-4">
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
              <div />
              <div className="bg-amber text-charcoal px-3 sm:px-4 py-2.5 flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold">
                <EcIcon name="building-new" size={26} className="shrink-0" />
                <span>New launch</span>
              </div>
              <div className="bg-charcoal text-cream px-3 sm:px-4 py-2.5 flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold">
                <EcIcon name="key" variant="light" size={26} className="shrink-0" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 items-start">
              <Slider label="Years until ready" display={`${yrs} yrs`} min={2} max={6} step={1} value={yrs} onChange={(v) => upd({ horizonYears: v })} />
              <Slider label="Mortgage rate" display={`${inputs.ratePct.toFixed(1)}%`} min={1} max={4} step={0.1} value={inputs.ratePct} onChange={(v) => upd({ ratePct: v })} />
              <Slider label="Loan-to-value" display={`${inputs.ltvPct}%`} min={55} max={75} step={5} value={inputs.ltvPct} onChange={(v) => upd({ ltvPct: v })} />
              <MoneyField label="CPF used / mo" prefix="S$" value={inputs.cpfMonthly} onChange={(v) => upd({ cpfMonthly: v })} small hint="CPF toward the instalment — accrues 2.5%. 0 = pay cash." />
            </div>
          </div>

          {/* ===== RESULT READOUT (the screen) ===== */}
          <div className="border-t-2 border-charcoal grid grid-cols-1 sm:grid-cols-[1fr_auto_1.1fr]">
            <div className="bg-cream px-5 sm:px-8 py-6 text-center sm:text-left">
              <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500 mb-2">Looks like you save</div>
              <div className="font-sans tabular-nums font-bold text-charcoal/55 leading-none" style={{ fontSize: "clamp(2rem, 5.5vw, 3rem)", letterSpacing: "-0.03em", textDecoration: "line-through", textDecorationThickness: "2px", textDecorationColor: "rgba(26,26,46,0.25)" }}>
                {fmt(r.apparentGap)}
              </div>
            </div>
            <div className="hidden sm:flex items-center justify-center bg-cream px-2">
              <span className="font-serif text-amber-deep text-[28px]">→</span>
            </div>
            <div className="bg-charcoal text-cream px-5 sm:px-8 py-6 text-center sm:text-left">
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber mb-2">
                {r.realGap >= 0 ? (inputs.renting ? "Real extra cost of going new" : "Real gap if you keep your home") : "The new launch is actually cheaper"}
              </div>
              <div className="font-sans tabular-nums font-bold text-amber leading-none" style={{ fontSize: "clamp(2.4rem, 7vw, 3.6rem)", letterSpacing: "-0.03em" }}>
                {fmt(Math.abs(r.realGap))}
              </div>
              <div className="text-[12px] sm:text-[13px] mt-2.5" style={{ color: "rgba(242,235,219,0.65)" }}>
                {r.apparentGap !== 0 ? (
                  <>
                    <span className="text-amber font-semibold tabular-nums">{fmtShort(Math.abs(r.apparentGap - r.realGap))}</span> of the gap was never real.
                  </>
                ) : (
                  "Set your two prices above."
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== The bridge ===== */}
        <div className="mt-10 sm:mt-14">
          <SectionLabel>How the gap closes</SectionLabel>
          <h2 className="font-serif text-[25px] sm:text-[32px] text-charcoal leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
            Where the <em className="text-amber-deep italic tabular-nums">{fmt(r.apparentGap)}</em> actually goes
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[60ch] mb-6 sm:mb-7">
            Each line is a cost the resale carries that the new launch doesn&apos;t — only rent runs
            the other way. <span className="text-amber-deep">Tap any line for the why.</span>
          </p>

          <div className="bg-offwhite border border-charcoal divide-y divide-[#e3d9bd]">
            <BridgeRow label="What you think you save" amount={null} running={r.apparentGap} maxStep={maxStep} />
            {r.bridge.map((b) => (
              <BridgeRow key={b.key} icon={BRIDGE_ICON[b.key]} label={b.label} hint={b.hint} amount={b.amount} running={b.running} maxStep={maxStep} />
            ))}
            <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-5 bg-charcoal text-cream">
              <div className="font-serif text-[18px] sm:text-[22px]">The real gap</div>
              <div className="font-sans tabular-nums font-bold text-amber text-[22px] sm:text-[28px]" style={{ letterSpacing: "-0.02em" }}>
                {fmt(r.realGap)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-[11px] text-gray-500">
            <span className="flex items-center gap-2"><span className="inline-block w-3 h-2 bg-charcoal" /> narrows the gap</span>
            <span className="flex items-center gap-2"><span className="inline-block w-3 h-2 bg-amber-deep" /> widens the gap</span>
          </div>
        </div>

        {/* ===== Side-by-side ===== */}
        <div className="mt-10 sm:mt-14">
          <SectionLabel>Side by side</SectionLabel>
          <h2 className="font-serif text-[25px] sm:text-[32px] text-charcoal leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
            What each home costs you over {yrs} years
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[60ch] mb-6 sm:mb-7">
            Purchase price aside, here&apos;s the cash each path asks of you while you settle in.
          </p>

          <div className="border border-charcoal overflow-hidden bg-offwhite">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] text-[10px] sm:text-[11px] uppercase tracking-[0.14em]">
              <div className="px-4 sm:px-6 py-3 bg-offwhite" />
              <div className="px-3 sm:px-5 py-3 text-right bg-amber text-charcoal font-semibold">New launch</div>
              <div className="px-3 sm:px-5 py-3 text-right bg-charcoal text-cream font-semibold">Resale</div>
            </div>
            <CompareRow label="Purchase price" nl={fmt(inputs.nlPrice)} re={fmt(inputs.resalePrice)} />
            <CompareRow label="Lease" nl="Fresh 99 yrs" re={freehold ? "Freehold" : `${inputs.resaleLeaseYears} yrs left`} shaded muted />
            <CompareRow label="Price reset to fresh 99-yr lease" nl={fmt(inputs.nlPrice)} re={fmt(r.resaleFresh99)} hint="What the resale would cost on equal lease terms (URA table)." />
            <CompareRow label="Renovation" nl={fmt(inputs.nlReno)} re={fmt(inputs.resaleReno)} shaded lowerBetter nlVal={inputs.nlReno} reVal={inputs.resaleReno} />
            <CompareRow label={`Loan interest · ${yrs} yrs`} nl={fmt(r.nlInterest)} re={fmt(r.resaleInterest)} hint="New launch draws down progressively; resale is fully drawn from day one." lowerBetter nlVal={r.nlInterest} reVal={r.resaleInterest} />
            <CompareRow label={`Maintenance · ${yrs} yrs`} nl="—" re={fmt(r.maintCost)} shaded />
            <CompareRow label={`Property tax · ${yrs} yrs`} nl="—" re={fmt(r.propTaxCost)} />
            <CompareRow label={`Rent · ${yrs} yrs`} nl={fmt(r.rentCost)} re="—" shaded />
            {inputs.cpfMonthly > 0 && (
              <CompareRow label={`CPF accrued interest · ${yrs} yrs`} nl={fmt(r.nlCPFAccrued)} re={fmt(r.resaleCPFAccrued)} hint="2.5% building on CPF used to service the loan — repaid to your CPF on sale." lowerBetter nlVal={r.nlCPFAccrued} reVal={r.resaleCPFAccrued} />
            )}
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-charcoal text-cream items-center">
              <div className="px-4 sm:px-6 py-4 font-serif text-[15px] sm:text-[17px]">Carrying cost, excl. price</div>
              <div className="px-3 sm:px-5 py-4 text-right font-sans tabular-nums font-bold text-amber text-[16px] sm:text-[20px]">{fmt(r.nlCarry)}</div>
              <div className="px-3 sm:px-5 py-4 text-right font-sans tabular-nums font-bold text-cream text-[16px] sm:text-[20px]">{fmt(r.resaleCarry)}</div>
            </div>
          </div>
        </div>

        {/* ===== Same money, less home (PSF) ===== */}
        <div className="mt-10 sm:mt-14 bg-offwhite border border-charcoal p-6 sm:p-9">
          <SectionLabel>Same money, less home</SectionLabel>
          <h2 className="font-serif text-[23px] sm:text-[30px] text-charcoal leading-tight mb-5 sm:mb-6" style={{ letterSpacing: "-0.02em" }}>
            The price-per-square-foot trap
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <PsfStat label="New launch" value={psf(r.nlPsf)} sub="per sqft — all usable" featured />
            <PsfStat label="Resale, on paper" value={psf(r.resalePsfHeadline)} sub="looks like the bargain" />
            <PsfStat label="Resale, the truth" value={psf(r.resaleTruePsf)} sub="fresh-lease price ÷ usable space" />
          </div>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mt-6 max-w-[60ch]">
            {freehold ? "Tenure" : "Less lease"} and old floor plans that count{" "}
            <em className="font-serif italic text-charcoal">space you can&apos;t really use</em> (air-con ledges, bay windows)
            flatter the resale. Its true rate is{" "}
            <span className="font-sans tabular-nums font-semibold text-charcoal">{psf(r.resaleTruePsf)}/sqft</span>, not{" "}
            <span className="tabular-nums">{psf(r.resalePsfHeadline)}</span>.
          </p>
        </div>

        {/* ===== Exit floor ===== */}
        <div className="mt-10 sm:mt-14">
          <SectionLabel>The exit nobody prices in</SectionLabel>
          <h2 className="font-serif text-[25px] sm:text-[32px] text-charcoal leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
            Who sets the price when <em className="text-amber-deep italic">you</em> sell?
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[62ch] mb-6 sm:mb-7">
            The gap above is about buying. This is the day you exit — the part most buyers never think through.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-offwhite border border-charcoal p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber-deep mb-3">Resale — you&apos;re the price-taker</div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">
                You come in as the second owner. The first owners bought lower, so when everyone wants to sell, they can
                undercut you and still walk away happy. You&apos;re competing against people whose floor is far below yours.
              </p>
            </div>
            <div className="bg-charcoal text-cream p-6 sm:p-8 border border-charcoal">
              <div className="text-[10px] uppercase tracking-[0.22em] text-amber mb-3">New launch — the floor is set</div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(242,235,219,0.82)" }}>
                Everyone bought at a developer price within a tight band. No single owner has a wildly lower cost base to
                undercut from, so the whole project holds a floor together. You sell from strength.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Download PDF ===== */}
        <div className="mt-10 sm:mt-14 bg-offwhite border border-charcoal p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-serif text-[20px] sm:text-[24px] text-charcoal mb-1.5" style={{ letterSpacing: "-0.01em" }}>
              Take the numbers with you
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-500 max-w-[48ch]">
              Download a one-page summary of this comparison — the reveal, the bridge, and the true PSF — to keep or forward.
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
            Run it on <em className="text-amber italic">your</em> two homes
          </h3>
          <p className="max-w-[52ch] mx-auto text-[15px] sm:text-base mb-6 sm:mb-7" style={{ color: "rgba(242, 235, 219, 0.7)" }}>
            Bring the actual new launch and the actual resale you&apos;re weighing. In a short call we pressure-test both on
            your numbers — lease, financing, timing, and the exit.
          </p>
          <Link href="/discovery" className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors">
            Request a 7-min discovery call
          </Link>
        </div>
      </main>

      {/* ===== Footnote ===== */}
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-6 sm:py-8 border-t border-charcoal text-[11px] sm:text-xs text-gray-500 leading-relaxed italic">
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
    <div className={`${GRID3} items-center py-2`}>
      <div className="flex items-center gap-2.5 sm:gap-3 pr-2">
        {icon && <EcIcon name={icon} size={26} className="shrink-0" />}
        <div className="leading-tight">
          <div className="text-[13px] sm:text-[15px] text-charcoal font-medium">{label}</div>
          {sub && <div className="text-[10px] sm:text-[11px] text-gray-400">{sub}</div>}
        </div>
      </div>
      {children}
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

function BridgeRow({
  label,
  hint,
  amount,
  running,
  maxStep,
  icon,
}: {
  label: string;
  hint?: string;
  amount: number | null;
  running: number;
  maxStep: number;
  icon?: EcIconName;
}) {
  const isStart = amount === null;
  const widens = (amount ?? 0) > 0;
  const barPct = isStart ? 0 : Math.min(50, (Math.abs(amount as number) / maxStep) * 50);

  const head = (
    <div className="flex items-center justify-between gap-4">
      <span className="min-w-0 flex items-center gap-3">
        {icon ? (
          <EcIcon name={icon} size={44} className="shrink-0" />
        ) : (
          <span className="w-[44px] shrink-0" aria-hidden />
        )}
        <span className={isStart ? "font-serif text-charcoal text-[16px] sm:text-[18px]" : "text-[14px] sm:text-[15px] text-charcoal"}>
          {label}
          {hint && (
            <span className="ml-2 align-middle text-amber-deep text-[10px] border border-amber-deep/50 rounded-full w-[15px] h-[15px] inline-flex items-center justify-center font-serif italic">
              i
            </span>
          )}
        </span>
      </span>
      <span className="text-right shrink-0">
        {!isStart && (
          <span className={`block text-[13px] sm:text-[14px] tabular-nums ${widens ? "text-amber-deep" : "text-charcoal/60"}`}>{fmtSigned(amount as number)}</span>
        )}
        <span className="block font-sans tabular-nums font-bold text-charcoal text-[16px] sm:text-[18px]" style={{ letterSpacing: "-0.01em" }}>{fmt(running)}</span>
      </span>
    </div>
  );

  return (
    <div className="px-5 sm:px-7 py-4">
      {hint && !isStart ? (
        <details className="group">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">{head}</summary>
          <p className="text-[12.5px] sm:text-[13px] text-gray-500 mt-2 ml-[56px] leading-snug max-w-[56ch]">{hint}</p>
        </details>
      ) : (
        head
      )}
      {!isStart && (
        <div className="relative h-1.5 mt-2.5 bg-[#e3d9bd]">
          <div className="absolute top-0 bottom-0 w-px bg-charcoal/30" style={{ left: "50%" }} />
          <div className={`absolute top-0 bottom-0 ${widens ? "bg-amber-deep" : "bg-charcoal"}`} style={widens ? { left: "50%", width: `${barPct}%` } : { right: "50%", width: `${barPct}%` }} />
        </div>
      )}
    </div>
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
}) {
  const nlBetter = lowerBetter && nlVal !== undefined && reVal !== undefined && nlVal < reVal;
  const reBetter = lowerBetter && nlVal !== undefined && reVal !== undefined && reVal < nlVal;
  const numCls = muted ? "font-sans text-charcoal text-[13px] sm:text-[15px]" : "font-sans tabular-nums text-charcoal text-[14px] sm:text-[16px]";
  const cell = (v: string, better: boolean) =>
    v === "—" ? <span className="text-charcoal/25">—</span> : <span className={better ? "font-bold" : ""}>{v}</span>;
  return (
    <div className={`grid grid-cols-[1.5fr_1fr_1fr] items-center ${shaded ? "bg-cream/60" : "bg-offwhite"}`}>
      <div className="px-4 sm:px-6 py-3.5">
        <div className="text-[13px] sm:text-[14.5px] text-charcoal">{label}</div>
        {hint && <div className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 leading-snug">{hint}</div>}
      </div>
      <div className={`px-3 sm:px-5 py-3.5 text-right ${numCls}`}>{cell(nl, !!nlBetter)}</div>
      <div className={`px-3 sm:px-5 py-3.5 text-right ${numCls}`}>{cell(re, !!reBetter)}</div>
    </div>
  );
}

function PsfStat({ label, value, sub, featured }: { label: string; value: string; sub: string; featured?: boolean }) {
  return (
    <div className={`border p-5 ${featured ? "bg-amber border-charcoal" : "bg-white border-charcoal"}`}>
      <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 ${featured ? "text-charcoal/70" : "text-amber-deep"}`}>{label}</div>
      <div className="font-sans tabular-nums font-bold text-charcoal leading-none" style={{ fontSize: "clamp(1.7rem, 4vw, 2.1rem)", letterSpacing: "-0.02em" }}>{value}</div>
      <div className={`text-[12px] mt-2 ${featured ? "text-charcoal/70" : "text-gray-500"}`}>{sub}</div>
    </div>
  );
}
