"use client";

import { useEffect, useState } from "react";

/**
 * Slim conversion bar pinned to the bottom of the viewport. Appears once
 * the visitor has scrolled past the hero; tucks itself away while the
 * final CTA band or the footer is on screen (both already carry the same CTAs).
 * Sits bottom-center so it never collides with the WhatsApp button (right).
 */
export default function StickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = document.querySelectorAll("[data-cta-band], [data-quiz-band], footer");
    const io = new IntersectionObserver(
      (entries) => setBlocked(entries.some((e) => e.isIntersecting)),
      { threshold: 0.05 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const visible = pastHero && !blocked;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5 pointer-events-none motion-safe:transition-all motion-safe:duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 bg-charcoal/95 backdrop-blur-sm border hairline-strong px-4 py-3 shadow-2xl ${
          visible ? "pointer-events-auto" : ""
        }`}
      >
        <span className="mono-label hidden lg:inline !text-[10px] mr-1">
          Begin here
        </span>
        <a
          href="/discovery"
          className="btn-square !px-6 !py-3 !text-[11px]"
          tabIndex={visible ? 0 : -1}
        >
          Book a 7-min Fit-Check
        </a>
        <a
          href="#deep-dives"
          className="btn-square-ghost !px-6 !py-3 !text-[11px] hidden sm:inline-flex"
          tabIndex={visible ? 0 : -1}
        >
          Watch a condo check
        </a>
      </div>
    </div>
  );
}
