"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import faqData from "@/content/faq.json";

interface FAQItem {
  question: string;
  answer: string;
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 mb-3 overflow-hidden">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-lg font-semibold text-charcoal pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-amber transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base text-gray-600 leading-relaxed px-6 pb-5">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQWithCTA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Part 1 — FAQ */}
      <SectionWrapper background="offwhite" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">COMMON QUESTIONS</p>
            <h2 className="section-heading">
              Questions we hear every week.
            </h2>
          </div>

          <div role="list">
            {faqData.items.map((item, index) => (
              <div key={index} role="listitem">
                <AccordionItem
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={handleToggle}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Part 2 — CTA */}
      <div id="cta" className="bg-charcoal py-20 grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <div className="w-16 h-px bg-amber/40 mx-auto mb-8" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-white leading-tight tracking-[-0.02em]">
            Ready to see what your upgrade could look like?
          </h2>
          <p className="text-lg text-white/70 mt-4 leading-relaxed max-w-2xl mx-auto">
            Book a no-pressure strategy session. We&apos;ll map your numbers,
            your timeline, and the properties that actually fit your life.
          </p>
          <div className="mt-8">
            <a href="/strategy-session">
              <Button variant="default" size="lg">
                Book a Strategy Session
              </Button>
            </a>
          </div>
          <p className="text-sm text-white/40 mt-6">
            13 years. 500+ families. Zero pressure.
          </p>
        </div>
      </div>
    </>
  );
}

/*
 * Usage:
 * import FAQWithCTA from "@/components/FAQWithCTA";
 * <FAQWithCTA />
 *
 * Replaces the old <FAQ /> + <CTA /> pair in page.tsx.
 * FAQ content is still driven by content/faq.json.
 */
