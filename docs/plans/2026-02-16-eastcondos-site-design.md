# EastCondos.sg Site Migration Design

## Overview

Recreate eastcondos.sg as a modern Next.js static site, replacing the current WordPress site. The new site must be visually identical or better, fast, SEO-friendly, and easy to update via Claude Code (edit JSON content files, git push, auto-deploy).

## Tech Stack

- **Framework:** Next.js 15 (App Router, `output: 'export'` for static HTML)
- **Styling:** Tailwind CSS v3 with custom theme
- **Hosting:** Vercel (free tier)
- **Content:** JSON files in `/content/`
- **Images:** External URLs (Google Cloud Storage + WordPress uploads) — migrate later
- **Forms:** Client-side React form, wired to GoHighLevel later
- **Font:** Inter (via `next/font/google`)
- **Icons:** Lucide React
- **Animations:** CSS transitions + custom `useInView` hook (Intersection Observer)

## Architecture Decisions

1. **Static export over SSR** — Marketing site with one form. No server-side logic needed. Fastest load times, cheapest hosting.
2. **CSS-only animations over Framer Motion** — Fade-in-on-scroll effects don't justify 30KB+ bundle addition. Custom `useInView` hook handles it.
3. **No form library** — Vanilla React `useState` for the 3-step form. Simple enough that react-hook-form/zod would be over-engineering.
4. **JSON content files** — All editable text lives in `/content/*.json`. Enables non-technical updates via Claude Code.

## Pages

### Homepage (`/`)
- Sticky navbar (transparent-to-solid on scroll, mobile hamburger)
- Hero section (two-column: text + video thumbnail, stats row, dual CTAs)
- Pain Points (3 cards)
- Why Me (3 feature blocks + map image)
- How It Works (4 numbered steps)
- Testimonials (2 cards)
- Team Preview (4 member cards, link to /team)
- About Elfi (image + bio + stats)
- FAQ (accordion)
- Bottom CTA

### Calculator (`/calculator`)
- 3-step multi-step form with progress indicator
- Step 1: Personal details (with optional spouse toggle)
- Step 2: Current property situation
- Step 3: Property goals
- Confirmation screen
- Form submits to console.log (GoHighLevel webhook TODO)

### Team (`/team`)
- Hero with heading + team photo
- 4 detailed team member cards (photo, name, role, bio, contact)
- Bottom CTA

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| navy | #1a1a2e | Primary backgrounds, headings |
| gold | #d4a853 | CTAs, accents, highlights |
| body | #4a4a4a | Body text |
| light-gray | #f8f9fa | Alternating section backgrounds |
| white | #ffffff | Main content background |

## SEO

- Next.js Metadata API for title/description/OG tags per page
- LocalBusiness JSON-LD structured data
- `sitemap.xml` generated at build time
- `robots.txt` in `/public/`
- All images with alt text
- Proper heading hierarchy (h1 > h2 > h3)

## Project Structure

```
eastcondos-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── calculator/page.tsx
│   ├── team/page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── PainPoints.tsx
│   ├── WhyMe.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── TeamPreview.tsx
│   ├── About.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── StrategyForm.tsx
│   └── TeamCard.tsx
├── content/ (10 JSON files)
├── hooks/useInView.ts
├── public/images/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 90+
- Lighthouse SEO: 95+
- First Contentful Paint: < 1.5s
- Total bundle: < 100KB JS (excluding Next.js runtime)
