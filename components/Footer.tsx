export default function Footer() {
  return (
    <footer className="bg-charcoal-deep text-cream">
      <div className="max-w-broadsheet mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
          <div>
            <a
              href="/"
              className="inline-flex flex-col leading-none hover:opacity-80 transition-opacity"
              aria-label="EastCondos.sg"
            >
              <span className="font-serif text-[24px] tracking-[-0.02em] text-cream">
                EastCondos
              </span>
              <span className="font-sans text-[14px] text-amber mt-2">
                Property by Design
              </span>
            </a>
            <p className="mt-6 text-[16px] leading-[1.7] text-cream/85 max-w-[36ch]">
              A consultancy-first approach to buying a condo in
              Singapore&rsquo;s East. Focused on Districts 14, 15, 16, 17,
              and 18 since 2013.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="font-sans text-[14px] font-medium text-amber mb-4">
                The Practice
              </div>
              <ul className="list-none space-y-2.5 text-[16px] text-cream/85">
                <li><a className="hover:text-amber transition-colors" href="/process">Approach</a></li>
                <li><a className="hover:text-amber transition-colors" href="/process#method">Method</a></li>
                <li><a className="hover:text-amber transition-colors" href="/case-studies">Stories</a></li>
                <li><a className="hover:text-amber transition-colors" href="/about">About Elfi</a></li>
              </ul>
            </div>

            <div>
              <div className="font-sans text-[14px] font-medium text-amber mb-4">
                Tools
              </div>
              <ul className="list-none space-y-2.5 text-[16px] text-cream/85">
                <li><a className="hover:text-amber transition-colors" href="/calculator">Calculator</a></li>
                <li><a className="hover:text-amber transition-colors" href="/new-launch-vs-resale">New Launch vs Resale</a></li>
                <li><a className="hover:text-amber transition-colors" href="/progressive-payment-calculator">Progressive Payment</a></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="font-sans text-[14px] font-medium text-amber mb-4">
              Contact
            </div>
            <ul className="list-none space-y-2.5 text-[16px] text-cream/85">
              <li><a className="hover:text-amber transition-colors" href="tel:+6596667496">+65 9666 7496</a></li>
              <li><a className="hover:text-amber transition-colors" href="https://wa.me/6596667496" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="hover:text-amber transition-colors" href="mailto:elfi@eastcondos.sg">elfi@eastcondos.sg</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 font-sans text-[14px] text-cream/75">
          <div>&copy; 2026 EastCondos.sg &middot; Property by Design&trade;</div>
          <div className="flex flex-wrap gap-6">
            <span>The Elfi Division &middot; ERA Singapore &middot; L3002382K</span>
            <a className="hover:text-cream transition-colors" href="/privacy">Privacy</a>
            <a className="hover:text-cream transition-colors" href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
