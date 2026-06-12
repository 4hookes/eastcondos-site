export default function Footer() {
  return (
    <footer className="bg-charcoal-deep text-cream gridlines border-t hairline">
      <div className="max-w-broadsheet mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b hairline">
          <div>
            <a
              href="/"
              className="inline-flex flex-col leading-none hover:opacity-80 transition-opacity"
              aria-label="EastCondos.sg"
            >
              <span className="font-sans text-[15px] font-medium uppercase tracking-[0.34em] text-cream">
                EastCondos
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-amber mt-2.5">
                Property by Design
              </span>
            </a>
            <p className="mt-7 text-[15px] leading-[1.7] text-cream/60 max-w-[36ch]">
              A consultancy-first approach to the upgrade decision in
              Singapore&rsquo;s east. Specialising in Districts 14, 15, 16, 17,
              and 18 since 2013.
            </p>
          </div>

          <div>
            <h6 className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber mb-5">
              The Practice
            </h6>
            <ul className="list-none space-y-2.5 text-[15px] text-cream/70">
              <li><a className="hover:text-amber transition-colors" href="/process">Approach</a></li>
              <li><a className="hover:text-amber transition-colors" href="/process#method">Method</a></li>
              <li><a className="hover:text-amber transition-colors" href="/case-studies">Stories</a></li>
              <li><a className="hover:text-amber transition-colors" href="/about">About Elfi</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber mb-5">
              Tools
            </h6>
            <ul className="list-none space-y-2.5 text-[15px] text-cream/70">
              <li><a className="hover:text-amber transition-colors" href="/safety-meter">Safety Meter</a></li>
              <li><a className="hover:text-amber transition-colors" href="/calculator">Calculator</a></li>
              <li><a className="hover:text-amber transition-colors" href="/new-launch-vs-resale">New Launch vs Resale</a></li>
              <li><a className="hover:text-amber transition-colors" href="/progressive-payment-calculator">Progressive Payment</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-mono text-[11px] uppercase tracking-[0.26em] text-amber mb-5">
              Contact
            </h6>
            <ul className="list-none space-y-2.5 text-[15px] text-cream/70">
              <li><a className="hover:text-amber transition-colors" href="tel:+6596667496">+65 9666 7496</a></li>
              <li><a className="hover:text-amber transition-colors" href="https://wa.me/6596667496" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="hover:text-amber transition-colors" href="mailto:elfi@eastcondos.sg">elfi@eastcondos.sg</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">
          <div>&copy; MMXXVI EastCondos.sg &middot; Property by Design&trade;</div>
          <div className="flex gap-6">
            <span>The Elfi Division &middot; ERA Singapore &middot; L3009250K</span>
            <a className="hover:text-cream transition-colors" href="/privacy">Privacy</a>
            <a className="hover:text-cream transition-colors" href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
