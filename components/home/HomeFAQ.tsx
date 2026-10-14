import faq from "@/content/home-faq.json";

export default function HomeFAQ() {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden">
      <div className="relative max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b hairline-strong pb-6 mb-4">
          <div className="mono-label">Questions</div>
          <h2 className="display-section !text-[clamp(1.8rem,3.4vw,2.8rem)] max-w-[18ch]">
            What people ask me <b>first.</b>
          </h2>
        </div>
        {faq.items.map((item) => (
          <details key={item.question} className="group border-b hairline">
            <summary className="flex items-start justify-between gap-6 py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="font-display font-light text-[20px] md:text-[22px] leading-snug tracking-[-0.015em] text-cream group-hover:text-amber-light transition-colors">
                {item.question}
              </span>
              <span
                aria-hidden
                className="mt-1 font-mono text-[20px] leading-none text-amber transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="prose-dark text-[16px] max-w-[62ch] pb-8 -mt-1">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
