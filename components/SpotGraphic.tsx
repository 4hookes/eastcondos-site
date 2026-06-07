/**
 * EastCondos spot illustrations — Modern Luxe hairline editorial line-art (16:9).
 * Generated via gemini-3-pro-image, served from /public/spots.
 *
 * Manifest = SINGLE SOURCE OF TRUTH at public/spots/spot-library.json.
 * Two variants per spot:
 *   variant="dark"  — charcoal strokes, for CREAM/light surfaces
 *   variant="light" — cream strokes,    for CHARCOAL/dark surfaces (uses <name>-light.png)
 *
 * Decorative by default (aria-hidden); pass `alt` to make it meaningful.
 */

export type SpotName =
  | "spot-journey"
  | "spot-eastcoast"
  | "spot-safety"
  | "spot-consultation"
  | "spot-nl-resale"
  | "spot-numbers";

export default function SpotGraphic({
  name,
  variant = "dark",
  alt = "",
  className = "",
  style,
  priority = false,
}: {
  name: SpotName;
  variant?: "dark" | "light";
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Eagerly load (use for above-the-fold hero illustrations). */
  priority?: boolean;
}) {
  const file = variant === "light" ? `${name}-light` : name;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/spots/${file}.png`}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={{ width: "100%", height: "auto", display: "block", ...style }}
    />
  );
}
