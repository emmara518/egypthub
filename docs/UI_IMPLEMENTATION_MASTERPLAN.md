# EgyptHub — UI Implementation Masterplan

> **Version:** 2.0
> **Phase:** Visual → Engineering Architecture
> **Stack:** Next.js 14, React 18, Tailwind CSS 3, TypeScript 5
> **Monorepo:** Turbo + pnpm workspace (4 apps, 3 packages, 5 services)
> **Date:** June 2026

---

## 1. Implementation Order

### 1.1 Dependency Graph (Topological)

```
Phase 1 ─ Foundation
  └── @egypthub/design-tokens (updated)
  └── @egypthub/ui (NEW)
  └── @egypthub/shared-types (updated)
  └── @egypthub/i18n (updated)
  └── globals.css, tailwind.config.ts (all apps)

Phase 2 ─ Public Website (@egypthub/web)
  └── Layout → Homepage → Destinations → Experiences → About
  └── Depends on: Phase 1

Phase 3 ─ Auth + Traveler Portal (@egypthub/web)
  └── Auth screens → Dashboard → Trips → Bookings → Favorites → Profile → Settings
  └── Depends on: Phase 1, Phase 2 (header, footer shared)

Phase 4 ─ Booking Flow + AI Concierge (@egypthub/web)
  └── Calendar → Time → Guests → Add-ons → Payment → Confirmation
  └── AI Concierge: Welcome → Chat → Voice → Recommendations
  └── Depends on: Phase 1, Phase 2, Phase 3

Phase 5 ─ Dashboards (@egypthub/partner-dashboard, @egypthub/admin-dashboard, @egypthub/ambassador-dashboard)
  └── Partner Dashboard → Admin Dashboard → Ambassador Dashboard
  └── Depends on: Phase 1, (optionally Phase 3 auth)
```

### 1.2 Critical Path

```
design-tokens → ui package → layout → homepage → destinations → experience detail → booking flow → payment
```

Any delay in `design-tokens` or `ui` blocks everything downstream.

---

## 2. Component Dependencies

### 2.1 Dependency Tree

```
@egypthub/ui (root of all components)
├── Core
│   ├── Button ──── no deps
│   ├── Input ───── no deps
│   ├── Select ──── Input
│   ├── Card ────── no deps
│   ├── Avatar ──── no deps
│   ├── Badge ───── no deps
│   ├── Icon ────── no deps
│   └── Spinner ─── no deps
│
├── Navigation
│   ├── Header ──── Button, Avatar, Badge, Icon, Container
│   ├── Sidebar ─── Icon, Avatar, Button
│   ├── BottomNav ─ Icon
│   ├── Tabs ────── no deps
│   ├── Breadcrumb─ Icon
│   └── Pagination─ Button
│
├── Overlay
│   ├── Modal ───── Button, Icon, Portal
│   ├── Drawer ──── Button, Icon, Portal
│   ├── BottomSheet─ Icon, Button
│   ├── Popover ─── Portal
│   ├── Tooltip ─── Portal
│   └── Toast ───── Icon, Button, Portal
│
├── Form
│   ├── DatePicker ── Button, Icon, Calendar
│   ├── TimePicker ── Button, Icon
│   ├── FileUpload ── Icon, Button
│   ├── Toggle ────── no deps
│   ├── Checkbox ──── no deps
│   ├── Radio ─────── no deps
│   ├── GuestCounter─ Button
│   └── SearchInput── Input, Icon
│
├── Data Display
│   ├── Table ─────── Badge, Button, Pagination
│   ├── StatCard ──── Icon
│   ├── Chart ─────── no deps (chart library)
│   ├── ProgressBar── no deps
│   ├── Rating ────── Icon
│   ├── Timeline ──── Icon
│   └── EmptyState─── Icon, Button
│
└── Feedback
    ├── Skeleton ──── no deps
    ├── Alert ─────── Icon, Button
    └── Spinner ───── no deps
```

### 2.2 Build Order

| Tier | Components | Depends On | Build Time |
|------|-----------|------------|------------|
| 1 (Leaf) | Button, Input, Card, Avatar, Badge, Icon, Spinner, Toggle, Checkbox, Radio, Skeleton | Nothing | Day 1-2 |
| 2 | Select, StatCard, Rating, ProgressBar, Alert, EmptyState | Tier 1 | Day 3 |
| 3 | Modal, Drawer, Popover, Tooltip, Toast, Portal, Breadcrumb, Tabs | Tier 1 | Day 4-5 |
| 4 | Header, Sidebar, BottomNav, Pagination, Table, Timeline, GuestCounter, SearchInput | Tier 1-3 | Day 6-7 |
| 5 | DatePicker, TimePicker, FileUpload, Chart, BottomSheet | Tier 1-4 | Day 8-10 |

---

## 3. Shared Components

### 3.1 Package Strategy

```
packages/
├── ui/                    (NEW) — shared component library
│   ├── src/
│   │   ├── core/          Button, Input, Select, Card, Avatar, Badge, Icon, Spinner
│   │   ├── navigation/    Header, Sidebar, BottomNav, Tabs, Breadcrumb, Pagination
│   │   ├── overlay/       Modal, Drawer, BottomSheet, Popover, Tooltip, Toast
│   │   ├── form/          DatePicker, TimePicker, FileUpload, Toggle, Checkbox, Radio
│   │   ├── data/          Table, StatCard, Chart, ProgressBar, Rating, Timeline
│   │   ├── feedback/      Skeleton, Alert, Spinner, EmptyState
│   │   ├── layout/        Container, Grid, Stack, Section, Divider
│   │   └── index.ts       barrel exports
│   ├── tailwind.config.ts
│   └── package.json       @egypthub/ui
```

### 3.2 Which Components Go Where

| Scope | Location | Examples |
|-------|----------|---------|
| **Universal** (used by all apps) | `@egypthub/ui` | Button, Input, Card, Avatar, Badge, Modal, Toast, Tabs, Table, Skeleton, Spinner, Select, Checkbox, Radio, Toggle, Breadcrumb, Pagination, EmptyState, Alert, Tooltip, Popover, Drawer, Icon, Rating, ProgressBar, StatCard, Container, Grid, Stack, Divider, Portal |
| **Public site only** | `@egypthub/web` | Header (public variant), Hero, DestinationGrid, ExperienceCard, Footer, CategoryGrid, CityWheel, TestimonialCard, OfferCard, HowItWorks, StatsBar, SandWave, ParticlesBg, DownloadApp |
| **Traveler portal only** | `@egypthub/web` | TripCard, BookingCard, ReviewForm, WalletCard, LoyaltyCard, NotificationCard, ProfileHeader, DashboardSidebar |
| **AI Concierge only** | `@egypthub/web` | ChatBubble, ChatInput, QuickReplyChip, SuggestionCard, TypingIndicator, VoiceRecorder, AIRecCard |
| **Booking only** | `@egypthub/web` | Calendar, TimeSlotPicker, GuestCounter (if customized), PaymentSelector, BookingSummary, QRCodeDisplay, ConfirmationCard |
| **Partner dashboard** | `@egypthub/partner-dashboard` | OfferForm, PayoutCard, PartnerAnalytics, PartnerSidebar |
| **Admin dashboard** | `@egypthub/admin-dashboard` | UsersTable, PartnersTable, AdminSidebar, ActivityLogTable, TicketThread |
| **Ambassador dashboard** | `@egypthub/ambassador-dashboard` | AmbassadorSidebar, CommissionCard, ReferralCard |

### 3.3 Theme Distribution

All apps share the same design tokens via `@egypthub/design-tokens` and the same Tailwind config base.

Each app MAY extend Tailwind for app-specific needs, but MUST NOT override shared tokens.

---

## 4. Layout Hierarchy

### 4.1 Public Website (@egypthub/web)

```
RootLayout (server component — fonts, metadata, globals)
├── Providers (client — theme, auth, i18n, query)
│   ├── GlobalHeader (transparent → glass)
│   ├── <Page Content>
│   │   ├── HomeLayout       (hero + sections)
│   │   ├── DestinationLayout (grid + sidebar)
│   │   ├── ExperienceLayout  (detail + sidebar)
│   │   └── StaticLayout      (about, contact, etc.)
│   ├── GlobalFooter
│   └── Portal (toasts, modals, tooltips)
```

### 4.2 Traveler Portal (@egypthub/web)

```
AuthLayout (login, signup, forgot password, reset)

DashboardLayout
├── DashboardSidebar (desktop: fixed, tablet: collapsible, mobile: drawer)
├── DashboardHeader (search, notifications, avatar, breadcrumb)
├── <Page Content>
│   ├── DashboardHome
│   ├── MyTrips
│   ├── MyBookings
│   ├── Favorites
│   ├── Wallet
│   ├── Profile
│   ├── Settings
│   └── Notifications
└── MobileBottomNav (shown on <lg)
```

### 4.3 AI Concierge (@egypthub/web)

```
ConciergeLayout
├── ConciergeHeader (back, avatar, status, actions)
├── <Page Content>
│   ├── ConciergeWelcome
│   └── ChatView
│       ├── MessageList (scrollable)
│       └── ChatInputBar (text + voice + attachments)
└── ConciergeFooter (quick actions)
```

### 4.4 Booking Flow (@egypthub/web)

```
BookingLayout
├── BookingHeader (progress stepper, back, close)
├── <Step Content> (calendar → time → guests → add-ons → payment → confirmation)
└── BookingFooter (next/back buttons, summary)
```

### 4.5 Partner Dashboard (@egypthub/partner-dashboard)

```
PartnerLayout
├── PartnerSidebar (expanded: 260px, collapsed: 72px)
├── PartnerHeader (search, notifications, date range, avatar)
├── <Page Content>
│   ├── PartnerDashboardHome
│   ├── OffersManagement
│   ├── BookingsManagement
│   ├── Analytics
│   ├── Payouts
│   └── Settings
└── MobilePartnerNav (hamburger + bottom tabs)
```

### 4.6 Admin Dashboard (@egypthub/admin-dashboard)

```
AdminLayout
├── AdminSidebar (expanded: 260px, collapsed: 72px)
├── AdminHeader (search, date range, notifications, avatar)
├── <Page Content>
│   ├── AdminDashboardHome
│   ├── Users
│   ├── Partners
│   ├── Bookings
│   ├── Content
│   ├── Analytics
│   ├── Payments
│   ├── System
│   └── Logs
└── MobileAdminNav
```

### 4.7 Ambassador Dashboard (@egypthub/ambassador-dashboard)

```
AmbassadorLayout
├── AmbassadorSidebar
├── AmbassadorHeader
├── <Page Content>
│   ├── AmbassadorHome
│   ├── Commission
│   ├── Referrals
│   ├── Earnings
│   └── Settings
└── MobileAmbassadorNav
```

---

## 5. Page Hierarchy

### 5.1 Public Website Routes (@egypthub/web)

```
/                              → Homepage
/explore                       → Destinations List (grid + map toggle)
/explore/[slug]                → Destination Detail (hero, experiences, map)
/experiences                    → Experiences List (filterable grid)
/experiences/[slug]            → Experience Detail (gallery, booking CTA)
/about                         → About Page
/contact                       → Contact Page
/faq                           → FAQ Page
/terms                         → Terms of Service
/privacy                       → Privacy Policy
```

### 5.2 Auth Routes (@egypthub/web)

```
/login                         → Login Page
/signup                        → Sign Up Page
/forgot-password               → Forgot Password
/reset-password/[token]        → Reset Password
/verify-email/[token]          → Email Verification
/verify-phone                  → Phone Verification
```

### 5.3 Traveler Portal Routes (@egypthub/web)

```
/dashboard                     → Traveler Dashboard Home
/dashboard/trips               → My Trips List
/dashboard/trips/[id]          → Trip Details
/dashboard/bookings            → My Bookings List
/dashboard/bookings/[id]       → Booking Details
/dashboard/bookings/[id]/review → Leave Review
/dashboard/favorites           → Saved Items
/dashboard/wallet              → Wallet & Loyalty
/dashboard/profile             → Profile
/dashboard/settings            → Settings
/dashboard/notifications       → All Notifications
```

### 5.4 AI Concierge Routes (@egypthub/web)

```
/ai                            → AI Concierge Welcome
/ai/chat                       → Chat Interface
/ai/chat/[id]                  → Specific Conversation
/ai/recommendations            → AI Recommendations
/ai/trip-builder               → AI Trip Itinerary Builder
```

### 5.5 Booking Flow Routes (@egypthub/web)

```
/booking/[experienceId]        → Booking Flow (multi-step)
/booking/[experienceId]/calendar  → Step 1: Date Selection
/booking/[experienceId]/time     → Step 2: Time Selection
/booking/[experienceId]/guests   → Step 3: Guest Details
/booking/[experienceId]/addons   → Step 4: Add-ons
/booking/[experienceId]/summary  → Step 5: Summary & Payment
/booking/[experienceId]/confirm  → Step 6: Confirmation
/booking/[id]/ticket             → QR Code / Ticket
```

### 5.6 Partner Dashboard Routes (@egypthub/partner-dashboard)

```
/partner/dashboard              → Partner Dashboard Home
/partner/offers                 → Offers Management
/partner/offers/new             → Create Offer
/partner/offers/[id]/edit       → Edit Offer
/partner/bookings               → Bookings Management
/partner/bookings/[id]          → Booking Details
/partner/analytics              → Analytics
/partner/payouts                → Payouts
/partner/settings               → Settings
/partner/support                → Support Tickets
```

### 5.7 Admin Dashboard Routes (@egypthub/admin-dashboard)

```
/admin                          → Admin Dashboard Home
/admin/users                    → User Management
/admin/users/[id]               → User Details
/admin/partners                 → Partner Management
/admin/partners/[id]            → Partner Details
/admin/bookings                 → Booking Management
/admin/bookings/[id]            → Booking Details
/admin/content                  → Content Management
/admin/content/[type]           → Content Editor
/admin/analytics                → Analytics Dashboard
/admin/payments                 → Payments & Payouts
/admin/system                   → System Settings
/admin/logs                     → Activity Logs
/admin/support                  → Support Tickets
/admin/reports                  → Reports
```

### 5.8 Ambassador Dashboard Routes (@egypthub/ambassador-dashboard)

```
/ambassador                     → Ambassador Home
/ambassador/commission           → Commission Dashboard
/ambassador/referrals           → Referral Management
/ambassador/earnings            → Earnings History
/ambassador/settings            → Settings
```

---

## 6. Reusable Design Tokens

### 6.1 Token Package (@egypthub/design-tokens)

**Current state:** Tokens exist but use the OLD color system (navy primary #0D3B66, light-mode defaults).

**Required changes:** Must be updated to match the new boards. See DESIGN_SYSTEM.md v2 for full spec.

**Token categories exported:**

| Category | Export | Type |
|----------|--------|------|
| Colors | `colors` | Object with primary, gold, surface, text, semantic, gradients |
| Typography | `typography` | Font families (Cairo, Poppins, Playfair), size scale, weights |
| Spacing | `spacing` | 4px grid scale (0-128) |
| Radius | `borderRadius` | sm (4px) → full (9999px) |
| Shadows | `shadows` | sm, md, lg, xl + gold-glow variants |
| Breakpoints | `breakpoints` | xs (0) → 3xl (1536px+) |
| Z-Index | `zIndex` | Base (0) → Max (9999) |
| Motion | `motion` | Transition durations, easings |
| Elevation | `elevation` | Level 0-4 with shadow + bg |

### 6.2 Token Distribution

```
@egypthub/design-tokens
    │
    ├── tailwind.config.ts (all apps extend this)
    ├── CSS custom properties in globals.css (runtime theming)
    └── TypeScript exports (for JS/TS usage)
```

### 6.3 CSS Custom Properties (globals.css)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0A0E17;
  --bg-secondary: #0D1220;
  --surface: #0F1420;
  --surface-elevated: #141B2D;
  --surface-hover: #1A2235;

  /* Gold system */
  --gold: #D4A24C;
  --gold-light: #E8C97A;
  --gold-dark: #B8862D;
  --gold-glow: rgba(212, 162, 76, 0.3);
  --gold-subtle: rgba(212, 162, 76, 0.12);
  --gold-border: rgba(212, 162, 76, 0.25);

  /* Text */
  --text-primary: #F5F7FA;
  --text-secondary: #8B95A5;
  --text-muted: #5A6478;

  /* Borders */
  --border: #1E2A3D;
  --border-light: #2A3A52;

  /* Semantic */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.6);
  --shadow-gold: 0 4px 14px rgba(212,162,76,0.25);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## 7. Engineering Milestones

### 7.1 Milestone Definitions

| # | Milestone | Gating Criteria | Date (Target) |
|---|-----------|----------------|---------------|
| M0 | Design tokens + Tailwind config updated | All tokens match boards, all apps compile | Week 1 |
| M1 | @egypthub/ui package published | All core components built, tests pass, Storybook up | Week 3 |
| M2 | Public website homepage live | Homepage renders correctly at all breakpoints, RTL OK | Week 5 |
| M3 | Destinations + Experiences pages live | Both list and detail pages functional | Week 7 |
| M4 | Auth flow complete | Login, signup, forgot password, reset all working | Week 8 |
| M5 | Traveler portal live | Dashboard, trips, bookings, favorites, profile, settings | Week 10 |
| M6 | AI Concierge live | Chat, voice, recommendations all functional | Week 13 |
| M7 | Booking flow complete | Full multi-step booking, payment, confirmation | Week 15 |
| M8 | Partner dashboard live | All partner screens functional | Week 18 |
| M9 | Admin dashboard live | All admin screens functional | Week 21 |
| M10 | Ambassador dashboard live | All ambassador screens functional | Week 22 |
| M11 | Launch | All apps deployed, bugs resolved, performance OK | Week 24 |

### 7.2 Dependency Gating

```
M0 → M1 → M2 → M3
        ↓
      M4 → M5 → M6
              ↓
            M7 → M8 → M9 → M10 → M11
```

M0 and M1 are hard gates — nothing starts without them.
M4 (auth) is a hard gate for M5 (traveler portal) and M6 (AI Concierge).
M5 is a soft gate for M7 (booking — can be built with mock auth).
M7 is a hard gate for M8-M10 (dashboards need booking data).

### 7.3 Quality Gates Per Milestone

Every milestone must pass:
- Lighthouse Performance ≥ 90
- First Contentful Paint ≤ 1.5s
- No accessibility violations (axe-core)
- RTL layout correctness verified
- Responsive at xs (320px), sm, md, lg, xl, 2xl (1536px)
- No console errors
- TypeScript strict mode compiles clean

---

## 8. Frontend Folder Architecture

### 8.1 Package (@egypthub/ui)

```
packages/ui/
├── src/
│   ├── core/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Icon/
│   │   └── Spinner/
│   ├── navigation/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── BottomNav/
│   │   ├── Tabs/
│   │   ├── Breadcrumb/
│   │   └── Pagination/
│   ├── overlay/
│   │   ├── Modal/
│   │   ├── Drawer/
│   │   ├── BottomSheet/
│   │   ├── Popover/
│   │   ├── Tooltip/
│   │   └── Toast/
│   ├── form/
│   │   ├── DatePicker/
│   │   ├── TimePicker/
│   │   ├── FileUpload/
│   │   ├── Toggle/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Select/
│   │   └── SearchInput/
│   ├── data/
│   │   ├── Table/
│   │   ├── StatCard/
│   │   ├── Chart/
│   │   ├── ProgressBar/
│   │   ├── Rating/
│   │   └── Timeline/
│   ├── feedback/
│   │   ├── Skeleton/
│   │   ├── Alert/
│   │   └── EmptyState/
│   ├── layout/
│   │   ├── Container/
│   │   ├── Grid/
│   │   ├── Stack/
│   │   ├── Section/
│   │   └── Divider/
│   ├── hooks/
│   │   ├── useBreakpoint.ts
│   │   ├── useClickOutside.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useLockedBody.ts
│   ├── utils/
│   │   ├── cn.ts (clsx + twMerge)
│   │   ├── formatCurrency.ts
│   │   ├── formatDate.ts
│   │   └── portal.ts
│   ├── index.ts
│   └── index.css (component styles)
├── tailwind.config.ts (shared preset)
├── tsconfig.json
├── package.json (@egypthub/ui)
└── vitest.config.ts
```

### 8.2 App (@egypthub/web)

```
apps/web/
├── src/
│   ├── app/
│   │   ├── layout.tsx                (RootLayout — fonts, metadata, providers)
│   │   ├── globals.css               (CSS custom properties, base styles)
│   │   ├── page.tsx                  (Homepage)
│   │   ├── explore/
│   │   │   ├── page.tsx              (Destinations List)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          (Destination Detail)
│   │   ├── experiences/
│   │   │   ├── page.tsx              (Experiences List)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          (Experience Detail)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            (DashboardLayout — sidebar + header)
│   │   │   ├── page.tsx              (Dashboard Home)
│   │   │   ├── trips/
│   │   │   ├── bookings/
│   │   │   ├── favorites/
│   │   │   ├── wallet/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── ai/
│   │   │   ├── page.tsx              (AI Concierge Welcome)
│   │   │   └── chat/
│   │   │       └── page.tsx          (Chat Interface)
│   │   └── booking/
│   │       └── [experienceId]/
│   │           ├── page.tsx           (Booking Flow Wrapper)
│   │           └── confirm/
│   │               └── page.tsx       (Confirmation)
│   │
│   ├── components/
│   │   ├── public/                   (Public website components)
│   │   │   ├── Hero/
│   │   │   ├── StatsBar/
│   │   │   ├── DestinationGrid/
│   │   │   ├── CategoryGrid/
│   │   │   ├── ExperienceCard/
│   │   │   ├── DestinationCard/
│   │   │   ├── FeaturedStories/
│   │   │   ├── HowItWorks/
│   │   │   ├── OfferSection/
│   │   │   ├── Testimonials/
│   │   │   ├── AboutSection/
│   │   │   ├── DownloadApp/
│   │   │   └── Footer/
│   │   ├── traveler/                 (Traveler portal components)
│   │   │   ├── TripCard/
│   │   │   ├── BookingCard/
│   │   │   ├── ReviewForm/
│   │   │   ├── WalletCard/
│   │   │   └── LoyaltyCard/
│   │   ├── ai/                       (AI Concierge components)
│   │   │   ├── ChatBubble/
│   │   │   ├── ChatInput/
│   │   │   ├── QuickReplyChip/
│   │   │   ├── SuggestionCard/
│   │   │   ├── TypingIndicator/
│   │   │   ├── VoiceRecorder/
│   │   │   └── AIRecCard/
│   │   ├── booking/                  (Booking flow components)
│   │   │   ├── Calendar/
│   │   │   ├── TimeSlotPicker/
│   │   │   ├── GuestCounter/
│   │   │   ├── AddonSelector/
│   │   │   ├── BookingSummary/
│   │   │   ├── PaymentSelector/
│   │   │   ├── ConfirmationCard/
│   │   │   └── QRCodeDisplay/
│   │   └── shared/                   (App-specific shared)
│   │       ├── EgyptianIcons/
│   │       ├── ParticlesBg/
│   │       └── SandWave/
│   │
│   ├── hooks/                        (App-specific hooks)
│   │   ├── useAuth.ts
│   │   ├── useBookings.ts
│   │   ├── useExperiences.ts
│   │   ├── useDestinations.ts
│   │   ├── useTrips.ts
│   │   ├── useFavorites.ts
│   │   ├── useAIChat.ts
│   │   ├── useNotifications.ts
│   │   └── useWallet.ts
│   │
│   ├── lib/                          (Utilities, API clients)
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── experiences.ts
│   │   │   ├── destinations.ts
│   │   │   ├── bookings.ts
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   └── ai.ts
│   │   ├── i18n/
│   │   ├── utils/
│   │   └── validators/
│   │
│   └── providers/                    (React context providers)
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       ├── I18nProvider.tsx
│       ├── ToastProvider.tsx
│       └── QueryProvider.tsx
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

### 8.3 App (@egypthub/partner-dashboard)

```
apps/partner-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx                (PartnerLayout — sidebar + header)
│   │   ├── globals.css
│   │   ├── page.tsx                  (Partner Dashboard Home)
│   │   ├── offers/
│   │   ├── bookings/
│   │   ├── analytics/
│   │   ├── payouts/
│   │   └── settings/
│   ├── components/
│   │   ├── sidebar/
│   │   ├── header/
│   │   ├── OfferForm/
│   │   ├── PayoutCard/
│   │   └── PartnerAnalytics/
│   ├── hooks/
│   ├── lib/
│   └── providers/
├── tailwind.config.ts
└── package.json
```

### 8.4 App (@egypthub/admin-dashboard)

```
apps/admin-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── partners/
│   │   ├── bookings/
│   │   ├── content/
│   │   ├── analytics/
│   │   ├── payments/
│   │   ├── system/
│   │   ├── logs/
│   │   └── support/
│   ├── components/
│   │   ├── sidebar/
│   │   ├── header/
│   │   ├── UsersTable/
│   │   ├── PartnersTable/
│   │   └── ActivityLogTable/
│   ├── hooks/
│   ├── lib/
│   └── providers/
├── tailwind.config.ts
└── package.json
```

### 8.5 Tailwind Config Architecture

```
packages/ui/tailwind.config.ts (SHARED PRESET)
    │
    ├── apps/web/tailwind.config.ts          (extends preset + public site extensions)
    ├── apps/partner-dashboard/tailwind.config.ts (extends preset)
    ├── apps/admin-dashboard/tailwind.config.ts   (extends preset)
    └── apps/ambassador-dashboard/tailwind.config.ts (extends preset)
```

---

## 9. State Management Strategy

### 9.1 Approach

**Primary:** React Server Components (RSC) + Server Actions (Next.js 14)
**Client State:** React Context (auth, theme, i18n, notifications)
**Server State:** TanStack Query (React Query) for data fetching/caching
**Form State:** React Hook Form + Zod validation
**URL State:** Next.js search params for filters, pagination, tabs

### 9.2 State Map

| State Type | What | Where | Tool |
|-----------|------|-------|------|
| **Server data** | Experiences, destinations, bookings, users, partners | Server component fetch | RSC fetch |
| **Client data** | Filtered/search data with real-time updates | Client components | TanStack Query |
| **Auth state** | User, token, permissions | AuthProvider (Context) | React Context + JWT |
| **Theme** | Dark mode (always dark now) | ThemeProvider (Context) | CSS variables |
| **Locale** | Arabic/English | I18nProvider (Context) | React Context + next-intl |
| **Notifications** | Toast queue | ToastProvider (Context) | React Context |
| **Form** | Booking, profile, offer forms | Component-level | React Hook Form + Zod |
| **URL params** | Filters, sort, pagination, tabs | URL search params | useSearchParams |
| **AI Chat** | Conversation history, messages | TanStack Query + Context | WebSocket + React Query |

### 9.3 Data Flow Pattern

```
Server Component (fetch)
    │
    ├── Renders initial HTML (no JS needed)
    ├── Passes initial data to client components
    │
    ▼
Client Component (hydration)
    │
    ├── TanStack Query picks up initial data
    ├── Manages refetching, caching, optimistic updates
    │
    ▼
User Interaction
    │
    ├── Server Action (form submission, mutation)
    ├── TanStack Query invalidation
    ├── Optimistic UI update
    │
    ▼
UI Re-render
```

### 9.4 Cache Strategy

| Data | Cache Duration | Stale Time | Revalidation |
|------|---------------|------------|--------------|
| Public experiences | 5 minutes | 2 minutes | On visibility change |
| Destinations | 10 minutes | 5 minutes | On page focus |
| User bookings | 1 minute | 30 seconds | On mutation |
| User profile | 5 minutes | 1 minute | On edit |
| Dashboard stats | 30 seconds | 10 seconds | Auto-refresh |
| AI responses | Session | — | Not cached |
| Pages content | 10 minutes | 5 minutes | On revalidate |

### 9.5 API Client Layer

```
lib/api/
├── client.ts                  (fetch wrapper with auth, error handling)
├── experiences.ts             (experience CRUD operations)
├── destinations.ts            (destination queries)
├── bookings.ts                (booking CRUD + checkout)
├── auth.ts                    (login, signup, logout, refresh)
├── users.ts                   (profile, preferences)
├── partners.ts                (partner operations)
├── admin.ts                   (admin operations)
├── ai.ts                      (AI chat, voice, recommendations)
└── payments.ts                (payment operations)
```

---

## 10. Responsive Strategy

### 10.1 Breakpoint Map

| Alias | Min Width | Target | Layout |
|-------|-----------|--------|--------|
| `xs` | 0 | Phone (portrait) | Single column, bottom nav |
| `sm` | 480px | Phone (landscape) | Single column, bottom nav |
| `md` | 640px | Tablet (portrait) | 2-column, collapsible sidebar |
| `lg` | 768px | Tablet (landscape) | 2-column, sidebar visible |
| `xl` | 1024px | Desktop | Multi-column, full sidebar |
| `2xl` | 1280px | Desktop wide | Multi-column, max-width 1440px |
| `3xl` | 1536px | Desktop ultra-wide | Centered container, extra whitespace |

### 10.2 Responsive Tactics

| Pattern | xs (0-479) | sm (480-639) | md (640-767) | lg (768-1023) | xl (1024+) |
|---------|------------|--------------|--------------|---------------|------------|
| **Columns** | 4 | 4 | 8 | 8 | 12 |
| **Gutter** | 16px | 16px | 16px | 24px | 24-32px |
| **Margin** | 16px | 16px | 32px | 32px | 48-64px |
| **Navigation** | Bottom tabs | Bottom tabs | Bottom tabs | Collapsible sidebar | Full sidebar |
| **Header** | Hamburger | Hamburger | Hamburger | Full nav | Full nav |
| **Cards per row** | 1 | 2 | 2 | 3 | 4 |
| **Hero height** | 70vh | 80vh | 90vh | 100vh | 100vh |
| **Section padding** | 64px 0 | 64px 0 | 80px 0 | 96px 0 | 96px 0 |
| **Font (h1)** | 32px | 36px | 42px | 48px | 56-64px |
| **Font (body)** | 14px | 14px | 15px | 16px | 16px |
| **Touch targets** | ≥44px | ≥44px | ≥44px | ≥40px | ≥36px |

### 10.3 Layout Strategies

| Strategy | Implementation |
|----------|---------------|
| **Mobile-first CSS** | All base styles are mobile; `@media (min-width: ...)` overrides for larger |
| **Container queries** | Used for card components that live in varying grid contexts |
| **Fluid typography** | `clamp()` for h1-h3: `clamp(2rem, 5vw, 4rem)` |
| **Fluid spacing** | `clamp()` for section padding: `clamp(3rem, 8vw, 6rem)` |
| **Image responsiveness** | `next/image` with `sizes` attribute, WebP format |
| **Conditional rendering** | Server component: render mobile/desktop variants based on UA detection |
| **Slide-in drawers** | Mobile sidebar and filters appear as drawers from bottom/right |
| **Sticky bottom bars** | Booking CTA, chat input stick to bottom on mobile |
| **Touch optimization** | All interactive elements ≥ 44px on touch devices |
| **Safe areas** | `env(safe-area-inset-bottom)` for notched devices |

### 10.4 Component-Specific Responsive Rules

| Component | Mobile (<768) | Tablet (768-1023) | Desktop (1024+) |
|-----------|---------------|-------------------|-----------------|
| **Header** | Logo + Hamburger | Logo + Hamburger | Logo + Nav + Auth |
| **Hero** | Text centered | Text left, image right | Split layout, Ken Burns |
| **Card grid** | 1 column | 2 columns | 3-4 columns |
| **Destination card** | Full width | 1/2 width | 1/3 width |
| **Experience card** | Full width | 1/2 width | 1/3-1/4 width |
| **Sidebar** | Hidden (drawer) | Collapsible | Always visible |
| **Bottom nav** | Visible | Visible | Hidden |
| **Table** | Card view (stacked) | Horizontal scroll | Full table |
| **Modal** | Full screen drawer | Bottom sheet | Centered modal |
| **Form** | Single column | Single column | Multi-column |
| **Booking steps** | Vertical stepper | Vertical stepper | Horizontal stepper |
| **AI Chat** | Full width | Full width | Side panel |
| **Charts** | Simple, small | Standard | Complex, large |

### 10.5 Touch vs Mouse Optimization

| Interaction | Touch | Mouse |
|------------|-------|-------|
| **Hover states** | Tap equivalent | CSS hover |
| **Tooltips** | Tap to show/hide | Hover |
| **Dropdowns** | Tap to open, tap outside to close | Hover/click |
| **Swiping** | Swipe for carousels, swipe to delete | Arrow buttons |
| **Long press** | Context menu | Right click |
| **Drag** | Touch drag | Mouse drag |
| **Pinch** | Map zoom (mobile) | Scroll wheel |

---

## Phase 1: Foundation

**Objective:** Establish the design system, component library, and shared infrastructure that all apps depend on.

**Screens:** None (no user-facing screens)

**Components:**
- `@egypthub/design-tokens` — Complete color system, typography, spacing, radius, shadows, z-index, breakpoints
- `@egypthub/ui` core components (tier 1-2):
  - Button (all variants, states, sizes)
  - Input (text, search, with icon)
  - Select (dropdown, searchable)
  - Card (default, hover, featured, glass)
  - Avatar (all sizes, with status)
  - Badge (all colors, variants)
  - Icon (wrapper for Heroicons + custom Egyptian icons)
  - Spinner (gold, all sizes)
  - Toggle switch
  - Checkbox
  - Radio
  - Skeleton loader
  - StatCard
  - Rating stars
  - ProgressBar
  - Alert / Banner
  - EmptyState
  - Container, Grid, Stack, Section, Divider (layout primitives)
- `@egypthub/ui` navigation components (tier 3-4):
  - Header (glass morphism, transparent → scrolled states)
  - Sidebar (expanded, collapsed, mobile drawer)
  - BottomNav (5-tab mobile navigation)
  - Tabs (underline, pill variants)
  - Breadcrumb
  - Pagination
- `@egypthub/ui` overlay components (tier 3):
  - Modal
  - Drawer
  - BottomSheet
  - Popover
  - Tooltip
  - Toast (notification system)
- `@egypthub/ui` hooks (useBreakpoint, useClickOutside, useMediaQuery, useScrollPosition, useLockedBody)
- `@egypthub/ui` utilities (cn, formatCurrency, formatDate, portal)

**Dependencies:**
- Token packages: `@egypthub/design-tokens` (updated first)
- Third-party: `clsx`, `tailwind-merge`, `framer-motion` (existing), `react-icons` (existing)
- Build: TypeScript, `tsup` or `tsc` for package build

**Estimated complexity:** HIGH (foundation for entire product)

**Risks:**
- Design token inconsistency with boards → MUST validate all tokens against boards before build
- Package configuration (bundling, tree-shaking, type exports) — may cause downstream app issues
- Component API surface changes during later phases — invest in design review before publishing
- RTL testing must be done from day one — CSS logical properties must be used
- No Storybook currently — consider adding for component documentation

---

## Phase 2: Public Website

**Objective:** Build the public-facing website — homepage, destinations, experiences, and informational pages.

**Screens:**
- Homepage (hero, stats, destinations, categories, featured, how it works, offers, testimonials, CTA)
- Destinations List (grid + filters + map toggle)
- Destination Detail (hero carousel, experiences grid, map, reviews)
- Experiences List (searchable, filterable grid)
- Experience Detail (gallery, info, booking CTA, reviews)
- About page
- Contact page
- FAQ page
- Static pages (terms, privacy)

**Components:**
- Hero (Ken Burns slideshow, oval shapes, typewriter, CTA)
- StatsBar (animated counters, gold numbers)
- DestinationGrid (responsive card grid)
- DestinationCard (large featured + small variants)
- CategoryGrid (6 categories with icons)
- ExperienceCard (image, rating, price, gold border on hover)
- FeaturedStories (carousel/slider)
- CityWheel (horizontal carousel with 3D effect)
- HowItWorks (3-step process section)
- OfferSection (countdown, discount badges, progress)
- Testimonials (carousel with quotes, avatars, ratings)
- AboutSection (image collage + text split)
- DownloadApp (app store buttons)
- Footer (4-column, social links, quick links)
- SandWave (decorative SVG divider)
- ParticlesBg (gold floating particles)
- GallerySection (image gallery component)
- MapSection (interactive map with markers)

**Dependencies:**
- Phase 1 (all UI components, design tokens)
- API endpoints for experiences, destinations (from listings-service)
- `framer-motion` for animations (Ken Burns, slide, parallax)
- `react-intersection-observer` (existing) for scroll animations
- `react-countup` (existing) for stat animations

**Estimated complexity:** HIGH (many unique components, animations, responsive challenges)

**Risks:**
- Hero image loading performance — must use Next.js Image with proper sizing
- Ken Burns animation performance on mobile — test on low-end devices
- Map integration (Leaflet/Mapbox) dependency — external, may change
- RTL mirroring of all animations — framer-motion requires explicit RTL handling
- Content gaps — destination/experience data must exist in CMS/API
- Offer countdown timer — must handle timezone differences

---

## Phase 3: Auth + Traveler Portal

**Objective:** Build authentication flow and the authenticated traveler portal with full CRUD for trips, bookings, and profile.

**Screens:**
- Login (email/phone + password, social login)
- Sign Up (name, email, phone, password, terms)
- Forgot Password (email input → reset link)
- Reset Password (new password form)
- Email / Phone Verification
- Dashboard Home (welcome, stats, upcoming trips, recent bookings, AI suggestions)
- My Trips (list with tabs: upcoming, past, cancelled)
- Trip Details (day-by-day itinerary, map, activities, documents)
- My Bookings (list with tabs: upcoming, past, cancelled)
- Booking Details (QR code, receipt, review CTA)
- Favorites (saved experiences, destinations, partners)
- Wallet & Loyalty (balance, points, tier, payment methods, transaction history)
- Profile (avatar, personal info, language, notification settings)
- Settings (account, privacy, security, danger zone)
- Notifications (full list with types, read/unread states)

**Components:**
- Auth forms (login, signup, forgot/reset password, verification)
- SocialLoginButtons (Google, Facebook, Apple)
- DashboardLayout (sidebar + header + content area)
- DashboardSidebar (nav items with icons, collapse toggle, user card)
- DashboardHeader (search, date range, notifications badge, avatar dropdown)
- MobileBottomNav (5-tabs: Home, Explore, AI, Bookings, Profile)
- TripCard (destination, dates, status, actions)
- TripTimeline (day-by-day with activities)
- BookingCard (status color, date, amount, actions)
- BookingSummary (experience, date, guests, price, QR)
- ReviewForm (star rating, text, photos)
- ReviewCard (avatar, rating, text, date)
- WalletCard (balance, points, tier)
- LoyaltyCard (tier progress, benefits)
- PaymentMethodCard (card icon, last 4 digits, expiry)
- TransactionItem (date, description, amount, status)
- NotificationCard (type icon, title, description, timestamp)
- NotificationFilter (type chips)
- ProfileHeader (avatar, name, bio, stats)
- SettingsItem (icon, label, description, action)
- EmptyState (no trips, no bookings, no favorites)
- ConfirmDialog (cancel trip, delete account, etc.)

**Dependencies:**
- Phase 1 (all UI components, navigation, overlays)
- Phase 2 (Header, Footer reused for public sections)
- Auth service API endpoints (login, signup, token refresh)
- User service API endpoints (profile CRUD, preferences)
- TanStack Query for server state management

**Estimated complexity:** HIGH (auth security, data-heavy dashboards, multiple list/detail pairs)

**Risks:**
- Auth token management (JWT refresh, storage, race conditions) — must be bulletproof
- Session expiry — handle gracefully with redirect to login
- Optimistic updates on favorites/bookings — must handle rollback on failure
- Real-time notification updates — polling vs WebSocket decision
- Password validation complexity across languages (Arabic + English)
- Social login integration — multiple providers, edge cases
- Mobile sidebar vs bottom nav coexistence — breaking point must be smooth

---

## Phase 4: Booking Flow + AI Concierge

**Objective:** Build the complete multi-step booking experience and the AI-powered concierge system.

**Screens:**
- AI Concierge Welcome (avatar, greeting, quick actions, examples)
- Chat Interface (message list, chat input, voice, suggestions)
- Voice Interface (microphone, waveform, transcription)
- AI Recommendations (curated suggestion cards, match percentage)
- AI Trip Suggestions (day-by-day itinerary, edit/save)
- Conversation History (list of past conversations)
- Booking Calendar (month view, availability)
- Time Selection (time slot grid)
- Guest Details (name inputs, special requirements)
- Add-ons Selection (optional extras with quantity)
- Booking Summary (full breakdown before payment)
- Payment (method selector, card input, Apple Pay/Google Pay, save card)
- Confirmation (success animation, QR code, reference, receipt)
- Ticket / QR Code (display for check-in)

**Components:**
- ChatBubble (user: gold right, AI: surface left)
- ChatInputBar (text input, send, voice, attachment)
- QuickReplyChip (rounded pill, gold border on select)
- SuggestionCard (image, title, match %, CTA)
- TypingIndicator (3 gold dots animation)
- VoiceRecorder (mic button, waveform, timer)
- AIRecCard (horizontal/vertical, match badge, why section)
- TripSuggestionCard (day, activities, times, costs)
- ConversationListItem (preview, timestamp, topic tags)
- BookingStepper (horizontal/vertical progress indicator)
- Calendar (month grid, available/unavailable dates)
- TimeSlotPicker (grid of time slots, gold selected)
- GuestCounter (minus/count/plus with min/max)
- GuestForm (name, email, phone, special requests)
- AddonCard (title, price, quantity selector)
- BookingSummaryCard (experience, date, guests, add-ons, total)
- PriceBreakdown (line items, discount, tax, total)
- PaymentMethodSelector (saved cards, new card, Apple Pay, Google Pay)
- CardInputForm (number, expiry, CVV, name)
- ConfirmationAnimation (success checkmark, subtle motion)
- QRCodeDisplay (QR code, reference, instructions)
- ReceiptView (downloadable PDF summary)

**Dependencies:**
- Phase 1 (all UI components, form components, overlays)
- Phase 3 (auth context for user data, payment methods)
- Booking service API endpoints
- AI service (WebSocket for real-time chat, REST for recommendations)
- Payment gateway integration (stripe or similar)
- `react-hook-form` + `zod` for booking form validation

**Estimated complexity:** VERY HIGH (two complex systems, payment integration, real-time AI)

**Risks:**
- Payment gateway PCI compliance — never store raw card data, use tokenization
- Booking availability race conditions — two users booking same slot
- AI chat real-time connection — WebSocket fallback, reconnection logic
- Voice recognition accuracy — test across Arabic dialects
- Booking state across multi-step form — handle browser refresh, back button
- Session timeout during payment — save draft booking
- Currency formatting — EGP with proper locale formatting
- Timezone handling — all times in Egypt timezone, display in user timezone
- Add-ons inventory — real-time availability check

---

## Phase 5: Dashboards

**Objective:** Build the three operational dashboards — Partner, Admin, and Ambassador.

### 5A: Partner Dashboard

**Screens:**
- Dashboard Home (revenue chart, key metrics, recent bookings, performance)
- Offers Management (list/create/edit/draft/expire)
- Create/Edit Offer Form
- Bookings Management (table with filters, status actions)
- Booking Details (customer info, experience, status management)
- Analytics (revenue chart, booking chart, ratings, top experiences, demographics)
- Payouts (balance, withdraw, history, bank settings)
- Settings (business info, logo, contact, hours, cancellation policy)
- Support (tickets, FAQ, knowledge base)

**Components:**
- PartnerLayout (sidebar + header + content)
- PartnerSidebar (nav with collapse, gold active indicator)
- PartnerHeader (search, date range, notifications, avatar)
- MetricCard (icon, value, label, trend)
- RevenueChart (line/area, date range toggle)
- BookingChart (bar, grouped by status)
- OffersTable (name, status, price, bookings, actions)
- OfferForm (title, description, images, pricing, availability, cancellation)
- BookingsTable (customer, experience, date, amount, status, actions)
- BookingDetailModal (full info, status management)
- AnalyticsGrid (charts, filters, export)
- PayoutCard (available balance, pending, withdrawn)
- PayoutHistoryTable (date, amount, status)
- BankAccountForm (account details, verification)
- BusinessSettingsForm (info, logo, contact, hours)
- SupportTicketCard (subject, status, priority, date)
- TicketThread (messages, internal notes)

### 5B: Admin Dashboard

**Screens:**
- Dashboard Home (platform KPIs, revenue, bookings, user growth, activity feed)
- User Management (table with search, filters, roles, status)
- User Detail (info, activity, bookings, status management)
- Partner Management (table with verification, performance)
- Partner Detail (info, analytics, bookings, verification actions)
- Booking Management (table with advanced filters, refunds)
- Booking Detail (full transaction view, refund processing)
- Content Management (pages, banners, promotions)
- Content Editor (rich text, images, SEO fields, publish controls)
- Analytics (revenue, users, conversion, geographic, devices)
- Payments (transactions table, refunds, payouts, disputes)
- System Settings (general, email, API keys, feature flags, maintenance)
- Activity Logs (searchable, filterable audit trail)
- Support Tickets (queue, assign, resolve, report)

**Components:**
- AdminLayout (sidebar + header + content)
- AdminSidebar (extended nav, section headers)
- AdminHeader (search, date range, global notifications)
- AdminMetricCard (revenue, bookings, users, growth)
- RevenueChart (area, monthly, yearly)
- BookingPieChart (status distribution)
- UserGrowthChart (line, cumulative)
- UsersTable (id, name, email, role, status, joined, actions)
- PartnersTable (name, verification, rating, bookings, revenue, actions)
- BookingsTable (reference, customer, experience, amount, date, status)
- ContentTable (title, type, status, author, updated)
- ContentEditor (rich text, image upload, SEO, publish/draft)
- TransactionTable (id, user, amount, method, status, date)
- RefundModal (reason, amount, confirm)
- ActivityLogTable (timestamp, user, action, details, IP)
- LogDetailExpand (full payload, metadata)
- TicketQueue (list with priority, assignment)
- TicketDetail (conversation, internal notes, resolution)
- FeatureFlagCard (name, description, toggle, environment)
- MaintenanceBanner (mode toggle, message, timer)

### 5C: Ambassador Dashboard

**Screens:**
- Home (commission stats, recent referrals, leaderboard)
- Commission Dashboard (earnings chart, breakdown)
- Referral Management (referral links, track conversions)
- Earnings History (transactions, payouts, pending)
- Settings (profile, payout method, preferences)

**Components:**
- AmbassadorLayout (sidebar + header)
- AmbassadorSidebar (compact nav, commission focus)
- CommissionCard (total earned, pending, paid)
- ReferralLinkCard (copyable link, QR, share options)
- ReferralTable (referred user, status, commission, date)
- EarningsChart (line, monthly/yearly)
- LeaderboardCard (rank, earnings, referrals)
- PayoutSettingsForm (bank/PayPal, threshold, schedule)

**Dependencies:**
- Phase 1 (all UI components, navigation, overlays)
- Phase 3 (auth for admin/partner login)
- Phase 4 (booking data for analytics)
- TanStack Query for real-time dashboard data
- Chart library (recharts, nivo, or chart.js wrapper)
- Export functionality (PDF/CSV generation)

**Estimated complexity:** VERY HIGH (three full dashboards, complex data viz, real-time analytics)

**Risks:**
- Chart performance with large datasets — virtualize, aggregate, or lazy load
- Dashboard data freshness — polling intervals vs WebSocket push
- Date range filtering — timezone-aware, localized formatting
- Role-based access control — admin vs partner vs ambassador permissions must be locked
- Export large datasets — server-side generation vs client-side
- Activity log volume — pagination, search indexing, retention policy
- Content editor — rich text complexity, image upload pipeline
- Feature flags — must be cached, not cause page flicker on toggle
- Permission denial must be graceful — hide vs disable vs show
