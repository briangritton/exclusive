# Real Estate Lead Referral Platform - Project Overview

## Business Goal

Build a profitable real estate lead generation and referral business targeting luxury homes ($1.5M+) in Northern California, with potential to scale and sell the business.

## Revenue Model

**Primary Income Sources:**
- 50% referral fee on closed deals
- 30-40% of buyers serviced as MLO (mortgage origination)
- Referral fees when buyers later sell through our network

**Target Metrics:**
- 1-5% lead conversion rate to closed buyers
- $2,500 average lifetime value per user
- Scale to 10k+ users for potential exit

## The Solution

A minimal, modern real estate search platform that:
1. Provides MLS property search (via iHomefinder)
2. Captures and nurtures leads automatically
3. Tracks user behavior for lifecycle value metrics
4. Enables future AI/chat experiments

## Tech Stack (Simple & Proven)

- **Frontend/Backend:** Next.js + React + TypeScript
- **Hosting:** Vercel (serverless, zero maintenance)
- **IDX/Search:** iHomefinder Lead Essentials ($169/mo)
- **CRM:** Follow Up Boss (lifecycle tracking & nurture)
- **Domain:** www.yourdomain.com → Vercel

## Architecture

```
User visits site
    ↓
Browses properties (iHomefinder widget embedded)
    ↓
Registers to save homes
    ↓
iHomefinder captures lead + tracks property views
    ↓
Lead auto-forwards to Follow Up Boss
    ↓
FUB manages pipeline, nurture, and LTV tracking
    ↓
iHomefinder sends automated property alerts (MarketBoost)
```

## What Each Tool Does

### iHomefinder ($169/mo)
- Provides MLS data feed (Northern California)
- Property search interface (embedded widget)
- User registration and saved searches
- Automated property alerts (new listings, price drops)
- Tracks which properties users view
- Basic CRM (we'll use for property-driven nurture only)

### Follow Up Boss (Master CRM)
- Receives all leads from iHomefinder
- Central database for all user data
- Pipeline management (stages, tasks, notes)
- Advanced action plans and automation
- LTV tracking and reporting
- Future: multi-channel lead sources (ads, Zillow, etc.)

### Your Next.js Site
- Custom brand and user experience
- Landing pages and content
- Future: AI chat interface for lead qualification
- Future: Custom SEO pages (neighborhoods, guides)

## MVP Features (Launch in 2-4 Weeks)

**Phase 1: Core Search**
1. Simple, clean homepage
2. Property search page (embedded iHomefinder widget)
3. About page
4. Lead capture working → iHomefinder → FUB

**Phase 2: Automation** (Week 3-4)
1. iHomefinder MarketBoost alerts enabled
2. FUB action plans configured
3. Basic email nurture sequences live

**Future Phases:**
- AI chat interface for lead qualification
- Custom SEO content (neighborhood guides)
- Advanced analytics dashboard
- Multi-channel lead sources

## Success Metrics

**Month 1-3:**
- Site live and stable
- First 50-100 registered users
- Lead flow working: iHomefinder → FUB
- First property alert campaigns sent

**Month 4-6:**
- 500+ registered users
- First closed deals (validate conversion rate)
- Refine nurture sequences based on data
- Add AI chat experiments

**Month 7-12:**
- 2,000+ users
- Proven conversion metrics
- Calculate actual LTV
- Scale or optimize based on data

## Key Principles

1. **Simple over clever** - No premature optimization
2. **Proven tools** - Use established platforms (iHomefinder, FUB)
3. **Data from day 1** - Track everything in FUB for resale value
4. **Fast iteration** - Launch fast, improve based on real data
5. **Exit-ready** - Build clean, sellable systems from the start

## Why This Will Work

- **iHomefinder:** Proven IDX platform, handles all MLS complexity
- **Follow Up Boss:** Industry-standard CRM, acquirers recognize it
- **Next.js/Vercel:** Modern, maintainable, scalable
- **Focus on luxury:** Higher commissions = faster profitability
- **Lifecycle tracking:** Clean data = higher exit valuation
