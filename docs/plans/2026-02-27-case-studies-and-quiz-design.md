# Case Studies & Upgrade Readiness Quiz - Design Document

**Date**: 2026-02-27
**Status**: Approved
**Approach**: Static JSON content + client-side quiz (Approach A)

## Overview

Two new features for eastcondos.sg:

1. **Case Studies** - Real client success stories showcasing HDB-to-condo upgrades
2. **Upgrade Readiness Quiz** - An addictive, score-based assessment that tells users how ready they are to upgrade, designed for Instagram promotion

Both follow the existing architecture: JSON content files, React components, zero new dependencies.

---

## Feature 1: Case Studies

### Routing

```
/case-studies          → Listing page (all stories)
/case-studies/[slug]   → Individual story page
```

### Content Structure

Each case study is a JSON file in `content/case-studies/`:

```json
{
  "slug": "young-couple-tampines",
  "title": "From 4-Room HDB to Dream Condo in Tampines",
  "headline": "Upgraded with $0 Cash Outlay",
  "coverImage": "/images/case-studies/tampines-cover.jpg",
  "ogImage": "/images/case-studies/tampines-og.jpg",
  "category": "HDB Upgrader",
  "stats": {
    "savings": "$120K",
    "timeline": "3 months",
    "propertyType": "4-Room HDB to 3BR Condo"
  },
  "client": {
    "name": "James & Sarah",
    "profile": "Young couple, early 30s",
    "photo": "/images/case-studies/james-sarah.jpg"
  },
  "sections": {
    "challenge": "Text describing their situation...",
    "solution": "What Elfi did to help...",
    "results": "The outcome with numbers..."
  },
  "testimonial": {
    "quote": "Elfi made the entire process feel effortless...",
    "attribution": "James T., Tampines"
  },
  "beforeAfter": {
    "before": { "property": "4-Room HDB", "value": "$480K", "monthlyPayment": "$1,200" },
    "after": { "property": "3BR Condo", "value": "$1.1M", "monthlyPayment": "$2,800" }
  }
}
```

A master `content/case-studies/index.json` lists published slugs and display order.

### Listing Page (`/case-studies`)

- Hero banner: "Success Stories" heading + subtext
- Filter chips by category (HDB Upgrader, Investor, Downsizer) - client-side filtering
- Card grid: 1 col mobile, 2 col tablet, 3 col desktop
- Each card: cover image, headline stat, title, category badge, "Read Story" link
- Uses existing `Card` component from `components/ui/Card.tsx`

### Individual Page (`/case-studies/[slug]`)

Layout top-down:

1. **Hero**: Cover image + title overlay + headline stat
2. **Snapshot bar**: Key stats in a row (savings, timeline, property type)
3. **The Challenge**: Client situation with photo
4. **The Solution**: Steps taken
5. **The Results**: Numbers + before/after comparison table
6. **Client Quote**: Pull-quote block with photo and attribution
7. **CTA**: "Ready to write your own success story?" links to `/calculator`

### SEO

- `generateMetadata` per page with title, description, OG image
- JSON-LD `Article` schema on each case study page
- Sitemap: `/case-studies` at priority 0.9, individual stories at 0.8

### Instagram Optimization

- OG image (1200x630) doubles as shareable card
- Stats snapshot bar designed to be screenshot-friendly
- Before/after table works as carousel slide content

---

## Feature 2: Upgrade Readiness Quiz

### Route

```
/quiz → Single-page quiz experience
```

### Concept

A 10-question assessment that scores users on their readiness to upgrade from HDB to condo. One question per screen, mobile-first, designed for Instagram traffic. Score reveal is screenshot-worthy to encourage sharing.

### Question Categories & Weights

| Category | Weight | Questions |
|----------|--------|-----------|
| Financial Readiness | 50% | 4 questions (HDB ownership duration, estimated value, savings, household income) |
| Lifestyle Readiness | 30% | 3 questions (family size changes, current space satisfaction, ideal timeline) |
| Knowledge Readiness | 20% | 3 questions (MOP status awareness, financing exploration, advisor consultation) |

### UX Flow

```
Landing → Q1 → Q2 → ... → Q10 → Score Reveal → Lead Gate → Full Report
```

- One question per screen, no scrolling
- Large tappable option cards (not radio buttons)
- Progress bar at top (10% increments)
- Smooth slide/fade transitions between questions
- No back button (maintains momentum)
- Cannot skip questions

### Scoring

Each answer maps to a point value (0-10). Final score is weighted average across categories, yielding 0-100.

| Score | Tier | Label | Color |
|-------|------|-------|-------|
| 80-100 | Ready | "You're Ready to Upgrade" | Gold |
| 60-79 | Almost | "You're Almost There" | Sage |
| 40-59 | Getting There | "You're on the Right Track" | Blue |
| 0-39 | Early Stage | "Start Planning Your Upgrade" | Navy |

### Score Reveal Screen (Free - No Gate)

- Animated number counting up from 0 to final score
- Tier label and one-line summary
- Bar chart showing 3 category scores (Financial, Lifestyle, Knowledge)
- 1-2 teaser insights (e.g. "Your financial position is strong, but you may be missing a key step")

### Lead Gate Screen

- "Unlock Your Full Personalized Report"
- Preview of what they'll get: detailed breakdown, personalized next steps, estimated timeline
- Form: Name + Phone (minimal friction)
- CTA: "Get My Full Report"
- Secondary link: "Or book a free strategy session" to `/calculator`

### Full Report (After Submit)

- Detailed breakdown per category with specific advice
- "Your Next 3 Steps" personalized based on weakest category
- CTA: "Book Your Free Strategy Session" to `/calculator`

### Content File (`content/quiz.json`)

```json
{
  "title": "What's Your Upgrade Readiness Score?",
  "subtitle": "Answer 10 quick questions to find out if you're ready to upgrade from HDB to condo",
  "questions": [
    {
      "id": 1,
      "category": "financial",
      "text": "How long have you owned your current HDB?",
      "options": [
        { "label": "Less than 5 years", "score": 2 },
        { "label": "5-8 years", "score": 6 },
        { "label": "8+ years", "score": 10 }
      ]
    }
  ],
  "tiers": [
    { "min": 80, "max": 100, "label": "You're Ready to Upgrade", "color": "gold" },
    { "min": 60, "max": 79, "label": "You're Almost There", "color": "sage" },
    { "min": 40, "max": 59, "label": "You're on the Right Track", "color": "blue" },
    { "min": 0, "max": 39, "label": "Start Planning Your Upgrade", "color": "navy" }
  ],
  "categoryWeights": { "financial": 0.5, "lifestyle": 0.3, "knowledge": 0.2 },
  "insights": {
    "financial": { "high": "...", "mid": "...", "low": "..." },
    "lifestyle": { "high": "...", "mid": "...", "low": "..." },
    "knowledge": { "high": "...", "mid": "...", "low": "..." }
  }
}
```

---

## Homepage Integration

### New Sections (added between Testimonials and About)

1. **CaseStudyPreview** - Compact section showing 1-2 featured case study cards + "See All Stories" link. Pattern mirrors existing `TeamPreview`.

2. **QuizBanner** - Gold background banner that breaks the sage/white alternating pattern. Hook: "Think you're ready to upgrade? Find out in 2 minutes." + "Take the Quiz" button.

### Navigation Updates

Add to `content/nav.json`:
- "Success Stories" linking to `/case-studies`
- "Quiz" linking to `/quiz` (optionally with a "NEW" badge)

### Sitemap Updates

Add to `app/sitemap.ts`:
- `/case-studies` at priority 0.9
- `/case-studies/[slug]` at priority 0.8
- `/quiz` at priority 0.8

---

## Technical Architecture

### New Files

```
content/
├── case-studies/
│   ├── index.json
│   └── young-couple-tampines.json
└── quiz.json

app/
├── case-studies/
│   ├── page.tsx                      # Server Component
│   └── [slug]/
│       └── page.tsx                  # Server Component
└── quiz/
    └── page.tsx                      # Server Component (wraps QuizClient)

components/
├── CaseStudyCard.tsx                 # Card for listing page
├── CaseStudyPreview.tsx              # Homepage preview section
├── QuizBanner.tsx                    # Homepage quiz CTA banner
└── quiz/
    ├── QuizClient.tsx                # Main orchestrator ('use client')
    ├── QuizLanding.tsx               # Start screen
    ├── QuizQuestion.tsx              # Single question + option cards
    ├── QuizProgress.tsx              # Progress bar
    ├── QuizScoreReveal.tsx           # Animated score + chart
    ├── QuizLeadGate.tsx              # Name + phone form
    └── QuizFullReport.tsx            # Detailed breakdown
```

### Component Boundaries

**Server Components**: Case study listing, individual pages, cards, homepage preview, quiz page wrapper

**Client Components** (`'use client'`): Quiz flow (QuizClient), quiz banner, case study filter chips

### State Management (Quiz)

```typescript
type QuizState = 'landing' | 'question' | 'score' | 'gate' | 'report'

const [step, setStep] = useState<QuizState>('landing')
const [currentQuestion, setCurrentQuestion] = useState(0)
const [answers, setAnswers] = useState<Record<number, number>>({})
const [contact, setContact] = useState({ name: '', phone: '' })
```

No external state library. Mirrors existing StrategyForm pattern.

### Dependencies

Zero new dependencies. Uses existing: Tailwind, Lucide, CVA, clsx, tailwind-merge, useInView hook.

### Lead Capture

Quiz lead gate collects name + phone (same as StrategyForm). Shows full report client-side after submission. Wire to GoHighLevel webhook later (same TODO as calculator).

---

## Launch Plan

- Start with 1-2 real client case studies
- Quiz launches with 10 questions across 3 categories
- Both features added to homepage and navigation simultaneously
- Instagram content created from case study visuals and quiz score screens
