# Claude Development Guidelines

**Last Updated:** 2025-11-06

This document contains standard guidelines and context for Claude to follow when working on this real estate lead platform project.

---

## Project Context (Always Remember)

### Business Philosophy
- **Simple over clever** - Avoid premature optimization
- **Ship fast** - MVP in 2-4 weeks, iterate based on real data
- **Exit-ready** - Build clean, sellable systems from day 1
- **Proven tools** - Use established platforms, don't reinvent

### Tech Stack (Fixed)
- Next.js 14+ with App Router + TypeScript
- Tailwind CSS for styling
- Vercel for deployment (serverless)
- iHomefinder widgets (embedded, not iframe)
- Follow Up Boss CRM (master data source)

---

## Development Standards

### Code Style
1. **TypeScript**: Use strict typing where possible
2. **Components**: Keep components small and focused
3. **No over-engineering**: MVP first, optimize later
4. **Comments**: Only when business logic is unclear
5. **File naming**: kebab-case for files, PascalCase for components

### Project Structure (Maintain This)
```
/app
  /page.tsx              # Homepage
  /search/page.tsx       # Property search
  /about/page.tsx        # About page
  layout.tsx             # Root layout
/components
  /Header.tsx
  /Footer.tsx
/public
  /images
.env.local               # NEVER commit this
```

### Environment Variables
- **Pattern**: All variables exist in BOTH `.env.local` (local dev) AND Vercel dashboard (production)
- **Public variables**: Prefix with `NEXT_PUBLIC_*` (accessible in browser)
- **Private variables**: No prefix (server-only)
- **For MVP**: Mostly using public variables (widget IDs, tracking pixels)

### Git Practices
- Never commit `.env.local` (Next.js auto-gitignores it)
- Commit message format: Clear, concise, imperative mood
- Push to main triggers Vercel auto-deploy

---

## Integration Guidelines

### iHomefinder
- **Product**: Lead Essentials ($169/mo)
- **Coverage**: Northern California MLS
- **Implementation**: V10 widgets via JavaScript embed
- **Lead flow**: iHomefinder captures → forwards to FUB
- **MarketBoost**: Enable for automated property alerts
- **Docs**: https://kb.ihomefinder.com/

### Follow Up Boss
- **Role**: Master CRM for all lead data and lifecycle tracking
- **Custom fields**: `lead_source`, `property_interests`, `price_range`
- **Pipeline stages**: New Lead → Contacted → Qualified → Touring → Offer → Closed
- **Receives leads via**: Email parser from iHomefinder
- **Tracking**: FUB pixel in site `<head>`
- **Docs**: https://help.followupboss.com/

### Lead Flow (Don't Change This)
```
User registers on site
    ↓
iHomefinder widget captures lead
    ↓
iHomefinder CRM receives lead
    ↓
Auto-forwards to FUB (email parser)
    ↓
FUB action plans trigger
    ↓
MarketBoost sends property alerts
```

---

## What NOT to Do

### Code
- ❌ Don't build custom MLS integration (use iHomefinder)
- ❌ Don't over-engineer auth (iHomefinder handles registration)
- ❌ Don't build custom property alerts (iHomefinder MarketBoost)
- ❌ Don't add features not in CHECKLIST.md without asking
- ❌ Don't use WordPress (Next.js only)

### Architecture
- ❌ Don't bypass iHomefinder for lead capture (use their widgets)
- ❌ Don't skip Follow Up Boss (critical for exit value)
- ❌ Don't add complex state management (keep it simple for MVP)
- ❌ Don't build custom CRM features (that's what FUB is for)

---

## Session Workflow

### Starting a Session
1. Read CLAUDE.md (this file) first
2. Check CHECKLIST.md to see current phase
3. Review CONVERSATION_HISTORY.md for latest decisions
4. Ask user what phase they want to work on

### During Development
1. Reference CHECKLIST.md for specific implementation steps
2. Keep user informed of progress
3. Test locally before moving to next step
4. Update CONVERSATION_HISTORY.md after major milestones

### Making Decisions
1. Consult PROJECT_OVERVIEW.md for business context
2. Default to "simple over clever"
3. If decision affects architecture, ask user first
4. Document significant decisions in CONVERSATION_HISTORY.md

---

## Common Tasks & Commands

### Local Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Test production build
npm run lint         # Check for issues
```

### Testing Checklist
- [ ] Page loads correctly
- [ ] Responsive on mobile
- [ ] Widget displays (if applicable)
- [ ] No console errors
- [ ] Fast load time

### Deployment Flow
1. Push to GitHub (main branch)
2. Vercel auto-builds and deploys
3. Test on production URL
4. Verify environment variables working

---

## MVP Success Criteria

**MVP is complete when:**
1. Site is live and loads fast
2. Property search works (via iHomefinder widget)
3. Users can register
4. Leads flow into FUB automatically
5. Property alerts are being sent
6. First 10 real users registered

**After MVP, focus on:**
- First 100 users
- First closed deal
- Prove business model
- Then optimize and scale

---

## Quick Reference Links

- **Project docs**: PROJECT_OVERVIEW.md, CHECKLIST.md, README.md
- **Conversation log**: CONVERSATION_HISTORY.md
- **iHomefinder**: https://kb.ihomefinder.com/
- **Follow Up Boss**: https://help.followupboss.com/
- **Next.js**: https://nextjs.org/docs
- **Vercel**: https://vercel.com/docs

---

## Notes for Claude

### Be Proactive About
- Keeping code simple and readable
- Testing before declaring "done"
- Pointing out when user requests go against MVP principles
- Suggesting when to move to next phase in checklist

### Always Ask Before
- Adding dependencies not in original plan
- Changing architecture decisions
- Skipping checklist items
- Committing `.env.local` or secrets

### Remember
- User is building to sell - clean, documented code matters
- User wants to learn TypeScript as we go - explain when needed
- Speed to launch matters more than perfect code
- Follow Up Boss data quality is critical for exit value

---

**Last Session Progress:** Documentation complete, ready to start Phase 0/1
**Next Action:** Create Next.js project (after user confirms accounts are set up)
