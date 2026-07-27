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
  | "burst-framework"
  | "scarcity-tax"
  | "four-week-rule"
  | "bounced-buyer-spillover"
  | "pattern-recognition"
  | "light-viewing"
  | "stars-aligned"
  | "extension-runway"
  | "numbers-floor"
  | "lived-in-test"
  | "second-best"
  | "dynamic-pricing"
  | "watch-street"
  | "smart-not-cheap"
  | "cpf-trap"
  | "exit-audience-test"
  | "liquidity-trap"
  | "better-asset-switch"
  | "floor-space-multiplier";

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

    // A price tag with an upward spike — the premium paid in panic
    case "scarcity-tax":
      return (
        <svg {...common}>
          {/* price tag body */}
          <path d="M8 14 L20 6 L34 14 L34 30 L8 30 Z" />
          {/* tag hole */}
          <circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none" />
          {/* upward spike inside — the tax premium */}
          <path d="M14 26 L20 16 L26 26" />
          <path d="M17 19 L20 16 L23 19" />
        </svg>
      );

    // Four week-bars, the first one struck through (the wait)
    case "four-week-rule":
      return (
        <svg {...common}>
          {/* four week bars */}
          <rect x="6" y="14" width="6" height="14" />
          <rect x="14" y="14" width="6" height="14" />
          <rect x="22" y="14" width="6" height="14" />
          <rect x="30" y="14" width="6" height="14" />
          {/* week labels — small ticks above */}
          <path d="M9 11 L9 13" />
          <path d="M17 11 L17 13" />
          <path d="M25 11 L25 13" />
          <path d="M33 11 L33 13" />
          {/* slash through week 1 — the wait */}
          <path d="M4 32 L14 10" strokeWidth="1.8" />
        </svg>
      );

    // A filled cluster with arrows bouncing outward — sold-out launch spilling demand
    case "bounced-buyer-spillover":
      return (
        <svg {...common}>
          {/* sold-out core */}
          <rect x="15" y="15" width="10" height="10" fill="currentColor" stroke="none" />
          {/* spillover arrows in four directions */}
          <path d="M14 14 L7 7" />
          <path d="M10 7 L7 7 L7 10" />
          <path d="M26 14 L33 7" />
          <path d="M30 7 L33 7 L33 10" />
          <path d="M14 26 L7 33" />
          <path d="M10 33 L7 33 L7 30" />
          <path d="M26 26 L33 33" />
          <path d="M30 33 L33 33 L33 30" />
        </svg>
      );

    // Three repeating wave-peaks connected by a flowing line — the pattern recurring
    case "pattern-recognition":
      return (
        <svg {...common}>
          {/* connecting baseline */}
          <path d="M4 30 L36 30" opacity="0.35" />
          {/* three repeating peaks of equal shape */}
          <path d="M6 28 L11 12 L16 28" />
          <path d="M14 28 L20 12 L25 28" />
          <path d="M23 28 L29 12 L34 28" />
          {/* small recognition dot at each peak apex */}
          <circle cx="11" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="29" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );

    // An eye over a house — viewing homes early, no commitment
    case "light-viewing":
      return (
        <svg {...common}>
          {/* small house */}
          <path d="M11 32 V22 L20 15 L29 22 V32 Z" />
          <path d="M17 32 V26 H23 V32" />
          {/* eye above, watching */}
          <path d="M8 11 Q20 3 32 11 Q20 19 8 11 Z" />
          <circle cx="20" cy="11" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      );

    // Three stars falling into a single aligned row — timing lined up
    case "stars-aligned":
      return (
        <svg {...common}>
          {/* alignment line */}
          <path d="M5 28 L35 28" opacity="0.35" />
          {/* three stars seated on the line */}
          <path d="M11 16 L12.4 20 L16.5 20 L13.2 22.5 L14.5 26.5 L11 24 L7.5 26.5 L8.8 22.5 L5.5 20 L9.6 20 Z" />
          <path d="M20 12 L21.4 16 L25.5 16 L22.2 18.5 L23.5 22.5 L20 20 L16.5 22.5 L17.8 18.5 L14.5 16 L18.6 16 Z" />
          <path d="M29 16 L30.4 20 L34.5 20 L31.2 22.5 L32.5 26.5 L29 24 L25.5 26.5 L26.8 22.5 L23.5 20 L27.6 20 Z" />
        </svg>
      );

    // A calendar window with a forward arrow — extension of stay as runway
    case "extension-runway":
      return (
        <svg {...common}>
          {/* calendar frame */}
          <rect x="6" y="9" width="20" height="24" rx="1" />
          <path d="M6 15 L26 15" />
          <path d="M11 6 L11 11" />
          <path d="M21 6 L21 11" />
          {/* forward arrow extending out — the runway */}
          <path d="M26 24 L37 24" />
          <path d="M33 20 L37 24 L33 28" />
        </svg>
      );

    // A spreadsheet grid acting as the floor, a heart resting above it — numbers are the floor
    case "numbers-floor":
      return (
        <svg {...common}>
          {/* grid floor */}
          <rect x="5" y="24" width="30" height="11" />
          <path d="M15 24 L15 35" />
          <path d="M25 24 L25 35" />
          <path d="M5 29.5 L35 29.5" />
          {/* heart resting on the floor — what really matters sits on top */}
          <path d="M20 20 C16 13 9 16 12 21 C14 24 20 20 20 20 Z" opacity="0" />
          <path d="M20 19 C18.5 15 13.5 16 14.5 20 C15.3 23 20 25 20 25 C20 25 24.7 23 25.5 20 C26.5 16 21.5 15 20 19 Z" />
        </svg>
      );

    // A house with a clock-arc inside — testing for the way you actually live in it
    case "lived-in-test":
      return (
        <svg {...common}>
          {/* house outline */}
          <path d="M7 33 V18 L20 8 L33 18 V33 Z" />
          {/* a check inside — the fit confirmed */}
          <path d="M14 24 L18.5 28.5 L27 19" />
        </svg>
      );

    // Two podium bars, the shorter one ringed as the chosen pick — second-best, zero regret
    case "second-best":
      return (
        <svg {...common}>
          {/* tallest bar — best on paper */}
          <rect x="22" y="10" width="9" height="24" />
          {/* second bar — the chosen one */}
          <rect x="9" y="18" width="9" height="16" />
          {/* ring around the chosen second bar */}
          <circle cx="13.5" cy="14" r="3" />
          <path d="M12 14 L13.2 15.2 L15.2 12.6" />
        </svg>
      );

    // A price tag with a small adjustment arrow loop — price that moves with the market
    case "dynamic-pricing":
      return (
        <svg {...common}>
          {/* tag */}
          <path d="M6 18 L18 6 L30 6 L30 18 L18 30 Z" />
          <circle cx="24" cy="12" r="1.6" fill="currentColor" stroke="none" />
          {/* up/down adjustment arrows — the dynamic part */}
          <path d="M33 14 L33 26" />
          <path d="M30 17 L33 14 L36 17" />
          <path d="M30 23 L33 26 L36 23" />
        </svg>
      );

    // A magnifier over a row of bars — watching the competing listings on the street
    case "watch-street":
      return (
        <svg {...common}>
          {/* row of listing bars */}
          <rect x="5" y="22" width="4" height="11" />
          <rect x="12" y="17" width="4" height="16" />
          <rect x="19" y="25" width="4" height="8" />
          {/* magnifier scanning them */}
          <circle cx="26" cy="15" r="6" />
          <path d="M30.5 19.5 L35 24" />
        </svg>
      );

    // A target with the arrow landing just inside the bullseye — smart, not cheap, not greedy
    case "smart-not-cheap":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="13" />
          <circle cx="20" cy="20" r="7" />
          {/* the precise landing point — just inside */}
          <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
          {/* arrow coming in */}
          <path d="M32 8 L23 17" />
          <path d="M27 9 L32 8 L31 13" />
        </svg>
      );

    // A vault door with a coin sealed inside — CPF money that comes back to you, but locked
    case "cpf-trap":
      return (
        <svg {...common}>
          <rect x="6" y="7" width="28" height="26" rx="1" />
          <circle cx="20" cy="20" r="7" />
          <path d="M20 13 V10 M20 30 V27 M13 20 H10 M30 20 H27" />
          <path d="M17.5 22.5 Q20 24 22.5 21.5" />
        </svg>
      );

    // A shrinking queue of figures — the exit audience narrowing as the lease runs down
    case "exit-audience-test":
      return (
        <svg {...common}>
          <circle cx="8" cy="14" r="3.2" />
          <path d="M3.5 27 Q8 21 12.5 27" />
          <circle cx="20" cy="15.5" r="2.6" />
          <path d="M16.4 26 Q20 21.4 23.6 26" />
          <circle cx="31" cy="17" r="2" />
          <path d="M28.2 25.5 Q31 22 33.8 25.5" />
          <path d="M4 33 H36" strokeDasharray="2 3" />
        </svg>
      );

    // An hourglass whose sand has jammed — value that exists but will not flow out as cash
    case "liquidity-trap":
      return (
        <svg {...common}>
          <path d="M11 6 H29 M11 34 H29" />
          <path d="M12 6 Q12 17 20 20 Q28 17 28 6" />
          <path d="M12 34 Q12 23 20 20 Q28 23 28 34" />
          <path d="M15.5 31 Q20 28.5 24.5 31" />
          <path d="M20 20 V24" strokeDasharray="1.5 2.5" />
        </svg>
      );

    // Two roofs, one clock reset — swapping a short-lease asset for a longer one
    case "better-asset-switch":
      return (
        <svg {...common}>
          <path d="M4 19 L11.5 12 L19 19" />
          <path d="M6.5 19 V29 H16.5 V19" />
          <path d="M21 15 H31 M28 12 L31 15 L28 18" />
          <circle cx="30" cy="27" r="6" />
          <path d="M30 23.5 V27 L32.5 28.5" />
        </svg>
      );

    // A small square inside a large one, both rising — the same psf move on more floor area
    case "floor-space-multiplier":
      return (
        <svg {...common}>
          <rect x="5" y="21" width="9" height="9" />
          <rect x="19" y="12" width="18" height="18" />
          <path d="M9.5 18.5 V14 M7.5 16 L9.5 14 L11.5 16" />
          <path d="M28 9.5 V4 M25 7 L28 4 L31 7" />
        </svg>
      );

    default:
      return null;
  }
}
