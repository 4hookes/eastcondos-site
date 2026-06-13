import faqData from "@/content/faq.json";

export default function EditorialFAQ() {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden">
      <div
        aria-hidden
        className="meganum absolute right-6 md:right-12 -top-2 md:top-2"
      >
        05
      </div>
      <div className="relative max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b hairline-strong pb-6 mb-12">
          <div className="mono-label">05 / The Questions</div>
          <h2 className="display-section !text-[clamp(1.8rem,3.4vw,2.8rem)] max-w-[18ch]">
            Questions we hear <b>every week.</b>
          </h2>
        </div>
        {faqData.items.map((item, i) => (
          <div
            key={item.question}
            data-reveal
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-b hairline items-start"
          >
            <div className="font-display font-light text-[22px] leading-snug tracking-[-0.015em] text-cream">
              <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-amber mb-3">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              {item.question}
            </div>
            <div className="prose-dark text-[16px] max-w-[60ch]">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
