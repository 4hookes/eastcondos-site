"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";

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
      className="bg-charcoal py-24 md:py-28 px-6 md:px-12 relative overflow-hidden scroll-mt-20"
    >
      <div className="relative max-w-broadsheet mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end mb-14">
          <div className="md:col-span-2">
            <h2 className="display-section max-w-[18ch]">
              Real East condos, checked on screen.
            </h2>
          </div>
          <p className="prose-dark">
            I take one condo at a time and walk through it: the layouts, the
            stacks, and what past owners actually made.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              type="button"
              data-reveal
              onClick={() => setPlaying(v.id)}
              className="group text-left"
              aria-label={`Play: ${v.title}`}
            >
              <div className="relative aspect-video overflow-hidden bg-charcoal-light">
                <Image
                  src={`/images/deep-dives/${v.id}.jpg`}
                  alt={v.title}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 bg-amber text-charcoal-deep flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <svg width="16" height="18" viewBox="0 0 18 20" aria-hidden>
                      <path d="M0 0 L18 10 L0 20 Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="mt-4 font-sans text-[14px] font-medium text-amber">
                {v.place}
              </div>
              <div className="mt-1.5 font-serif text-[24px] leading-[1.25] tracking-[-0.015em] text-cream group-hover:text-amber-light transition-colors">
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
            className="font-sans text-[16px] font-medium text-amber hover:text-amber-light transition-colors"
          >
            All condo videos on YouTube &rarr;
          </a>
          <span className="text-[16px] text-cream/85">
            Looking at a condo I haven&rsquo;t covered?{" "}
            <a href="/discovery" className="text-amber hover:text-amber-light transition-colors">
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
