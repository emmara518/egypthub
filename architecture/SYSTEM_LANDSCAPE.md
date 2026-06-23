# SYSTEM LANDSCAPE — EgyptHub Monorepo

**Audit Date:** 2026-06-23
**Scope:** Full monorepo at `C:\SharmsGo\egypthub\`
**Architecture Type:** Monorepo (pnpm workspace + Turborepo)

---

## Monorepo Structure

```
egypthub/
├── apps/                          # 4 Next.js applications
│   ├── web/                       #   Main consumer-facing app (static export)
│   ├── admin-dashboard/           #   Admin panel (Next.js)
│   ├── partner-dashboard/         #   Partner portal (Next.js)
│   └── ambassador-dashboard/      #   Ambassador portal (Next.js)
├── services/                      # 6 NestJS backend services
│   ├── auth-service/              #   Authentication service (JWT, OTP)
│   ├── api-gateway/               #   API gateway
│   ├── backend/                   #   Monolithic backend
│   ├── ambassador-service/        #   Ambassador management
│   ├── bookings-service/          #   Bookings handling
│   └── listings-service/          #   Listings/catalog management
├── packages/                      # 4 shared packages
│   ├── design-tokens/
│   ├── i18n/
│   ├── shared-types/
│   └── ui/
├── data/                          # Static JSON data files
├── infrastructure/                # Deployment/infra configs
└── docs/                          # Documentation
```

> **Critical finding:** The services directory contains implemented backends, but **no app connects to them**. Each app is independently runnable and data-isolated.

---

## System Map (`apps/web` — Primary Application)

This diagram covers `apps/web` (the main `@egypthub/web` app), which is the focus of this document.

```mermaid
architecture-beta
  group client(client)[Browser]

  service web(server)[Next.js App] in client
    service header(component)[Header]
    service footer(component)[Footer]
    service hero(component)[Hero]
    service citywheel(component)[CityWheel]
    service aimap(component)[AIMapSection]
    service zainabwidget(component)[ZainabWidget]
    service explorepage(component)[ExplorePage]

  group engines[Client-Side Engines]
    service explorer(component)[Explorer Engine]
    service filter(component)[Filter Engine]
    service mapdata(component)[Map Data Transformer]
    service favorites(component)[Favorites Engine]
    service analytics(component)[Analytics Tracker]
    service deeplink(component)[Deep Link Engine]
    service recommendation(component)[Recommendation Connector]
    service network(component)[Network Engine]
    service zainab(component)[Zainab AI Engine]

  group data[Static JSON Data]
    service destinations(database)[destinations.json]
    service experiences(database)[experiences.json]
    service stories(database)[stories.json]
    service food(database)[food.json]
    service ambassadors(database)[ambassadors.json]
    service cityrelations(database)[city-relations.json]
    service searchindex(database)[search-index.json]
    service networkdata(database)[network/*.json]

  group storage[Browser Storage]
    service localstorage(database)[localStorage]

  web --> explorer
  web --> filter
  web --> mapdata
  web --> favorites
  web --> analytics
  web --> deeplink
  web --> recommendation
  web --> network
  web --> zainab

  explorer --> destinations
  explorer --> experiences
  explorer --> stories
  explorer --> food
  explorer --> ambassadors
  explorer --> cityrelations
  network --> networkdata
  zainab --> destinations
  zainab --> experiences
  zainab --> stories
  zainab --> food
  zainab --> cityrelations
  zainab --> searchindex

  analytics --> localstorage
  favorites --> localstorage
```

### Application Details

| Property | Value |
|---|---|
| **Framework** | Next.js 14.2 |
| **Output Mode** | Static Export (`output: 'export'`) |
| **Base Path** | `/egypthub` |
| **Runtime** | 100% client-side (`'use client'` on all interactive pages) |
| **Deployment** | Static files served from `out/` directory |
| **Port (dev)** | 3000 |

### Services/Engines (All In-Browser)

| Engine | Location | Type | Description |
|---|---|---|---|
| **Explorer Engine** | `src/lib/explorer/explorerEngine.ts` | Pure TS | Builds graph from JSON, filters, searches, computes city stats |
| **Filter Engine** | `src/lib/explorer/filterEngine.ts` | Pure TS | Applies multi-dimensional filters with WeakMap memoization |
| **Map Data Transformer** | `src/lib/explorer/mapDataTransformer.ts` | Pure TS | SVG coordinate projection, marker clustering |
| **Favorites Engine** | `src/lib/explorer/favoritesEngine.ts` | Pure TS | localStorage-backed favorites CRUD |
| **Analytics Tracker** | `src/lib/explorer/analyticsTracker.ts` | Pure TS | localStorage-backed event logging (max 500 events) |
| **Deep Link Engine** | `src/lib/explorer/deepLinkEngine.ts` | Pure TS | URL state serialization/deserialization |
| **Recommendation Connector** | `src/lib/explorer/recommendationConnector.ts` | Pure TS | Intent-to-category mapping, graph-to-recommendation bridging |
| **City Explorer** | `src/lib/explorer/cityExplorer.ts` | Pure TS | City immersion data aggregation |
| **Network Engine** | `src/lib/network/` | Pure TS | Partner, ambassador, referral, lead, commission, QR, analytics engines — all in-memory from JSON |
| **Zainab AI Engine** | `src/lib/zainab/` | Pure TS | Intent detection, conversation engine, trip planner, recommendation engine, suggestion engine — all rule-based, no ML/API |

### Data (All Static JSON Files)

| File | Records | Imported By |
|---|---|---|
| `src/data/destinations.json` | 8 cities | explorer, zainab, recommendation |
| `src/data/experiences.json` | ~50+ | explorer, zainab, recommendation |
| `src/data/stories.json` | ~10+ | explorer, zainab |
| `src/data/food.json` | ~20+ | explorer, zainab |
| `src/data/ambassadors.json` | ~100+ | explorer |
| `src/data/city-relations.json` | 8 cities | explorer, zainab |
| `src/data/search-index.json` | Keywords | suggestionEngine |
| `src/data/seo.json` | Per-city SEO | SEO |
| `src/data/images-manifest.json` | Images | Image management |
| `src/data/network/partners.json` | Partners | partnerEngine |
| `src/data/network/ambassadors.json` | Network ambassadors | ambassadorEngine |
| `src/data/network/leads.json` | Leads | leadPipelineEngine |
| `src/data/network/commissions.json` | Commissions | commissionEngine |
| `src/data/network/referrals.json` | Referrals | referralEngine |
| `src/data/network/settings.json` | Settings | commissionEngine |

### Storage

| Storage | Data | Key(s) |
|---|---|---|
| **localStorage** | Analytics events | `egypthub-analytics` |
| **localStorage** | User favorites | `egypthub-favorites`, `egypthub_favorites` |
| **localStorage** | Theme preference | `egypthub-theme` |
| **localStorage** | Recent searches | `egypthub_explorer_recent` |

### External Integrations

| Integration | Status | Notes |
|---|---|---|
| API Backend | **NOT CONNECTED** | `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:4000` but no code makes HTTP requests |
| Database | **NOT CONNECTED** | All data is static JSON; web app has zero database connections |
| Auth Service | **NOT CONNECTED** | Auth pages are UI-only; no JWT/OTP flow exists in web app |
| Third-party APIs | **NONE** | No Google Maps, no payment gateway, no SMS gateway, no email service |

### Communication Patterns

| Pattern | Present? | Details |
|---|---|---|
| HTTP/fetch | NONE | Zero `fetch()` or `axios` calls in the web app |
| WebSockets | NONE | No real-time communication |
| Server Actions | NONE | Static export disables server actions |
| API Routes | NONE | `next.config.js` uses `output: 'export'` |
| Client-side events | YES | `trackEvent()` → localStorage (no network) |
| Cross-app communication | NONE | Each app is standalone |
| Service-to-service | POTENTIAL | Backend services exist but no running instance is configured |

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                  │
│                                                                  │
│  ┌─────────────────────────────────────┐                        │
│  │         Next.js Static App          │                        │
│  │         (output: 'export')          │                        │
│  │                                     │                        │
│  │  ┌──────┐ ┌───────┐ ┌──────────┐   │                        │
│  │  │ UI   │ │Pages  │ │Components│   │                        │
│  │  │Theme │ │/explore│ │(28 files)│   │                        │
│  │  │Toggle│ │/auth/* │ │          │   │                        │
│  │  └──────┘ └───────┘ └──────────┘   │                        │
│  │         │           │              │                        │
│  │         ▼           ▼              │                        │
│  │  ┌──────────────────────────────┐  │                        │
│  │  │  Client-Side Engines (TS)    │  │                        │
│  │  │  Explorer · Network · Zainab │  │                        │
│  │  │  Filter · Analytics · etc.   │  │                        │
│  │  └──────────┬──────────┬────────┘  │                        │
│  │             │          │           │                        │
│  │             ▼          ▼           │                        │
│  │  ┌──────────┐  ┌──────────────┐   │                        │
│  │  │ JSON     │  │ localStorage │   │                        │
│  │  │ Files    │  │ (Browser)    │   │                        │
│  │  │ (static) │  │              │   │                        │
│  │  └──────────┘  └──────────────┘   │                        │
│  └─────────────────────────────────────┘                        │
│                                                                  │
│         ✦ NO API Calls ✦ NO Database ✦ NO Auth ✦                │
└─────────────────────────────────────────────────────────────────┘

         ╔══════════════════════════════╗
         ║  BACKEND SERVICES (EXIST)    ║
         ║  ─── but unconnected ───     ║
         ║  • Auth Service (NestJS/JWT) ║
         ║  • Backend API (NestJS/Helmet)║
         ║  • API Gateway               ║
         ║  • PostgreSQL (via Prisma)    ║
         ║  • Redis                      ║
         ╚══════════════════════════════╝
```

---

## Confidence Level

**HIGH** — every element of this landscape was verified by reading the actual source code, configuration files, and directory structure. The gap between the web app and backend services is a confirmed architectural finding, not an assumption.
