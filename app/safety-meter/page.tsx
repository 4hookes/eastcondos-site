"use client";

import { useEffect } from "react";

/**
 * The Safety Meter lives as its own funnel at safetymeter.eastcondos.sg —
 * the proven, ad-tested lead machine (quiz → score → WhatsApp plan → PDF,
 * with lead capture + the WAHA bot behind it). This route used to host a
 * second, standalone calculator that computed an on-page verdict but captured
 * nothing — a lead leak. It now forwards into the real funnel so there is one
 * machine, one scoring engine, one source of truth.
 *
 * Organic/site visits are tagged utm_source=site so they stay distinguishable
 * from ad traffic (which enters via /go and the rotating-slug system). The
 * funnel root lets direct visits straight in — no slug required.
 */
const FUNNEL_URL =
  "https://safetymeter.eastcondos.sg/?utm_source=eastcondos_site&utm_medium=nav";

export default function SafetyMeterRedirect() {
  useEffect(() => {
    window.location.replace(FUNNEL_URL);
  }, []);

  return (
    <main className="bg-charcoal-deep min-h-screen flex items-center justify-center px-6">
      {/* noscript / slow-connection fallback — keeps the brief flash on-brand */}
      <div className="text-center max-w-[34ch]">
        <div className="mono-label-dim mb-6">
          Tools / HDB → Condo Safety Meter
        </div>
        <h1 className="font-display font-extralight text-cream text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.03em]">
          Taking you to the{" "}
          <em className="font-serif italic text-amber">Safety Meter</em>&hellip;
        </h1>
        <a href={FUNNEL_URL} className="btn-square mt-9 inline-flex">
          Continue to the Safety Meter
        </a>
      </div>
    </main>
  );
}
