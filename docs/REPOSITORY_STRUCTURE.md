# EgyptHub — Production Monorepo Structure

> **Version:** 2.0
> **Stack:** pnpm workspace + Turbo, Next.js 15 (frontends), NestJS (api), TypeScript
> **Date:** June 2026

---

## 1. Full Folder Tree

```
egypthub/
│
├── .github/                              # GitHub CI/CD configuration
│   ├── workflows/
│   │   ├── ci.yml                        # CI: lint, typecheck, test, build
│   │   ├── cd-staging.yml               # CD: deploy to staging
│   │   ├── cd-production.yml            # CD: deploy to production
│   │   ├── preview.yml                  # Preview deployments per PR
│   │   └── dependency-review.yml        # Dependency vulnerability scan
│   ├── actions/
│   │   ├── setup/action.yml             # Shared: checkout, node, pnpm, cache
│   │   ├── build-app/action.yml         # Shared: build a single app
│   │   └── docker-build/action.yml      # Shared: build + push Docker image
│   ├── CODEOWNERS                        # File-level ownership
│   ├── dependabot.yml                    # Automated dependency updates
│   └── release-drafter.yml              # Auto-generate release notes
│
├── apps/
│   ├── web/                              # Public website + Traveler Portal
│   ├── api/                              # BFF / Backend for Frontend
│   ├── admin/                            # Admin Dashboard
│   ├── partner/                          # Partner Dashboard
│   └── ambassador/                       # Ambassador Dashboard
│
├── packages/
│   ├── ui/                               # Shared component library (Shadcn-based)
│   ├── design-tokens/                    # Design system: colors, typography, spacing
│   ├── types/                            # Shared TypeScript types & enums
│   ├── api-sdk/                          # API client SDK (generated/typed)
│   └── shared/                           # Shared utilities, configs, constants
│
├── tools/                                # Build & development tooling
│   ├── tsconfig/                         # Shared TypeScript configs
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── nestjs.json
│   ├── eslint/                           # Shared ESLint configurations
│   │   ├── base.js
│   │   ├── nextjs.js
│   │   └── nestjs.js
│   └── scripts/                          # Dev scripts (codegen, seed, db)
│       ├── codegen.sh                    # Generate API SDK from OpenAPI spec
│       ├── seed.sh                       # Seed database with sample data
│       ├── migrate.sh                    # Run database migrations
│       └── validate.sh                   # Validate project structure
│
├── infra/                                # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.web               # Web app Docker image
│   │   ├── Dockerfile.api               # API app Docker image
│   │   ├── Dockerfile.admin             # Admin dashboard Docker image
│   │   ├── Dockerfile.partner           # Partner dashboard Docker image
│   │   ├── Dockerfile.ambassador        # Ambassador dashboard Docker image
│   │   ├── docker-compose.dev.yml       # Local development environment
│   │   ├── docker-compose.staging.yml   # Staging environment
│   │   └── docker-compose.prod.yml      # Production environment
│   ├── kubernetes/                       # K8s manifests (optional, for K8s deploy)
│   │   ├── web/
│   │   ├── api/
│   │   ├── admin/
│   │   ├── partner/
│   │   ├── ambassador/
│   │   └── shared/                       # ConfigMaps, Secrets, Ingress
│   ├── terraform/                        # Infrastructure provisioning
│   │   ├── modules/
│   │   └── environments/
│   │       ├── staging/
│   │       └── production/
│   └── scripts/                          # Infra scripts
│       ├── init-db.sql                   # Database initialization
│       ├── seed.sql                      # Seed data
│       └── migrate.sh                    # Run migrations
│
├── .env.example                          # All environment variables (documented)
├── .env.local                            # Local development overrides (gitignored)
├── .env.staging                          # Staging environment (gitignored)
├── .env.production                       # Production environment (gitignored)
├── .gitignore
├── .prettierrc                           # Code formatting
├── .npmrc                                # pnpm configuration
├── turbo.json                            # Turbo pipeline configuration
├── pnpm-workspace.yaml                   # Workspace definition
├── package.json                          # Root package.json
├── tsconfig.json                         # Root TypeScript config (references)
│
└── docs/                                 # Documentation
    ├── DESIGN_ANALYSIS.md
    ├── DESIGN_SYSTEM.md
    ├── SCREENS_MAP.md
    ├── COMPONENT_CATALOG.md
    ├── USER_FLOWS.md
    ├── VISUAL_ARCHITECTURE.md
    ├── VISUAL_MIGRATION_PLAN.md
    ├── UI_IMPLEMENTATION_MASTERPLAN.md
    ├── FRONTEND_ARCHITECTURE.md
    ├── COMPONENT_BUILD_ORDER.md
    ├── REPOSITORY_STRUCTURE.md
    └── API_ARCHITECTURE.md              (future — API design doc)
```

### 1.1 App: web (`apps/web/`)

```
apps/web/
├── src/
│   ├── app/                                # Next.js App Router pages
│   │   ├── layout.tsx                      # RootLayout (fonts, providers, metadata)
│   │   ├── globals.css                     # Global styles, @theme config
│   │   ├── page.tsx                        # Homepage
│   │   ├── not-found.tsx
│   │   ├── (public)/                       # Public marketing pages
│   │   ├── (auth)/                         # Login, signup, password reset
│   │   ├── (portal)/                       # Traveler dashboard
│   │   ├── (ai)/                           # AI Concierge
│   │   ├── (booking)/                      # Booking flow
│   │   └── api/                            # Route handlers / webhooks
│   ├── features/                           # Feature modules
│   │   ├── public/
│   │   ├── auth/
│   │   ├── traveler/
│   │   ├── ai-concierge/
│   │   ├── booking/
│   │   └── shared/
│   ├── stores/                             # Zustand stores (auth, booking, chat, ui)
│   ├── providers/                          # React context providers
│   ├── hooks/                              # App-specific hooks
│   ├── lib/                                # API clients, utilities
│   └── middleware.ts                       # Auth middleware, redirects
├── public/                                 # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── manifests/
├── tests/                                  # Tests
│   ├── e2e/
│   └── integration/
├── next.config.ts
├── tsconfig.json
├── vitest.config.ts                        # Unit test config
├── playwright.config.ts                    # E2E test config
└── package.json                            # @egypthub/web
```

### 1.2 App: api (`apps/api/`)

```
apps/api/
├── src/
│   ├── main.ts                             # Bootstrap (NestJS)
│   ├── app.module.ts                       # Root module
│   ├── app.controller.ts                   # Health, root endpoints
│   │
│   ├── modules/                            # Business domain modules
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/                 # JWT, OAuth strategies
│   │   │   ├── guards/                     # Auth guards
│   │   │   ├── dto/                        # Data transfer objects
│   │   │   └── tests/
│   │   ├── users/
│   │   ├── destinations/
│   │   ├── experiences/
│   │   ├── bookings/
│   │   ├── partners/
│   │   ├── ambassadors/
│   │   ├── reviews/
│   │   ├── payments/
│   │   ├── notifications/
│   │   ├── content/
│   │   ├── analytics/
│   │   ├── reports/
│   │   └── ai/                             # AI Concierge endpoints
│   │
│   ├── common/                             # Cross-cutting concerns
│   │   ├── decorators/                     # Custom decorators
│   │   ├── filters/                        # Exception filters
│   │   ├── interceptors/                   # Request/response interceptors
│   │   ├── pipes/                          # Validation pipes
│   │   ├── guards/                         # Shared guards (roles, permissions)
│   │   ├── middleware/                     # Request middleware
│   │   └── helpers/                        # Utility functions
│   │
│   ├── config/                             # Configuration module
│   │   ├── database/
│   │   ├── redis/
│   │   ├── storage/
│   │   └── env.ts                          # Typed env vars
│   │
│   ├── database/                           # Database layer
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── entities/                       # TypeORM entities
│   │
│   └── websockets/                         # WebSocket gateway
│       ├── chat.gateway.ts                 # AI chat WebSocket
│       └── notifications.gateway.ts        # Real-time notifications
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── Dockerfile
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
└── package.json                            # @egypthub/api
```

### 1.3 App: admin (`apps/admin/`)

```
apps/admin/
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── layout.tsx                      # AdminLayout (sidebar + header)
│   │   ├── globals.css
│   │   ├── page.tsx                        # Dashboard Home
│   │   ├── (admin)/
│   │   │   ├── users/
│   │   │   ├── partners/
│   │   │   ├── bookings/
│   │   │   ├── content/
│   │   │   ├── analytics/
│   │   │   ├── payments/
│   │   │   ├── system/
│   │   │   ├── logs/
│   │   │   └── support/
│   │   └── api/                            # Admin-specific proxies
│   ├── features/                           # Feature modules
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── partners/
│   │   ├── bookings/
│   │   ├── content/
│   │   ├── payments/
│   │   ├── system/
│   │   └── shared/                         # Admin-specific shared
│   ├── stores/
│   ├── providers/
│   ├── hooks/
│   ├── lib/
│   └── middleware.ts
├── public/
├── tests/
├── next.config.ts
├── tsconfig.json
├── vitest.config.ts
└── package.json                            # @egypthub/admin
```

### 1.4 App: partner (`apps/partner/`)

```
apps/partner/
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # PartnerLayout
│   │   ├── globals.css
│   │   ├── page.tsx                        # Dashboard Home
│   │   ├── (partner)/
│   │   │   ├── offers/
│   │   │   ├── bookings/
│   │   │   ├── analytics/
│   │   │   ├── payouts/
│   │   │   ├── settings/
│   │   │   └── support/
│   │   └── api/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── offers/
│   │   ├── bookings/
│   │   ├── analytics/
│   │   ├── payouts/
│   │   └── shared/
│   ├── stores/
│   ├── providers/
│   ├── hooks/
│   ├── lib/
│   └── middleware.ts
├── public/
├── tests/
├── next.config.ts
├── tsconfig.json
└── package.json                            # @egypthub/partner
```

### 1.5 App: ambassador (`apps/ambassador/`)

```
apps/ambassador/
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # AmbassadorLayout
│   │   ├── globals.css
│   │   ├── page.tsx                        # Dashboard Home
│   │   ├── (ambassador)/
│   │   │   ├── commission/
│   │   │   ├── referrals/
│   │   │   ├── earnings/
│   │   │   └── settings/
│   │   └── api/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── commission/
│   │   ├── referrals/
│   │   ├── earnings/
│   │   └── shared/
│   ├── stores/
│   ├── providers/
│   ├── hooks/
│   ├── lib/
│   └── middleware.ts
├── public/
├── tests/
├── next.config.ts
├── tsconfig.json
└── package.json                            # @egypthub/ambassador
```

### 1.6 Package: ui (`packages/ui/`)

```
packages/ui/
├── src/
│   ├── primitives/                          # Shadcn-generated primitives (internal)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── toast.tsx
│   │   ├── tabs.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── switch.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   ├── command.tsx
│   │   ├── form.tsx
│   │   ├── label.tsx
│   │   └── breadcrumb.tsx
│   │
│   ├── components/                          # Composed EgyptHub components
│   │   ├── Button/                          # Extended Button with gold variants
│   │   ├── Card/                            # Extended Card with EgyptHub variants
│   │   ├── Input/                           # Extended Input (dark theme)
│   │   ├── Modal/
│   │   ├── Drawer/
│   │   ├── BottomSheet/
│   │   ├── Toast/
│   │   ├── Table/
│   │   ├── Tabs/
│   │   ├── Header/                         # Glass morphism header component
│   │   ├── Sidebar/                        # Collapsible sidebar
│   │   ├── BottomNav/                      # Mobile bottom tab bar
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Chip/
│   │   ├── Pagination/
│   │   ├── Breadcrumb/
│   │   ├── Toggle/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Select/
│   │   ├── DatePicker/
│   │   ├── TimePicker/
│   │   ├── Slider/
│   │   ├── Spinner/
│   │   ├── Skeleton/
│   │   ├── ProgressBar/
│   │   ├── Rating/
│   │   ├── Tooltip/
│   │   ├── Popover/
│   │   ├── DropdownMenu/
│   │   ├── Icon/
│   │   ├── Container/
│   │   ├── Grid/
│   │   ├── Stack/
│   │   ├── Divider/
│   │   ├── EmptyState/
│   │   ├── StatCard/
│   │   ├── Alert/
│   │   ├── StepIndicator/
│   │   └── Portal/
│   │
│   ├── hooks/                               # Shared React hooks
│   │   ├── useBreakpoint.ts
│   │   ├── useClickOutside.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useLockedBody.ts
│   │   └── useReducedMotion.ts
│   │
│   ├── utils/
│   │   ├── cn.ts                            # clsx + tailwind-merge
│   │   ├── format-currency.ts               # EGP currency formatter
│   │   ├── format-date.ts                   # Locale-aware date formatter
│   │   ├── format-number.ts                 # Number formatting with locale
│   │   └── cn.test.ts
│   │
│   └── index.ts                             # Public exports
│
├── tailwind.config.ts                       # Shared Tailwind preset
├── tsconfig.json
├── vitest.config.ts
├── package.json                             # @egypthub/ui
└── README.md                                # Component usage documentation
```

### 1.7 Package: design-tokens (`packages/design-tokens/`)

```
packages/design-tokens/
├── src/
│   ├── tokens/
│   │   ├── colors.ts                        # Color scales, semantic colors
│   │   ├── typography.ts                    # Font families, sizes, weights
│   │   ├── spacing.ts                       # 4px grid spacing scale
│   │   ├── radius.ts                        # Border radius scale
│   │   ├── shadows.ts                       # Shadow definitions
│   │   ├── breakpoints.ts                   # Responsive breakpoints
│   │   ├── z-index.ts                       # Z-index scale
│   │   ├── motion.ts                        # Transition durations, easings
│   │   └── gradients.ts                     # Gradient definitions
│   ├── css/
│   │   └── variables.css                    # CSS custom properties output
│   ├── index.ts                             # Aggregated exports
│   └── index.css                            # CSS bundle entry
├── tsconfig.json
├── package.json                             # @egypthub/design-tokens
└── README.md
```

### 1.8 Package: types (`packages/types/`)

```
packages/types/
├── src/
│   ├── api/                                 # API request/response types
│   │   ├── auth.ts                          # Login, signup, token
│   │   ├── destinations.ts                  # Destination CRUD types
│   │   ├── experiences.ts                   # Experience CRUD types
│   │   ├── bookings.ts                      # Booking CRUD types
│   │   ├── users.ts                         # User profile types
│   │   ├── partners.ts                      # Partner profile types
│   │   ├── ambassadors.ts                   # Ambassador types
│   │   ├── payments.ts                      # Payment/transaction types
│   │   ├── reviews.ts                       # Review types
│   │   ├── notifications.ts                 # Notification types
│   │   ├── analytics.ts                     # Analytics query types
│   │   ├── content.ts                       # Content management types
│   │   └── ai.ts                            # AI chat types
│   ├── domain/                              # Domain entity types
│   │   ├── user.ts
│   │   ├── destination.ts
│   │   ├── experience.ts
│   │   ├── booking.ts
│   │   ├── partner.ts
│   │   ├── ambassador.ts
│   │   ├── review.ts
│   │   ├── payment.ts
│   │   ├── offer.ts
│   │   └── category.ts
│   ├── enums/                               # Enum definitions
│   │   ├── user-role.ts
│   │   ├── booking-status.ts
│   │   ├── offer-status.ts
│   │   ├── verification-status.ts
│   │   └── notification-type.ts
│   ├── common/                              # Shared utility types
│   │   ├── api-response.ts                  # IApiResponse, pagination meta
│   │   ├── pagination.ts                    # Pagination params
│   │   ├── sort.ts                          # Sort params
│   │   ├── filter.ts                        # Filter params
│   │   └── date-range.ts                    # Date range params
│   └── index.ts                             # Aggregated exports
├── tsconfig.json
├── package.json                             # @egypthub/types
└── README.md
```

### 1.9 Package: api-sdk (`packages/api-sdk/`)

```
packages/api-sdk/
├── src/
│   ├── client/                              # HTTP client
│   │   ├── http-client.ts                   # fetch wrapper with interceptors
│   │   ├── auth-interceptor.ts              # Token attachment + refresh
│   │   ├── error-handler.ts                 # Error normalization
│   │   └── retry-handler.ts                 # Exponential backoff
│   ├── services/                            # API service classes
│   │   ├── auth-service.ts
│   │   ├── destination-service.ts
│   │   ├── experience-service.ts
│   │   ├── booking-service.ts
│   │   ├── user-service.ts
│   │   ├── partner-service.ts
│   │   ├── ambassador-service.ts
│   │   ├── payment-service.ts
│   │   ├── review-service.ts
│   │   ├── notification-service.ts
│   │   ├── analytics-service.ts
│   │   ├── content-service.ts
│   │   ├── ai-service.ts
│   │   └── report-service.ts
│   ├── websocket/                           # WebSocket client
│   │   ├── ws-client.ts                     # WebSocket connection manager
│   │   ├── chat-socket.ts                   # AI chat socket
│   │   └── notification-socket.ts           # Real-time notification socket
│   ├── react-query/                         # TanStack Query adapters
│   │   ├── query-keys.ts                    # Centralized query key factory
│   │   ├── providers.tsx                    # React query provider setup
│   │   └── prefetch.ts                      # Server-side prefetch helpers
│   ├── config.ts                            # SDK configuration
│   └── index.ts                             # Public exports
├── tsconfig.json
├── package.json                             # @egypthub/api-sdk
└── README.md
```

### 1.10 Package: shared (`packages/shared/`)

```
packages/shared/
├── src/
│   ├── i18n/                                # Internationalization
│   │   ├── locales/
│   │   │   ├── ar/                          # Arabic translations
│   │   │   │   ├── common.json
│   │   │   │   ├── auth.json
│   │   │   │   ├── booking.json
│   │   │   │   ├── dashboard.json
│   │   │   │   ├── ai.json
│   │   │   │   └── errors.json
│   │   │   └── en/                          # English translations
│   │   │       ├── common.json
│   │   │       ├── auth.json
│   │   │       ├── booking.json
│   │   │       ├── dashboard.json
│   │   │       ├── ai.json
│   │   │       └── errors.json
│   │   ├── i18n.config.ts                   # i18n setup
│   │   ├── i18n-provider.tsx                # React i18n provider
│   │   └── use-translation.ts               # Hook for translations
│   ├── constants/                           # App-wide constants
│   │   ├── routes.ts                        # Route path constants
│   │   ├── roles.ts                         # Role definitions
│   │   ├── permissions.ts                   # Permission definitions
│   │   └── config.ts                        # App configuration constants
│   ├── utils/                               # Shared utilities (non-React)
│   │   ├── date.ts                          # Date manipulation
│   │   ├── string.ts                        # String utilities (slug, truncate)
│   │   ├── validation.ts                    # Common validation patterns
│   │   ├── url.ts                           # URL builder, query params
│   │   └── object.ts                        # Object manipulation (pick, omit)
│   ├── validators/                          # Common Zod schemas
│   │   ├── phone.ts                         # Phone number validation
│   │   ├── email.ts                         # Email validation
│   │   ├── password.ts                      # Password validation
│   │   └── date.ts                          # Date validation
│   └── index.ts                             # Public exports
├── tsconfig.json
├── package.json                             # @egypthub/shared
└── README.md
```

---

## 2. Package Ownership

| Package | Owner | Responsibility | Reviewers |
|---------|-------|---------------|-----------|
| `@egypthub/web` | Frontend Team | Public site + Traveler Portal | UX Lead, QA |
| `@egypthub/api` | Backend Team | BFF API, auth, data aggregation | Security, DevOps |
| `@egypthub/admin` | Frontend Team | Admin Dashboard | Product, UX |
| `@egypthub/partner` | Frontend Team | Partner Dashboard | Product, UX |
| `@egypthub/ambassador` | Frontend Team | Ambassador Dashboard | Product, UX |
| `@egypthub/ui` | Design System Team | Component library, accessibility | UX Lead, QA |
| `@egypthub/design-tokens` | Design System Team | Design tokens, theming | UX Lead |
| `@egypthub/types` | Backend Team | Type definitions, API contracts | Frontend Lead |
| `@egypthub/api-sdk` | Backend Team | API client, WebSocket, React Query | Frontend Lead |
| `@egypthub/shared` | Cross-functional | i18n, constants, validators | Tech Lead |

### 2.1 CODEOWNERS Mapping

```
# Root level
/.github/                      @tech-lead @devops
/turbo.json                    @tech-lead
/package.json                  @tech-lead
/pnpm-workspace.yaml           @tech-lead

# Apps
/apps/web/                     @frontend-team
/apps/api/                     @backend-team
/apps/admin/                   @frontend-team
/apps/partner/                 @frontend-team
/apps/ambassador/              @frontend-team

# Packages
/packages/ui/                  @design-system-team
/packages/design-tokens/       @design-system-team
/packages/types/               @backend-team
/packages/api-sdk/             @backend-team
/packages/shared/              @backend-team @frontend-team

# Infrastructure
/infra/                        @devops
/tools/                        @tech-lead
/docs/                         @tech-lead @ux-lead
```

---

## 3. Import Boundaries

### 3.1 Allowed Import Directions

```
                  ┌─────────────────────────────────────────────┐
                  │              APPS (leaf nodes)              │
                  │  web  │  api  │  admin  │  partner  │ ambassador │
                  └───────┴───────┴─────────┴───────────┴───────────┘
                      ▲       ▲        ▲          ▲            ▲
                      │       │        │          │            │
                      │       │        │          │            │
                  ┌─────────────────────────────────────────────┐
                  │           PACKAGES (dependencies)           │
                  │  ui  │  design-tokens  │  types  │  api-sdk  │ shared │
                  └───────┴────────────────┴─────────┴───────────┴────────┘
                      ▲           ▲            ▲
                      │           │            │
                      └───────┐   │   ┌────────┘
                              │   │   │
                        ┌─────┴───┴───┴─────┐
                        │   External deps   │
                        │  (npm registry)   │
                        └───────────────────┘
```

### 3.2 Import Table

| From ↓ / To → | ui | design-tokens | types | api-sdk | shared | web | api | admin | partner | ambassador |
|--------------|----|---------------|-------|---------|--------|-----|-----|-------|---------|------------|
| **web** | YES | YES | YES | YES | YES | — | NO | NO | NO | NO |
| **api** | NO | YES | YES | NO | YES | NO | — | NO | NO | NO |
| **admin** | YES | YES | YES | YES | YES | NO | NO | — | NO | NO |
| **partner** | YES | YES | YES | YES | YES | NO | NO | NO | — | NO |
| **ambassador** | YES | YES | YES | YES | YES | NO | NO | NO | NO | — |
| **ui** | — | YES | NO | NO | NO | NO | NO | NO | NO | NO |
| **design-tokens** | — | — | NO | NO | NO | NO | NO | NO | NO | NO |
| **types** | — | — | — | NO | NO | NO | NO | NO | NO | NO |
| **api-sdk** | NO | NO | YES | — | YES | NO | NO | NO | NO | NO |
| **shared** | NO | NO | YES | NO | — | NO | NO | NO | NO | NO |

### 3.3 Import Rules

| Rule | Description | Violation = |
|------|------------|-------------|
| **No app-to-app imports** | web, api, admin, partner, ambassador are independent | CI failure |
| **No package-to-app imports** | Packages can never import from apps | CI failure |
| **No circular package imports** | ui → api-sdk, api-sdk → ui, etc. | CI failure |
| **No deep imports** | `import { X } from '@egypthub/ui/dist/components/...'` | Lint error |
| **Only `@egypthub/*` barrell exports** | Import only from package index.ts | Lint error |
| **No direct npm dependency in apps** | All shared deps go through packages | Lint error |

### 3.4 Path Alias Convention

Each app configures path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "~features/*": ["./src/features/*"],
      "~stores/*": ["./src/stores/*"],
      "~providers/*": ["./src/providers/*"],
      "~hooks/*": ["./src/hooks/*"],
      "~lib/*": ["./src/lib/*"]
    }
  }
}
```

Package imports use the `@egypthub/*` scope — no path aliases needed.

---

## 4. Build Boundaries

### 4.1 Turbo Pipeline (`turbo.json`)

```jsonc
{
  "tasks": {
    // Top-level
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^build"]
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    },

    // Package-specific
    "@egypthub/design-tokens#build": {
      "dependsOn": ["@egypthub/types#build"]
    },
    "@egypthub/ui#build": {
      "dependsOn": ["@egypthub/design-tokens#build"]
    },
    "@egypthub/api-sdk#build": {
      "dependsOn": ["@egypthub/types#build", "@egypthub/shared#build"]
    },

    // App-specific
    "@egypthub/web#build": {
      "dependsOn": [
        "@egypthub/ui#build",
        "@egypthub/api-sdk#build",
        "@egypthub/shared#build"
      ],
      "outputs": [".next/**"]
    },
    "@egypthub/admin#build": {
      "dependsOn": [
        "@egypthub/ui#build",
        "@egypthub/api-sdk#build",
        "@egypthub/shared#build"
      ],
      "outputs": [".next/**"]
    },
    "@egypthub/partner#build": {
      "dependsOn": [
        "@egypthub/ui#build",
        "@egypthub/api-sdk#build",
        "@egypthub/shared#build"
      ],
      "outputs": [".next/**"]
    },
    "@egypthub/ambassador#build": {
      "dependsOn": [
        "@egypthub/ui#build",
        "@egypthub/api-sdk#build",
        "@egypthub/shared#build"
      ],
      "outputs": [".next/**"]
    },
    "@egypthub/api#build": {
      "dependsOn": [
        "@egypthub/types#build",
        "@egypthub/shared#build"
      ],
      "outputs": ["dist/**"]
    }
  }
}
```

### 4.2 Build Order (Topological Sort)

```
Step  1: @egypthub/types          (no package deps)
Step  2: @egypthub/design-tokens  (depends on: types)
Step  3: @egypthub/shared         (depends on: types)
Step  4: @egypthub/api-sdk        (depends on: types, shared)
Step  5: @egypthub/ui             (depends on: design-tokens)
Step  6: @egypthub/api            (depends on: types, shared)
Step  7: @egypthub/web            (depends on: ui, api-sdk, shared)
Step  8: @egypthub/admin          (depends on: ui, api-sdk, shared)
Step  9: @egypthub/partner        (depends on: ui, api-sdk, shared)
Step 10: @egypthub/ambassador     (depends on: ui, api-sdk, shared)
```

### 4.3 Build Outputs

| Package | Build Command | Output | Watch Mode |
|---------|---------------|--------|------------|
| types | `tsc` | `dist/` | `tsc --watch` |
| design-tokens | `tsup` | `dist/` | `tsup --watch` |
| shared | `tsup` | `dist/` | `tsup --watch` |
| api-sdk | `tsup` | `dist/` | `tsup --watch` |
| ui | `tsup` | `dist/` + `tailwind.css` | `tsup --watch` |
| api | `nest build` | `dist/` | `nest start --watch` |
| web | `next build` | `.next/` | `next dev` |
| admin | `next build` | `.next/` | `next dev` |
| partner | `next build` | `.next/` | `next dev` |
| ambassador | `next build` | `.next/` | `next dev` |

### 4.4 Package Build Configuration

| Package | Bundle Tool | Format | Dts | External |
|---------|------------|--------|-----|----------|
| types | tsc | ESM | YES | none |
| design-tokens | tsup | ESM + CJS | YES | none |
| shared | tsup | ESM + CJS | YES | zod, date-fns |
| api-sdk | tsup | ESM + CJS | YES | @egypthub/types, @egypthub/shared |
| ui | tsup + PostCSS | ESM + CJS + CSS | YES | react, react-dom, tailwind-merge, clsx, framer-motion |

---

## 5. Dependency Graph

### 5.1 Full Graph

```
@egypthub/types (leaf)
  ^
  ├── @egypthub/design-tokens
  │     ^
  │     └── @egypthub/ui
  │           ^
  │           ├── @egypthub/web
  │           ├── @egypthub/admin
  │           ├── @egypthub/partner
  │           └── @egypthub/ambassador
  │
  ├── @egypthub/shared
  │     ^
  │     ├── @egypthub/api-sdk
  │     │     ^
  │     │     ├── @egypthub/web
  │     │     ├── @egypthub/admin
  │     │     ├── @egypthub/partner
  │     │     └── @egypthub/ambassador
  │     │
  │     ├── @egypthub/api
  │     │
  │     ├── @egypthub/web
  │     ├── @egypthub/admin
  │     ├── @egypthub/partner
  │     └── @egypthub/ambassador
  │
  └── @egypthub/api (BFF)
        ^
        └── (consumes webhook responses, not imported)
```

### 5.2 Runtime Dependency Flow

```
Browser (web/admin/partner/ambassador)
    │
    │  @egypthub/api-sdk (HTTP + WebSocket)
    │  @egypthub/types
    │  @egypthub/shared
    ▼
@egypthub/api (NestJS BFF)
    │
    ├── Database (PostgreSQL)
    ├── Cache (Redis)
    ├── AI Service (External API)
    ├── Payment Gateway (Stripe)
    ├── SMS Provider (Twilio)
    └── Storage (S3-compatible)
```

---

## 6. CI/CD Integration Points

### 6.1 Workflow Triggers

| Event | Workflow | Actions |
|-------|----------|---------|
| Push to `feat/*` | CI | lint → typecheck → test → build |
| PR to `develop` | CI + Preview | lint → typecheck → test → build → deploy preview |
| Push to `develop` | CI + CD Staging | lint → typecheck → test → build → deploy staging |
| PR to `main` | CI + Preview | lint → typecheck → test → build → deploy preview |
| Push to `main` | CI + CD Production | lint → typecheck → test → build → deploy production |
| Schedule (daily) | Dependency Review | `pnpm audit`, `dependabot` |
| Release published | Release Drafter | Generate changelog, tag version |

### 6.2 CI Pipeline Stages

```
Stage 1: Setup
  ├── actions/setup
  │   ├── checkout
  │   ├── node 20
  │   ├── pnpm install
  │   └── cache restore (turbo, next, pnpm)
  │
Stage 2: Quality
  ├── pnpm lint          (all packages + apps)
  ├── pnpm typecheck     (all packages + apps)
  ├── pnpm test          (all packages + apps)
  └── pnpm audit         (dependency vulnerabilities)
  │
Stage 3: Build
  ├── pnpm build         (turbo — all packages → all apps)
  │
Stage 4: Artifacts
  ├── Upload .next/       (web, admin, partner, ambassador)
  ├── Upload dist/        (api)
  └── Upload Docker images (if containerized)
  │
Stage 5: Deploy (CD only)
  ├── Deploy api
  ├── Run migrations
  ├── Deploy web
  ├── Deploy admin
  ├── Deploy partner
  ├── Deploy ambassador
  └── Smoke tests
```

### 6.3 Build Cache Strategy

| Cache Key | Scope | Duration | Storage |
|-----------|-------|----------|---------|
| `turbo-<sha>` | All outputs | 7 days | GitHub Actions cache |
| `next-<app>-<sha>` | `.next/` per app | 7 days | GitHub Actions cache |
| `pnpm-store-<lock-hash>` | `node_modules/` | 30 days | GitHub Actions cache |
| Docker layers | Image layers | Until cleanup | Docker registry |

### 6.4 Preview Deployments

Every PR to `develop` or `main` gets a preview deployment:

| App | Preview URL | Platform |
|-----|-------------|----------|
| web | `https://pr-<number>.web.egypthub.dev` | Vercel / Cloudflare |
| api | `https://pr-<number>.api.egypthub.dev` | Fly.io / Railway |
| admin | `https://pr-<number>.admin.egypthub.dev` | Vercel / Cloudflare |
| partner | `https://pr-<number>.partner.egypthub.dev` | Vercel / Cloudflare |
| ambassador | `https://pr-<number>.ambassador.egypthub.dev` | Vercel / Cloudflare |

---

## 7. Environment Variable Strategy

### 7.1 Variable Scoping

| Prefix | Scope | Used By | Example |
|--------|-------|---------|---------|
| `NEXT_PUBLIC_*` | Client-side browser | web, admin, partner, ambassador | `NEXT_PUBLIC_API_URL` |
| `API_*` | Server-side BFF | api | `API_DATABASE_URL` |
| `REDIS_*` | Redis connection | api | `REDIS_URL` |
| `JWT_*` | Authentication | api | `JWT_SECRET` |
| `STRIPE_*` | Payment processing | api | `STRIPE_SECRET_KEY` |
| `AWS_*` | Cloud storage | api | `AWS_S3_BUCKET` |
| `SMTP_*` | Email service | api | `SMTP_HOST` |
| `SENTRY_*` | Error monitoring | All apps | `SENTRY_DSN` |
| `OTEL_*` | OpenTelemetry tracing | api | `OTEL_ENDPOINT` |

### 7.2 File-Based Configuration

| File | Scope | Gitignored? | Used When |
|------|-------|-------------|-----------|
| `.env.example` | All documented vars | NO | Template, documentation |
| `.env.local` | Local overrides | YES | `pnpm dev` |
| `.env.staging` | Staging environment | YES | CD staging workflow |
| `.env.production` | Production environment | YES | CD production workflow |
| `.env.test` | Test environment | YES | `pnpm test` (CI) |

### 7.3 Validation Strategy

All environment variables are validated at startup:

- **Frontend apps:** Zod schema in `middleware.ts` or root layout
- **API app:** NestJS `ConfigModule` with `joi` or Zod validation
- **CI/CD:** Fail-fast if required vars missing in deployment workflow

### 7.4 Secrets Management

| Environment | Secrets Storage | Access |
|-------------|----------------|--------|
| Local | `.env.local` (file) | Developer machine |
| CI | GitHub Actions secrets | CI runners |
| Staging | Deployment platform secrets (Vercel/Railway) | Platform console |
| Production | Deployment platform secrets + Vault (optional) | Platform console, DevOps |

### 7.5 Variable Inventory

```env
# ===== API (BFF) — apps/api =====
API_PORT=4000
API_DATABASE_URL=postgresql://...
API_REDIS_URL=redis://...
API_CORS_ORIGINS=http://localhost:3000,http://localhost:3001,...

# ===== Authentication =====
JWT_SECRET=...
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d

# ===== Payment =====
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_...

# ===== Storage =====
AWS_S3_BUCKET=egypthub-uploads
AWS_S3_REGION=me-south-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# ===== SMS =====
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# ===== Email =====
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM=noreply@egypthub.com

# ===== AI =====
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=sk-...
AI_MODEL=gpt-4o

# ===== External Maps =====
MAPBOX_TOKEN=pk...

# ===== Monitoring =====
SENTRY_DSN=https://...
SENTRY_ENVIRONMENT=development|staging|production
OTEL_ENDPOINT=http://...
OTEL_SERVICE_NAME=egypthub-api

# ===== Next.js Apps (web, admin, partner, ambassador) =====
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_MAPBOX_TOKEN=pk...
NEXT_PUBLIC_SENTRY_DSN=https://...
```

---

## 8. Naming Conventions

### 8.1 Package Naming

| Pattern | Example | Used By |
|---------|---------|---------|
| `@egypthub/<name>` | `@egypthub/web` | All internal packages |
| `@egypthub/<scope>/<name>` | (avoid — keep 1 level) | — |

### 8.2 Directory Naming

| Type | Convention | Example |
|------|-----------|---------|
| Package/app directories | kebab-case | `apps/web/`, `packages/design-tokens/` |
| Feature modules | kebab-case | `features/ai-concierge/`, `features/destination-grid/` |
| Component directories | PascalCase | `components/ChatBubble/`, `components/DestinationCard/` |
| Hook files | camelCase with `use` prefix | `hooks/useBreakpoint.ts` |
| Store files | kebab-case with `-store` suffix | `stores/auth-store.ts` |
| Test files | `*.test.ts` or `*.spec.ts` | `button.test.ts` |
| Type files | kebab-case | `types/api-response.ts` |
| Schema files | kebab-case | `schemas/guest-details.ts` |

### 8.3 File Naming

| File Type | Convention | Example |
|-----------|-----------|---------|
| React component | PascalCase | `Button.tsx`, `ChatBubble.tsx` |
| React hook | camelCase | `useBreakpoint.ts` |
| Utility function | camelCase | `formatCurrency.ts` |
| TypeScript type | PascalCase | `IApiResponse.ts` |
| CSS module | kebab-case | `button.module.css` |
| Test | `<name>.test.tsx` | `Button.test.tsx` |
| Story | `<name>.stories.tsx` | `Button.stories.tsx` |
| Index barrel | `index.ts` | `index.ts` |
| Page component | `page.tsx` | `page.tsx` |
| Layout component | `layout.tsx` | `layout.tsx` |
| Loading component | `loading.tsx` | `loading.tsx` |
| Error component | `error.tsx` | `error.tsx` |
| Not found component | `not-found.tsx` | `not-found.tsx` |
| Route handler | `route.ts` | `route.ts` |
| API service class | PascalCase with `Service` suffix | `BookingService.ts` |
| DTO class | PascalCase with `Dto` suffix | `CreateBookingDto.ts` |
| Entity class | PascalCase | `Booking.ts` |

### 8.4 TypeScript Naming

| Construct | Convention | Example |
|-----------|-----------|---------|
| Interface | `I` prefix + PascalCase | `IUser`, `IBooking` |
| Type alias | PascalCase | `ApiResponse<T>` |
| Enum | PascalCase | `UserRole`, `BookingStatus` |
| Function | camelCase | `fetchExperiences()` |
| Hook | `use` prefix + camelCase | `useBookings()` |
| Context | PascalCase | `AuthContext` |
| Provider | PascalCase with `Provider` suffix | `AuthProvider` |
| Store | camelCase | `authStore` |
| Zod Schema | PascalCase with `Schema` suffix | `LoginSchema` |
| CSS Variable | kebab-case with `--` prefix | `--color-bg-primary` |
| Tailwind utility | camelCase (v4) | `bg-primary`, `text-gold` |
| Environment variable | UPPER_SNAKE_CASE | `API_DATABASE_URL` |
| Query key array | camelCase, function | `queryKeys.bookings.all()` |
| Component prop | PascalCase with `Props` suffix | `ButtonProps` |

### 8.5 Git Conventions

| Convention | Pattern | Example |
|-----------|---------|---------|
| Branch naming | `<type>/<scope>/<description>` | `feat/web/booking-calendar` |
| Commit messages | Conventional Commits | `feat(web): add booking calendar component` |
| PR titles | Same as commit | `feat(web): add booking calendar component` |
| Release tags | `v<major>.<minor>.<patch>` | `v1.2.0` |

**Branch types:** `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`, `infra/`

### 8.6 Docker Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Image name | `egypthub/<app-name>` | `egypthub/web`, `egypthub/api` |
| Image tag | `latest`, `sha-<short>`, `v<version>` | `sha-a1b2c3d` |
| Container name | `egypthub-<app-name>` | `egypthub-web` |
| Dockerfile name | `Dockerfile.<app-name>` | `Dockerfile.web` |
| Compose service | kebab-case | `apps/web` → service: `web` |

---

## 9. Workspace Configuration

### 9.1 pnpm Workspace (`pnpm-workspace.yaml`)

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tools/*"
```

### 9.2 Root `package.json` Scripts

```jsonc
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "turbo dev --filter=@egypthub/web",
    "dev:api": "turbo dev --filter=@egypthub/api",
    "dev:admin": "turbo dev --filter=@egypthub/admin",
    "dev:partner": "turbo dev --filter=@egypthub/partner",
    "dev:ambassador": "turbo dev --filter=@egypthub/ambassador",
    "build": "turbo build",
    "build:packages": "turbo build --filter=./packages/*",
    "build:apps": "turbo build --filter=./apps/*",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "clean": "turbo clean",
    "clean:all": "turbo clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,json,css,md}\"",
    "codegen": "bash tools/scripts/codegen.sh",
    "db:migrate": "bash infra/scripts/migrate.sh",
    "db:seed": "bash infra/scripts/seed.sh",
    "docker:dev": "docker compose -f infra/docker/docker-compose.dev.yml up -d",
    "validate": "bash tools/scripts/validate.sh"
  }
}
```

### 9.3 Root `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "references": [
    { "path": "./packages/types" },
    { "path": "./packages/design-tokens" },
    { "path": "./packages/shared" },
    { "path": "./packages/api-sdk" },
    { "path": "./packages/ui" },
    { "path": "./apps/api" },
    { "path": "./apps/web" },
    { "path": "./apps/admin" },
    { "path": "./apps/partner" },
    { "path": "./apps/ambassador" }
  ]
}
```

---

## 10. Migration Path from Current Structure

### Current → Target Mapping

| Current | Target | Action |
|---------|--------|--------|
| `apps/web/` | `apps/web/` | Keep, restructure to feature modules |
| `apps/ambassador-dashboard/` | `apps/ambassador/` | Rename + restructure |
| `apps/partner-dashboard/` | `apps/partner/` | Rename + restructure |
| `apps/admin-dashboard/` | `apps/admin/` | Rename + restructure |
| — | `apps/api/` | **NEW** — consolidate services |
| `packages/shared-types/` | `packages/types/` | Rename + expand |
| `packages/design-tokens/` | `packages/design-tokens/` | Keep, update for v4 |
| `packages/i18n/` | `packages/shared/i18n/` | Merge into shared |
| — | `packages/ui/` | **NEW** — Shadcn-based library |
| — | `packages/api-sdk/` | **NEW** — API client SDK |
| — | `packages/shared/` | **NEW** — i18n, constants, utils |
| `services/*` (5 services) | `apps/api/modules/*` | Consolidate into BFF |
| — | `tools/` | **NEW** — shared configs |
| — | `.github/` | **NEW** — CI/CD workflows |
| `infra/` | `infra/` | Keep, expand with K8s + Terraform |
