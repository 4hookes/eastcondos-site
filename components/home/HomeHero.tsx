import Image from "next/image";

export default function HomeHero() {
  return (
    <section
      data-hero
      className="relative bg-charcoal-deep overflow-hidden"
    >
      <div className="relative max-w-broadsheet mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center pt-10 md:pt-16 pb-20 md:pb-24">
        <div data-hero-content className="md:col-span-2">
          <h1 className="display-hero max-w-[14ch]">
            We find the flaw before you buy.
          </h1>

          <p className="mt-7 text-[18px] leading-[1.65] text-cream max-w-[50ch]">
            East Singapore condos only. Bad floor plans, wasted space, and
            stacks that cost too much &mdash; our team checks every East condo
            for them, then tells you straight which ones pass.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 items-center">
            <a href="/discovery" className="btn-square">
              Book a 7-min Fit-Check
            </a>
            <a href="#deep-dives" className="btn-square-ghost">
              Watch a condo check
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-[520px]">
            {[
              { num: "13 yrs", lbl: "In the East" },
              { num: "500+", lbl: "Families helped" },
              { num: "80%", lbl: "Come by referral" },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-serif text-[24px] text-cream tracking-[-0.015em] leading-tight">
                  {s.num}
                </div>
                <div className="mono-label-dim mt-1.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[420px] md:max-w-none bg-charcoal">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal-light">
            <Image
              src="/images/home/elfi-6265.jpg"
              alt="Elfi Abdullah, EastCondos"
              fill
              priority
              sizes="(min-width: 1024px) 33vw, 90vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
          <figcaption className="p-5 bg-charcoal">
            <div className="font-serif text-[24px] text-cream tracking-[-0.01em] leading-tight">
              Elfi Abdullah
            </div>
            <div className="mono-label-dim mt-1">
              Founder &amp; Lead Advisor &middot; CEA R040487C
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
