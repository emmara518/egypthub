# EgyptHub — Visual Migration Plan

> **Version:** 2.0
> **Source of Truth:** Visual Boards (9 images)
> **Assumption:** An old UI exists that must be migrated to the new visual direction

---

## 1. Migration Overview

### 1.1 Migration Scope

This document outlines the complete visual migration from the old EgyptHub UI to the new approved design direction. The new boards are the ONLY source of truth — all previous designs, layouts, screens, and visual decisions are REJECTED.

### 1.2 Migration Principles

1. **Complete replacement** — No merging with old designs
2. **Clean break** — Old components are deprecated, not adapted
3. **Incremental delivery** — Migrate in phases to minimize disruption
4. **No regressions** — All functionality must be preserved
5. **User experience continuity** — Users should not lose any capability

---

## 2. What Must Be DELETED

### 2.1 Design Tokens (DELETE ALL)

| Token Type | Old | Action |
|------------|-----|--------|
| **Colors** | Old color palette | DELETE — Replace with new navy/gold system |
| **Typography** | Old font families | DELETE — Replace with Cairo/Poppins/Playfair |
| **Spacing** | Old spacing scale | DELETE — Replace with new 4px grid system |
| **Border Radius** | Old radius values | DELETE — Replace with new radius scale |
| **Shadows** | Old shadow definitions | DELETE — Replace with new dark shadow system |
| **Gradients** | Old gradients | DELETE — Replace with new gold/navy gradients |
| **Z-Index** | Old z-index scale | DELETE — Replace with new z-index system |

### 2.2 Components (DELETE ENTIRE COMPONENTS)

| Component | Reason | Replacement |
|-----------|--------|-------------|
| **Light Theme Toggle** | New design is dark-first | Remove toggle (dark is default) |
| **Old Navigation** | Completely redesigned | New glass morphism header |
| **Old Hero Section** | New cinematic hero | New Ken Burns hero |
| **Old Card System** | New card design language | New card variants |
| **Old Button Styles** | New gold gradient buttons | New button system |
| **Old Form Inputs** | New dark input styling | New form components |
| **Old Footer** | Redesigned footer | New footer with new layout |
| **Old Modal System** | New overlay components | New modal/drawer system |
| **Old Table System** | New data display | New table components |
| **Old Chart Styles** | New data visualization | New chart components |
| **Old Icon Set** | New icon system | New Egyptian icons + Heroicons |

### 2.3 Styles (DELETE COMPLETELY)

| Style Category | What to Delete |
|----------------|----------------|
| **CSS Variables** | All `--color-*`, `--font-*`, `--spacing-*`, `--radius-*` |
| **Tailwind Config** | All custom colors, fonts, spacing, shadows |
| **Global Styles** | Old `globals.css` variables and utilities |
| **Animation Definitions** | Old transition and animation definitions |
| **Responsive Breakpoints** | Old breakpoint definitions |
| **Component-level Styles** | Old component-specific CSS/SCSS |

### 2.4 Layout Patterns (DELETE)

| Pattern | Reason |
|---------|--------|
| **Old Sidebar Layout** | New sidebar with different width/collapse behavior |
| **Old Header Layout** | New glass morphism header |
| **Old Mobile Navigation** | New bottom tab bar |
| **Old Grid System** | New 12-column responsive grid |
| **Old Spacing Patterns** | New spacing system |

---

## 3. What Must Be PRESERVED

### 3.1 Business Logic (PRESERVE)

| Logic | Reason |
|-------|--------|
| **Booking Flow Logic** | Business rules unchanged |
| **Payment Processing** | Integration logic unchanged |
| **User Authentication** | Auth flow logic unchanged |
| **Search Algorithm** | Backend search unchanged |
| **AI Concierge Logic** | AI capabilities unchanged |
| **Partner Management Logic** | Business rules unchanged |
| **Admin Operations Logic** | Business rules unchanged |

### 3.2 Data Structures (PRESERVE)

| Data | Reason |
|------|--------|
| **User Model** | Database schema unchanged |
| **Experience Model** | Database schema unchanged |
| **Booking Model** | Database schema unchanged |
| **Partner Model** | Database schema unchanged |
| **Review Model** | Database schema unchanged |
| **Transaction Model** | Database schema unchanged |

### 3.3 API Integrations (PRESERVE)

| API | Reason |
|-----|--------|
| **Backend APIs** | Backend unchanged |
| **Payment Gateway** | Integration unchanged |
| **Maps API** | Integration unchanged |
| **AI Service** | Integration unchanged |
| **Email Service** | Integration unchanged |
| **Storage Service** | Integration unchanged |

### 3.4 Content (PRESERVE)

| Content | Reason |
|---------|--------|
| **Destination Data** | Content unchanged |
| **Experience Data** | Content unchanged |
| **Partner Data** | Content unchanged |
| **Static Pages** | Content unchanged |
| **Translations** | Content unchanged |

### 3.5 Functionality (PRESERVE)

| Feature | Reason |
|---------|--------|
| **All user flows** | Functionality must be preserved |
| **All form submissions** | Data capture must work |
| **All notifications** | Communication must work |
| **All exports** | Data export must work |
| **All integrations** | Third-party must work |

---

## 4. What Must Be REDESIGNED

### 4.1 Public Website (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Homepage** | Old layout | New cinematic hero + sections | HIGH |
| **Destinations** | Old grid | New destination cards | HIGH |
| **Destination Detail** | Old layout | New immersive detail page | HIGH |
| **Experiences** | Old grid | New experience cards | HIGH |
| **Experience Detail** | Old layout | New immersive detail page | HIGH |
| **About** | Old layout | New brand story layout | MEDIUM |
| **Footer** | Old footer | New footer design | HIGH |
| **Search Results** | Old layout | New results layout | HIGH |

### 4.2 Traveler Portal (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Dashboard** | Old dashboard | New dashboard with stats | HIGH |
| **My Trips** | Old trips page | New trip cards + details | HIGH |
| **Bookings** | Old bookings page | New booking cards + details | HIGH |
| **Favorites** | Old favorites | New favorites grid | MEDIUM |
| **Profile** | Old profile | New profile page | MEDIUM |
| **Settings** | Old settings | New settings page | MEDIUM |
| **Notifications** | Old notifications | New notification center | MEDIUM |
| **Wallet & Loyalty** | Old wallet | New wallet + loyalty page | HIGH |

### 4.3 AI Concierge (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Welcome** | Old welcome | New AI welcome screen | HIGH |
| **Chat Interface** | Old chat | New chat interface | HIGH |
| **Voice Interface** | Old voice | New voice interface | HIGH |
| **Recommendations** | Old recs | New recommendation cards | HIGH |
| **Trip Suggestions** | Old suggestions | New itinerary builder | MEDIUM |

### 4.4 Partner Dashboard (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Dashboard Home** | Old dashboard | New analytics dashboard | HIGH |
| **Offers Management** | Old offers | New offers management | HIGH |
| **Bookings Management** | Old bookings | New bookings table | HIGH |
| **Analytics** | Old analytics | New analytics charts | HIGH |
| **Payouts** | Old payouts | New payouts page | MEDIUM |
| **Settings** | Old settings | New settings page | MEDIUM |

### 4.5 Admin Dashboard (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Dashboard Home** | Old dashboard | New admin dashboard | HIGH |
| **User Management** | Old users | New users table | HIGH |
| **Partner Management** | Old partners | New partners table | HIGH |
| **Booking Management** | Old bookings | New bookings table | HIGH |
| **Content Management** | Old content | New CMS | MEDIUM |
| **Analytics** | Old analytics | New analytics dashboard | HIGH |
| **Payments** | Old payments | New payments management | MEDIUM |
| **System Settings** | Old settings | New system settings | MEDIUM |
| **Activity Logs** | Old logs | New logs viewer | LOW |

### 4.6 Mobile App (COMPLETE REDESIGN)

| Screen | Old State | New State | Priority |
|--------|-----------|-----------|----------|
| **Home** | Old home | New mobile home | HIGH |
| **Explore** | Old explore | New explore with filters | HIGH |
| **Destination Detail** | Old detail | New mobile detail page | HIGH |
| **Experience Detail** | Old detail | New mobile detail page | HIGH |
| **Booking Flow** | Old booking | New mobile booking flow | HIGH |
| **Checkout** | Old checkout | New mobile checkout | HIGH |
| **AI Concierge** | Old AI | New mobile AI chat | HIGH |
| **Trips** | Old trips | New mobile trips | MEDIUM |
| **Favorites** | Old favorites | New mobile favorites | MEDIUM |
| **Profile** | Old profile | New mobile profile | MEDIUM |
| **Settings** | Old settings | New mobile settings | MEDIUM |
| **Notifications** | Old notifications | New mobile notifications | MEDIUM |
| **Map** | Old map | New mobile map | MEDIUM |

---

## 5. Components That Must Be REBUILT

### 5.1 Core Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Button** | Old styles | Gold gradient, secondary, ghost | SMALL |
| **Card** | Old card | New card with gold border | MEDIUM |
| **Input** | Old input | New dark input with gold focus | SMALL |
| **Select** | Old select | New dark select | SMALL |
| **Checkbox** | Old checkbox | New gold checkbox | SMALL |
| **Radio** | Old radio | New gold radio | SMALL |
| **Toggle** | Old toggle | New gold toggle | SMALL |
| **Avatar** | Old avatar | New avatar with status | SMALL |
| **Badge** | Old badge | New badge system | SMALL |
| **Tag/Chip** | Old chip | New chip system | SMALL |

### 5.2 Navigation Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Header** | Old header | Glass morphism header | MEDIUM |
| **Sidebar** | Old sidebar | New sidebar with collapse | MEDIUM |
| **Bottom Nav** | Old bottom nav | New bottom tab bar | MEDIUM |
| **Breadcrumb** | Old breadcrumb | New breadcrumb | SMALL |
| **Tabs** | Old tabs | New tab system | SMALL |
| **Pagination** | Old pagination | New pagination | SMALL |

### 5.3 Data Display Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Table** | Old table | New dark table | MEDIUM |
| **Chart (Line)** | Old chart | New gold-accented chart | LARGE |
| **Chart (Bar)** | Old chart | New gold-accented chart | LARGE |
| **Chart (Pie)** | Old chart | New gold-accented chart | LARGE |
| **Stats Display** | Old stats | New gold stats | SMALL |
| **Progress Bar** | Old progress | New gold progress | SMALL |
| **Timeline** | Old timeline | New timeline | MEDIUM |

### 5.4 Overlay Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Modal** | Old modal | New dark modal | MEDIUM |
| **Drawer** | Old drawer | New drawer | MEDIUM |
| **Bottom Sheet** | Old sheet | New bottom sheet | MEDIUM |
| **Popover** | Old popover | New popover | SMALL |
| **Tooltip** | Old tooltip | New tooltip | SMALL |
| **Toast** | Old toast | New toast | SMALL |
| **Lightbox** | Old lightbox | New lightbox | MEDIUM |

### 5.5 Form Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Date Picker** | Old picker | New dark calendar | LARGE |
| **Time Picker** | Old picker | New time selector | MEDIUM |
| **File Upload** | Old upload | New upload zone | MEDIUM |
| **Search Input** | Old search | New search with suggestions | MEDIUM |
| **Rich Text Editor** | Old editor | New editor | LARGE |

### 5.6 Dashboard Components (REBUILD)

| Component | Old | New | Effort |
|-----------|-----|-----|--------|
| **Stat Card** | Old stat | New stat card | SMALL |
| **Metric Card** | Old metric | New metric card | SMALL |
| **Filter Bar** | Old filter | New filter bar | MEDIUM |
| **Dashboard Header** | Old header | New dashboard header | SMALL |
| **Activity Feed** | Old feed | New activity feed | MEDIUM |

---

## 6. Design Token Changes

### 6.1 Color Tokens (CHANGE ALL)

```diff
- --bg: #FCFBF9 (old light)
+ --bg: #0A0E17 (new dark)

- --surface: #FFFFFF (old white)
+ --surface: #0F1420 (new dark surface)

- --text: #1B2A41 (old dark)
+ --text: #F5F7FA (new light)

- --primary: #0D3B66 (old navy)
+ --gold: #D4A24C (new gold)

- --accent: #F4A261 (old orange)
+ --gold-light: #E8C97A (new gold light)

- --border: rgba(27,42,65,0.08) (old)
+ --border: #1E2A3D (new)
```

### 6.2 Typography Tokens (CHANGE)

```diff
- font-family: 'Inter' (old)
+ font-family: 'Cairo' (Arabic)
+ font-family: 'Poppins' (English)
+ font-family: 'Playfair Display' (Display)

- font-size: 14px base (old)
+ font-size: 16px base (new)

- font-weight: 400 regular (old)
+ font-weight: 300-900 range (new)
```

### 6.3 Spacing Tokens (CHANGE)

```diff
- spacing: 4px base (old)
+ spacing: 4px grid (new)

- spacing: 8, 16, 24, 32 (old)
+ spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 (new)
```

### 6.4 Shadow Tokens (CHANGE)

```diff
- shadow: light shadows (old)
+ shadow: dark shadows (new)

- shadow-gold: none (old)
+ shadow-gold: 0 4px 14px rgba(212,162,76,0.25) (new)
```

### 6.5 Border Radius Tokens (CHANGE)

```diff
- radius: 4, 8, 12, 16 (old)
+ radius: 4, 8, 12, 16, 20, 24, 9999 (new)
```

---

## 7. Migration Phases

### Phase 1: Foundation (Week 1-2)

| Task | Priority | Effort |
|------|----------|--------|
| Update design tokens (colors, typography, spacing) | HIGH | 2 days |
| Update Tailwind config | HIGH | 1 day |
| Update globals.css | HIGH | 1 day |
| Create new component library structure | HIGH | 2 days |
| Build core components (Button, Input, Card) | HIGH | 3 days |

### Phase 2: Navigation (Week 3-4)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Header component | HIGH | 2 days |
| Build new Sidebar component | HIGH | 3 days |
| Build new Bottom Tab Bar | HIGH | 2 days |
| Build new Breadcrumb | MEDIUM | 1 day |
| Build new Tabs component | MEDIUM | 1 day |
| Integrate navigation across all screens | HIGH | 2 days |

### Phase 3: Public Website (Week 5-7)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Homepage | HIGH | 5 days |
| Build new Destinations page | HIGH | 3 days |
| Build new Destination Detail page | HIGH | 3 days |
| Build new Experiences page | HIGH | 3 days |
| Build new Experience Detail page | HIGH | 3 days |
| Build new About page | MEDIUM | 2 days |
| Build new Footer | HIGH | 2 days |

### Phase 4: Traveler Portal (Week 8-10)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Dashboard | HIGH | 3 days |
| Build new My Trips page | HIGH | 3 days |
| Build new Bookings page | HIGH | 3 days |
| Build new Favorites page | MEDIUM | 2 days |
| Build new Profile page | MEDIUM | 2 days |
| Build new Settings page | MEDIUM | 2 days |
| Build new Notifications page | MEDIUM | 2 days |

### Phase 5: AI Concierge (Week 11-12)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Welcome screen | HIGH | 2 days |
| Build new Chat interface | HIGH | 5 days |
| Build new Voice interface | HIGH | 3 days |
| Build new Recommendations | MEDIUM | 2 days |
| Build new Trip Suggestions | MEDIUM | 3 days |

### Phase 6: Dashboards (Week 13-16)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Partner Dashboard | HIGH | 5 days |
| Build new Partner Offers | HIGH | 3 days |
| Build new Partner Analytics | MEDIUM | 3 days |
| Build new Admin Dashboard | HIGH | 5 days |
| Build new User Management | HIGH | 3 days |
| Build new Booking Management | HIGH | 3 days |
| Build new Content Management | MEDIUM | 3 days |
| Build new Analytics pages | MEDIUM | 3 days |

### Phase 7: Mobile (Week 17-20)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Mobile Home | HIGH | 3 days |
| Build new Mobile Explore | HIGH | 3 days |
| Build new Mobile Detail pages | HIGH | 5 days |
| Build new Mobile Booking Flow | HIGH | 5 days |
| Build new Mobile Checkout | HIGH | 3 days |
| Build new Mobile AI Concierge | HIGH | 3 days |
| Build new Mobile Profile | MEDIUM | 2 days |
| Build new Mobile Settings | MEDIUM | 2 days |

### Phase 8: Booking Flow (Week 21-22)

| Task | Priority | Effort |
|------|----------|--------|
| Build new Calendar picker | HIGH | 3 days |
| Build new Time picker | HIGH | 2 days |
| Build new Guest details form | HIGH | 2 days |
| Build new Add-ons selector | MEDIUM | 2 days |
| Build new Payment flow | HIGH | 3 days |
| Build new Confirmation screen | HIGH | 2 days |

### Phase 9: Polish & Testing (Week 23-24)

| Task | Priority | Effort |
|------|----------|--------|
| Responsive testing (all breakpoints) | HIGH | 3 days |
| RTL testing | HIGH | 2 days |
| Accessibility audit | HIGH | 2 days |
| Performance optimization | MEDIUM | 2 days |
| Cross-browser testing | MEDIUM | 2 days |
| User acceptance testing | HIGH | 3 days |

---

## 8. Risk Assessment

### 8.1 High Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Breaking existing functionality** | Users lose features | Feature flags, gradual rollout |
| **Performance regression** | Slower page loads | Performance budgets, monitoring |
| **RTL issues** | Broken layouts in Arabic | RTL-first development, testing |
| **Data loss** | User data corrupted | Backup before migration, testing |

### 8.2 Medium Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Scope creep** | Delays, budget overrun | Strict phase adherence |
| **Inconsistent implementation** | Visual inconsistency | Design system documentation |
| **Accessibility issues** | Excluded users | WCAG compliance, testing |
| **Mobile performance** | Poor mobile experience | Mobile-first development |

### 8.3 Low Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Browser compatibility** | Broken in some browsers | Browser testing matrix |
| **Third-party conflicts** | Integration issues | Integration testing |
| **Content gaps** | Missing content | Content audit before migration |

---

## 9. Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Lighthouse Performance** | 70 | 90+ | Lighthouse audit |
| **First Contentful Paint** | 3s | 1.5s | Web Vitals |
| **Largest Contentful Paint** | 5s | 2.5s | Web Vitals |
| **Cumulative Layout Shift** | 0.1 | <0.1 | Web Vitals |
| **Time to Interactive** | 4s | 2s | Web Vitals |
| **Mobile Usability Score** | 80 | 95+ | Google Search Console |
| **Accessibility Score** | 70 | 90+ | Lighthouse audit |
| **User Satisfaction** | 3.5/5 | 4.5/5 | User surveys |
| **Conversion Rate** | 2% | 4% | Analytics |
| **Bounce Rate** | 60% | 40% | Analytics |

---

## 10. Post-Migration Cleanup

### 10.1 Files to Delete

| File/Directory | Reason |
|----------------|--------|
| `src/styles/old/` | Old styles directory |
| `src/components/old/` | Old component library |
| `src/styles/variables.css` | Old CSS variables |
| `src/styles/themes/` | Old theme files |
| `public/images/old/` | Old images (replaced by new) |
| `docs/OLD_*.md` | Old documentation |

### 10.2 Dependencies to Remove

| Package | Reason |
|---------|--------|
| Old UI libraries | Replaced by new components |
| Old icon packages | Replaced by new icons |
| Old animation libraries | Replaced by new animations |
| Old chart libraries | Replaced by new charts |

### 10.3 Code Cleanup

| Action | Scope |
|--------|-------|
| Remove old CSS variables | All files using old tokens |
| Remove old component imports | All files using old components |
| Remove old utility functions | All files using old utilities |
| Remove old test files | All tests for old components |
| Update documentation | All docs referencing old system |

---

## 11. Communication Plan

### 11.1 Stakeholder Updates

| Audience | Frequency | Content |
|----------|-----------|---------|
| **Product Team** | Weekly | Progress, blockers, next steps |
| **Engineering Team** | Daily (standup) | Daily progress, dependencies |
| **Design Team** | Weekly | Design implementation review |
| **QA Team** | Weekly | Testing progress, issues |
| **Leadership** | Bi-weekly | Milestone progress, risks |

### 11.2 User Communication

| Channel | Timing | Message |
|---------|--------|---------|
| **Blog Post** | Pre-launch | "Exciting new look coming soon" |
| **Email** | Launch day | "Your EgyptHub has a new look!" |
| **In-app Banner** | Launch week | "Explore the new EgyptHub" |
| **Social Media** | Launch week | Visual showcase of new design |
| **Help Center** | Launch week | "What's new" documentation |

---

## 12. Rollback Plan

### 12.1 Rollback Triggers

| Trigger | Action |
|---------|--------|
| **Critical bug** | Immediate rollback |
| **Performance regression** | Investigate, rollback if needed |
| **User complaints > 10%** | Investigate, rollback if needed |
| **Data loss** | Immediate rollback |

### 12.2 Rollback Process

1. **Identify issue** — Determine scope and severity
2. **Communicate** — Notify stakeholders immediately
3. **Execute rollback** — Deploy previous version
4. **Verify** — Confirm rollback successful
5. **Investigate** — Root cause analysis
6. **Fix** — Address issue in new version
7. **Re-deploy** — Launch fixed version
