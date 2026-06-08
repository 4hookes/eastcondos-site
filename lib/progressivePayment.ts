// Progressive Payment Calculator — Singapore Normal Payment Scheme (URA / BCA).
//
// Models the standard 10-stage NPS payment schedule for a new launch under construction:
// the buyer's downpayment is exhausted first (cash → cash/CPF), then the bank disburses the loan
// tranche by tranche as each construction milestone is reached. Interest is charged only on the
// disbursed portion (interest-only servicing during construction), so monthly instalments stay
// small for years and only ramp up at TOP. That is the whole insight progressive payment teaches.
//
// Pure functions, no UI imports — shared by the calculator page and (potentially) the PDF takeaway.

// ============================ The schedule ============================
// Standard SG NPS percentages — same across all banks (it's the project payment schedule, not the
// loan schedule). Stage 1 is cash-only (booking fee); Stage 2 + onwards may use CPF.
export interface PaymentStage {
  key: string;
  no: number;
  label: string;
  pct: number; // percent of purchase price paid at this stage
  cashOnly?: boolean; // booking fee must be cash, all others can be cash or CPF
  /** Rough month from start (OTP = month 0). Used for the instalment ramp visualisation only. */
  monthRough: (topMonth: number) => number;
}

export const NPS_STAGES: PaymentStage[] = [
  { key: "booking", no: 1, label: "Booking fee (Option to Purchase)", pct: 5, cashOnly: true, monthRough: () => 0 },
  { key: "snp", no: 2, label: "Sign S&P (within 8 weeks of OTP)", pct: 15, monthRough: () => 2 },
  { key: "foundation", no: 3, label: "Foundation works completed", pct: 10, monthRough: (t) => Math.round(t * 0.15) },
  { key: "framework", no: 4, label: "Reinforced concrete framework completed", pct: 10, monthRough: (t) => Math.round(t * 0.30) },
  { key: "walls", no: 5, label: "Partition walls completed", pct: 5, monthRough: (t) => Math.round(t * 0.45) },
  { key: "roof", no: 6, label: "Roofing & ceiling completed", pct: 5, monthRough: (t) => Math.round(t * 0.55) },
  { key: "fixtures", no: 7, label: "Doors, windows, electrical wiring, plumbing", pct: 5, monthRough: (t) => Math.round(t * 0.65) },
  { key: "external", no: 8, label: "Car park, drains, roads completed", pct: 5, monthRough: (t) => Math.round(t * 0.80) },
  { key: "top", no: 9, label: "Temporary Occupation Permit (TOP)", pct: 25, monthRough: (t) => t },
  { key: "csc", no: 10, label: "Certificate of Statutory Completion (CSC) + legal completion", pct: 15, monthRough: (t) => t + 12 },
];

// ============================ Stamp duties ============================
// Buyer's Stamp Duty (BSD) — current progressive rates (Feb 2024 onwards).
const BSD_BRACKETS: { upTo: number; rate: number }[] = [
  { upTo: 180_000, rate: 0.01 },
  { upTo: 360_000, rate: 0.02 },
  { upTo: 1_000_000, rate: 0.03 },
  { upTo: 1_500_000, rate: 0.04 },
  { upTo: 3_000_000, rate: 0.05 },
  { upTo: Infinity, rate: 0.06 },
];

export function bsd(price: number): number {
  if (price <= 0) return 0;
  let prev = 0;
  let total = 0;
  for (const b of BSD_BRACKETS) {
    if (price <= prev) break;
    const taxedHere = Math.min(price, b.upTo) - prev;
    if (taxedHere > 0) total += taxedHere * b.rate;
    prev = b.upTo;
  }
  return total;
}

// ABSD — keyed by buyer profile (residential, latest rates as of Feb 2024).
export type BuyerProfile =
  | "sc-1st"
  | "sc-2nd"
  | "sc-3rd+"
  | "pr-1st"
  | "pr-2nd+"
  | "foreigner";

export const ABSD_RATES: Record<BuyerProfile, number> = {
  "sc-1st": 0,
  "sc-2nd": 0.20,
  "sc-3rd+": 0.30,
  "pr-1st": 0.05,
  "pr-2nd+": 0.30,
  foreigner: 0.60,
};

export const BUYER_PROFILE_LABELS: Record<BuyerProfile, string> = {
  "sc-1st": "Singapore Citizen · 1st property",
  "sc-2nd": "Singapore Citizen · 2nd property (20% ABSD)",
  "sc-3rd+": "Singapore Citizen · 3rd+ property (30% ABSD)",
  "pr-1st": "PR · 1st property (5% ABSD)",
  "pr-2nd+": "PR · 2nd+ property (30% ABSD)",
  foreigner: "Foreigner (60% ABSD)",
};

export function absd(price: number, profile: BuyerProfile): number {
  return price * (ABSD_RATES[profile] ?? 0);
}

// ============================ Mortgage math ============================
export function monthlyInstalment(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (i === 0) return principal / n;
  return (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

// ============================ Inputs / results ============================
export interface PpcInputs {
  price: number;
  ltvPct: number; // 75 typical
  termYears: number; // 30 typical
  ratePct: number; // mortgage rate, p.a.
  yearsToTop: number; // construction window (most launches: 3-4 yrs)
  buyer: BuyerProfile;
}

export const DEFAULT_PPC_INPUTS: PpcInputs = {
  price: 2_000_000,
  ltvPct: 75,
  termYears: 30,
  ratePct: 1.7,
  yearsToTop: 3,
  buyer: "sc-1st",
};

export interface StageRow {
  no: number;
  key: string;
  label: string;
  pctOfPrice: number; // 5, 15, 10 …
  pctCumulative: number;
  monthRough: number; // months from OTP (rough)
  totalAtStage: number; // $ payable at this stage (= price × pct)
  buyerOutlay: number; // $ buyer pays from cash/CPF (downpayment portion)
  loanDisbursed: number; // $ bank disburses
  cumulativeLoan: number; // running loan principal after this stage
  monthlyInterest: number; // interest-only servicing on cumulative loan (during construction)
  /** Once TOP/CSC hits, the loan starts amortising — this is the full P&I for the FINAL drawn loan. */
  fullMonthlyInstalment: number;
  cashOnly: boolean;
}

export interface PpcResult {
  inputs: PpcInputs;
  downpayment: number; // (100-LTV)% × price
  loan: number; // LTV% × price
  bsd: number;
  absd: number;
  stamps: number; // bsd + absd (payable at S&P)
  schedule: StageRow[]; // 10 stages
  totalBuyerCashCpf: number; // downpayment + stamps (excludes loan repayments)
  peakMonthlyInstalment: number; // P&I once fully drawn
  constructionInterestPaid: number; // sum of monthly interest-only over the wait
}

// ============================ Compute ============================
export function compute(input: PpcInputs): PpcResult {
  const price = Math.max(0, input.price);
  const ltv = Math.max(0, Math.min(80, input.ltvPct)) / 100;
  const downpayment = price * (1 - ltv);
  const loan = price * ltv;
  const monthlyRate = input.ratePct / 100 / 12;
  const topMonth = Math.max(1, Math.round(input.yearsToTop * 12));

  const bsdAmt = bsd(price);
  const absdAmt = absd(price, input.buyer);
  const stamps = bsdAmt + absdAmt;

  // Walk the 10 stages, splitting each $ amount between buyer (until downpayment is met) and loan.
  let buyerPaidSoFar = 0;
  let loanDrawnSoFar = 0;
  const schedule: StageRow[] = NPS_STAGES.map((stage) => {
    const amountAtStage = price * (stage.pct / 100);

    // How much of this stage the buyer still has to fund out of their downpayment
    const buyerRemaining = Math.max(0, downpayment - buyerPaidSoFar);
    const buyerOutlay = Math.min(amountAtStage, buyerRemaining);
    const loanPortion = amountAtStage - buyerOutlay;

    buyerPaidSoFar += buyerOutlay;
    loanDrawnSoFar += loanPortion;

    return {
      no: stage.no,
      key: stage.key,
      label: stage.label,
      pctOfPrice: stage.pct,
      pctCumulative: 0, // filled below
      monthRough: stage.monthRough(topMonth),
      totalAtStage: amountAtStage,
      buyerOutlay,
      loanDisbursed: loanPortion,
      cumulativeLoan: loanDrawnSoFar,
      monthlyInterest: loanDrawnSoFar * monthlyRate,
      fullMonthlyInstalment: 0, // filled below
      cashOnly: stage.cashOnly === true,
    };
  });

  let cum = 0;
  for (const row of schedule) {
    cum += row.pctOfPrice;
    row.pctCumulative = cum;
  }

  const fullMonthlyInstalment = monthlyInstalment(loan, input.ratePct, input.termYears);
  for (const row of schedule) row.fullMonthlyInstalment = fullMonthlyInstalment;

  // Construction interest paid = the integral of (disbursed loan × monthly rate) over time.
  // Approximation: between stage k and stage k+1, the loan sits at row[k].cumulativeLoan for
  // (months_between) months. Sum them up to TOP.
  let constructionInterestPaid = 0;
  for (let k = 0; k < schedule.length; k++) {
    const row = schedule[k];
    if (row.monthRough >= topMonth) break;
    const next = schedule[k + 1];
    const endMonth = Math.min(next ? next.monthRough : topMonth, topMonth);
    const monthsHere = Math.max(0, endMonth - row.monthRough);
    constructionInterestPaid += row.cumulativeLoan * monthlyRate * monthsHere;
  }

  return {
    inputs: input,
    downpayment,
    loan,
    bsd: bsdAmt,
    absd: absdAmt,
    stamps,
    schedule,
    totalBuyerCashCpf: downpayment + stamps,
    peakMonthlyInstalment: fullMonthlyInstalment,
    constructionInterestPaid,
  };
}
