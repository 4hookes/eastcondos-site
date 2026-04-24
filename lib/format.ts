export function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "S$0";
  const rounded = Math.round(n);
  if (rounded < 0) return "-S$" + Math.abs(rounded).toLocaleString("en-SG");
  return "S$" + rounded.toLocaleString("en-SG");
}

export function fmtShort(n: number): string {
  if (!isFinite(n) || isNaN(n) || n <= 0) return "S$0";
  if (n >= 1_000_000) return "S$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return "S$" + Math.round(n / 1_000) + "K";
  return "S$" + Math.round(n).toLocaleString("en-SG");
}

export function fmtPct(n: number, digits = 0): string {
  if (!isFinite(n) || isNaN(n)) return "0%";
  return (n * 100).toFixed(digits) + "%";
}
