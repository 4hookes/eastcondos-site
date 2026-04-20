import Image from "next/image";

export default function HeroCover() {
  return (
    <section className="relative bg-cream">
      <div className="max-w-broadsheet mx-auto px-6 md:px-12 pt-16 pb-12 grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-12 md:gap-16 items-end relative">
        <div className="pb-8 md:pb-12">
          <div className="issue-line mb-8">The Cover Story</div>
          <h1 className="headline-cover">
            We run your numbers <em className="italic text-amber-deep">before</em> we
            show you a single property.
          </h1>
          <p className="standfirst mt-9 max-w-[30ch]">
            A consultancy-first approach to the upgrade decision &mdash; built
            for families in Singapore&rsquo;s east who only want to do this
            once.
          </p>
          <div className="mt-9 text-[13px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            By <b className="text-charcoal font-medium">Elfi Abdullah</b>
            &nbsp;&middot;&nbsp;13 years &middot; 500 families &middot; Districts
            14, 15, 16, 17, 18
          </div>
        </div>

        <div className="relative">
          <span className="photo-badge">In Conversation</span>
          <Image
            src="https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/68d9e2b64c35d6324e9f6e5c.png"
            alt="Elfi Abdullah, founder of EastCondos.sg"
            width={800}
            height={1000}
            priority
            unoptimized
            className="w-full aspect-[4/5] object-cover"
            style={{ filter: "contrast(1.04) saturate(0.92)" }}
          />
          <div className="photo-caption">
            <span>Elfi Abdullah &middot; Founder</span>
            <span className="text-amber">Photographed in Katong, March 2026</span>
          </div>
        </div>
      </div>
      <div className="absolute left-6 right-6 md:left-12 md:right-12 bottom-0 h-px bg-charcoal" />
    </section>
  );
}
