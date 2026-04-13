export default function Footer() {
  return (
    <footer className="bg-charcoal text-white grain">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-amber/40 to-transparent" aria-hidden="true" />
      <div className="max-w-7xl mx-auto py-16 px-5 sm:px-8">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <a
              href="/"
              className="inline-flex flex-col leading-none hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
              aria-label="EastCondos.sg — home"
            >
              <span className="font-serif text-xl font-normal text-white">
                EastCondos.sg
              </span>
              <span className="text-sm text-white/50 mt-0.5">
                Property by Design
              </span>
            </a>
            <p className="text-sm text-white/60 mt-4 leading-relaxed">
              Singapore&apos;s data-first condo investment advisory.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-sm uppercase tracking-wider text-white/40 mb-4 font-semibold">
              Quick Links
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {[
                  { label: "How It Works", href: "/process" },
                  { label: "Success Stories", href: "/case-studies" },
                  { label: "About", href: "/about" },
                  { label: "Quiz", href: "/quiz" },
                  { label: "Strategy Session", href: "/strategy-session" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-sm uppercase tracking-wider text-white/40 mb-4 font-semibold">
              Get in Touch
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+6588415991"
                  className="text-sm text-white/70 hover:text-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
                >
                  +65 8841 5991
                </a>
              </li>
              <li>
                <a
                  href="mailto:elfi@eastcondos.sg"
                  className="text-sm text-white/70 hover:text-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
                >
                  elfi@eastcondos.sg
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6588415991"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; 2026 EastCondos.sg. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/*
 * Usage:
 * import Footer from "@/components/Footer";
 * Place at the bottom of app/layout.tsx.
 *
 * Links are inlined — update here if routes change.
 */
