# EastCondos.sg — Design System

> **Modern Luxe · Editorial Spread**
> Monocle-magazine precision applied to private wealth advisory.
> Like Aman opened a wealth-management quarterly designed by Aesop.

---

## 1. Visual Theme & Atmosphere

**Mood:** A printed quarterly. Calm authority. Magazine-spread density. Trust earned through restraint, not decoration.

**References:**
- **Monocle** — table-of-contents nav, masthead, marginalia, chapter numbering
- **Aesop / Kinfolk** — generous whitespace, italic ledes, tonal cream palette
- **Aman Resorts** — gold-on-charcoal accents, formal portraiture, hospitality gravitas
- **Goldman / Pictet private wealth** — broadsheet data tables as art, severe typography

**Principles:**
- **Quiet authority** — the page reads like a publication, not a landing site
- **Editorial structure** — every long-form section is a numbered chapter with marginalia
- **Substance over flash** — no gradients-for-gradients-sake, no scroll-jacking, no hero video
- **Trust through restraint** — looks like a private wealth quarterly, not a listings portal
- **Density = depth** — broadsheet stat grids and bordered cells signal seriousness

**Texture:** Subtle fractal-noise grain (3.5–6% opacity) on every dark surface. Cream paper-stock background on light surfaces — never clinical white.

---

## 2. Color Palette

### Core Tokens

| Token | Hex | Role |
|-------|-----|------|
| `charcoal` | `#1A1A2E` | Primary text, dark backgrounds, masthead rules, footer |
| `charcoal-light` | `#2D2D44` | Secondary dark surface (CTA blocks, charts) |
| `charcoal-deep` | `#0E0E1F` | Darkest dark, used sparingly for hero overlays |
| `amber` | `#D4A843` | Primary accent — CTAs, kickers on dark, hover states |
| `amber-light` | `#E0BC6A` | Hover for amber CTAs |
| `amber-deep` | `#B8902F` | Editorial accent — kickers on light, drop caps, "By the numbers" highlights |
| `offwhite` | `#FAFAF8` | Legacy page background (still used for /process, /calculator etc. until migrated) |
| `cream` | `#F2EBDB` | **Primary editorial page background** — paper-stock tone |
| `paper` | `#EFE7D2` | Slightly warmer cream for breaking section rhythm (Method, FAQ, Manifesto) |
| `body` | `#374151` | Body prose color |

### Neutral Greys (for borders, captions)

| Token | Hex | Role |
|-------|-----|------|
| `gray-600` | `#4B5563` / `#6B6B6B` | Captions, secondary text |
| Border dotted | `#c9bfa3` | Marginalia divider, deliverable separator |
| Border solid | `#1A1A2E` | All broadsheet grid lines, masthead rules |

### Color Don'ts
- Never pure black — always `charcoal` or `charcoal-deep`
- Never amber as a large fill — only as accents, rules, kickers, CTAs
- Never bright/saturated colors — palette is intentionally muted to the cream/charcoal/amber triangle
- Never use `offwhite` on new editorial sections — use `cream` or `paper`

---

## 3. Typography

### Font Stack
| Role | Family | Weight |
|------|--------|--------|
| Headlines, drop caps, ledes | `DM Serif Display` | 400 only (italic available) |
| Body, kickers, nav, captions | `Inter` | 300 / 400 / 500 / 600 |

### Editorial Type Scale

| Class | Size | Use |
|-------|------|-----|
| `.headline-cover` | `clamp(3rem, 6.5vw, 5.6rem)` | Hero / cover-story headline |
| `.headline-section` | `clamp(2.4rem, 4.4vw, 4rem)` | Article / chapter heading |
| `.headline-block` | `clamp(2rem, 3.6vw, 3.2rem)` | Section H2 (Method, Stories, Manifesto) |
| `.standfirst` | 22px serif italic | Magazine standfirst lede |
| Cover italic accent | `<em>` inside h1 | Amber-deep italic on key word ("*before*", "*actually*") |
| Body | 17–18px Inter 400 | Default reading size |
| Caption / kicker | 10–11px tracking-[0.22em–0.28em] | Uppercase labels |
| Drop cap (`.dropcap p:first-of-type::first-letter`) | 78px serif amber-deep | First letter of editorial body |

### Editorial Patterns

- **Kicker** (`.kicker`): hairline + uppercase amber-deep label (28px rule, then text). Always introduces a section.
- **Issue line** (`.issue-line`): same, but with hairline trailing right (used in cover stories and openers).
- **Chapter marker** (`.chapter-marker`): "Chapter 0X" in tracked uppercase + serif chapter title block.
- **Marginalia** (`.marginalia` + `.marginalia-list`): right-side article TOC with dotted dividers and page numbers.
- **Standfirst**: italic 22px serif lede, max-w-[30ch], placed between headline and body.
- **Two-column prose** (`.prose-editorial`): magazine-style 2-col text, 48px gap, with `.dropcap` trigger on first paragraph.

### Typography Don'ts
- Never bold DM Serif Display — only weight 400 exists
- Never serif body or UI labels
- Never go below 13px for prose, 10px for kickers
- Never centered paragraphs longer than 3 lines
- Never use generic letter-spacing on serif headlines — always `-0.02em` to `-0.03em`

---

## 4. Editorial Components (the new system)

### Masthead + TOC
- **Masthead**: Cream background, 2px charcoal bottom border. 3-column grid: status pill (left) · serif logo + tagline (center) · "Vol. XIII · No. 04" + CTA pill (right).
- **TOC strip**: Sticky below masthead, 1px bottom border. Numbered chapter list (`01 Approach`, `02 Method`, …) in tracked uppercase + serif chapter titles in amber-deep. Phone + WhatsApp on right.

### Hero Cover (magazine cover spread)
- 2-col: left = headline + standfirst + byline · right = portrait
- Issue line ("The Cover Story") → headline with italic amber-deep accent → standfirst → byline
- Portrait with `.photo-badge` (top-left amber chip) + `.photo-caption` (charcoal strip across bottom: name + photo credit)
- Always followed by a 1px charcoal rule

### Index Ribbon
- Charcoal background, cream text, 5-col grid
- Left cell: "In this issue" + serif blurb
- Other 4 cells: large serif chapter number (50% opacity) + serif title + amber page reference

### Chapter Article
- 2-col: marginalia (1fr) + prose (2fr)
- Header: chapter marker (1fr) + headline (2fr), aligned at baseline
- Body: sticky marginalia sidebar + 2-column prose with drop cap
- Padding: py-24 md:py-32

### Method Grid (broadsheet)
- 4-col bordered grid, charcoal lines
- Each cell: large serif number (30% opacity) + when label (top-right amber-deep) + serif title + body + footer with deliverable
- Hover: cell background becomes cream (subtle)

### Founder Quote
- Charcoal background, 6px amber top-rule
- 1fr/4fr grid: label · italic serif quote (clamp 1.8–3rem) + amber cite
- Used multiple times across pages with different quotes

### Stories Shelf
- Cream background, 2px charcoal bottom rule on header
- Featured: 1.4fr/1fr grid — hero image (badge top-left) + meta + serif title + lede + 2x2 broadsheet data table + read link
- Index: 3-col cards, each pt-4 with charcoal top border, meta + serif title + summary with serif amber-deep numbers

### By The Numbers (broadsheet stats)
- 4-col bordered grid (charcoal lines)
- Each cell: kicker label + 108px serif number with amber-deep suffix + small note
- Header: serif "By the numbers" + tracked verification line

### Quiz Band (CTA)
- Charcoal grain background, 6px amber top-rule
- 2-col: kicker + serif headline (italic accent) · body paragraphs + amber CTA + ghost ghost link

### Editorial FAQ
- Paper background
- 2-col Q&A: serif question (with "No. 0X" kicker above) · body answer
- Each item separated by charcoal line

### Footer (broadsheet)
- Charcoal background, grain texture
- 4-col grid: brand + blurb · The Practice · Tools · Contact
- Bottom bar: copyright · ERA license

### About Page Components
- **Opener**: massive serif (clamp 3.5–7rem) "Depth over breadth. *Trust over volume*." with issue line above, 1px bottom rule
- **Feature Spread**: 1fr/1.2fr — portrait + standfirst + drop-cap body + license byline
- **Stats Ribbon**: charcoal mid-page band, 4-col with white/15 borders, 84px serif numbers
- **Manifesto Grid**: 3-col bordered grid (Six Principles), each cell: large serif number + title + body
- **Team Grid**: 2-col, each member is 1fr/1.6fr — portrait + role kicker + name + role + one-liner + contact

---

## 5. Layout Principles

### Containers
- `max-w-broadsheet` (1320px) — primary editorial container
- `max-w-[1100px]` — quote band, FAQ, quiz CTA (narrower for reading)
- `max-w-broadsheet` with `px-6 md:px-12` — standard horizontal padding

### Vertical Rhythm
- Major section padding: `py-24 md:py-32`
- Editorial article inner gap: `gap-12 md:gap-20`
- Card padding: `p-7` to `p-8`
- Between header and grid: `mb-12` to `mb-16`

### Background Rhythm (editorial alternation)
1. **Cream** — Hero, By the numbers, Stories
2. **Charcoal** — Index ribbon, Founder quote, Quiz band, Stats ribbon (about), Footer
3. **Paper** — Method grid, Editorial FAQ, Manifesto grid

**Rule:** Never two adjacent sections of the same background. Never two dark sections back-to-back without a light break.

### Borders as Structure
- Broadsheet grids use 1px solid charcoal lines (`.broadsheet` utility)
- Article-internal dividers use `border-dotted border-[#c9bfa3]`
- Section dividers use `border-b border-charcoal pb-6 mb-12` or `border-b-2` for emphasis

---

## 6. Depth & Elevation

Minimal depth in the editorial system. Lift comes from typographic hierarchy and bordered grids, not shadows.

| Token | Value | Use |
|-------|-------|-----|
| `shadow-premium` | `0 4px 20px rgba(0,0,0,0.06)` | Default cards (legacy, used outside editorial system) |
| `shadow-premium-lg` | `0 8px 40px rgba(0,0,0,0.08)` | Modals |
| `shadow-premium-glow` | amber-tinted glow | Featured cards |

Editorial sections do not use shadows. They use grain + borders.

---

## 7. Motion

**Restrained editorial.** No WebGL, no scroll-jacking.

Approved patterns:
- `animate-pulse` on the green status dot in masthead
- 200–300ms color/transform transitions on nav links and CTAs
- `hover:bg-cream` cell background fade on Method grid
- `hover:-translate-y-0.5` on amber CTAs
- `.fade-in-section` (legacy, available) for IntersectionObserver scroll reveals

Never:
- Scroll-bound 3D
- Particle effects
- Auto-playing video
- Animated gradient backgrounds (the cream is the gradient)

---

## 8. Do's and Don'ts

### Do
- Use cream/paper backgrounds for all light sections
- Number every chapter, every step, every principle
- Use kickers above every section heading
- Use broadsheet borders for data and step grids
- Use serif italics with amber-deep color for emphasis words
- Use drop caps on the first body paragraph of editorial articles
- Use marginalia sidebars to make articles feel like magazine spreads
- Use the photo-caption strip on every portrait

### Don't
- Don't use white card surfaces in editorial sections — use bordered cells on cream/paper instead
- Don't use rounded corners on editorial cells (only on CTA pills and the masthead pill)
- Don't use gradients on light surfaces
- Don't use emoji as icons — Lucide React SVG only
- Don't add drop shadows to text or borders
- Don't center long body paragraphs
- Don't bold DM Serif Display
- Don't use FOMO copy: no "limited time", "act now", "don't miss out"
- Don't use blue for links — charcoal text with amber underline animation

---

## 9. Responsive Behavior

| Breakpoint | Width | Use |
|------------|-------|-----|
| `sm` | 640px | Padding bump, single-stat ribbon collapse |
| `md` | 768px | Multi-column grids, TOC strip visible, masthead 3-col |
| `lg` | 1024px | (rare — most layouts use md as the breakpoint) |

### Mobile Patterns
- Masthead collapses to single column (status hidden, CTA below logo)
- TOC strip hidden — replaced by hamburger → full-screen charcoal overlay
- All multi-col editorial grids collapse to single column
- 2-column prose collapses to 1 column
- Method/Manifesto bordered grids stack vertically (still bordered)

---

## 10. Component Inventory

All editorial components live in `components/editorial/`:

| File | Purpose |
|------|---------|
| `HeroCover.tsx` | Magazine cover hero with portrait |
| `IndexRibbon.tsx` | Charcoal "In this issue" chapter list |
| `ChapterArticle.tsx` | 2-col article with marginalia + drop cap |
| `MethodGrid.tsx` | 4-col bordered method steps |
| `FounderQuote.tsx` | Charcoal quote band (reusable, prop-driven) |
| `StoriesShelf.tsx` | Featured case study + 3-card index |
| `ByTheNumbers.tsx` | 4-col bordered stat grid |
| `QuizBand.tsx` | Charcoal CTA band for quiz |
| `EditorialFAQ.tsx` | 2-col Q&A with numbered questions |
| `about/Opener.tsx` | Massive serif page header |
| `about/FeatureSpread.tsx` | About-page magazine spread |
| `about/StatsRibbon.tsx` | Charcoal mid-page stats |
| `about/ManifestoGrid.tsx` | 3-col Six Principles |
| `about/TeamGridEditorial.tsx` | 2-col team member cards |
| `about/CenterCTA.tsx` | Centered closing CTA |

Shared chrome:
- `components/Navbar.tsx` — Masthead + sticky TOC
- `components/Footer.tsx` — Broadsheet 4-col footer

---

## 11. Agent Prompt Guide

### Quick Reference
```
Bg light:    cream #F2EBDB or paper #EFE7D2
Bg dark:     charcoal #1A1A2E (with grain)
Accent:      amber #D4A843 (dark sections), amber-deep #B8902F (light sections)
Body text:   body #374151
Headlines:   DM Serif Display 400, tracking -0.02em
Kicker:      Inter 11px uppercase tracking 0.22–0.28em
Containers:  max-w-broadsheet (1320px), px-6 md:px-12
Section pad: py-24 md:py-32
Borders:     1px solid charcoal (broadsheet), dotted #c9bfa3 (intra-article)
```

### Ready-to-Use Prompts

**New editorial section:**
> Build a section with cream background, max-w-broadsheet container, py-24 md:py-32 padding. Header: 1fr/2fr grid with chapter-marker on the left and headline-block on the right. Then a bordered grid of cells with serif numbers (30% opacity), kicker labels, serif titles, and body. Use 1px charcoal borders.

**New dark band:**
> Build a section with charcoal background, py-28 md:py-36 padding, 6px amber top-rule, grain texture overlay. Two-column layout: kicker + serif headline (with italic amber accent) on left, body + amber CTA on right.

**New article-style page:**
> Open with a massive serif (clamp 3.5–7rem) statement on cream. Then a 1fr/1.2fr feature spread with portrait (with photo-badge + photo-caption) and italic standfirst + drop-cap body. Then a charcoal stats ribbon. Then a bordered 3-col manifesto grid on paper. Close with a centered CTA on charcoal-light.
