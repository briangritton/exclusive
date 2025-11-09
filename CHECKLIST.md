# Development Checklist - MVP Launch

## Phase 0: Setup & Accounts (Week 1)

### Account Creation
- [ ] Sign up for iHomefinder Lead Essentials plan ($169/mo)
  - [ ] Request Northern California MLS coverage
  - [ ] Note down API credentials and widget embed codes
- [ ] Sign up for Follow Up Boss CRM
  - [ ] Note down email parser address for lead forwarding
  - [ ] Get FUB tracking pixel code

### Domain & Hosting
- [ ] Purchase domain (if not already owned)
- [ ] Create Vercel account (free tier to start)
- [ ] Connect domain to Vercel
- [ ] Verify DNS propagation

---

## Phase 1: Next.js Project Setup (Week 1)

### Initialize Project
- [x] Create new Next.js project with TypeScript
  ```bash
  npx create-next-app@latest your-project-name --typescript --tailwind --app
  ```
- [x] Initialize git repository
- [x] Create `.env.local` for environment variables
- [x] Push to GitHub (for Vercel auto-deploy)

### Basic Project Structure
```
/app
  /page.tsx          # Homepage
  /search/page.tsx   # Property search page
  /about/page.tsx    # About page
/components
  /Header.tsx        # Navigation
  /Footer.tsx        # Footer
/public
  /images            # Logo, photos
```

### Environment Variables (Local Development)
- [x] Create `.env.local` in project root (Next.js adds to .gitignore automatically)
- [x] Add environment variables for local development:
  ```env
  # .env.local (NEVER commit this file)
  NEXT_PUBLIC_IHOMEFINDER_WIDGET_ID=your_widget_id_here
  NEXT_PUBLIC_FUB_PIXEL_ID=your_fub_pixel_id_here
  ```
- [x] Test variables work locally: `npm run dev`
- [ ] **Note:** You'll add the same variables to Vercel dashboard later (Phase 6)

**Understanding Public vs Private Variables:**
- `NEXT_PUBLIC_*` prefix = Exposed to browser (widget IDs, pixel IDs)
- No prefix = Server-only (API secrets, database URLs)
- For MVP, you'll mostly use public variables since widgets/pixels run in browser

---

## Phase 2: Build Core Pages (Week 1-2)

### Homepage (`/app/page.tsx`)
- [x] Create hero section with value proposition
- [x] Add search preview or CTA button
- [x] Link to search page
- [x] Keep it simple and fast

### Search Page (`/app/search/page.tsx`)
- [x] Create search page structure with placeholder for widget
- [ ] Embed iHomefinder V10 search widget
  - [ ] Get widget embed code from iHomefinder dashboard
  - [ ] Add to page using `<Script>` component or direct embed
  - [ ] Test search functionality
  - [ ] Test lead registration flow

### About Page (`/app/about/page.tsx`)
- [x] Brief intro about your service
- [x] Why choose you (luxury focus, personalized service)
- [x] Contact information

### Navigation
- [x] Create `Header` component with links
- [x] Create `Footer` component with legal/contact info
- [x] Add to root layout

---

## Phase 3: iHomefinder Integration (Week 2)

### Widget Setup
- [x] Log into iHomefinder dashboard
- [x] Navigate to "Widgets" or "Integration" section
- [x] Configure Version & Platform settings
- [x] Get activation token
- [x] Implement widget rendering on search page
- [x] Verify search displays correctly locally
- [ ] Test on mobile
- [ ] Deploy to production and verify

### Lead Capture Configuration
- [ ] Configure registration prompts in iHomefinder
  - [ ] Set when registration modal appears
  - [ ] Customize form fields (name, email, phone)
  - [ ] Test registration flow
- [ ] Verify leads appear in iHomefinder CRM dashboard

### Lead Forwarding to FUB
- [ ] In iHomefinder dashboard, find "Lead Forwarding" settings
- [ ] Add Follow Up Boss email parser address
- [ ] Configure what data to send (name, email, phone, source)
- [ ] Test by registering as a test user
- [ ] Verify test lead appears in FUB within 5 minutes

---

## Phase 4: Follow Up Boss Setup (Week 2)

### CRM Configuration
- [ ] Create custom fields in FUB:
  - [ ] `lead_source` (to track iHomefinder vs future sources)
  - [ ] `property_interests` (from iHomefinder)
  - [ ] `price_range` (if available)
- [ ] Set up pipeline stages:
  - [ ] New Lead
  - [ ] Contacted
  - [ ] Qualified
  - [ ] Touring
  - [ ] Offer Submitted
  - [ ] Closed

### Action Plans (Basic Nurture)
- [ ] Create "New Lead" action plan:
  - [ ] Day 0: Welcome email
  - [ ] Day 1: Text introduction
  - [ ] Day 3: Follow-up email with value
  - [ ] Day 7: Check-in call task
- [ ] Test action plan with test lead

### FUB Tracking Pixel
- [ ] Add FUB pixel to your site `<head>` (in root layout)
- [ ] Test pixel is firing (check FUB dashboard)

---

## Phase 5: iHomefinder Automation (Week 2-3)

### MarketBoost Property Alerts
- [ ] Enable MarketBoost in iHomefinder dashboard
- [ ] Configure alert frequency (daily/weekly)
- [ ] Set up alert templates:
  - [ ] New listings matching saved searches
  - [ ] Price drops on viewed properties
  - [ ] Market reports for target areas
- [ ] Test by creating saved search as test user

### Email Templates
- [ ] Customize iHomefinder email templates (optional)
- [ ] Ensure branding matches your site
- [ ] Include your contact info

---

## Phase 6: Deploy & Test (Week 3)

### Vercel Deployment
- [x] Connect GitHub repo to Vercel
- [x] Configure environment variables in Vercel dashboard:
  - [x] Go to Project Settings → Environment Variables
  - [x] Add `NEXT_PUBLIC_IHOMEFINDER_WIDGET_ID` (same value as .env.local)
  - [x] Add `NEXT_PUBLIC_FUB_PIXEL_ID` (same value as .env.local)
  - [x] Select all environments: Production, Preview, Development
- [x] Deploy to production (waiting for successful build)
- [x] Verify site loads at your domain
- [ ] Test on mobile devices
- [ ] Verify environment variables are working (check widgets/pixels load)

### End-to-End Testing
- [ ] **Test 1: Search**
  - [ ] Visit search page
  - [ ] Search for properties
  - [ ] View property details
- [ ] **Test 2: Registration**
  - [ ] Register with test email
  - [ ] Verify receive confirmation
  - [ ] Check lead in iHomefinder dashboard
  - [ ] Check lead in FUB (within 5 min)
- [ ] **Test 3: Property Alerts**
  - [ ] Create saved search as test user
  - [ ] Wait for alert email (may take 24hrs)
  - [ ] Verify alert received and looks good
- [ ] **Test 4: FUB Action Plan**
  - [ ] Verify test lead enters action plan
  - [ ] Check welcome email sent
  - [ ] Check tasks created for follow-up

---

## Phase 7: Launch Checklist (Week 3-4)

### Pre-Launch
- [ ] Add Google Analytics or tracking
- [ ] Add SSL certificate (Vercel does this automatically)
- [ ] Test site speed (should be fast)
- [ ] Test all links work
- [ ] Proofread all content

### Soft Launch
- [ ] Share with 5-10 friends/family for feedback
- [ ] Monitor for bugs or issues
- [ ] Check lead flow working correctly

### Public Launch
- [ ] Announce on social media (if applicable)
- [ ] Start driving traffic (ads, SEO, networking)
- [ ] Monitor FUB for incoming leads
- [ ] Respond to first real leads quickly!

---

## Phase 8: Monitor & Iterate (Ongoing)

### Weekly Tasks
- [ ] Check FUB for new leads
- [ ] Review lead sources (where are they coming from?)
- [ ] Monitor conversion metrics
- [ ] Respond to all inquiries within 24 hours

### Monthly Review
- [ ] Total leads captured
- [ ] Lead conversion rate
- [ ] First closed deal (celebrate!)
- [ ] Review and optimize email templates
- [ ] Review and optimize FUB action plans

### Future Enhancements (After MVP)
- [ ] Add AI chat interface on homepage
- [ ] Create custom SEO pages (neighborhoods, market guides)
- [ ] Add testimonials/social proof
- [ ] Expand to Southern California MLS
- [ ] Add more lead sources (Zillow, Facebook ads)
- [ ] Build admin dashboard for analytics

---

## Success Criteria

**MVP is complete when:**
1. ✅ Site is live and loads fast
2. ✅ Property search works (via iHomefinder widget)
3. ✅ Users can register
4. ✅ Leads flow into FUB automatically
5. ✅ Property alerts are being sent
6. ✅ First 10 real users registered

**After that, focus on:**
- Getting your first 100 users
- Getting your first closed deal
- Proving the business model works
- Then optimize and scale
