"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import navData from "@/content/nav.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // Handle hash links with smooth scroll
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" onClick={() => handleLinkClick("#top")}>
                <img
                  src={navData.logo.src}
                  alt={navData.logo.alt}
                  className="h-10"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navData.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }
                  }}
                  className="text-navy font-medium hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navData.cta.href}
                onClick={(e) => {
                  if (navData.cta.href.startsWith("#")) {
                    e.preventDefault();
                    handleLinkClick(navData.cta.href);
                  }
                }}
                className="btn-primary"
              >
                {navData.cta.label}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-navy"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navData.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                    }
                    handleLinkClick(link.href);
                  }}
                  className="text-navy font-medium hover:text-gold transition-colors duration-200 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navData.cta.href}
                onClick={(e) => {
                  if (navData.cta.href.startsWith("#")) {
                    e.preventDefault();
                  }
                  handleLinkClick(navData.cta.href);
                }}
                className="btn-primary text-center"
              >
                {navData.cta.label}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-20" />
    </>
  );
}
