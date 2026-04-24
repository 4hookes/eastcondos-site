import type { PersonaSlug } from "@/lib/safetyMeter";

// Name mapping — surnames-with-italic pattern, as shown in mockup v3
export type PersonaMeta = {
  slug: PersonaSlug;
  firstName: string;   // "Strategic"
  lastName: string;    // "Sam"
  initial: string;     // "S"
  tierNumber: string;  // "01"
  tierShort: string;   // "Elite"
  tierLong: string;    // "Elite Strategist"
  tagline: string;
  color: string;
  tierColorClass: string; // tailwind-ish token for the tier dot
};

export const PERSONAS: Record<PersonaSlug, PersonaMeta> = {
  "strategic-sam": {
    slug: "strategic-sam",
    firstName: "Strategic",
    lastName: "Sam",
    initial: "S",
    tierNumber: "01",
    tierShort: "Elite",
    tierLong: "Elite Strategist",
    tagline: "Max leverage, full runway. The textbook upgrader.",
    color: "#2F8F5E",
    tierColorClass: "green",
  },
  "steady-siti": {
    slug: "steady-siti",
    firstName: "Steady",
    lastName: "Siti",
    initial: "S",
    tierNumber: "02",
    tierShort: "Robust",
    tierLong: "Robust Plan",
    tagline: "Safe, efficient, and on track.",
    color: "#2F8F5E",
    tierColorClass: "green",
  },
  "balanced-bala": {
    slug: "balanced-bala",
    firstName: "Balanced",
    lastName: "Bala",
    initial: "B",
    tierNumber: "03",
    tierShort: "Balanced",
    tierLong: "Balanced Upgrader",
    tagline: "Standard upgrader. Safe and sustainable.",
    color: "#3B6BA5",
    tierColorClass: "blue",
  },
  "hoarder-hafiz": {
    slug: "hoarder-hafiz",
    firstName: "Hoarder",
    lastName: "Hafiz",
    initial: "H",
    tierNumber: "04",
    tierShort: "Lazy Capital",
    tierLong: "Lazy Capital",
    tagline: "Too safe. Cash is losing to inflation.",
    color: "#B8902F",
    tierColorClass: "yellow",
  },
  "stretched-steve": {
    slug: "stretched-steve",
    firstName: "Stretched",
    lastName: "Steve",
    initial: "S",
    tierNumber: "05",
    tierShort: "High Commitment",
    tierLong: "High Commitment",
    tagline: "Tight ropes. One setback away from trouble.",
    color: "#C26A2A",
    tierColorClass: "orange",
  },
  "house-poor-harry": {
    slug: "house-poor-harry",
    firstName: "House-Poor",
    lastName: "Harry",
    initial: "H",
    tierNumber: "06",
    tierShort: "Lifestyle Risk",
    tierLong: "Lifestyle Risk",
    tagline: "Approved on paper. Broke in real life.",
    color: "#A13E3E",
    tierColorClass: "red",
  },
  "red-flag-raj": {
    slug: "red-flag-raj",
    firstName: "Red-Flag",
    lastName: "Raj",
    initial: "R",
    tierNumber: "07",
    tierShort: "Hard Stop",
    tierLong: "Hard Stop",
    tagline: "The numbers don't work — yet.",
    color: "#7A2A2A",
    tierColorClass: "red-dark",
  },
};

// ===== Symbolic crest marks (abstract editorial glyphs) =====
// Each returns an SVG group for the 32×32 symbol slot on the crest.
export function CrestSymbol({ slug, stroke = "#D4A843" }: { slug: PersonaSlug; stroke?: string }) {
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "strategic-sam":
      // Laurel crown
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <path d="M16 6 L16 22" />
          <path d="M10 10 Q6 14 10 22" />
          <path d="M22 10 Q26 14 22 22" />
          <path d="M13 13 Q10 16 13 22" />
          <path d="M19 13 Q22 16 19 22" />
          <circle cx="16" cy="6" r="1.5" fill={stroke} />
        </svg>
      );
    case "steady-siti":
      // Compass rose
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 6 L18 16 L16 26 L14 16 Z" fill={stroke} fillOpacity="0.3" />
          <path d="M6 16 L16 14 L26 16 L16 18 Z" fill={stroke} fillOpacity="0.15" />
          <circle cx="16" cy="16" r="1.5" fill={stroke} />
        </svg>
      );
    case "balanced-bala":
      // Scales
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <line x1="16" y1="6" x2="16" y2="26" />
          <line x1="8" y1="26" x2="24" y2="26" />
          <line x1="6" y1="12" x2="26" y2="12" />
          <path d="M6 12 L3 20 A3 3 0 0 0 9 20 Z" />
          <path d="M26 12 L23 20 A3 3 0 0 0 29 20 Z" />
        </svg>
      );
    case "hoarder-hafiz":
      // Hourglass
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <line x1="8" y1="6" x2="24" y2="6" />
          <line x1="8" y1="26" x2="24" y2="26" />
          <path d="M8 6 L24 6 L16 16 L24 26 L8 26 L16 16 Z" />
          <line x1="13" y1="22" x2="19" y2="22" strokeWidth="2.5" />
        </svg>
      );
    case "stretched-steve":
      // Tightrope (horizontal line with small figure)
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <line x1="3" y1="22" x2="29" y2="22" />
          <circle cx="16" cy="10" r="3" />
          <line x1="16" y1="13" x2="16" y2="22" />
          <line x1="16" y1="17" x2="11" y2="19" />
          <line x1="16" y1="17" x2="21" y2="19" />
        </svg>
      );
    case "house-poor-harry":
      // Cracked house
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <path d="M6 16 L16 6 L26 16 L26 26 L6 26 Z" />
          <path d="M16 6 L14 14 L18 20 L15 26" strokeWidth="2" />
        </svg>
      );
    case "red-flag-raj":
      // Stop mark (X)
      return (
        <svg viewBox="0 0 32 32" {...common}>
          <circle cx="16" cy="16" r="11" />
          <line x1="10" y1="10" x2="22" y2="22" strokeWidth="2.5" />
          <line x1="22" y1="10" x2="10" y2="22" strokeWidth="2.5" />
        </svg>
      );
  }
}

// ===== Full crest card (symbol + letter + name) =====
export function PersonaCrest({
  slug,
  size = 120,
}: {
  slug: PersonaSlug;
  size?: number;
}) {
  const meta = PERSONAS[slug];
  return (
    <div
      className="bg-charcoal-deep border border-amber flex flex-col items-center justify-center"
      style={{ width: size, height: size, padding: size * 0.1 }}
    >
      <div style={{ width: size * 0.24, height: size * 0.24, marginBottom: size * 0.03 }}>
        <CrestSymbol slug={slug} />
      </div>
      <div
        className="font-serif italic text-amber leading-none"
        style={{ fontSize: size * 0.42, letterSpacing: "-0.04em" }}
      >
        {meta.initial}
      </div>
      <div
        className="bg-amber-deep"
        style={{ width: size * 0.22, height: 1, margin: `${size * 0.03}px 0 ${size * 0.02}px` }}
      />
      <div
        className="uppercase tracking-[0.28em] text-cream/70"
        style={{ fontSize: size * 0.07 }}
      >
        {meta.lastName}
      </div>
    </div>
  );
}
