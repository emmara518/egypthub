# EGYPTHUB — PROJECT RECOVERY PLAN

> **Generated:** June 23, 2026  
> **Authority:** CTO / Principal Architect  
> **Source of Truth:** DESIGN_SYSTEM.md + VISUAL_REFERENCE_SPEC.md  
> **Status:** PHASE 0 COMPLETE — Ready for Execution

---

## Repository Map

### Project Structure

```
egypthub/
├── apps/web/                          # Next.js 14 Frontend (target)
│   ├── src/
│   │   ├── app/                       # Routes & pages (14 route groups)
│   │   │   ├── page.tsx               # Homepage (composes 15 components)
│   │   │   ├── layout.tsx             # Root layout (fonts, theme, header, footer)
│   │   │   ├── globals.css            # Design tokens + base styles
│   │   │   ├── (auth)/login,register
│   │   │   ├── (destinations)/, (experiences)/
│   │   │   ├── (booking)/, (profile)/
│   │   │   ├── screens/              # 8 screen demo pages
│   │   │   └── __tests__/            # Sprint tests
│   │   ├── components/               # 31 components (23 main + 8 screens)
│   │   ├── lib/mock-data.ts          # Mock data store
│   │   └── hooks/                    # (empty)
│   ├── public/
│   │   ├── images/
│   │   │   ├── businesses/           # 3 assets (2 SVGs + 1 JPG)
│   │   │   └── egypt/               # 6 PNG assets (pyramids, nile, etc.)
│   │   └── fonts/                   # (empty — using Google Fonts)
│   ├── tailwind.config.ts           # Tailwind configuration
│   ├── next.config.js               # Static export + base path
│   ├── package.json                 # Dependencies
│   └── tsconfig.json                # TypeScript config
├── docs/                            # Architecture & design docs
├── packages/                        # Shared packages
├── services/backend/                # NestJS backend
├── infra/                           # Infrastructure
├── .turbo/                          # Turborepo cache
└── (root files: *.jpg, page reports)
```

### Component Inventory (31 total)

| # | Component | Type | Status | Priority |
|---|-----------|------|--------|----------|
| 1 | Hero.tsx | Main | ❌ Rebuild needed | P0 |
| 2 | Header.tsx | Main | ❌ Rebuild needed | P0 |
| 3 | Footer.tsx | Main | ✅ Minor fixes | P2 |
| 4 | AboutSection.tsx | Main | ⚠️ Color migration | P1 |
| 5 | DestinationIntro.tsx | Main | ⚠️ Color migration | P1 |
| 6 | CityWheel.tsx | Main | ❌ Full rebuild | P0 |
| 7 | StatsBar.tsx | Main | ❌ Rebuild needed | P1 |
| 8 | CategoryGrid.tsx | Main | ⚠️ Color migration | P1 |
| 9 | HowItWorks.tsx | Main | ⚠️ Color migration | P2 |
| 10 | Testimonials.tsx | Main | ⚠️ Amiri font + colors | P1 |
| 11 | OfferSection.tsx | Main | ⚠️ Color migration | P2 |
| 12 | FeaturedBusinesses.tsx | Main | ⚠️ Color migration | P2 |
| 13 | FeaturedStories.tsx | Main | ⚠️ Color migration | P2 |
| 14 | LatestUpdates.tsx | Main | ⚠️ Color migration | P2 |
| 15 | PromotionalBanner.tsx | Main | ⚠️ Color migration | P2 |
| 16 | AIConciergeWidget.tsx | Main | ⚠️ Color migration | P2 |
| 17 | AIMapSection.tsx | Main | ⚠️ Placeholder map | P2 |
| 18 | DownloadApp.tsx | Main | ⚠️ Color migration | P2 |
| 19 | SandWave.tsx | Utility | ✅ OK | — |
| 20 | EgyptianIcons.tsx | Utility | ⚠️ Color fix | P1 |
| 21 | ThemeToggle.tsx | Utility | ✅ OK | — |
| 22 | ThemeProvider.tsx | Utility | ✅ OK | — |
| 23 | ParticlesBg.tsx | Utility | ✅ OK | — |
| 24-31 | Screen1-8.tsx | Screens | ❌ Full color migration | P2 |

### Route Map (14 route groups)

| Route | File | Status |
|-------|------|--------|
| `/` | `page.tsx` | ⚠️ Missing AboutSection |
| `/auth/login` | `auth/login/page.tsx` | ⚠️ Needs audit |
| `/auth/register` | `auth/register/page.tsx` | ⚠️ Needs audit |
| `/destinations` | `destinations/page.tsx` | ⚠️ Needs audit |
| `/destinations/[slug]` | `destinations/[slug]/page.tsx` | ⚠️ Needs audit |
| `/experiences` | `experiences/page.tsx` | ⚠️ Needs audit |
| `/experiences/[slug]` | `experiences/[slug]/page.tsx` | ⚠️ Needs audit |
| `/offers` | `offers/page.tsx` | ⚠️ Needs audit |
| `/booking` | `booking/page.tsx` | ⚠️ Needs audit |
| `/booking/checkout` | `booking/checkout/page.tsx` | ⚠️ Needs audit |
| `/booking/confirmation` | `booking/confirmation/page.tsx` | ⚠️ Needs audit |
| `/profile` | `profile/page.tsx` | ⚠️ Needs audit |
| `/favorites` | `favorites/page.tsx` | ⚠️ Needs audit |
| `/search` | `search/page.tsx` | ⚠️ Needs audit |
| `/stories` | `stories/page.tsx` | ⚠️ Needs audit |
| `/ai-concierge` | `ai-concierge/page.tsx` | ⚠️ Needs audit |

### Asset Inventory

| Location | Files | Status |
|----------|-------|--------|
| `public/images/businesses/` | 3 (2 SVGs, 1 JPG) | ⚠️ Needs rename |
| `public/images/egypt/` | 6 PNGs | ✅ Created |
| `public/images/destinations/` | 0 | ❌ Missing |
| `public/images/luxury/` | 0 | ❌ Missing |
| `public/images/ambassadors/` | 0 | ❌ Missing |
| Unsplash URLs in code | ~106 | ❌ Must replace |
| Pravatar URLs | ~15 | ❌ Must replace |

### Legacy Color Usage Scan Results

| Color | Components Affected |
|-------|-------------------|
| `#E9C46A` | AboutSection, Hero, DestinationIntro, Testimonials, EgyptianIcons, Screens 1-8 |
| `#0D3B66` | DestinationIntro |
| `#F4A261` | AboutSection, Hero |
| `#C8960C` | AboutSection, VISUAL_REFERENCE_SPEC |
| `#E76F51` | AboutSection |
| `#C8843A` | tailwind.config.ts, Header, DownloadApp |

---

## 10-Phase Execution Plan

```
Phase 0: Repository Discovery        ← YOU ARE HERE
Phase 1: Design System Reconstruction — globals.css + tailwind.config + tokens
Phase 2: Legacy Color Purge           — Remove all old colors from all files
Phase 3: Header Rebuild               — Arabic logo, mega menu, dropdown, auth
Phase 4: Hero Rebuild                 — Ken Burns, Typewriter, Oval shapes
Phase 5: CityWheel Reconstruction      — 3D carousel, drag, reflection
Phase 6: StatsBar Rebuild             — CountUp, gradient, glass cards
Phase 7: Asset Migration              — Remove Unsplash, add local
Phase 8: Performance Hardening         — Lazy loading, dynamic imports
Phase 9: QA Certification             — lint, typecheck, build, 0 errors
Phase 10: Release Readiness           — FINAL_RELEASE_REPORT.md
```

**Proceeding to PHASE 1 immediately.**
