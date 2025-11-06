# Real Estate Lead Platform - Getting Started

## Quick Links

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Read this first to understand the business model and architecture
- **[CHECKLIST.md](./CHECKLIST.md)** - Step-by-step guide to build and launch the MVP

## Project Structure

This is a minimal Next.js project. Keep it simple.

```
exclusive/
├── README.md              # This file
├── PROJECT_OVERVIEW.md    # Business plan and architecture
├── CHECKLIST.md          # Development checklist
│
└── app/                  # Your Next.js app (create this)
    ├── layout.tsx        # Root layout with header/footer
    ├── page.tsx          # Homepage
    ├── search/
    │   └── page.tsx      # Property search page (iHomefinder widget)
    ├── about/
    │   └── page.tsx      # About page
    │
    ├── components/       # Reusable components
    │   ├── Header.tsx
    │   └── Footer.tsx
    │
    ├── public/           # Static assets
    │   └── images/
    │
    └── .env.local        # Environment variables (don't commit!)
```

## Getting Started

### 1. Read the Docs
1. Read **PROJECT_OVERVIEW.md** to understand what we're building
2. Review **CHECKLIST.md** for the step-by-step plan

### 2. Set Up Accounts
Before coding, sign up for:
- **iHomefinder Lead Essentials** ($169/mo) - Get MLS access
- **Follow Up Boss** - CRM for lead tracking
- **Vercel** (free to start) - Hosting

### 3. Create Next.js Project
```bash
# In this directory, create the Next.js app
npx create-next-app@latest . --typescript --tailwind --app

# Install dependencies
npm install

# Start dev server
npm run dev
```

### 4. Follow the Checklist
Open **CHECKLIST.md** and work through each phase step by step.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vercel** for deployment
- **iHomefinder widgets** for property search
- **Follow Up Boss** for CRM

## Environment Variables

Create `.env.local` (never commit this file):

```env
# iHomefinder
NEXT_PUBLIC_IHOMEFINDER_WIDGET_ID=your_widget_id_here

# Follow Up Boss
NEXT_PUBLIC_FUB_PIXEL_ID=your_fub_pixel_id_here

# Optional
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Key Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server locally
npm run lint       # Check for code issues
```

## Deployment

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main

## Lead Flow Architecture

```
User → Your Next.js Site → iHomefinder Widget → Registration
                                                      ↓
                                          iHomefinder CRM
                                                      ↓
                                              Follow Up Boss
                                                      ↓
                                      Automated Nurture & Tracking
```

## Important Notes

- **Keep it simple** - Don't over-engineer
- **Ship fast** - Get MVP live in 2-4 weeks
- **Use the checklist** - Follow it step by step
- **Track everything in FUB** - This is your asset for resale

## Support & Resources

- **iHomefinder Docs**: https://kb.ihomefinder.com/
- **Follow Up Boss Help**: https://help.followupboss.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

## Questions?

If you get stuck:
1. Check the CHECKLIST.md for specific steps
2. Review PROJECT_OVERVIEW.md for context
3. Search the vendor documentation
4. Ask Claude for help!

---

**Ready to build?** Start with Phase 0 in CHECKLIST.md 🚀
