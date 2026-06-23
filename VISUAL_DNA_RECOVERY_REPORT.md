# VISUAL DNA RECOVERY REPORT

## Executive Summary

Every `<img>` tag on the EgyptHub homepage currently points to SVG placeholder files (dark rectangles with circles and Arabic text). Zero real photography is displayed. This report catalogs every missing asset, its required state, and the Unsplash source URL used for recovery.

---

## ASSET INVENTORY

### 1. HERO BACKGROUND

| Field | Value |
|-------|-------|
| **Component** | `HeroSection.tsx` |
| **Current State** | SVG placeholder (`/egypthub/images/destinations/cairo.svg`) |
| **Required State** | Full-bleed cinematic pyramids-at-sunset photography |
| **Source** | `https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1920&q=85` |
| **Description** | Pyramids of Giza at golden hour, warm atmospheric lighting |

### 2. STORY CARD IMAGES (5 cards)

| Card | Current | Required | Unsplash URL |
|------|---------|----------|--------------|
| Sunrise in Dahab | `dahab.svg` placeholder | Dahab beach sunrise | `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=85` |
| Hidden Cafes of Alexandria | `alexandria.svg` placeholder | Alexandria cafe scene | `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85` |
| Nile Dinner in Aswan | `aswan.svg` placeholder | Nile river dinner cruise | `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85` |
| Desert Safari in Siwa | `siwa.svg` placeholder | Sahara desert safari | `https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=85` |
| Street Food in Cairo | `cairo.svg` placeholder | Egyptian street food | `https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=85` |

### 3. SIGNATURE COLLECTION BACKGROUND

| Field | Value |
|-------|-------|
| **Component** | `SignatureCollection.tsx` |
| **Current State** | CSS gradient background (no image) |
| **Required State** | Full-width luxury resort photography |
| **Source** | `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85` |
| **Description** | Luxury resort pool at sunset, premium hospitality |

### 4. LOCAL EYES PORTRAITS (4 guides)

| Guide | Current | Required | Unsplash URL |
|-------|---------|----------|--------------|
| Omar (Cairo) | `cairo.svg` placeholder | Male Egyptian portrait | `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85` |
| Nour (Alexandria) | `alexandria.svg` placeholder | Female Egyptian portrait | `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85` |
| Youssef (Luxor) | `luxor.svg` placeholder | Male Egyptian portrait | `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85` |
| Mai (Dahab) | `dahab.svg` **MISSING FILE** | Female Egyptian portrait | `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85` |

### 5. PARTNER LOGOS (5 brands)

| Brand | Current | Required | Treatment |
|-------|---------|----------|-----------|
| Four Seasons | Letter "F" in box | Text SVG logo | Grayscale, hover opacity |
| Aman | Letter "A" in box | Text SVG logo | Grayscale, hover opacity |
| Kempinski | Letter "K" in box | Text SVG logo | Grayscale, hover opacity |
| Steigenberger | Letter "S" in box | Text SVG logo | Grayscale, hover opacity |
| Jaz | Letter "J" in box | Text SVG logo | Grayscale, hover opacity |

### 6. PAYMENT LOGOS (6 brands)

| Brand | Current | Required |
|-------|---------|----------|
| VISA | Text "VISA" | SVG logo |
| Mastercard | Text "MC" | SVG logo (two circles) |
| American Express | Text "AMEX" | SVG logo |
| Booking.com | Text "Booking.com" | SVG text |
| Expedia | Text "Expedia" | SVG text |
| Google | Text "Google" | SVG text |

### 7. MOBILE PREVIEW IMAGES

| Field | Value |
|-------|-------|
| **Component** | `MobilePreview.tsx` |
| **Current State** | 3 destination SVGs + 1 activity SVG placeholder |
| **Required State** | Real destination photography |
| **Sources** | Cairo: `https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=85` |
| | Luxor: `https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=85` |
| | Dahab: `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=85` |
| | Diving: `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=85` |

### 8. MAP FLOATING CARD IMAGE

| Field | Value |
|-------|-------|
| **Component** | `HeroSection.tsx` (floating destination card) |
| **Current State** | `dahab.svg` placeholder (**FILE MISSING**) |
| **Required State** | Real Dahab destination photo |
| **Source** | `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=85` |

---

## SUMMARY TABLE

| Category | Placeholders Removed | Real Assets Added |
|----------|---------------------|-------------------|
| Hero Background | 1 | 1 Unsplash photo |
| Story Cards | 5 | 5 Unsplash photos |
| Signature Collection | 0 (was CSS) | 1 Unsplash photo |
| Local Eyes Portraits | 4 | 4 Unsplash photos |
| Partner Logos | 5 (letter boxes) | 5 SVG text logos |
| Payment Logos | 6 (text) | 6 SVG logos |
| Mobile Preview | 4 | 4 Unsplash photos |
| Map Floating Card | 1 | 1 Unsplash photo |
| **TOTAL** | **26 placeholders** | **26 real assets** |

---

## FILES MODIFIED

| File | Changes |
|------|---------|
| `HeroSection.tsx` | Hero bg, floating card, hydration fix, typo fix |
| `StoriesSection.tsx` | 5 card images, star rating fix |
| `SignatureCollection.tsx` | Full-width photography background |
| `LocalEyes.tsx` | 4 portrait photos |
| `PartnerLogos.tsx` | SVG text logos |
| `TrustBadges.tsx` | Payment logos, unique icons |
| `MobilePreview.tsx` | 4 destination/activity photos |
| `page.tsx` | Remove BenefitsRow import |

---

## BUGS FIXED

| Bug | Location | Fix |
|-----|----------|-----|
| `Math.random()` in render | HeroSection lines 402, 408 | Use deterministic seeded values |
| Typo "CONCERCE" | HeroSection line 282 | → "CONCIERGE" |
| `dahab.svg` missing | HeroSection, LocalEyes, MobilePreview | Use Unsplash URLs |
| Star rating always 4/5 | StoriesSection line 94 | Use actual rating value |
| BenefitsRow duplicate | page.tsx | Remove BenefitsRow |
| All trust items same icon | TrustBadges | Unique icons per benefit |
