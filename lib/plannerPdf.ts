// Branded one-page PDF takeaway for the New Launch vs Resale planner.
// Drawn programmatically (vector text, not a screenshot) and consumes the same compute()
// result as the page, so the download can never disagree with what's on screen.
// jsPDF is imported dynamically so it stays out of the initial bundle.

import type { PlannerResult } from "./newLaunchVsResale";

const CHARCOAL: [number, number, number] = [26, 26, 46];
const AMBER: [number, number, number] = [184, 144, 47]; // amber-deep — readable on cream
const CREAM: [number, number, number] = [242, 235, 219];
const PAPER: [number, number, number] = [233, 224, 201];
const BODY: [number, number, number] = [55, 65, 81];
const MUTED: [number, number, number] = [107, 107, 107];
const LINE: [number, number, number] = [196, 187, 161];

function money(n: number): string {
  const r = Math.round(n);
  const sign = r < 0 ? "-" : "";
  return `${sign}S$${Math.abs(r).toLocaleString("en-SG")}`;
}

function signed(n: number): string {
  const r = Math.round(n);
  if (r === 0) return "S$0";
  // Plain ASCII "-" — the standard PDF fonts can't encode the Unicode minus (U+2212).
  return `${r < 0 ? "-" : "+"}S$${Math.abs(r).toLocaleString("en-SG")}`;
}

// Builds the branded PDF document. Kept separate from the browser download so it can be
// rendered/verified outside the browser too (the only browser-specific call is doc.save()).
export async function buildPlannerDoc(result: PlannerResult, dateLabel: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 16;
  const right = W - M;
  const inner = W - M * 2;
  const i = result.inputs;
  const renting = i.renting;

  // Page background
  doc.setFillColor(...CREAM);
  doc.rect(0, 0, W, 297, "F");

  let y = M;

  // ---- Masthead ----
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...AMBER);
  doc.text("EASTCONDOS  ·  PROPERTY BY DESIGN", M, y);
  doc.setTextColor(...MUTED);
  doc.text("eastcondos.sg", right, y, { align: "right" });
  y += 3;
  doc.setDrawColor(...CHARCOAL);
  doc.setLineWidth(0.5);
  doc.line(M, y, right, y);
  y += 9;

  // ---- Title ----
  doc.setFont("times", "normal");
  doc.setFontSize(26);
  doc.setTextColor(...CHARCOAL);
  doc.text("New Launch vs Resale", M, y);
  y += 8;
  doc.setFontSize(13);
  doc.setTextColor(...AMBER);
  doc.text("The Real Gap", M, y);
  y += 8;

  // ---- The two homes ----
  const colW = (inner - 6) / 2;
  const boxH = 30;
  const homes = [
    {
      x: M,
      label: "NEW LAUNCH",
      price: money(i.nlPrice),
      lines: [`${i.nlSize.toLocaleString()} sqft  ·  fresh 99-yr lease`, "Move-in ready · no reno · no maintenance yet"],
    },
    {
      x: M + colW + 6,
      label: "RESALE",
      price: money(i.resalePrice),
      lines: [
        `${i.resaleSize.toLocaleString()} sqft  ·  ${
          i.resaleTenureType === "freehold" ? "freehold" : `${i.resaleLeaseYears}-yr lease left`
        }`,
        "Carries from day one · reno needed",
      ],
    },
  ];
  homes.forEach((h) => {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.setFillColor(...PAPER);
    doc.rect(h.x, y, colW, boxH, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...AMBER);
    doc.text(h.label, h.x + 4, y + 6);
    doc.setFont("times", "normal");
    doc.setFontSize(17);
    doc.setTextColor(...CHARCOAL);
    doc.text(h.price, h.x + 4, y + 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...BODY);
    h.lines.forEach((ln, idx) => doc.text(ln, h.x + 4, y + 20 + idx * 4));
  });
  y += boxH + 9;

  // ---- The reveal ----
  doc.setFillColor(...CHARCOAL);
  doc.rect(M, y, inner, 24, "F");
  const halfX = M + inner / 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(230, 223, 207);
  doc.text("WHAT IT LOOKS LIKE YOU SAVE", M + 5, y + 7);
  doc.text(renting ? "WHAT THE NEW LAUNCH REALLY COSTS MORE" : "REAL GAP IF YOU KEEP YOUR HOME", halfX + 5, y + 7);
  doc.setFont("times", "normal");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(money(result.apparentGap), M + 5, y + 17);
  doc.setTextColor(212, 168, 67);
  doc.text(money(result.realGap), halfX + 5, y + 17);
  // divider
  doc.setDrawColor(90, 90, 110);
  doc.setLineWidth(0.3);
  doc.line(halfX, y + 3, halfX, y + 21);
  y += 24 + 9;

  // ---- The bridge ----
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...AMBER);
  doc.text("HOW THE GAP CLOSES", M, y);
  y += 5;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  doc.line(M, y, right, y);
  y += 5;

  const rowsForPdf: { label: string; amount: number; running: number }[] = [
    {
      label: `What you think you save  (${money(i.nlPrice)} - ${money(i.resalePrice)})`,
      amount: result.apparentGap,
      running: result.apparentGap,
    },
    ...result.bridge.map((b) => ({ label: b.label, amount: b.amount, running: b.running })),
  ];
  doc.setFontSize(9.5);
  rowsForPdf.forEach((r, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === rowsForPdf.length - 1;
    doc.setFont(isFirst ? "helvetica" : "helvetica", "normal");
    doc.setTextColor(...(isFirst ? CHARCOAL : BODY));
    doc.text(r.label, M, y);
    // amount (skip for the starting row)
    if (!isFirst) {
      doc.setTextColor(...(r.amount < 0 ? CHARCOAL : MUTED));
      doc.text(signed(r.amount), M + inner - 50, y, { align: "right" });
    }
    // running total
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...CHARCOAL);
    doc.text(money(r.running), right, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += isFirst ? 7 : 6.5;
    if (isFirst || isLast) {
      doc.setDrawColor(...LINE);
      doc.line(M, y - 2.5, right, y - 2.5);
    }
  });
  y += 4;

  // ---- True PSF line ----
  doc.setFillColor(...PAPER);
  doc.setDrawColor(...LINE);
  doc.rect(M, y, inner, 16, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...AMBER);
  doc.text("SAME MONEY, LESS HOME", M + 4, y + 5.5);
  doc.setFontSize(8.5);
  doc.setTextColor(...BODY);
  doc.text(
    `New launch ${money(result.nlPsf)}/sqft (all usable).  Resale looks like ${money(
      result.resalePsfHeadline,
    )}/sqft —`,
    M + 4,
    y + 10.5,
  );
  doc.text(
    `but on a fresh-lease, usable-space basis it's really ${money(result.resaleTruePsf)}/sqft.`,
    M + 4,
    y + 14,
  );
  y += 16 + 8;

  // ---- Verdict ----
  doc.setFont("times", "italic");
  doc.setFontSize(10.5);
  doc.setTextColor(...CHARCOAL);
  const verdict = renting
    ? `On paper the new launch costs ${money(result.apparentGap)} more. Once you reset the lease and count what you'd spend anyway on the resale, the real difference is about ${money(
        result.realGap,
      )} — and that buys a brand-new home on a full 99-year lease, with the longest runway to grow.`
    : `Keeping your current home while you wait removes the rent, so the real difference narrows to about ${money(
        result.realGap,
      )} — for a brand-new home on a full 99-year lease, with no renovation and the longest runway to grow.`;
  const vLines = doc.splitTextToSize(verdict, inner);
  doc.text(vLines, M, y);
  y += vLines.length * 5 + 6;

  // ---- Footer ----
  const footerY = 273;
  doc.setDrawColor(...CHARCOAL);
  doc.setLineWidth(0.5);
  doc.line(M, footerY, right, footerY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...CHARCOAL);
  doc.text("Elfi Abdullah  ·  EastCondos.sg", M, footerY + 5);
  doc.setTextColor(...MUTED);
  doc.text("+65 9666 7496  ·  wa.me/6596667496", M, footerY + 9.5);
  doc.text(`Prepared ${dateLabel}`, right, footerY + 5, { align: "right" });
  doc.setFontSize(6.5);
  doc.text(
    `Assumptions: ${i.ratePct}% loan rate · ${i.ltvPct}% LTV · ${i.horizonYears}-yr wait${
      renting ? ` · S$${i.rentMonthly.toLocaleString()}/mo rent` : " · no rent"
    }. Lease values per the official URA table.`,
    right,
    footerY + 9.5,
    { align: "right" },
  );
  doc.setTextColor(...MUTED);
  doc.setFontSize(6.5);
  doc.text(
    "Indicative planning only — not financial advice. Your figures depend on the specific homes, financing and timing.",
    M,
    footerY + 16,
  );

  return doc;
}

export async function downloadPlannerPdf(result: PlannerResult, dateLabel: string): Promise<void> {
  const doc = await buildPlannerDoc(result, dateLabel);
  doc.save("EastCondos-New-Launch-vs-Resale.pdf");
}
