# SECTION FORENSICS ANALYSIS

Pixel-level analysis of every approved design specification image.

---

## 01_Hero.png — HERO SECTION

### Layout
- **Split ratio**: ~42% left text / ~58% right visual (Zainab + background photography)
- **Height**: Full viewport (~90vh)
- **Background**: Full-bleed cinematic photography — Pyramids of Giza at sunset, warm golden hour, felucca boat on Nile, atmospheric haze
- **Background treatment**: Dark gradient overlay from left (heavier) to right (lighter), preserving photography visibility on right side

### Header
- **Height**: ~60px
- **Logo**: "EGYPTHUB" bold + "YOUR STORY IN EGYPT" subtitle, gold pyramid icon left
- **Nav items**: Explore, Destinations, Experiences, Stories, Luxury Collection, For Partners
- **Right utilities**: Search icon, Globe + "EN", User avatar circle, "AI Concierge ✨" button with gold border
- **Background**: Transparent, no blur visible

### Left Panel — Text Content
- **Position**: Left-aligned, vertically centered (~40% from top)
- **Left padding**: ~60-80px from viewport edge
- **Headline**: "Egypt is not just a destination." — White, serif font (Playfair Display), ~56-64px, bold
- **Gold line**: "It's a story waiting to be yours." — Gold (#D4A24C), italic serif, same size, distinct from white text
- **Subtitle**: "Discover Egypt through authentic experiences and local connections." — White/60% opacity, ~16px, regular weight, max-width ~380px
- **CTA**: Play button circle (outlined, white border) + "Watch Egypt Come Alive" text — positioned below subtitle

### Right Panel — Zainab AI Figure
- **Position**: Bottom-right quadrant, overlapping hero background
- **Figure**: Woman in dark professional outfit with gold emblem/brooch on left chest
- **Pose**: Standing, facing slightly left, confident posture
- **Holographic platform**: Gold glowing concentric rings beneath her feet — 3 rings with light rays emanating upward
- **Glow effect**: Warm gold ambient glow around figure, especially around the holographic rings
- **Size**: Figure occupies ~35% of right panel height

### AI Concierge Widget (Bottom-Left)
- **Position**: Bottom-left, below the hero text, overlapping the background
- **Container**: Dark glass card with subtle border, rounded corners (~16px)
- **Label**: "AI TRAVEL CONCIERGE" — gold, uppercase, small tracking
- **Heading**: "What brings you to Egypt?" — white, serif, ~20px
- **Subtitle**: "We'll craft your perfect journey" — white/50%, ~13px
- **Travel pills**: 6 items in a row — Relaxation, Adventure, Culture & History, Food & Flavors, Luxury Escape, Digital Nomad — each with icon + label, rounded-full, border
- **Selectors row**: "Any Destination" (location pin), "Any Time" (calendar), "2 Travelers" (person) — each in bordered pill
- **Submit**: Gold circle button with arrow →
- **No visible Zainab portrait inside the widget** — Zainab is the large figure on the right

---

## 02_Interactive_Map.png — MAP SECTION

### Layout
- **Section label**: "EXPLORE EGYPT" — gold, uppercase, small tracking, top-left
- **Heading**: "Interactive Map" — white, serif, ~36-40px
- **Subtitle**: "Hover, explore and discover the real Egypt" — white/50%, ~14px

### Map
- **Dimensions**: Full width of right panel (~55-60% of section)
- **Background**: Dark navy with visible Egypt terrain — shows actual geographic features (Nile delta, Sinai peninsula, Red Sea coast)
- **Terrain style**: Dark satellite/terrain hybrid, subtle topographic detail visible
- **Nile River**: Visible as a glowing gold line running north-south
- **Red Sea**: Labeled "Red Sea" in white italic text

### City Markers
- **Style**: Circular markers with destination photo inside, gold ring border
- **Size**: ~40-48px diameter
- **Cities visible**:
  - Alexandria: 4.6 rating, top-left of map
  - Cairo: 4.8 rating, center-right
  - Siwa: 4.7 rating, center-left
  - Luxor: 4.9 rating, center
  - Aswan: 4.9 rating, bottom-center
  - Dahab: 4.8 rating, right (Sinai)
- **Rating display**: Gold star + rating number next to each marker
- **Hover state**: Shows city name label above marker

### Floating Destination Card (Dahab)
- **Position**: Left side of map, overlapping
- **Width**: ~280px
- **Content**:
  - Photo thumbnail (left, ~80x80px, rounded)
  - "Dahab" — bold, white, ~16px
  - "South Sinai" — white/50%, ~11px
  - Star 4.9 (1.2K) — gold star + rating + review count
  - Description: "A peaceful town for diving, adventure and soul seekers."
  - "Explore Dahab →" — gold CTA
- **Style**: Dark glass card, rounded-xl, border

### Category Chips (Right Side)
- **Position**: Right edge, vertical stack
- **Items**: All (active, gold), Beaches, History, Adventure, Cities, Desert, Oasis, Islands
- **Style**: Rounded pills, icon + label, active = gold background

### Live in Egypt Strip (Bottom)
- **Label**: "LIVE IN EGYPT NOW" — gold, uppercase
- **Items**: Cairo (sun icon, 34° Sunny), Dahab (waves, Perfect diving), 124 (travelers exploring Luxor), Abu Simbel (sound & light, Tonight)
- **Style**: Horizontal strip, icons + text

---

## 03_AI_Concierge.png — AI CONCIERGE DETAIL

### Zainab Figure
- **Full view**: Woman standing, dark outfit, gold emblem
- **Holographic rings**: 3 concentric gold rings, glowing, with light particles
- **Position**: Bottom-right, overlapping map and other sections
- **Size**: ~200px tall in this crop
- **Background integration**: Figure blends with the dark map background

### Partial Sections Visible
- Right side shows partial views of:
  - Floating destination card (top-right)
  - "LIVE IN EGYPT NOW" strip
  - "Egypt Signature Collection" heading starting
  - Story cards at bottom (ADVENTURE, FOOD tags visible)

---

## 04_Stories.png — STORIES SECTION

### Layout
- **Section**: Full width, dark background
- **Card row**: Horizontal scroll, 5 cards visible

### Story Cards
- **Width**: ~240-260px each
- **Height**: ~320-340px total
- **Image area**: Top ~60% (~200px) — full-bleed photography with gradient overlay at bottom
- **Content area**: Bottom ~40% (~120px) — dark background

### Individual Card Anatomy
- **Category tag**: Top-left of image, pill-shaped badge
  - EXPERIENCE: blue tint
  - CULTURE: purple tint
  - LUXURY: gold tint
  - ADVENTURE: green tint
  - FOOD: orange tint
- **Title**: White, bold, ~14-16px, positioned below image
- **Description**: White/50%, ~11-12px, 2 lines max
- **Rating row**: Gold star + rating number (4.9, 4.8, etc.) — bottom of card
- **Play button**: Gold circle with play icon, positioned at bottom-right of image area (on hover?)
- **Card style**: Rounded-xl, dark background (#0F1525), subtle border
- **Navigation**: Left arrow (<) and right arrow (>) for carousel

### Stats Row (Bottom of Section)
- **Visible**: 80+ Destinations, 15K+ Happy Travelers, 4.9 Average Rating, 24/7 Concierge Support
- **Style**: Circular gold-bordered icons with stats below

---

## 05_Luxury_Collection.png — LUXURY + PARTNERS + MOBILE

### Live in Egypt Strip (Top)
- **4 items**: Cairo 34° Sunny, Dahab Perfect diving, 124 Travelers exploring Luxor, Abu Simbel Sound & Light Show Tonight
- **Icons**: Sun, waves, hot air balloon, temple
- **Style**: Horizontal, evenly spaced

### Egypt Signature Collection
- **Container**: Full-width card with background photography
- **Background**: Luxury resort at sunset — pool, palm trees, warm lighting
- **Heading**: "Egypt Signature Collection" — white, serif, ~32-36px
- **Subtitle**: "Handpicked luxury experiences crafted for unforgettable moments." — white/70%, ~14px
- **CTA**: "View Collection →" — gold, underlined or plain text
- **Overlay**: Dark gradient from bottom for text readability

### Partner Logos Row
- **Label**: None visible (just logos)
- **Logos**: Four Seasons, AMAN, KEMPINSKI, STEIGENBERGER, Jaz
- **Treatment**: White/gray monochrome, consistent height ~30px
- **Style**: Horizontal row, evenly spaced, with scroll arrow on right

### Mobile Phone Mockup (Right Side)
- **Position**: Right side, overlapping content
- **Device**: iPhone-style, dark bezel
- **Screen content**: EgyptHub app with Zainab avatar visible

---

## 06_Mobile_App.png — MOBILE APP DETAIL

### Phone Mockup
- **Size**: ~280px wide, ~580px tall
- **Bezel**: Dark, rounded corners (~40px radius)
- **Notch**: Top center

### App Screen Content
- **Header**: EGYPTHUB logo + hamburger menu + notification bell
- **Greeting**: "Hello, Ahmed 👋" — white/50%, ~10px
- **Heading**: "Where do you want to explore today?" — white, bold, ~14px
- **Search bar**: Rounded, dark, placeholder text
- **Quick actions**: Relaxation, Adventure, Culture, Food, Luxury — small pills
- **Popular Destinations**: "See All" link, 3 cards (Cairo 4.8, Luxor 4.9, Dahab 4.8) with photos
- **Top Experiences**: "See All" link, Diving in the Red Sea card (From $60, 4.9, 920 reviews)
- **Bottom nav**: Home, Explore, Bookmarks, Saved, Profile — icons + labels
- **Zainab avatar**: Visible on right side of screen, partially cut off

---

## 07_Stats_Trust.png — STATS + LOCAL EYES + TRUST

### Stats Row
- **5 items**: 500+ Unique Experiences, 80+ Destinations, 15K+ Happy Travelers, 4.9 Average Rating, 24/7 Concierge Support
- **Icon style**: Circular, gold border (~2px), gold icon inside, ~48px diameter
- **Number**: White, bold, ~28-32px
- **Label**: White/50%, ~11px
- **Layout**: 5 equal columns, horizontal

### Egypt Through Local Eyes
- **Heading**: "Egypt Through Local Eyes" — white, serif, ~28-32px
- **Subtitle**: "See Egypt like never before" — white/50%, ~13px
- **Avatars**: 4 circular portraits
  - Omar (Cairo) — male, dark hair
  - Nour (Alexandria) — female, dark hair
  - Youssef (Luxor) — male, beard
  - Mai (Dahab) — female, dark hair
- **Avatar size**: ~64px diameter
- **Avatar style**: Gold border, circular
- **Name**: White, bold, ~12px
- **City**: White/40%, ~10px
- **Play button**: Circle with play icon + "2:45" duration

### Trust Badges
- **Label**: "Trusted by the best" — white/40%, left-aligned
- **Payment logos**: VISA, Mastercard (two overlapping circles), AMEX, Booking.com, Expedia, Google
- **Logo style**: Monochrome white, subtle, ~24-30px height
- **Layout**: Horizontal row, evenly spaced

### Trust Items
- **5 items**: Secure Booking, Best Price Guarantee, Verified & Trusted, 24/7 Concierge, Flexible Cancellation
- **Icon style**: Circular, gold icon, ~36px
- **Title**: White, bold, ~12px
- **Description**: White/40%, ~10px
- **Layout**: 5 columns, below payment logos

### Phone Mockup (Right)
- **Shows**: Top Experiences section with "Diving in the Red Sea" card
- **Bottom nav visible**: Home, Explore, Bookmarks, Saved, Profile
