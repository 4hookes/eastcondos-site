"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const TOC_LINKS = [
  { label: "Approach", href: "/process" },
  { label: "Stories", href: "/case-studies" },
  { label: "Journal", href: "/journal" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const close = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="relative z-40 bg-charcoal-deep">
        <div className="max-w-broadsheet mx-auto flex items-center justify-between px-6 md:px-12 py-6">
          <a
            href="/"
            aria-label="EastCondos.sg"
            className="font-serif text-[24px] text-cream tracking-[-0.02em]"
          >
            EastCondos
          </a>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex gap-9 list-none m-0 p-0">
              {TOC_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-[16px] text-cream/85 hover:text-amber transition-colors"
                  >
                    <span className="nav-u">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://wa.me/6596667496"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[16px] text-cream/85 hover:text-amber transition-colors"
            >
              WhatsApp
            </a>
            <a href="/discovery" className="btn-square-ghost !px-5 !py-2.5 !text-[16px]">
              7-Min Fit-Check
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 bg-charcoal-deep flex flex-col items-center justify-center lg:hidden"
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 p-2 text-cream/80 hover:text-cream"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <a href="/" onClick={close} className="flex flex-col items-center mb-12">
            <span className="font-serif text-[24px] text-cream tracking-[-0.02em]">
              EastCondos
            </span>
            <span className="font-sans text-[14px] text-amber mt-1.5">
              Property by Design
            </span>
          </a>

          <ul className="flex flex-col items-center gap-6 list-none">
            {TOC_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="font-serif text-[24px] tracking-[-0.015em] text-cream hover:text-amber transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/discovery" onClick={close} className="btn-square mt-12">
            7-Min Fit-Check
          </a>
        </div>
      )}
    </>
  );
}
