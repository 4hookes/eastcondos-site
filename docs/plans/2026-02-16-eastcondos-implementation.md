# EastCondos.sg Site Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build EastCondos.sg as a static Next.js marketing site with 3 pages, JSON-driven content, and a multi-step lead form.

**Architecture:** Next.js 15 App Router with `output: 'export'` for static HTML. All editable content in `/content/*.json`. CSS-only scroll animations via custom `useInView` hook. No SSR, no database, no auth.

**Tech Stack:** Next.js 15, Tailwind CSS v3, Lucide React, Inter font, Vercel hosting

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `app/globals.css`
- Create: `public/robots.txt`

**Step 1: Initialize the Next.js project**

```bash
cd ~/Projects
npx create-next-app@latest eastcondos-site --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-turbopack
cd eastcondos-site
```

**Step 2: Install dependencies**

```bash
npm install lucide-react
```

**Step 3: Configure next.config.ts for static export**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "eastcondos.sg",
      },
    ],
  },
};

export default nextConfig;
```

**Step 4: Configure Tailwind with brand colors**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1a1a2e",
        gold: "#d4a853",
        "gold-light": "#e8c97a",
        body: "#4a4a4a",
        "light-gray": "#f8f9fa",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 5: Write global CSS**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

@layer base {
  body {
    @apply text-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-navy;
  }
}

@layer components {
  .section-label {
    @apply text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3;
  }

  .section-heading {
    @apply text-3xl md:text-4xl font-bold text-navy mb-4;
  }

  .section-subtext {
    @apply text-lg text-body max-w-2xl;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 bg-gold text-white font-semibold rounded-lg
           hover:bg-gold-light transition-colors duration-200;
  }

  .btn-outline {
    @apply inline-flex items-center justify-center px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg
           hover:bg-navy hover:text-white transition-colors duration-200;
  }
}

/* Scroll animation */
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 6: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://eastcondos.sg/sitemap.xml
```

**Step 7: Create content and public directories**

```bash
mkdir -p content public/images
```

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind and brand theme"
```

---

## Task 2: Content JSON Files

**Files:**
- Create: `content/nav.json`
- Create: `content/hero.json`
- Create: `content/pain-points.json`
- Create: `content/why-me.json`
- Create: `content/how-it-works.json`
- Create: `content/testimonials.json`
- Create: `content/about.json`
- Create: `content/team.json`
- Create: `content/faq.json`
- Create: `content/calculator.json`

**Step 1: Create nav.json**

```json
{
  "logo": {
    "src": "https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/692d34c31f60a1442c4c110c.png",
    "alt": "EastCondos.sg Logo"
  },
  "links": [
    { "label": "How It Works", "href": "#how-it-works" },
    { "label": "About", "href": "#about" },
    { "label": "Calculator", "href": "/calculator" },
    { "label": "FAQ", "href": "#faq" }
  ],
  "cta": {
    "label": "Get Free Checklist",
    "href": "#cta"
  }
}
```

**Step 2: Create hero.json**

```json
{
  "badge": "Trusted by 500+ Singapore families",
  "heading": "Thinking of upgrading from HDB to condo?",
  "subheading": "Let's make sure you get it right.",
  "body": "It's the biggest financial move your family will make. You deserve a clear plan\u2014not guesswork. I help East Singapore families upgrade with confidence, so you protect your CPF and build real wealth.",
  "primaryCta": { "label": "Get the Free Checklist", "href": "#cta" },
  "secondaryCta": { "label": "See how it works", "href": "#how-it-works" },
  "ctaNote": "It's free, no strings attached!",
  "stats": [
    { "value": "13", "label": "Years experience" },
    { "value": "80%", "label": "Referrals" },
    { "value": "4.9\u2605", "label": "Google" },
    { "value": "500+", "label": "Families helped" },
    { "value": "D15-18", "label": "East specialist" }
  ],
  "video": {
    "thumbnail": "https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/690081f942187b2cf0d92527.png",
    "alt": "Watch: A quick intro from Elfi",
    "caption": "Watch: A quick intro from Elfi",
    "duration": "90 seconds",
    "subcaption": "Not sure where to start? This short video explains how I help families like yours."
  }
}
```

**Step 3: Create pain-points.json**

```json
{
  "sectionLabel": "The challenge",
  "heading": "Upgrading shouldn\u2019t feel this stressful",
  "subtext": "You\u2019ve worked hard to get here. But between conflicting advice and complicated numbers, it\u2019s hard to know if you\u2019re making the right call.",
  "items": [
    {
      "title": "Should we buy now or wait?",
      "description": "Everyone has an opinion. Your parents say one thing, forums say another. It\u2019s hard to know what\u2019s actually right for your situation."
    },
    {
      "title": "New launch or resale?",
      "description": "Both have pros and cons. But without clear data, you\u2019re essentially guessing\u2014and a wrong choice can cost you years of wealth building."
    },
    {
      "title": "What if we overstretch?",
      "description": "You want to give your family a better home, but not at the cost of financial stress. The CPF rules alone are confusing enough."
    }
  ]
}
```

**Step 4: Create why-me.json**

```json
{
  "sectionLabel": "Why families choose me",
  "heading": "I\u2019m not just another agent. I\u2019m your upgrade planner.",
  "subtext": "I only work with HDB owners upgrading to condos in East Singapore. That focus means I can offer things most agents can\u2019t:",
  "features": [
    {
      "title": "Ground-level knowledge you won\u2019t find online",
      "description": "Off-market listings, which units to avoid, hyperlocal insights from 13 years in the East."
    },
    {
      "title": "Seamless transitions, even without 5% deposit",
      "description": "I\u2019ll structure your buy-before-sell timeline so you\u2019re never homeless or squeezed."
    },
    {
      "title": "Honest advice\u2014even if it means \u2018wait\u2019",
      "description": "If the numbers don\u2019t work, I\u2019ll tell you. My reputation is built on trust, not quick sales."
    }
  ],
  "mapImage": {
    "src": "https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/67533dc29f3792276cb08c79.png",
    "alt": "East Singapore map showing Districts 15, 16, and 18"
  }
}
```

**Step 5: Create how-it-works.json**

```json
{
  "sectionLabel": "The process",
  "heading": "How we\u2019ll work together",
  "subtext": "A clear path from \u2018thinking about it\u2019 to \u2018moved in happily.\u2019",
  "steps": [
    {
      "number": 1,
      "title": "Get the checker",
      "description": "Understand your \u2018Safe Price\u2019 before we even talk."
    },
    {
      "number": 2,
      "title": "Book a call",
      "description": "We\u2019ll review your situation\u2014no pressure."
    },
    {
      "number": 3,
      "title": "Get your roadmap",
      "description": "A personalized plan for your upgrade."
    },
    {
      "number": 4,
      "title": "Move in",
      "description": "I handle the complexity. You enjoy."
    }
  ]
}
```

**Step 6: Create testimonials.json**

```json
{
  "sectionLabel": "From families like yours",
  "heading": "What my clients say",
  "items": [
    {
      "initials": "JL",
      "names": "Jeremy & Lisa",
      "context": "Upgraded from Tampines to D16 condo",
      "quote": "Elfi actually advised us to wait 6 months. Any other agent would have pushed us to buy. That patience saved us over $50K when the market shifted."
    },
    {
      "initials": "TF",
      "names": "The Tan Family",
      "context": "Upgraded from Bedok to D15 condo",
      "quote": "We needed to buy before selling but didn\u2019t have enough cash. Elfi structured everything so we never felt stretched. She made it feel effortless."
    }
  ]
}
```

**Step 7: Create about.json**

```json
{
  "sectionLabel": "Your advisor",
  "heading": "Hi, I\u2019m Elfi",
  "subtitle": "HDB-to-Condo Specialist, East Singapore",
  "image": {
    "src": "https://storage.googleapis.com/msgsndr/6t13xn57K4fOsTYNYS7v/media/68d9e2b64c35d6324e9f6e5c.png",
    "alt": "Elfi - HDB-to-Condo Specialist"
  },
  "body": "For 13 years, I\u2019ve helped Singapore families navigate the upgrade from HDB to condo. I chose to specialize in Districts 15, 16, and 18 because depth matters more than breadth. When you know every project, every street, every price movement\u2014you spot opportunities others miss. More importantly, you protect families from mistakes that take years to recover from.",
  "stats": [
    { "value": "500+", "label": "Families helped" },
    { "value": "13", "label": "yrs Experience" },
    { "value": "80%", "label": "Referrals" }
  ],
  "cta": { "label": "Get the free checker", "href": "#cta" }
}
```

**Step 8: Create team.json**

```json
{
  "sectionLabel": "The people behind",
  "heading": "Meet Our Team",
  "subtext": "A dedicated team of property specialists committed to your successful upgrade journey.",
  "teamPhoto": {
    "src": "https://eastcondos.sg/wp-content/uploads/2026/01/team-cutout.png",
    "alt": "EastCondos team photo"
  },
  "members": [
    {
      "name": "Elfi",
      "role": "HDB-to-Condo Specialist",
      "tag": "Team Lead",
      "oneLiner": "13 years helping East Singapore families upgrade with confidence.",
      "photo": "https://eastcondos.sg/wp-content/uploads/2026/01/elfi-whatsapp-e1769140200941.avif",
      "bio": "With 13 years of experience specializing in East Singapore property, Elfi has helped over 500 families successfully upgrade from HDB to condo. Her deep knowledge of Districts 15, 16, and 18 means she spots opportunities others miss\u2014and protects families from costly mistakes. Elfi believes in honest advice, even if it means telling you to wait. Her reputation is built on trust, not quick sales, which is why 80% of her clients come from referrals.",
      "phone": "+65 8841 5991",
      "whatsapp": "https://wa.me/6588415991"
    },
    {
      "name": "Jimmy",
      "role": "Property Consultant",
      "oneLiner": "Expert in market analysis and finding the perfect condo match.",
      "photo": "https://eastcondos.sg/wp-content/uploads/2026/01/Jimmy.avif",
      "bio": "Jimmy brings sharp analytical skills and deep market knowledge to help families find their perfect condo match. He specializes in comparing new launches versus resale options, ensuring clients make informed decisions based on data\u2014not emotions. With his eye for detail and negotiation expertise, Jimmy has helped numerous families secure properties at competitive prices while avoiding potential pitfalls.",
      "email": "jimmy@eastcondos.sg"
    },
    {
      "name": "Alyssa",
      "role": "Client Relations Manager",
      "oneLiner": "Ensuring smooth communication and support throughout your journey.",
      "photo": "https://eastcondos.sg/wp-content/uploads/2026/01/Alyssa.avif",
      "bio": "Alyssa is the friendly voice that guides you through every step of your upgrade journey. She ensures seamless communication between all parties\u2014lawyers, bankers, and agents\u2014so you never feel lost in the process. Her dedication to client care means you\u2019ll always have someone to turn to with questions, concerns, or just for reassurance during what can be a stressful time.",
      "email": "alyssa@eastcondos.sg"
    },
    {
      "name": "Aaron",
      "role": "Market Analyst",
      "oneLiner": "Data-driven insights for smarter property decisions.",
      "photo": "https://eastcondos.sg/wp-content/uploads/2026/01/Aaron.avif",
      "bio": "Aaron is our numbers expert, providing data-driven insights that help families make smarter property decisions. He tracks market trends, price movements, and development timelines across East Singapore to identify the best opportunities. His detailed analysis helps clients understand not just what they can afford today, but how their purchase will perform as a long-term investment.",
      "email": "aaron@eastcondos.sg"
    }
  ],
  "teamPageCta": {
    "heading": "Ready to start your upgrade journey?",
    "label": "Book a Free Call",
    "href": "https://api.leadconnectorhq.com/widget/booking/9uMCZ6E5WFtfJKjiYByG"
  }
}
```

**Step 9: Create faq.json**

```json
{
  "sectionLabel": "Questions",
  "heading": "You might be wondering...",
  "items": [
    {
      "question": "We\u2019re not ready yet. Should I get the checker?",
      "answer": "Absolutely. The best time to plan is 6\u201312 months before you\u2019re ready. The tool helps you prepare so you\u2019re in position when the time comes."
    },
    {
      "question": "Why only East Singapore?",
      "answer": "I\u2019d rather be excellent in one area than average everywhere. My network, knowledge, and off-market access are concentrated here\u2014better results for you."
    },
    {
      "question": "Do I need to sell my HDB first?",
      "answer": "Not necessarily. Many clients buy first, then sell. I\u2019ll help structure the timeline so you\u2019re never homeless or overextended."
    },
    {
      "question": "What if you say it\u2019s not the right time?",
      "answer": "Then I\u2019ll explain why, and we\u2019ll plan for when it makes sense. I\u2019d rather earn your trust than push you into something wrong."
    }
  ]
}
```

**Step 10: Create calculator.json**

```json
{
  "title": "Strategy Session",
  "steps": [
    {
      "number": 1,
      "title": "Tell me about yourself",
      "intro": "I need these details to calculate your loan eligibility and grant tiers accurately."
    },
    {
      "number": 2,
      "title": "Current Situation",
      "intro": "Understanding your current assets helps me plan your progression timeline."
    },
    {
      "number": 3,
      "title": "Your property goal",
      "intro": ""
    }
  ],
  "confirmation": {
    "heading": "You\u2019re all set!",
    "body": "Thank you for sharing your details. I\u2019ll personally review your situation and send your customised strategy video within 24 hours.",
    "youtubeLabel": "Watch on YouTube \u2014 EastCondos.sg Channel",
    "youtubeUrl": "https://youtube.com/@eastcondossg"
  },
  "propertyTypes": [
    "HDB 3-Room",
    "HDB 4-Room",
    "HDB 5-Room",
    "HDB Executive/Mansionette",
    "Private Condo/Apt",
    "Landed Property",
    "First Time Buyer"
  ],
  "citizenshipOptions": ["Singapore Citizen", "PR", "Foreigner"],
  "goalOptions": [
    { "value": "own-stay", "label": "Own Stay \u2014 I want a home to live in" },
    { "value": "investment", "label": "Investment \u2014 I\u2019m looking for rental yield" },
    { "value": "both", "label": "Both \u2014 Own stay with investment potential" }
  ],
  "timelineOptions": [
    "ASAP",
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "More than a year",
    "Not sure yet"
  ]
}
```

**Step 11: Commit**

```bash
git add content/
git commit -m "content: add all JSON content files for homepage, team, calculator"
```

---

## Task 3: useInView Hook

**Files:**
- Create: `hooks/useInView.ts`

**Step 1: Create the hook**

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

**Step 2: Commit**

```bash
git add hooks/
git commit -m "feat: add useInView hook for scroll animations"
```

---

## Task 4: Root Layout, Navbar, Footer

**Files:**
- Create: `app/layout.tsx`
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

**Step 1: Create Navbar**

Build `components/Navbar.tsx`:
- `"use client"` component (needs scroll state + mobile menu toggle)
- Read nav data from `@/content/nav.json`
- Sticky positioning with `fixed top-0 w-full z-50`
- Background transitions from transparent to white with shadow on scroll (use `useEffect` + scroll listener, threshold ~50px)
- Logo on left (img tag, height ~40px)
- Desktop: links as `<a>` tags with smooth scroll, CTA as gold button
- Mobile: hamburger icon (lucide `Menu`/`X`), slide-down menu panel
- All links close mobile menu on click

**Step 2: Create Footer**

Build `components/Footer.tsx`:
- Simple footer with navy background, white text
- Left: "EastCondos.sg" + copyright year
- Right: links to Privacy Policy (placeholder `#`) and Terms (placeholder `#`)
- Center or below: "Powered by EastCondos.sg" or similar
- Responsive: stacks on mobile

**Step 3: Create root layout**

Build `app/layout.tsx`:
- Import Inter font via `next/font/google`
- Set `className` on `<html>` with font variable
- Metadata export: title "eastcondos.sg – Own Your Dream Condo with Elfi", description as specified
- Open Graph tags (title, description, type: "website", url: "https://eastcondos.sg")
- `<body>` wraps `<Navbar />`, `<main>{children}</main>`, `<Footer />`

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds (pages may be empty but layout renders)

**Step 5: Commit**

```bash
git add app/layout.tsx components/Navbar.tsx components/Footer.tsx
git commit -m "feat: add root layout with Navbar and Footer"
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/Hero.tsx`

**Step 1: Build Hero component**

Build `components/Hero.tsx`:
- Import data from `@/content/hero.json`
- Two-column layout: text (left/top on mobile) and video thumbnail (right/bottom on mobile)
- Badge: small rounded pill with gold background, white text
- Heading: `<h1>` with `text-4xl md:text-5xl lg:text-6xl font-bold text-navy`
- Subheading: italic text below heading
- Body paragraph
- Two CTA buttons side by side (primary gold + outline)
- Note text below CTAs in smaller gray text
- Stats row: 5 items in a flex row, each with large bold value + small label. Separated by vertical dividers on desktop. Wraps on mobile.
- Right column: video thumbnail image with a play button overlay (use lucide `Play` icon in a circle). The thumbnail is wrapped in an `<a>` linking to the YouTube channel.
- Below thumbnail: caption + duration + subcaption text
- No `useInView` needed — hero is above fold

**Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 6: PainPoints Section

**Files:**
- Create: `components/PainPoints.tsx`

**Step 1: Build PainPoints component**

Build `components/PainPoints.tsx`:
- Import data from `@/content/pain-points.json`
- Use `useInView` for fade-in animation
- `id="pain-points"` on the section
- Light gray background (`bg-light-gray`)
- Section label (uppercase, gold) + heading + subtext
- 3 cards in a responsive grid (`grid grid-cols-1 md:grid-cols-3 gap-6`)
- Each card: white background, rounded-xl, shadow-sm, padding, with title (bold, navy) and description (body color)
- Add a subtle icon or emoji above each title (e.g., lucide `HelpCircle`, `Building`, `AlertTriangle`)

**Step 2: Commit**

```bash
git add components/PainPoints.tsx
git commit -m "feat: add PainPoints section component"
```

---

## Task 7: WhyMe Section

**Files:**
- Create: `components/WhyMe.tsx`

**Step 1: Build WhyMe component**

Build `components/WhyMe.tsx`:
- Import data from `@/content/why-me.json`
- Use `useInView` for fade-in animation
- `id="why-me"` on the section
- White background
- Section label + heading + subtext
- Two-column layout: features on left, map image on right
- 3 feature blocks stacked vertically, each with:
  - Gold checkmark icon (lucide `Check` in a gold circle)
  - Bold title
  - Description paragraph
- Right column: map image with rounded corners, alt text
- On mobile: features stack above map

**Step 2: Commit**

```bash
git add components/WhyMe.tsx
git commit -m "feat: add WhyMe section component"
```

---

## Task 8: HowItWorks Section

**Files:**
- Create: `components/HowItWorks.tsx`

**Step 1: Build HowItWorks component**

Build `components/HowItWorks.tsx`:
- Import data from `@/content/how-it-works.json`
- Use `useInView` for fade-in animation
- `id="how-it-works"` on the section
- Light gray background
- Section label + heading + subtext centered
- 4 steps in a horizontal row on desktop, vertical stack on mobile
- Each step: large step number (gold, `text-4xl font-bold`), title, description
- Optional: thin connecting line between steps on desktop (decorative)

**Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: add HowItWorks section component"
```

---

## Task 9: Testimonials Section

**Files:**
- Create: `components/Testimonials.tsx`

**Step 1: Build Testimonials component**

Build `components/Testimonials.tsx`:
- Import data from `@/content/testimonials.json`
- Use `useInView` for fade-in animation
- `id="testimonials"` on the section
- White background
- Section label + heading centered
- 2 testimonial cards in a grid (`grid grid-cols-1 md:grid-cols-2 gap-8`)
- Each card: white bg, rounded-xl, shadow-md, padding
  - Top: avatar circle with initials (gold background, white text, `w-12 h-12 rounded-full`)
  - Names in bold
  - Context in small italic text
  - Quote in larger text with opening quotation mark (decorative large `"` or lucide `Quote`)
- Cards should have a subtle left border in gold (`border-l-4 border-gold`)

**Step 2: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: add Testimonials section component"
```

---

## Task 10: TeamPreview + TeamCard

**Files:**
- Create: `components/TeamPreview.tsx`
- Create: `components/TeamCard.tsx`

**Step 1: Build TeamCard component**

Build `components/TeamCard.tsx`:
- Props: `name: string`, `role: string`, `oneLiner: string`, `photo?: string`
- Card with white bg, rounded-xl, shadow-sm, padding, text-center
- Avatar: if `photo` provided, use `<img>`, otherwise show initials in a gold circle (`w-16 h-16 rounded-full mx-auto`)
- Name in bold below avatar
- Role in small gold text
- One-liner in body text

**Step 2: Build TeamPreview component**

Build `components/TeamPreview.tsx`:
- Import data from `@/content/team.json` (use first 4 members)
- Use `useInView` for fade-in animation
- `id="team"` on the section
- Light gray background
- Section label + heading + subtext centered
- 4 TeamCards in a grid (`grid grid-cols-2 md:grid-cols-4 gap-6`)
- Below grid: link "Meet the Full Team →" pointing to `/team`, styled as text link with gold color

**Step 3: Commit**

```bash
git add components/TeamPreview.tsx components/TeamCard.tsx
git commit -m "feat: add TeamPreview and TeamCard components"
```

---

## Task 11: About Section

**Files:**
- Create: `components/About.tsx`

**Step 1: Build About component**

Build `components/About.tsx`:
- Import data from `@/content/about.json`
- Use `useInView` for fade-in animation
- `id="about"` on the section
- White background
- Two-column layout: image (left), text (right)
- Left: Elfi's photo, rounded-lg, shadow
- Right: section label + heading + subtitle (smaller, italic) + body paragraph
- Stats row below body: 3 stats (value + label) in a flex row
- CTA button below stats
- On mobile: image stacks above text

**Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section component"
```

---

## Task 12: FAQ Section

**Files:**
- Create: `components/FAQ.tsx`

**Step 1: Build FAQ component**

Build `components/FAQ.tsx`:
- `"use client"` component (needs toggle state)
- Import data from `@/content/faq.json`
- Use `useInView` for fade-in animation
- `id="faq"` on the section
- Light gray background
- Section label + heading centered
- Accordion: each item is a clickable row
  - Question text (bold) with chevron icon (lucide `ChevronDown`, rotates when open)
  - Answer text slides down when open (CSS transition on max-height)
  - Use `useState` with an `openIndex` (number | null) — only one open at a time
- Max width container for readability (`max-w-3xl mx-auto`)

**Step 2: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: add FAQ accordion component"
```

---

## Task 13: CTA Section

**Files:**
- Create: `components/CTA.tsx`

**Step 1: Build CTA component**

Build `components/CTA.tsx`:
- Use `useInView` for fade-in animation
- `id="cta"` on the section
- Navy background (`bg-navy`), white text
- Centered layout: heading + body paragraph + gold CTA button
- Generous vertical padding (`py-20`)
- Heading: "Ready to take the first step?"
- Body: "Download the checker and get clear on your numbers. No commitment, no pressure—just practical preparation."
- Button: "Get the free checker" — for now links to `#cta` (placeholder)

**Step 2: Commit**

```bash
git add components/CTA.tsx
git commit -m "feat: add bottom CTA section component"
```

---

## Task 14: Homepage Assembly

**Files:**
- Modify: `app/page.tsx`

**Step 1: Build homepage**

Build `app/page.tsx`:
- Import all section components
- Render in order: Hero, PainPoints, WhyMe, HowItWorks, Testimonials, TeamPreview, About, FAQ, CTA
- No extra wrapper needed — each component handles its own padding/background
- This is a server component (no `"use client"` needed at page level)

**Step 2: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000 and verify all sections render correctly.

**Step 3: Verify build**

```bash
npm run build
```

Expected: Static export succeeds, output in `/out` directory.

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 15: Strategy Form + Calculator Page

**Files:**
- Create: `components/StrategyForm.tsx`
- Create: `app/calculator/page.tsx`

**Step 1: Build StrategyForm component**

Build `components/StrategyForm.tsx`:
- `"use client"` component
- Import config from `@/content/calculator.json`
- State: `step` (1-4, where 4 is confirmation), form data object, `showSpouse` toggle
- Progress bar at top showing current step (3 dots or bar segments)

**Step 1 form — "Tell me about yourself":**
- Name (text input, required)
- Age (number input)
- Citizenship (select dropdown from `citizenshipOptions`)
- Monthly Fixed Income (number input with helper text)
- "Add Spouse / Co-Owner" toggle — reveals: Spouse Name, Age, Citizenship, Monthly Income

**Step 2 form — "Current Situation":**
- Current Property Type (select from `propertyTypes`)
- Address / Estate (text input)
- Estimated Value (number input with helper)
- Outstanding Loan (number input with helper)
- Total CPF Used + Accrued Interest (number input with helper)
- Current CPF OA Balance (number input with helper)

**Step 3 form — "Your property goal":**
- Main Goal (radio group from `goalOptions`)
- Target Area / Preferences (textarea)
- Must-Haves (textarea, optional)
- Timeline (select from `timelineOptions`)
- Questions (textarea with helper)

**Navigation:**
- "Back" and "Next" buttons at bottom of each step
- "Next" validates required fields before advancing
- On Step 3, "Submit" button instead of "Next"
- On submit: `console.log(JSON.stringify(formData))` + advance to step 4

**Step 4 — Confirmation:**
- Heading: "You're all set!"
- Body text from `confirmation.body`
- YouTube link from `confirmation.youtubeUrl`
- Checkmark icon (lucide `CheckCircle`, large, gold)

**Step 2: Build calculator page**

Build `app/calculator/page.tsx`:
- Export metadata: title "Strategy Session – eastcondos.sg", description as specified
- Render `<StrategyForm />` centered on page with max-width container
- Navy header area with page title

**Step 3: Verify**

```bash
npm run dev
```

Navigate to http://localhost:3000/calculator, test all 3 steps + submission.

**Step 4: Commit**

```bash
git add components/StrategyForm.tsx app/calculator/
git commit -m "feat: add multi-step strategy form and calculator page"
```

---

## Task 16: Team Page

**Files:**
- Create: `app/team/page.tsx`

**Step 1: Build team page**

Build `app/team/page.tsx`:
- Export metadata: title "Our Team – eastcondos.sg", description as specified
- Import data from `@/content/team.json`
- Hero section: heading "Meet Our Team" + subtext + team photo (full width, rounded)
- 4 detailed team member cards in a vertical stack or 2-column grid
- Each card:
  - Photo (img tag, rounded-full, ~120px)
  - Name + role + tag (if present, e.g., "Team Lead")
  - Full bio paragraph
  - Contact: phone/WhatsApp link for Elfi, email for others (use lucide `Phone`, `Mail` icons)
- Bottom CTA section: heading + "Book a Free Call" button linking to GoHighLevel booking URL
- Use `useInView` for card animations

**Step 2: Verify**

```bash
npm run dev
```

Navigate to http://localhost:3000/team

**Step 3: Commit**

```bash
git add app/team/
git commit -m "feat: add team page with detailed member cards"
```

---

## Task 17: SEO — Structured Data + Sitemap

**Files:**
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx` (add JSON-LD structured data)

**Step 1: Create sitemap**

Build `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eastcondos.sg";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
```

**Step 2: Add LocalBusiness structured data to layout**

In `app/layout.tsx`, add a `<script type="application/ld+json">` in the `<head>` (or `<body>`) with:

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "EastCondos.sg - Elfi",
  "description": "Expert HDB to condo upgrade planning for East Singapore families",
  "url": "https://eastcondos.sg",
  "telephone": "+6588415991",
  "areaServed": {
    "@type": "Place",
    "name": "East Singapore (Districts 15, 16, 18)"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SG",
    "addressRegion": "East Singapore"
  }
}
```

**Step 3: Verify full build**

```bash
npm run build
```

Expected: Build succeeds. Check `/out` directory contains `index.html`, `calculator.html` (or `calculator/index.html`), `team.html`, `sitemap.xml`, `robots.txt`.

**Step 4: Commit**

```bash
git add app/sitemap.ts app/layout.tsx
git commit -m "feat: add sitemap, structured data, and complete SEO setup"
```

---

## Task 18: Final Build Verification + Git Setup

**Step 1: Full build and check**

```bash
npm run build
```

Verify all pages render, no TypeScript errors, no build warnings.

**Step 2: Spot-check static output**

```bash
ls out/
```

Should contain: `index.html`, `calculator/index.html`, `team/index.html`, `sitemap.xml`, `_next/` (static assets)

**Step 3: Initialize git repo (if not already)**

```bash
cd ~/Projects/eastcondos-site
git init
git add -A
git commit -m "feat: complete EastCondos.sg static site build"
```

**Step 4: Create GitHub repo and push**

```bash
gh repo create eastcondos-site --public --source=. --push
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project scaffolding | next.config.ts, tailwind.config.ts, globals.css |
| 2 | Content JSON files | content/*.json (10 files) |
| 3 | useInView hook | hooks/useInView.ts |
| 4 | Layout + Navbar + Footer | app/layout.tsx, Navbar.tsx, Footer.tsx |
| 5 | Hero section | Hero.tsx |
| 6 | PainPoints section | PainPoints.tsx |
| 7 | WhyMe section | WhyMe.tsx |
| 8 | HowItWorks section | HowItWorks.tsx |
| 9 | Testimonials section | Testimonials.tsx |
| 10 | TeamPreview + TeamCard | TeamPreview.tsx, TeamCard.tsx |
| 11 | About section | About.tsx |
| 12 | FAQ accordion | FAQ.tsx |
| 13 | CTA section | CTA.tsx |
| 14 | Homepage assembly | app/page.tsx |
| 15 | Strategy form + Calculator | StrategyForm.tsx, calculator/page.tsx |
| 16 | Team page | team/page.tsx |
| 17 | SEO + Sitemap | sitemap.ts, structured data |
| 18 | Final build + git | Verification + GitHub |
