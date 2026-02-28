# East Condos - Real Estate Platform

## Overview
A Next.js-based real estate website for East Condos, featuring property information, calculators, and resources for potential buyers.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with class-variance-authority
- **Icons**: Lucide React

## Common Commands
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure
```
app/
├── calculator/                      # Financial calculator tools
├── disclaimer-hdb-condo-meter-planner/  # HDB/condo comparison tool
├── privacy/                        # Privacy policy
├── terms/                          # Terms of service
├── team/                           # Team page
└── page.tsx                        # Homepage

components/       # Reusable UI components
content/         # Static content and data
lib/             # Utilities and helpers
public/          # Static assets
```

## Key Files
- Homepage: `app/page.tsx:1`
- Layout: `app/layout.tsx:1`
- Global styles: `app/globals.css:1`
- Not found page: `app/not-found.tsx:1`
- Sitemap config: `app/sitemap.ts:1`

## Domain Glossary
- **HDB**: Housing Development Board (Singapore public housing)
- **Condo Meter**: Tool for comparing HDB vs condo costs
- **Calculator**: Financial planning tools for property purchase

## Development Guidelines
- Use TypeScript
- Prefer React Server Components
- Use 'use client' only when necessary
- Follow Tailwind utility-first approach
- Keep components simple and focused
- Static content goes in `content/` directory

## Content Management
- Static content stored in `content/` directory
- Update content files directly (check structure first)
- Images go in `public/` directory

## SEO & Performance
- Sitemap auto-generated: `app/sitemap.ts:1`
- Optimize images before adding to `public/`
- Use Next.js Image component for all images
- Meta tags in layout and page files

## Legal Pages
- Privacy policy: `app/privacy/`
- Terms of service: `app/terms/`
- Disclaimer: `app/disclaimer-hdb-condo-meter-planner/`

## Important Notes
- This is a marketing/informational site
- Keep load times fast (real estate audience)
- Mobile-first responsive design
- Test calculator functions thoroughly
