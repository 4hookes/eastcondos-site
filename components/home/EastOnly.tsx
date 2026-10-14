import Image from "next/image";

/**
 * The disqualifier (North Star §1): East condos, nothing else.
 * Saying no out loud is the trust signal.
 */
const AREAS = [
  "Katong",
  "Marine Parade",
  "Siglap",
  "Bedok",
  "Tanah Merah",
  "Simei",
  "Tampines",
  "Pasir Ris",
  "Loyang",
  "Paya Lebar",
  "Eunos",
  "Upper East Coast",
];

export default function EastOnly() {
  return (
    <section className="bg-charcoal-deep gridlines py-24 md:py-32 px-6 md:px-12 border-t hairline relative overflow-hidden">
      <div aria-hidden className="meganum absolute right-6 md:right-12 -top-2 md:top-2">
        04
      </div>
      <div className="relative max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr] gap-12 md:gap-20 items-start">
        <div data-clip-reveal className="relative aspect-[4/5] overflow-hidden bg-charcoal-light border hairline max-w-[380px]">
          <Image
            src="/images/home/elfi-6244.jpg"
            alt="Elfi Abdullah"
            fill
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover object-[50%_15%]"
          />
        </div>

        <div>
          <div className="mono-label">04 / Why only the East</div>
          <h2 className="display-section mt-6 max-w-[17ch]">
            One side of the island. <em>Nothing</em> else.
          </h2>
          <div className="prose-dark mt-7 max-w-[54ch]">
            <p>
              I&rsquo;m Elfi. I&rsquo;ve sold homes in the East for 13 years.
              I know which blocks get the afternoon sun, which stacks face the
              expressway, and what each one sold for.
            </p>
            <p>
              You can&rsquo;t know that about the whole island. So I don&rsquo;t
              try.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 border-l border-t hairline">
            <div className="p-6 border-r border-b hairline">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
                I help with
              </div>
              <p className="mt-3 text-[16px] leading-[1.6] text-cream">
                Buying a condo or EC in the East. New or resale.
              </p>
            </div>
            <div className="p-6 border-r border-b hairline">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/50">
                I say no to
              </div>
              <p className="mt-3 text-[16px] leading-[1.6] text-cream/70">
                HDB deals. Anything in the West, North or the city.
              </p>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5" aria-label="Areas covered">
            {AREAS.map((a) => (
              <li key={a} className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-cream/55">
                {a}
              </li>
            ))}
          </ul>

          <p className="annot mt-12 max-w-[40ch]">
            &ldquo;I would rather lose a sale today than have a family lose ten
            years to a building they should never have bought.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
