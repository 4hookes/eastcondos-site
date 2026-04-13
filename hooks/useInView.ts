"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(options?: { threshold?: number; delay?: number }) {
  const threshold = options?.threshold ?? 0.1;
  const delay = options?.delay;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            const timer = setTimeout(() => setIsVisible(true), delay);
            observer.unobserve(element);
            return () => clearTimeout(timer);
          } else {
            setIsVisible(true);
            observer.unobserve(element);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return { ref, isVisible };
}
