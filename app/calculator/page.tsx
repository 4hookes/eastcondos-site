"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import styles from "./calculator.module.css";

// ===== Math helpers =====
const fmt = (n: number) => {
  if (!isFinite(n) || isNaN(n) || n <= 0) return "S$0";
  if (n >= 1_000_000) return "S$" + (n / 1_000_000).toFixed(2) + "M";
  return "S$" + Math.round(n).toLocaleString("en-SG");
};

const maxLoanFromPayment = (monthlyBudget: number, annualRate: number, years: number) => {
  if (monthlyBudget <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyBudget * n;
  return (monthlyBudget * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
};

const monthlyPayment = (principal: number, annualRate: number, years: number) => {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

export default function CalculatorPage() {
  // Personal inputs
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(10000);
  const [spouseActive, setSpouseActive] = useState(false);
  const [spouseAge, setSpouseAge] = useState(33);
  const [spouseIncome, setSpouseIncome] = useState(8000);

  // Card sliders
  const [tenurePrivate, setTenurePrivate] = useState(30);
  const [ratePrivate, setRatePrivate] = useState(1.7);
  const [tenureHdbHdb, setTenureHdbHdb] = useState(25);
  const [rateHdbHdb, setRateHdbHdb] = useState(2.6);
  const [tenureHdbBank, setTenureHdbBank] = useState(25);
  const [rateHdbBank, setRateHdbBank] = useState(1.7);

  // ===== Derived values =====
  const totalIncome = income + (spouseActive ? spouseIncome : 0);

  const effectiveAge = useMemo(() => {
    if (spouseActive && totalIncome > 0) {
      return (age * income + spouseAge * spouseIncome) / totalIncome;
    }
    return age;
  }, [spouseActive, totalIncome, age, income, spouseAge, spouseIncome]);

  const ageHeadroom = Math.max(5, Math.floor(65 - effectiveAge));
  const maxTenurePrivate = Math.min(30, ageHeadroom);
  const maxTenureHdb = Math.min(25, ageHeadroom);

  // Auto-clamp tenures when age changes
  const safeTenurePrivate = Math.min(tenurePrivate, maxTenurePrivate);
  const safeTenureHdbHdb = Math.min(tenureHdbHdb, maxTenureHdb);
  const safeTenureHdbBank = Math.min(tenureHdbBank, maxTenureHdb);

  // Budgets
  const tdsrBudget = totalIncome * 0.55;
  const msrBudget = totalIncome * 0.30;

  // Option 01: Private bank
  const eligRatePrivate = Math.max(ratePrivate, 4.0);
  const loanPrivate = maxLoanFromPayment(tdsrBudget, eligRatePrivate, safeTenurePrivate);
  const monthlyPriv = monthlyPayment(loanPrivate, ratePrivate, safeTenurePrivate);
  const propPrivate = loanPrivate / 0.75;
  const subPrivate =
    ratePrivate >= 4
      ? `55% TDSR · stressed at ${ratePrivate.toFixed(1)}%`
      : "55% TDSR · stressed at 4%";

  // Option 02: HDB loan (no stress test)
  const loanHdbHdb = maxLoanFromPayment(msrBudget, rateHdbHdb, safeTenureHdbHdb);
  const monthlyHH = monthlyPayment(loanHdbHdb, rateHdbHdb, safeTenureHdbHdb);
  const propHdbHdb = loanHdbHdb / 0.75;
  const subHdbHdb = `30% MSR · ${rateHdbHdb.toFixed(1)}% rate`;

  // Option 03: HDB bank
  const eligRateHB = Math.max(rateHdbBank, 4.0);
  const loanHdbBank = maxLoanFromPayment(msrBudget, eligRateHB, safeTenureHdbBank);
  const monthlyHB = monthlyPayment(loanHdbBank, rateHdbBank, safeTenureHdbBank);
  const propHdbBank = loanHdbBank / 0.75;
  const subHdbBank =
    rateHdbBank >= 4
      ? `30% MSR · stressed at ${rateHdbBank.toFixed(1)}%`
      : "30% MSR · stressed at 4%";

  const num = useCallback((s: string) => parseFloat(s) || 0, []);

  return (
    <div className="bg-cream min-h-screen">
      {/* ===== Hero ===== */}
      <section className="border-b border-charcoal text-center px-5 sm:px-10 py-10 sm:py-16 md:py-20 max-w-broadsheet mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Singapore Loan Eligibility
          </span>
          <span className="w-5 sm:w-8 h-px bg-amber-deep" />
        </div>
        <h1
          className="font-serif text-charcoal mx-auto"
          style={{
            fontSize: "clamp(2rem, 7vw, 4.2rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            maxWidth: "16ch",
            marginBottom: "16px",
          }}
        >
          How much can you <em className="text-amber-deep italic">borrow?</em>
        </h1>
        <p className="font-serif italic text-charcoal text-[17px] sm:text-[20px] leading-snug max-w-[42ch] mx-auto">
          Three answers, one calculation. Your maximum loan for private property, HDB with HDB
          loan, and HDB with bank loan — all in one view.
        </p>
      </section>

      {/* ===== Main ===== */}
      <main className="max-w-broadsheet mx-auto px-5 sm:px-10 py-9 sm:py-14">
        {/* ----- Input section ----- */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Your numbers
          </span>
        </div>
        <h2 className="font-serif text-[26px] sm:text-[36px] text-charcoal leading-tight mb-2 sm:mb-2.5" style={{ letterSpacing: "-0.02em" }}>
          Tell us about you
        </h2>
        <p className="text-gray-500 text-[15px] sm:text-base max-w-[56ch] mb-6 sm:mb-9">
          We only need your age and gross monthly income. Add your spouse if you&apos;re applying jointly — it nearly always raises your eligibility.
        </p>

        <div className="bg-paper border border-charcoal p-5 sm:p-10 mb-8 sm:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-6">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                Your age
              </label>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  className={`${styles.numberInput} ${styles.numberInputNoPrefix}`}
                  value={age}
                  min={21}
                  max={65}
                  onChange={(e) => setAge(num(e.target.value))}
                />
              </div>
              <span className="block text-[11px] sm:text-xs text-gray-500 mt-1 font-serif italic">
                Used to calculate your maximum loan tenure.
              </span>
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                Your gross monthly income
              </label>
              <div className={styles.inputWrap} data-prefix="S$">
                <input
                  type="number"
                  className={styles.numberInput}
                  value={income}
                  min={0}
                  step={500}
                  onChange={(e) => setIncome(num(e.target.value))}
                />
              </div>
              <span className="block text-[11px] sm:text-xs text-gray-500 mt-1 font-serif italic">
                Before tax, from your IRAS NOA or payslip.
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-dotted border-[#c9bfa3] flex items-center justify-between gap-4">
            <div>
              <div className="font-serif text-[16px] sm:text-[18px] text-charcoal">
                Applying with a spouse?
              </div>
              <div className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5">
                Joint application combines both incomes and uses income-weighted age for tenure.
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={spouseActive}
              aria-label="Toggle spouse application"
              className={`${styles.toggleSwitch} ${spouseActive ? styles.toggleSwitchOn : ""}`}
              onClick={() => setSpouseActive((v) => !v)}
            />
          </div>

          {spouseActive && (
            <div className="mt-7 pt-7 border-t border-dotted border-[#c9bfa3]">
              <div className="text-[10px] uppercase tracking-[0.28em] text-amber-deep mb-4">
                Spouse details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-6">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                    Spouse&apos;s age
                  </label>
                  <div className={styles.inputWrap}>
                    <input
                      type="number"
                      className={`${styles.numberInput} ${styles.numberInputNoPrefix}`}
                      value={spouseAge}
                      min={21}
                      max={65}
                      onChange={(e) => setSpouseAge(num(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-amber-deep mb-2">
                    Spouse&apos;s gross monthly income
                  </label>
                  <div className={styles.inputWrap} data-prefix="S$">
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={spouseIncome}
                      min={0}
                      step={500}
                      onChange={(e) => setSpouseIncome(num(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----- Results section ----- */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="w-5 sm:w-7 h-px bg-amber-deep" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber-deep">
            Your eligibility
          </span>
        </div>
        <h2 className="font-serif text-[26px] sm:text-[32px] text-charcoal leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
          Here&apos;s what you can <em className="text-amber-deep italic">borrow.</em>
        </h2>
        <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[60ch] mb-6 sm:mb-8">
          Drag the sliders inside each card to see how a longer tenure or different rate moves your numbers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mt-7 sm:mt-9">
          <ResultCard
            kicker="Option 01"
            title={<>Private property<br />Bank loan</>}
            featured
            maxLoan={loanPrivate}
            subtitle={subPrivate}
            propValue={propPrivate}
            tenure={safeTenurePrivate}
            tenureMax={maxTenurePrivate}
            onTenureChange={setTenurePrivate}
            rate={ratePrivate}
            rateMin={0.5}
            rateMax={6}
            rateLabel="Offered rate"
            onRateChange={setRatePrivate}
            monthly={monthlyPriv}
          />
          <ResultCard
            kicker="Option 02"
            title={<>HDB flat<br />HDB loan</>}
            maxLoan={loanHdbHdb}
            subtitle={subHdbHdb}
            propValue={propHdbHdb}
            tenure={safeTenureHdbHdb}
            tenureMax={maxTenureHdb}
            onTenureChange={setTenureHdbHdb}
            rate={rateHdbHdb}
            rateMin={2.0}
            rateMax={4.0}
            rateLabel="HDB rate"
            onRateChange={setRateHdbHdb}
            monthly={monthlyHH}
          />
          <ResultCard
            kicker="Option 03"
            title={<>HDB flat<br />Bank loan</>}
            maxLoan={loanHdbBank}
            subtitle={subHdbBank}
            propValue={propHdbBank}
            tenure={safeTenureHdbBank}
            tenureMax={maxTenureHdb}
            onTenureChange={setTenureHdbBank}
            rate={rateHdbBank}
            rateMin={0.5}
            rateMax={6}
            rateLabel="Offered rate"
            onRateChange={setRateHdbBank}
            monthly={monthlyHB}
          />
        </div>

        {/* ----- Caveat ----- */}
        <div
          className="bg-paper border border-charcoal mt-8 p-5 sm:p-7 grid gap-4 sm:gap-5"
          style={{
            borderLeft: "3px solid #D4A843",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className={styles.caveatIcon}>i</div>
          <div>
            <h4 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-2 sm:mb-2.5" style={{ letterSpacing: "-0.01em" }}>
              Read this before you plan your budget
            </h4>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              The <em className="font-serif italic text-charcoal">implied max property</em> above
              assumes a 75% loan-to-value. In practice, you can buy a more expensive property by
              topping up the difference with{" "}
              <em className="font-serif italic text-charcoal">CPF savings or cash</em> — the LTV
              limits the loan, not the purchase.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              The loan figures also assume you have{" "}
              <em className="font-serif italic text-charcoal">no existing debts</em> (no car loan,
              no credit card balance, no other instalments). Existing debts reduce your eligible
              loan one-for-one.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">
              For your precise number and the cleanest path to a higher approval, check with a
              professional.
            </p>
          </div>
        </div>

        {/* ----- CTA ----- */}
        <div className="mt-8 sm:mt-10 bg-charcoal text-cream text-center py-9 sm:py-12 px-5 sm:px-10 border border-charcoal">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <span className="w-5 sm:w-7 h-px bg-amber" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-amber">
              The advisory
            </span>
          </div>
          <h3 className="font-serif text-[24px] sm:text-[32px] mb-2 sm:mb-3" style={{ letterSpacing: "-0.02em" }}>
            Want your <em className="text-amber italic">exact</em> number?
          </h3>
          <p className="max-w-[52ch] mx-auto text-[15px] sm:text-base mb-6 sm:mb-7" style={{ color: "rgba(242, 235, 219, 0.7)" }}>
            There are legal, structured ways to stretch your loan — pledging fixed deposits, income
            restructuring, joint applicant optimisation, CPF allocation. Most people leave money on
            the table because they don&apos;t know these exist.
          </p>
          <Link
            href="/strategy-session"
            className="inline-block bg-amber text-charcoal px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium border border-amber hover:bg-amber-light transition-colors"
          >
            Book a consultation
          </Link>
        </div>
      </main>

      {/* ----- Footnote ----- */}
      <div className="max-w-broadsheet mx-auto px-5 sm:px-10 py-6 sm:py-8 border-t border-charcoal text-[11px] sm:text-xs text-gray-500 leading-relaxed italic">
        Calculations follow MAS Notice 645 (TDSR 55%) and MAS Notice 632/825 (MSR 30%). Bank loan
        eligibility is calculated at the higher of your offered rate or the 4% stress floor. HDB
        loan uses the prevailing concessionary rate. Tenure is capped at age 65 with a max of 30
        years (private) or 25 years (HDB). For joint applicants we use Income Weighted Average Age
        (IWAA). This tool is for indicative planning only — actual bank approval depends on credit
        history, property valuation, and underwriting.
      </div>
    </div>
  );
}

// ===== Result card component =====
type ResultCardProps = {
  kicker: string;
  title: React.ReactNode;
  featured?: boolean;
  maxLoan: number;
  subtitle: string;
  propValue: number;
  tenure: number;
  tenureMax: number;
  onTenureChange: (n: number) => void;
  rate: number;
  rateMin: number;
  rateMax: number;
  rateLabel: string;
  onRateChange: (n: number) => void;
  monthly: number;
};

function ResultCard({
  kicker,
  title,
  featured,
  maxLoan,
  subtitle,
  propValue,
  tenure,
  tenureMax,
  onTenureChange,
  rate,
  rateMin,
  rateMax,
  rateLabel,
  onRateChange,
  monthly,
}: ResultCardProps) {
  return (
    <div
      className={`text-cream border border-charcoal p-7 flex flex-col ${
        featured ? "bg-charcoal-deep" : "bg-charcoal"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.28em] text-amber mb-2">{kicker}</div>
      <h3
        className="font-serif text-[20px] sm:text-[22px] leading-snug mb-5 sm:mb-6"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h3>

      <div className="text-[10px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "rgba(242,235,219,0.6)" }}>
        Max loan
      </div>
      <div
        className="font-serif text-amber leading-none mb-1"
        style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", letterSpacing: "-0.02em" }}
      >
        {fmt(maxLoan)}
      </div>
      <div className="text-[11px] mb-5" style={{ color: "rgba(242,235,219,0.5)" }}>
        {subtitle}
      </div>

      <div className="h-px mb-5" style={{ background: "rgba(242,235,219,0.15)" }} />

      <div className="text-[10px] uppercase tracking-[0.22em] mb-1.5" style={{ color: "rgba(242,235,219,0.6)" }}>
        Implied max property
      </div>
      <div
        className="font-serif text-cream leading-snug mb-0.5"
        style={{ fontSize: "clamp(1.4rem, 3vw, 1.5rem)" }}
      >
        {fmt(propValue)}
      </div>
      <div className="text-[11px] mb-5" style={{ color: "rgba(242,235,219,0.5)" }}>
        at 75% LTV
      </div>

      <div className="h-px mb-5" style={{ background: "rgba(242,235,219,0.15)" }} />

      {/* Tenure slider */}
      <div className="mb-5 sm:mb-4">
        <div className="flex justify-between items-baseline mb-3 sm:mb-2.5">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(242,235,219,0.6)" }}>
            Loan tenure
          </span>
          <span className="font-serif text-amber text-[16px] sm:text-[18px]" style={{ letterSpacing: "-0.01em" }}>
            {tenure} yr
          </span>
        </div>
        <input
          type="range"
          className={styles.range}
          min={5}
          max={tenureMax}
          step={1}
          value={tenure}
          aria-label={`Loan tenure for ${kicker}`}
          onChange={(e) => onTenureChange(parseInt(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-[10px]" style={{ color: "rgba(242,235,219,0.4)" }}>
          <span>5 yr</span>
          <span>max {tenureMax}</span>
        </div>
      </div>

      {/* Rate slider */}
      <div className="mb-5">
        <div className="flex justify-between items-baseline mb-3 sm:mb-2.5">
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(242,235,219,0.6)" }}>
            {rateLabel}
          </span>
          <span className="font-serif text-amber text-[16px] sm:text-[18px]" style={{ letterSpacing: "-0.01em" }}>
            {rate.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          className={styles.range}
          min={rateMin}
          max={rateMax}
          step={0.1}
          value={rate}
          aria-label={`${rateLabel} for ${kicker}`}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-[10px]" style={{ color: "rgba(242,235,219,0.4)" }}>
          <span>{rateMin.toFixed(1)}%</span>
          <span>{rateMax.toFixed(1)}%</span>
        </div>
      </div>

      <div
        className="mt-auto pt-4 flex justify-between items-baseline"
        style={{ borderTop: "1px solid rgba(242,235,219,0.15)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(242,235,219,0.6)" }}>
          Monthly
        </span>
        <span className="font-serif text-cream text-[20px] sm:text-[22px]" style={{ letterSpacing: "-0.01em" }}>
          {fmt(monthly)}
        </span>
      </div>
    </div>
  );
}
