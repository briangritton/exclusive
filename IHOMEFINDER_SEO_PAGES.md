# iHomefinder SEO Pages Reference

**Last Updated:** 2025-11-10

This document lists all iHomefinder SEO pages and their configuration.

---

## How SEO Pages Work

**Key Concept:** All SEO pages use the SAME embed code:
```javascript
document.currentScript.replaceWith(ihfKestrel.render());
```

iHomefinder automatically detects the URL path and renders the appropriate full-page content. No component parameter needed!

---

## SEO Pages List

### Search & Results

#### 1. Listing Details ✅ IMPLEMENTED
- **URL:** https://www.exclusivecahomes.com/listing
- **Purpose:** Individual property detail pages
- **Status:** Created at `/app/listing/page.tsx`

#### 2. Search ✅ IMPLEMENTED
- **URL:** https://www.exclusivecahomes.com/search
- **Purpose:** Full property search with split-screen map/listings
- **Status:** Created at `/app/search/page.tsx`

---

### Featured & Markets

#### 3. Featured Listings ✅ IMPLEMENTED
- **URL:** https://www.exclusivecahomes.com/featured-listings
- **Purpose:** Manually curated exclusive properties
- **Status:** Created at `/app/featured-listings/page.tsx`

#### 4. Pending Featured Listings
- **URL:** https://www.exclusivecahomes.com/pending-featured-listings
- **Purpose:** Featured listings under contract
- **Status:** Not implemented (skip for MVP)

#### 5. Sold Featured Listings
- **URL:** https://www.exclusivecahomes.com/sold-featured-listings
- **Purpose:** Recently sold featured properties
- **Status:** Not implemented (skip for MVP)

#### 6. Open House Listings
- **URL:** https://www.exclusivecahomes.com/open-home-listings
- **Purpose:** Properties with scheduled open houses
- **Status:** Not implemented (skip for MVP)

#### 7. Supplemental Listings
- **URL:** https://www.exclusivecahomes.com/supplemental-listings
- **Purpose:** Non-MLS listings you manually add
- **Status:** Not implemented (skip for MVP)

#### 8. Markets
- **URL:** https://www.exclusivecahomes.com/markets
- **Purpose:** Browse properties by market/neighborhood
- **Status:** Not implemented (skip for MVP)

---

### Reports

#### 9. Listing Report
- **URL:** https://www.exclusivecahomes.com/listing-report
- **Purpose:** Detailed property listing report
- **Status:** Not implemented (skip for MVP)

#### 10. Open House Report
- **URL:** https://www.exclusivecahomes.com/open-home-report
- **Purpose:** Report of upcoming open houses
- **Status:** Not implemented (skip for MVP)

#### 11. Market Report
- **URL:** https://www.exclusivecahomes.com/market-report
- **Purpose:** Market statistics and trends
- **Status:** Not implemented (skip for MVP)

---

### Broker Pages

#### 12. Agent Profile
- **URL:** https://www.exclusivecahomes.com/agent
- **Purpose:** Individual agent profile pages
- **Status:** Not implemented (skip for MVP - not using agents)

#### 13. Agents
- **URL:** https://www.exclusivecahomes.com/agents
- **Purpose:** Directory of all agents
- **Status:** Not implemented (skip for MVP - not using agents)

---

### Other Tools

#### 14. Property Organizer
- **URL:** https://www.exclusivecahomes.com/property-organizer
- **Purpose:** User's saved/favorite properties
- **Status:** Not implemented (future enhancement)

#### 15. Email Alerts
- **URL:** https://www.exclusivecahomes.com/email-alerts
- **Purpose:** Manage property alert subscriptions
- **Status:** Not implemented (using MarketBoost instead)

#### 16. Mortgage Calculator
- **URL:** https://www.exclusivecahomes.com/mortgage-calculator
- **Purpose:** Calculate monthly mortgage payments
- **Status:** Not implemented (future enhancement)

#### 17. Valuation Form
- **URL:** https://www.exclusivecahomes.com/valuation
- **Purpose:** Get home value estimate
- **Status:** Not implemented (future enhancement)

#### 18. Contact Form
- **URL:** https://www.exclusivecahomes.com/contact
- **Purpose:** General contact form
- **Status:** Not implemented (using About page instead)

---

## Implementation Pattern

All SEO pages should follow this pattern:

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

// Declare iHomefinder types
declare global {
  interface Window {
    ihfKestrel?: {
      render: () => HTMLElement;
    };
  }
}

export default function PageName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptsLoadedRef.current) return;
    scriptsLoadedRef.current = true;

    const activationToken = process.env.NEXT_PUBLIC_IHOMEFINDER_ACTIVATION_TOKEN;

    const script1 = document.createElement('script');
    script1.src = 'https://kestrel.idxhome.com/ihf-kestrel.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.ihfKestrel = window.ihfKestrel || {};
      ihfKestrel.config = {
        platform: "",
        activationToken: "${activationToken}"
      };
    `;

    document.head.appendChild(script2);
    document.head.appendChild(script1);

    let attempts = 0;
    const maxAttempts = 50;

    const loadPage = () => {
      attempts++;
      const ihfKestrel = window.ihfKestrel;

      if (ihfKestrel && ihfKestrel.render && containerRef.current) {
        try {
          // NO PARAMETERS - iHomefinder detects page from URL
          const content = ihfKestrel.render();
          if (content) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(content);
            setLoading(false);
          } else if (attempts < maxAttempts) {
            setTimeout(loadPage, 100);
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error('Error rendering page:', err);
          setLoading(false);
        }
      } else if (attempts < maxAttempts) {
        setTimeout(loadPage, 100);
      } else {
        setLoading(false);
      }
    };

    setTimeout(loadPage, 500);
  }, []);

  return (
    <div>
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div>Loading...</div>
        </div>
      )}
      <div className="ihf-widget-isolation" ref={containerRef}></div>
    </div>
  );
}
```

---

## MVP Implementation Status

**Completed (3 pages):**
- ✅ /listing - Property details
- ✅ /search - Full search with map
- ✅ /featured-listings - Exclusive properties

**Skipped for MVP:**
- All pending/sold/open house pages
- All report pages
- All broker/agent pages
- Most utility pages

**Reason:** Focus on core search and lead capture functionality first.

---

## Notes

- SEO pages are auto-routed by iHomefinder based on URL
- No need to specify component names
- Pages work on both localhost (demo) and production (with subscription)
- iHomefinder handles all routing, filtering, pagination internally
