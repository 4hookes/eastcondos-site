"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Orchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      try {
        ctx = gsap.context(() => {
          ScrollTrigger.batch("[data-reveal], [data-clip-reveal]", {
            start: "top 92%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
              }),
          });
        });
        ScrollTrigger.refresh();
      } catch {
        document.documentElement.classList.remove("motion");
      }
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Orchestrator />
      {children}
    </>
  );
}
