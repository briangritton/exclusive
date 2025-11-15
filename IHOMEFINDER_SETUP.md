# iHomefinder Dashboard Setup Guide

**Last Updated:** 2025-11-15

This document outlines the required configuration in your iHomefinder Control Panel to make the SEO pages work properly.

---

## Required SEO Pages Configuration

### Access Location:
iHomefinder Control Panel → SEO Pages (or Pages section)

### Pages to Enable:

#### 1. Search Results Page ✓ REQUIRED
- **URL Path:** `/search`
- **Purpose:** Main property search with map and filters
- **Status:** Must be enabled in dashboard
- **Implementation:** `/app/search/page.tsx`

#### 2. Listing Details Page ✓ REQUIRED
- **URL Path:** `/listing`
- **Purpose:** Individual property detail pages
- **Status:** Must be enabled in dashboard
- **Implementation:** Auto-routes through `/search` page

#### 3. Featured Listings Page (OPTIONAL)
- **URL Path:** `/featured-listings`
- **Purpose:** Curated exclusive properties
- **Status:** Optional for MVP
- **Implementation:** `/app/featured-listings/page.tsx`

---

## How SEO Pages Work

### Automatic URL Detection:
iHomefinder's Kestrel API uses **automatic URL detection** to determine which page to render:

```typescript
// NO PARAMETERS - iHomefinder detects page from URL
const content = ihfKestrel.render();
```

When a user visits `/search`, iHomefinder automatically:
1. Detects the URL path is `/search`
2. Looks up the "Search Results" SEO page configuration in your dashboard
3. Renders the full search interface with map and filters

### Demo Account Limitations:
- Demo accounts may show "Demo/Pending Account - not for public use" verification page
- This is normal during demo period
- Once your account is fully activated, the pages will work correctly

---

## Verification Steps

### 1. Check Dashboard Configuration:
- Log into iHomefinder Control Panel
- Navigate to SEO Pages section
- Verify "Search Results" is enabled
- Verify URL path is set to `/search`

### 2. Test on Production:
Once your account is activated:
- Visit https://www.exclusivecahomes.com/search
- Should see full property search interface
- Map should display on left (50% width)
- Listings should display on right (50% width)

### 3. URL Parameters:
SEO pages accept URL parameters for filtering:
- `boardId` - MLS board ID
- `propertyType` - SFR, CND, etc.
- `status` - active, pending, sold
- `bedrooms` - minimum bedrooms
- `bathCount` - minimum bathrooms
- `cityId` - specific city ID
- `sort` - priceAsc, priceDesc, etc.

Example: `/search?boardId=13&propertyType=SFR,CND&status=active&sort=priceDesc`

---

## Current Implementation Status

✅ **Completed:**
- Search page converted to SEO page pattern
- Type declarations unified across all pages
- CSS configured for 50/50 map/listings split
- Error handling for demo account limitations

⏳ **Pending:**
- iHomefinder account activation
- Dashboard SEO pages configuration verification
- Production testing once account is live

---

## Next Steps

1. **Verify Dashboard Setup:**
   - Confirm "Search Results" SEO page is enabled in iHomefinder dashboard
   - Check URL path configuration matches `/search`

2. **Wait for Account Activation:**
   - Demo account will show verification page on localhost
   - Once activated, SEO pages will work correctly

3. **Test on Production:**
   - Deploy to Vercel (already done)
   - Test https://www.exclusivecahomes.com/search
   - Verify map displays in 50/50 split-screen layout

---

## Support Resources

- **iHomefinder Knowledge Base:** https://kb.ihomefinder.com/
- **SEO Pages Documentation:** https://kb.ihomefinder.com/seo-pages
- **Control Panel:** https://www.ihomefinder.com/login

---

## Notes

- SEO pages are the recommended approach per iHomefinder best practices
- Widgets are an alternative but less SEO-friendly
- The code is now correctly implemented for SEO pages
- Map layout CSS has been configured for proper 50/50 split
- Once account is activated, everything should work correctly
