# C4 Architecture — EgyptHub (AS-IS)

## Level 1: System Context

```mermaid
C4Context
  title System Context diagram for EgyptHub

  Person(traveler, "Traveler", "End user exploring Egypt destinations, booking, and chatting with Zainab AI")
  Person(ambassador, "Ambassador", "Local guide earning commissions via referrals")
  Person(partner, "Partner", "Business owner listing services (hotels, tours, etc.)")
  Person(admin, "Admin", "System operator managing partners, leads, and commissions")

  System(egypthub, "EgyptHub", "Next.js 14 static SPA — travel marketplace, AI concierge, referral economy")

  System_Ext(maps, "Maps Service", "Planned — interactive Egypt map overlay")
  System_Ext(email, "Email Service", "Planned — notifications / confirmations")
  System_Ext(payments, "Payments Service", "Future — real payment gateway integration")

  Rel(traveler, egypthub, "Browses destinations, chats with Zainab, books experiences")
  Rel(ambassador, egypthub, "Manages profile, shares referral links, views commissions")
  Rel(partner, egypthub, "Lists services, views leads, manages partnership")
  Rel(admin, egypthub, "Oversees network, reviews partners, tracks analytics")

  Rel(egypthub, maps, "Embeds coordinates on explorer map (static SVG)", "Planned API")
  Rel(egypthub, email, "Sends booking confirmations & partner notifications", "Planned API")
  Rel(egypthub, payments, "Processes checkout payments", "Future API")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Level 2: Container Diagram

```mermaid
C4Container
  title Container diagram for EgyptHub (static Next.js 14 SPA)

  Person(traveler, "Traveler", "End user")
  System_Boundary(egypthub, "EgyptHub SPA (output:'export')") {
    Container(webapp, "Next.js 14 Static App", "React 18, TypeScript, Tailwind CSS", "Serves all UI; runs entirely client-side")
    Container(explorer_engine, "Explorer Engine", "TypeScript", "Graph-based city/experience/story/food explorer with SVG map, filters, favorites, and localStorage analytics")
    Container(network_engine, "Network Engine", "TypeScript", "Partner lifecycle, ambassador profiles, referral tracking, lead pipeline, commission calculations, QR codes")
    Container(zainab_engine, "Zainab AI Engine", "TypeScript", "Rule-based conversational AI: intent resolution, recommendations, trip planning, session memory")
    Container(localStorage, "Browser localStorage", "Key-Value Store", "Persists favorites, analytics events, and session state")
    Container(data_static, "Static JSON Data", "JSON files in src/data/", "All entity data bundled at build time (destinations, experiences, stories, partners, etc.)")
  }

  Rel(traveler, webapp, "HTTPS", "Static HTML/JS/CSS")
  Rel(webapp, explorer_engine, "Imports and calls", "Client-side only")
  Rel(webapp, network_engine, "Imports and calls", "Client-side only")
  Rel(webapp, zainab_engine, "Imports and calls", "Client-side only")
  Rel(explorer_engine, localStorage, "Reads/writes", "Analytics, favorites")
  Rel(zainab_engine, data_static, "Imports", "Build-time bundled JSON")
  Rel(explorer_engine, data_static, "Imports", "Build-time bundled JSON")
  Rel(network_engine, data_static, "Imports", "Build-time bundled JSON")
  Rel(webapp, data_static, "Imports", "Build-time bundled JSON")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Level 3: Component Diagram

```mermaid
C4Component
  title Component diagram — Explorer Engine, Network Engine, Zainab AI Engine

  System_Boundary(explorer, "Explorer Engine — src/lib/explorer/") {
    Component(ee, "explorerEngine.ts", "Builds graph (cities, experiences, stories, food, ambassadors), cross-links nodes by city/relation")
    Component(fe, "filterEngine.ts", "Memoized filter pipeline (types, categories, cities, price, difficulty, search)")
    Component(de, "deepLinkEngine.ts", "Encodes/decodes explorer state to URL params for shareable links")
    Component(ce, "cityExplorer.ts", "City immersion data: stats, related cities, all nodes per city")
    Component(ae, "analyticsTracker.ts", "localStorage-based event tracking (clicks, views, filters, favorites)")
    Component(ve, "favoritesEngine.ts", "localStorage CRUD for saved discoveries")
    Component(mdt, "mapDataTransformer.ts", "Lat/Lng → SVG projection, marker clustering")
    Component(rc, "recommendationConnector.ts", "Maps Zainab intent categories to Explorer nodes")
  }

  System_Boundary(network, "Network Engine — src/lib/network/") {
    Component(pe, "partnerEngine.ts", "CRUD + search/filter for business partners; data from src/data/network/partners.json")
    Component(ame, "ambassadorEngine.ts", "Ambassador profiles, search, referral code generation")
    Component(re, "referralEngine.ts", "Referral creation, stats, link generation, click tracking; data from referrals.json")
    Component(le, "leadPipelineEngine.ts", "Lead lifecycle (create, status transitions, history); data from leads.json")
    Component(ce2, "commissionEngine.ts", "Commission calculation (flat/percentage/tier) + lifecycle; data from commissions.json")
    Component(lae, "leadAttributionEngine.ts", "Source attribution chain (lead → ambassador → partner)")
    Component(qre, "qrEngine.ts", "QR code data generation + scan tracking")
    Component(ple, "partnerLifecycleEngine.ts", "Partner application workflow (draft → review → approve/reject/suspend)")
    Component(na, "networkAnalytics.ts", "Aggregated stats (partners, ambassadors, leads, revenue top cities/categories)")
  }

  System_Boundary(zainab, "Zainab AI Engine — src/lib/zainab/") {
    Component(ir, "intentResolver.ts", "Regex-based intent detection (15 intents: relaxation, adventure, culture, food, luxury, diving, etc.)")
    Component(re2, "recommendationEngine.ts", "Intent-based/city-based/category-based recommendations; memory-aware combination")
    Component(ce3, "conversationEngine.ts", "Session memory, welcome/greeting/goodbye flows, contextual response builder, trip plan trigger")
    Component(tp, "tripPlanner.ts", "Hardcoded itineraries for 7 cities; auto-generates fallback itineraries")
    Component(se, "suggestionEngine.ts", "City suggestions, keyword search on search-index.json, quick intent buttons")
  }

  Rel(ee, fe, "Feeds nodes for filtering")
  Rel(ee, mdt, "Feeds nodes for map markers")
  Rel(ee, ce, "Provides graph for immersion queries")
  Rel(ce3, ir, "Resolves user message to intent")
  Rel(ce3, re2, "Fetches recommendations by intent or city")
  Rel(ce3, tp, "Triggers trip plan generation")
  Rel(ce3, se, "Fetches city suggestions")
  Rel(re2, ir, "Maps intent to knowledgeKey")
  Rel(rc, ee, "Feeds Zainab recommendations into Explorer graph")
  Rel(re, ame, "Looks up ambassador by referral code")
  Rel(ce2, le, "Resolves lead for commission calc")
  Rel(ce2, pe, "Resolves partner for commission calc")
  Rel(lae, le, "Builds attribution chain")
  Rel(na, pe, "Gathers partner stats")
  Rel(na, ame, "Gathers ambassador stats")
  Rel(na, le, "Gathers lead funnel")
  Rel(na, ce2, "Gathers commission stats")
  Rel(ple, pe, "Submits partner applications")
  Rel(qre, re, "Creates referral on QR scan")
  Rel(qre, ame, "Resolves ambassador for QR data")
  Rel(ae, "localStorage", "Persists events")
  Rel(ve, "localStorage", "Persists favorites")
```

---

**Confidence Level: HIGH** — All engines, components, and data sources verified against source code at `src/lib/`, `src/data/`, `src/components/`, and `src/app/`.
