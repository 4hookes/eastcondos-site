import { fmt, fmtPct } from "./format.ts";

// ===== Types =====
export type BuyerBio = {
  name: string;
  age: number;
  fixedSalary: number;      // monthly
  variableAnnual: number;   // annual bonus
  obligations: number;      // monthly debt obligations
  cpfYes: boolean;
  oaBalance: number;        // current CPF OA balance
};

export type HdbInputs = {
  sellingPrice: number;
  outstandingLoan: number;
  cpfUsedBuyer1: number;
  cpfUsedBuyer2: number;
};

export type TargetInputs = {
  price: number;
  voluntaryTopUp: number;   // monthly cash top-up
  earmarked: number;        // cash set aside for reno/savings
  interestRate: number;     // decimal e.g. 0.015
};

export type MeterInputs = {
  buyer1: BuyerBio;
  buyer2: BuyerBio | null;
  cashSavings: number;
  hdb: HdbInputs;
  target: TargetInputs;
};

export type PersonaSlug =
  | "strategic-sam"
  | "steady-siti"
  | "balanced-bala"
  | "hoarder-hafiz"
  | "stretched-steve"
  | "house-poor-harry"
  | "red-flag-raj";

export type VerdictResult = {
  // Persona
  persona: PersonaSlug;
  tierLabel: string;           // e.g. "Tier 03 · Balanced Upgrader"
  tierColor: string;           // hex
  score: number;               // 0-100

  // Eligibility
  bankEligibility: number;     // max loan in $
  maxPropertyCeiling: number;  // ceiling at 75% LTV
  loanUtilization: number;     // decimal 0-1

  // Upfront costs
  cashDeposit5: number;
  cpfDeposit20: number;
  buyerStampDuty: number;
  legalFees: number;
  totalOutlay: number;

  // Cash + CPF positions
  cashProceedsFromHdb: number;
  finalCash: number;
  finalCPF: number;
  upfrontShortfall: boolean;

  // Monthly math
  loanTermYears: number;
  monthlyInstallment: number;
  cpfMonthlyDeduction: number;
  cashTopUpRequired: number;
  runwayYears: number;

  // Ratios
  tdsr: number;
  topUpRatio: number;
  netCashFlow: number;

  // Letter
  letter: string;
};

// ===== Constants =====
const STRESS_RATE = 0.04;           // MAS 4% floor
const TDSR_LIMIT = 0.55;            // 55% TDSR
const LTV = 0.75;                   // 75% loan-to-value
const CPF_ANNUAL_LIMIT = 102_000;
const OW_MONTHLY_CEILING = 7_400;
const LEGAL_FEES_DEFAULT = 3_000;
const HDB_LEGAL_FEES = 1_000;
const AGENCY_FEE_RATE = 0.02;       // 2% of selling price
const AGENCY_GST_MULTIPLIER = 1.09; // 9% GST on top

// ===== Pure math helpers =====

// Excel's PMT equivalent (returns monthly payment given principal, annual rate, years)
export function pmt(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Excel's PV equivalent (returns principal given monthly payment, annual rate, years)
export function pv(monthlyPayment: number, annualRate: number, years: number): number {
  if (monthlyPayment <= 0 || years <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  return (monthlyPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
}

// CPF OA monthly contribution — ports Bio!C11 LET formula
export function cpfOAContribution(age: number, monthlySalary: number, annualBonus: number): number {
  if (monthlySalary <= 0) return 0;
  const checkOW = Math.min(monthlySalary, OW_MONTHLY_CEILING);
  const annualOW = checkOW * 12;
  const maxAW = Math.max(0, CPF_ANNUAL_LIMIT - annualOW);
  const checkAW = Math.min(annualBonus, maxAW);
  const totalWages = annualOW + checkAW;
  let rate = 0.01;
  if (age <= 35) rate = 0.23;
  else if (age <= 45) rate = 0.21;
  else if (age <= 50) rate = 0.19;
  else if (age <= 55) rate = 0.15;
  else if (age <= 60) rate = 0.115;
  else if (age <= 65) rate = 0.08;
  else if (age <= 70) rate = 0.05;
  const monthlyOA = (totalWages * rate) / 12;
  return Math.round(monthlyOA);
}

// Income-weighted age → loan term (Affordability!C18)
export function weightedLoanTerm(b1: BuyerBio, b2: BuyerBio | null): number {
  const inc1 = b1.fixedSalary + (b1.variableAnnual * 0.7) / 12;
  if (!b2) {
    return Math.min(30, 65 - Math.ceil(b1.age));
  }
  const inc2 = b2.fixedSalary + (b2.variableAnnual * 0.7) / 12;
  const totalInc = inc1 + inc2;
  if (totalInc <= 0) return 0;
  const weightedAge = (b1.age * inc1 + b2.age * inc2) / totalInc;
  return Math.min(30, 65 - Math.ceil(weightedAge));
}

// Simple sum of buyer fixed salaries
function sumFixed(b1: BuyerBio, b2: BuyerBio | null): number {
  return b1.fixedSalary + (b2?.fixedSalary ?? 0);
}
function sumObligations(b1: BuyerBio, b2: BuyerBio | null): number {
  return b1.obligations + (b2?.obligations ?? 0);
}
function sumCPFUsed(hdb: HdbInputs): number {
  return hdb.cpfUsedBuyer1 + hdb.cpfUsedBuyer2;
}
function sumOABalances(b1: BuyerBio, b2: BuyerBio | null): number {
  return b1.oaBalance + (b2?.oaBalance ?? 0);
}
function sumCPFMonthly(b1: BuyerBio, b2: BuyerBio | null): number {
  const c1 = b1.cpfYes ? cpfOAContribution(b1.age, b1.fixedSalary, b1.variableAnnual) : 0;
  const c2 = b2 && b2.cpfYes ? cpfOAContribution(b2.age, b2.fixedSalary, b2.variableAnnual) : 0;
  return c1 + c2;
}

// Max loan via PV — ports Affordability!C3 LET formula
export function maxLoan(b1: BuyerBio, b2: BuyerBio | null): number {
  const totalSalary = sumFixed(b1, b2);
  if (totalSalary === 0) return 0;
  const obligations = sumObligations(b1, b2);
  const years = weightedLoanTerm(b1, b2);
  if (years <= 0) return 0;
  const monthlyBudget = totalSalary * TDSR_LIMIT - obligations;
  if (monthlyBudget <= 0) return 0;
  return Math.max(0, pv(monthlyBudget, STRESS_RATE, years));
}

// Buyer Stamp Duty (tiered) — ports Safety Meter!B10
export function bsd(price: number): number {
  if (price <= 0) return 0;
  if (price <= 180_000) return price * 0.01;
  if (price <= 360_000) return (price - 180_000) * 0.02 + 1_800;
  if (price <= 1_000_000) return (price - 360_000) * 0.03 + 5_400;
  if (price <= 1_500_000) return (price - 1_000_000) * 0.04 + 24_600;
  if (price <= 3_000_000) return (price - 1_500_000) * 0.05 + 44_600;
  return (price - 3_000_000) * 0.06 + 119_600;
}

// Net cash proceeds from HDB sale (after CPF refund + fees) — ports My HDB!C13
export function netCashProceeds(hdb: HdbInputs): number {
  if (hdb.sellingPrice <= 0) return 0;
  const agency = hdb.sellingPrice * AGENCY_FEE_RATE * AGENCY_GST_MULTIPLIER;
  return (
    hdb.sellingPrice -
    hdb.outstandingLoan -
    sumCPFUsed(hdb) -
    HDB_LEGAL_FEES -
    agency
  );
}

// ===== Persona tier metadata =====
const TIERS: Record<PersonaSlug, { label: string; color: string; tagline: string; letter: string; symbol: string }> = {
  "strategic-sam": {
    label: "Tier 01 · Elite Strategist",
    color: "#2F8F5E",
    tagline: "Max leverage, full runway. The textbook upgrader.",
    letter: "S",
    symbol: "crown",
  },
  "steady-siti": {
    label: "Tier 02 · Robust Plan",
    color: "#2F8F5E",
    tagline: "Safe, efficient, and on track.",
    letter: "S",
    symbol: "compass",
  },
  "balanced-bala": {
    label: "Tier 03 · Balanced Upgrader",
    color: "#3B6BA5",
    tagline: "Standard upgrader. Safe and sustainable.",
    letter: "B",
    symbol: "scales",
  },
  "hoarder-hafiz": {
    label: "Tier 04 · Lazy Capital",
    color: "#B8902F",
    tagline: "Too safe. Cash is losing to inflation.",
    letter: "H",
    symbol: "hourglass",
  },
  "stretched-steve": {
    label: "Tier 05 · High Commitment",
    color: "#C26A2A",
    tagline: "Tight ropes. One setback away from trouble.",
    letter: "S",
    symbol: "tightrope",
  },
  "house-poor-harry": {
    label: "Tier 06 · Lifestyle Risk",
    color: "#A13E3E",
    tagline: "Approved on paper. Broke in real life.",
    letter: "H",
    symbol: "crack",
  },
  "red-flag-raj": {
    label: "Tier 07 · Hard Stop",
    color: "#7A2A2A",
    tagline: "The numbers don't work — yet.",
    letter: "R",
    symbol: "stop",
  },
};

export function getTierMeta(slug: PersonaSlug) {
  return TIERS[slug];
}

// ===== Master verdict computation =====
// Ports Safety Meter A34 (verdict) + B39 (letter)
export function computeVerdict(inputs: MeterInputs): VerdictResult {
  const { buyer1, buyer2, cashSavings, hdb, target } = inputs;

  // --- Eligibility
  const bankEligibility = maxLoan(buyer1, buyer2);
  const maxPropertyCeiling = Math.round(bankEligibility / LTV / 10_000) * 10_000;

  // --- Upfront costs
  const cashDeposit5 = target.price * 0.05;
  const cpfDeposit20 = target.price * 0.20;
  const buyerStampDuty = bsd(target.price);
  const legalFees = LEGAL_FEES_DEFAULT;
  const totalOutlay = cashDeposit5 + cpfDeposit20 + buyerStampDuty + legalFees;

  // --- Cash + CPF positions
  const cashProceedsFromHdb = netCashProceeds(hdb);
  const totalCashIn = cashProceedsFromHdb + cashSavings;
  const totalCPFAvailable = sumOABalances(buyer1, buyer2) + sumCPFUsed(hdb);

  const loan = target.price * LTV;
  const loanShortfall = bankEligibility - loan; // negative = short
  const loanGap = loanShortfall < 0 ? Math.abs(loanShortfall) : 0;

  // Final CPF — MAX(0, TotalCPF - (deposit + BSD + legal + loanGap))
  const cpfUsed = cpfDeposit20 + buyerStampDuty + legalFees + loanGap;
  const finalCPF = Math.max(0, totalCPFAvailable - cpfUsed);

  // Cash top-up if CPF insufficient
  const cashTopUpNeeded = Math.max(0, cpfUsed - totalCPFAvailable);
  const finalCash =
    totalCashIn - cashDeposit5 - cashTopUpNeeded - target.earmarked;

  const upfrontShortfall = finalCash < 0;

  // --- Monthly math
  const loanTermYears = weightedLoanTerm(buyer1, buyer2);
  const monthlyInstallment = pmt(loan, target.interestRate, loanTermYears);
  const cpfMonthlyDeduction = sumCPFMonthly(buyer1, buyer2);
  const cashTopUpRequired = Math.max(0, monthlyInstallment - target.voluntaryTopUp - cpfMonthlyDeduction);

  // --- Reserves
  const cpfReserves = finalCPF;
  const cashReserves = Math.max(0, finalCash);
  const runwayYears =
    cashTopUpRequired <= 0
      ? 99
      : (cpfReserves + cashReserves) / cashTopUpRequired / 12;

  // --- Ratios for scoring
  const fixedInc = sumFixed(buyer1, buyer2);
  const varInc = ((buyer1.variableAnnual + (buyer2?.variableAnnual ?? 0)) * 0.7) / 12;
  const grossIncome = fixedInc + varInc;
  const obligations = sumObligations(buyer1, buyer2);
  const cpfDeduct = cpfMonthlyDeduction;
  const netCashFlow = grossIncome - obligations - cpfDeduct;

  const tdsr = grossIncome > 0 ? monthlyInstallment / grossIncome : 1;
  const topUpRatio =
    netCashFlow <= 0 ? 100 : cashTopUpRequired <= 0 ? 0 : cashTopUpRequired / netCashFlow;

  const loanUtilization = maxPropertyCeiling > 0 ? target.price / maxPropertyCeiling : 0;

  // --- Scoring (A34 LET)
  const loanScore =
    loanUtilization > 0.95 ? 30 : loanUtilization >= 0.75 ? 40 : 30;

  const reserveScore =
    runwayYears < 0.5 ? 0 : runwayYears < 2 ? 15 : 30;

  const cashFlowScore =
    cashTopUpRequired <= 0
      ? 30
      : topUpRatio <= 0.15
        ? 25
        : topUpRatio <= 0.25
          ? 20
          : topUpRatio <= 0.35
            ? 10
            : 0;

  const disciplinePenalty = cpfReserves <= 0 ? -5 : 0;
  let totalScore = Math.round(loanScore + reserveScore + cashFlowScore + disciplinePenalty);
  if (totalScore < 0) totalScore = 0;
  if (totalScore > 100) totalScore = 100;

  // --- Persona assignment (matches Safety Meter A34 IF cascade)
  let persona: PersonaSlug;
  if (upfrontShortfall) {
    persona = "red-flag-raj";
  } else if (tdsr > TDSR_LIMIT) {
    persona = "red-flag-raj";
  } else if (netCashFlow < cashTopUpRequired) {
    persona = "red-flag-raj";
  } else if (topUpRatio > 0.35) {
    persona = "house-poor-harry";
  } else if (
    runwayYears >= 3 &&
    runwayYears <= 5 &&
    loanUtilization >= 0.85 &&
    topUpRatio <= 0.2
  ) {
    persona = "strategic-sam";
    totalScore = Math.max(90, totalScore);
  } else if (runwayYears > 5 && loanUtilization < 0.75) {
    persona = "hoarder-hafiz";
  } else if (totalScore >= 80) {
    persona = "steady-siti";
  } else if (totalScore >= 50) {
    persona = "balanced-bala";
  } else {
    persona = "stretched-steve";
  }

  const tierMeta = TIERS[persona];

  // --- Letter (ports B39)
  const letter = buildLetter({
    b1Name: buyer1.name || "there",
    b2Name: buyer2?.name,
    persona,
    totalScore,
    upfrontShortfall,
    tdsr,
    netCashFlow,
    cashTopUpRequired,
    topUpRatio,
    runwayYears,
    upfrontGap: Math.abs(Math.min(0, finalCash)),
  });

  return {
    persona,
    tierLabel: tierMeta.label,
    tierColor: tierMeta.color,
    score: totalScore,
    bankEligibility,
    maxPropertyCeiling,
    loanUtilization,
    cashDeposit5,
    cpfDeposit20,
    buyerStampDuty,
    legalFees,
    totalOutlay,
    cashProceedsFromHdb,
    finalCash,
    finalCPF,
    upfrontShortfall,
    loanTermYears,
    monthlyInstallment,
    cpfMonthlyDeduction,
    cashTopUpRequired,
    runwayYears,
    tdsr,
    topUpRatio,
    netCashFlow,
    letter,
  };
}

// ===== Elfi's Letter Builder =====
function buildLetter(args: {
  b1Name: string;
  b2Name?: string;
  persona: PersonaSlug;
  totalScore: number;
  upfrontShortfall: boolean;
  tdsr: number;
  netCashFlow: number;
  cashTopUpRequired: number;
  topUpRatio: number;
  runwayYears: number;
  upfrontGap: number;
}): string {
  const salutation = args.b2Name
    ? `Dear ${args.b1Name} and ${args.b2Name},`
    : `Dear ${args.b1Name},`;

  let verdictBody = "";
  if (args.upfrontShortfall) {
    verdictBody = `We hit a hard wall immediately. You are short ${fmt(args.upfrontGap)} upfront.`;
  } else if (args.tdsr > TDSR_LIMIT) {
    verdictBody = `The bank won't approve this loan size based on your income (TDSR > 55%).`;
  } else if (args.netCashFlow < args.cashTopUpRequired) {
    verdictBody = `You are approved, but you will bleed cash every month because the installment is higher than your net cash flow.`;
  } else if (args.topUpRatio > 0.35) {
    verdictBody = `You are at risk of being 'House Poor'. Using ${fmtPct(args.topUpRatio)} of your disposable cash just for the house leaves too little for life.`;
  } else if (args.totalScore < 50) {
    verdictBody = `You can buy this, but your safety runway is thin (< 2 Years). You MUST keep 6 months of liquid cash as a buffer.`;
  } else {
    verdictBody = `The hard part is done — the finances work. You have a safe runway and efficient leverage.`;
  }

  const isRisky =
    args.upfrontShortfall ||
    args.tdsr > TDSR_LIMIT ||
    args.netCashFlow < args.cashTopUpRequired ||
    args.topUpRatio > 0.35;

  const strategyBody = isRisky
    ? `\n\nSince the numbers are tight, we should pause on property selection and focus on fixing the gap. To make this work, we usually advise clients to:\n1. Increase Cash: Can we sell your HDB higher? Or find external funds?\n2. Lower Expectations: We may need to adjust the Target Price to a safer level.\n3. Boost Eligibility: Can we document additional income sources? Or use 'Pledging' (Show Funds) to bridge the loan shortfall?`
    : `\n\nSince the numbers make sense, the next challenge is finding the *right* asset. We use our EastCondos 11-Point Profit Framework to filter for properties that protect your capital, and detailed Timeline Planning to ensure you are never homeless.`;

  const closingBody = `\n\nWhatever the score, you have taken the first crucial step. The next step is to speak to someone who knows the ins and outs.\n\nMe and my team do HDB-to-Condo upgrades for a living. Feel free to WhatsApp us to brainstorm this result — we read and respond to every message personally.`;

  const signOff = `\n\nBest regards,\nElfi`;

  return `${salutation}\n\n${verdictBody}${strategyBody}${closingBody}${signOff}`;
}
