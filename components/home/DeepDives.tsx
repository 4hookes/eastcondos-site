"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";

/**
 * The catch (North Star §1): a deep-dive video on one East condo.
 * Plays in place so the visitor stays on the site, one tap from the
 * Fit-Check. Add new deep-dives to the top of VIDEOS (East condos only).
 */
const VIDEOS = [
  {
    id: "jF3lFtCL89s",
    place: "Parktown Residence · Tampines",
    title: "5 mistakes to avoid when buying a 3-bedder here",
  },
  {
    id: "FSaku0Q9V0k",
    place: "Aurelle of Tampines · EC",
    title: "Can one unit here really make $1.5M?",
  },
  {
    id: "8gZuW8Gy8kE",
    place: "Tampines",
    title: "Can you still make $1M from this condo?",
  },
];

export default function DeepDives() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section
      id="deep-dives"
      className="bg-charcoal gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden scroll-mt-20"
    >
      <div aria-hidden className="meganum absolute right-6 md:right-12 -top-2 md:top-2">
        02
      </div>
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-end border-b hairline pb-8 mb-14">
          <div className="mono-label">02 / Watch me check one</div>
          <div>
            <h2 className="display-section max-w-[18ch]">
              Real East condos. <em>Every</em> flaw on screen.
            </h2>
            <p className="prose-dark mt-6 max-w-[52ch]">
              I take one condo at a time and walk through it: the layouts, the
              stacks, and what past owners actually made.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              type="button"
              data-reveal
              onClick={() => setPlaying(v.id)}
              className="group text-left"
              aria-label={`Play: ${v.title}`}
            >
              <div className="relative aspect-video overflow-hidden bg-charcoal-light border hairline">
                <Image
                  src={`/images/deep-dives/${v.id}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 bg-amber text-charcoal-deep flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden>
                      <path d="M0 0 L18 10 L0 20 Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                {v.place}
              </div>
              <div className="mt-2.5 font-display font-light text-[21px] leading-snug tracking-[-0.015em] text-cream group-hover:text-amber-light transition-colors">
                {v.title}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 items-center">
          <a
            href="https://www.youtube.com/@eastcondossg/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] uppercase tracking-[0.2em] text-cream border-b border-amber pb-1.5 hover:text-amber transition-colors"
          >
            All condo videos on YouTube &rarr;
          </a>
          <span className="text-[14.5px] text-cream/60">
            Looking at a condo I haven&rsquo;t covered?{" "}
            <a href="/discovery" className="text-cream underline decoration-amber underline-offset-4 hover:text-amber">
              Ask me in the Fit-Check.
            </a>
          </span>
        </div>
      </div>

      <VideoModal
        isOpen={playing !== null}
        onClose={() => setPlaying(null)}
        videoUrl={
          playing
            ? `https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&rel=0`
            : ""
        }
      />
    </section>
  );
}
