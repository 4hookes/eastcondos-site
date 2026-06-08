// New Launch vs Resale — "The Real Gap" planner math.
// Pure, framework-free functions so the page and the PDF export share ONE source of truth.
//
// The core idea: the headline price gap between a new launch and a resale flatters the
// resale. Once you normalise the asset (lease + usable space) and account for what you'd
// actually spend carrying each home over the years you wait for the new launch to be built,
// the real gap is smaller — and the calculator shows exactly how it closes, line by line.
//
// Lease normalisation uses the official URA "Leasehold values as a percentage of freehold
// value" table (DC Circular dc22-08, Appendix 2) — the version of "Bala's Table" the SLA
// applies to lease top-ups. It is the authoritative figure, not an approximation.

export type TenureType = "leasehold99" | "freehold";

// Remaining term (years) -> value as a % of the equivalent freehold.
// Source: URA DC Circular dc22-08 Appendix 2 (https://www.ura.gov.sg).
export const URA_LEASEHOLD_TABLE: Record<number, number> = {
  1: 3.8, 2: 7.5, 3: 10.9, 4: 14.1, 5: 17.1, 6: 19.9, 7: 22.7, 8: 25.2, 9: 27.7, 10: 30.0,
  11: 32.2, 12: 34.3, 13: 36.3, 14: 38.2, 15: 40.0, 16: 41.8, 17: 43.4, 18: 45.0, 19: 46.6, 20: 48.0,
  21: 49.5, 22: 50.8, 23: 52.1, 24: 53.4, 25: 54.6, 26: 55.8, 27: 56.9, 28: 58.0, 29: 59.0, 30: 60.0,
  31: 61.0, 32: 61.9, 33: 62.8, 34: 63.7, 35: 64.6, 36: 65.4, 37: 66.2, 38: 67.0, 39: 67.7, 40: 68.5,
  41: 69.2, 42: 69.8, 43: 70.5, 44: 71.2, 45: 71.8, 46: 72.4, 47: 73.0, 48: 73.6, 49: 74.1, 50: 74.7,
  51: 75.2, 52: 75.7, 53: 76.2, 54: 76.7, 55: 77.3, 56: 77.9, 57: 78.5, 58: 79.0, 59: 79.5, 60: 80.0,
  61: 80.6, 62: 81.2, 63: 81.8, 64: 82.4, 65: 83.0, 66: 83.6, 67: 84.2, 68: 84.5, 69: 85.4, 70: 86.0,
  71: 86.5, 72: 87.0, 73: 87.5, 74: 88.0, 75: 88.5, 76: 89.0, 77: 89.5, 78: 90.0, 79: 90.5, 80: 91.0,
  81: 91.4, 82: 91.8, 83: 92.2, 84: 92.6, 85: 92.9, 86: 93.3, 87: 93.6, 88: 94.0, 89: 94.3, 90: 94.6,
  91: 94.8, 92: 95.0, 93: 95.2, 94: 95.4, 95: 95.6, 96: 95.7, 97: 95.8, 98: 95.9, 99: 96.0,
};

// A fresh 99-year lease — the new launch baseline on the URA table.
export const FRESH_99_FACTOR = 96.0;

/** Leasehold value as a % of freehold for a given remaining term, interpolated between whole years. */
export function leaseholdFactor(years: number): number {
  if (years >= 99) return FRESH_99_FACTOR;
  if (years <= 1) return URA_LEASEHOLD_TABLE[1];
  const lo = Math.floor(years);
  const hi = Math.ceil(years);
  if (lo === hi) return URA_LEASEHOLD_TABLE[lo];
  const a = URA_LEASEHOLD_TABLE[lo];
  const b = URA_LEASEHOLD_TABLE[hi];
  return a + (b - a) * (years - lo);
}

/** Tenure value factor (% of freehold). Freehold = 100; leasehold uses the URA table. */
export function tenureFactor(type: TenureType, leaseYears: number): number {
  return type === "freehold" ? 100 : leaseholdFactor(leaseYears);
}

/**
 * Interest paid over the first `months` of a standard amortising loan — i.e. the resale,
 * where the whole loan is drawn on day one and interest is charged on the full balance.
 */
export function amortisedInterest(
  principal: number,
  annualRatePct: number,
  termYears: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  const n = Math.round(termYears * 12);
  const m = Math.min(Math.round(months), n);
  if (i === 0) return 0;
  const pmt = (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  const balance = principal * Math.pow(1 + i, m) - pmt * ((Math.pow(1 + i, m) - 1) / i);
  const principalPaid = principal - balance;
  return pmt * m - principalPaid;
}

// Standard Normal Progressive Payment Schedule, expressed as the cumulative fraction of the
// FULL loan drawn at each construction milestone, against the fraction of the build timeline
// elapsed (TOP = the end of the waiting window). The buyer's ~25% equity is paid first, so the
// loan only begins drawing once foundation works start — which is why interest stays low.
const PPS_SCHEDULE: { f: number; drawn: number }[] = [
  { f: 0.0, drawn: 0.0 },
  { f: 0.13, drawn: 0.067 }, // foundation
  { f: 0.25, drawn: 0.2 }, // reinforced-concrete framework
  { f: 0.33, drawn: 0.267 }, // partition walls
  { f: 0.42, drawn: 0.333 }, // roofing / ceiling
  { f: 0.5, drawn: 0.4 }, // electrical, plumbing, internal finishes
  { f: 0.63, drawn: 0.467 }, // car park, roads, drains
  { f: 1.0, drawn: 0.8 }, // TOP
];

function drawnFraction(f: number): number {
  if (f <= 0) return 0;
  const last = PPS_SCHEDULE[PPS_SCHEDULE.length - 1];
  if (f >= 1) return last.drawn;
  for (let k = 1; k < PPS_SCHEDULE.length; k++) {
    if (f <= PPS_SCHEDULE[k].f) {
      const a = PPS_SCHEDULE[k - 1];
      const b = PPS_SCHEDULE[k];
      return a.drawn + (b.drawn - a.drawn) * ((f - a.f) / (b.f - a.f));
    }
  }
  return last.drawn;
}

/**
 * Interest accrued on a new launch during construction. The loan ramps up stage by stage
 * under the progressive payment scheme, so interest is charged only on the disbursed portion.
 */
export function progressiveInterest(
  fullLoan: number,
  annualRatePct: number,
  windowYears: number,
): number {
  if (fullLoan <= 0 || windowYears <= 0 || annualRatePct <= 0) return 0;
  const months = Math.round(windowYears * 12);
  const monthlyRate = annualRatePct / 100 / 12;
  let interest = 0;
  for (let t = 1; t <= months; t++) {
    interest += fullLoan * drawnFraction(t / months) * monthlyRate;
  }
  return interest;
}

// CPF Ordinary Account interest rate — the rate that accrues on CPF used for property and
// must be refunded to your own CPF on sale.
export const CPF_OA_RATE = 2.5;

/** Standard monthly instalment (P&I) for an amortising loan. */
export function monthlyInstalment(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (i === 0) return principal / n;
  return (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

/**
 * Accrued interest that builds (compounding monthly at annualRatePct) on a stream of monthly
 * CPF outflows. Used to compare how much CPF each path ties up over the waiting window — the
 * resale services a full loan from day one, the new launch only its progressive draw-down.
 */
export function accruedInterestOnStream(monthlyAmounts: number[], annualRatePct: number): number {
  const r = annualRatePct / 100 / 12;
  let cumulative = 0;
  let accrued = 0;
  for (const amt of monthlyAmounts) {
    cumulative += amt;
    accrued += cumulative * r;
  }
  return accrued;
}

export interface PlannerInputs {
  nlPrice: number; // new launch purchase price
  nlSize: number; // new launch strata area (sqft, post-harmonisation = ~all usable)
  resalePrice: number; // resale purchase price
  resaleSize: number; // resale strata area (sqft, may include phantom area)
  resaleTenureType: TenureType; // leasehold99 (with years left) or freehold
  resaleLeaseYears: number; // remaining lease if leasehold
  horizonYears: number; // years until the new launch is ready (the wait window)
  liveAfterTopYears: number; // years you'll live in the new launch after TOP, before selling
  ratePct: number; // mortgage rate p.a.
  ltvPct: number; // loan-to-value
  renting: boolean; // rent elsewhere during construction, or stay put (no extra rent)
  rentMonthly: number; // rent while waiting
  resaleReno: number; // resale renovation budget
  nlReno: number; // new launch fit-out budget
  resaleMaintMonthly: number; // resale maintenance / sinking fund per month
  resalePropTaxAnnual: number; // resale property tax per year
  phantomPct: number; // share of resale area that is non-usable (AC ledge, bay window, planter)
  cpfMonthly: number; // CPF $ put toward the monthly instalment (0 = pay cash; accrues 2.5%)
}

export const DEFAULT_INPUTS: PlannerInputs = {
  nlPrice: 2_000_000,
  nlSize: 1000,
  resalePrice: 1_500_000,
  resaleSize: 1100,
  resaleTenureType: "leasehold99",
  resaleLeaseYears: 85,
  horizonYears: 4,
  liveAfterTopYears: 1,
  ratePct: 1.7,
  ltvPct: 75,
  renting: true,
  rentMonthly: 3000,
  resaleReno: 80_000,
  nlReno: 15_000,
  resaleMaintMonthly: 350,
  resalePropTaxAnnual: 3000,
  phantomPct: 7,
  cpfMonthly: 2500,
};

export interface BridgeStep {
  key: string;
  label: string;
  amount: number; // signed effect on the new launch premium (negative = narrows the gap)
  running: number; // running gap after this step
  hint: string;
}

export interface PlannerResult {
  apparentGap: number; // nlPrice - resalePrice (what the client sees)
  realGap: number; // after lease reset + carrying costs over the window
  resaleFresh99: number; // resale price restated on a fresh 99-year basis
  leaseAdjustment: number; // resaleFresh99 - resalePrice (+ narrows gap, - for freehold widens)
  rentCost: number;
  renoDelta: number;
  maintCost: number; // resale maintenance over the full holding window
  nlMaintCost: number; // new launch maintenance — only during the live-in years (post-TOP)
  propTaxCost: number; // resale property tax over the full holding window
  nlPropTaxCost: number; // new launch property tax during live-in, scaled by NL/resale price ratio
  totalYears: number; // wait + live (the comparison window for both homes)
  resaleInterest: number;
  nlInterest: number;
  interestDelta: number;
  resaleCPFAccrued: number;
  nlCPFAccrued: number;
  cpfAccruedDelta: number;
  nlLoan: number;
  resaleLoan: number;
  // PSF / space
  nlPsf: number;
  resalePsfHeadline: number;
  resaleTruePsf: number; // fresh-lease price over usable area
  resaleUsableSize: number;
  // carrying totals over the window (excludes purchase price)
  nlCarry: number;
  resaleCarry: number;
  bridge: BridgeStep[];
  inputs: PlannerInputs;
}

const LOAN_TERM_YEARS = 30;

export function compute(input: PlannerInputs): PlannerResult {
  const apparentGap = input.nlPrice - input.resalePrice;

  // 1) Reset the lease to a fresh 99 years so the two prices are like-for-like.
  const resaleFactor = tenureFactor(input.resaleTenureType, input.resaleLeaseYears);
  const resaleFresh99 = input.resalePrice * (FRESH_99_FACTOR / resaleFactor);
  const leaseAdjustment = resaleFresh99 - input.resalePrice;

  // 2) Carrying costs over the full holding window.
  // Both paths are held for the SAME total years (wait + live), so the comparison is apples to apples:
  //   - Resale: lives in from day one — pays everything for (wait + live) years.
  //   - New launch: pays rent during the wait, then maintenance / property tax / full-loan interest
  //     only after TOP, for the live-in years.
  const waitYears = Math.max(0, input.horizonYears);
  const liveYears = Math.max(0, input.liveAfterTopYears);
  const totalYears = waitYears + liveYears;
  const waitMonths = waitYears * 12;
  const liveMonths = liveYears * 12;
  const totalMonths = waitMonths + liveMonths;

  const rentCost = input.renting ? input.rentMonthly * waitMonths : 0; // rent stops at TOP
  const renoDelta = Math.max(0, input.resaleReno - input.nlReno);

  // Maintenance: resale carries the full window; NL only during the live-in years (assumes similar
  // building grade, per Elfi).
  const maintCost = input.resaleMaintMonthly * totalMonths;
  const nlMaintCost = input.resaleMaintMonthly * liveMonths;

  // Property tax: resale uses its annual figure over the full window. New launch scales the same
  // figure by its price ratio — tax tracks Annual Value, which tracks property value (Elfi).
  const propTaxCost = input.resalePropTaxAnnual * totalYears;
  const priceRatio = input.resalePrice > 0 ? input.nlPrice / input.resalePrice : 1;
  const nlPropTaxCost = input.resalePropTaxAnnual * priceRatio * liveYears;

  // Interest:
  //   - Resale loan amortises from day one over the full window.
  //   - New launch: progressive draw during the wait (small) + amortising on the FULL drawn loan
  //     during the live-in years.
  const resaleLoan = input.resalePrice * (input.ltvPct / 100);
  const nlLoan = input.nlPrice * (input.ltvPct / 100);
  const resaleInterest = amortisedInterest(resaleLoan, input.ratePct, LOAN_TERM_YEARS, totalMonths);
  const nlInterest =
    progressiveInterest(nlLoan, input.ratePct, waitYears) +
    amortisedInterest(nlLoan, input.ratePct, LOAN_TERM_YEARS, liveMonths);
  const interestDelta = resaleInterest - nlInterest;

  // CPF accrued interest: how much CPF each path ties up over the full window. The user enters the
  // CPF they put toward each monthly instalment; each path can only deploy up to what's actually
  // due that month — the resale's full instalment from day one; the NL's small progressive interest
  // while under construction, then full instalment after TOP. (Deposit treated as equal.)
  let resaleCPFAccrued = 0;
  let nlCPFAccrued = 0;
  const cpfMonthly = Math.max(0, input.cpfMonthly);
  if (cpfMonthly > 0 && totalMonths > 0) {
    const monthlyRate = input.ratePct / 100 / 12;
    const resaleInstal = monthlyInstalment(resaleLoan, input.ratePct, LOAN_TERM_YEARS);
    const nlInstal = monthlyInstalment(nlLoan, input.ratePct, LOAN_TERM_YEARS);
    const resaleStream = Array.from({ length: totalMonths }, () => Math.min(cpfMonthly, resaleInstal));
    const nlStream: number[] = [];
    for (let k = 1; k <= waitMonths; k++) {
      const owed = nlLoan * drawnFraction(k / Math.max(1, waitMonths)) * monthlyRate;
      nlStream.push(Math.min(cpfMonthly, owed));
    }
    for (let k = 0; k < liveMonths; k++) nlStream.push(Math.min(cpfMonthly, nlInstal));
    resaleCPFAccrued = accruedInterestOnStream(resaleStream, CPF_OA_RATE);
    nlCPFAccrued = accruedInterestOnStream(nlStream, CPF_OA_RATE);
  }
  const cpfAccruedDelta = resaleCPFAccrued - nlCPFAccrued;

  // 3) Build the bridge from apparent gap to real gap.
  const freehold = input.resaleTenureType === "freehold";
  const steps: Omit<BridgeStep, "running">[] = [
    {
      key: "lease",
      label: freehold ? "Freehold premium" : "Lease Reset Formula™",
      amount: -leaseAdjustment,
      hint: freehold
        ? "A freehold holds value a 99-year new launch can't match, so on equal-tenure terms the gap is actually a touch wider."
        : "Part of the resale's lower price is just less lease. The Lease Reset Formula™ restates it on a fresh 99-year basis (official URA table) so the comparison is fair.",
    },
    {
      key: "reno",
      label: "Renovation you skip on a new launch",
      amount: -renoDelta,
      hint: "A resale usually needs a full renovation; a new launch is move-in ready bar light fit-out.",
    },
    {
      key: "maintenance",
      label: "Maintenance during the wait (resale only)",
      amount: -maintCost,
      hint: "You pay maintenance the day you collect resale keys. A new launch charges nothing until it's built.",
    },
    {
      key: "tax",
      label: "Property tax during the wait (resale only)",
      amount: -propTaxCost,
      hint: "Same story — there's no completed home to tax while the new launch is under construction.",
    },
    {
      key: "interest",
      label: "Interest saved — progressive vs full loan",
      amount: -interestDelta,
      hint: "A resale loan is fully drawn on day one. A new launch draws down stage by stage, so far less interest builds up.",
    },
    ...(cpfMonthly > 0
      ? [
          {
            key: "cpf",
            label: "CPF accrued interest (resale ties up more)",
            amount: -cpfAccruedDelta,
            hint: "You service a resale from CPF from day one, so more CPF is locked up earning the 2.5% you'll repay yourself on sale.",
          },
        ]
      : []),
    {
      key: "rent",
      label: input.renting ? "Rent while the new launch is built" : "Rent (you're keeping your current home)",
      amount: rentCost,
      hint: input.renting
        ? "The one cost that runs the other way — you need a roof while you wait for keys."
        : "You chose to stay in your current home, so there's no extra rent to count.",
    },
  ];

  let running = apparentGap;
  const bridge: BridgeStep[] = steps.map((s) => {
    running += s.amount;
    return { ...s, running };
  });
  // realGap is anchored to the all-in totals (not the bridge), so the headline number always
  // matches what the side-by-side table sums to — including the new launch's post-TOP maintenance,
  // property tax and full-loan interest during the live-in years.
  const nlAllIn =
    input.nlPrice + input.nlReno + nlInterest + rentCost + nlMaintCost + nlPropTaxCost + nlCPFAccrued;
  const resaleAllIn =
    resaleFresh99 + input.resaleReno + resaleInterest + maintCost + propTaxCost + resaleCPFAccrued;
  const realGap = nlAllIn - resaleAllIn;

  // PSF / space (GFA harmonisation).
  const nlPsf = input.nlPrice / input.nlSize;
  const resalePsfHeadline = input.resalePrice / input.resaleSize;
  const resaleUsableSize = input.resaleSize * (1 - input.phantomPct / 100);
  const resaleTruePsf = resaleUsableSize > 0 ? resaleFresh99 / resaleUsableSize : 0;

  const nlCarry = nlInterest + input.nlReno + rentCost + nlMaintCost + nlPropTaxCost;
  const resaleCarry = resaleInterest + input.resaleReno + maintCost + propTaxCost;

  return {
    apparentGap,
    realGap,
    resaleFresh99,
    leaseAdjustment,
    rentCost,
    renoDelta,
    maintCost,
    nlMaintCost,
    propTaxCost,
    nlPropTaxCost,
    totalYears,
    resaleInterest,
    nlInterest,
    interestDelta,
    resaleCPFAccrued,
    nlCPFAccrued,
    cpfAccruedDelta,
    nlLoan,
    resaleLoan,
    nlPsf,
    resalePsfHeadline,
    resaleTruePsf,
    resaleUsableSize,
    nlCarry,
    resaleCarry,
    bridge,
    inputs: input,
  };
}
