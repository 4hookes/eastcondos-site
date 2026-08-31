"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/fbq";

// The walkthrough Elfi recorded for the 5-in-1 planner. Kept here, not in the
// email templates, so the video swaps in ONE place — the emails point at this
// page, never at YouTube. That is the whole reason the page exists: a YouTube
// view is invisible to the Meta pixel, a page view is not.
const VIDEO_ID = "V7lUwH2KMXs";

// ONE section, video only. Deliberately no hero, no feature list, no button.
// Everyone landing here arrived from an email they already opened — they know
// what the planner is and they came to watch. A hero would only make them
// scroll past it to reach the thing they came for. (Elfi's call, 31 Aug 2026.)
export default function PlannerPage() {
  const [playing, setPlaying] = useState(false);
  const firedDwell = useRef(false);

  useEffect(() => {
    // ViewContent = "landed on the planner page". This is the retargeting seed.
    // Meta needs a few hundred people before it will serve to a custom audience,
    // so this has to start collecting long before it is useful.
    track("ViewContent", { content_name: "5-in-1 Affordability Planner" });

    // 30 seconds = watched a real chunk, not a bounce. A warmer audience than
    // plain ViewContent. Fires once and only once.
    const t = setTimeout(() => {
      if (!firedDwell.current) {
        firedDwell.current = true;
        track("ViewContent", { content_name: "Planner page — 30s dwell" });
      }
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  // Click-to-play facade, not a live iframe. YouTube's embed sets cookies the
  // moment it loads — before anyone has asked for anything — and it slows the
  // page on a phone. Nothing loads until they press play.
  function startVideo() {
    setPlaying(true);
    track("ViewContent", { content_name: "Planner walkthrough — play" });
  }

  return (
    <main className="bg-charcoal-deep min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <div className="w-full max-w-[900px]">
        <div className="mono-label mb-5 sm:mb-6">How to use your planner</div>

        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="How to use the 5-in-1 Affordability Planner"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={startVideo}
              aria-label="Play the planner walkthrough"
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group"
              style={{
                backgroundColor: "#0E0E1F",
                backgroundImage: `url(https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span
                className="flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  background: "#D4A843",
                }}
              >
                <svg width="28" height="32" viewBox="0 0 26 30" aria-hidden="true">
                  <path d="M0 0 L26 15 L0 30 Z" fill="#0E0E1F" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
