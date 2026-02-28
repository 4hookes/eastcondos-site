# EastCondos.sg Improvements Round 1 — Design

## Changes

1. **Color palette update** — Shift from navy/gold to sage green/gold. Match original site's warm, nature-inspired feel.
2. **Hero video lightbox** — Play button opens YouTube embed in modal overlay.
3. **WhatsApp floating button** — Sticky bottom-right on all pages.
4. **FAQ schema markup** — FAQPage JSON-LD for Google rich snippets.
5. **Terms page + 404 page** — Fill missing pages.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| sage | #7C9885 | Primary brand, section accents, icons, labels |
| sage-dark | #5A7262 | Dark backgrounds (CTA, navbar alt), heading accents |
| sage-light | #F2F5F0 | Alternating section backgrounds |
| cream | #FAF8F5 | Main page background |
| gold | #d4a853 | CTA buttons, key highlights only |
| gold-light | #e8c97a | CTA hover state |
| navy | #2D3436 | Headings, dark text |
| body | #4a4a4a | Body text |

## Implementation Notes

- Color changes affect: tailwind.config.ts, globals.css, and every component that references navy/gold/light-gray
- WhatsApp button goes in app/layout.tsx (visible on all pages)
- FAQ schema goes in app/page.tsx (homepage only)
- Video lightbox needs a VideoModal client component
