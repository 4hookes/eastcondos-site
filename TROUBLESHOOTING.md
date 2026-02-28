# Troubleshooting Guide - East Condos Site

Quick fixes for common issues. For detailed explanations, see `LESSONS.md`.

---

## 🚀 Development Server Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` | Kill process using port |
| Dependencies won't install | `rm -rf node_modules package-lock.json && npm install` | Clean install |
| Hot reload not working | Restart server, clear cache | `rm -rf .next && npm run dev` |
| Changes not showing | Hard refresh browser | Cmd+Shift+R (Mac) / Ctrl+Shift+R (Win) |

---

## 🎨 Styling & UI Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Tailwind classes not working | Check `tailwind.config.ts` content paths | Must include all component directories |
| Styles look different locally vs deployed | Check CSS purging | May need to safelist classes |
| Layout broken on mobile | Test responsive breakpoints | Use Chrome DevTools device mode |
| Icons not showing | Verify lucide-react import | Check icon name is correct |
| Dark mode issues | Not implemented yet | Add if needed |

### Debug Tailwind
```bash
# See which classes are being purged
npm run build

# Check generated CSS
.next/static/css/*.css
```

---

## 🖼️ Image Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Images not loading | Check path is correct | Must be in `public/` folder |
| Images too slow | Use Next.js Image component | Auto-optimizes |
| Blurry images | Provide correct dimensions | Match actual image size |
| Layout shift on load | Add `width` and `height` props | Prevents CLS |

### Image Best Practices
```tsx
// Good
import Image from 'next/image'

<Image
  src="/images/property.jpg"
  alt="East Condos Property"
  width={1200}
  height={800}
  priority  // for above-fold images
/>

// For unknown dimensions (external images)
<Image
  src={url}
  alt="Property"
  fill
  className="object-cover"
/>
```

---

## 🧮 Calculator Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Wrong calculations | Check JavaScript precision | Use decimal.js for money |
| Calculator not updating | Check state management | Verify onChange handlers |
| Inputs allow invalid values | Add input validation | `type="number"`, min/max |
| Results showing `NaN` | Handle empty inputs | Provide defaults or validation |

### Calculator Debug
```javascript
// Check calculation logic
console.log({
  input1: value1,
  input2: value2,
  result: calculated
})

// Verify number parsing
console.log(typeof value)  // should be 'number'
```

---

## 📄 Content Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Content not updating | Clear Next.js cache | `rm -rf .next && npm run build` |
| 404 on new pages | Check file structure | Must be in `app/` directory |
| Old content showing | Browser cache or CDN | Hard refresh or clear cache |
| Markdown not rendering | Install/configure markdown parser | Check imports |

---

## 📦 Build & Deployment Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Build fails | Check error logs | Common: missing imports, type errors |
| Build works locally, fails on Vercel | Check Node version | Match Vercel's Node version |
| Static export fails | Check dynamic features | Can't use some Next.js features |
| Bundle too large | Analyze bundle | `npm run build` shows size warnings |

### Build Commands
```bash
# Test production build
npm run build && npm run start

# Check for errors
npm run lint

# Type check (if using TypeScript)
npx tsc --noEmit
```

---

## 🔧 Environment Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Env vars undefined | Restart dev server | Required after `.env.local` changes |
| Analytics not working | Check `NEXT_PUBLIC_GA_ID` | Must have `NEXT_PUBLIC_` prefix |
| Different behavior prod vs dev | Check env vars in deployment | Vercel/Netlify settings |

### Check Environment
```javascript
// In browser console (only NEXT_PUBLIC_ vars visible)
console.log(process.env.NEXT_PUBLIC_GA_ID)
```

---

## 🌐 SEO Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Pages not indexed | Check `robots.txt` | Ensure not blocking crawlers |
| Missing meta tags | Add in page/layout | Title, description, og tags |
| Sitemap errors | Regenerate sitemap | Check `app/sitemap.ts` |
| Canonical URLs wrong | Set `NEXT_PUBLIC_APP_URL` | Production URL |

### SEO Checklist
```tsx
// Page metadata
export const metadata = {
  title: 'Page Title | East Condos',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Page Title',
    description: 'Description',
    images: ['/og-image.jpg'],
  }
}
```

---

## 📱 Mobile Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Calculator broken on mobile | Test touch events | Check input sizing |
| Text too small | Set minimum font size | Use `text-base` or larger |
| Buttons too small | Increase tap target | Minimum 44x44px |
| Horizontal scroll | Check for overflow | Use responsive units |

### Mobile Testing
```bash
# Test on actual device
# 1. Find local IP: ifconfig (Mac) / ipconfig (Win)
# 2. Access: http://192.168.x.x:3000
# 3. Or use Chrome DevTools device mode
```

---

## 🐛 Common JavaScript Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Cannot read property of undefined" | Accessing nested property that doesn't exist | Use optional chaining: `obj?.prop` |
| "X is not a function" | Wrong import or undefined | Check import statement |
| Infinite loop | useEffect without deps | Add dependency array |
| Hydration mismatch | Server/client HTML different | Avoid `window` in Server Components |

---

## 📞 Performance Issues

| Problem | Quick Fix | Details |
|---------|-----------|---------|
| Slow page load | Check bundle size | `npm run build` shows warnings |
| Images loading slow | Optimize images | Use WebP, compress |
| Third-party scripts slow | Load async/defer | Use `<Script strategy="lazyOnload">` |
| High Time to Interactive | Reduce JavaScript | Code-split, lazy load |

### Performance Testing
```bash
# Build and test
npm run build
npm run start

# Then run Lighthouse in Chrome DevTools
# Target: 90+ score
```

---

## 🔗 External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Google Analytics Setup](https://analytics.google.com)

---

## 🆘 When to Escalate

Before asking for help, check:
1. ✅ This troubleshooting guide
2. ✅ `LESSONS.md` for similar issues
3. ✅ Error in browser console
4. ✅ Next.js documentation
5. ✅ Google the exact error message

When asking for help, provide:
- What you tried
- Error message + screenshot
- Steps to reproduce
- Environment (dev/prod)

---

**Last Updated**: 2026-02-21
**Keep this updated** when you solve new issues!
