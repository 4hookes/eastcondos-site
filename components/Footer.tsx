export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream grain">
      <div className="max-w-broadsheet mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/15">
          <div>
            <a
              href="/"
              className="inline-flex flex-col leading-none hover:opacity-80 transition-opacity"
              aria-label="EastCondos.sg"
            >
              <span className="font-serif text-[32px] text-cream">EastCondos</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-amber mt-1">
                Property by Design
              </span>
            </a>
            <p className="mt-6 text-sm leading-[1.7] text-cream/70 max-w-[36ch]">
              A consultancy-first approach to the upgrade decision in
              Singapore&rsquo;s east. Specialising in Districts 14, 15, 16, 17,
              and 18 since 2013.
            </p>
          </div>

          <div>
            <h6 className="text-[10px] uppercase tracking-[0.28em] text-amber mb-4">
              The Practice
            </h6>
            <ul className="list-none space-y-2 text-sm text-cream/85">
              <li><a className="hover:text-amber" href="/process">Approach</a></li>
              <li><a className="hover:text-amber" href="/process#method">Method</a></li>
              <li><a className="hover:text-amber" href="/case-studies">Stories</a></li>
              <li><a className="hover:text-amber" href="/about">About Elfi</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-[10px] uppercase tracking-[0.28em] text-amber mb-4">
              Tools
            </h6>
            <ul className="list-none space-y-2 text-sm text-cream/85">
              <li><a className="hover:text-amber" href="/quiz">Readiness Quiz</a></li>
              <li><a className="hover:text-amber" href="/calculator">Calculator</a></li>
              <li><a className="hover:text-amber" href="/disclaimer-hdb-condo-meter-planner">HDB-Condo Meter</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-[10px] uppercase tracking-[0.28em] text-amber mb-4">
              Contact
            </h6>
            <ul className="list-none space-y-2 text-sm text-cream/85">
              <li><a className="hover:text-amber" href="tel:+6588415991">+65 8841 5991</a></li>
              <li><a className="hover:text-amber" href="https://wa.me/6588415991" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="hover:text-amber" href="mailto:elfi@eastcondos.sg">elfi@eastcondos.sg</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 text-[11px] uppercase tracking-[0.18em] text-cream/50">
          <div>&copy; MMXXVI EastCondos.sg &middot; Property by Design&trade;</div>
          <div className="flex gap-6">
            <span>The Elfi Division &middot; ERA Singapore &middot; L3009250K</span>
            <a className="hover:text-cream" href="/privacy">Privacy</a>
            <a className="hover:text-cream" href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
