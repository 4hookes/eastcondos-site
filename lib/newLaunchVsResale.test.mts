// Sanity check — run with: node --experimental-strip-types lib/newLaunchVsResale.test.mts
// Locks the "Real Gap" math against hand-worked figures for the default $2M / $1.5M scenario.

import {
  compute,
  leaseholdFactor,
  tenureFactor,
  amortisedInterest,
  progressiveInterest,
  DEFAULT_INPUTS,
  FRESH_99_FACTOR,
} from "./newLaunchVsResale.ts";

let failures = 0;
function check(label: string, actual: number, expected: number, tolerance = 0.5) {
  const diff = Math.abs(actual - expected);
  const okAbs = diff <= tolerance;
  const okRel = expected !== 0 && diff / Math.abs(expected) <= 0.02; // within 2%
  const ok = okAbs || okRel;
  if (!ok) failures++;
  console.log(`[${ok ? "PASS" : "FAIL"}] ${label}: actual=${actual.toFixed(2)} expected≈${expected.toFixed(2)}`);
}

console.log("=== URA leasehold table ===");
check("99-yr factor", leaseholdFactor(99), 96.0);
check("85-yr factor", leaseholdFactor(85), 92.9);
check("60-yr factor", leaseholdFactor(60), 80.0);
check("freehold factor", tenureFactor("freehold", 0), 100);
check("87.5-yr interpolates", leaseholdFactor(87.5), 93.8, 0.1); // between 93.6 and 94.0

console.log("\n=== Interest mechanics ===");
// Resale: full $1.125M loan @1.7% over 4 yrs should be far more than the progressive new-launch draw.
const resaleInt = amortisedInterest(1_125_000, 1.7, 30, 48);
const nlInt = progressiveInterest(1_500_000, 1.7, 4);
check("resale 4-yr interest", resaleInt, 72_600, 4000);
check("new launch progressive interest", nlInt, 40_200, 3000);
console.log(`       -> resale pays ~${(resaleInt / Math.max(nlInt, 1)).toFixed(1)}x the new launch's construction interest`);

console.log("\n=== Default scenario ($2M NL vs $1.5M resale, 4yr wait + 1yr live, 1.7%) ===");
const r = compute(DEFAULT_INPUTS);
check("apparent gap", r.apparentGap, 500_000);
check("resale fresh-99 price", r.resaleFresh99, 1_500_000 * (FRESH_99_FACTOR / 92.9), 200);
check("lease adjustment narrows gap", r.leaseAdjustment, 50_054, 500);
check("rent cost (4 yrs @ $3k)", r.rentCost, 144_000);
check("reno delta", r.renoDelta, 65_000);
check("total years (wait + live)", r.totalYears, 5);
check("maintenance — resale, 5 yrs", r.maintCost, 21_000); // $350 * 60 mo
check("maintenance — NL, 1 yr post-TOP", r.nlMaintCost, 4_200); // $350 * 12 mo
check("property tax — resale, 5 yrs", r.propTaxCost, 15_000); // $3k * 5
check("property tax — NL, 1 yr scaled by 2M/1.5M", r.nlPropTaxCost, 3_000 * (2 / 1.5), 100);
check("real gap < apparent gap", r.realGap < r.apparentGap ? 1 : 0, 1);
console.log(`       -> apparent $${Math.round(r.apparentGap).toLocaleString()} | real $${Math.round(r.realGap).toLocaleString()}`);

console.log("\n=== CPF accrued interest (resale ties up more) ===");
check("resale accrues more CPF than new launch", r.resaleCPFAccrued > r.nlCPFAccrued ? 1 : 0, 1);
check("cpf delta narrows the gap (positive)", r.cpfAccruedDelta > 0 ? 1 : 0, 1);
const cpfStep = r.bridge.find((b) => b.key === "cpf");
check("cpf bridge step present", cpfStep ? 1 : 0, 1);
const noCpf = compute({ ...DEFAULT_INPUTS, cpfMonthly: 0 });
check("no cpf step when amount is 0", noCpf.bridge.some((b) => b.key === "cpf") ? 0 : 1, 1);
check("cpf off widens real gap slightly", noCpf.realGap > r.realGap ? 1 : 0, 1);
const lowCpf = compute({ ...DEFAULT_INPUTS, cpfMonthly: 1000 });
check("less CPF used → smaller accrued delta", lowCpf.cpfAccruedDelta < r.cpfAccruedDelta ? 1 : 0, 1);
console.log(`       -> resale CPF accrued $${Math.round(r.resaleCPFAccrued).toLocaleString()} vs new launch $${Math.round(r.nlCPFAccrued).toLocaleString()} (delta $${Math.round(r.cpfAccruedDelta).toLocaleString()})`);

console.log("\n=== 'Stay in current home' (no rent) narrows it much more ===");
const stay = compute({ ...DEFAULT_INPUTS, renting: false });
check("no rent counted", stay.rentCost, 0);
check("real gap drops vs renting", stay.realGap < r.realGap ? 1 : 0, 1);
console.log(`       -> staying put: real gap $${Math.round(stay.realGap).toLocaleString()}`);

console.log("\n=== Freehold resale widens the equal-tenure gap ===");
const fh = compute({ ...DEFAULT_INPUTS, resaleTenureType: "freehold" });
check("freehold lease adjustment is negative", fh.leaseAdjustment < 0 ? 1 : 0, 1);

console.log("\n=== Live-in years extend the comparison window ===");
const live5 = compute({ ...DEFAULT_INPUTS, liveAfterTopYears: 5 });
check("totalYears = 9 (4 wait + 5 live)", live5.totalYears, 9);
check("resale maint scales to 9 yrs", live5.maintCost, 350 * 12 * 9);
check("NL maint scales to 5 live yrs", live5.nlMaintCost, 350 * 12 * 5);
// Longer live-in actually WIDENS the gap, because the NL is more expensive so its annual carry
// (bigger loan interest + scaled-up property tax) exceeds the resale's per-year carry. Honest finding.
check("longer live → NL's higher annual carry → gap widens", live5.realGap > r.realGap ? 1 : 0, 1);
console.log(`       -> 5-yr live-in: real gap $${Math.round(live5.realGap).toLocaleString()} (vs $${Math.round(r.realGap).toLocaleString()} at 1 yr)`);

console.log(`\n${failures === 0 ? "ALL PASS ✓" : `${failures} FAILURE(S) ✗`}`);
if (failures > 0) process.exit(1);
