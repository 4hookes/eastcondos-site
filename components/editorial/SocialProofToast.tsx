"use client";

import { useEffect, useState } from "react";

/**
 * Quiet social-proof toast — real case-study outcomes, one at a time,
 * calm brand voice (no countdowns, no FOMO). First appears ~12s in,
 * cycles slowly, and stays dismissed once closed. Desktop only; the
 * sticky CTA owns the bottom of small screens. Rendered only when the
 * motion system is active (html.motion).
 */
const STORIES = [
  {
    meta: "Case No. 47 · Tampines",
    line: "From a 4-room HDB to a dream condo, with $0 cash outlay.",
  },
  {
    meta: "Case No. 41 · Bedok",
    line: "\u201cWe almost bought the wrong unit on the wrong floor.\u201d Saved $84k on entry.",
  },
  {
    meta: "Case No. 39 · Marine Parade",
    line: "HDB sale + condo TOP, zero gap. Avoided 11 months of rental.",
  },
  {
    meta: "Case No. 35 · Pasir Ris",
    line: "The model said wait. They waited — and saved $200k.",
  },
];

const FIRST_DELAY_MS = 12_000;
const VISIBLE_MS = 7_000;
const GAP_MS = 9_000;

export default function SocialProofToast() {
  const [enabled, setEnabled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("motion")) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled || dismissed) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (document.hidden) {
        // Tab not visible — try again after one gap instead of stacking timers.
        cycleTimer = setTimeout(showNext, GAP_MS);
        return;
      }
      setShow(true);
      hideTimer = setTimeout(() => {
        setShow(false);
        setIndex((i) => (i + 1) % STORIES.length);
        cycleTimer = setTimeout(showNext, GAP_MS);
      }, VISIBLE_MS);
    };

    const firstTimer = setTimeout(showNext, FIRST_DELAY_MS);
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, [enabled, dismissed]);

  if (!enabled || dismissed) return null;

  const story = STORIES[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-6 z-40 hidden md:block max-w-[340px] motion-safe:transition-all motion-safe:duration-500 ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative bg-charcoal/95 backdrop-blur-sm border hairline-strong px-5 py-4 shadow-2xl">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute top-2.5 right-3 text-cream/40 hover:text-cream transition-colors text-[15px] leading-none"
        >
          &times;
        </button>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
          {story.meta}
        </div>
        <p className="mt-2 text-[13.5px] leading-[1.6] text-cream/80 pr-4">
          {story.line}
        </p>
        <a
          href="/case-studies"
          className="mt-2.5 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 border-b border-amber/60 pb-0.5 hover:text-amber transition-colors"
        >
          Read their stories &rarr;
        </a>
      </div>
    </div>
  );
}
