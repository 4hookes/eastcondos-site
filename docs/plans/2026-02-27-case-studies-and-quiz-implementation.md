# Case Studies & Upgrade Readiness Quiz Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a case studies section and an upgrade readiness quiz to eastcondos.sg, following the approved design in `docs/plans/2026-02-27-case-studies-and-quiz-design.md`.

**Architecture:** JSON content files drive both features. Case study pages are Server Components for SEO. The quiz is a single client-side orchestrator component managing state through a `QuizState` flow. Both integrate into the homepage and navigation. Zero new dependencies.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Lucide React, CVA, existing `useInView` hook.

---

## Task 1: Case Study Content Files

**Files:**
- Create: `content/case-studies/index.json`
- Create: `content/case-studies/young-couple-tampines.json`

**Step 1: Create the index file**

Create `content/case-studies/index.json`:

```json
{
  "sectionLabel": "Real results",
  "heading": "Success Stories",
  "subtext": "See how families like yours successfully upgraded from HDB to condo.",
  "slugs": ["young-couple-tampines"]
}
```

**Step 2: Create the sample case study**

Create `content/case-studies/young-couple-tampines.json`:

```json
{
  "slug": "young-couple-tampines",
  "title": "From 4-Room HDB to Dream Condo in Tampines",
  "headline": "Upgraded with $0 Cash Outlay",
  "description": "How a young couple in their early 30s upgraded from a 4-Room HDB to a 3-bedroom condo in Tampines with zero cash outlay.",
  "coverImage": "/images/case-studies/tampines-cover.jpg",
  "ogImage": "/images/case-studies/tampines-og.jpg",
  "category": "HDB Upgrader",
  "stats": {
    "savings": "$120K",
    "timeline": "3 months",
    "propertyType": "4-Room HDB → 3BR Condo"
  },
  "client": {
    "name": "James & Sarah",
    "profile": "Young couple, early 30s",
    "initials": "JS",
    "photo": ""
  },
  "sections": {
    "challenge": "James and Sarah had been living in their 4-room HDB flat in Tampines for 7 years. With their first child on the way, they knew they needed more space — but assumed upgrading to a condo was out of reach. They worried about the cash outlay, the timing of selling and buying, and whether they could afford the monthly payments on a single income during Sarah's maternity leave.",
    "solution": "Elfi ran a full financial analysis using their CPF balances, HDB valuation, and income projections. She identified a window where they could purchase first, secure a favourable condo unit, and then sell their HDB at peak demand season. She structured the timeline so the HDB sale proceeds covered the condo downpayment entirely — meaning zero cash out of pocket. She also connected them with a mortgage specialist who locked in a rate before the next rate hike.",
    "results": "James and Sarah moved into their new 3-bedroom condo in Tampines within 3 months of their first meeting with Elfi. Their monthly mortgage payment increased by $1,600, but they gained 400 sq ft of living space, a pool, gym, and direct MRT access. The total savings from Elfi's timing strategy — selling at peak and buying before the rate hike — came to approximately $120,000 compared to if they had done it on their own timeline."
  },
  "testimonial": {
    "quote": "We thought upgrading was years away. Elfi showed us the numbers and suddenly it was real. The best part? We didn't touch our savings at all.",
    "attribution": "James T., Tampines"
  },
  "beforeAfter": {
    "before": {
      "property": "4-Room HDB",
      "value": "$480,000",
      "monthlyPayment": "$1,200",
      "size": "90 sqm"
    },
    "after": {
      "property": "3BR Condo",
      "value": "$1,100,000",
      "monthlyPayment": "$2,800",
      "size": "130 sqm"
    }
  }
}
```

**Step 3: Create placeholder image directory**

Run: `mkdir -p public/images/case-studies`

**Step 4: Commit**

```bash
git add content/case-studies/ public/images/case-studies/
git commit -m "content: add case study data files and image directory"
```

---

## Task 2: CaseStudyCard Component

**Files:**
- Create: `components/CaseStudyCard.tsx`

**Step 1: Create the card component**

This is a Server Component (no `'use client'`). It displays a case study in card format for the listing page and homepage preview. Pattern follows `TeamCard.tsx` — simple props-driven display component.

```tsx
import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  headline: string;
  category: string;
  stats: {
    savings: string;
    timeline: string;
    propertyType: string;
  };
  client: {
    name: string;
    initials: string;
  };
}

export default function CaseStudyCard({
  slug,
  title,
  headline,
  category,
  stats,
  client,
}: CaseStudyCardProps) {
  return (
    <a
      href={`/case-studies/${slug}`}
      className="group block bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Category Badge + Headline Stat */}
      <div className="bg-sage-light px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark">
          {category}
        </span>
        <div className="text-2xl font-bold text-navy mt-1 font-serif">
          {headline}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-gold transition-colors">
          {title}
        </h3>

        {/* Stats Row */}
        <div className="flex gap-4 text-sm text-body mb-4">
          <div>
            <span className="font-semibold text-navy">{stats.savings}</span>
            <span className="block text-xs text-body/70">saved</span>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <span className="font-semibold text-navy">{stats.timeline}</span>
            <span className="block text-xs text-body/70">timeline</span>
          </div>
        </div>

        {/* Client + Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white text-xs font-bold">
              {client.initials}
            </div>
            <span className="text-sm text-body">{client.name}</span>
          </div>
          <span className="text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Story <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
```

**Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds (component not yet used, but should compile)

**Step 3: Commit**

```bash
git add components/CaseStudyCard.tsx
git commit -m "feat: add CaseStudyCard component"
```

---

## Task 3: Case Studies Listing Page

**Files:**
- Create: `app/case-studies/page.tsx`

**Step 1: Create the listing page**

Server Component with `generateMetadata`. Reads from `content/case-studies/index.json` and imports each case study JSON. Pattern follows `app/team/page.tsx`.

```tsx
import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import indexData from "@/content/case-studies/index.json";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

// Map slugs to imported data
const caseStudies: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export const metadata: Metadata = {
  title: "Success Stories – eastcondos.sg",
  description:
    "Real stories from families who upgraded from HDB to condo with Elfi. See how they did it and what they saved.",
  openGraph: {
    title: "Success Stories – eastcondos.sg",
    description:
      "Real stories from families who upgraded from HDB to condo with Elfi.",
    type: "website",
    url: "https://eastcondos.sg/case-studies",
  },
};

export default function CaseStudiesPage() {
  const stories = indexData.slugs
    .map((slug) => caseStudies[slug])
    .filter(Boolean);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="section-label">{indexData.sectionLabel}</p>
          <h1 className="section-heading">{indexData.heading}</h1>
          <p className="section-subtext mx-auto">{indexData.subtext}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <CaseStudyCard
              key={story.slug}
              slug={story.slug}
              title={story.title}
              headline={story.headline}
              category={story.category}
              stats={story.stats}
              client={{
                name: story.client.name,
                initials: story.client.initials,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-body mb-4">
            Ready to write your own success story?
          </p>
          <a href="/calculator" className="btn-primary">
            Book a Free Strategy Session
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify it builds and renders**

Run: `npm run build`
Then: `npm run dev` and visit `http://localhost:3000/case-studies`
Expected: Page renders with one case study card, heading, and CTA.

**Step 3: Commit**

```bash
git add app/case-studies/page.tsx
git commit -m "feat: add case studies listing page"
```

---

## Task 4: Individual Case Study Page

**Files:**
- Create: `app/case-studies/[slug]/page.tsx`

**Step 1: Create the dynamic page**

Server Component with `generateMetadata` and `generateStaticParams`. Renders the full case study story layout: hero, stats bar, challenge/solution/results sections, testimonial, before/after table, and CTA.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote, TrendingUp, Clock, Home } from "lucide-react";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

const caseStudies: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = caseStudies[slug];
  if (!story) return {};

  return {
    title: `${story.title} – eastcondos.sg`,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      type: "article",
      url: `https://eastcondos.sg/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = caseStudies[slug];
  if (!story) notFound();

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.title,
            description: story.description,
            publisher: {
              "@type": "Organization",
              name: "EastCondos.sg",
              url: "https://eastcondos.sg",
            },
          }),
        }}
      />

      <article className="bg-cream">
        {/* Hero */}
        <div className="bg-sage-dark py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Success Stories
            </a>
            <span className="inline-block bg-white/10 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {story.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight mb-4">
              {story.title}
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-gold font-serif">
              {story.headline}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-xl font-bold text-navy">{story.stats.savings}</div>
                  <div className="text-xs text-body/70 uppercase tracking-wider">Savings</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-xl font-bold text-navy">{story.stats.timeline}</div>
                  <div className="text-xs text-body/70 uppercase tracking-wider">Timeline</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-xl font-bold text-navy">{story.stats.propertyType}</div>
                  <div className="text-xs text-body/70 uppercase tracking-wider">Upgrade Path</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Client Profile */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-sage rounded-full flex items-center justify-center text-white font-bold text-lg">
              {story.client.initials}
            </div>
            <div>
              <div className="font-bold text-navy text-lg">{story.client.name}</div>
              <div className="text-body/70">{story.client.profile}</div>
            </div>
          </div>

          {/* The Challenge */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy font-serif mb-4">The Challenge</h2>
            <p className="text-body leading-relaxed text-lg">{story.sections.challenge}</p>
          </div>

          {/* The Solution */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy font-serif mb-4">The Solution</h2>
            <p className="text-body leading-relaxed text-lg">{story.sections.solution}</p>
          </div>

          {/* The Results */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy font-serif mb-4">The Results</h2>
            <p className="text-body leading-relaxed text-lg mb-8">{story.sections.results}</p>

            {/* Before / After Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-body/50 mb-3">Before</div>
                <div className="text-xl font-bold text-navy mb-4">{story.beforeAfter.before.property}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-body/70">Value</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.before.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body/70">Monthly Payment</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.before.monthlyPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body/70">Size</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.before.size}</span>
                  </div>
                </div>
              </div>
              <div className="bg-sage-light rounded-xl p-6 border-2 border-sage">
                <div className="text-xs font-semibold uppercase tracking-wider text-sage-dark mb-3">After</div>
                <div className="text-xl font-bold text-navy mb-4">{story.beforeAfter.after.property}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-body/70">Value</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.after.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body/70">Monthly Payment</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.after.monthlyPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body/70">Size</span>
                    <span className="font-semibold text-navy">{story.beforeAfter.after.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl p-8 border-l-4 border-gold mb-12 relative">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-gold opacity-20" fill="currentColor" />
            <p className="text-xl text-body leading-relaxed italic mb-4">
              &ldquo;{story.testimonial.quote}&rdquo;
            </p>
            <div className="text-sm font-semibold text-navy">— {story.testimonial.attribution}</div>
          </div>

          {/* CTA */}
          <div className="text-center bg-sage-light rounded-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-navy font-serif mb-3">
              Ready to write your own success story?
            </h3>
            <p className="text-body mb-6">
              Book a free strategy session and find out what&apos;s possible for your family.
            </p>
            <a href="/calculator" className="btn-primary">
              Book a Free Strategy Session
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
```

**Step 2: Verify it builds and renders**

Run: `npm run build`
Then: `npm run dev` and visit `http://localhost:3000/case-studies/young-couple-tampines`
Expected: Full case study page renders with all sections.

**Step 3: Commit**

```bash
git add app/case-studies/\[slug\]/page.tsx
git commit -m "feat: add individual case study page with dynamic routing"
```

---

## Task 5: Quiz Content File

**Files:**
- Create: `content/quiz.json`

**Step 1: Create the quiz data**

Full 10-question quiz with scoring, tiers, and insight text. Categories: financial (50%), lifestyle (30%), knowledge (20%).

```json
{
  "title": "What's Your Upgrade Readiness Score?",
  "subtitle": "Answer 10 quick questions to find out if you're ready to upgrade from HDB to condo.",
  "startButton": "Start the Quiz",
  "categoryWeights": {
    "financial": 0.5,
    "lifestyle": 0.3,
    "knowledge": 0.2
  },
  "questions": [
    {
      "id": 1,
      "category": "financial",
      "text": "How long have you owned your current HDB?",
      "options": [
        { "label": "Less than 5 years", "score": 2 },
        { "label": "5–7 years", "score": 5 },
        { "label": "8–10 years", "score": 8 },
        { "label": "More than 10 years", "score": 10 }
      ]
    },
    {
      "id": 2,
      "category": "financial",
      "text": "What's your estimated HDB market value?",
      "options": [
        { "label": "Below $400K", "score": 3 },
        { "label": "$400K – $550K", "score": 6 },
        { "label": "$550K – $700K", "score": 8 },
        { "label": "Above $700K", "score": 10 }
      ]
    },
    {
      "id": 3,
      "category": "financial",
      "text": "Do you have savings set aside beyond CPF for the upgrade?",
      "options": [
        { "label": "No savings yet", "score": 1 },
        { "label": "Some, but under $30K", "score": 4 },
        { "label": "$30K – $80K", "score": 7 },
        { "label": "More than $80K", "score": 10 }
      ]
    },
    {
      "id": 4,
      "category": "financial",
      "text": "What is your combined household monthly income?",
      "options": [
        { "label": "Below $7,000", "score": 2 },
        { "label": "$7,000 – $12,000", "score": 5 },
        { "label": "$12,000 – $18,000", "score": 8 },
        { "label": "Above $18,000", "score": 10 }
      ]
    },
    {
      "id": 5,
      "category": "lifestyle",
      "text": "Has your family size changed — or is it about to?",
      "options": [
        { "label": "No changes expected", "score": 3 },
        { "label": "Expecting a child soon", "score": 8 },
        { "label": "Kids growing up, need more space", "score": 9 },
        { "label": "Downsizing — kids have moved out", "score": 7 }
      ]
    },
    {
      "id": 6,
      "category": "lifestyle",
      "text": "How do you feel about your current living space?",
      "options": [
        { "label": "Love it, no complaints", "score": 2 },
        { "label": "It's fine for now", "score": 4 },
        { "label": "Starting to feel cramped", "score": 7 },
        { "label": "We really need to move", "score": 10 }
      ]
    },
    {
      "id": 7,
      "category": "lifestyle",
      "text": "What's your ideal timeline to upgrade?",
      "options": [
        { "label": "No rush — just exploring", "score": 2 },
        { "label": "Within 1–2 years", "score": 6 },
        { "label": "Within the next 12 months", "score": 8 },
        { "label": "As soon as possible", "score": 10 }
      ]
    },
    {
      "id": 8,
      "category": "knowledge",
      "text": "Do you know your MOP (Minimum Occupation Period) status?",
      "options": [
        { "label": "What's MOP?", "score": 1 },
        { "label": "I think I know, but not sure", "score": 4 },
        { "label": "Yes — haven't reached it yet", "score": 6 },
        { "label": "Yes — already passed MOP", "score": 10 }
      ]
    },
    {
      "id": 9,
      "category": "knowledge",
      "text": "Have you explored financing options for a condo purchase?",
      "options": [
        { "label": "Haven't started", "score": 1 },
        { "label": "Done some online research", "score": 4 },
        { "label": "Spoken to a bank or broker", "score": 7 },
        { "label": "Already have in-principle approval", "score": 10 }
      ]
    },
    {
      "id": 10,
      "category": "knowledge",
      "text": "Have you spoken to a property advisor about upgrading?",
      "options": [
        { "label": "No, not yet", "score": 1 },
        { "label": "No, but I want to", "score": 4 },
        { "label": "Yes, casually", "score": 7 },
        { "label": "Yes, in detail with a plan", "score": 10 }
      ]
    }
  ],
  "tiers": [
    {
      "min": 80,
      "max": 100,
      "label": "You're Ready to Upgrade",
      "summary": "Your finances, lifestyle needs, and knowledge are aligned. You're in a strong position to make the move.",
      "color": "gold"
    },
    {
      "min": 60,
      "max": 79,
      "label": "You're Almost There",
      "summary": "You're close to being fully ready. A few areas need attention, but upgrading is well within reach.",
      "color": "sage"
    },
    {
      "min": 40,
      "max": 59,
      "label": "You're on the Right Track",
      "summary": "You've made solid progress. With the right guidance, you could be ready sooner than you think.",
      "color": "blue"
    },
    {
      "min": 0,
      "max": 39,
      "label": "Start Planning Your Upgrade",
      "summary": "It's early days, but that's okay. Starting to plan now puts you ahead of most people.",
      "color": "navy"
    }
  ],
  "insights": {
    "financial": {
      "high": "Your financial position is strong. You likely have the equity and savings to support an upgrade with minimal cash outlay.",
      "mid": "Your finances are on the right track, but there are areas to strengthen. A detailed financial plan could reveal options you haven't considered.",
      "low": "Building your financial foundation is the key priority. Focus on growing your CPF OA balance and setting aside savings for the upgrade."
    },
    "lifestyle": {
      "high": "Your lifestyle needs clearly point toward more space and better amenities. The timing feels right for your family.",
      "mid": "You're starting to feel the pull toward upgrading. Clarifying your must-haves will help you act when the time comes.",
      "low": "You seem comfortable for now, but it's smart to plan ahead. Life changes can come faster than expected."
    },
    "knowledge": {
      "high": "You've done your homework. You understand the process and are well-prepared to make informed decisions.",
      "mid": "You know the basics, but there are important details that could save you significant money. A strategy session would fill the gaps.",
      "low": "There's a lot to learn about the HDB-to-condo process, and that's completely normal. Most families start exactly where you are."
    }
  },
  "report": {
    "gateHeading": "Unlock Your Full Personalized Report",
    "gateSubtext": "Get a detailed breakdown of your readiness in each category, personalized next steps, and an estimated timeline.",
    "gateButton": "Get My Full Report",
    "gateSecondary": "Or book a free strategy session",
    "reportHeading": "Your Personalized Upgrade Report",
    "nextStepsHeading": "Your Next 3 Steps",
    "ctaHeading": "Ready to Take the Next Step?",
    "ctaText": "Book a free strategy session with Elfi and get a personalized upgrade plan.",
    "ctaButton": "Book a Free Strategy Session"
  }
}
```

**Step 2: Commit**

```bash
git add content/quiz.json
git commit -m "content: add quiz questions, scoring, and insights data"
```

---

## Task 6: Quiz Components — Progress Bar & Question Screen

**Files:**
- Create: `components/quiz/QuizProgress.tsx`
- Create: `components/quiz/QuizQuestion.tsx`

**Step 1: Create QuizProgress**

Simple progress bar. Receives `current` (0-indexed) and `total`.

```tsx
interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-body/60 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

**Step 2: Create QuizQuestion**

One question per screen with large tappable option cards.

```tsx
interface QuizQuestionProps {
  question: {
    id: number;
    text: string;
    options: { label: string; score: number }[];
  };
  onAnswer: (score: number) => void;
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-8 leading-tight">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.score)}
            className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-gold hover:bg-gold/5 transition-all duration-200 active:scale-[0.98] group"
          >
            <span className="text-lg text-navy group-hover:text-gold transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add components/quiz/QuizProgress.tsx components/quiz/QuizQuestion.tsx
git commit -m "feat: add QuizProgress and QuizQuestion components"
```

---

## Task 7: Quiz Components — Score Reveal

**Files:**
- Create: `components/quiz/QuizScoreReveal.tsx`

**Step 1: Create QuizScoreReveal**

Shows animated score number, tier label, category bar chart, and 1-2 teaser insights. Uses CSS animation for the number count-up effect.

```tsx
"use client";

import { useEffect, useState } from "react";

interface CategoryScores {
  financial: number;
  lifestyle: number;
  knowledge: number;
}

interface Tier {
  label: string;
  summary: string;
  color: string;
}

interface QuizScoreRevealProps {
  score: number;
  categoryScores: CategoryScores;
  tier: Tier;
  teaserInsights: string[];
  onContinue: () => void;
}

const colorMap: Record<string, string> = {
  gold: "text-gold",
  sage: "text-sage",
  blue: "text-blue-600",
  navy: "text-navy",
};

const bgColorMap: Record<string, string> = {
  gold: "bg-gold",
  sage: "bg-sage",
  blue: "bg-blue-600",
  navy: "bg-navy",
};

export default function QuizScoreReveal({
  score,
  categoryScores,
  tier,
  teaserInsights,
  onContinue,
}: QuizScoreRevealProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(score / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setDisplayScore(current);
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  const categories = [
    { label: "Financial", value: categoryScores.financial },
    { label: "Lifestyle", value: categoryScores.lifestyle },
    { label: "Knowledge", value: categoryScores.knowledge },
  ];

  return (
    <div className="text-center animate-fadeIn">
      {/* Score */}
      <div className="mb-6">
        <div className={`text-7xl md:text-8xl font-bold font-serif ${colorMap[tier.color] || "text-navy"}`}>
          {displayScore}
        </div>
        <div className="text-lg text-body/60 mt-1">out of 100</div>
      </div>

      {/* Tier Label */}
      <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-3">
        {tier.label}
      </h2>
      <p className="text-body text-lg mb-8 max-w-md mx-auto">{tier.summary}</p>

      {/* Category Bars */}
      <div className="max-w-sm mx-auto mb-8 space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-navy">{cat.label}</span>
              <span className="text-body/60">{cat.value}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${bgColorMap[tier.color] || "bg-navy"}`}
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Teaser Insights */}
      <div className="bg-sage-light rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
        <h3 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wider">Key Insights</h3>
        {teaserInsights.map((insight, i) => (
          <p key={i} className="text-body text-sm mb-2 last:mb-0">
            {insight}
          </p>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="btn-primary text-lg px-8 py-4"
      >
        Unlock Your Full Report
      </button>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/quiz/QuizScoreReveal.tsx
git commit -m "feat: add QuizScoreReveal with animated score and category bars"
```

---

## Task 8: Quiz Components — Lead Gate & Full Report

**Files:**
- Create: `components/quiz/QuizLeadGate.tsx`
- Create: `components/quiz/QuizFullReport.tsx`

**Step 1: Create QuizLeadGate**

Name + phone form. Pattern matches `StrategyForm.tsx` form fields.

```tsx
"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

interface QuizLeadGateProps {
  heading: string;
  subtext: string;
  buttonLabel: string;
  secondaryLabel: string;
  onSubmit: (contact: { name: string; phone: string }) => void;
}

export default function QuizLeadGate({
  heading,
  subtext,
  buttonLabel,
  secondaryLabel,
  onSubmit,
}: QuizLeadGateProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    onSubmit({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="text-center animate-fadeIn">
      <Lock className="w-10 h-10 text-gold mx-auto mb-4" />
      <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-3">
        {heading}
      </h2>
      <p className="text-body mb-8 max-w-md mx-auto">{subtext}</p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
        <button type="submit" className="btn-primary w-full text-lg py-3">
          {buttonLabel}
        </button>
      </form>

      <a
        href="/calculator"
        className="inline-block mt-4 text-sm text-gold hover:text-gold-light font-semibold"
      >
        {secondaryLabel} →
      </a>
    </div>
  );
}
```

**Step 2: Create QuizFullReport**

Detailed breakdown per category with personalized next steps and CTA.

```tsx
import { CheckCircle } from "lucide-react";

interface CategoryScores {
  financial: number;
  lifestyle: number;
  knowledge: number;
}

interface QuizFullReportProps {
  score: number;
  tierLabel: string;
  categoryScores: CategoryScores;
  insights: {
    financial: string;
    lifestyle: string;
    knowledge: string;
  };
  reportContent: {
    reportHeading: string;
    nextStepsHeading: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  nextSteps: string[];
}

export default function QuizFullReport({
  score,
  tierLabel,
  categoryScores,
  insights,
  reportContent,
  nextSteps,
}: QuizFullReportProps) {
  const categories = [
    { label: "Financial Readiness", value: categoryScores.financial, insight: insights.financial },
    { label: "Lifestyle Readiness", value: categoryScores.lifestyle, insight: insights.lifestyle },
    { label: "Knowledge Readiness", value: categoryScores.knowledge, insight: insights.knowledge },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif mb-2">
          {reportContent.reportHeading}
        </h2>
        <p className="text-body">
          Your score: <span className="font-bold text-gold text-xl">{score}/100</span> — {tierLabel}
        </p>
      </div>

      {/* Category Breakdowns */}
      <div className="space-y-6 mb-12">
        {categories.map((cat) => (
          <div key={cat.label} className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy">{cat.label}</h3>
              <span className="text-lg font-bold text-gold">{cat.value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${cat.value}%` }}
              />
            </div>
            <p className="text-body text-sm leading-relaxed">{cat.insight}</p>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="bg-sage-light rounded-xl p-6 md:p-8 mb-12">
        <h3 className="text-xl font-bold text-navy font-serif mb-4">
          {reportContent.nextStepsHeading}
        </h3>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-body">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-sage-dark rounded-xl p-8 md:p-12">
        <h3 className="text-2xl font-bold text-white font-serif mb-3">
          {reportContent.ctaHeading}
        </h3>
        <p className="text-gray-300 mb-6">{reportContent.ctaText}</p>
        <a href="/calculator" className="btn-primary text-lg">
          {reportContent.ctaButton}
        </a>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add components/quiz/QuizLeadGate.tsx components/quiz/QuizFullReport.tsx
git commit -m "feat: add QuizLeadGate and QuizFullReport components"
```

---

## Task 9: Quiz Orchestrator (QuizClient)

**Files:**
- Create: `components/quiz/QuizClient.tsx`

**Step 1: Create the main quiz orchestrator**

This is the central `'use client'` component that manages quiz state and renders the correct screen. It imports quiz data and all sub-components.

```tsx
"use client";

import { useState } from "react";
import quizData from "@/content/quiz.json";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizScoreReveal from "./QuizScoreReveal";
import QuizLeadGate from "./QuizLeadGate";
import QuizFullReport from "./QuizFullReport";

type QuizStep = "landing" | "question" | "score" | "gate" | "report";

type CategoryKey = "financial" | "lifestyle" | "knowledge";

function calculateScores(answers: Record<number, number>) {
  const categories: Record<CategoryKey, { total: number; count: number }> = {
    financial: { total: 0, count: 0 },
    lifestyle: { total: 0, count: 0 },
    knowledge: { total: 0, count: 0 },
  };

  quizData.questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      const cat = q.category as CategoryKey;
      categories[cat].total += answer;
      categories[cat].count += 1;
    }
  });

  // Normalize each category to 0-100
  const categoryScores: Record<CategoryKey, number> = {
    financial: categories.financial.count > 0
      ? Math.round((categories.financial.total / (categories.financial.count * 10)) * 100)
      : 0,
    lifestyle: categories.lifestyle.count > 0
      ? Math.round((categories.lifestyle.total / (categories.lifestyle.count * 10)) * 100)
      : 0,
    knowledge: categories.knowledge.count > 0
      ? Math.round((categories.knowledge.total / (categories.knowledge.count * 10)) * 100)
      : 0,
  };

  const weights = quizData.categoryWeights as Record<CategoryKey, number>;
  const totalScore = Math.round(
    categoryScores.financial * weights.financial +
    categoryScores.lifestyle * weights.lifestyle +
    categoryScores.knowledge * weights.knowledge
  );

  return { totalScore, categoryScores };
}

function getTier(score: number) {
  return quizData.tiers.find((t) => score >= t.min && score <= t.max) || quizData.tiers[quizData.tiers.length - 1];
}

function getInsightLevel(score: number): "high" | "mid" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}

function getNextSteps(categoryScores: Record<CategoryKey, number>): string[] {
  // Find weakest category and provide targeted steps
  const sorted = Object.entries(categoryScores).sort(([, a], [, b]) => a - b);
  const weakest = sorted[0][0] as CategoryKey;

  const stepsMap: Record<CategoryKey, string[]> = {
    financial: [
      "Check your CPF OA balance and calculate your total available funds for the upgrade.",
      "Get an accurate HDB valuation — your equity is likely higher than you think.",
      "Speak to a mortgage specialist to understand your maximum loan and monthly commitment.",
    ],
    lifestyle: [
      "List your family's top 3 must-haves for your next home (space, location, amenities).",
      "Visit 2-3 condo showflats in your target area to get a feel for what's available.",
      "Discuss your upgrade timeline with your family to align on when to make the move.",
    ],
    knowledge: [
      "Check your MOP status — log into My HDBPage to confirm your eligibility date.",
      "Research the buy-first vs sell-first approach and understand the ABSD implications.",
      "Book a free strategy session to get a personalised upgrade roadmap.",
    ],
  };

  return stepsMap[weakest];
}

export default function QuizClient() {
  const [step, setStep] = useState<QuizStep>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => setStep("question");

  const handleAnswer = (score: number) => {
    const questionId = quizData.questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("score");
    }
  };

  const handleLeadSubmit = (contact: { name: string; phone: string }) => {
    // TODO: Wire to GoHighLevel webhook
    console.log("Quiz lead:", contact, "Score:", calculateScores(answers));
    setStep("report");
  };

  const { totalScore, categoryScores } = calculateScores(answers);
  const tier = getTier(totalScore);

  // Teaser insights: show the highest and lowest category
  const sortedCategories = Object.entries(categoryScores).sort(([, a], [, b]) => b - a);
  const highestCat = sortedCategories[0][0] as CategoryKey;
  const lowestCat = sortedCategories[sortedCategories.length - 1][0] as CategoryKey;
  const insights = quizData.insights as Record<CategoryKey, Record<string, string>>;
  const teaserInsights = [
    insights[highestCat][getInsightLevel(categoryScores[highestCat])],
    insights[lowestCat][getInsightLevel(categoryScores[lowestCat])],
  ];

  // Full report insights
  const fullInsights = {
    financial: insights.financial[getInsightLevel(categoryScores.financial)],
    lifestyle: insights.lifestyle[getInsightLevel(categoryScores.lifestyle)],
    knowledge: insights.knowledge[getInsightLevel(categoryScores.knowledge)],
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 md:py-20 min-h-[60vh]">
      {/* Landing */}
      {step === "landing" && (
        <div className="text-center animate-fadeIn">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy font-serif mb-4">
            {quizData.title}
          </h1>
          <p className="text-lg text-body mb-8 max-w-md mx-auto">
            {quizData.subtitle}
          </p>
          <button onClick={handleStart} className="btn-primary text-lg px-8 py-4">
            {quizData.startButton}
          </button>
          <p className="text-xs text-body/50 mt-4">Takes about 2 minutes</p>
        </div>
      )}

      {/* Questions */}
      {step === "question" && (
        <>
          <QuizProgress current={currentQuestion} total={quizData.questions.length} />
          <QuizQuestion
            key={currentQuestion}
            question={quizData.questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </>
      )}

      {/* Score Reveal */}
      {step === "score" && (
        <QuizScoreReveal
          score={totalScore}
          categoryScores={categoryScores}
          tier={tier}
          teaserInsights={teaserInsights}
          onContinue={() => setStep("gate")}
        />
      )}

      {/* Lead Gate */}
      {step === "gate" && (
        <QuizLeadGate
          heading={quizData.report.gateHeading}
          subtext={quizData.report.gateSubtext}
          buttonLabel={quizData.report.gateButton}
          secondaryLabel={quizData.report.gateSecondary}
          onSubmit={handleLeadSubmit}
        />
      )}

      {/* Full Report */}
      {step === "report" && (
        <QuizFullReport
          score={totalScore}
          tierLabel={tier.label}
          categoryScores={categoryScores}
          insights={fullInsights}
          reportContent={quizData.report}
          nextSteps={getNextSteps(categoryScores)}
        />
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/quiz/QuizClient.tsx
git commit -m "feat: add QuizClient orchestrator with scoring and state management"
```

---

## Task 10: Quiz Page Route

**Files:**
- Create: `app/quiz/page.tsx`

**Step 1: Create the quiz page**

Server Component wrapper with metadata. Renders `QuizClient`.

```tsx
import type { Metadata } from "next";
import QuizClient from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "Upgrade Readiness Quiz – eastcondos.sg",
  description:
    "Take the 2-minute quiz to find out your HDB-to-condo upgrade readiness score. Get a personalized report with actionable next steps.",
  openGraph: {
    title: "What's Your Upgrade Readiness Score?",
    description:
      "Take the 2-minute quiz to find out if you're ready to upgrade from HDB to condo.",
    type: "website",
    url: "https://eastcondos.sg/quiz",
  },
};

export default function QuizPage() {
  return (
    <section className="bg-cream min-h-screen">
      <QuizClient />
    </section>
  );
}
```

**Step 2: Verify it builds and the full quiz flow works**

Run: `npm run build`
Then: `npm run dev` and visit `http://localhost:3000/quiz`
Expected: Full quiz flow works — landing → 10 questions → score reveal → lead gate → full report.

**Step 3: Commit**

```bash
git add app/quiz/page.tsx
git commit -m "feat: add quiz page route"
```

---

## Task 11: Add fadeIn Animation to globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Add the animation keyframe**

The quiz components use `animate-fadeIn`. Add this to `globals.css`:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
```

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add fadeIn animation for quiz transitions"
```

---

## Task 12: Homepage Integration — CaseStudyPreview & QuizBanner

**Files:**
- Create: `components/CaseStudyPreview.tsx`
- Create: `components/QuizBanner.tsx`
- Modify: `app/page.tsx`

**Step 1: Create CaseStudyPreview**

Pattern mirrors `TeamPreview.tsx`. Shows 1-2 featured cards + link.

```tsx
"use client";

import { useInView } from "@/hooks/useInView";
import CaseStudyCard from "./CaseStudyCard";
import indexData from "@/content/case-studies/index.json";
import youngCoupleTampines from "@/content/case-studies/young-couple-tampines.json";

const caseStudies: Record<string, typeof youngCoupleTampines> = {
  "young-couple-tampines": youngCoupleTampines,
};

export default function CaseStudyPreview() {
  const { ref, isVisible } = useInView();

  const stories = indexData.slugs
    .map((slug) => caseStudies[slug])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <section className="bg-white py-16 md:py-24" ref={ref}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="text-center">
          <p className="section-label">{indexData.sectionLabel}</p>
          <h2 className="section-heading">{indexData.heading}</h2>
          <p className="section-subtext mx-auto">{indexData.subtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          {stories.map((story) => (
            <CaseStudyCard
              key={story.slug}
              slug={story.slug}
              title={story.title}
              headline={story.headline}
              category={story.category}
              stats={story.stats}
              client={{
                name: story.client.name,
                initials: story.client.initials,
              }}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/case-studies"
            className="text-gold font-semibold hover:text-gold-light"
          >
            See All Success Stories →
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create QuizBanner**

Gold-background banner that stands out from the sage/white pattern.

```tsx
"use client";

import { useInView } from "@/hooks/useInView";
import { Sparkles } from "lucide-react";

export default function QuizBanner() {
  const { ref, isVisible } = useInView();

  return (
    <section className="bg-gold py-12 md:py-16" ref={ref}>
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <Sparkles className="w-8 h-8 text-white mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-3">
          Think you&apos;re ready to upgrade?
        </h2>
        <p className="text-white/80 text-lg mb-6">
          Take the 2-minute quiz and find out your Upgrade Readiness Score.
        </p>
        <a
          href="/quiz"
          className="inline-flex items-center justify-center h-14 px-8 text-base font-semibold rounded-lg bg-white text-gold hover:bg-cream shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          Take the Quiz
        </a>
      </div>
    </section>
  );
}
```

**Step 3: Update homepage**

Modify `app/page.tsx` to add both new sections between `Testimonials` and `About`:

```tsx
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import WhyMe from "@/components/WhyMe";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import QuizBanner from "@/components/QuizBanner";
import TeamPreview from "@/components/TeamPreview";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import faqData from "@/content/faq.json";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.items.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
      <Hero />
      <PainPoints />
      <WhyMe />
      <HowItWorks />
      <Testimonials />
      <CaseStudyPreview />
      <QuizBanner />
      <TeamPreview />
      <About />
      <FAQ />
      <CTA />
    </>
  );
}
```

**Step 4: Verify homepage renders**

Run: `npm run dev` and visit `http://localhost:3000`
Expected: New CaseStudyPreview and QuizBanner sections visible between Testimonials and TeamPreview.

**Step 5: Commit**

```bash
git add components/CaseStudyPreview.tsx components/QuizBanner.tsx app/page.tsx
git commit -m "feat: add case study preview and quiz banner to homepage"
```

---

## Task 13: Navigation & Sitemap Updates

**Files:**
- Modify: `content/nav.json`
- Modify: `app/sitemap.ts`

**Step 1: Update navigation**

Add "Success Stories" and "Quiz" links to `content/nav.json`:

```json
{
  "logo": {
    "src": "https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/692d34c31f60a1442c4c110c.png",
    "alt": "EastCondos.sg Logo"
  },
  "links": [
    { "label": "How It Works", "href": "#how-it-works" },
    { "label": "Success Stories", "href": "/case-studies" },
    { "label": "About", "href": "#about" },
    { "label": "Calculator", "href": "/calculator" },
    { "label": "FAQ", "href": "#faq" }
  ],
  "cta": {
    "label": "Take the Quiz",
    "href": "/quiz"
  }
}
```

Note: The CTA button changes from "Get Free Checklist" to "Take the Quiz" to drive quiz traffic, especially from Instagram visitors.

**Step 2: Update sitemap**

Add case studies and quiz routes to `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eastcondos.sg";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies/young-couple-tampines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
```

**Step 3: Commit**

```bash
git add content/nav.json app/sitemap.ts
git commit -m "feat: add success stories and quiz to navigation and sitemap"
```

---

## Task 14: Final Build Verification

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Run dev server and test all routes**

Run: `npm run dev`

Test these URLs:
- `http://localhost:3000` — Homepage with new sections
- `http://localhost:3000/case-studies` — Listing page
- `http://localhost:3000/case-studies/young-couple-tampines` — Individual story
- `http://localhost:3000/quiz` — Full quiz flow (landing → questions → score → gate → report)

Expected: All pages render correctly, quiz scores calculate properly, navigation links work.

**Step 3: Run lint**

Run: `npm run lint`
Expected: No lint errors.

**Step 4: Commit any fixes if needed**

```bash
git add -A
git commit -m "fix: resolve any build or lint issues"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Case study content files | `content/case-studies/*.json` |
| 2 | CaseStudyCard component | `components/CaseStudyCard.tsx` |
| 3 | Case studies listing page | `app/case-studies/page.tsx` |
| 4 | Individual case study page | `app/case-studies/[slug]/page.tsx` |
| 5 | Quiz content file | `content/quiz.json` |
| 6 | QuizProgress + QuizQuestion | `components/quiz/*.tsx` |
| 7 | QuizScoreReveal | `components/quiz/QuizScoreReveal.tsx` |
| 8 | QuizLeadGate + QuizFullReport | `components/quiz/*.tsx` |
| 9 | QuizClient orchestrator | `components/quiz/QuizClient.tsx` |
| 10 | Quiz page route | `app/quiz/page.tsx` |
| 11 | fadeIn animation CSS | `app/globals.css` |
| 12 | Homepage integration | `components/CaseStudyPreview.tsx`, `components/QuizBanner.tsx`, `app/page.tsx` |
| 13 | Navigation + sitemap | `content/nav.json`, `app/sitemap.ts` |
| 14 | Final build verification | All files |
