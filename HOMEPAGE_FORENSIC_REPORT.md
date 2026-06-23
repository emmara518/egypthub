# EGYPTHUB — HOMEPAGE FORENSIC ANALYSIS

## Reference Image Measurements

---

## HEADER

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Height | 80px | 80px (h-20) | ✅ Match |
| Background | Transparent → dark on scroll | Transparent → bg-theme-gold/10 | ⚠️ Close |
| Logo | Gold triangle + "EGYPTHUB" + "YOUR STORY IN EGYPT" | Gold pyramid + "مصر هب" + "EGYPT HUB" | ❌ Mismatch |
| Nav Items | English: Explore, Destinations, Experiences, Stories, Luxury Collection, For Partners | Arabic: الرئيسية, اكتشف, الوجهات, تجارب, قصص, تواصل | ❌ Mismatch |
| Search | Globe icon + Search icon | Not visible | ❌ Missing |
| Language | "EN" with globe | Not present | ❌ Missing |
| Avatar | Circular user avatar | Not present | ❌ Missing |
| AI Button | "AI Concierge" with sparkle icon, gold border | Not present | ❌ Missing |

## LEFT NAVIGATION SIDEBAR

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Width | ~60px | N/A | ❌ Missing |
| Position | Fixed left, full height | N/A | ❌ Missing |
| Items | 01 Home, 02 Map, 03 Stories, 04 Experiences, 05 Concierge | N/A | ❌ Missing |
| Typography | 12px, English numbers, Arabic labels | N/A | ❌ Missing |
| Active State | Gold left border, white text | N/A | ❌ Missing |
| Connecting Line | Vertical line between items | N/A | ❌ Missing |
| Scroll Indicator | Bottom, "Scroll to explore" | N/A | ❌ Missing |

## HERO SECTION

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Layout | Two-column: 40% text / 60% map | Full-width slideshow | ❌ Mismatch |
| Height | ~90vh | h-screen min-h-[750px] max-h-[920px] | ⚠️ Close |
| Background | Static pyramids image | Ken Burns slideshow | ❌ Mismatch |
| Left Panel Width | ~40% | flex-1 lg:max-w-xl | ⚠️ Close |
| H1 Text | "Egypt is not just a destination." | Arabic text with typewriter | ❌ Mismatch |
| Gold Line | "It's a story waiting to be yours." | Arabic equivalent | ⚠️ Close |
| Subtitle | "Discover Egypt through authentic experiences and local connections." | Arabic | ⚠️ Close |
| CTA | Play button "Watch Egypt Come Alive" | Not present | ❌ Missing |

## INTERACTIVE MAP

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Width | ~60% of hero | Separate CityWheel component | ❌ Mismatch |
| City Markers | Gold circles with glow + rating | SVG markers | ⚠️ Close |
| Floating Card | "Dahab" with rating, description, "Explore Dahab →" | Not present | ❌ Missing |
| Filter Chips | Top-right: All, Beaches, History, Adventure, Cities, Desert, Oasis, Islands | Not present | ❌ Missing |
| Map Style | Dark with terrain, atmospheric | SVG with nodes | ⚠️ Close |

## AI CONCERCE WIDGET

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Position | Bottom-left of hero | Separate section below hero | ❌ Mismatch |
| Label | "AI TRAVEL CONCERCE" | "المساعد الذكي زينب" | ❌ Mismatch |
| Question | "What brings you to Egypt?" | Different Arabic text | ⚠️ Close |
| Category Pills | Relaxation, Adventure, Culture & History, Food & Flavors, Luxury Escape, Digital Nomad | Not present | ❌ Missing |
| Selectors | Any Destination, Any Time, 2 Travelers | Not present | ❌ Missing |
| Avatar | Circular, gold glow, positioned right | Circular gold, positioned left | ❌ Mismatch |

## STORIES SECTION

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Title | "Stories waiting to happen" | N/A | ❌ Missing |
| Subtitle | "Real stories. Real people. Real Egypt." | N/A | ❌ Missing |
| CTA | "Explore All Stories →" | N/A | ❌ Missing |
| Cards | Horizontal scroll, 5 visible | N/A | ❌ Missing |
| Card Style | Image + category tag + title + description + rating + play | N/A | ❌ Missing |

## LIVE IN EGYPT NOW

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Title | "LIVE IN EGYPT NOW" | N/A | ❌ Missing |
| Items | Cairo 34° Sunny, Dahab diving, 124 travelers, Abu Simbel event | N/A | ❌ Missing |
| Style | Horizontal strip, icons + text | N/A | ❌ Missing |

## EGYPT SIGNATURE COLLECTION

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Title | "Egypt Signature Collection" | N/A | ❌ Missing |
| Subtitle | "Handpicked luxury experiences crafted for unforgettable moments." | N/A | ❌ Missing |
| CTA | "View Collection →" | N/A | ❌ Missing |

## STATS ROW

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Layout | 5 equal columns | StatsBar component | ⚠️ Close |
| Items | 500+ Unique Experiences, 80+ Destinations, 15K+ Happy Travelers, 4.9 Average Rating, 24/7 Concierge Support | Different items | ❌ Mismatch |
| Icon Style | Gold circular with icon | Different styling | ⚠️ Close |
| Typography | Large number + label below | Different | ⚠️ Close |

## EGYPT THROUGH LOCAL EYES

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Title | "Egypt Through Local Eyes" | N/A | ❌ Missing |
| Subtitle | "See Egypt like never before" | N/A | ❌ Missing |
| Avatars | Circular portraits: Omar Cairo, Nour Alexandria, Youssef Luxor, Mai Dahab | N/A | ❌ Missing |
| Video | Play button with "2:45" | N/A | ❌ Missing |

## PARTNER LOGOS

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Title | "Trusted by the best" | N/A | ❌ Missing |
| Logos | Four Seasons, Aman, Kempinski, Steigenberger, Jaz | FeaturedBusinesses component | ⚠️ Close |
| Style | Horizontal row, equal spacing | Different layout | ⚠️ Close |

## TRUST BADGES

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Logos | VISA, Mastercard, American Express, Booking.com, Expedia, Google | Not present | ❌ Missing |

## BENEFITS ROW

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Items | Secure Booking, Best Price Guarantee, Verified & Trusted, 24/7 Concierge, Flexible Cancellation | Not present | ❌ Missing |
| Style | 5 columns, icon + title + description | N/A | ❌ Missing |

## MOBILE PREVIEW

| Property | Reference | Current | Status |
|----------|-----------|---------|--------|
| Phone Mockup | Right side of page, showing app | Not present | ❌ Missing |
| Content | "Hello, Ahmed", search, destinations, experiences | N/A | ❌ Missing |

---

## SUMMARY

| Category | Match Rate |
|----------|------------|
| Header | 20% |
| Left Navigation | 0% |
| Hero Layout | 30% |
| Map | 25% |
| AI Concierge | 15% |
| Stories | 0% |
| Stats | 40% |
| Partners | 50% |
| Overall | **~15%** |

## CRITICAL GAPS

1. **Left sidebar navigation** — completely missing
2. **Two-column hero layout** — currently full-width stacked
3. **Interactive map in hero** — separate component
4. **AI concierge widget** — wrong position and styling
5. **Stories section** — completely missing
6. **Live in Egypt strip** — completely missing
7. **Egypt Signature Collection** — completely missing
8. **Local Eyes section** — completely missing
9. **Trust badges** — completely missing
10. **Benefits row** — completely missing
11. **Mobile preview** — completely missing
12. **Header nav items** — wrong language, missing elements
