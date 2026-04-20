import Image from "next/image";

export default function FeatureSpread() {
  return (
    <section className="bg-cream px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
        <div className="relative">
          <span className="photo-badge">In Conversation</span>
          <Image
            src="https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/68d9e2b64c35d6324e9f6e5c.png"
            alt="Elfi Abdullah"
            width={800}
            height={1000}
            unoptimized
            priority
            className="w-full aspect-[4/5] object-cover"
            style={{ filter: "contrast(1.04) saturate(0.92)" }}
          />
          <div className="photo-caption">
            <span>Elfi Abdullah &middot; Founder</span>
            <span className="text-amber">Photographed in Katong, March 2026</span>
          </div>
        </div>

        <div>
          <p
            className="font-serif italic text-charcoal max-w-[24ch] mb-9"
            style={{ fontSize: "28px", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            &ldquo;I built EastCondos on one belief: that families deserve an
            advisor who knows their patch of Singapore inside out &mdash; and
            will tell them the truth, even when the truth is &lsquo;not
            yet&rsquo;.&rdquo;
          </p>

          <div className="dropcap text-[18px] leading-[1.78] text-body max-w-[54ch]">
            <p>
              For thirteen years, I have helped Singapore families navigate the
              upgrade from HDB to condo. I chose to specialise in Districts 15,
              16, and 18 because depth matters more than breadth. When you know
              every project, every street, every price movement &mdash; you spot
              opportunities others miss.
            </p>
            <p className="mt-5">
              More importantly, you protect families from mistakes that take
              years to recover from. The eleven-factor model exists because two
              early clients in 2014 made decisions I could have prevented if I
              had been more disciplined. I have not made that mistake since.
            </p>
            <p className="mt-5">
              This is the practice. Not a brokerage. Not a listings portal. A
              small, deliberately-sized advisory built around four documents,
              eleven factors, and one rule: the maths agrees with the family
              before any building is ever shown.
            </p>
          </div>

          <div className="mt-9 border-t border-charcoal pt-4 flex justify-between items-center text-[11px] uppercase tracking-[0.22em] text-[#6B6B6B]">
            <span>
              <b className="text-charcoal font-medium">Elfi Abdullah</b>{" "}
              &middot; Founder &middot; The Elfi Division, ERA Singapore
            </span>
            <span>L3009250K</span>
          </div>
        </div>
      </div>
    </section>
  );
}
