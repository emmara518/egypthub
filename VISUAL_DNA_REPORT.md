# EGYPTHUB — VISUAL DNA REPORT

## Extracted from Reference Image (Single Source of Truth)

---

## 1. Layout System

| Property | Value |
|----------|-------|
| Max Width | 1440px (centered) |
| Hero Layout | Two-column: ~40% text / ~60% map |
| Left Sidebar | Fixed, ~60px width, numbered nav |
| Header | Fixed top, transparent → dark on scroll |
| Content Flow | Hero → Stories → Stats → Partners → Trust |

## 2. Grid System

| Context | Grid |
|---------|------|
| Hero | `grid-cols-[2fr_3fr]` (text left, map right) |
| Stories | Horizontal scroll, `flex` with `min-w-[280px]` cards |
| Stats | `grid-cols-5` (equal width) |
| Partners | `flex justify-center gap-12` |
| Trust Badges | `flex justify-between` |
| Benefits | `grid-cols-5` |
| AI Concierge | `grid-cols-[auto_1fr_auto]` (avatar | content | selectors) |

## 3. Spacing System

| Element | Value |
|---------|-------|
| Section Gap | 80px (py-20) |
| Card Gap | 24px (gap-6) |
| Inner Card Padding | 24px (p-6) |
| Header Height | 80px (h-20) |
| Sidebar Top Offset | 100px |
| Card Border Radius | 16px (rounded-2xl) |
| Small Border Radius | 12px (rounded-xl) |
| Pill Border Radius | 9999px (rounded-full) |

## 4. Typography Hierarchy

| Level | Font | Size | Weight | Color |
|-------|------|------|--------|-------|
| Hero H1 | Playfair Display | 56px (text-5xl) | 700 (bold) | White |
| Hero Gold Line | Playfair Display | 56px (text-5xl) | 700 (bold) | Gold (#D4A24C) |
| Hero Subtitle | Inter/Poppins | 18px (text-lg) | 400 | White/70 |
| Section Title | Playfair Display | 32px (text-3xl) | 700 | White |
| Card Title | Inter/Poppins | 16px (text-base) | 600 | White |
| Card Description | Inter/Poppins | 14px (text-sm) | 400 | White/60 |
| Stat Number | Inter/Poppins | 36px (text-4xl) | 700 | White |
| Stat Label | Inter/Poppins | 12px (text-xs) | 400 | White/50 |
| Nav Item | Inter/Poppins | 14px (text-sm) | 500 | White/80 |
| Badge/Tag | Inter/Poppins | 10px (text-[10px]) | 700 | Gold bg/10 text-gold |

## 5. Shadow System

| Type | Value |
|------|-------|
| Card Shadow | `0 4px 24px rgba(0,0,0,0.3)` |
| Gold Glow | `0 0 30px rgba(212,162,76,0.15)` |
| Map Marker Glow | `0 0 12px rgba(212,162,76,0.6)` |
| AI Avatar Glow | `0 0 40px rgba(212,162,76,0.3)` |
| Floating Card | `0 8px 32px rgba(0,0,0,0.4)` |

## 6. Border System

| Element | Border |
|---------|--------|
| Card Default | `1px solid rgba(255,255,255,0.06)` |
| Card Hover | `1px solid rgba(212,162,76,0.2)` |
| Sidebar Active | `2px solid #D4A24C` (left border) |
| Input Field | `1px solid rgba(255,255,255,0.1)` |
| Pill/Chip | `1px solid rgba(255,255,255,0.08)` |

## 7. Card System

| Type | Properties |
|------|------------|
| Destination Card | 280×360px, rounded-2xl, image top (60%), content bottom (40%), gradient overlay |
| Story Card | 280×320px, rounded-2xl, image top (55%), category tag top-left, content bottom |
| Floating Map Card | 240×160px, rounded-xl, glass-dark, image left, content right |
| Stat Card | 200×100px, rounded-xl, icon top, number middle, label bottom |
| AI Widget | Full-width, rounded-2xl, glass-dark, avatar left, content center, selectors right |

## 8. Navigation System

| Element | Properties |
|---------|------------|
| Header Nav | Horizontal, English labels, 14px, 500 weight |
| Left Sidebar | Vertical, numbered (01-05), Arabic labels, 12px, connected by line |
| Mobile Nav | Bottom tab bar, 5 items, icons + labels |
| Category Chips | Horizontal scroll, pill-shaped, active=gold bg |

## 9. Map System

| Property | Value |
|----------|-------|
| Background | Dark navy with subtle terrain |
| City Markers | Gold circles with glow, rating text |
| Hover Card | Glass-dark, image + info, positioned near marker |
| Filter Chips | Top-right, horizontal scroll, pill-shaped |
| Map占位 | ~60% of hero width |

## 10. AI Concierge System

| Property | Value |
|----------|-------|
| Position | Bottom-left of hero section |
| Avatar | Circular, gold gradient border, glow effect |
| Content | "AI TRAVEL CONCERCE" label, question, category pills |
| Selectors | Destination dropdown, Time dropdown, Travelers count |
| Style | Glass-dark card with gold accents |

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | #080C18 | Main background |
| Surface | #0F1525 | Card backgrounds |
| Card | #141C2E | Elevated surfaces |
| Border | rgba(255,255,255,0.06) | Default borders |
| Gold | #D4A24C | Primary accent |
| Gold Light | #E9C46A | Hover states |
| Gold Dark | #B88D2F | Active states |
| Text Primary | #FFFFFF | Headings |
| Text Secondary | rgba(255,255,255,0.7) | Body text |
| Text Muted | rgba(255,255,255,0.5) | Labels |
