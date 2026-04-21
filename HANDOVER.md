# Handover — EastCondos.sg Rebuild

> Last updated: 2026-04-21
> Status: Home + About live on production. Editorial system established. Ready for next phase.

---

## 1. Project state

**Brand:** EastCondos.sg · Property by Design™
**Owner:** Elfi Abdullah (`elfiabdullah@gmail.com`)
**Developer (infra):** Jimmy (handle on GitHub: TBD — needs to be added as Admin)
**Tech lead / agent:** Claude (this assistant), Opus 4.7

### What's live right now on eastcondos.sg

| Page | Status | Design system |
|------|--------|---------------|
| `/` Home | ✅ Shipped | Monocle Editorial |
| `/about` | ✅ Shipped | Monocle Editorial |
| `/process` | ⚠ Old Modern Luxe | Port pending |
| `/case-studies` | ⚠ Old Modern Luxe | Port pending |
| `/case-studies/[slug]` | ⚠ Old Modern Luxe | Port pending |
| `/calculator` | ⚠ Redirects to `/strategy-session` (old) | Revisit |
| `/quiz` | ⚠ Old Modern Luxe | Port pending |
| `/strategy-session` | ⚠ Old Modern Luxe | Port pending |
| `/team` | ⚠ Redirects to `/about` | Fine |
| Legal (`/privacy`, `/terms`) | ⚠ Old Modern Luxe | Minor port |

### Shared chrome (affects every page)

- `components/Navbar.tsx` — Masthead + sticky TOC (editorial, shipped)
- `components/Footer.tsx` — Broadsheet 4-col footer (editorial, shipped)
- `components/WhatsAppButton.tsx` — Floating WhatsApp CTA (still active)

### Recent commits

```
c788194 fix(type): bump editorial small-text sizes for web readability
e0dca80 feat: rebuild Home + About in Monocle-luxe editorial system
196d098 feat: complete site rebuild with Modern Luxe design system (pre-rebuild)
```

---

## 2. Architecture

### Stack
- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Styling:** Tailwind CSS (config at `tailwind.config.ts`)
- **Type:** TypeScript
- **Fonts:** `DM Serif Display` (headlines) + `Inter` (body) via `next/font/google`
- **Icons:** Lucide React
- **Output:** `output: "export"` — static HTML bundle, no server runtime

### Deploy pipeline
```
Elfi's Mac → git push origin main → GitHub (4hookes/eastcondos-site)
→ Vercel auto-builds (~25-30s) → eastcondos.sg
```

- DNS `eastcondos.sg` → `76.76.21.21` (Vercel anycast) — confirmed live
- Custom domain claimed in Vercel project `eastcondos-site` under org `elfis-projects-9e931079`
- SSL auto-provisioned by Vercel
- **No server-side features** — anything requiring API keys, forms, DB needs a serverless route OR an external service (GHL, MailerLite, webhooks)

### Environment
- **Dev server:** `npm run dev -- -p 3100` (port 3000 occupied by another node process on Elfi's Mac)
- **Build:** `npm run build` → generates 16 static routes
- **Deploy CLI:** `vercel` (already authenticated with Elfi's account)

---

## 3. Design system — Modern Luxe Editorial

### Source of truth
- **In repo:** `DESIGN.md` (11 sections, full spec)
- **Globally:** `~/.claude/DESIGN.md` (synced copy for cross-project use)
- **Tokens:** `tailwind.config.ts`
- **Utilities:** `app/globals.css` (editorial layer)

### Reference
Monocle magazine × Aesop minimalism × Aman hospitality × Goldman private-wealth. Reads like a printed quarterly.

### Palette
| Token | Hex |
|-------|-----|
| charcoal | `#1A1A2E` |
| charcoal-light | `#2D2D44` |
| charcoal-deep | `#0E0E1F` |
| amber | `#D4A843` |
| amber-light | `#E0BC6A` |
| amber-deep | `#B8902F` |
| cream | `#F2EBDB` |
| paper | `#EFE7D2` |
| offwhite | `#FAFAF8` (legacy) |
| body | `#374151` |

### Type scale
- Cover headline: `clamp(3rem, 6.5vw, 5.6rem)` DM Serif Display
- Section headline: `clamp(2.4rem, 4.4vw, 4rem)`
- Block headline: `clamp(2rem, 3.6vw, 3.2rem)`
- Standfirst: 22px italic serif
- Body: 17–18px Inter
- Kickers: **13px** uppercase tracking 0.22em amber-deep
- Photo captions / badges: **12px**
- Stat notes, method body, manifesto body: **15px**

### Editorial components (all in `components/editorial/`)
- `HeroCover.tsx` — Magazine cover with portrait flush right
- `IndexRibbon.tsx` — Charcoal "In this issue" chapter list
- `ChapterArticle.tsx` — 2-col with marginalia + drop cap
- `MethodGrid.tsx` — 4-col broadsheet-bordered method steps
- `FounderQuote.tsx` — Reusable charcoal quote band
- `StoriesShelf.tsx` — Featured case study + 3-card index
- `ByTheNumbers.tsx` — 4-col broadsheet stats
- `QuizBand.tsx` — Charcoal CTA band
- `EditorialFAQ.tsx` — 2-col Q&A with numbered questions
- `about/Opener.tsx` — Massive serif page header
- `about/FeatureSpread.tsx` — About-page magazine spread
- `about/StatsRibbon.tsx` — Charcoal mid-page stats
- `about/ManifestoGrid.tsx` — Six Principles 3-col
- `about/TeamGridEditorial.tsx` — 2-col team cards
- `about/CenterCTA.tsx` — Centered closing CTA

---

## 4. Workflow preferences (saved as memory defaults)

1. **Deploy flow:** small changes → direct to `main` (live in 30s). Big changes (new pages, homepage restructure) → `preview` branch → Vercel preview URL → review → merge.
2. **Image pipeline:** new photography lands in a Google Drive folder → pulled into `/public/images/` in repo → committed. No CDN.
3. **Content updates:** Elfi tells Claude in chat, Claude edits JSON/components and commits. Revisit CMS (Sanity) at ~10 case studies.
4. **Design implementation:** always mock in HTML first before React implementation.
5. **Design preferences:** SVG icons only, 18px+ body, darker secondary text, more imagery over empty space.

---

## 5. Content state — what's real vs placeholder

### Real
- Elfi portrait: `https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/68d9e2b64c35d6324e9f6e5c.png` (GHL-hosted, casual headshot)
- FAQ items: from `content/faq.json` (real copy)
- Team member bios: from `content/team.json` (real but dated)
- Contact: `+65 8841 5991` / `elfi@eastcondos.sg` / `wa.me/6588415991`
- ERA license: `L3009250K`

### Placeholder / fabricated (need replacing)
- **Case study hero image** — Unsplash stock (`images.unsplash.com/photo-1567496898669-ee935f5f647a`)
- **"James & Sarah / Tampines / No. 47"** — fabricated names, fabricated numbers ($0 cash outlay, $312k equity, 1.8% × 30y). Replace with real anonymized client or remove until available.
- **Case No. 41/39/35 (Bedok, Marine Parade, Pasir Ris)** — fabricated summaries. Same.
- **Stats: 13 yrs / 500+ / 80% / 4.9★** — asserted but not linked to proof. Need Google Reviews embed or verification link.
- **"Photographed in Katong, March 2026"** — caption on portrait. Not literally true; aspirational until real shoot.
- **"Vol. XIII · No. 04"** — editorial masthead affectation, fine as stylistic device.

---

## 6. Outstanding questions for Jimmy

Four items still blocking full production rollout. Elfi has a copy-paste message to send him:

1. **Old WordPress/Caddy site disposition** — keep at `148.135.12.234`, archive, or decommission?
2. **SEO redirects list** — top 20-30 old URLs from Search Console so we can 301 them to new routes.
3. **Analytics IDs to carry over** — GA4, Meta Pixel, GTM container, any others.
4. **Strategy Session form destination** — where do submissions currently flow (GHL? MailerLite? email?)

Also needs GitHub access — add Jimmy as **Admin** on `https://github.com/4hookes/eastcondos-site/settings/access` when his handle is known.

---

## 7. Next steps — prioritized roadmap

### Immediate (next session, ~3 hours)
1. **Port `/process` to editorial** — chapter-article + method-grid patterns, real 4-step walkthrough with mock deliverable screenshots
2. **Port `/quiz` to editorial** — editorial questionnaire design, results page in magazine style
3. **Port `/case-studies` and `/case-studies/[slug]`** — broadsheet case study shelf + individual case magazine spread
4. **Add trust block to Home** — Google Reviews marquee + ERA/CEA license badge + press mentions if any

### Medium term (needs real content)
5. **4–6 real case studies** — Elfi provides anonymized client stories + real numbers, Claude builds case study pages
6. **Elfi portrait shoot** — replace GHL headshot with editorial-grade portrait
7. **East Singapore location photography** — hero cover backdrop, case study property context shots (Marine Parade, Katong, Bedok)
8. **Property X-ray sample** — embed an actual anonymized X-ray PDF or build interactive viewer

### Infrastructure (once Jimmy unblocks)
9. Install GA4 + Meta Pixel + GTM
10. Wire 301 redirects in `next.config.ts` (already supports `redirects()` — just needs the list)
11. Wire Strategy Session form to final destination
12. Decommission / archive the old Caddy site

### Polish pass (after above)
13. Open Graph images per-page (dynamic OG via `@vercel/og` or static)
14. Micro-animations: scroll reveals on editorial sections, count-up on stats
15. SEO metadata per page (title, description, structured data beyond current FAQ + RealEstateAgent)
16. Mobile polish — spot-audit all editorial sections at 375px
17. Performance audit — Lighthouse 100 target

### Content expansion (ongoing)
18. Blog / Journal section in editorial style (for content engine output)
19. Newsletter signup (MailerLite integration)
20. Interactive calculator as editorial tool (currently redirects away)

---

## 8. Access & credentials

| Resource | Access | Notes |
|----------|--------|-------|
| GitHub repo | `4hookes/eastcondos-site` | Elfi = owner. Jimmy = TBD (add as Admin) |
| Vercel project | `eastcondos-site` under `elfis-projects-9e931079` | Elfi = owner |
| DNS for eastcondos.sg | Unknown registrar | **Ask Jimmy** which provider manages |
| Old Caddy server | `148.135.12.234` | Jimmy's infrastructure |
| GHL (portrait CDN) | `storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/` | Elfi's GHL instance |
| Fonts on Mac | `~/Desktop/eastcondos-brand-fonts/upload-these/` | DM Serif Display + Inter Variable |

---

## 9. Known issues / technical debt

- `next.config.ts` `redirects()` logs a warning: "rewrites, redirects, and headers are not applied when exporting your application" — this is expected with `output: "export"`. Redirects work on Vercel (edge layer) but not on the static bundle. Don't "fix" this by removing redirects — Vercel handles them.
- Legacy components still exist in `components/` (Hero, TrustBar, PainPoints, TheDifference, HowItWorks, Results, PBDMethod, QuizBanner, FAQWithCTA, About, Testimonials, PBDMethod, WhyMe, CaseStudyCard, CaseStudyPreview, TeamCard, TeamPreview, StrategyForm, etc.). They are no longer used by `/` or `/about` but are still imported by other routes. **Do not delete** until all routes are ported to editorial — they're still live code.
- `app/page.tsx` is the new editorial Home. `app/about/page.tsx` is the new editorial About.
- Elfi portrait on `/about` uses the same image as Home hero — fine for now, but when the real shoot lands, differentiate (closer crop on About, environmental portrait on Home).

---

## 10. Quick commands

```bash
# Work on the project
cd "/Users/elfi/Desktop/elfi-business/East Condos/apps/eastcondos.sg"

# Dev server (avoid port 3000)
npm run dev -- -p 3100

# Production build
npm run build

# Verify site is live
curl -sI https://eastcondos.sg/ | grep -E "server|x-vercel"

# Check latest Vercel deploy
vercel ls --yes | head -4

# Sync DESIGN.md to global
cp DESIGN.md ~/.claude/DESIGN.md
```

---

## 11. For the next session's Claude

You'll inherit this project via the auto-memory system. Key things to know:

1. **Read this doc first**, then `DESIGN.md`, then skim `components/editorial/` to understand the patterns.
2. Elfi's project CLAUDE.md (`East Condos/apps/eastcondos.sg/CLAUDE.md`) and global instructions (`~/.claude/CLAUDE.md`) set behavioral rules — follow them.
3. Workflow preferences are saved in `memory/feedback_*.md` files — apply them automatically.
4. When in doubt about "should I mock first or just ship" — **mock first for anything new, direct-to-main for tweaks**.
5. Always verify live deploys with `curl -sI https://eastcondos.sg/` headers before claiming "shipped".

When Elfi types "let's continue", load this doc and pick up from Section 7 (Next steps).
