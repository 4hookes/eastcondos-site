// Parity check — run with: node --experimental-strip-types lib/safetyMeter.test.mts
// Validates that the TS port matches Excel's default Sazali+Siti scenario.

import { computeVerdict, cpfOAContribution, maxLoan, bsd, netCashProceeds, weightedLoanTerm, type MeterInputs } from "./safetyMeter.ts";

let failures = 0;
function check(label: string, actual: number, expected: number, tolerance = 0.01) {
  const diff = Math.abs(actual - expected);
  const okAbs = diff <= tolerance;
  const okRel = expected !== 0 && diff / Math.abs(expected) <= tolerance;
  const ok = okAbs || okRel;
  const mark = ok ? "PASS" : "FAIL";
  if (!ok) failures++;
  console.log(`[${mark}] ${label}: actual=${actual.toFixed(2)} expected=${expected.toFixed(2)}`);
}

function checkEq(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`[${ok ? "PASS" : "FAIL"}] ${label}: actual="${actual}" expected="${expected}"`);
}

// === Excel default scenario: Sazali + Siti ===
const sazali = { name: "Sazali", age: 35, fixedSalary: 7000, variableAnnual: 7000, obligations: 0, cpfYes: true, oaBalance: 15000 };
const siti = { name: "Siti", age: 35, fixedSalary: 6200, variableAnnual: 7000, obligations: 0, cpfYes: true, oaBalance: 36000 };

const defaultScenario: MeterInputs = {
  buyer1: sazali,
  buyer2: siti,
  cashSavings: 0,
  hdb: { sellingPrice: 770_000, outstandingLoan: 100_000, cpfUsedBuyer1: 150_000, cpfUsedBuyer2: 150_000 },
  target: { price: 1_000_000, voluntaryTopUp: 0, earmarked: 0, interestRate: 0.015 },
};

console.log("=== Excel Default Scenario: Sazali + Siti, $1M target ===\n");

// CPF OA contributions — Excel Bio!C11 and D11
// Sazali: $7000 salary, $7000 bonus, age 35. OW=$7000 (under cap), annualOW=$84k, maxAW=102000-84000=$18k,
// checkAW=$7k, totalWages=$91k, rate=0.23, monthlyOA=$91000*0.23/12 = $1744.17
check("Sazali CPF OA monthly", cpfOAContribution(35, 7000, 7000), 1744, 2);
// Siti: $6200 salary, $7000 bonus, age 35. OW=$6200, annualOW=$74400, maxAW=$27600, checkAW=$7k, totalWages=$81400, rate=0.23, monthlyOA=$81400*0.23/12 = $1560.17
check("Siti CPF OA monthly", cpfOAContribution(35, 6200, 7000), 1560, 2);

// Weighted loan term — both age 35, so 65-35=30
check("Weighted loan term", weightedLoanTerm(sazali, siti), 30, 0);

// Max loan — PV at 4%, 30yr, monthly budget = (7000+6200)*0.55 = $7260
// PV = 7260 * (1.0033^360 - 1) / (0.0033 * 1.0033^360)  ≈ $1,520,000ish
const loanEst = maxLoan(sazali, siti);
console.log(`Max loan: ${loanEst.toFixed(2)} (Excel C3)`);
check("Max loan (approx)", loanEst, 1_520_000, 0.05); // 5% tolerance — PV formula precision
const ceiling = Math.round(loanEst / 0.75 / 10_000) * 10_000;
console.log(`Property ceiling: ${ceiling}`);

// BSD for $1M = (1,000,000 - 360k) * 0.03 + 5400 = 640k * 0.03 + 5400 = 19200 + 5400 = $24,600
check("BSD at $1M", bsd(1_000_000), 24_600, 1);
check("BSD at $180k", bsd(180_000), 1800, 1);
check("BSD at $1.5M", bsd(1_500_000), 44_600, 1);
check("BSD at $3M", bsd(3_000_000), 119_600, 1);

// Net cash proceeds = 770000 - 100000 - 150000 - 150000 - 1000 - (770000*0.02*1.09)
// Agency = 770000 * 0.02 * 1.09 = 16,786
// Net = 770000 - 100000 - 300000 - 1000 - 16786 = 352,214
check("Net cash proceeds", netCashProceeds(defaultScenario.hdb), 352_214, 1);

// === Full verdict run ===
console.log("\n=== Verdict for default scenario ===\n");
const v = computeVerdict(defaultScenario);
console.log(`Persona: ${v.persona}`);
console.log(`Score: ${v.score}/100`);
console.log(`Tier: ${v.tierLabel}`);
console.log(`Bank eligibility: ${v.bankEligibility.toFixed(0)}`);
console.log(`Ceiling: ${v.maxPropertyCeiling}`);
console.log(`Loan utilization: ${(v.loanUtilization * 100).toFixed(1)}%`);
console.log(`BSD: ${v.buyerStampDuty}`);
console.log(`Monthly installment: ${v.monthlyInstallment.toFixed(2)}`);
console.log(`CPF monthly deduction: ${v.cpfMonthlyDeduction}`);
console.log(`Cash top-up: ${v.cashTopUpRequired.toFixed(2)}`);
console.log(`Runway: ${v.runwayYears.toFixed(2)} years`);
console.log(`TDSR: ${(v.tdsr * 100).toFixed(1)}%`);
console.log(`TopUp ratio: ${(v.topUpRatio * 100).toFixed(1)}%`);
console.log(`Final cash: ${v.finalCash.toFixed(2)}`);
console.log(`Final CPF: ${v.finalCPF.toFixed(2)}`);
console.log(`\n--- Letter ---\n${v.letter}\n`);

// Verify $1M scenario doesn't hit upfront shortfall
checkEq("No upfront shortfall for $1M scenario", v.upfrontShortfall, false);

// === Tier variants ===
console.log("\n=== Tier variants ===\n");

// Red-Flag Raj: huge price, tiny income
const rajInputs: MeterInputs = {
  ...defaultScenario,
  target: { ...defaultScenario.target, price: 5_000_000 },
};
const raj = computeVerdict(rajInputs);
console.log(`$5M target → persona: ${raj.persona} (expect red-flag-raj)`);
checkEq("Raj persona", raj.persona, "red-flag-raj");

// Hoarder Hafiz: low target, massive cash
const hafizInputs: MeterInputs = {
  ...defaultScenario,
  cashSavings: 500_000,
  target: { ...defaultScenario.target, price: 800_000 },
};
const hafiz = computeVerdict(hafizInputs);
console.log(`$800k target, $500k savings → persona: ${hafiz.persona} (expect hoarder-hafiz or balanced)`);

// Stretched Steve (score < 50) — high price, thin runway
const steveInputs: MeterInputs = {
  ...defaultScenario,
  target: { ...defaultScenario.target, price: 1_600_000 },
};
const steve = computeVerdict(steveInputs);
console.log(`$1.6M target → persona: ${steve.persona}, score ${steve.score}`);

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECKS FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
