import faqData from "@/content/faq.json";

export default function EditorialFAQ() {
  return (
    <section className="bg-paper py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-charcoal pb-6 mb-12">
          <div className="text-[13px] uppercase tracking-[0.22em] text-amber-deep font-medium">
            Chapter 06 &middot; The Questions
          </div>
          <h2 className="headline-block max-w-[18ch]">
            Questions we hear every week.
          </h2>
        </div>
        {faqData.items.map((item, i) => (
          <div
            key={item.question}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-9 border-b border-charcoal items-start"
          >
            <div className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-charcoal">
              <span className="block font-sans text-[13px] uppercase tracking-[0.2em] text-amber-deep mb-2.5 font-medium">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              {item.question}
            </div>
            <div className="text-[17px] leading-[1.7] text-body max-w-[60ch]">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
