"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const TOC_LINKS = [
  { no: "01", label: "Approach", href: "/process" },
  { no: "02", label: "Method", href: "/process#method" },
  { no: "03", label: "Stories", href: "/case-studies" },
  { no: "04", label: "Safety Meter", href: "/safety-meter" },
  { no: "05", label: "Journal", href: "/journal" },
  { no: "06", label: "Guides", href: "/guides/east-singapore-hdb-upgrader" },
  { no: "07", label: "Calculator", href: "/calculator" },
  { no: "08", label: "Quiz", href: "/quiz" },
  { no: "09", label: "About", href: "/about" },
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
      {/* Masthead — broadsheet header */}
      <header className="border-b-2 border-charcoal bg-cream relative">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center px-6 md:px-12 py-4 text-[13px] uppercase tracking-[0.16em] text-charcoal gap-3 md:gap-0">
          <div className="hidden md:flex gap-8">
            <span className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 mr-2 align-middle animate-pulse" />
              D14&ndash;18 Specialist &middot; Singapore
            </span>
          </div>

          <a
            href="/"
            className="text-center font-serif text-[24px] md:text-[32px] leading-none text-charcoal normal-case col-span-1"
            aria-label="EastCondos.sg"
          >
            EastCondos
            <span className="block font-sans text-[12px] tracking-[0.2em] uppercase mt-1">
              The Property by Design Quarterly
            </span>
          </a>

          <div className="hidden md:flex gap-6 justify-end items-center">
            <span>Vol. XIII &middot; No. 04</span>
            <a
              href="/strategy-session"
              className="bg-charcoal text-cream px-3.5 py-2 rounded-full border border-charcoal hover:bg-amber hover:border-amber hover:text-charcoal transition-colors duration-200"
            >
              Book a Strategy Session
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden absolute top-3 right-4 p-2 text-charcoal"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Sticky TOC strip */}
      <nav
        className="hidden md:block border-b border-charcoal bg-cream sticky top-0 z-40"
        aria-label="Table of contents"
      >
        <div className="flex justify-between items-center px-12 py-3.5 text-[13px] uppercase tracking-[0.16em]">
          <ul className="flex gap-9 list-none m-0 p-0">
            {TOC_LINKS.map((l) => (
              <li key={l.href} className="flex gap-2.5 items-center">
                <span className="text-[12px]">{l.no}</span>
                <a
                  href={l.href}
                  className="font-serif text-[15px] tracking-normal text-amber-deep normal-case hover:text-charcoal transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-6 text-[#6B6B6B]">
            <a href="tel:+6596667496">+65 9666 7496</a>
            <a
              href="https://wa.me/6596667496"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-50 bg-charcoal flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
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

        <a
          href="/"
          onClick={close}
          className="flex flex-col items-center mb-12"
        >
          <span className="font-serif text-3xl text-cream">EastCondos</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-amber mt-1.5">
            Property by Design
          </span>
        </a>

        <ul className="flex flex-col items-center gap-5 list-none">
          {TOC_LINKS.map((l) => (
            <li key={l.href} className="text-cream/85 text-xl">
              <a href={l.href} onClick={close} className="hover:text-amber">
                <span className="text-amber text-[11px] tracking-[0.22em] mr-3 font-sans">
                  {l.no}
                </span>
                <span className="font-serif">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/strategy-session"
          onClick={close}
          className="mt-12 bg-amber text-charcoal px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] font-semibold"
        >
          Book a Strategy Session
        </a>
      </div>
    </>
  );
}
