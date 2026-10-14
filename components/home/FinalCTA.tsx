/**
 * Last stop before the footer. Carries the same two doors as the hero,
 * so the sticky bar hides while this is on screen (data-cta-band).
 */
export default function FinalCTA() {
  return (
    <section
      data-cta-band
      className="surface-light gridlines-light py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-broadsheet mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <div className="mono-label mb-7">Begin here</div>
          <h2 className="display-section max-w-[15ch]">
            Skip the 100 hours. Take the <em>7 minutes</em>.
          </h2>
          <p className="mt-7 text-[17px] leading-[1.75] text-body max-w-[46ch]">
            Tell me your budget. I&rsquo;ll name the 3 East condos that pass my
            test, and the ones I&rsquo;d walk away from.
          </p>
        </div>
        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-4">
          <a href="/discovery" className="btn-square !bg-charcoal !text-cream hover:!bg-charcoal-light !px-10 !py-5">
            Book my 7-min Fit-Check
          </a>
          <a
            href="https://wa.me/6596667496?text=Hi%20Elfi%2C%20I%27m%20looking%20at%20condos%20in%20the%20East."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-square-ghost !px-10 !py-5"
          >
            WhatsApp me instead
          </a>
        </div>
      </div>
    </section>
  );
}
