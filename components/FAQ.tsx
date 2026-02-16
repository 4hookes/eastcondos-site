"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import faqData from "@/content/faq.json";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isVisible } = useInView();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-light-gray py-16 md:py-24"
      ref={ref}
    >
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center">
          <p className="section-label">{faqData.sectionLabel}</p>
          <h2 className="section-heading">{faqData.heading}</h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqData.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index}>
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-left font-semibold text-navy">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform duration-200 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'max-h-40 opacity-100 mt-2 p-4'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-body">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
