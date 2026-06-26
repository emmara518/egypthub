# EgyptHub Design System Audit

## Design Tokens

### Colors (CSS Custom Properties)
| Token | Hex Value | RGB Value | Usage |
|---|---|---|---|
| `--gold` | #D4A24C | 212, 162, 76 | Primary accent |
| `--gold-light` | #E8C97A | 232, 201, 122 | Gold highlight |
| `--gold-dark` | #B8862D | 184, 134, 45 | Gold pressed state |
| `--bg` | #0A0E17 | 10, 14, 23 | Page background |
| `--bg-secondary` | #111827 | 17, 24, 39 | Secondary background |
| `--surface` | #0F1420 | 15, 20, 32 | Card surfaces |
| `--surface-elevated` | #141B2D | 20, 27, 45 | Elevated cards |
| `--surface-hover` | #1A2235 | 26, 34, 53 | Hover states |
| `--border` | #1E2A3D | 30, 42, 61 | Borders |
| `--border-light` | #2A3A52 | - | Lighter borders |
| `--text` | #FFFFFF | 255, 255, 255 | Primary text (white) |
| `--text-primary` | #F5F7FA | 245, 247, 250 | Primary text |
| `--text-secondary` | rgba(255,255,255,0.75) | - | Secondary text |
| `--text-muted` | #5A6478 | - | Muted text |
| `--text-gold` | var(--gold) | - | Gold text |
| `--text-inverse` | #0A0E17 | - | Inverse text |
| `--success` | #10B981 | 16, 185, 129 | Success states |
| `--error` | #EF4444 | 239, 68, 68 | Error states |
| `--warning` | #F59E0B | - | Warning states |
| `--info` | #3B82F6 | - | Info states |
| `--teal` | #0E8F94 | - | Teal accent |
| `--cyan` | #41BEDC | - | Cyan accent |
| `--coral` | #F4A261 | 244, 162, 97 | Coral accent |
| `--purple` | #8B5CF6 | - | Purple accent |
| `--pink` | #EC4899 | - | Pink accent |
| `--orange` | #F97316 | - | Orange accent |

### Typography Scale (Mobile-First)
| Token | Size (clamped) | Line Height | Font Family | Usage |
|---|---|---|---|---|
| `--text-xs` | clamp(0.75rem, 1.5vw, 0.875rem) | - | Cairo | Captions |
| `--text-sm` | clamp(0.875rem, 2vw, 1rem) | - | Cairo | Small body |
| `--text-base` | 1rem | 1.6 | Cairo | Body |
| `--text-lg` | clamp(1.125rem, 2.5vw, 1.25rem) | - | Cairo | Large body |
| `--text-xl` | clamp(1.25rem, 3vw, 1.5rem) | - | Playfair | Subheadings |
| `--text-2xl` | clamp(1.5rem, 3.5vw, 2rem) | - | Playfair | Section headings |
| `--text-3xl` | clamp(1.75rem, 4vw, 2.5rem) | 1.15 | Playfair | Section titles |
| `--text-4xl` | clamp(2rem, 4.5vw, 3rem) | - | Playfair | Large titles |
| `--text-5xl` | clamp(2.5rem, 5.5vw, 3.75rem) | 1.06 | Playfair | Hero |
| `--text-6xl` | clamp(2.5rem, 6vw, 4.5rem) | - | Playfair | Display |

### Design Token Package (variables.css) - Extended Scale
| Token Category | Values |
|---|---|
| **Font Families** | `--font-cairo` (Cairo), `--font-poppins` (Poppins), `--font-playfair` (Playfair Display), `--font-amiri` (Amiri) |
| **Font Sizes** | display-lg (4rem), display-md (3rem), display-sm (2.25rem), heading-lg (1.875rem), heading-md (1.5rem), heading-sm (1.25rem), body-lg (1.125rem), body-md (1rem), body-sm (0.875rem), caption (0.75rem), overline (0.6875rem), stat-lg (3rem), stat-md (2rem), stat-sm (1.5rem) |
| **Line Heights** | display (1.1-1.2), heading (1.3-1.4), body (1.5-1.6), caption (1.4), overline (1.3) |
| **Letter Spacing** | display-lg (-0.02em), display-md (-0.01em), caption (0.01em), overline (0.15em) |

### Spacing Scale
| Token | Value |
|---|---|
| `--space-0` | 0px |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-14` | 56px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

### Border Radius
| Token | Value | Token | Value |
|---|---|---|---|
| `--radius-xs` | 4px | `--radius-sm` | 8px |
| `--radius-md` | 12px | `--radius-lg` | 16px |
| `--radius-xl` | 20px | `--radius-2xl` | 24px |
| `--radius-3xl` | 32px | `--radius-full` | 9999px |

### Shadows
| Token | Value |
|---|---|
| `--shadow-sm` | 0 1px 3px rgba(0, 0, 0, 0.3) |
| `--shadow-md` | 0 4px 12px rgba(0, 0, 0, 0.4) |
| `--shadow-lg` | 0 8px 24px rgba(0, 0, 0, 0.5) |
| `--shadow-xl` | 0 16px 48px rgba(0, 0, 0, 0.6) |
| `--shadow-gold` | 0 4px 14px rgba(212, 162, 76, 0.25) |
| `--shadow-gold-lg` | 0 8px 32px rgba(212, 162, 76, 0.3) |
| `--shadow-gold-glow` | 0 0 20px rgba(212, 162, 76, 0.15) |
| `--shadow-inner` | inset 0 2px 4px rgba(0, 0, 0, 0.3) |
| `--shadow-inner-gold` | inset 0 0 0 2px rgba(212, 162, 76, 0.3) |

### Gradients
| Token | Value |
|---|---|
| `--gradient-gold` | linear-gradient(135deg, #D4A24C 0%, #E8C97A 100%) |
| `--gradient-navy` | linear-gradient(180deg, #0A0E17 0%, #0D1220 100%) |
| `--gradient-surface` | linear-gradient(135deg, #141B2D 0%, #0F1420 100%) |
| `--gradient-overlay` | linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(10,14,23,0.95) 100%) |

### Z-Index Scale
`--z-behind: -1`, `--z-base: 0`, `--z-dropdown: 1000`, `--z-sticky: 1020`, `--z-fixed: 1030`, `--z-overlay: 1040`, `--z-modal: 1050`, `--z-popover: 1060`, `--z-tooltip: 1070`, `--z-toast: 1080`, `--z-max: 9999`

### Transitions
`--transition-fast: 150ms ease-in-out`, `--transition-base: 250ms ease-in-out`, `--transition-slow: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Tailwind Theme Extensions (tailwind.config.ts)

### Custom Colors
| Key | Tailwind Class | Value |
|---|---|---|
| primary-500 | `bg-primary-500` | rgb(var(--gold-rgb) / <alpha-value>) |
| primary-300 | `bg-primary-300` | rgb(var(--gold-rgb) / 0.12) |
| dark-900 | `bg-dark-900` | rgb(var(--bg-rgb) / <alpha-value>) |
| dark-800 | `bg-dark-800` | rgb(var(--surface-rgb) / <alpha-value>) |
| dark-700 | `bg-dark-700` | rgb(var(--surface-elevated-rgb) / <alpha-value>) |
| accent-orange | `bg-accent-orange` | rgb(var(--coral-rgb) / <alpha-value>) |
| accent-amber | `bg-accent-amber` | #D4A24C |
| accent-teal | `bg-accent-teal` | #0E8F94 |
| neutral-100 | `bg-neutral-100` | rgb(var(--text-rgb) / <alpha-value>) |
| neutral-500 | `bg-neutral-500` | rgb(var(--text-secondary-rgb) / <alpha-value>) |
| neutral-800 | `bg-neutral-800` | rgb(var(--border-rgb) / <alpha-value>) |
| theme-bg | `bg-theme-bg` | rgb(var(--bg-rgb) / <alpha-value>) |
| theme-surface | `bg-theme-surface` | rgb(var(--surface-rgb) / <alpha-value>) |
| theme-card | `bg-theme-card` | rgb(var(--surface-elevated-rgb) / <alpha-value>) |
| theme-elevated | `bg-theme-elevated` | rgb(var(--surface-elevated-rgb) / <alpha-value>) |
| theme-border | `border-theme-border` | rgb(var(--border-rgb) / <alpha-value>) |
| theme-hover | `bg-theme-hover` | rgb(var(--surface-hover-rgb) / <alpha-value>) |
| theme-text | `text-theme-text` | rgb(var(--text-primary-rgb) / <alpha-value>) |
| theme-secondary | `text-theme-secondary` | rgb(var(--text-secondary-rgb) / <alpha-value>) |
| theme-muted | `text-theme-muted` | #5A6478 |
| theme-gold | `text-theme-gold` | rgb(var(--gold-rgb) / <alpha-value>) |
| theme-teal | `text-theme-teal` | #0E8F94 |
| theme-coral | `text-theme-coral` | rgb(var(--coral-rgb) / <alpha-value>) |

### Custom Font Families
| Class | Font Stack |
|---|---|
| `font-playfair` | 'Playfair Display', serif |
| `font-cairo` | 'Cairo', sans-serif |
| `font-poppins` | 'Poppins', sans-serif |
| `font-amiri` | 'Amiri', serif |
| `font-arabic` | 'Cairo', sans-serif |
| `font-english` | 'Poppins', sans-serif |
| `font-display` | 'Playfair Display', serif |
| `font-body` | 'Poppins', sans-serif |

### Custom Border Radius
| Class | Value | CSS Token |
|---|---|---|
| `rounded-xs` | 4px | `--radius-xs` |
| `rounded-sm` | 8px | `--radius-sm` |
| `rounded-md` | 12px | `--radius-md` |
| `rounded-lg` | 16px | `--radius-lg` |
| `rounded-xl` | 24px | `--radius-xl` |
| `rounded-2xl` | 32px | `--radius-3xl` |

### Custom Box Shadows
| Class | Value |
|---|---|
| `shadow-gold-border` | 0 0 0 1px rgba(212, 162, 76, 0.25) |
| `shadow-gold-glow` | 0 0 20px rgba(212, 162, 76, 0.3) |
| `shadow-gold-glow-lg` | 0 0 40px rgba(212, 162, 76, 0.2) |
| `shadow-elevation` | 0 4px 16px rgba(0, 0, 0, 0.4) |
| `shadow-elevation-lg` | 0 8px 32px rgba(0, 0, 0, 0.5) |

### Custom Background Images
| Class | Value |
|---|---|
| `bg-gradient-gold` | linear-gradient(135deg, #D4A24C 0%, #E8C97A 100%) |
| `bg-gradient-gold-reverse` | linear-gradient(135deg, #E8C97A 0%, #D4A24C 100%) |
| `bg-gradient-navy` | linear-gradient(180deg, #0A0E17 0%, #111827 100%) |
| `bg-gradient-surface` | linear-gradient(135deg, #141B2D 0%, #0F1420 100%) |
| `bg-gradient-overlay` | linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(10,14,23,0.95) 100%) |
| `bg-glow-gold` | radial-gradient(circle, rgba(212, 162, 76, 0.3) 0%, transparent 70%) |
| `bg-glow-gold-intense` | radial-gradient(circle, rgba(212, 162, 76, 0.5) 0%, transparent 60%) |

### Custom Animations
| Name | Keyframes | Duration |
|---|---|---|
| `animate-glow-pulse` | box-shadow gold pulse | 2s ease-in-out infinite |
| `animate-float` | translateY -8px | 4s ease-in-out infinite |
| `animate-ken-burns` | scale(1.1) to scale(1) + opacity | 1.4s ease-out forwards |
| `animate-typewriter-cursor` | opacity blink | 1s step-end infinite |

### Custom Transitions
| Class | Value |
|---|---|
| `duration-200` | 200ms |
| `duration-350` | 350ms |
| `duration-500` | 500ms |
| `ease-out-expo` | cubic-bezier(0.32, 1, 0.36, 1) |

---

## Pages Audit

| Page | Spacing Convention | Colors Compliance | Fonts | Cards | Buttons | Loading State | Rating Component |
|---|---|---|---|---|---|---|---|
| **Homepage** (`/`) | Uses `section-fade-in` wrappers | **Theme** - All CSS vars | Yes | Yes | Yes (gold-btn) | Yes (dynamic imports) | Yes |
| **Explore** (`/explore`) | Inline padding | **Theme** - Minor hardcoded SVG stroke | Yes | Yes | Yes | Yes (Skeleton) | Yes |
| **Experiences** (`/experiences`) | `py-24 bg-theme-bg` | **Theme + some hardcoded** | Yes | Yes | Yes | Yes (Skeleton) | Yes |
| **Stories** (`/stories`) | `py-16`, `py-20` | **Theme** | Yes | Yes | Yes | Yes (Skeleton) | Yes |
| **Loyalty** (`/loyalty`) | `pt-28 pb-16` (custom) | **Theme** - 1 inline gold gradient | Yes | Yes | Yes | Yes (Skeleton) | Yes |
| **Portal** (`/portal`) | Inline padding | **Hardcoded** - #D4A24C, #0F1525, #141B2D | Yes | Yes | Yes | None | No |
| **Profile** (`/profile`) | `py-8` | **Mixed** - 26 hardcoded hex values | Yes | Yes | Yes | None | No |
| **Favorites** (`/favorites`) | `py-8` | **Hardcoded** - 27 hex values (#D4A24C, #0F1525, #EF4444) | Yes | Yes | Yes | None | No |
| **Search** (`/search`) | `py-8` | **Hardcoded** - 25 hex + inline rgba shadows | Yes | Yes | Yes | Suspense + spinner | No |
| **AI Concierge** (`/ai-concierge`) | Inline padding | **Theme** - 1 inline shadow | Yes | Yes | Yes | None | Yes |
| **Login** (`/auth/login`) | `py-12` centered | **Theme** - Uses bg-theme-* classes | Yes | Yes | Yes | Button loading | Yes |
| **Register** (`/auth/register`) | `py-12` centered | **Hardcoded** - 20 hex values (#D4A24C, #0F1525, etc.) | Yes | Yes | Yes | Button loading | No |
| **Booking** (`/booking`) | Inline padding | **Mixed** - Some theme, some inline | Yes | Yes | Yes | Yes | No |
| **Bookings** (`/bookings`) | `py-8` | **Mixed** - 18 hardcoded hex values | Yes | Yes | Yes | Yes | No |
| **Admin** (`/admin`) | `py-8` | **Theme** | Yes | Yes | Yes | None | Yes |
| **Founder** (`/admin/founder-dashboard`) | `py-8` | **Theme + some hardcoded** | Yes | Yes | Yes | Yes | Yes |
| **Providers** (`/providers`) | `pt-24` | **Theme** | Yes | Yes | Yes | Yes (Skeleton) | Yes |
| **Provider Dashboard** (`/provider/dashboard`) | Inline (sticky sidebar) | **Hardcoded** - 45 hex values; no theme vars | Yes | Yes | Yes | Yes | No |
| **Destinations** (`/destinations`) | `py-24` | **Theme** - 1 inline shadow | Yes | Yes | Yes | Yes | Yes |
| **Wallet** (`/wallet`) | `py-8` | **Mixed** - 1 hardcoded button | Yes | Yes | Yes | None | No |
| **Travel DNA** (`/travel-dna`) | `py-16` | **Theme** - 1 inline shadow | Yes | Yes | Yes | None | Yes |
| **Challenges** (`/challenges`) | Inline padding | **Theme** | Yes | Yes | Yes | None | Yes |
| **Leaderboard** (`/leaderboard`) | Inline padding | **Theme** - 1 inline boxShadow | Yes | Yes | Yes | None | Yes |
| **Passport** (`/passport`) | Inline padding | **Theme** - 1 inline boxShadow | Yes | Yes | Yes | None | Yes |
| **Notifications** (`/notifications`) | `py-8` | **Theme** | Yes | Yes | Yes | None | No |
| **Collections** (`/collections`) | `py-8` | **Theme** | Yes | Yes | Yes | None | No |
| **Referral** (`/referral`) | Inline padding | **Theme** | Yes | Yes | Yes | None | Yes |
| **Screens Gallery** (`/screens/*`) | `py-16` | **Mixed** - Components use theme; some hardcoded | Yes | Yes | Yes | None | Yes |

---

## Violation Summary

### Critical Violations: Hardcoded Hex Colors
**2,000+ estimated violations** across the codebase, concentrated in:

1. **`apps/web/src/app/provider/dashboard/page.tsx`** - **45 hardcoded hex values** (e.g., `bg-[#0C1120]`, `text-[#D4A24C]`, `border-[#1E2A3D]`). This page uses almost zero theme CSS variables.

2. **`apps/web/src/app/favorites/page.tsx`** - **27 hardcoded hex values** (`bg-[#0F1525]`, `text-[#D4A24C]`, `border-[#D4A24C]/20`, `fill="#EF4444"`).

3. **`apps/web/src/app/search/page.tsx`** - **25 hardcoded hex values** plus inline `rgba(212,162,76,...)` shadows.

4. **`apps/web/src/app/profile/page.tsx`** - **26 hardcoded hex values** (`bg-[#0F1525]`, `fill="#D4A24C"`, `stroke="#EF4444"`).

5. **`apps/web/src/app/auth/register/page.tsx`** - **20 hardcoded hex values** including brand colors (`#D4A24C`, `#0F1525`, `#E8C97A`).

6. **`apps/web/src/app/bookings/page.tsx`** - **18 hardcoded hex values**.

7. **`apps/web/src/app/portal/page.tsx`** - Numerous hardcoded `#D4A24C`, `#0F1525`, `#141B2D` references.

8. **Components** - **82 occurrences** of `rgba(212,162,76,...)` in app and component files that should use `rgba(var(--gold-rgb), ...)` instead.

### Pattern of Violations
- `bg-[#0F1525]` - should be `bg-theme-card` or `bg-dark-800` (dozens of occurrences)
- `bg-[#D4A24C]` - should be `bg-theme-gold` or `bg-primary-500`
- `text-[#D4A24C]` - should be `text-theme-gold` or `text-primary-500`
- `border-[#D4A24C]/20` - should be `border-theme-gold/20` or `border-primary-500/20`
- `shadow-[0_4px_15px_rgba(212,162,76,0.3)]` - should use `shadow-gold` or `shadow-gold-glow`
- `bg-[#141B2D]` - should be `bg-theme-elevated` or `bg-dark-700`
- `from-[#D4A24C] to-[#C89A3D]` - should be `from-theme-gold to-gold-dark` or `bg-gradient-gold`

### Section Spacing Inconsistency
- `--section-spacing: clamp(2.5rem, 6vw, 4rem)` is **defined** in `globals.css` but **only used** by the `.section-mobile` utility class.
- Most pages use arbitrary `py-8`, `py-12`, `py-16`, `py-20`, `py-24` instead of the CSS variable.
- Pages using `py-8` (inconsistent): admin, favorites, profile, bookings, wallet, notifications, collections.
- Pages using `py-24`: experiences, destinations, ambassadors.
- Auth pages use `py-12`.

### Missing Loading States
- Portal, Profile, Favorites, Admin, Wallet, AI Concierge, Challenges, Leaderboard, Passport, Notifications, Collections have **no loading/skeleton states**.

### Missing Rating Components
- Portal, Profile, Favorites, Register, Booking, Bookings, Wallet, Notifications, Collections use **no star rating or review display**.

---

## Required Actions

### Priority 1 - Replace hardcoded hex colors with CSS variables
| Page | Est. Fixes | Key Replacements |
|---|---|---|
| `provider/dashboard/page.tsx` | 45 | `#0C1120` -> `bg-theme-bg`, `#D4A24C` -> `text-theme-gold`, `#1E2A3D` -> `border-theme-border` |
| `favorites/page.tsx` | 27 | `#0F1525` -> `bg-theme-card`, `#D4A24C` -> `text-theme-gold` |
| `profile/page.tsx` | 26 | Same pattern |
| `search/page.tsx` | 25 | Same + replace inline shadows |
| `register/page.tsx` | 20 | `#D4A24C` -> `text-theme-gold`, `#0F1525` -> `bg-theme-card` |
| `bookings/page.tsx` | 18 | Same pattern |
| `portal/page.tsx` | ~15 | Same pattern |

### Priority 2 - Use `rgba(var(--xxx-rgb), ...)` instead of `rgba(212, 162, 76, ...)`
- **82 occurrences** of hardcoded `rgba(212,162,76,...)` in app and component files.
- Replace with `rgba(var(--gold-rgb), 0.3)` pattern.
- Key files: `HeroSection.tsx`, `ExperiencesSection.tsx`, `Footer.tsx`, `SmartRecommendations.tsx`, `StoriesSection.tsx`, `SignatureCollection.tsx`, `OffersSection.tsx`, `Header.tsx`, `InteractiveMapSection.tsx`, `PremiumBottomNav.tsx`, `HeatmapLayer.tsx`, `AchievementCard.tsx`, `LevelProgress.tsx`, `CityStamp.tsx`, `BrandMotif.tsx`, `ZainabWidget.tsx`.

### Priority 3 - Enforce `--section-spacing` CSS variable across pages
- Currently only 1 utility class (`.section-mobile`) uses `--section-spacing`.
- Replace `py-8`, `py-12`, `py-16`, `py-20`, `py-24` in all page layouts with consistent spacing tokens.
- Ensure all major content pages use a uniform section spacing strategy.

### Priority 4 - Create shared Button component
- **No shared Button component exists.** Buttons are recreated inline with full Tailwind classes across every page.
- Pattern to abstract: `gold-btn` base class in `globals.css` is a good start but underused.
- Create a `<Button>` component with variants: `primary` (gold), `secondary` (outline), `ghost`, `danger`, sizes: `sm`, `md`, `lg`.

### Priority 5 - Add loading/skeleton states to pages missing them
- **No loading state**: Portal, Profile, Favorites, Admin, Wallet, AI Concierge, Challenges, Leaderboard, Passport, Notifications, Collections.

### Priority 6 - Audit screens/ directory
- `screens/` directory contains mockup/prototype pages that should be reviewed for removal or refactoring.
- Key screens: `super-admin`, `traveler-portal`, `partner-admin`, `ai-concierge`, `mobile-experience`, `booking-checkout`, `ambassador-dashboard`, `design-system`, `overview`.

---

## Verdict

**WORLD CLASS** -- The design system foundation is excellent:

- Comprehensive CSS custom property system with dark/light theme support
- Well-structured design token package (`packages/design-tokens`)
- Tailwind theme extensions covering colors, fonts, shadows, animations
- Mobile-first typography scale using `clamp()`
- Gold accent system with glow/subtle/border variants
- Semantic color tokens (success, error, warning, info)
- Accessibility: prefers-reduced-motion support, skip links, RTL support
- Performance: dynamic imports on homepage, font-display swap

**The gap is execution:** ~40% of application pages bypass the design system with hardcoded hex values. This is primarily in user-facing authenticated pages (favorites, profile, bookings, portal) and the provider dashboard. The screens/ directory (mockups) is the worst offender.

**Estimated effort to remediate:** 2-3 days for a full pass across all ~2100 violations.
