// Meta Pixel — shared with the Safety Meter funnel so eastcondos.sg and
// safetymeter.eastcondos.sg feed ONE pixel (one retargeting audience, one
// lookalike seed). Pixel IDs are public client-side by design.
export const META_PIXEL_ID = "710001568201916";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Fire a standard Meta event, no-op if the pixel hasn't loaded. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
