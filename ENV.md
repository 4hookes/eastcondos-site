# Environment Setup - East Condos Site

## Required API Keys

Currently, this project uses minimal external services. As you integrate APIs, document them here.

### Analytics (Optional)

- **`NEXT_PUBLIC_GA_ID`** (Google Analytics)
  - Get from: [Google Analytics](https://analytics.google.com)
  - Format: `G-XXXXXXXXXX`
  - Used for: Tracking site visitors and conversions

- **`NEXT_PUBLIC_GTM_ID`** (Google Tag Manager - Alternative)
  - Get from: [Google Tag Manager](https://tagmanager.google.com)
  - Format: `GTM-XXXXXXX`
  - More flexible than GA for multiple tracking pixels

### Form Submissions (If needed)

- **`RESEND_API_KEY`** (for contact forms)
  - Get from: [Resend](https://resend.com/api-keys)
  - Server-side only (no `NEXT_PUBLIC_` prefix)

- **`SENDGRID_API_KEY`** (alternative email service)
  - Get from: [SendGrid](https://app.sendgrid.com/settings/api_keys)

### Maps (If property maps are added)

- **`NEXT_PUBLIC_GOOGLE_MAPS_KEY`**
  - Get from: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  - Enable: Maps JavaScript API

## Environment Files

### `.env.local` (Development - NOT in git)
Your local environment variables. Create this file:
```bash
cp .env.example .env.local
```

### `.env.production` (Production)
Managed via Vercel/Netlify dashboard:
- Vercel: Settings → Environment Variables
- Set to "Production" environment

### `.env.example` (Template - IN git)
Template for team members. No real values.

## Setup Instructions

### First Time Setup

1. **Copy template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Add analytics (optional)**:
   - Get Google Analytics ID from your GA account
   - Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Verify setup**:
   ```bash
   npm run dev
   ```
   - Site should load at `localhost:3000`
   - Check browser console for errors

### Verifying Environment Variables

Check in browser console (for `NEXT_PUBLIC_` vars only):
```javascript
console.log({
  analyticsId: process.env.NEXT_PUBLIC_GA_ID,
})
```

## Security Best Practices

### ✅ DO
- Keep `.env.local` in `.gitignore`
- Use `NEXT_PUBLIC_` only for truly public values
- Store API keys in hosting platform for production
- Use different tracking IDs for dev/staging/prod

### ❌ DON'T
- Never commit `.env.local` to git
- Never expose server-side keys with `NEXT_PUBLIC_`
- Never hardcode keys in component files
- Never share production keys in Slack/email

## Current Environment Variables

| Variable | Required | Exposed to Client | Purpose |
|----------|----------|-------------------|---------|
| `NEXT_PUBLIC_GA_ID` | No | Yes | Google Analytics tracking |
| `NEXT_PUBLIC_GTM_ID` | No | Yes | Google Tag Manager |
| `NEXT_PUBLIC_APP_URL` | No | Yes | Base URL for canonical links |

## Future Integrations

Document here as you add:
- CMS API keys (if content becomes dynamic)
- Payment processing (if e-commerce added)
- CRM integrations (lead capture forms)
- Real estate listing APIs

## Troubleshooting

### Environment variables not loading
- Restart dev server after changing `.env.local`
- Clear browser cache (Cmd+Shift+R)
- Verify file is named `.env.local` exactly

### Analytics not tracking
- Check GA ID is correct format: `G-XXXXXXXXXX`
- Verify analytics component is included in `layout.tsx`
- Test in incognito mode (extensions can block)
- Check Network tab for analytics requests

## Related Files
- See: `.env.example` - Template file
- See: `TROUBLESHOOTING.md` - Common issues
- See: `app/layout.tsx` - Where analytics is initialized
