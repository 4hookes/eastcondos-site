"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import navData from "@/content/nav.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
              aria-label="EastCondos.sg — home"
            >
              <span className="font-serif text-xl font-normal text-charcoal">
                EastCondos.sg
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-500 mt-0.5">
                Property by Design
              </span>
            </a>

            {/* Desktop nav links */}
            <div
              className="hidden md:flex items-center gap-8"
              role="list"
            >
              {navData.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  className="text-base text-gray-600 hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm link-hover"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a href={navData.cta.href}>
                <Button variant="default" size="default">
                  {navData.cta.label}
                </Button>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-amber transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer — prevents content from sitting under the fixed bar */}
      <div className="h-16 md:h-20" aria-hidden="true" />

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button in overlay */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Logo in overlay */}
        <a
          href="/"
          onClick={closeMobileMenu}
          className="flex flex-col items-center mb-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
        >
          <span className="font-serif text-2xl font-normal text-white">
            EastCondos.sg
          </span>
          <span className="text-xs uppercase tracking-wider text-white/50 mt-1">
            Property by Design
          </span>
        </a>

        {/* Nav links */}
        <nav className="flex flex-col items-center gap-6">
          {navData.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-xl font-normal text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-10">
          <a href={navData.cta.href} onClick={closeMobileMenu}>
            <Button variant="default" size="lg">
              {navData.cta.label}
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}

/*
 * Usage:
 * import Navbar from "@/components/Navbar";
 * Place at the top of app/layout.tsx, above all page content.
 *
 * nav.json drives all links and the CTA label/href.
 * The spacer div (h-16 md:h-20) compensates for the fixed positioning.
 */
