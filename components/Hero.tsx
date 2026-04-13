"use client";

import heroData from "@/content/hero.json";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * Hero — full-viewport cinematic hero with video background.
 *
 * Usage:
 *   import Hero from "@/components/Hero";
 *   <Hero />
 *
 * Video swap: uncomment the <video> element and remove the placeholder div
 * once the looping background video file is available.
 */
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-charcoal to-charcoal-light grain"
      aria-label="Hero"
    >
      {/* ── Background video layer ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/*
          VIDEO PLACEHOLDER — Looping client journey video
          To activate: remove the placeholder div below, uncomment the <video> element,
          and set the correct src path.

          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center p-8"
          style={{
            background:
              "linear-gradient(145deg, #0f0f1e 0%, #1A1A2E 45%, #232340 100%)",
          }}
          aria-hidden="true"
        >
          <p className="text-white/25 text-sm italic font-sans max-w-sm leading-relaxed">
            VIDEO PLACEHOLDER — Looping client journey video
          </p>
        </div>
      </div>

      {/* ── Dark overlay ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(26, 26, 46, 0.60)" }}
        aria-hidden="true"
      />

      {/* ── Decorative vertical rule ─────────────────────────────────────── */}
      <div
        className="absolute top-0 right-[clamp(2rem,8vw,120px)] w-px h-full z-[2] hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,168,67,0.20) 40%, rgba(212,168,67,0.08) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl text-center mx-auto py-24 md:py-32">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2">
              {/* Animated pulse dot */}
              <span
                className="inline-block w-[7px] h-[7px] rounded-full bg-amber flex-shrink-0"
                style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <Badge variant="amber-outline">{heroData.badge}</Badge>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-normal text-white leading-[1.15] tracking-[-0.02em] mb-7"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)" }}
          >
            {heroData.heading}
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-white/75 leading-relaxed mb-10 mx-auto max-w-xl"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
          >
            {heroData.subheading}
          </p>

          {/* Decorative amber rule */}
          <div className="w-16 h-px bg-amber/40 mx-auto mb-10" aria-hidden="true" />

          {/* CTA group */}
          <div className="flex flex-col items-center gap-4">
            <a href={heroData.cta.href} tabIndex={-1}>
              <Button
                variant="default"
                size="lg"
                className="rounded-full text-charcoal font-bold tracking-[0.01em]"
              >
                {heroData.cta.label}
              </Button>
            </a>
            <p className="text-white/50 text-[13px] tracking-wide">
              No obligations. No pressure. Just numbers.
            </p>
          </div>
        </div>
      </div>

      {/* ── Pulse-dot keyframe injected via style tag ─────────────────────── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.65); }
        }
      `}</style>
    </section>
  );
}
