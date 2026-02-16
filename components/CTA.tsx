"use client";

import { useInView } from "@/hooks/useInView";

export default function CTA() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="cta"
      className="bg-sage-dark py-20"
      ref={ref}
    >
      <div className={`max-w-2xl mx-auto px-4 sm:px-6 text-center fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to take the first step?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Download the checker and get clear on your numbers. No commitment, no pressure—just practical preparation.
        </p>
        <a href="/calculator" className="btn-primary">
          Get the free checker
        </a>
      </div>
    </section>
  );
}
