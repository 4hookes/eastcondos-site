type Props = {
  label?: string;
  quote: string;
  cite: string;
};

export default function FounderQuote({ label = "Founder's Note", quote, cite }: Props) {
  return (
    <section className="bg-charcoal text-cream py-24 md:py-32 px-6 md:px-12 border-t-[6px] border-amber">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-10 md:gap-16 items-start">
        <div className="text-[10px] uppercase tracking-[0.28em] text-amber">
          {label}
        </div>
        <div>
          <q
            className="block font-serif italic text-cream"
            style={{
              fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              quotes: "none",
            }}
          >
            {quote}
          </q>
          <cite className="block mt-9 not-italic text-[11px] uppercase tracking-[0.22em] text-amber">
            {cite}
          </cite>
        </div>
      </div>
    </section>
  );
}
