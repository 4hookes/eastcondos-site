"use client";

import { useEffect, useRef, useState } from "react";
import type { VerdictResult } from "@/lib/safetyMeter";
import { PERSONAS, PersonaCrest } from "../personas";
import { fmt, fmtPct, fmtShort } from "@/lib/format";
import styles from "../safety-meter.module.css";

type Props = {
  verdict: VerdictResult;
  onReRun: () => void;
  onShare: () => void;
};

const ARC_LENGTH = 283; // π × 90, matches path geometry in SVG

export function VerdictReveal({ verdict, onReRun, onShare }: Props) {
  const gaugeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);

  const meta = PERSONAS[verdict.persona];
  const fillOffset = ARC_LENGTH - (verdict.score / 100) * ARC_LENGTH;
  const needleRot = -90 + (verdict.score / 100) * 180;

  useEffect(() => {
    const gauge = gaugeRef.current;
    const overlay = overlayRef.current;
    if (!gauge || !overlay) return;

    // Reset
    gauge.classList.remove(styles.animate);
    overlay.classList.remove(styles.calcOverlayRevealed);
    setDisplayScore(0);
    gauge.style.setProperty("--fill-offset", String(fillOffset));
    gauge.style.setProperty("--fill-color", verdict.tierColor);
    gauge.style.setProperty("--needle-rot", `${needleRot}deg`);

    const revealTimer = setTimeout(() => {
      overlay.classList.add(styles.calcOverlayRevealed);
      gauge.classList.add(styles.animate);

      // Count-up animation
      const duration = 2200;
      const start = performance.now();
      let rafId: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayScore(Math.round(eased * verdict.score));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => cancelAnimationFrame(rafId);
    }, 1100);

    return () => clearTimeout(revealTimer);
  }, [verdict.score, verdict.tierColor, fillOffset, needleRot]);

  const ceiling = Math.round(verdict.bankEligibility / 0.75 / 10000) * 10000;

  return (
    <section
      className="bg-charcoal text-cream py-12 sm:py-16 relative overflow-hidden"
      style={{ borderTop: "6px solid #D4A843" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Calculating overlay */}
      <div ref={overlayRef} className={styles.calcOverlay}>
        <div className={styles.calcDots}>
          <span />
          <span />
          <span />
        </div>
        <div className="text-[10px] tracking-[0.32em] uppercase text-amber mt-3.5">
          Stress-testing your plan
        </div>
      </div>

      <div className="relative max-w-broadsheet mx-auto px-5 sm:px-10">
        {/* Tier pill */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-amber px-3.5 py-1.5 border border-amber">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: verdict.tierColor }}
            />
            Tier {meta.tierNumber} · {meta.tierLong}
          </span>
        </div>

        {/* Gauge */}
        <div
          ref={gaugeRef}
          className={styles.gauge}
        >
          <svg viewBox="0 0 240 150" aria-hidden="true">
            <g stroke="rgba(242,235,219,0.55)" strokeWidth="1.5" strokeLinecap="round">
              <line x1="30" y1="122" x2="36" y2="116" />
              <line x1="55" y1="72" x2="62" y2="77" />
              <line x1="120" y1="30" x2="120" y2="38" />
              <line x1="185" y1="72" x2="178" y2="77" />
              <line x1="210" y1="122" x2="204" y2="116" />
            </g>
            <text x="30" y="142" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(242,235,219,0.7)" letterSpacing="0.24em" style={{ textTransform: "uppercase" }}>
              Stop
            </text>
            <text x="120" y="20" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(242,235,219,0.7)" letterSpacing="0.24em" style={{ textTransform: "uppercase" }}>
              Balanced
            </text>
            <text x="210" y="142" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(242,235,219,0.7)" letterSpacing="0.24em" style={{ textTransform: "uppercase" }}>
              Elite
            </text>

            <path className={styles.gaugeTrack} d="M 30 120 A 90 90 0 0 1 210 120" />
            <path className={styles.gaugeFill} d="M 30 120 A 90 90 0 0 1 210 120" />

            <g className={styles.gaugeNeedleG}>
              <line x1="120" y1="120" x2="120" y2="42" stroke="#F2EBDB" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="120" cy="120" r="7" fill="#D4A843" stroke="#1A1A2E" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Score below gauge */}
        <div className="flex flex-col items-center mt-2">
          <div className="font-serif text-amber leading-none" style={{ fontSize: "clamp(4rem, 12vw, 6rem)", letterSpacing: "-0.03em" }}>
            {displayScore}
          </div>
          <div className="w-10 h-px bg-amber my-3.5" />
          <div className="text-[9px] tracking-[0.3em] uppercase text-cream/55">
            Safety Score · /100
          </div>
        </div>

        {/* Persona name + tagline */}
        <div className="text-center mt-7">
          <h2 className="font-serif text-cream" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", letterSpacing: "-0.025em", lineHeight: 1 }}>
            You're a{" "}
            <em className="not-italic text-amber font-serif italic">
              {meta.firstName} {meta.lastName}
            </em>
          </h2>
          <p className="font-serif italic text-[16px] text-cream/80 max-w-[34ch] mx-auto mt-2 leading-snug">
            &ldquo;{meta.tagline}&rdquo;
          </p>
        </div>

        {/* Crest */}
        <div className="flex justify-center mt-7">
          <PersonaCrest slug={verdict.persona} size={120} />
        </div>

        {/* Eligibility strip */}
        <div className="grid grid-cols-3 border border-amber/30 mt-8 max-w-[640px] mx-auto">
          <div className="p-3.5 text-center border-r border-amber/30">
            <div className="text-[9px] tracking-[0.22em] uppercase text-amber mb-1">Ceiling</div>
            <div className="font-serif text-[20px] sm:text-[22px] text-cream">{fmtShort(ceiling)}</div>
          </div>
          <div className="p-3.5 text-center border-r border-amber/30">
            <div className="text-[9px] tracking-[0.22em] uppercase text-amber mb-1">Buying</div>
            <div className="font-serif text-[20px] sm:text-[22px] text-cream">{fmtShort(verdict.maxPropertyCeiling > 0 ? verdict.loanUtilization * ceiling : 0)}</div>
          </div>
          <div className="p-3.5 text-center">
            <div className="text-[9px] tracking-[0.22em] uppercase text-amber mb-1">Loan used</div>
            <div className="font-serif text-[20px] sm:text-[22px] text-cream">{fmtPct(verdict.loanUtilization)}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center mt-8">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 text-[10px] tracking-[0.22em] uppercase font-medium bg-amber text-charcoal border border-amber hover:bg-amber-light transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
            Share my {meta.lastName}
          </button>
          <a
            href="https://wa.me/6596667496?text=I%20just%20ran%20the%20Safety%20Meter.%20Can%20we%20chat%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 text-[10px] tracking-[0.22em] uppercase font-medium bg-transparent text-cream border border-amber hover:bg-amber hover:text-charcoal transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
            WhatsApp Elfi
          </a>
          <button
            type="button"
            onClick={onReRun}
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 text-[10px] tracking-[0.22em] uppercase font-medium bg-transparent text-cream border border-amber hover:bg-amber hover:text-charcoal transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
            Re-run
          </button>
        </div>
      </div>
    </section>
  );
}
