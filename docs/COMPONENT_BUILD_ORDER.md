# EgyptHub — Component Build Order

> **Version:** 2.0
> **Goal:** Zero rework, zero duplicate components
> **Total Components:** 162
> **Phases:** A through J (10 phases)

---

## Build Philosophy

### Dependency Rule

A component can only be built after ALL its dependencies are built. The phases are topologically sorted — no phase can begin before the previous phase completes.

### Reusability Score

| Score | Meaning | Example |
|-------|---------|---------|
| 10 | Used in every app, every screen | Button, Card, Avatar |
| 8-9 | Used in multiple apps/screens | Modal, Table, Tabs |
| 5-7 | Used in one app, multiple screens | BookingCard, ChatBubble |
| 3-4 | Used in one screen/section | Hero, StatsBar |
| 1-2 | Single-use composite | Homepage, AboutPage |

### Priority Levels

| Priority | Meaning | Action |
|----------|---------|--------|
| P0 | Blocking — nothing works without it | Build immediately |
| P1 | Critical — major features blocked | Build within phase |
| P2 | Important — minor features delayed | Build after P1 |
| P3 | Nice to have — cosmetic only | Build last in phase |
| P4 | Enhancement — post-MVP | Deferred |

### Complexity Levels

| Level | Meaning | Time Range |
|-------|---------|------------|
| Low | 1 file, < 50 lines, no state, no animation | 0.5-2 hours |
| Medium | 1-3 files, state management, simple animation | 2-8 hours |
| High | 3+ files, complex state, animation, accessibility | 8-24 hours |
| Very High | 5+ files, multi-step, real-time, payment integration | 24-80 hours |

---

## Phase A — Design Tokens

**Objective:** Establish the foundational design system. Nothing else can be built until this phase is complete.
**Build Priority (Phase):** P0 — Blocking
**Estimated Total:** 32 hours
**Dependencies:** None

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| A1 | CSS Custom Properties | Define all design tokens as CSS variables (colors, spacing, radius, shadows, z-index) | None | 10 | Low | P0 | 1h |
| A2 | Tailwind v4 @theme Block | Map CSS variables to Tailwind utility classes via `@theme` | A1 | 10 | Medium | P0 | 2h |
| A3 | Font Configuration | Load Cairo, Poppins, Playfair Display via next/font + CSS variables | None | 10 | Low | P0 | 1h |
| A4 | Shadcn UI Installation | Install 24 Shadcn primitives into `@egypthub/ui/primitives/` | A2 | 10 | Medium | P0 | 4h |
| A5 | Shadcn Theme Override | Customize Shadcn theme colors to match EgyptHub gold/dark palette | A1, A4 | 10 | Low | P0 | 1h |
| A6 | Global Base Styles | Reset, scrollbar styles, gold glow utility, RTL base | A1, A3 | 10 | Low | P0 | 1h |
| A7 | RTL Base Styles | CSS logical properties, direction, text-align, margin-inline | A1, A6 | 10 | Low | P0 | 1h |
| A8 | `cn` Utility | clsx + tailwind-merge helper for conditional classes | A2 | 10 | Low | P0 | 0.5h |
| A9 | Reduced Motion Config | prefers-reduced-motion media query + CSS overrides | A6 | 10 | Low | P0 | 0.5h |
| A10 | Breakpoint Definitions | CSS container queries + viewport breakpoint constants | None | 10 | Low | P0 | 0.5h |
| A11 | Z-Index Scale | Standardized z-index values (dropdown: 1000, modal: 1050, toast: 1080) | None | 10 | Low | P0 | 0.5h |
| A12 | Portal Utility | createPortal wrapper for overlays, modals, tooltips | None | 10 | Low | P0 | 1h |
| A13 | Custom EgyptiansIcons | Pyramid, Compass, Star, Sun, Wave, Palm, Lotus SVGs | None | 9 | Low | P1 | 2h |
| A14 | Animation Keyframes | Glow-pulse, float, fade-in, slide-up, scale-in keyframes | A6 | 10 | Low | P0 | 0.5h |
| A15 | Dark Mode Base | data-theme="dark" attribute, dark-only CSS variables (no light mode toggle) | A1 | 10 | Low | P0 | 0.5h |

**Phase A Gate:** All 15 tokens must compile, all CSS variables must be accessible in all 4 apps, fonts must load correctly in both Arabic and English text.

---

## Phase B — Core Primitives

**Objective:** Build the atomic UI components that every other component depends on.
**Build Priority (Phase):** P0 — Blocking
**Estimated Total:** 48 hours
**Dependencies:** Phase A

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| B1 | Button | All variants: primary (gold gradient), secondary (outline), ghost, danger, icon. All sizes: sm, md, lg. All states: default, hover, active, disabled, loading | A8, A14 | 10 | Medium | P0 | 3h |
| B2 | Input | Text input with icon support, error state, focus ring (gold), dark bg | A8, A1 | 10 | Medium | P0 | 2h |
| B3 | Card | Surface background, rounded-xl, all variants (default, hover, featured, glass) | A8, A1 | 10 | Medium | P0 | 3h |
| B4 | CardHeader | Card subsection header with title, subtitle, action slot | B3 | 9 | Low | P0 | 1h |
| B5 | CardContent | Card body wrapper with padding | B3 | 9 | Low | P0 | 0.5h |
| B6 | CardFooter | Card bottom section with action buttons | B3 | 9 | Low | P0 | 0.5h |
| B7 | Avatar | Profile image with initials fallback, sizes xs-2xl, status indicator dot | A8, A1 | 10 | Medium | P0 | 2h |
| B8 | AvatarGroup | Stacked avatars with overflow count | B7 | 7 | Low | P1 | 1h |
| B9 | Badge | Status badges (gold, success, error, warning, info, neutral). Dot variants | A8 | 10 | Low | P0 | 1.5h |
| B10 | Spinner | Gold rotating circle, sizes sm/md/lg | A1 | 10 | Low | P0 | 0.5h |
| B11 | Skeleton | Loading placeholder shapes (text, circle, card, image, table, stat, button, input) | A8 | 10 | Low | P0 | 2h |
| B12 | Container | Max-width wrapper with responsive padding (1440px) | A10 | 9 | Low | P0 | 0.5h |
| B13 | Grid | Responsive grid with configurable columns and gap | A10 | 9 | Low | P0 | 1h |
| B14 | Stack | Flex layout with consistent spacing (horizontal + vertical) | A8 | 9 | Low | P0 | 0.5h |
| B15 | Divider | Horizontal/vertical line, optional text in center, gold variant | A1 | 8 | Low | P0 | 0.5h |
| B16 | Icon | Wrapper for react-icons + custom EgyptianIcons, sizes xs-2xl | A13 | 10 | Low | P0 | 1h |
| B17 | Text | Typography component with preset styles (display-lg through caption) | A8, A3 | 9 | Low | P0 | 1h |
| B18 | Heading | h1-h6 with consistent typography tokens, gold accent variant | A3, A1 | 9 | Low | P0 | 1h |
| B19 | Label | Form label with optional required indicator, error state | A8 | 8 | Low | P0 | 0.5h |
| B20 | Portal | Portal wrapper using createPortal | None | 10 | Low | P0 | 0.5h |
| B21 | Tooltip | Hover/tap tooltip with positioning (top, bottom, left, right) | B20, B10 | 9 | Medium | P1 | 3h |
| B22 | Popover | Click/hover popup with positioning, arrow, dismiss on outside click | B20, B1 | 8 | Medium | P1 | 3h |
| B23 | DropdownMenu | Menu with items, icons, dividers, submenus. Gold hover state | B20, B1, B16 | 8 | Medium | P1 | 3h |
| B24 | Modal | Dialog with backdrop, close button, sizes, scrollable body, focus trap | B20, B1, B16 | 9 | Medium | P0 | 4h |
| B25 | Drawer | Slide-in panel from right/bottom for mobile, with backdrop | B20, B1, B16 | 8 | Medium | P1 | 3h |
| B26 | BottomSheet | Bottom-drawer for mobile, drag to dismiss, snap points | B20, B1, B16 | 7 | High | P1 | 4h |
| B27 | Toast | Notification toast with types (success, error, warning, info), auto-dismiss, queue | B20, B16, B1 | 10 | Medium | P1 | 3h |
| B28 | ToastProvider | Toast context provider + queue management | B27 | 9 | Medium | P1 | 2h |
| B29 | useBreakpoint | Hook returning current breakpoint (xs, sm, md, lg, xl, 2xl) | A10 | 9 | Low | P0 | 1h |
| B30 | useClickOutside | Hook for detecting clicks outside an element | None | 9 | Low | P0 | 0.5h |
| B31 | useMediaQuery | Hook for CSS media query matching | None | 9 | Low | P0 | 0.5h |
| B32 | useScrollPosition | Hook for scroll position tracking | None | 8 | Low | P1 | 0.5h |
| B33 | useLockedBody | Hook to lock body scroll when modal/drawer is open | None | 8 | Low | P1 | 0.5h |
| B34 | useDebounce | Hook for debouncing values | None | 9 | Low | P0 | 0.5h |
| B35 | formatCurrency | EGP currency formatter | None | 9 | Low | P0 | 0.5h |
| B36 | formatDate | Date formatter with Arabic/English locale support | None | 9 | Low | P0 | 0.5h |

**Phase B Gate:** All 36 components must be built, exported from `@egypthub/ui`, and usable in a basic test page in each app. All components must support RTL and pass accessibility checks.

---

## Phase C — Form Components

**Objective:** Build all form-related inputs and controls. These are needed by auth, booking, profile, and dashboard forms.
**Build Priority (Phase):** P1 — Critical
**Estimated Total:** 48 hours
**Dependencies:** Phase B

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| C1 | Select | Native select styled as dark dropdown with gold focus, error state | B2 | 9 | Medium | P0 | 2h |
| C2 | MultiSelect | Multi-value select with chips, search, dropdown | B1, B9, B2 | 7 | High | P2 | 4h |
| C3 | Checkbox | Styled checkbox with gold check, indeterminate state, label | B19 | 9 | Low | P0 | 1h |
| C4 | CheckboxCard | Card-style checkbox (selectable card with check indicator) | C3, B3 | 7 | Medium | P2 | 2h |
| C5 | Radio | Styled radio with gold dot, label | B19 | 9 | Low | P0 | 1h |
| C6 | RadioCard | Card-style radio (selectable card with radio indicator) | C5, B3 | 7 | Medium | P2 | 2h |
| C7 | Toggle / Switch | On/off toggle with gold active state, slide animation | None | 9 | Low | P0 | 1h |
| C8 | Slider / Range | Single and dual range slider with gold track | None | 7 | Medium | P2 | 3h |
| C9 | Textarea | Multi-line input with auto-resize, character count, error state | B2 | 8 | Low | P0 | 1.5h |
| C10 | SearchInput | Search input with icon, clear button, suggestions dropdown | B2, B16, B23 | 8 | Medium | P1 | 3h |
| C11 | DatePicker | Calendar date picker with month/year nav, range selection | B1, B16, B20 | 7 | High | P1 | 6h |
| C12 | TimePicker | Time selector with slots grid or clock interface | B1, B16 | 7 | High | P1 | 4h |
| C13 | FileUpload | Drag-and-drop upload zone with preview, progress, error | B16, B7, B10 | 7 | Medium | P1 | 4h |
| C14 | GuestCounter | Minus/count/plus stepper with min/max bounds | B1 | 7 | Low | P1 | 1h |
| C15 | FormWrapper | Form error summary, field validation context | C3, C5, C2 | 8 | Medium | P1 | 2h |
| C16 | FormField | Form field wrapper with label, error, helper text | B19, C15 | 8 | Low | P1 | 1h |
| C17 | FormActions | Submit/cancel button row with loading state, alignment | B1 | 8 | Low | P1 | 0.5h |
| C18 | OTPInput | One-time password input with auto-focus, paste, digit boxes | B2 | 6 | Medium | P1 | 2h |
| C19 | PhoneInput | International phone input with country code selector | B2, C1 | 6 | Medium | P2 | 3h |
| C20 | Autocomplete | Text input with dropdown suggestions, debounced search | B2, B23, B34 | 7 | High | P2 | 4h |
| C21 | Zod Schema (Login) | Login form validation schema | None | 6 | Low | P1 | 0.5h |
| C22 | Zod Schema (Signup) | Signup form validation schema with confirm password | None | 6 | Low | P1 | 0.5h |
| C23 | Zod Schema (Profile) | Profile form validation schema | None | 6 | Low | P1 | 0.5h |
| C24 | Zod Schema (Booking) | Booking form validation schema (guest details, payment) | None | 6 | Low | P1 | 1h |
| C25 | Zod Schema (Offer) | Partner offer form validation schema | None | 5 | Low | P2 | 0.5h |
| C26 | Zod Schema (Settings) | Settings form validation schema | None | 5 | Low | P2 | 0.5h |

**Phase C Gate:** All form components display correctly in dark mode, support RTL, show error states, and validate via Zod schemas.

---

## Phase D — Navigation Components

**Objective:** Build all navigation patterns used across public, portal, and dashboard apps.
**Build Priority (Phase):** P1 — Critical
**Estimated Total:** 40 hours
**Dependencies:** Phase B

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| D1 | Header | Glass morphism top bar: logo, nav links, auth buttons, search. Transparent → scrolled states | B1, B7, B9, B16, B29, B12 | 8 | High | P0 | 6h |
| D2 | Sidebar | Left navigation sidebar: expanded (260px), collapsed (72px), mobile drawer. Gold active indicator | B7, B16, B33, B29 | 8 | High | P0 | 6h |
| D3 | BottomNav | Mobile bottom tab bar: 5 tabs (Home, Explore, AI, Bookings, Profile), gold active | B16, B29 | 8 | Medium | P0 | 3h |
| D4 | Tabs | Tab bar with underline and pill variants, scrollable, animated indicator | A8, B16, A14 | 9 | Medium | P0 | 3h |
| D5 | Breadcrumb | Navigation trail with chevron separators, gold active page | B16 | 8 | Low | P1 | 1.5h |
| D6 | Pagination | Page numbers with prev/next, gold active page, compact variant | B1 | 8 | Medium | P1 | 2h |
| D7 | Steps / Stepper | Multi-step progress indicator: horizontal (desktop), vertical (mobile), completed/active/upcoming states | B16 | 7 | Medium | P1 | 3h |
| D8 | BackLink | Link with chevron icon to navigate back | B16 | 7 | Low | P1 | 0.5h |
| D9 | AnchorNav | Sticky side navigation for sections, scroll-spy active state | B29, B16 | 5 | Medium | P2 | 3h |
| D10 | SkipLink | Accessibility skip-to-content link (hidden until focused) | None | 7 | Low | P1 | 0.5h |
| D11 | MobileNavDrawer | Full-screen drawer for mobile navigation with links and auth | B25, B1, B7 | 7 | Medium | P0 | 3h |
| D12 | LanguageSwitcher | Arabic/English toggle in header | B1, B16 | 6 | Low | P1 | 1h |
| D13 | NotificationBell | Bell icon with unread badge count, dropdown list preview | B9, B16, B23, B7 | 7 | Medium | P1 | 3h |
| D14 | UserDropdown | Avatar + name dropdown with profile, settings, logout links | B7, B23, B16 | 7 | Low | P1 | 2h |
| D15 | SearchOverlay | Full-screen search modal with suggestions, recent searches, categories | B20, B10, B16 | 6 | Medium | P2 | 4h |

**Phase D Gate:** All navigation components must work at all breakpoints, support RTL navigation order, handle mobile menu open/close with smooth animation.

---

## Phase E — Layout Components

**Objective:** Build reusable layout patterns and data display components.
**Build Priority (Phase):** P1 — Critical
**Estimated Total:** 32 hours
**Dependencies:** Phase B, Phase D (for page-level layouts)

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| E1 | Section | Page section wrapper with optional title, subtitle, gold accent line | B17, B18 | 8 | Low | P0 | 1h |
| E2 | PageHeader | Page title, description, breadcrumb, actions row | B18, B5 | 8 | Low | P1 | 1.5h |
| E3 | EmptyState | Centered illustration/message with optional CTA | B1, B16 | 8 | Low | P0 | 1.5h |
| E4 | ErrorState | Error display with icon, message, retry button | B1, B16 | 8 | Low | P0 | 1h |
| E5 | Table | Sortable table with header, rows, cells, hover rows, gold sort indicators | B9, B6 | 8 | High | P0 | 5h |
| E6 | DataGrid | Sortable, filterable data grid with pagination, bulk actions | E5, D6, C10 | 8 | High | P1 | 6h |
| E7 | StatCard | Icon + number + label card with trend indicator | B3, B16, B17 | 8 | Low | P0 | 1.5h |
| E8 | ProgressBar | Linear progress with gold gradient, success/warning/error states | A8 | 8 | Low | P0 | 1h |
| E9 | Rating | Star rating display (read-only) and interactive selector | B16 | 8 | Low | P0 | 1.5h |
| E10 | Timeline | Vertical/horizontal timeline with nodes, connectors, labels | B16 | 7 | Medium | P1 | 3h |
| E11 | Accordion | Expandable sections with chevron animation, gold header | A8, B16, A14 | 8 | Medium | P1 | 2h |
| E12 | Chart (Line) | Line chart wrapper with gold line, grid, tooltip | None (chart lib) | 7 | Medium | P1 | 3h |
| E13 | Chart (Bar) | Bar chart wrapper with gold bars, stacked variant | None (chart lib) | 7 | Medium | P1 | 3h |
| E14 | Chart (Pie/Donut) | Pie/donut chart wrapper with gold primary slice | None (chart lib) | 7 | Medium | P1 | 2h |
| E15 | Chart (Area) | Area chart wrapper with gold gradient fill | None (chart lib) | 7 | Medium | P1 | 2h |
| E16 | MetricCard | Dashboard metric with value, label, trend, mini sparkline | B3, B17, E15 | 7 | Medium | P1 | 2h |
| E17 | KPIWidget | Large stat display with icon, comparison value, tooltip | E7, B21 | 6 | Low | P2 | 1.5h |
| E18 | DataCard | Card with structured data rows (key-value pairs) | B3, B18 | 7 | Low | P1 | 1h |
| E19 | Lightbox | Full-screen image viewer with navigation, counter, close | B20, B16 | 6 | Medium | P2 | 3h |
| E20 | ImageGallery | Grid/carousel image gallery with lightbox integration | E19 | 6 | Medium | P2 | 3h |

**Phase E Gate:** All data display components must work with both empty and populated states, support sorting, and render at all breakpoints.

---

## Phase F — Discovery Components

**Objective:** Build the public-facing discovery experience — homepage, destinations, experiences.
**Build Priority (Phase):** P2 — Important
**Estimated Total:** 80 hours
**Dependencies:** Phase B, Phase D (header/footer), Phase E (layout)

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| F1 | GlobalFooter | 4-column footer with logo, quick links, categories, contact, social | B16, B18 | 8 | Medium | P0 | 4h |
| F2 | Hero | Full-viewport hero with Ken Burns slideshow, typewriter, oval shapes, CTA | B1, B16, A14, B30 | 7 | Very High | P0 | 8h |
| F3 | StatsBar | 4 animated stat counters (travelers, experiences, cities, rating) | B7, B17, A14, B30 | 7 | Medium | P0 | 4h |
| F4 | DestinationCard | Card with background image, gradient overlay, title, stats. Featured + small variants | B3, B18, B17, A8 | 7 | Medium | P0 | 3h |
| F5 | DestinationGrid | 5-card responsive grid (2 large + 3 small), destination hero on homepage | F4, B13 | 6 | Medium | P0 | 3h |
| F6 | CategoryGrid | 6-category card grid with icons, labels, counts | B3, B16, B18 | 6 | Low | P0 | 2h |
| F7 | ExperienceCard | Card with image (4:3), badge, rating, price, gold hover border, image zoom | B3, B9, E9, B16, B18 | 7 | Medium | P0 | 3h |
| F8 | FeaturedStories | Horizontal carousel of featured experiences with navigation arrows | F7, B1 | 6 | Medium | P1 | 3h |
| F9 | CityWheel | 3D horizontal carousel with drag, reflection, active card scale effect | B3, F4, A14 | 5 | High | P1 | 6h |
| F10 | HowItWorks | 3-step process with icons, numbers, gold borders | B16, B3 | 6 | Low | P0 | 1.5h |
| F11 | OfferSection | 3 offer cards with countdown timers, discount badges, progress bars | B3, B9, B1, E8 | 6 | Medium | P1 | 4h |
| F12 | OfferCard | Offer card with original/strikethrough price, sale price, countdown, badge | B3, B9, B1, E8 | 5 | Medium | P1 | 3h |
| F13 | Testimonials | Review carousel with avatars, quotes (Amiri font), stars, arrows, dots | B7, E9, B1 | 6 | Medium | P1 | 4h |
| F14 | AboutSection | Image collage (3 photos) + text content split layout | B17, B18, B1 | 5 | Medium | P1 | 4h |
| F15 | DownloadApp | App store buttons with QR code, app preview mockup | B1, B16 | 5 | Low | P1 | 2h |
| F16 | SandWave | Decorative SVG wave divider between sections | None | 5 | Low | P0 | 1h |
| F17 | ParticlesBg | Gold floating particle animation (canvas-based) | None | 4 | Medium | P1 | 3h |
| F18 | SectionTitle | Section header with label, title, gold decorative line | B17, B18 | 7 | Low | P0 | 1h |
| F19 | DestinationList | Filterable destination grid with sort and map toggle | F5, C10, D6, B1 | 5 | Medium | P1 | 4h |
| F20 | DestinationDetailFull | Destination detail: hero carousel, stats, description, experiences grid, map, reviews | F4, F7, B3, E19, E9 | 5 | High | P1 | 6h |
| F21 | ExperienceList | Searchable, filterable experience grid with sidebar filters | F7, C10, C8, C1, D6 | 5 | High | P1 | 5h |
| F22 | ExperienceDetailFull | Full experience page: gallery, info, booking CTA, itinerary, reviews | F7, E9, B1, E10, E19 | 5 | High | P1 | 6h |
| F23 | MapSection | Interactive map with markers, category sidebar, tooltip on hover | None | 5 | High | P2 | 8h |
| F24 | MapMarker | Map pin with popup content (image, title, rating) | B3, E9 | 5 | Medium | P2 | 2h |
| F25 | GallerySection | Image gallery with lightbox, thumbnails, navigation | E19 | 5 | Medium | P2 | 3h |
| F26 | PromotionalBanner | Full-width banner with image overlay, CTA, optional countdown | B1, B18 | 5 | Low | P2 | 1.5h |
| F27 | LatestUpdates | Blog/news feed cards with date, image, excerpt | B3, B18 | 4 | Low | P3 | 2h |

**Phase F Gate:** All public pages must render at all breakpoints with correct animations. Hero must work without jank on mobile. Stats must animate on scroll. All cards must have correct hover states.

---

## Phase G — AI Concierge Components

**Objective:** Build the AI-powered concierge experience — chat, voice, recommendations.
**Build Priority (Phase):** P2 — Important
**Estimated Total:** 48 hours
**Dependencies:** Phase B, Phase C (search, form inputs), Phase E (layout)

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| G1 | ChatBubble | Message bubble: user (gold bg, right), AI (surface bg, left), system (center, muted) | A8, B7 | 7 | Medium | P0 | 3h |
| G2 | ChatInputBar | Multi-line input with send, voice, attachment buttons | B2, B1, B16 | 7 | Medium | P0 | 3h |
| G3 | QuickReplyChip | Tappable suggestion chip: dark bg, gold border, rounded-full | A8, B16 | 7 | Low | P0 | 1h |
| G4 | QuickReplyRow | Horizontal scrollable row of quick reply chips | G3 | 6 | Low | P0 | 1h |
| G5 | SuggestionCard | Card with image, title, match %, price, "Why we chose this" section | B3, B9, B18, E9 | 6 | Medium | P1 | 3h |
| G6 | SuggestionList | Vertical list of AI suggestion cards | G5 | 5 | Low | P1 | 1h |
| G7 | TypingIndicator | 3 animated gold dots for AI typing state | A14 | 7 | Low | P0 | 0.5h |
| G8 | VoiceRecorder | Microphone button, waveform visualization, timer, stop button | B16, A14 | 6 | High | P1 | 5h |
| G9 | AIRecCard | AI recommendation card with horizontal/vertical variants, match badge, description | B3, B9, E9, B17 | 6 | Medium | P1 | 3h |
| G10 | TripSuggestionCard | Day-by-day itinerary card: day number, activities list, times, costs | B3, B18, E10 | 5 | Medium | P1 | 3h |
| G11 | ConversationListItem | Chat history item: avatar, preview, timestamp, unread dot | B7, B9, B17 | 6 | Low | P1 | 1.5h |
| G12 | ConversationList | Scrollable list of past conversations with search | G11, C10 | 5 | Low | P1 | 1.5h |
| G13 | ChatMessageList | Scrollable message list with auto-scroll-to-bottom, date separators | G1, G7, B15 | 6 | Medium | P0 | 3h |
| G14 | ConciergeWelcome | AI welcome screen with avatar, greeting, quick actions, example prompts | B7, G3, B1, B16 | 5 | Medium | P0 | 3h |
| G15 | AITypingSkeleton | Skeleton variant for AI response loading (3 line blocks) | B11 | 6 | Low | P1 | 0.5h |
| G16 | ChatHeader | Chat screen header: AI avatar, name, status, back button, actions | B7, B1 | 6 | Low | P0 | 1h |
| G17 | ChatEmptyState | Empty state for new conversation with suggestions | E3, G3 | 5 | Low | P1 | 1h |
| G18 | useAIChat | Hook: send message, receive response, conversation management, WebSocket lifecycle | None | 5 | High | P0 | 4h |
| G19 | useVoiceInput | Hook: MediaRecorder API, transcription, waveform data | None | 5 | High | P1 | 4h |
| G20 | useAIRecommendations | Hook: fetch recommendations, match score, filter | None | 5 | Medium | P1 | 2h |

**Phase G Gate:** Chat must support real-time send/receive, voice recording must work, recommendations must display with match percentage, all RTL.

---

## Phase H — Booking Components

**Objective:** Build the complete multi-step booking and checkout experience.
**Build Priority (Phase):** P2 — Important
**Estimated Total:** 64 hours
**Dependencies:** Phase B, Phase C (form inputs), Phase D (stepper), Phase E (layout)

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| H1 | Calendar | Month calendar grid with date selection, available/unavailable states, month nav | B1, B16 | 6 | High | P0 | 6h |
| H2 | TimeSlotPicker | Time slot grid with available/unavailable/selected states, duration display | B1 | 6 | Medium | P0 | 3h |
| H3 | GuestForm | Guest details input: name, email, phone, special requirements | B2, B19, C15, C16 | 5 | Low | P0 | 2h |
| H4 | AddonSelector | Optional extras with quantity picker, price per add-on, total update | C14, B3, B18 | 5 | Medium | P1 | 3h |
| H5 | BookingSummary | Full booking review: experience, date, time, guests, add-ons, price breakdown | B3, B18, H7 | 5 | Low | P0 | 2h |
| H6 | PaymentSelector | Payment method selector: saved cards, new card, Apple Pay, Google Pay | B3, B16, C5 | 6 | Medium | P0 | 3h |
| H7 | PriceBreakdown | Line items: subtotal, discount, tax, fees, total | B18, B15 | 6 | Low | P0 | 1.5h |
| H8 | CardInputForm | Card number, expiry, CVV, name with masking and validation | B2, B19 | 5 | Medium | P0 | 3h |
| H9 | ConfirmationCard | Success state: checkmark animation, booking ref, summary, add-to-calendar | B3, B18, B1 | 5 | Medium | P0 | 3h |
| H10 | QRCodeDisplay | QR code generation + display with reference number, instructions | None | 5 | Medium | P1 | 2h |
| H11 | ReceiptView | Downloadable receipt with full transaction details | B3, B18, H7 | 5 | Low | P1 | 2h |
| H12 | BookingStepper | Progress indicator for multi-step booking: calendar → time → guests → add-ons → payment → confirmation | D7 | 6 | Low | P0 | 1h |
| H13 | CheckoutLayout | Step wrapper: header (stepper) + step content + footer (back/next) | H12, B1 | 5 | Medium | P0 | 3h |
| H14 | useBookingFlow | Hook: multi-step state machine, data accumulation, validation per step | None | 5 | Very High | P0 | 6h |
| H15 | usePayment | Hook: payment processing, 3D secure, error handling, retry | None | 5 | High | P0 | 4h |
| H16 | PaymentError | Payment failure display: reason, retry button, alternative method suggestion | B1, B16 | 5 | Low | P0 | 1h |
| H17 | CancellationPolicy | Expandable section showing cancellation terms, refund policy | E11 | 5 | Low | P1 | 0.5h |
| H18 | SecurePaymentBadge | Security badge with lock icon, PCI compliance text | B16, B9 | 5 | Low | P1 | 0.5h |
| H19 | SaveCardToggle | Toggle + checkbox for saving card for future purchases | C7 | 5 | Low | P1 | 0.5h |
| H20 | BookingTermsCheckbox | Checkbox with terms link for booking acceptance | C3 | 5 | Low | P1 | 0.5h |
| H21 | AddToCalendarButton | Button to add booking to device calendar (iOS/Android/Google) | B1 | 4 | Medium | P2 | 2h |

**Phase H Gate:** Full booking flow from date selection to payment confirmation must work end-to-end. All form validations pass. Payment errors show correctly. Confirmation generates QR.

---

## Phase I — Dashboard Components

**Objective:** Build all components needed for Partner, Admin, and Ambassador dashboards.
**Build Priority (Phase):** P3 — Nice to have (post-MVP: P2)
**Estimated Total:** 96 hours
**Dependencies:** Phase B, Phase C, Phase D (sidebar, tabs, pagination), Phase E (tables, charts, stat cards)

| # | Component | Purpose | Dependencies | Reuse | Complexity | Priority | Time |
|---|-----------|---------|--------------|-------|------------|----------|------|
| I1 | DashboardSidebar | Extended sidebar for partner/admin/ambassador: section headers, nav items with icons, gold active indicator, collapse toggle | B16, B7, B33, B29 | 8 | High | P0 | 5h |
| I2 | DashboardHeader | Dashboard top bar: search, date range picker, notifications, avatar dropdown | C10, B7, D13, D14 | 8 | Medium | P0 | 4h |
| I3 | DashboardLayout | Sidebar + header + content wrapper for all dashboards | I1, I2, B12 | 8 | Medium | P0 | 3h |
| I4 | FilterBar | Horizontal filter bar: search, date range, status filters, sort, clear all | B1, C1, C8, B9 | 7 | Medium | P1 | 4h |
| I5 | DashboardCard | Card with optional header, content, footer for dashboard widgets | B3, B18 | 8 | Low | P0 | 1h |
| I6 | DataTable | Enhanced table: sort, filter, pagination, row actions, bulk select, export | E5, D6, I4 | 7 | High | P0 | 6h |
| I7 | ActivityFeed | Chronological activity list with icon, text, timestamp, filter, load more | B16, E11 | 6 | Medium | P1 | 3h |
| I8 | NotificationList | Full notification list with read/unread states, type icons, filter | B16, B9, D6 | 6 | Medium | P1 | 3h |
| I9 | ChartWidget | Chart card with header, filters, download, time range selector | E12, E13, E14, I5 | 7 | Medium | P0 | 4h |
| I10 | StatusBadge | Dashboard-specific status badge (Active, Pending, Suspended, Verified, Draft) | B9 | 8 | Low | P0 | 1h |
| I11 | QuickActionGrid | 4-6 action cards with icon, title, description, click handler | B3, B16 | 6 | Low | P1 | 1.5h |
| I12 | DateRangePicker | Predefined ranges (7d, 30d, 90d, custom) with calendar | C1, H1 | 7 | Medium | P1 | 4h |
| I13 | ExportButton | CSV/PDF export button with format dropdown | B1, B23 | 6 | Low | P1 | 1h |
| I14 | PerformanceChart | Revenue + bookings dual-axis chart for partner dashboard | I9, E15 | 5 | Medium | P1 | 3h |
| I15 | KPIGrid | 4 KPI cards in a row: revenue, bookings, rating, reviews | E16 | 6 | Low | P1 | 1h |
| I16 | OfferTable | Offer management table with status, pricing, bookings count, actions | I6, I10 | 5 | Medium | P1 | 3h |
| I17 | OfferForm | Create/edit offer: title, description, pricing, images, availability, cancellation | C15, C1, C13, C3 | 5 | High | P1 | 6h |
| I18 | BookingTable | Booking management table with customer, date, amount, status, actions | I6, I10 | 5 | Medium | P1 | 3h |
| I19 | BookingDetailModal | Booking detail modal: customer info, experience, timeline, status actions | B24, E10, I10 | 5 | Medium | P1 | 4h |
| I20 | PayoutCard | Balance display: available, pending, withdrawn with action button | I5, B1, E8 | 5 | Low | P1 | 2h |
| I21 | PayoutHistoryTable | Payout history with date, amount, status, download receipt | I6, I10 | 5 | Low | P2 | 2h |
| I22 | UsersTable | User management table: search, role filter, status, joined date, actions | I6, I10, B9 | 5 | Medium | P1 | 3h |
| I23 | UserDetailModal | User detail modal: info, activity log, bookings, status management | B24, I6, I7 | 5 | Medium | P1 | 4h |
| I24 | PartnersTable | Partner management with verification status, rating, bookings, revenue | I6, I10, E9 | 5 | Medium | P1 | 3h |
| I25 | PartnerDetailModal | Partner detail: info, analytics, verification, bookings, suspend/approve | B24, I15, I6 | 5 | Medium | P2 | 4h |
| I26 | ContentTable | Content management: type, title, status, author, updated date, actions | I6, I10 | 4 | Medium | P2 | 2h |
| I27 | ContentEditor | Rich text editor with image upload, SEO fields, publish/draft toggle | C15, C13, C7 | 4 | Very High | P2 | 8h |
| I28 | TransactionTable | Payment transactions: date, user, amount, method, status, actions | I6, I10 | 4 | Medium | P2 | 3h |
| I29 | RefundModal | Refund processing: reason, amount, confirm, policy check | B24, C15, H7 | 4 | Medium | P2 | 3h |
| I30 | ActivityLogTable | Audit log: timestamp, user, action, details, IP address, expandable rows | I6, E11 | 4 | Medium | P2 | 3h |
| I31 | SupportTicketList | Ticket queue with priority, status, assignment, filters | I6, I10, B9 | 4 | Medium | P2 | 3h |
| I32 | TicketThread | Ticket conversation: messages, internal notes, status controls, reply | G1, B1, C15 | 4 | Medium | P2 | 4h |
| I33 | FeatureFlagCard | Feature toggle card: name, description, environment-specific switch | C7, I5 | 4 | Low | P2 | 1h |
| I34 | MaintenanceBanner | Site-wide maintenance banner with message, timer, hide/disable | B1 | 4 | Low | P3 | 1h |
| I35 | AmbassadorLayout | Ambassador-specific dashboard layout | I3 | 4 | Low | P2 | 2h |
| I36 | CommissionCard | Ambassador earnings: total, pending, paid, conversion rate | I5, E7 | 4 | Low | P2 | 1.5h |
| I37 | ReferralLinkCard | Referral link with copy button, QR code, share options | B1, B16, H10 | 4 | Low | P2 | 2h |
| I38 | ReferralTable | Referral tracking: referred user, status, commission earned, date | I6, I10 | 4 | Medium | P2 | 2h |
| I39 | CommissionChart | Commission earnings over time with breakdown by source | I9 | 4 | Medium | P2 | 2h |
| I40 | LeaderboardCard | Ambassador ranking: rank, name, earnings, referrals this month | I5 | 3 | Low | P3 | 1.5h |
| I41 | DashboardEmptyState | Dashboard-specific empty states (no bookings, no offers, no referrals) | E3 | 5 | Low | P1 | 0.5h |
| I42 | FilterDateRange | Date range filter preset: Today, 7d, 30d, 90d, Custom, With Apply/Clear | B1 | 6 | Medium | P1 | 2h |
| I43 | ActivityFilter | Activity log filter: action type picker, user search, date range | C1, C10, I42 | 4 | Medium | P2 | 2h |
| I44 | BulkActionsBar | Bulk action toolbar: select all, clear, action dropdown, count | B1, B23 | 5 | Low | P1 | 1.5h |
| I45 | ConfirmBulkAction | Bulk confirm dialog: count, action description, cancel/confirm | B24 | 5 | Low | P1 | 1h |

**Phase I Gate:** All dashboard layouts must render correctly with sample data. Charts must animate on load. Tables must sort, filter, paginate. Forms must validate and submit.

---

## Phase J — Composite Screens (Page-Level)

**Objective:** Compose lower-layer components into full pages. These are the actual user-facing screens.
**Build Priority (Phase):** P4 — Enhancement (composes existing)
**Estimated Total:** 80 hours
**Dependencies:** ALL previous phases (A through I)

| # | Screen | Purpose | Components Composed | Complexity | Priority | Time |
|---|--------|---------|-------------------|------------|----------|------|
| J1 | Homepage | Full landing page: header, hero, stats, destinations, categories, experiences, offers, testimonials, footer | D1, F2, F3, F5, F6, F8, F11, F13, F15, F1, F18, F16, F17 | Very High | P0 | 8h |
| J2 | DestinationsList | Explore all destinations with filters, sort, grid, map toggle | D1, F19, D6, F16, F1 | High | P1 | 5h |
| J3 | DestinationDetail | Destination page with hero, stats, experiences, map, reviews | D1, F20, F23, E9, F16, F1 | High | P1 | 6h |
| J4 | ExperiencesList | Browse experiences with search, filters, sort, pagination | D1, F21, F16, F1 | High | P1 | 5h |
| J5 | ExperienceDetail | Experience page with gallery, info, booking CTA, itinerary, reviews | D1, F22, D8, F16, F1 | High | P1 | 6h |
| J6 | AboutPage | Brand story, mission, team, timeline, CTA | D1, F14, E10, F16, F1 | Medium | P2 | 4h |
| J7 | ContactPage | Contact form with map, info cards | D1, C15, C16, F23, F1 | Medium | P2 | 3h |
| J8 | LoginPage | Login form with social auth, divider, forgot link | D2, C21, C15, C16, B1, B2 | Medium | P0 | 3h |
| J9 | SignupPage | Registration form with social auth, terms, password validation | D2, C22, C15, C16, B1, B2 | High | P0 | 4h |
| J10 | ForgotPasswordPage | Email input + submit, success message | D2, C15, C16, B1, B2 | Low | P0 | 2h |
| J11 | ResetPasswordPage | New password + confirm form with validation | D2, C15, C16, B1, B2 | Low | P0 | 2h |
| J12 | DashboardHome | Traveler overview: stats, upcoming trips, recent bookings, AI suggestions | I3, E16, F8, G3, G9 | High | P1 | 4h |
| J13 | TripList | All trips with upcoming/past/cancelled tabs, search, create CTA | I3, D4, C10, E3, B1 | Medium | P1 | 3h |
| J14 | TripDetail | Full itinerary: day-by-day timeline, map, activities, documents | I3, E10, F23, H10 | High | P1 | 4h |
| J15 | BookingList | All bookings with upcoming/past/cancelled tabs, search, filter | I3, D4, I4, I6, E3 | Medium | P1 | 3h |
| J16 | BookingDetail | Booking details: confirmation, QR code, receipt, review CTA | I3, H9, H10, H11, E9 | Medium | P1 | 3h |
| J17 | FavoritesPage | Saved experiences/destinations/partners with grid, remove, book | I3, F7, F4, D4, E3 | Medium | P1 | 3h |
| J18 | WalletPage | Balance, points, loyalty tier, payment methods, transactions | I3, E16, I5, B1, H6 | Medium | P2 | 4h |
| J19 | ProfilePage | Avatar, personal info form, language, notification settings | I3, C15, C1, C7, C23 | Medium | P1 | 3h |
| J20 | SettingsPage | Account settings, privacy, security, danger zone (delete) | I3, C15, C7, C26, B1 | Medium | P1 | 3h |
| J21 | NotificationsPage | Full notification list with filters, mark all read, swipe actions | I3, I8, I4 | Medium | P2 | 2h |
| J22 | AIWelcomePage | AI concierge landing with welcome, quick actions, examples | G14, G4, G17 | Medium | P0 | 2h |
| J23 | AIChatPage | Full chat interface with header, messages, input, suggestions | G16, G13, G2, G4, G6 | High | P0 | 4h |
| J24 | AIRecommendationsPage | AI-curated list of recommendations with filters | G6, G9, I4 | Medium | P1 | 3h |
| J25 | AITripBuilderPage | AI-generated itinerary with edit/save capabilities | G10, B1, B24 | High | P2 | 4h |
| J26 | BookingFlowPage | Multi-step booking: calendar → time → guests → add-ons → summary → payment → confirmation | H13, H1, H2, H3, H4, H5, H6, H8, H9, H20 | Very High | P0 | 8h |
| J27 | BookingConfirmationPage | Booking success with QR code, receipt, add-to-calendar | H9, H10, H11 | Medium | P0 | 2h |
| J28 | PartnerDashboardHome | Partner overview: revenue chart, metrics, recent bookings, quick actions | I3, I15, I14, I7, I11 | High | P2 | 4h |
| J29 | PartnerOffersPage | Offer management: list, create, edit, duplicate, expire | I3, I16, I17, B24 | High | P2 | 5h |
| J30 | PartnerBookingsPage | Booking management with filters, confirm/reject, details | I3, I18, I19, I4 | High | P2 | 4h |
| J31 | PartnerAnalyticsPage | Full analytics: revenue, bookings, ratings, top experiences, demographics | I3, I9, I14, E14 | High | P2 | 5h |
| J32 | PartnerPayoutsPage | Balance, withdraw, history, bank settings | I3, I20, I21, C15 | Medium | P2 | 3h |
| J33 | PartnerSettingsPage | Business info, logo, contact, hours, cancellation policy | I3, C15, C13, C1, C3 | Medium | P2 | 3h |
| J34 | PartnerSupportPage | Support tickets, FAQ, knowledge base | I3, I31, I32, E11 | Medium | P3 | 3h |
| J35 | AdminDashboardHome | Platform overview: KPIs, revenue chart, booking stats, user growth, activity | I3, I15, I9, I7, E14 | Very High | P2 | 5h |
| J36 | AdminUsersPage | User management: list, search, filter, roles, detail modal | I3, I22, I23, I44, I45 | High | P2 | 4h |
| J37 | AdminPartnersPage | Partner management: list, verification queue, analytics, approve/suspend | I3, I24, I25, I44, I45 | High | P2 | 4h |
| J38 | AdminBookingsPage | Booking management: search, status filters, refunds, disputes | I3, I18, I19, I28, I29 | High | P2 | 4h |
| J39 | AdminContentPage | Content management: pages, banners, promotions, SEO, blog | I3, I26, I27, C7 | Very High | P3 | 6h |
| J40 | AdminAnalyticsPage | Full platform analytics: revenue, users, conversion, geo, devices | I3, I9, I15 | High | P2 | 4h |
| J41 | AdminPaymentsPage | Transactions, refunds, payouts, disputes, financial reports | I3, I28, I29, I21 | High | P3 | 4h |
| J42 | AdminSystemPage | General settings, email templates, API keys, feature flags, maintenance | I3, C15, I33, I34 | Medium | P3 | 4h |
| J43 | AdminLogsPage | Activity logs with filters, search, export | I3, I30, I43, I13 | Medium | P3 | 3h |
| J44 | AdminSupportPage | Support ticket queue, assignment, resolution, reporting | I3, I31, I32, I13 | Medium | P3 | 4h |
| J45 | AdminReportsPage | Report templates, custom builder, scheduled reports, exports | I3, I13, I9, C15 | High | P3 | 5h |
| J46 | AmbassadorDashboardHome | Overview: commissions, referrals, leaderboard, recent activity | I35, I36, I38, I40, I7 | Medium | P3 | 3h |
| J47 | AmbassadorCommissionPage | Commission dashboard: earnings chart, breakdown, history | I35, I39, I36, I21 | Medium | P3 | 3h |
| J48 | AmbassadorReferralsPage | Referral links, track, share, leaderboard | I35, I37, I38, I40 | Medium | P3 | 3h |
| J49 | AmbassadorEarningsPage | Earnings history, withdrawals, payout settings | I35, I21, C15 | Medium | P3 | 3h |
| J50 | AmbassadorSettingsPage | Profile, payout method, notification preferences | I35, C15, C7, C1 | Medium | P3 | 2h |

**Phase J Gate:** All screens must render without console errors, all links/navigation must work, all forms must submit, all data must display correctly from mocked or real API responses.

---

## Implementation Sequence Summary

| Phase | Components | Total | Cumulative | Estimated Time | Build Priority |
|-------|-----------|-------|------------|---------------|----------------|
| A — Design Tokens | 15 | 15 | 15 | 32h | P0 — Blocking |
| B — Core Primitives | 36 | 36 | 51 | 48h | P0 — Blocking |
| C — Form Components | 26 | 26 | 77 | 48h | P1 — Critical |
| D — Navigation | 15 | 15 | 92 | 40h | P1 — Critical |
| E — Layout & Data | 20 | 20 | 112 | 32h | P1 — Critical |
| F — Discovery | 27 | 27 | 139 | 80h | P2 — Important |
| G — AI Concierge | 20 | 20 | 159 | 48h | P2 — Important |
| H — Booking | 21 | 21 | 180 | 64h | P2 — Important |
| I — Dashboards | 45 | 45 | 225 | 96h | P3 — Post-MVP |
| J — Composite Screens | 50 | 50 | 275 | 80h | P4 — Enhancement |
| **Total** | **275** | | | **568h (71 days)** | |

### Parallel Build Paths

After Phase B completes, the following phases can run in PARALLEL:

```
Phase A ──→ Phase B ──→ Phase C ──→ Phase D ──→ Phase E ──→ Phase F ──→ Phase J
                              │            │            │
                              │            │            └── Phase G ──→ Phase J
                              │            │
                              │            └── Phase H ──→ Phase J
                              │
                              └── Phase I ──→ Phase J
```

### Zero Rework Rules

1. **No component is built before its dependencies** — verified by dependency column
2. **No component duplicates another** — each component has a unique purpose
3. **No component over-generalizes** — components are as simple as possible while meeting all reuse needs
4. **Every component uses `@egypthub/ui`** — no app reimplements Button, Card, etc.
5. **No screen builds components inline** — every reusable UI element is extracted to a component file
6. **Phase J composes only** — 0 new component logic, only layout orchestration
