# EastCondos.sg — Design System

> **Concrete Editorial**
> A dark, Swiss-brutalist broadsheet. Big quiet type, exposed structure, restraint.
> Like a private wealth briefing crossed with a design quarterly — modern, but it reads like print.

Chosen by Elfi 2026-06-12 (Direction B, "Concrete Editorial"). Replaces the earlier
cream-dominant "Modern Luxe / Monocle" spec. Reason it won: the **typography** —
modern sans display does the talking, the serif is demoted to a small accent. Easy to
read, not a wall of serif.

---

## 0. The one rule that defines this system

**Inter Display does the headlines. The serif is a small accent only — never a headline.**

Elfi's call: *"I don't like too many serif fonts."* So:

- **Big type = Inter Display, ExtraLight/Light.** All headlines, hero statements, section heads, stat numbers.
- **Serif (DM Serif Display, italic) = the accent voice only.** One or two emphasis words inside a headline, pull-quotes, a standfirst lede, a data figure. Think of it as the human handwriting in the margin — never the main text.
- If a whole heading is in serif, it's wrong. Convert it to Inter Display and serif just the one word that carries the feeling.

---

## 1. Visual Theme & Atmosphere

**Mood:** Dark, structural, confident. Lots of negative space. The page feels engineered, not decorated.

**References:**
- **Experimental Jetset / Bureau Borsche** — Swiss-brutalist grids, exposed structure, type as the whole design
- **FT Weekend / Monocle** — broadsheet density, mono datelines, numbered sections
- **Pentagram annual reports** — giant ghost numerals, hairline rules, restraint

**Principles:**
- **Type is the design** — a great headline in great type needs almost no decoration
- **Less words, more structure** — say it once, big; let icons and space carry the rest
- **Exposed grid** — faint vertical gridlines run down every section, like a print layout guide left visible
- **Restraint** — no shadows, no gradients, no rounded cards, no emoji, no FOMO
- **Quiet authority** — dark and calm signals seriousness more than bright and busy

**Texture:** Faint fractal grain on dark surfaces (`.grain`, 3.5%). Exposed 6-column gridlines (`.gridlines`) on most sections.

---

## 2. Color Palette

Dark-dominant. The site lives on near-black; cream is now the *accent surface* used to break rhythm and host long reading.

| Token | Hex | Role |
|-------|-----|------|
| `charcoal-deep` | `#0E0E1F` | **Primary background** — the whole site sits on this |
| `charcoal` | `#1A1A2E` | Secondary dark surface (inset bands, featured cards) |
| `charcoal-light` | `#2D2D44` | Hover dark, image placeholders |
| `cream` | `#F2EBDB` | Primary text on dark · **accent surface** for long-form reading (`.surface-light`) |
| `paper` | `#EFE7D2` | Slightly warmer cream, for inset boxes on light surfaces |
| `amber` | `#D4A843` | The single accent — mono labels, serif emphasis, CTAs, icons-on-dark |
| `amber-light` | `#E0BC6A` | CTA hover |
| `amber-deep` | `#B8902F` | Amber accent on cream surfaces (labels, serif emphasis) |
| `body` | `#374151` | Body prose **on cream surfaces only** |

**Text colors:**
- On dark: cream at 82% (`rgba(242,235,219,.82)`) for body, full cream for headlines, amber for labels/emphasis.
- On cream (`.surface-light`): `body #374151` for prose, charcoal for headlines, amber-deep for labels.

**Hairlines:** `.hairline` = `rgba(242,235,219,.14)` on dark · `border-charcoal` on cream.

### Color Don'ts
- Never pure black — always `charcoal-deep`.
- Amber is an accent, never a fill behind big text blocks. Small CTAs and the occasional band only.
- No second accent color. The whole palette is charcoal + cream + amber. That's it.
- No gradients anywhere. The grain + gridlines are the only "texture".

---

## 3. Typography

### Font Stack
| Role | Family | Weight | Tailwind |
|------|--------|--------|----------|
| **Display headlines, hero, stat numbers** | **Inter Display** (local OTF) | 200 / 300 / 400 | `font-display` |
| Body, UI, nav | Inter | 300–600 | `font-sans` |
| **Labels, datelines, data, captions** | IBM Plex Mono | 400 / 500 | `font-mono` |
| **Accent only** — emphasis word, pull-quote, standfirst, data figure | DM Serif Display (italic) | 400 | `font-serif` |

Real Inter Display cuts are bundled at `app/fonts/InterDisplay-*.otf` (ExtraLight/Light/Regular/Italic) and wired via `next/font/local` → `--font-inter-display`. Use the real display family, not faux-light Inter.

### The display classes (use these, don't hand-roll sizes)
| Class | Size | Use |
|-------|------|-----|
| `.display-hero` | clamp 3.2–7.2rem, weight 200, -0.045em | Page hero statement |
| `.display-section` | clamp 2.2–3.8rem, weight 200, -0.035em | Section heading |
| `.display-block` | clamp 1.6–2.3rem, weight 300, -0.025em | Card title, sub-head |

Inside any display class:
- `<b>` / `<strong>` → weight 400 emphasis (the "heavier" word). **Never actual bold.**
- `<em>` / `<i>` → flips to **serif italic amber** (the accent). This is the only place serif appears in a headline, and only on 1–2 words.

### The supporting classes
- `.mono-label` — amber mono, uppercase, 0.3em tracking. The section/index label. (e.g. `02 / The Method`)
- `.mono-label-dim` — cream-50 mono, for datelines/footnotes.
- `.annot` — serif italic amber with a hairline left border. The "margin note" / standfirst voice.
- `.prose-dark` — cream-66 body for reading on dark.
- `.meganum` — giant ghost serif numeral (clamp 140–300px, 5% opacity) behind section headers.

### Typography Don'ts
- **Never set a headline in serif.** Serif is the accent word only. (Rule 0.)
- Never bold DM Serif Display — weight 400 only, and only italic for accent.
- Never use Inter Display below ~22px — it's a display face; use Inter for anything body-sized.
- Numbers/data → mono or Inter Display, never serif (except a deliberate pull-figure).
- Never go below 13px for prose, 10px for mono labels.

---

## 4. Layout Signatures (what makes it "Concrete Editorial")

1. **Exposed gridlines.** Most sections carry `.gridlines` (dark) or `.gridlines-light` (cream) — faint vertical rules at every 1/6, like a visible print grid. Auto-hidden on mobile.
2. **Giant ghost numeral.** Section openers carry a `.meganum` (01–05, or a tool glyph) bleeding off the right edge at 5% opacity.
3. **Mono index labels.** Every section is introduced by `NN / Name` in amber mono, not a sentence.
4. **Square edges.** No rounded corners except the masthead nothing. Buttons are square (`.btn-square`, `.btn-square-ghost`).
5. **Hairline structure.** 1px cream-14% borders separate everything. Bordered grids, not cards with shadows.
6. **Surface flip for reading.** Long-form (tool bodies, legal, article prose) sits on a `.surface-light` cream block so it's comfortable to read; the dark is for statements and structure.

### Containers & rhythm
- `max-w-broadsheet` (1320px), `px-6 md:px-12`.
- Section padding `py-20 md:py-28` (openers) / `py-24 md:py-32` (content sections).
- Background rhythm: **charcoal-deep → charcoal-deep (different section) → cream surface-light → charcoal-deep**. Never two cream surfaces adjacent; dark-on-dark is fine here (the gridlines + hairline borders separate them).

---

## 5. Brand Assets — USE THESE TO CUT WORD COUNT

Elfi's standing instruction: **more images, more design, fewer words.** We own a full custom asset library — reach for it before writing another paragraph.

### Hairline icons — `<EcIcon>` (95 icons, dark + light variants)
- `import EcIcon from "@/components/EcIcon"` · names typed in `components/ecIcons.ts`.
- **On dark surfaces always pass `variant="light"`** (cream strokes). `variant="dark"` is for cream surfaces.
- Props: `name`, `size` (px), `variant`, `className`, `alt` (omit for decorative).
- Names are the source of truth in `public/icons/icon-library.json`. 95 across property-types, money, process, location/amenities, advisory, outcomes.
- **Where they're wired now:** IndexRibbon chapters, MethodGrid steps, ManifestoGrid principles — one icon per cell, so a cell reads as icon + 3 words + one line, not a paragraph.
- **Use them for:** any list of 3–6 things (steps, factors, features, amenities, costs). Icon + label beats a bulleted sentence.

### Spot illustrations — `<SpotGraphic>` (6 scenes, dark + light)
- `import SpotGraphic from "@/components/SpotGraphic"`. Names: `spot-journey`, `spot-eastcoast`, `spot-safety`, `spot-consultation`, `spot-nl-resale`, `spot-numbers`.
- 16:9 hairline line-art. **On dark openers pass `variant="light"`.**
- **Where wired now:** every tool-page opener (calculator, safety-meter, NL-vs-resale, progressive-payment, discovery) carries its matching spot, floated right at ~25% opacity behind the headline. Replaces the old "ghost glyph" placeholder.
- **Use them for:** the hero of any new page/section as a quiet background visual, or full-strength as a section divider.

### Photography / B-roll
- Real photos live under `public/images/` (hero.png, stories-cover.png) and `public/broll/` (curated stills pulled from Supabase). Pipeline to generate more: Gemini 3 Pro Image / Higgsfield, then grade into brand.
- Master asset index across icons/spots/broll/audio lives in Supabase `cp_assets_index` (~155 b-roll stills/clips, all tagged by `category` + `keywords`). The team gallery at `/team/library` browses it. Pull the strongest shots into `public/broll/` rather than hot-linking — keeps the static export self-contained.
- **Treatment is mandatory** — never drop a raw photo in. Desaturate + darken (`filter: grayscale(0.3) contrast(1.04) brightness(0.83)`) and mask with a charcoal-deep gradient so it reads as branded texture, not stock. Raw stock = looks MORE AI-built, the opposite of the goal.

### Photo bands — `<PhotoBand>` (the human beat)
- `import PhotoBand from "@/components/editorial/PhotoBand"`. Full-bleed treated photo + charcoal gradient + one `.mono-label` + one `.display-section` line (with a single serif-amber `<em>` accent) anchored bottom-left. Optional `attribution` sub-label.
- **Use sparingly** — one emotional/outcome image between data-heavy sections, never a gallery. Live examples: home (`family-window.jpg`, the "why"), process (`keys-handover.jpg`, the payoff).
- The hero backdrop is the same idea inline: skyline at `opacity-.32` behind the cover type, double gradient (left→right + bottom→up) so the headline stays crisp.

### The rule of thumb
> Before writing a paragraph to explain a list, ask: can an icon row or a spot say it? If yes, use the asset and cut the words to a label + one line.

---

## 6. Components (Concrete Editorial)

Editorial components in `components/editorial/`:

| File | What it is now |
|------|----------------|
| `HeroCover.tsx` | Dark hero: mono index label · `.display-hero` with serif-amber accent word · `.annot` pull-quote · inline stat row · square CTAs · `.meganum` 01 |
| `IndexRibbon.tsx` | 4 chapter cells, each: mono `NN / Tag` + `<EcIcon light>` + display title + one line |
| `ChapterArticle.tsx` | Cream `.surface-light` reading block: marginalia sidebar + 2-col drop-cap prose |
| `MethodGrid.tsx` | Dark bordered 4-col: meganum 03 · per-cell ghost numeral + `<EcIcon light>` + display title + mono deliverable |
| `FounderQuote.tsx` | Dark band, hairline-left serif-italic-amber quote |
| `StoriesShelf.tsx` | Dark: featured case (image + mono data grid) + 3 index cards |
| `ByTheNumbers.tsx` | Dark bordered 4-col, Inter Display ExtraLight numbers with amber suffix |
| `QuizBand.tsx` | Cream `.surface-light` CTA → Safety Meter |
| `EditorialFAQ.tsx` | Dark numbered Q&A |
| `about/Opener.tsx` | Dark `.display-hero` page header |
| `about/FeatureSpread.tsx` | Cream spread: portrait + drop-cap founder note |
| `about/StatsRibbon.tsx` | Dark mid-page stat band |
| `about/ManifestoGrid.tsx` | Dark bordered 3-col, per-cell ghost numeral + `<EcIcon light>` |
| `about/TeamGridEditorial.tsx` | Cream team grid; missing photos fall back to a grain monogram tile |
| `about/CenterCTA.tsx` | Dark closing CTA, square buttons |

Shared chrome:
- `Navbar.tsx` — sticky dark mast: wordmark · mono nav with amber numerals · ghost square CTA · full-screen mobile overlay
- `Footer.tsx` — dark gridlines, 4-col, mono headings

---

## 7. Motion
Restrained. 200–300ms color/opacity transitions on nav, icons (opacity 70→100 on hover), CTAs, and card hover (`hover:bg-charcoal/60`). `.fade-in-section` available for scroll reveal. Never: scroll-jacking, parallax, autoplay video, animated gradients.

---

## 8. Do / Don't

### Do
- Headlines in Inter Display ExtraLight/Light, one serif-amber accent word.
- Introduce every section with a `mono-label` (`NN / Name`).
- Reach for `<EcIcon light>` / `<SpotGraphic light>` before writing another list paragraph.
- Keep the exposed gridlines + meganum on section openers.
- Flip to `.surface-light` cream for anything people actually read at length.
- Square buttons, hairline borders, lots of negative space.

### Don't
- Don't set headlines in serif. (Rule 0.)
- Don't bold DM Serif Display, ever.
- Don't add a second accent color, gradients, shadows, or rounded editorial cells.
- Don't use emoji as icons — `<EcIcon>` or Lucide only.
- Don't write a paragraph where an icon row says it.
- Don't use FOMO/urgency ("act now", "limited time", "don't miss out").
- Don't put cream body text on cream with no contrast, or cream-on-cream sections back to back.

---

## 9. Responsive
- Gridlines + meganum hide on mobile (<768px).
- Dark mast collapses to wordmark + hamburger → full-screen charcoal overlay with display-type links.
- All bordered grids stack to single column (still hairline-bordered).
- Spot illustrations in openers are `hidden md:block` (decorative, desktop only).
- Tool/article bodies must stay overflow-safe: parent grids use `grid-cols-1 md:grid-cols-[...minmax(0,1fr)]` and reading columns use `min-w-0`.

---

## 10. Quick Reference (for agent prompts)
```
Bg:            charcoal-deep #0E0E1F (whole site) · cream #F2EBDB = .surface-light reading blocks
Accent:        amber #D4A843 (dark) / #B8902F (cream) — labels, 1 serif word, CTAs, icons
Headlines:     .display-hero / .display-section / .display-block  (Inter Display 200/300)
  emphasis:    <b> = weight 400 · <em> = serif italic amber (1–2 words MAX)
Labels:        .mono-label  →  "02 / The Method"  (IBM Plex Mono, amber)
Margin note:   .annot  (serif italic amber, hairline-left)
Body on dark:  .prose-dark   ·  Body on cream: text-body #374151
Structure:     .gridlines / .gridlines-light · .meganum · .hairline borders · square buttons
Icons:         <EcIcon name=".." variant="light" size={36} />   (light on dark!)
Spots:         <SpotGraphic name="spot-.." variant="light" />   (light on dark!)
Container:     max-w-broadsheet, px-6 md:px-12 · section py-24 md:py-32
```

### Ready-to-use prompt — new section
> Dark `bg-charcoal-deep gridlines` section, `py-24 md:py-32`, a `.meganum` ghost numeral bleeding off the right. Open with a `.mono-label` ("NN / Name"), then a `.display-section` headline with ONE serif-amber `<em>` accent word. If it's a list of 3–6 items, build a hairline-bordered grid where each cell is `<EcIcon variant="light">` + display-block title + one short line — not paragraphs. Square amber CTA. No serif headlines, no shadows, no rounded corners.
