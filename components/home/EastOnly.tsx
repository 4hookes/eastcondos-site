import Image from "next/image";

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
    <section className="bg-charcoal-deep py-24 md:py-28 px-6 md:px-12 relative overflow-hidden">
      <div className="relative max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="space-y-6">
          <div data-clip-reveal className="relative aspect-[4/5] overflow-hidden bg-charcoal-light">
            <Image
              src="/images/home/elfi-6244.jpg"
              alt="Elfi Abdullah"
              fill
              sizes="(min-width: 768px) 33vw, 90vw"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <div className="relative aspect-video overflow-hidden bg-charcoal-light">
            <video
              src="/videos/hero/hero-loop.mp4"
              poster="/broll/hero-skyline.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="display-section max-w-[18ch]">
            One side of the island. Nothing else.
          </h2>
          <div className="prose-dark mt-6 max-w-[56ch]">
            <p>
              I&rsquo;m Elfi. I&rsquo;ve sold homes in the East for 13 years.
              I know which blocks get the afternoon sun, which stacks face the
              expressway, and what each one sold for.
            </p>
            <p>
              You cannot know that about the whole island. So I do not try.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div data-reveal className="bg-charcoal p-6">
              <div className="font-sans text-[14px] font-medium text-amber">
                What I help with
              </div>
              <p className="mt-2 text-[16px] leading-[1.6] text-cream">
                Buying a condo or EC in the East. New launch or resale.
              </p>
            </div>
            <div data-reveal className="bg-charcoal p-6">
              <div className="font-sans text-[14px] font-medium text-cream/80">
                What I say no to
              </div>
              <p className="mt-2 text-[16px] leading-[1.6] text-cream/85">
                HDB deals. Anything in the West, North, or the city.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[14px] leading-[1.7] text-cream/80">
            Neighbourhoods covered: {AREAS.join(" · ")}
          </p>

          <p className="annot mt-10 max-w-[44ch]">
            &ldquo;I would rather lose a sale today than have a family lose ten
            years to a building they should never have bought.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
