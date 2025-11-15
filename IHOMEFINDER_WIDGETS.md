# iHomefinder Widgets Reference

**Last Updated:** 2025-11-10

This document lists all iHomefinder embeddable widgets with their exact configuration options.

---

## How Widgets Work

**Key Concept:** Widgets are embeddable components you place WITHIN your own page layouts.

Unlike SEO pages (which take over the entire page), widgets are specified by component name:
```javascript
ihfKestrel.render({ "component": "widgetNameHere", ...options })
```

---

## Available Widgets (From iHomefinder Dashboard)

### 1. Contact Form Widget ✅
**Component:** `contactFormWidget`

**Purpose:** Simple contact form for lead capture

**Configuration:** None (uses defaults)

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "contactFormWidget"
})
```

**Use Cases:**
- About page
- Contact page
- Footer contact section

**Status:** Not implemented

---

### 2. Featured Listing Search Widget ✅
**Component:** `featuredListingSearchWidget`

**Purpose:** Search widget filtered to featured properties only

**Configuration Options:**
- `propertyType` - Property type filter (e.g., "SFR" for single family residential)
- `status` - Listing status ("active", "pending", "sold")
- `sort` - Sort order ("pd" = price descending)
- `resultsPerPage` - Number of results per page (default: 15)

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "featuredListingSearchWidget",
    "propertyType": "SFR",
    "status": "active",
    "sort": "pd",
    "resultsPerPage": 15
})
```

**Use Cases:**
- Showcase only featured/exclusive listings
- Custom landing pages for high-end properties

**Status:** Not implemented

---

### 3. Gallery Slider Widget ✅
**Component:** `gallerySliderWidget`

**Purpose:** Rotating carousel of properties with images

**Configuration Options:**
- `rows` - Number of rows (default: 1)
- `navigation` - Show navigation controls (true/false)
- `nav` - Navigation position ("top", "bottom")
- `auto` - Auto-advance slides (true/false)
- `maxResults` - Maximum number of properties to show (default: 25)
- `status` - Filter by listing status ("active")
- `featured` - Show only featured properties (true/false)
- `effect` - Transition effect ("slide", "fade")

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "gallerySliderWidget",
    "rows": 1,
    "navigation": true,
    "nav": "top",
    "auto": true,
    "maxResults": 25,
    "status": "active",
    "featured": true,
    "effect": "slide"
})
```

**Use Cases:**
- Homepage featured properties section
- Eye-catching property showcases
- Landing pages

**Status:** ✅ Implemented on homepage

---

### 4. Listing Search Widget ✅
**Component:** `listingSearchWidget`

**Purpose:** Embeddable search form (widget version, NOT full-page)

**Configuration:** None (uses defaults)

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "listingSearchWidget"
})
```

**Important Note:**
- This is a WIDGET, not the full search page
- Does NOT give split-screen map view
- Use SEO page `/search` for full search experience

**Use Cases:**
- Embed search in custom page section
- Quick search on blog posts
- Secondary search widgets

**Status:** Not implemented (using SEO page instead)

---

### 5. Properties Gallery Widget ✅
**Component:** `propertiesGalleryWidget`

**Purpose:** Grid of properties filtered by location/criteria

**Configuration Options:**
- `cityId` - Filter by specific city ID (e.g., 47 for Auburn)
- `propertyTypes` - Property type(s) (e.g., "SFR")
- `status` - Listing status ("active")
- `sort` - Sort order ("pd" = price descending)
- `resultsPerPage` - Number of results to show (default: 15)

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "propertiesGalleryWidget",
    "cityId": 47,
    "propertyTypes": "SFR",
    "status": "active",
    "sort": "pd",
    "resultsPerPage": 15
})
```

**Use Cases:**
- Neighborhood-specific property pages
- City landing pages
- Custom filtered property lists

**Status:** Not implemented

---

### 6. Quick Search Widget ✅
**Component:** `quickSearchWidget`

**Purpose:** Simple, compact search form (location, price, beds/baths)

**Configuration Options:**
- `style` - Layout style ("horizontal", "vertical")

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "quickSearchWidget",
    "style": "horizontal"
})
```

**Use Cases:**
- Homepage hero section
- Header search bar
- Compact search forms

**Status:** ✅ Implemented on homepage

---

### 7. Registration Form Widget ✅
**Component:** `registrationFormWidget`

**Purpose:** User registration/signup form

**Configuration Options:**
- `redirectUrl` - URL to redirect after successful registration
- `buttonText` - Custom button text (e.g., "Gain Access", "Sign Up")

**Example Code:**
```javascript
ihfKestrel.render({
    "component": "registrationFormWidget",
    "redirectUrl": "https://www.exclusivecahomes.com/registered",
    "buttonText": "Gain Access"
})
```

**Use Cases:**
- Gated content pages
- Lead capture landing pages
- Exclusive access signup

**Status:** Not implemented

---

### 8. Sell My House Widget (Missing from Dashboard)
**Component:** `sellMyHouseWidget` (assumed)

**Purpose:** Home valuation form for sellers

**Configuration:** Unknown (not provided in dashboard export)

**Status:** ✅ Implemented on homepage (needs verification)

**Note:** This widget was implemented but wasn't in the widget list you provided. We should verify the component name and options are correct.

---

## Implementation Pattern

### Basic Widget Implementation

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

// Type declarations
declare global {
  interface Window {
    ihfKestrel?: {
      render: (config?: Record<string, any>) => HTMLElement;
    };
  }
}

export default function YourPage() {
  const widgetRef = useRef<HTMLDivElement>(null);
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

    const loadWidget = () => {
      attempts++;
      const ihfKestrel = window.ihfKestrel;

      if (ihfKestrel && ihfKestrel.render && widgetRef.current) {
        try {
          // Widget with options
          const widget = ihfKestrel.render({
            "component": "quickSearchWidget",
            "style": "horizontal"
          });

          if (widget) {
            widgetRef.current.innerHTML = '';
            widgetRef.current.appendChild(widget);
            setLoading(false);
          } else if (attempts < maxAttempts) {
            setTimeout(loadWidget, 100);
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error('Error rendering widget:', err);
          setLoading(false);
        }
      } else if (attempts < maxAttempts) {
        setTimeout(loadWidget, 100);
      } else {
        setLoading(false);
      }
    };

    setTimeout(loadWidget, 500);
  }, []);

  return (
    <div>
      {/* Your custom page content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Find Your Home</h2>

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              Loading...
            </div>
          )}

          {/* Widget container with isolation */}
          <div className="ihf-widget-isolation" ref={widgetRef}></div>
        </div>
      </section>

      {/* More custom content */}
    </div>
  );
}
```

---

## Key Differences: SEO Pages vs Widgets

| Feature | SEO Pages | Widgets |
|---------|-----------|---------|
| **Usage** | Full-page routes | Embedded in custom layouts |
| **Render Call** | `ihfKestrel.render()` (no params) | `ihfKestrel.render({ component: "name" })` |
| **Configuration** | Auto-detected from URL | Explicit options passed |
| **Styling** | Full iHomefinder styling | Can be styled by your CSS |
| **Examples** | /search, /listing, /featured-listings | Quick Search, Gallery Slider |
| **URL Detection** | Auto-detects from URL path | Explicitly specified |
| **Layout Control** | iHomefinder controls everything | You control page layout |
| **Map View** | Full split-screen available | Limited/tile view only |

---

## Widget vs SEO Page Decision Guide

### Use SEO Pages When:
- ✅ You want the full iHomefinder experience
- ✅ SEO and deep linking are critical
- ✅ You need split-screen map view
- ✅ You need advanced filtering/sorting UI
- ✅ You want pagination handled automatically
- **Examples:** Property search results, listing details, featured listings directory

### Use Widgets When:
- ✅ You want to embed functionality in YOUR page layout
- ✅ You want to control surrounding content and branding
- ✅ You want small, focused components
- ✅ You want custom styling around the widget
- **Examples:** Homepage search form, contact forms, property sliders

---

## Current Homepage Implementation

Our homepage uses 3 widgets embedded in custom sections:

1. **Hero Section** → `quickSearchWidget` (style: horizontal)
2. **Featured Section** → `gallerySliderWidget` (featured, auto-advance)
3. **Bottom Section** → `sellMyHouseWidget` (needs verification)

This gives us control over the page design while leveraging iHomefinder functionality.

---

## Property Type Codes

Common property type codes you can use in widget configuration:

- `SFR` - Single Family Residential
- `CONDO` - Condominium
- `LAND` - Land/Lots
- `MF` - Multi-Family

Check your iHomefinder dashboard for the complete list specific to your MLS.

---

## Sort Order Codes

Common sort order codes:

- `pd` - Price Descending (High to Low)
- `pa` - Price Ascending (Low to High)
- `date` - Date Listed (Newest First)
- `beds` - Number of Bedrooms
- `sqft` - Square Footage

---

## Notes

- All widgets require the iHomefinder Kestrel script to be loaded first
- Widget styling can be customized with CSS
- Use `.ihf-widget-isolation` class to prevent CSS conflicts
- Test widgets in browser console if unsure about configuration options
- Some widgets may require specific iHomefinder account features/upgrades

---

## Widgets Not in Current Dashboard

These were in the dropdown list but not in your exported widget code:
- Market Index Widget
- MarketBoost Report Signup Widget
- Property Organizer Login Widget

These may require additional configuration or may not be available in your current account tier.
