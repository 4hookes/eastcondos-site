// Sanity check — run with: node --experimental-strip-types lib/progressivePayment.test.mts
// Verifies BSD progressive rates, the 10-stage schedule, and the buyer/loan split logic.

import { compute, bsd, absd, monthlyInstalment, DEFAULT_PPC_INPUTS, NPS_STAGES } from "./progressivePayment.ts";

let failures = 0;
function check(label: string, actual: number, expected: number, tolerance = 0.5) {
  const diff = Math.abs(actual - expected);
  const okAbs = diff <= tolerance;
  const okRel = expected !== 0 && diff / Math.abs(expected) <= 0.01; // within 1%
  const ok = okAbs || okRel;
  if (!ok) failures++;
  console.log(`[${ok ? "PASS" : "FAIL"}] ${label}: actual=${actual.toFixed(2)} expected≈${expected.toFixed(2)}`);
}
function checkEq(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`[${ok ? "PASS" : "FAIL"}] ${label}: actual=${String(actual)} expected=${String(expected)}`);
}

console.log("=== BSD progressive rates ===");
// Known anchor: BSD on $1M = $24,600 (well-known SG figure)
//   1% × 180k = 1,800
// + 2% × 180k = 3,600  (cum 5,400)
// + 3% × 640k = 19,200 (cum 24,600)
check("BSD on $1M = $24,600", bsd(1_000_000), 24_600);
// $2M = $24,600 + 4% × 500k + 5% × 500k = 24,600 + 20,000 + 25,000 = $69,600
check("BSD on $2M = $69,600", bsd(2_000_000), 69_600);
// $1.5M = $24,600 + 4% × 500k = $44,600
check("BSD on $1.5M = $44,600", bsd(1_500_000), 44_600);
check("BSD on $500k = $9,600", bsd(500_000), 1_800 + 3_600 + 4_200); // 1%×180k + 2%×180k + 3%×140k = 9,600
check("BSD on $0 = 0", bsd(0), 0);

console.log("\n=== ABSD ===");
check("SC 1st = 0", absd(2_000_000, "sc-1st"), 0);
check("SC 2nd = 20% × $2M = 400k", absd(2_000_000, "sc-2nd"), 400_000);
check("Foreigner = 60% × $2M = 1.2M", absd(2_000_000, "foreigner"), 1_200_000);

console.log("\n=== Schedule sums to 100% ===");
const totalPct = NPS_STAGES.reduce((s, st) => s + st.pct, 0);
check("10 stages total 100%", totalPct, 100);
checkEq("Stage 1 is cash-only", NPS_STAGES[0].cashOnly === true, true);
checkEq("Stage 2 is not cash-only", NPS_STAGES[1].cashOnly === true, false);

console.log("\n=== Default scenario: $2M, 75% LTV, SC 1st ===");
const r = compute(DEFAULT_PPC_INPUTS);
check("downpayment = 25% × $2M", r.downpayment, 500_000);
check("loan = 75% × $2M", r.loan, 1_500_000);
check("BSD = $69,600", r.bsd, 69_600);
check("ABSD = 0 (SC 1st)", r.absd, 0);
check("total cash/CPF = downpayment + stamps", r.totalBuyerCashCpf, 500_000 + 69_600);

// Schedule arithmetic — totals should sum to price; downpayment vs loan split.
const sumTotals = r.schedule.reduce((s, x) => s + x.totalAtStage, 0);
const sumBuyer = r.schedule.reduce((s, x) => s + x.buyerOutlay, 0);
const sumLoan = r.schedule.reduce((s, x) => s + x.loanDisbursed, 0);
check("schedule totals to price", sumTotals, 2_000_000);
check("buyer outlay totals to downpayment", sumBuyer, 500_000);
check("loan disbursements total to loan", sumLoan, 1_500_000);

// First three stages cover the downpayment (5% + 15% + 10% = 30%, exceeds 25%).
// Stage 1: 100k buyer, 0 loan
// Stage 2: 300k buyer, 0 loan
// Stage 3: 100k buyer (to reach 500k downpayment), 100k loan
check("stage 1 = 100k buyer, 0 loan", r.schedule[0].buyerOutlay, 100_000);
check("stage 1 loan = 0", r.schedule[0].loanDisbursed, 0);
check("stage 2 = 300k buyer", r.schedule[1].buyerOutlay, 300_000);
check("stage 3 = 100k buyer (top-up to 25%)", r.schedule[2].buyerOutlay, 100_000);
check("stage 3 loan = 100k (rest of the 10%)", r.schedule[2].loanDisbursed, 100_000);
check("stage 4 onwards: 100% loan", r.schedule[3].buyerOutlay, 0);
check("stage 4 loan = 200k", r.schedule[3].loanDisbursed, 200_000);

// Peak monthly instalment = full P&I on $1.5M @ 1.7% / 30yrs ≈ $5,317
check("peak monthly instalment", r.peakMonthlyInstalment, 5_317, 50);

console.log(`       -> total cash/CPF: S$${Math.round(r.totalBuyerCashCpf).toLocaleString()}`);
console.log(`       -> peak monthly P&I: S$${Math.round(r.peakMonthlyInstalment).toLocaleString()}`);
console.log(`       -> construction interest paid: S$${Math.round(r.constructionInterestPaid).toLocaleString()}`);

console.log("\n=== ABSD scenario: SC 2nd property on $2M ===");
const sc2 = compute({ ...DEFAULT_PPC_INPUTS, buyer: "sc-2nd" });
check("absd = 20% × $2M", sc2.absd, 400_000);
check("total cash/CPF = 500k + 69.6k + 400k", sc2.totalBuyerCashCpf, 500_000 + 69_600 + 400_000);

console.log(`\n${failures === 0 ? "ALL PASS ✓" : `${failures} FAILURE(S) ✗`}`);
if (failures > 0) process.exit(1);
