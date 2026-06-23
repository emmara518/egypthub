# EgyptHub — Visual Architecture

> **Version:** 2.0
> **Source of Truth:** Visual Boards (9 images)
> **Focus:** Navigation systems, layout patterns, dashboard architecture

---

## 1. Navigation Architecture

### 1.1 Public Website — Top Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  [Pyramid Icon] EGYPTHUB          Home  Destinations  Experiences  AI    [Login]  [Sign Up]  │
│                                                                       │
└─────────────────────────────────────────────────────────────────┘

States:
├── Transparent (hero section) — no background, white text
├── Scrolled — glass morphism (#0D3B66/95 + backdrop-blur-lg)
├── Mobile — hamburger menu → slide-in drawer
```

**Desktop Layout:**
- Fixed top, full width
- Height: 72px
- Logo (left), Nav links (center), Auth buttons (right)
- Glass morphism on scroll (>30px from top)

**Mobile Layout:**
- Hamburger icon triggers slide-in drawer from right
- Full navigation links
- Auth buttons at bottom

### 1.2 Traveler Portal — Sidebar + Top Bar

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  [Search]              [Notifications] [Avatar ▼]  │
│  Logo    ├────────────────────────────────────────────────────┤
│          │                                                    │
│  Dashboard│  Main Content Area                               │
│  My Trips │                                                   │
│  Bookings │                                                   │
│  Favorites│                                                   │
│  AI Concierge                                                  │
│  Wallet   │                                                   │
│  Profile  │                                                   │
│  Settings │                                                   │
│          │                                                   │
│  [Logout] │                                                   │
└──────────┴────────────────────────────────────────────────────┘

States:
├── Expanded (desktop) — 240px width
├── Collapsed (tablet) — 64px width, icons only
├── Overlay (mobile) — full-screen slide-in
```

**Sidebar Specs:**
- Width: 240px expanded, 64px collapsed
- Background: Surface (#0F1420)
- Border-right: 1px solid #1E2A3D
- Active item: Gold left border (3px), gold text, gold icon
- Hover: Surface-hover background
- Collapse toggle: Bottom of sidebar

### 1.3 Mobile — Bottom Tab Navigation

```
┌─────────────────────────────────────────┐
│                                         │
│           Main Content                  │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  🏠      🔍      🤖      ❤️      👤   │
│  Home   Explore   AI    Bookings Profile│
└─────────────────────────────────────────┘

Active state: Gold icon + Gold label
Inactive state: Muted icon + Muted label
```

**Bottom Nav Specs:**
- Height: 64px (iOS safe area included)
- Background: Surface with backdrop-blur
- Border-top: 1px solid #1E2A3D
- 5 tabs: Home, Explore, AI Concierge, Bookings, Profile
- Active: Gold icon + gold text
- Inactive: Muted icon + muted text
- Badge: Red dot for notifications

### 1.4 Partner/Admin Dashboard — Sidebar + Top Bar

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  [Search]    [Date Range]   [Notifications] [Profile]│
│  Logo    ├────────────────────────────────────────────────────┤
│          │                                                    │
│  Dashboard│  Main Content Area                               │
│  Offers  │                                                   │
│  Bookings│                                                   │
│  Analytics│                                                   │
│  Payouts │                                                   │
│  Settings│                                                   │
│          │                                                   │
│  [Collapse]│                                                   │
└──────────┴────────────────────────────────────────────────────┘
```

**Dashboard Sidebar Specs:**
- Width: 260px expanded, 72px collapsed
- Background: Surface (#0F1420)
- Border-right: 1px solid #1E2A3D
- Active item: Gold left border, gold icon, gold text
- Section headers: Uppercase, muted, small text
- Collapse toggle: Icon at bottom

### 1.5 Mobile Dashboard — Bottom Tab + Hamburger

```
┌─────────────────────────────────────────┐
│  ☰  Dashboard              [Search] 🔔  │
├─────────────────────────────────────────┤
│                                         │
│           Main Content                  │
│                                         │
├─────────────────────────────────────────┤
│  📊    📦    📅    💰    ⚙️            │
│ Home Offers Bookings Payouts Settings   │
└─────────────────────────────────────────┘
```

---

## 2. Layout Architecture

### 2.1 Public Website Layout

```
┌─────────────────────────────────────────┐
│              Navigation (72px)           │
├─────────────────────────────────────────┤
│                                         │
│              Hero Section               │
│              (100vh min)                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         Stats Bar (full width)          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Destinations Grid (max-w: 1440px)    │
│    padding: 0 64px                      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Categories Grid (max-w: 1440px)      │
│    padding: 96px 64px                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Featured Experiences (full width)    │
│    padding: 96px 0                       │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    How It Works (max-w: 1200px)         │
│    padding: 96px 64px                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Special Offers (full width)          │
│    padding: 96px 64px                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    AI Concierge Preview                 │
│    padding: 96px 64px                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Testimonials (full width)            │
│    padding: 96px 0                       │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Download App (full width)            │
│    padding: 96px 64px                   │
│                                         │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

### 2.2 Dashboard Layout

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  Top Bar (56px)                                    │
│ Sidebar  ├────────────────────────────────────────────────────┤
│ (260px)  │                                                    │
│          │  Main Content Area                                 │
│          │  padding: 24px 32px                                │
│          │                                                    │
│          │  ┌──────────┬──────────┬──────────┬──────────┐    │
│          │  │ Stat Card│ Stat Card│ Stat Card│ Stat Card│    │
│          │  └──────────┴──────────┴──────────┴──────────┘    │
│          │                                                    │
│          │  ┌─────────────────────┬─────────────────────┐    │
│          │  │                     │                     │    │
│          │  │   Chart (60%)       │   Chart (40%)       │    │
│          │  │                     │                     │    │
│          │  └─────────────────────┴─────────────────────┘    │
│          │                                                    │
│          │  ┌─────────────────────────────────────────────┐  │
│          │  │              Data Table                      │  │
│          │  │              (full width)                    │  │
│          │  └─────────────────────────────────────────────┘  │
│          │                                                    │
└──────────┴────────────────────────────────────────────────────┘
```

### 2.3 Mobile App Layout

```
┌─────────────────────────────────────────┐
│  Status Bar (44px)                       │
├─────────────────────────────────────────┤
│  Top Bar (56px)                          │
├─────────────────────────────────────────┤
│                                         │
│           Main Content                  │
│           (scrollable)                  │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  Bottom Tab Bar (64px + safe area)      │
└─────────────────────────────────────────┘
```

---

## 3. Dashboard Architecture

### 3.1 Admin Dashboard — Screen Map

```
Admin Dashboard
├── Overview
│   ├── Key Metrics Cards (4)
│   │   ├── Total Revenue
│   │   ├── Total Bookings
│   │   ├── Active Users
│   │   └── Growth Rate
│   ├── Revenue Chart (Line/Area - 12 months)
│   ├── Booking Statistics (Pie chart)
│   ├── Recent Activity Feed
│   └── Top Performers List
│
├── Users
│   ├── Users Table (search, filter, sort)
│   ├── User Detail Modal
│   ├── Bulk Actions
│   └── User Activity Log
│
├── Partners
│   ├── Partners Table
│   ├── Verification Queue
│   ├── Partner Detail Page
│   └── Partner Analytics
│
├── Bookings
│   ├── Bookings Table (date range, status filter)
│   ├── Booking Detail Modal
│   ├── Refund Management
│   └── Booking Analytics
│
├── Content
│   ├── Pages Management
│   ├── Banners Management
│   ├── Promotions
│   └── SEO Settings
│
├── Analytics
│   ├── Revenue Analytics
│   ├── User Analytics
│   ├── Conversion Funnel
│   ├── Geographic Distribution
│   └── Device Breakdown
│
├── Payments
│   ├── Transactions Table
│   ├── Refund Management
│   ├── Payout Processing
│   └── Financial Reports
│
├── System
│   ├── General Settings
│   ├── Email Templates
│   ├── API Keys
│   ├── Feature Flags
│   └── Maintenance Mode
│
└── Logs
    ├── Activity Logs Table
    ├── Security Logs
    └── Audit Trail
```

### 3.2 Partner Dashboard — Screen Map

```
Partner Dashboard
├── Overview
│   ├── Key Metrics Cards (4)
│   │   ├── Total Revenue
│   │   ├── Total Bookings
│   │   ├── Average Rating
│   │   └── Total Reviews
│   ├── Revenue Chart (Line - 30 days)
│   ├── Recent Bookings Table
│   ├── Performance Chart
│   └── Quick Actions
│
├── Offers
│   ├── Offers List/Grid
│   ├── Create/Edit Offer Form
│   ├── Offer Status (Active, Draft, Expired)
│   └── Offer Analytics
│
├── Bookings
│   ├── Bookings Table
│   ├── Booking Detail
│   ├── Confirm/Reject Actions
│   └── Booking History
│
├── Analytics
│   ├── Revenue Analytics
│   ├── Booking Analytics
│   ├── Rating Distribution
│   ├── Top Experiences
│   └── Customer Demographics
│
├── Payouts
│   ├── Balance Card
│   ├── Withdraw Button
│   ├── Payout History
│   └── Bank Account Settings
│
├── Settings
│   ├── Business Info
│   ├── Logo Upload
│   ├── Contact Details
│   ├── Operating Hours
│   ├── Cancellation Policy
│   └── Notification Preferences
│
└── Support
    ├── Ticket List
    ├── Create Ticket Form
    ├── FAQ
    └── Knowledge Base
```

### 3.3 Traveler Portal — Screen Map

```
Traveler Portal
├── Dashboard
│   ├── Welcome Header
│   ├── Quick Stats (4)
│   │   ├── Trips Count
│   │   ├── Bookings Count
│   │   ├── Favorites Count
│   │   └── Loyalty Points
│   ├── Upcoming Trips Card
│   ├── Recent Bookings
│   └── AI Suggestions
│
├── My Trips
│   ├── Trip List (tabs: Upcoming, Past, Cancelled)
│   ├── Trip Cards
│   └── Trip Details
│       ├── Day-by-day Itinerary
│       ├── Activity Cards
│       ├── Map with Route
│       ├── Documents
│       └── Cost Summary
│
├── Bookings
│   ├── Bookings List (tabs: Upcoming, Past, Cancelled)
│   ├── Booking Cards
│   └── Booking Details
│       ├── QR Code
│       ├── Receipt
│       └── Review Form
│
├── Favorites
│   ├── Saved Experiences
│   ├── Saved Destinations
│   └── Saved Partners
│
├── AI Concierge
│   ├── Chat Interface
│   ├── Voice Interface
│   ├── Recommendations
│   ├── Trip Suggestions
│   └── Conversation History
│
├── Wallet & Loyalty
│   ├── Balance Card
│   ├── Loyalty Tier
│   ├── Points History
│   ├── Payment Methods
│   └── Transaction History
│
├── Profile
│   ├── Avatar
│   ├── Personal Info
│   ├── Language Preference
│   ├── Notification Settings
│   └── Connected Accounts
│
├── Notifications
│   ├── Notification List
│   ├── Notification Types
│   └── Notification Settings
│
└── Settings
    ├── Account Settings
    ├── Privacy Settings
    ├── Security Settings
    └── Danger Zone (Delete Account)
```

---

## 4. Responsive Breakpoints

| Breakpoint | Width | Layout | Navigation |
|------------|-------|--------|------------|
| `xs` | 0–479px | Single column | Bottom tabs |
| `sm` | 480–639px | Single column | Bottom tabs |
| `md` | 640–767px | 2 columns | Bottom tabs |
| `lg` | 768–1023px | Sidebar + content | Sidebar |
| `xl` | 1024–1279px | Sidebar + content | Sidebar |
| `2xl` | 1280–1535px | Sidebar + content | Sidebar |
| `3xl` | 1536px+ | Sidebar + content | Sidebar |

---

## 5. Grid System

### 5.1 Public Website

```css
/* Container */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px; /* 2xl */
}

/* Responsive padding */
@media (max-width: 1279px) { padding: 0 48px; }
@media (max-width: 1023px) { padding: 0 32px; }
@media (max-width: 767px) { padding: 0 16px; }

/* Destination Grid */
.destination-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Card spans */
.destination-card.large { grid-column: span 6; }
.destination-card.small { grid-column: span 3; }
.destination-card.full { grid-column: span 12; }
```

### 5.2 Dashboard

```css
/* Dashboard grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Stat cards */
.stat-card { grid-column: span 1; }

/* Charts */
.chart-large { grid-column: span 3; }
.chart-medium { grid-column: span 2; }
.chart-small { grid-column: span 1; }

/* Table */
.data-table { grid-column: span 4; }
```

### 5.3 Mobile

```css
/* Mobile grid */
.mobile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Card spans */
.card-full { grid-column: span 4; }
.card-half { grid-column: span 2; }
```

---

## 6. Component Layout Patterns

### 6.1 Card Layout

```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │      Image (4:3)      │  │
│  │                       │  │
│  │  [Badge]    [Status]  │  │
│  └───────────────────────┘  │
│                             │
│  [Category]          [♥]   │
│                             │
│  Card Title                │
│  ★ 4.8 · Cairo, Egypt      │
│                             │
│  Short description text     │
│  that may be two lines...   │
│                             │
│  Partner: John Doe          │
│  ─────────────────────────  │
│  EGP 1,500      [Book]     │
└─────────────────────────────┘
```

### 6.2 Table Layout

```
┌─────────────────────────────────────────────────────┐
│  [Search]  [Filter ▼]  [Sort ▼]  [Date Range]       │
├─────────────────────────────────────────────────────┤
│  Name          │  Date      │  Amount   │  Status   │
├─────────────────────────────────────────────────────┤
│  Experience 1  │  2026-06-15│  EGP 2,500│  Active   │
│  Experience 2  │  2026-06-18│  EGP 1,800│  Pending  │
│  Experience 3  │  2026-06-20│  EGP 3,200│  Active   │
├─────────────────────────────────────────────────────┤
│  ← 1 2 3 ... 10 →                                 │
└─────────────────────────────────────────────────────┘
```

### 6.3 Form Layout

```
┌─────────────────────────────────────────┐
│  Form Title                             │
│  Form description text                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Label                          │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │  Input                    │  │   │
│  │  └───────────────────────────┘  │   │
│  │  Helper text                    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Label                          │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │  Select ▼                 │  │   │
│  │  └───────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌──────────┐  ┌──────────────────┐   │
│  │  Cancel  │  │     Submit       │   │
│  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 7. Section Layout Patterns

### 7.1 Section with Title

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Section Label (uppercase, gold, small)             │
│                                                     │
│  Section Title (large, white)                       │
│  ───────────────── (gold line, 80px, centered)      │
│                                                     │
│  Section Subtitle (muted, body)                     │
│                                                     │
│  [Content Grid]                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 7.2 Split Section

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │                  │  │                  │        │
│  │  Left Content    │  │  Right Content   │        │
│  │  (Text, CTA)     │  │  (Image, Media)  │        │
│  │                  │  │                  │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 7.3 Full-width Hero

```
┌─────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │
│  │              Background Image                 │  │
│  │              (Ken Burns effect)                │  │
│  │                                               │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │                                         │  │  │
│  │  │  Hero Title                             │  │  │
│  │  │  Hero Subtitle                          │  │  │
│  │  │  Hero Description                       │  │  │
│  │  │  [CTA Button]                           │  │  │
│  │  │                                         │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 8. Color Application by Section

| Section | Background | Text | Accent |
|---------|------------|------|--------|
| **Header** | Transparent → Glass | White | Gold |
| **Hero** | Image + Overlay | White | Gold CTA |
| **Stats** | Navy gradient | White | Gold numbers |
| **Destinations** | Primary bg | White | Gold borders |
| **Categories** | Primary bg | White | Gold icons |
| **Featured** | Surface | White | Gold badges |
| **How It Works** | Primary bg | White | Gold steps |
| **Offers** | Surface | White | Red badge, Gold price |
| **AI Preview** | Primary bg | White | Gold glow |
| **Testimonials** | Surface | White | Gold stars |
| **Download** | Primary bg | White | Gold CTA |
| **Footer** | Navy dark | Muted | Gold links |

---

## 9. Spacing Patterns

| Pattern | Top | Bottom | Left | Right | Gap |
|---------|-----|--------|------|-------|-----|
| **Section** | 96px | 96px | 64px | 64px | 32px |
| **Card Grid** | — | — | — | — | 24px |
| **Card Internal** | — | — | 24px | 24px | 16px |
| **Form Group** | — | 24px | — | — | 16px |
| **Table Row** | 12px | 12px | 16px | 16px | — |
| **Dashboard** | 24px | — | 32px | 32px | 24px |
| **Mobile Section** | 64px | 64px | 16px | 16px | 16px |

---

## 10. Elevation Map

| Surface | Elevation | Shadow | Usage |
|---------|-----------|--------|-------|
| **Page bg** | 0 | None | Main background |
| **Card** | 1 | shadow-sm | Content cards |
| **Sidebar** | 1 | None | Navigation |
| **Dropdown** | 2 | shadow-md | Menus, selects |
| **Modal** | 3 | shadow-lg | Dialogs |
| **Toast** | 4 | shadow-xl | Notifications |
| **Tooltip** | 5 | shadow-md | Hover tips |
