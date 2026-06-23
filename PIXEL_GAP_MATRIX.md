# PIXEL GAP MATRIX

Comparison: Current Implementation vs Approved Design Specification

---

## 01_HERO SECTION

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Hero background | Unsplash pyramids photo with heavy dark overlays | Cinematic pyramids at sunset with warm golden tones, less overlay on right side | HIGH |
| Left panel width | ~40% (grid-cols-[2fr_3fr]) | ~42-45% (slightly wider text area) | MEDIUM |
| Headline font | Playfair Display, 64px, white | Same serif, but specification shows slightly larger ~68-72px | MEDIUM |
| Gold italic text | "It's a story waiting to be yours." in gold | Same — but specification shows italic/script style more prominently | LOW |
| Zainab figure | Inside AI widget as small sparkle icon | LARGE standalone figure (~200px) bottom-right with holographic rings | CRITICAL |
| AI widget position | Below hero text, full-width card | Bottom-left overlay, compact card | HIGH |
| AI widget has no Zainab | Widget shows sparkle icon only | Zainab is the LARGE figure on right, not inside widget | CRITICAL |
| Holographic rings | None | 3 concentric gold glowing rings beneath Zainab | CRITICAL |
| Header transparency | Has gradient background | Fully transparent, no blur | MEDIUM |
| Travel pill icons | Emoji icons | SVG/icon font icons (more refined) | LOW |
| Play button style | Outlined circle with play icon | Same — matches specification | NONE |
| Content density | Sparse left panel | Specification shows same density — matches | NONE |

## 02_MAP SECTION

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Map terrain | Abstract SVG outline of Egypt | Real geographic terrain with visible topographic detail | CRITICAL |
| Nile river | Simple SVG path | Glowing gold line with visible river course | HIGH |
| City markers | Gold dots with pulse rings | Circular photo previews (~40px) with gold ring border | CRITICAL |
| Marker content | Just gold dots | Destination photography inside each marker | CRITICAL |
| Floating card width | 256px (w-64) | ~280px | LOW |
| Floating card image | Unsplash photo (correct now) | Same — matches | NONE |
| Category chips | Emoji icons | SVG icons (refined) | MEDIUM |
| Red Sea label | Text only | Same — matches | NONE |
| Live in Egypt strip | Horizontal grid below map | Integrated at bottom of map section | MEDIUM |
| Map section height | Full remaining viewport | Same — matches | NONE |

## 03_AI_CONCIERGE (Zainab Figure)

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Zainab figure | Not present as standalone element | Large woman figure (~200px) standing on holographic rings | CRITICAL |
| Figure positioning | N/A | Bottom-right of hero, overlapping map area | CRITICAL |
| Holographic platform | N/A | 3 concentric gold rings with upward light rays | CRITICAL |
| Figure outfit | N/A | Dark professional outfit with gold emblem/brooch | CRITICAL |
| Figure glow | N/A | Warm gold ambient glow around figure | CRITICAL |
| Integration with map | N/A | Figure overlaps the map section slightly | HIGH |

## 04_STORIES SECTION

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Card image height | h-52 (208px) | ~200px — matches | NONE |
| Card width | 300px | ~240-260px (slightly narrower) | MEDIUM |
| Card gap | gap-5 (20px) | ~16px (tighter) | LOW |
| Category tags | Correct colors | Same — matches | NONE |
| Star rating | Gold stars + number | Same — matches | NONE |
| Play button on cards | Gold circle on hover | Same — matches | NONE |
| Left/right arrows | Not present in cards | Navigation arrows (< >) visible | HIGH |
| Section title position | Left column | Same — matches | NONE |
| Card border radius | rounded-2xl (16px) | rounded-xl (~12px) | LOW |
| Stats row visible | Below stories | Same — matches | NONE |

## 05_LUXURY COLLECTION

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Background photography | Unsplash resort photo | Same style — matches | NONE |
| Overlay gradient | Present | Same — matches | NONE |
| Text position | Left-aligned, bottom | Same — matches | NONE |
| Partner logos | Text-based (FOUR SEASONS, AMAN, etc.) | Actual logo wordmarks in grayscale | HIGH |
| Partner logo style | Plain text | Stylized wordmarks (different fonts per brand) | HIGH |
| Partner scroll arrow | Not present | Arrow on right for horizontal scroll | MEDIUM |
| Section height | min-h-[420px] | ~350-400px | LOW |

## 06_MOBILE APP

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Phone position | Right side | Same — matches | NONE |
| Phone size | 280x580px | ~280x580px — matches | NONE |
| Zainab in phone | Not visible | Zainab avatar visible on right side of phone screen | HIGH |
| App content | Correct layout | Same — matches | NONE |
| Bottom nav | Emoji icons | SVG icons (Home, Explore, Bookmarks, Saved, Profile) | MEDIUM |
| Popular destinations | 3 cards with photos | Same — matches | NONE |
| Top experiences | 1 card | Same — matches | NONE |

## 07_STATS & TRUST

| Area | Current | Expected (Specification) | Severity |
|------|---------|--------------------------|----------|
| Stats icons | Gold background circles | Gold bordered circles (outlined, not filled) | HIGH |
| Stats numbers | Correct values | Same — matches | NONE |
| Local Eyes avatars | Using Unsplash portrait photos | Same — matches | NONE |
| Avatar size | w-16 h-16 (64px) | ~64px — matches | NONE |
| Payment logos | SVG text (VISA, MC, etc.) | Actual logo designs (VISA italic, MC circles, etc.) | HIGH |
| Trust item icons | Unique icons (ShieldCheck, CurrencyDollar, etc.) | Same approach — matches | NONE |
| Section layout | 5-column grid | Same — matches | NONE |

---

## SEVERITY SUMMARY

### CRITICAL (Must Fix — breaks visual identity)
1. **Zainab figure missing** — No large standalone AI concierge figure in hero
2. **Holographic rings missing** — No gold glowing platform beneath Zainab
3. **Map terrain abstract** — SVG outline vs real geographic terrain
4. **City markers abstract** — Gold dots vs circular photo previews

### HIGH (Significant visual difference)
5. Hero background overlays too heavy
6. AI widget position/size mismatch
7. Story carousel arrows missing
8. Partner logos are text, not wordmarks
9. Payment logos are text, not actual logos
10. Stats icons filled vs outlined
11. Phone mockup missing Zainab

### MEDIUM (Noticeable but minor)
12. Header has gradient background (should be transparent)
13. Category chips emoji vs SVG icons
14. Card width slightly too wide
15. Partner scroll arrow missing
16. Bottom nav emoji vs SVG icons

### LOW (Acceptable)
17. Card border radius 16px vs 12px
18. Card gap slightly wide
19. Section heights slightly off
20. Travel pill icons emoji vs SVG
