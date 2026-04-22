/**
 * Custom hairline SVG icons for the PBD™ framework system.
 * Monocle editorial style — 40×40 viewBox, 1.4 stroke, currentColor.
 * Pass `className` to set color (e.g., "text-amber-deep").
 */

type IconName =
  | "staircase-wealth"
  | "quantum-positioning"
  | "ssd-timing"
  | "leverage-amplification"
  | "next-better-property"
  | "burst-framework";

export default function FrameworkIcon({
  name,
  className = "text-amber-deep",
  size = 40,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    // Ascending staircase with an upward arrow — equity recycling each step up
    case "staircase-wealth":
      return (
        <svg {...common}>
          <path d="M5 33 L12 33 L12 26 L19 26 L19 19 L26 19 L26 12 L33 12 L35 12" />
          <path d="M31 8 L35 12 L31 16" />
        </svg>
      );

    // A doorway with an arrow entering — the first move into the condo market
    case "quantum-positioning":
      return (
        <svg {...common}>
          <path d="M10 34 V10 Q10 7 13 7 H25 Q28 7 28 10 V34" />
          <circle cx="24" cy="22" r="1" fill="currentColor" />
          <path d="M34 22 L40 22" opacity="0" />
          {/* arrow entering */}
          <path d="M2 22 L10 22" />
          <path d="M7 18 L10 22 L7 26" />
        </svg>
      );

    // Clock with the 4-o'clock quadrant highlighted as an amber arc
    case "ssd-timing":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="13" />
          {/* 12 + 3 + 6 + 9 tick marks */}
          <path d="M20 7 L20 9" />
          <path d="M33 20 L31 20" />
          <path d="M20 33 L20 31" />
          <path d="M7 20 L9 20" />
          {/* minute hand to 12 */}
          <path d="M20 20 L20 10" />
          {/* hour hand to 4 (the SSD expiry) — amber emphasis via thicker stroke via double-draw trick */}
          <path d="M20 20 L27 24" strokeWidth="2" />
          <circle cx="20" cy="20" r="1.2" fill="currentColor" />
        </svg>
      );

    // A lever — small weight lifts a larger block via a pivot
    case "leverage-amplification":
      return (
        <svg {...common}>
          {/* lever bar */}
          <path d="M5 30 L35 12" />
          {/* pivot triangle */}
          <path d="M16 28 L21 22 L25 28 Z" fill="currentColor" stroke="none" />
          {/* ground line */}
          <path d="M13 30 L29 30" />
          {/* small weight on the low end */}
          <rect x="5" y="28" width="5" height="5" />
          {/* large weight on the high end */}
          <rect x="30" y="7" width="6" height="8" />
        </svg>
      );

    // Three ascending blocks with an upward arrow — next property always stronger
    case "next-better-property":
      return (
        <svg {...common}>
          <rect x="5" y="26" width="8" height="8" />
          <rect x="15" y="18" width="8" height="16" />
          <rect x="25" y="10" width="8" height="24" />
          {/* small roof triangles to read as 'properties' */}
          <path d="M5 26 L9 22 L13 26" />
          <path d="M15 18 L19 14 L23 18" />
          <path d="M25 10 L29 6 L33 10" />
        </svg>
      );

    // Radiating burst — wealth in concentrated sharp bursts
    case "burst-framework":
      return (
        <svg {...common}>
          <path d="M20 4 L20 11" />
          <path d="M20 29 L20 36" />
          <path d="M4 20 L11 20" />
          <path d="M29 20 L36 20" />
          <path d="M8 8 L13 13" />
          <path d="M27 27 L32 32" />
          <path d="M32 8 L27 13" />
          <path d="M13 27 L8 32" />
          <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
        </svg>
      );

    default:
      return null;
  }
}
