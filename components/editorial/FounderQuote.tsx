type Props = {
  label?: string;
  quote: string;
  cite: string;
};

export default function FounderQuote({ label = "Founder's Note", quote, cite }: Props) {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-10 md:gap-16 items-start">
        <div className="mono-label">{label}</div>
        <div className="border-l border-amber pl-8 md:pl-12">
          <q
            className="block font-serif italic text-amber"
            style={{
              fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              quotes: "none",
            }}
          >
            {quote}
          </q>
          <cite className="block mt-9 not-italic mono-label-dim">{cite}</cite>
        </div>
      </div>
    </section>
  );
}
