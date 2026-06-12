"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ReactLenis, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Global motion orchestrator for the Concrete Editorial system.
 *
 * Pages stay server-rendered; choreography is wired post-hydration via
 * selectors and data-attributes:
 *   .display-hero / .display-section  -> masked line-by-line reveal
 *   [data-reveal]                     -> rise-and-fade on enter (batched stagger)
 *   [data-countup]                    -> numerals count up from zero
 *   [data-parallax-img]               -> slow scale/drift scrub on photos
 *   .meganum                          -> ghost numerals drift slower than the page
 *   .btn-square / .btn-square-ghost   -> magnetic pull (fine pointers only)
 *
 * Everything is gated on html.motion, set by an inline script in layout.tsx
 * only when prefers-reduced-motion is NOT requested. No JS / reduced motion
 * -> the site renders fully visible and static.
 */
function Orchestrator() {
  const pathname = usePathname();
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;

    let cancelled = false;
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];
    let ctx: gsap.Context | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      try {
        ctx = gsap.context(() => {
          // 1 — Headlines unmask line by line
          document
            .querySelectorAll<HTMLElement>(".display-hero, .display-section")
            .forEach((el) => {
              const split = new SplitText(el, {
                type: "lines",
                mask: "lines",
                linesClass: "split-line",
              });
              splits.push(split);
              el.classList.add("split-done");
              gsap.from(split.lines, {
                yPercent: 112,
                duration: 1.15,
                ease: "power4.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            });

          // 2 — Generic rise-and-fade reveals, staggered per batch
          ScrollTrigger.batch("[data-reveal]", {
            start: "top 88%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                autoAlpha: 1,
                y: 0,
                duration: 0.95,
                ease: "power3.out",
                stagger: 0.09,
                overwrite: true,
              }),
          });

          // 3 — Stat count-ups ("500+", "13 yrs", "435k")
          document.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
            const m = (el.textContent || "").trim().match(/^([\d.,]+)(.*)$/);
            if (!m) return;
            const end = parseFloat(m[1].replace(/,/g, ""));
            const decimals = (m[1].split(".")[1] || "").length;
            const suffix = m[2] || "";
            const obj = { v: 0 };
            const render = () => {
              el.textContent =
                obj.v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
            };
            gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: render,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });

          // 4 — Ghost numerals drift slower than the page
          document.querySelectorAll<HTMLElement>(".meganum").forEach((el) => {
            gsap.to(el, {
              yPercent: -28,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          // 5 — Photo parallax: slow settle from a slight zoom
          document
            .querySelectorAll<HTMLElement>("[data-parallax-img]")
            .forEach((img) => {
              // Pure slow zoom — scaling up from cover-fit can never expose edges
              gsap.fromTo(
                img,
                { scale: 1 },
                {
                  scale: 1.14,
                  ease: "none",
                  scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            });

          // 6 — Magnetic CTAs (desktop pointers only)
          if (window.matchMedia("(pointer: fine)").matches) {
            document
              .querySelectorAll<HTMLElement>(".btn-square, .btn-square-ghost")
              .forEach((btn) => {
                const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3" });
                const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3" });
                const move = (e: PointerEvent) => {
                  const r = btn.getBoundingClientRect();
                  xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
                  yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
                };
                const leave = () => {
                  xTo(0);
                  yTo(0);
                };
                btn.addEventListener("pointermove", move);
                btn.addEventListener("pointerleave", leave);
                cleanups.push(() => {
                  btn.removeEventListener("pointermove", move);
                  btn.removeEventListener("pointerleave", leave);
                });
              });
          }
        });
        ScrollTrigger.refresh();
      } catch {
        // If anything goes wrong, fail open: show everything, no motion.
        document.documentElement.classList.remove("motion");
      }
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  // Lenis only smooths when motion is allowed; otherwise behaves like native scroll.
  const [smooth] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <ReactLenis root options={{ duration: 1.1, anchors: true, smoothWheel: smooth }}>
      <Orchestrator />
      {children}
    </ReactLenis>
  );
}
