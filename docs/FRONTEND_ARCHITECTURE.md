# EgyptHub — Frontend Architecture

> **Version:** 2.0
> **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Framer Motion, TanStack Query, Zustand, React Hook Form, Zod
> **Scope:** All 4 frontend applications
> **Date:** June 2026

---

## 1. App Router Architecture

### 1.1 Why App Router

Next.js 15 App Router provides:
- React Server Components (RSC) by default — reduced client JS
- Parallel routes for complex layouts (dashboard + modal)
- Intercepting routes for modal patterns
- Server Actions for form mutations
- Streaming with Suspense for progressive loading
- Automatic code splitting per route segment

### 1.2 Route Segment Conventions

| Convention | Purpose | Example |
|-----------|---------|---------|
| `layout.tsx` | Shared layout persisted across navigations | `app/layout.tsx` (root), `app/(dashboard)/layout.tsx` |
| `page.tsx` | Unique UI for a route segment | `app/page.tsx` (home) |
| `loading.tsx` | Streaming Suspense fallback per segment | `app/(public)/loading.tsx` |
| `error.tsx` | Error boundary per segment | `app/(dashboard)/error.tsx` |
| `not-found.tsx` | 404 per segment | `app/not-found.tsx` |
| `template.tsx` | Re-renders on navigation (unlike layout) | `app/(booking)/template.tsx` |
| `route.ts` | API route handler | `app/api/auth/route.ts` |
| `default.tsx` | Parallel route fallback | `app/(dashboard)/@modal/default.tsx` |
| `middleware.ts` | Edge middleware for auth, redirects | `middleware.ts` (root) |

### 1.3 Root Layout Contract

Every app must define a root layout that:
- Imports and applies font variables (Cairo, Poppins, Playfair)
- Sets `<html lang="ar" dir="rtl" data-theme="dark">`
- Wraps children with providers (TanStack Query, auth, theme, toast)
- Renders global elements (header/footer for public, sidebar for dashboard)
- Includes `<head>` with viewport meta, favicon, Open Graph tags

### 1.4 Streaming Architecture

```
RootLayout (Server Component)
├── Fonts (server)
├── Providers (client boundary — minimal)
│   ├── QueryProvider
│   ├── AuthProvider
│   ├── ToastProvider
│   │
│   ├── <Suspense fallback={<GlobalSkeleton />}>
│   │   │
│   │   ├── PageContent (server — streams data)
│   │   │   ├── <Suspense fallback={<SectionSkeleton />}>
│   │   │   │   ├── ServerComponent1 (fetches data)
│   │   │   │   └── ServerComponent2 (fetches data)
│   │   │   │
│   │   │   ├── <Suspense fallback={<SectionSkeleton />}>
│   │   │   │   └── ServerComponent3
│   │   │   │
│   │   │   └── <ClientComponentWrapper> (interaction)
│   │   │       └── ClientComponent
```

Data fetching in server components happens in parallel. Each `<Suspense>` boundary independently streams. The user sees the skeleton for slow sections while fast sections render immediately.

---

## 2. Route Groups

### 2.1 Group Definitions

Route groups use parenthetical folder names `(groupName)` — they do NOT add a URL segment.

| Group | Purpose | URL Prefix | App |
|-------|---------|-----------|-----|
| `(public)` | Public marketing pages | `/`, `/explore`, `/experiences`, `/about` | web |
| `(auth)` | Authentication pages | `/login`, `/signup`, `/forgot-password` | web |
| `(portal)` | Authenticated traveler pages | `/dashboard/*` | web |
| `(ai)` | AI Concierge pages | `/ai/*` | web |
| `(booking)` | Booking flow pages | `/booking/*` | web |
| `(partner)` | Partner dashboard | `/partner/*` | partner-dashboard |
| `(admin)` | Admin dashboard | `/admin/*` | admin-dashboard |
| `(ambassador)` | Ambassador dashboard | `/ambassador/*` | ambassador-dashboard |

### 2.2 Group-to-Layout Mapping

Each group has its own layout that wraps all pages within it:

```
(public)/
  layout.tsx    → PublicLayout (GlobalHeader + Footer, transparent hero header)
(auth)/
  layout.tsx    → AuthLayout (centered card, no header/footer, minimal chrome)
(portal)/
  layout.tsx    → DashboardLayout (sidebar + dashboard header + content)
(ai)/
  layout.tsx    → ConciergeLayout (compact header + chat container)
(booking)/
  layout.tsx    → BookingLayout (stepper header + step content + footer CTA)
(partner)/
  layout.tsx    → PartnerDashboardLayout (partner sidebar + header)
(admin)/
  layout.tsx    → AdminDashboardLayout (admin sidebar + header)
(ambassador)/
  layout.tsx    → AmbassadorDashboardLayout (ambassador sidebar + header)
```

### 2.3 URL Architecture

```
/                               → (public)/page.tsx
/explore                        → (public)/explore/page.tsx
/explore/[slug]                 → (public)/explore/[slug]/page.tsx
/experiences                    → (public)/experiences/page.tsx
/experiences/[slug]             → (public)/experiences/[slug]/page.tsx
/about                          → (public)/about/page.tsx
/contact                        → (public)/contact/page.tsx

/login                          → (auth)/login/page.tsx
/signup                         → (auth)/signup/page.tsx
/forgot-password                → (auth)/forgot-password/page.tsx
/reset-password/[token]         → (auth)/reset-password/[token]/page.tsx
/verify-email/[token]           → (auth)/verify-email/[token]/page.tsx

/dashboard                      → (portal)/dashboard/page.tsx
/dashboard/trips                → (portal)/dashboard/trips/page.tsx
/dashboard/trips/[id]           → (portal)/dashboard/trips/[id]/page.tsx
/dashboard/bookings             → (portal)/dashboard/bookings/page.tsx
/dashboard/bookings/[id]        → (portal)/dashboard/bookings/[id]/page.tsx
/dashboard/favorites            → (portal)/dashboard/favorites/page.tsx
/dashboard/wallet               → (portal)/dashboard/wallet/page.tsx
/dashboard/profile              → (portal)/dashboard/profile/page.tsx
/dashboard/settings             → (portal)/dashboard/settings/page.tsx
/dashboard/notifications        → (portal)/dashboard/notifications/page.tsx

/ai                             → (ai)/page.tsx
/ai/chat                        → (ai)/chat/page.tsx
/ai/chat/[id]                   → (ai)/chat/[id]/page.tsx
/ai/recommendations             → (ai)/recommendations/page.tsx

/booking/[experienceId]         → (booking)/booking/[experienceId]/page.tsx
/booking/[experienceId]/confirm → (booking)/booking/[experienceId]/confirm/page.tsx
/booking/[id]/ticket            → (booking)/booking/[id]/ticket/page.tsx
```

### 2.4 Intercepting Routes (Modal Pattern)

For booking confirmation and review modals that overlay the current page:

```
(portal)/dashboard/bookings/
  @modal/
    [id]/
      review/page.tsx    → intercepts /dashboard/bookings/[id]/review
      default.tsx        → fallback when no modal match
  page.tsx               → bookings list
  [id]/
    page.tsx             → booking detail
```

When navigating to `/dashboard/bookings/123/review`, the review form appears as a modal over the bookings list. When accessed directly via URL (page refresh), it renders as a full page.

---

## 3. Feature-Based Folder Structure

### 3.1 Application: @egypthub/web

```
apps/web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              RootLayout (fonts, providers, global wrapper)
│   │   ├── globals.css             Global styles, CSS custom properties
│   │   ├── page.tsx                Homepage (server — fetches featured data)
│   │   ├── not-found.tsx           404 page
│   │   │
│   │   ├── (public)/
│   │   │   ├── layout.tsx          PublicLayout (header + footer)
│   │   │   ├── loading.tsx         Public loading skeleton
│   │   │   ├── explore/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── loading.tsx
│   │   │   ├── experiences/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── loading.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── layout.tsx          AuthLayout (centered card)
│   │   │   ├── loading.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── reset-password/[token]/page.tsx
│   │   │
│   │   ├── (portal)/
│   │   │   ├── layout.tsx          DashboardLayout (sidebar + header)
│   │   │   ├── loading.tsx         Dashboard skeleton
│   │   │   ├── error.tsx           Dashboard error boundary
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx        Dashboard Home
│   │   │   │   ├── trips/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── bookings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── favorites/page.tsx
│   │   │   │   ├── wallet/page.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── settings/page.tsx
│   │   │   │   └── notifications/page.tsx
│   │   │   └── @modal/
│   │   │       ├── default.tsx
│   │   │       └── [id]/review/page.tsx
│   │   │
│   │   ├── (ai)/
│   │   │   ├── layout.tsx          ConciergeLayout
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx            AI Welcome
│   │   │   └── chat/
│   │   │       ├── page.tsx        New chat
│   │   │       └── [id]/page.tsx   Existing conversation
│   │   │
│   │   ├── (booking)/
│   │   │   ├── layout.tsx          BookingLayout (stepper)
│   │   │   ├── template.tsx        Re-renders on step change
│   │   │   ├── loading.tsx
│   │   │   └── [experienceId]/
│   │   │       ├── page.tsx        Booking flow entry
│   │   │       └── confirm/page.tsx Confirmation
│   │   │
│   │   └── api/
│   │       ├── auth/route.ts       Auth API proxy
│   │       └── webhooks/payment/route.ts  Payment webhook
│   │
│   ├── features/                   Feature modules (co-located logic)
│   │   ├── public/                 Public page components
│   │   │   ├── components/
│   │   │   │   ├── Hero/
│   │   │   │   ├── StatsBar/
│   │   │   │   ├── DestinationGrid/
│   │   │   │   ├── CategoryGrid/
│   │   │   │   ├── ExperienceCard/
│   │   │   │   ├── CityWheel/
│   │   │   │   ├── HowItWorks/
│   │   │   │   ├── OfferSection/
│   │   │   │   ├── Testimonials/
│   │   │   │   ├── AboutSection/
│   │   │   │   ├── DownloadApp/
│   │   │   │   ├── SandWave/
│   │   │   │   └── ParticlesBg/
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                   Authentication
│   │   │   ├── components/ (LoginForm, SignupForm, etc.)
│   │   │   ├── hooks/ useAuth.ts
│   │   │   ├── lib/ auth-api.ts
│   │   │   ├── schemas/ login.ts, signup.ts, forgot-password.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── traveler/               Traveler portal
│   │   │   ├── components/ (TripCard, BookingCard, ReviewForm, etc.)
│   │   │   ├── hooks/ useTrips.ts, useBookings.ts, useFavorites.ts, useWallet.ts
│   │   │   ├── lib/ trips-api.ts, bookings-api.ts, wallet-api.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ai-concierge/           AI Concierge
│   │   │   ├── components/ (ChatBubble, ChatInputBar, VoiceRecorder, etc.)
│   │   │   ├── hooks/ useAIChat.ts, useVoiceInput.ts, useAIRecommendations.ts
│   │   │   ├── lib/ ai-api.ts, websocket.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── booking/                Booking flow
│   │   │   ├── components/ (Calendar, TimeSlotPicker, GuestForm, PaymentSelector, etc.)
│   │   │   ├── hooks/ useBookingFlow.ts, usePayment.ts, useBookingSteps.ts
│   │   │   ├── lib/ bookings-api.ts, payment-api.ts
│   │   │   ├── schemas/ guest-details.ts, payment.ts
│   │   │   └── index.ts
│   │   │
│   │   └── shared/                 Shared app features
│   │       ├── components/ (EgyptianIcons, GlobalHeader, GlobalFooter, MobileBottomNav)
│   │       └── index.ts
│   │
│   ├── stores/                     Zustand stores
│   │   ├── auth-store.ts           User auth state, token
│   │   ├── booking-store.ts        Multi-step booking wizard state
│   │   ├── chat-store.ts           AI chat conversation state
│   │   ├── filter-store.ts         Search/filter state (URL sync)
│   │   ├── notification-store.ts   Toast notification queue
│   │   └── ui-store.ts             UI state (sidebar collapsed, modal open)
│   │
│   ├── providers/                  React context providers
│   │   ├── QueryProvider.tsx       TanStack Query client
│   │   ├── AuthProvider.tsx        Auth context + session management
│   │   ├── ToastProvider.tsx       Toast notification context
│   │   └── I18nProvider.tsx        Internationalization context
│   │
│   ├── hooks/                      Shared hooks
│   │   ├── useBreakpoint.ts
│   │   ├── useClickOutside.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useLockedBody.ts
│   │
│   ├── lib/                        Shared utilities
│   │   ├── api/client.ts           Fetch wrapper with auth, error handling
│   │   ├── api/experiences.ts
│   │   ├── api/destinations.ts
│   │   ├── api/users.ts
│   │   ├── utils/cn.ts             clsx + tailwind-merge
│   │   ├── utils/format-currency.ts
│   │   ├── utils/format-date.ts
│   │   └── constants.ts
│   │
│   └── middleware.ts               Auth + redirect logic
│
├── public/images/, icons/, fonts/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 Feature Module Contract

Every feature module (`features/<name>/`) follows this structure:

```
features/<name>/
├── components/         UI components (server or client)
├── hooks/              React hooks (useXxx)
├── lib/                API clients, utilities, helpers
├── schemas/            Zod validation schemas
├── types/              Feature-specific TypeScript types
├── constants/          Feature-specific constants
├── store/              Feature-specific Zustand slice (if needed)
└── index.ts            Public exports
```

**Rules:**
- Each feature module is self-contained — it imports from `@egypthub/ui` and `@egypthub/shared-types` but NOT from other features
- Feature components are not exported to other features — they are internal
- Only hooks, types, and schemas are shared between features via index.ts
- API client functions live in `lib/` within each feature — no shared API client across features

---

## 4. Shared Package Boundaries

### 4.1 Package Dependency Graph

```
@egypthub/shared-types    (zero dependencies — pure types)
       │
       ├── @egypthub/design-tokens (depends on shared-types)
       │
       ├── @egypthub/i18n (depends on shared-types)
       │
       └── @egypthub/ui (depends on design-tokens)
                │
                ├── apps/web (depends on ui, shared-types, i18n, design-tokens)
                ├── apps/partner-dashboard (depends on ui, shared-types, i18n, design-tokens)
                ├── apps/admin-dashboard (depends on ui, shared-types, i18n, design-tokens)
                └── apps/ambassador-dashboard (depends on ui, shared-types, i18n, design-tokens)
```

### 4.2 Import Rules

| Import Direction | Allowed | Example |
|-----------------|---------|---------|
| App → @egypthub/ui | YES | `import { Button } from '@egypthub/ui'` |
| App → @egypthub/shared-types | YES | `import { UserRole } from '@egypthub/shared-types'` |
| App → @egypthub/design-tokens | YES | `import { colors } from '@egypthub/design-tokens'` |
| App → @egypthub/i18n | YES | `import { useTranslation } from '@egypthub/i18n'` |
| @egypthub/ui → design-tokens | YES | Internal implementation |
| @egypthub/ui → apps | NO | Never import from apps |
| Feature A → Feature B | NO | Features are isolated |
| App A → App B | NO | Apps are isolated |

### 4.3 Shared Package Purposes

| Package | Purpose | Consumers |
|---------|---------|-----------|
| `@egypthub/shared-types` | TypeScript interfaces, enums, API response types | All apps, ui, services |
| `@egypthub/design-tokens` | CSS custom properties, color scales, typography, spacing | Tailwind config, ui, apps |
| `@egypthub/ui` | Shadcn-based component library (Button, Modal, Table, etc.) | All apps |
| `@egypthub/i18n` | Translation files, locale utilities, RTL helpers | All apps |

### 4.4 Package Build Chain (Turbo)

```
pnpm build (root)
  └── turbo build
      ├── build:shared-types    (no deps — builds first)
      ├── build:design-tokens   (depends on shared-types)
      ├── build:i18n            (depends on shared-types)
      ├── build:ui              (depends on design-tokens)
      ├── build:web             (depends on ui, shared-types, i18n, design-tokens)
      ├── build:partner         (depends on ui, shared-types, i18n, design-tokens)
      ├── build:admin           (depends on ui, shared-types, i18n, design-tokens)
      └── build:ambassador      (depends on ui, shared-types, i18n, design-tokens)
```

---

## 5. Design System Integration

### 5.1 Tailwind CSS v4 Architecture

Tailwind CSS v4 uses CSS-first configuration — no more `tailwind.config.ts`. Configuration is done in `@theme` blocks in CSS files.

**Configuration chain:**

```
@egypthub/design-tokens
  └── exports CSS custom properties
      └── consumed by apps via globals.css
          └── @theme blocks in Tailwind v4 reference CSS variables
              └── Utility classes auto-generated
```

### 5.2 Tailwind v4 Theme Integration

In Tailwind CSS v4, the theme is configured via CSS `@theme` blocks:

```css
/* apps/web/src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg-primary: var(--bg-primary);
  --color-surface: var(--surface);
  --color-surface-elevated: var(--surface-elevated);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-gold-dark: var(--gold-dark);
  --color-border: var(--border);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);
  --color-info: var(--info);

  --font-family-cairo: 'Cairo', sans-serif;
  --font-family-poppins: 'Poppins', sans-serif;
  --font-family-playfair: 'Playfair Display', serif;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.6);
  --shadow-gold: 0 4px 14px rgba(212,162,76,0.25);

  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-glow-pulse: glow-pulse 2s ease-in-out infinite;
}
```

### 5.3 Shadcn UI Integration

Shadcn UI provides the primitive component layer. Components are copied into `@egypthub/ui` (not individual apps), allowing full customization.

**Shadcn component map:**

| Shadcn Component | Used As | Customization |
|-----------------|---------|---------------|
| Button | Button (gold variants) | Gold gradient, secondary outline, ghost |
| Input | Input (dark bg) | Dark background, gold focus ring |
| Select | Select | Dark dropdown, gold active |
| Card | Card (surface bg) | Surface background, gold hover border |
| Dialog | Modal | Dark overlay, surface-elevated bg |
| Sheet | Drawer (mobile) | Dark bg, gold close button |
| Tabs | Tabs (underline) | Gold active tab |
| Table | DataTable | Dark rows, gold sort indicators |
| Badge | Badge | Gold, success, error, warning |
| Avatar | Avatar | Gold ring for active |
| Tooltip | Tooltip | Dark bg, gold text |
| Popover | Popover | Dark bg, gold border |
| Toast | Toast (notification) | Type-colored left border |
| Skeleton | Skeleton | Surface-elevated bg |
| Breadcrumb | Breadcrumb | Gold active, muted inactive |
| Pagination | Pagination | Gold active page |
| DropdownMenu | Dropdown | Dark bg, gold hover |
| Command | Command palette | Dark bg, gold highlight |
| Form | Form wrapper | Dark inputs, gold labels |
| Checkbox | Checkbox | Gold when checked |
| RadioGroup | Radio | Gold when selected |
| Switch | Toggle | Gold when on |
| Progress | ProgressBar | Gold gradient fill |

### 5.4 EgyptianIcons

Custom Egyptian icons (Pyramid, Compass, Star, Sun, Wave, Palm, Lotus) are custom SVG components in `@egypthub/ui`, not part of Shadcn.

---

## 6. Component Layering

### 6.1 Four-Layer Architecture

```
Layer 4: Feature Components (app-specific, co-located with features)
  │     TripCard, ChatBubble, Calendar, OfferForm, UsersTable
  │     Located in: features/<name>/components/
  │     Import from: Layer 1, Layer 2, Layer 3
  │
Layer 3: Shared App Components (app-wide, not in ui package)
  │     GlobalHeader, GlobalFooter, MobileBottomNav, EgyptianIcons
  │     Located in: features/shared/components/
  │     Import from: Layer 1, Layer 2
  │
Layer 2: @egypthub/ui (shared across all apps)
  │     Button, Card, Modal, Table, Skeleton, Tabs, Badge, etc.
  │     Located in: packages/ui/src/
  │     Import from: Layer 1 only
  │
Layer 1: Shadcn Primitives (base, copied into @egypthub/ui)
        ui-button.tsx, ui-card.tsx, ui-dialog.tsx, ui-table.tsx, etc.
        Located in: packages/ui/src/primitives/ (internal)
        Import from: nothing (leaf)
```

### 6.2 Import Hierarchy Rules

| From → To | Allowed |
|-----------|---------|
| Layer 4 → Layer 3 | YES |
| Layer 4 → Layer 2 | YES |
| Layer 4 → Layer 1 | NO (go through Layer 2) |
| Layer 3 → Layer 2 | YES |
| Layer 3 → Layer 1 | NO |
| Layer 2 → Layer 1 | YES (implementation detail) |
| Layer 2 → Layer 3 | NO |
| Layer 2 → Layer 4 | NO |

### 6.3 Component Naming Convention

| Layer | Naming Pattern | Example |
|-------|---------------|---------|
| Shadcn | `ui-<name>.tsx` | `ui-button.tsx`, `ui-card.tsx` |
| @egypthub/ui | PascalCase | `Button.tsx`, `Card.tsx`, `Modal.tsx` |
| Shared App | PascalCase | `GlobalHeader.tsx`, `MobileBottomNav.tsx` |
| Feature | PascalCase, prefixed with context | `TripCard.tsx`, `ChatBubble.tsx` |

### 6.4 Component Composition Pattern

Feature components are composed by combining lower-layer primitives:

```
TripCard (Layer 4)
├── Card (Layer 2 — @egypthub/ui)
│   ├── CardHeader (Layer 2)
│   │   ├── Avatar (Layer 2)
│   │   └── Badge (Layer 2)
│   ├── CardContent (Layer 2)
│   │   └── Rating (Layer 2)
│   └── CardFooter (Layer 2)
│       └── Button (Layer 2)
└── EgyptianIcons (Layer 3)
```

---

## 7. Server vs Client Component Strategy

### 7.1 Decision Framework

```
Does this component need user interaction (onClick, onChange, hover, focus)?
  → YES → Client Component ('use client')
  → NO  → Does this component use browser APIs (window, document, localStorage)?
            → YES → Client Component
            → NO  → Does this component fetch data?
                      → YES → Server Component (fetch in component body)
                      → NO  → Does this component use state or effects?
                                → YES → Client Component
                                → NO  → Server Component (default)
```

### 7.2 Component Boundary Map

| Component | Server/Client | Reason |
|-----------|--------------|--------|
| RootLayout | Server | Fonts, metadata, HTML structure |
| PublicLayout | Server | Structure, imports providers |
| GlobalHeader | Client | Scroll listener, mobile menu toggle |
| GlobalFooter | Server | Static content |
| Homepage (page) | Server | Data fetching, renders children |
| Hero | Client | Ken Burns animation, typewriter, parallax |
| StatsBar | Client | Intersection observer, count-up animation |
| DestinationCard | Server | Pure display, no interaction |
| ExperienceCard | Server | Pure display, hover handled by CSS |
| CategoryGrid | Server | Pure display |
| HowItWorks | Server | Static content |
| OfferSection | Client | Countdown timer (interval) |
| Testimonials | Client | Carousel with drag/swipe |
| AboutSection | Server | Static content |
| ParticlesBg | Client | Canvas/WebGL animation |
| SandWave | Server | SVG inline |
| DashboardLayout | Server | Structure |
| DashboardSidebar | Client | Collapse toggle, mobile drawer |
| DashboardHeader | Client | Search, notifications dropdown |
| DashboardHome | Server | Data fetching |
| StatCard | Server | Pure display |
| TripCard | Server | Pure display |
| BookingCard | Server | Pure display |
| ReviewForm | Client | Form interaction |
| LoginForm / SignupForm | Client | Form interaction |
| ChatInterface | Client | Real-time chat, WebSocket |
| ChatBubble | Server | Pure display |
| ChatInputBar | Client | Input, voice, send |
| VoiceRecorder | Client | MediaRecorder API |
| Calendar | Client | Date selection interaction |
| TimeSlotPicker | Client | Time selection interaction |
| GuestCounter | Client | Increment/decrement |
| PaymentSelector | Client | Payment method selection |
| CardInputForm | Client | Card input with masking |
| QRCodeDisplay | Server | QR generation, display |
| ConfirmationCard | Server | Display confirmation |
| PartnerSidebar | Client | Collapse toggle |
| OfferForm | Client | Form interaction |
| BookingsTable | Client | Sort, filter, pagination |
| AnalyticsCharts | Client | Chart rendering |
| AdminUsersTable | Client | Sort, filter, bulk actions |
| ActivityLogTable | Client | Sort, filter, expand |
| ContentEditor | Client | Rich text editing |

### 7.3 Data Fetching Pattern

**Server components fetch directly:**

```
async function FeaturedExperiences() {
  const experiences = await fetchFeaturedExperiences();
  return (
    <div>
      {experiences.map(exp => (<ExperienceCard key={exp.id} experience={exp} />))}
    </div>
  );
}
```

**Client components fetch via TanStack Query:**

```
function BookingList() {
  const { data, isLoading } = useBookings();
  if (isLoading) return <BookingListSkeleton />;
  return data.map(booking => <BookingCard key={booking.id} booking={booking} />);
}
```

### 7.4 Server Action Pattern

Form submissions use Next.js Server Actions:

```
"use server";
export async function createBooking(formData: FormData) {
  const validated = bookingSchema.parse({ ... });
  const result = await bookingsApi.create(validated);
  if (!result.success) throw new Error(result.error);
  revalidatePath("/dashboard/bookings");
  redirect("/booking/confirm");
}
```

Client components call server actions via form `action` attribute:

```
<form action={createBooking}>
  <input type="hidden" name="experienceId" value={id} />
  <Button type="submit">Book Now</Button>
</form>
```

---

## 8. API Consumption Strategy

### 8.1 Two-Layer Architecture

| Layer | When | Where | Cache | Use Case |
|-------|------|-------|-------|----------|
| **Server-side** | Page load, initial render | Server Component | Next.js cache + ISR | Public pages, dashboards |
| **Client-side** | User interaction, real-time | Client Component via TanStack Query | TanStack Query cache | Filters, search, mutations |

### 8.2 Server-Side Fetching

**Direct service calls (server-to-server):**

```
async function HomePage() {
  const destinations = await destinationsService.findActive();
  const experiences = await experiencesService.findFeatured();
  return <HomeView destinations={destinations} experiences={experiences} />;
}
```

**Next.js fetch caching:**

```
const data = await fetch(url, {
  next: { revalidate: 300, tags: ["experiences"] }
});
```

### 8.3 Client-Side Fetching (TanStack Query)

**Query hooks per feature:**

| Feature | Query Key | staleTime |
|---------|-----------|-----------|
| Experiences | `['experiences', filters]` | 2 min |
| Experience Detail | `['experience', slug]` | 5 min |
| Destinations | `['destinations']` | 10 min |
| My Bookings | `['bookings', userId]` | 30 s |
| My Trips | `['trips', userId]` | 30 s |
| Favorites | `['favorites', userId]` | 1 min |
| Profile | `['profile', userId]` | 5 min |
| Notifications | `['notifications', userId]` | 10 s |
| AI Chat | `['chat', conversationId]` | 0 (real-time) |
| Partner Offers | `['partner-offers', partnerId]` | 30 s |
| Partner Analytics | `['partner-analytics', partnerId, range]` | 1 min |

### 8.4 Mutation Pattern

Mutations use TanStack Query's `useMutation` with optimistic updates:

```
Mutation Flow:
  1. User triggers action (click, form submit)
  2. useMutation calls server action or API endpoint
  3. On success: invalidate relevant queries → UI auto-refetches
  4. On error: show toast, rollback optimistic update, allow retry
  5. Optimistic update: update UI immediately, rollback on error
```

### 8.5 API Client Abstraction

The API client in `lib/api/client.ts` provides:
- Base URL configuration (from environment)
- Auth token attachment (from Zustand auth store)
- Request/response interceptors
- Error normalization (API errors → typed errors)
- Retry logic (exponential backoff)
- Request deduplication for concurrent identical requests

---

## 9. Caching Strategy

### 9.1 Three-Tier Cache

| Tier | Tool | Scope | Duration | Invalidation |
|------|------|-------|----------|--------------|
| Tier 1: HTTP Cache | Next.js fetch cache | Server-rendered pages | 30s–10min | Time-based + tag-based |
| Tier 2: Application Cache | TanStack Query | Client-side data | 10s–10min | Mutation invalidation |
| Tier 3: Browser Cache | Service Worker + HTTP headers | Static assets, pages | Long-lived (immutable) | Version-based |

### 9.2 Cache Configuration by Data Type

| Data Type | Tier 1 (Server) | Tier 2 (Client) |
|-----------|----------------|-----------------|
| Static content (about, FAQ) | ISR: 1 day | N/A |
| Destinations | ISR: 10 min | staleTime: 10 min |
| Experiences | ISR: 5 min | staleTime: 2 min |
| User bookings | No cache | staleTime: 30 s |
| User profile | No cache | staleTime: 5 min |
| Favorites | No cache | staleTime: 1 min |
| Notifications | No cache | staleTime: 10 s |
| AI Chat | No cache | staleTime: 0 |
| Dashboard stats | ISR: 1 min | staleTime: 10 s |
| Partner offers | ISR: 1 min | staleTime: 30 s |
| Search results | No cache | staleTime: 0 |

### 9.3 Cache Invalidation Strategy

| Trigger | Invalidation Method |
|---------|-------------------|
| User mutation (create/update/delete) | TanStack Query `invalidateQueries()` on related keys |
| Booking created | Invalidate `['bookings']`, `['trips']`, `['wallet']` |
| Profile updated | Invalidate `['profile']` |
| Partner offer updated | Invalidate `['partner-offers']`, `['experiences']` |
| Admin content updated | Next.js `revalidateTag()` for ISR pages |
| Payment completed | Invalidate `['bookings']`, `['wallet']` |
| Review submitted | Invalidate `['experience', slug]` reviews section |

### 9.4 Stale-While-Revalidate Pattern

```
User opens bookings page
  → Client cache has data from 30 seconds ago
  → Shows cached data immediately (no loading state)
  → Background refetch starts
  → If new data differs → UI updates seamlessly
  → If same → no re-render
```

### 9.5 Offline / Network Error Handling

```
TanStack Query retry config:
  - retry: 3 (default)
  - retryDelay: exponential backoff (1s, 2s, 4s)
  - On network error: show "Connection lost" banner
  - On cache hit with network error: serve cached data + banner
  - On no cache + network error: show error page
```

---

## 10. Error Handling Strategy

### 10.1 Error Boundary Hierarchy

```
RootErrorBoundary (app/error.tsx — catches everything)
  ├── (public)/error.tsx         Public section errors
  ├── (auth)/error.tsx           Auth section errors
  ├── (portal)/error.tsx         Dashboard errors
  ├── (ai)/error.tsx             AI Concierge errors
  ├── (booking)/error.tsx        Booking flow errors
  ├── (partner)/error.tsx        Partner dashboard errors
  ├── (admin)/error.tsx          Admin dashboard errors
  └── (ambassador)/error.tsx     Ambassador dashboard errors
```

### 10.2 Error Types and Responses

| Error Type | HTTP Status | Handling | User Message |
|-----------|------------|----------|--------------|
| Not Found | 404 | `not-found.tsx` | "Page not found" with CTA to home |
| Unauthorized | 401 | Redirect to `/login` | "Please log in to continue" |
| Forbidden | 403 | Custom page | "You don't have access to this page" |
| Server Error | 500 | `error.tsx` | "Something went wrong" with retry |
| Network Error | 0 | Banner + cached data | "Connection lost" |
| Validation Error | 422 | Inline form errors | Per-field error messages |
| Rate Limited | 429 | Retry after delay | "Too many requests, please wait" |
| Service Unavailable | 503 | Maintenance page | "We'll be back soon" |

### 10.3 Error Boundary Behavior

**Root error boundary:** Full-page error display, error ID, "Try again" button, "Go home" link, error details in dev only.

**Section error boundaries:** Section-level display, "Try again" button, "Go back" link, falls back to cached data if available.

### 10.4 Form Error Handling

| Error Type | Display Location | Pattern |
|-----------|-----------------|---------|
| Field validation | Below each input | React Hook Form error state |
| Server validation | Below relevant field | Map API error to field name |
| Duplicate / conflict | Inline near submit | "This email is already registered" |
| Network error | Toast notification | "Failed to save. Check connection." |
| Permission error | Inline near submit | "You don't have permission" |

### 10.5 Toast Notification Strategy

| Toast Type | Duration | Dismissible | Use Case |
|-----------|----------|-------------|----------|
| Success | 3 seconds | Yes | Action completed |
| Error | 5 seconds | Yes | Action failed |
| Warning | 4 seconds | Yes | Attention needed |
| Info | 3 seconds | Yes | Informational |
| Loading | Until resolved | No | In-progress action |

### 10.6 Global Error Monitoring

- Errors logged to console in development
- Errors sent to monitoring service (Sentry or equivalent) in production
- Error boundaries capture React render errors
- Unhandled promise rejections caught globally
- Network errors caught by API client

---

## 11. Loading States Strategy

### 11.1 Loading Hierarchy

```
RootLayout
├── GlobalSkeleton (initial page load — rare, only first paint)
│
├── (public)/loading.tsx → PublicSectionSkeleton
│   ├── Homepage
│   │   ├── HeroSkeleton (full viewport height)
│   │   ├── StatsBarSkeleton (4 stat blocks)
│   │   ├── DestinationGridSkeleton (5 cards)
│   │   ├── CategoryGridSkeleton (6 cards)
│   │   ├── FeaturedSkeleton (3 cards)
│   │   └── TestimonialsSkeleton
│   ├── Explore
│   │   ├── FilterBarSkeleton
│   │   └── CardGridSkeleton (12 cards)
│   └── ExperienceDetail
│       ├── GallerySkeleton
│       ├── InfoSkeleton
│       └── ReviewsSkeleton
│
├── (auth)/loading.tsx → AuthSkeleton (centered card)
│
├── (portal)/loading.tsx → DashboardSkeleton
│   ├── SidebarSkeleton (nav items)
│   ├── HeaderSkeleton (search, avatar)
│   └── ContentSkeleton (stat cards + table)
│
├── (ai)/loading.tsx → ChatSkeleton (message bubbles)
├── (booking)/loading.tsx → BookingSkeleton (stepper + form)
├── (partner)/loading.tsx → PartnerDashboardSkeleton
├── (admin)/loading.tsx → AdminDashboardSkeleton
└── (ambassador)/loading.tsx → AmbassadorDashboardSkeleton
```

### 11.2 Skeleton Component Patterns

| Skeleton Type | Dimensions | Animation | Used For |
|--------------|-----------|-----------|----------|
| TextSkeleton | Width varies, height 16px | Pulse | Headings, body text |
| AvatarSkeleton | 40px circle | Pulse | User avatars |
| CardSkeleton | Full card width, 200px height | Pulse | Card placeholders |
| ImageSkeleton | Full width, 4:3 ratio | Pulse | Image placeholders |
| TableSkeleton | Full width, 6 rows × 4 cols | Pulse | Table placeholders |
| StatSkeleton | 200px × 80px | Pulse | Stat cards |
| ButtonSkeleton | 120px × 40px | Pulse | Button placeholders |
| InputSkeleton | Full width, 44px height | Pulse | Input placeholders |

### 11.3 Loading Pattern by Component

| Pattern | When | Implementation |
|---------|------|---------------|
| Route-level skeleton | Page navigation | `loading.tsx` in route segment |
| Section-level skeleton | Data fetching within page | `<Suspense fallback={<Skeleton />}>` |
| Component-level skeleton | Async component | `<Suspense>` inside client component |
| Inline loading | Button/action | Spinner inside button |
| Optimistic update | Mutation | UI updates immediately, no loading state |
| Skeleton → Content | Any async render | Smooth fade transition |

### 11.4 Streaming Priorities

```
Page loads → Instant HTML shell (layout)
  ├── Stream: Fast section (hero text) → 200ms
  │   └── User sees hero text immediately
  ├── Stream: Medium section (featured experiences) → 800ms
  │   └── Suspense boundary shows skeleton while loading
  └── Stream: Slow section (testimonials, reviews) → 1500ms
      └── Suspense boundary shows skeleton while loading
```

### 11.5 Interaction Loading States

| Interaction | Loading Pattern |
|-------------|----------------|
| Form submit | Button shows spinner, disables, text changes to "Submitting..." |
| Search | Input shows spinner icon, results show skeleton |
| Filter change | Content area shows skeleton (preserve filter bar) |
| Tab switch | Content area shows skeleton, tab label remains |
| Pagination | New page skeleton, previous data preserved until loaded |
| Infinite scroll | Smaller skeleton row at bottom of list |
| Image load | Blur placeholder → image fade-in |

---

## 12. Animation Architecture

### 12.1 Animation Principles

| Principle | Implementation |
|-----------|---------------|
| Performance-first | Use CSS transforms + opacity (GPU-accelerated), avoid layout-triggering properties |
| Reduced motion respected | `prefers-reduced-motion` media query disables all non-essential animations |
| Subtle over flashy | Duration 200-400ms, easings are natural (cubic-bezier), no bouncy defaults |
| Meaningful motion | Every animation serves a purpose: hierarchy, attention, feedback, spatial awareness |
| Server-safe | Framer Motion components wrapped in lazy-loaded client boundaries |

### 12.2 Framer Motion Architecture

| Concept | Implementation |
|---------|---------------|
| Page transitions | Framer Motion `AnimatePresence` wrapped in root layout for route transitions |
| Shared layout | Framer Motion `layoutId` for shared element transitions (cards → detail) |
| Scroll animations | `useScroll` + `useTransform` for parallax, fade-on-scroll, reveal-on-scroll |
| Gesture animations | `whileHover`, `whileTap`, `whileFocus`, `drag` for interactions |
| Exit animations | `AnimatePresence` with `exit` prop for modal/drawer/toast dismissal |
| Variants | Named animation states (`hidden`, `visible`, `exit`) for consistent orchestration |
| Spring animations | `type: "spring"` for playful micro-interactions (favorites, toggles) |
| Timeline | `useAnimationFrame` or `useTime` for continuous animations (Ken Burns) |

### 12.3 Animation Boundaries

```
Providers (Client — wraps root layout)
  └── AnimatePresence (route transitions)
      └── <Layout /> (server, static)
          └── <MotionPage /> (client, wraps page content — animated)
```

**Client wrapper pattern for animated pages:**

```
app/(public)/layout.tsx (server — imports MotionLayout)
  └── MotionLayout.tsx (client — wraps children with AnimatePresence)
```

### 12.4 Animation Catalog

| Animation | Trigger | Duration | Easing | Element |
|-----------|---------|----------|--------|---------|
| Page enter | Route change | 400ms | ease-out | Page content wrapper |
| Page exit | Route change | 200ms | ease-in | Page content wrapper |
| Card hover | Mouse hover | 250ms | ease-out | Cards, buttons |
| Card enter | Scroll into view | 500ms | ease-out | Cards in grid (staggered) |
| Skeleton → Content | Data loaded | 300ms | ease-in-out | Any content area |
| Modal open | User action | 250ms | spring | Modal (scale + fade) |
| Modal close | User action | 150ms | ease-in | Modal (fade) |
| Toast enter | Trigger | 300ms | spring | Slide from right |
| Toast exit | Auto-dismiss | 200ms | ease-in | Slide to right |
| Drawer open | User action | 300ms | ease-out | Slide from right/bottom |
| Drawer close | User action | 200ms | ease-in | Slide to right/bottom |
| Tab switch | Tab click | 200ms | ease-out | Content panel, indicator |
| Accordion | Click | 250ms | ease-out | Content expand/collapse |
| Favorite toggle | Click | 300ms | spring | Heart icon (scale bounce) |
| Count-up | Scroll into view | 1500ms | ease-out | Stat numbers |
| Ken Burns | Page load | 1400ms | ease-in-out | Hero background |
| Parallax | Scroll | Continuous | linear | Hero images |
| Particles | Page load | Continuous | linear | Background particles |
| Dropdown open | Click/hover | 150ms | ease-out | Dropdown menu |
| Skeleton pulse | Page load | 1500ms | ease-in-out | Loading placeholders |
| Progress bar | Async operation | Variable | ease-out | Progress indicator |
| Stagger children | Parent enter | 50ms delay each | ease-out | Card grids, list items |

### 12.5 Animation Performance Rules

1. **Always use `transform` and `opacity`** — never animate `width`, `height`, `top`, `left`, `margin`, `padding`
2. **`will-change: transform`** on animated elements (removed after animation completes)
3. **`transform: translateZ(0)`** on animated elements to promote to GPU layer
4. **AnimatePresence** only wraps components that actually mount/unmount (modals, drawers, toasts)
5. **Stagger children** limited to max 6 items to prevent jank
6. **Scroll-based animations** use `useInView` from framer-motion (not scroll listeners)
7. **Reduced motion** disables all non-essential animations via CSS + framer-motion's `useReducedMotion`
8. **CSS animations** preferred over JS animations for simple transitions (hover, focus)
9. **Framer Motion** reserved for complex orchestration (page transitions, shared layout, gestures)
10. **No animation libraries** beyond Framer Motion — no additional 3rd-party animation deps

### 12.6 Framer Motion Provider Pattern

```
// RootLayout (server component)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>
              <MotionProvider>{children}</MotionProvider>
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

// MotionProvider (client component — wraps children with AnimatePresence)
function MotionProvider({ children }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
```
