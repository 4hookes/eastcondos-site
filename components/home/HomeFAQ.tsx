import faq from "@/content/home-faq.json";

export default function HomeFAQ() {
  return (
    <section className="bg-charcoal py-24 md:py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="relative max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div>
          <h2 className="display-section max-w-[14ch]">
            What people ask me first.
          </h2>
          <p className="prose-dark mt-4">
            Straight answers on fees, timing, and how the 7-minute Fit-Check
            works.
          </p>
        </div>

        <div className="md:col-span-2 space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.question}
              data-reveal
              className="group bg-charcoal-deep p-6"
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-[24px] leading-[1.25] tracking-[-0.015em] text-cream group-hover:text-amber-light transition-colors">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="mt-1 font-serif text-[24px] leading-none text-amber transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="prose-dark max-w-[60ch] pt-4">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
