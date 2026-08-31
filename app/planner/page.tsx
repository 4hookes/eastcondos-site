"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/fbq";

// The walkthrough Elfi recorded for the 5-in-1 planner. Kept here rather than in
// the email templates so the video can be swapped in ONE place — the emails point
// at this page, never at YouTube directly. That is the whole reason the page
// exists: a YouTube view is invisible to the Meta pixel, a page view is not.
const VIDEO_ID = "V7lUwH2KMXs";

// Where the ad's lead form lives. Someone who lands here from organic or from a
// forward has no lead row yet, so they need a way in that still tags them.
const LEAD_FORM_URL = "https://eastcondos.sg/discovery";

export default function PlannerPage() {
  const [playing, setPlaying] = useState(false);
  const firedDwell = useRef(false);

  useEffect(() => {
    // ViewContent = "landed on the planner page". This is the audience Elfi
    // retargets. Meta needs a few hundred people before it will serve to a
    // custom audience, so this has to start collecting well before it is useful.
    track("ViewContent", { content_name: "5-in-1 Affordability Planner" });

    // 30 seconds on the page = a real read, not a bounce. A separate, warmer
    // audience than plain ViewContent. Fires once, and only once.
    const t = setTimeout(() => {
      if (!firedDwell.current) {
        firedDwell.current = true;
        track("ViewContent", { content_name: "Planner page — 30s dwell" });
      }
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  // Click-to-play instead of an autoloaded iframe. Two reasons: YouTube's embed
  // sets cookies the moment it loads (a consent problem before anyone has asked
  // for anything), and a facade keeps the page fast on a phone.
  function startVideo() {
    setPlaying(true);
    track("ViewContent", { content_name: "Planner walkthrough — play" });
  }

  return (
    <div className="bg-charcoal-deep min-h-screen">
      <section className="relative gridlines border-b hairline px-6 md:px-12 pt-20 md:pt-28 pb-16 overflow-hidden">
        <div className="relative max-w-broadsheet mx-auto">
          <div className="mono-label mb-8">The 5-in-1 Affordability Planner</div>
          <h1 className="display-hero max-w-[18ch]">
            See what your HDB flat leaves you in cash.
          </h1>
          <p className="annot mt-10 max-w-[46ch]">
            A free Google Sheet. Put in your flat, your loan and your CPF, and it
            works out what you walk away with — and the real monthly payment on
            the condo you have in mind. No sales talk, just your own numbers.
          </p>
        </div>
      </section>

      <main className="surface-light gridlines-light px-5 sm:px-10 py-12 sm:py-16">
        <div className="max-w-[760px] mx-auto">

          <div className="bg-paper border border-charcoal mb-9 sm:mb-12 p-5 sm:p-7">
            <h2 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-3">
              Watch me walk through it first
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-5">
              Under two minutes. I show you which tab to start on and which cells
              to fill in, so you are not staring at a wall of numbers.
            </p>

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
                  className="absolute inset-0 w-full h-full bg-charcoal-deep flex items-center justify-center cursor-pointer group"
                  style={{
                    backgroundImage: `url(https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span
                    className="flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "#D4A843",
                    }}
                  >
                    <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
                      <path d="M0 0 L26 15 L0 30 Z" fill="#0E0E1F" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-paper border border-charcoal mb-9 sm:mb-12 p-5 sm:p-7">
            <h2 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-3">
              What it works out for you
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              <em className="font-serif italic text-charcoal">Your cash</em> — what
              is left after you clear the loan and put your CPF back.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              <em className="font-serif italic text-charcoal">Your budget</em> — the
              highest price you can go to without stretching.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-2.5">
              <em className="font-serif italic text-charcoal">Your monthly</em> — what
              actually leaves your bank each month, after CPF takes its part.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">
              <em className="font-serif italic text-charcoal">Your timeline</em> — how
              the sale and the purchase line up, and where the gap falls.
            </p>
          </div>

          <div className="bg-paper border border-charcoal p-5 sm:p-7">
            <h2 className="font-serif text-[18px] sm:text-[20px] text-charcoal mb-3">
              Get your own copy
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body mb-5">
              Tell me where to send it and I will set up a copy in your name. You
              open it and start typing — nothing to copy, nothing to fix.
            </p>
            <a
              href={LEAD_FORM_URL}
              onClick={() => track("Lead", { content_name: "Planner page — request copy" })}
              className="inline-block px-6 py-3 font-medium"
              style={{ background: "#D4A843", color: "#0E0E1F" }}
            >
              Send me the planner
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
