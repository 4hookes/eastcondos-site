"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic video backdrop for the hero. The video only plays when the
 * global motion system is active (html.motion — set by the inline script
 * in layout.tsx when JS runs and reduced motion is NOT requested).
 * Otherwise the poster frame renders, identical to the old static hero.
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    videoRef.current?.play().catch(() => {
      // Autoplay blocked — poster stays, page still looks right.
    });
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          src="/videos/hero/hero-loop.mp4"
          poster="/broll/hero-skyline.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.62]"
          style={{
            filter: "grayscale(0.2) contrast(1.08) brightness(1.02) saturate(1.15)",
          }}
        />
      </div>
      {/* Charcoal gradients — keep type crisp over the moving image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0E0E1F 0%, rgba(14,14,31,0.92) 38%, rgba(14,14,31,0.55) 70%, rgba(14,14,31,0.78) 100%), linear-gradient(0deg, #0E0E1F 0%, rgba(14,14,31,0) 45%)",
        }}
      />
      {/* Extra dim layer — scrubbed in as the hero scrolls away */}
      <div
        data-hero-dim
        className="absolute inset-0 bg-charcoal-deep opacity-0"
      />
    </div>
  );
}
