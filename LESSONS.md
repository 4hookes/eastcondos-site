# Lessons Learned - East Condos Site

> 📝 **Purpose**: Track issues, solutions, and best practices specific to this project.

## Format
```markdown
### Issue: [Brief description]
**Symptom**:
**Cause**:
**Solution**:
**Prevention**:
**Date**: YYYY-MM-DD
```

---

## Common Issues & Solutions

### Issue: Static site generation with dynamic content
**Symptom**: Page shows outdated content after content updates
**Cause**: Static pages generated at build time
**Solution**:
- Option 1: Use `revalidate` in page config for ISR (Incremental Static Regeneration)
- Option 2: Use dynamic rendering for frequently updated pages
- Option 3: Trigger rebuild on content changes
**Prevention**: Plan content strategy - decide what's truly static vs dynamic
**Date**: [Add when encountered]

### Issue: Calculator results not accurate
**Symptom**: Financial calculations showing wrong numbers
**Cause**: JavaScript floating point precision issues
**Solution**: Use a library like `decimal.js` or `big.js` for financial calculations
```typescript
// Wrong
const result = 0.1 + 0.2  // 0.30000000000000004

// Right
import Decimal from 'decimal.js'
const result = new Decimal(0.1).plus(0.2).toNumber()  // 0.3
```
**Prevention**: Always use decimal libraries for money/financial calculations
**Date**: [Add when encountered]

### Issue: Images loading slowly
**Symptom**: Property images take long to load, poor UX
**Cause**: Large unoptimized images
**Solution**:
1. Use Next.js `<Image>` component (auto-optimization)
2. Compress images before adding to `public/`
3. Use WebP format where possible
4. Add `priority` prop to above-fold images
**Prevention**: Set up image optimization pipeline before adding content
**Date**: [Add when encountered]

---

## Best Practices Discovered

### Content Management
- Store property data in `content/` directory as JSON
- Keep images in `public/images/` with organized subfolders
- Use consistent naming: `property-name-01.jpg`

### SEO Optimization
- Always add `alt` text to images (important for real estate)
- Use semantic HTML (`<article>`, `<section>`)
- Include structured data for properties (schema.org)
- Generate sitemap automatically (see `app/sitemap.ts`)

### Performance
- Lazy load images below the fold
- Use `loading="lazy"` on images
- Minimize external scripts
- Keep third-party scripts to minimum (analytics only)

### Real Estate Specific
- Always show prices with clear disclaimers
- Include date of information ("As of February 2026")
- Legal pages (privacy, terms) are required
- Ensure calculator disclaimers are visible

---

## Calculator Best Practices

### Financial Calculations
- Always show calculation breakdown
- Add disclaimers about estimates
- Round currency to 2 decimal places
- Handle edge cases (negative numbers, zero, very large numbers)

### UX for Calculators
- Show live updates as user types
- Provide sensible defaults
- Add tooltips for complex fields
- Allow easy reset to defaults

---

## Content Guidelines

### Property Listings
- High-quality images (minimum 1200px wide)
- Accurate square footage
- Clear pricing with disclaimers
- Highlight key features (top 5-7)

### Legal Compliance
- Always include price disclaimers
- Keep terms of service updated
- Privacy policy must cover analytics
- Contact info must be current

---

## Performance Benchmarks

Target metrics for this site:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: > 90

Test with:
```bash
npm run build
npm run start
# Then: Lighthouse in Chrome DevTools
```

---

## Anti-Patterns to Avoid

### ❌ Don't: Hardcode property data in components
```typescript
// Bad
const price = 850000

// Good - import from data file
import { properties } from '@/content/properties'
const price = properties[0].price
```

### ❌ Don't: Use client-side rendering for SEO-critical pages
```typescript
// Bad
'use client'
export default function HomePage() {
  const [data, setData] = useState()
  // SEO won't see this content
}

// Good - use Server Component
export default async function HomePage() {
  // Content available for SEO
}
```

### ❌ Don't: Ignore mobile experience
- 70%+ of real estate browsing is on mobile
- Test all calculators on mobile
- Ensure forms work on small screens

---

## Integration Notes

### Analytics Setup
- Google Analytics tracks: page views, calculator usage, form submissions
- Set up goals for: calculator completions, contact form submits
- Monitor bounce rate on property pages

### Future Integrations to Consider
- Property listing API (PropertyGuru, 99.co)
- CRM integration for lead capture
- Live chat for inquiries
- Mortgage calculator API for real-time rates

---

## Template for New Entries

```markdown
### Issue: [Brief description]
**Symptom**:
**Cause**:
**Solution**:
**Prevention**:
**Date**: YYYY-MM-DD

```

---

**Last Updated**: 2026-02-21
**Contributors**: Add your name when you contribute!
