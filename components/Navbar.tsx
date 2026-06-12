"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const TOC_LINKS = [
  { no: "01", label: "Approach", href: "/process" },
  { no: "02", label: "Stories", href: "/case-studies" },
  { no: "03", label: "Journal", href: "/journal" },
  { no: "04", label: "Guides", href: "/guides" },
  { no: "05", label: "About", href: "/about" },
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
      {/* Mast — Concrete Editorial */}
      <header className="sticky top-0 z-40 bg-charcoal-deep/95 backdrop-blur-sm border-b hairline">
        <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-6">
          <a
            href="/"
            aria-label="EastCondos.sg"
            className="font-sans text-[15px] font-medium text-cream uppercase tracking-[0.34em]"
          >
            EastCondos
          </a>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex gap-9 list-none m-0 p-0">
              {TOC_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group font-mono text-[12px] uppercase tracking-[0.18em] text-cream/60 hover:text-cream transition-colors"
                  >
                    <span className="text-amber/70 mr-2">{l.no}</span>
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <a href="/discovery" className="btn-square-ghost !px-5 !py-3 text-[11px]">
              7-Min Discovery Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-cream"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-50 bg-charcoal-deep gridlines flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={close}
          className="absolute top-5 right-5 p-2 text-cream/80 hover:text-cream"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <a href="/" onClick={close} className="flex flex-col items-center mb-14">
          <span className="font-sans text-[15px] font-medium text-cream uppercase tracking-[0.34em]">
            EastCondos
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-amber mt-2.5">
            Property by Design
          </span>
        </a>

        <ul className="flex flex-col items-center gap-6 list-none">
          {TOC_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                className="font-display font-light text-[28px] tracking-[-0.02em] text-cream/90 hover:text-amber transition-colors"
              >
                <span className="font-mono text-[11px] tracking-[0.26em] text-amber mr-4 align-middle">
                  {l.no}
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/discovery" onClick={close} className="btn-square mt-14">
          7-Min Discovery Call
        </a>
      </div>
    </>
  );
}
