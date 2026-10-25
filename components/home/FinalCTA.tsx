export default function FinalCTA() {
  return (
    <section
      data-cta-band
      className="surface-light py-24 md:py-28 px-6 md:px-12"
    >
      <div className="max-w-broadsheet mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="md:col-span-2">
          <h2 className="display-section max-w-[16ch]">
            Skip the 100 hours. Take 7 minutes.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.65] text-body max-w-[48ch]">
            Tell me your budget. I&rsquo;ll name the 3 East condos that pass my
            test, and the ones I&rsquo;d walk away from.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-4">
          <a href="/discovery" className="btn-square !bg-charcoal !text-cream hover:!bg-charcoal-light">
            Book my 7-min Fit-Check
          </a>
          <a
            href="https://wa.me/6596667496?text=Hi%20Elfi%2C%20I%27m%20looking%20at%20condos%20in%20the%20East."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-square-ghost"
          >
            WhatsApp me instead
          </a>
        </div>
      </div>
    </section>
  );
}
