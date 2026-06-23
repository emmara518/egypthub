# Architecture Decision Records

---

## ADR-001: Next.js 14 (Not 15)

**Context:** The project uses `package.json` at `apps/web/package.json:15` specifying `"next": "^14.2.0"`. Next.js 15 was available at inception but was not adopted.

**Decision:** Use Next.js 14.2.x with React 18.3 (`"react": "^18.3.0"`) and the `pages` router-equivalent App Router (`src/app/` with `layout.tsx` + `page.tsx`). Key dependencies (framer-motion, react-icons, tailwindcss) are compatible with this version.

**Consequences:**
- Benefit: Stable, widely tested ecosystem; all third-party components verified against React 18.
- Benefit: The `output: 'export'` feature is fully supported in Next.js 14 (see ADR-002).
- Trade-off: No access to Next.js 15 features (e.g., async `cookies()`, `server-only` improvements, Turbopack stability in dev).
- Trade-off: React 19 support requires a future upgrade path.

**Evidence:** `apps/web/package.json:13-22`

---

## ADR-002: Static Export (`output: 'export'`)

**Context:** `next.config.js:4` sets `output: 'export'`, along with `basePath: '/egypthub'`, `assetPrefix: '/egypthub'`, `trailingSlash: true`, and `images.unoptimized: true`. The project must produce a fully static site deployable to any CDN or static host.

**Decision:** Export as a static SPA. No Node.js server, no API routes, no server-side rendering (SSR), no ISR. All data is bundled as JSON at build time. Client-side logic (React state, localStorage) handles all interactivity.

**Consequences:**
- Benefit: Zero server costs; deployable to GitHub Pages, Netlify, S3, etc.
- Benefit: No backend infrastructure to maintain.
- Trade-off: No server-side auth; all auth flows (login/register at `src/app/auth/`) are UI shells without real backend.
- Trade-off: No real payment processing — `src/app/payment/` and `src/app/booking/checkout/` are UI simulations.
- Trade-off: All analytics are client-side only (localStorage in `analyticsTracker.ts:10-28`); no server-side event capture.

**Evidence:** `apps/web/next.config.js:1-16`, `apps/web/src/lib/explorer/analyticsTracker.ts:10-28`

---

## ADR-003: Graph-Based Explorer

**Context:** The exploration feature (`src/app/explore/`, `src/lib/explorer/`) needs to connect cities, experiences, stories, food items, and ambassadors in a browsable, filterable way. A graph data structure was chosen over a relational or document model.

**Decision:** Implement `ExplorerGraph` (`src/lib/explorer/explorerEngine.ts:137-206`) as an in-memory adjacency graph:
- Nodes: 5 types (`city`, `experience`, `story`, `food`, `ambassador`) defined in `types.ts:1`.
- Relations: Built from `city-relations.json` (inter-city links) and intra-city cross-links (e.g., all nodes sharing a `citySlug`).
- Query functions: `getRelatedNodes()`, `getNodesByType()`, `filterNodes()`, `searchNodes()`.
- Filter pipeline: `filterEngine.ts` with memoization (`WeakMap` cache, `line:3`).

**Consequences:**
- Benefit: Natural fit for "city hub with related experiences/stories/food" — O(1) node lookup via `Map<string, ExplorerNode>`.
- Benefit: Deep-linkable state via `deepLinkEngine.ts` encodes/decodes explorer state to URL.
- Trade-off: Graph built entirely from static JSON — no dynamic edge creation without a rebuild.
- Trade-off: Performance on very large datasets may degrade (no server-side pagination possible in static export).

**Evidence:** `src/lib/explorer/explorerEngine.ts:137-206`, `src/lib/explorer/types.ts:1-78`, `src/lib/explorer/filterEngine.ts:1-108`

---

## ADR-004: Local AI Layer — Zainab (Rule-Based, No LLM API)

**Context:** The project includes an AI concierge (`src/app/zainab/`, `src/app/ai-concierge/`, `src/lib/zainab/`). A decision was needed between integrating an external LLM API (e.g., OpenAI, Anthropic) or building a local rule-based engine.

**Decision:** Implement Zainab as a fully local, rule-based conversational engine:
- Intent resolution via regex pattern matching (`intentResolver.ts:3-60`, 15 intents including `relaxation`, `adventure`, `culture`, `food`, `luxury`, `diving`, `photography`, `digital-nomad`, `history`, etc.).
- Recommendations loaded from static JSON (`zainab-knowledge.json`) in `recommendationEngine.ts:11`.
- Trip planning with hardcoded itineraries for 7 cities (`tripPlanner.ts:9-55`).
- Session memory stored in React state (`SessionMemory` interface, `types.ts:131-137`).
- No API calls, no API keys, no server required.

**Consequences:**
- Benefit: Zero ongoing API costs; works offline; no latency; no data privacy concerns.
- Benefit: Deterministic behavior — testable with unit tests (vitest configured in `package.json:37`).
- Trade-off: Limited conversational depth; no natural language understanding (pure keyword/regex matching).
- Trade-off: Cannot handle novel queries outside predefined intents; falls back to `'general'` intent (`intentResolver.ts:81`).
- Trade-off: Hardcoded itineraries are static — they require a code change to add new cities or experiences.

**Evidence:** `src/lib/zainab/intentResolver.ts:3-60`, `src/lib/zainab/conversationEngine.ts:1-212`, `src/lib/zainab/tripPlanner.ts:9-55`, `src/data/zainab-knowledge.json`

---

## ADR-005: Referral-First Business Model

**Context:** The network engine (`src/lib/network/`) implements the platform's monetization and partner ecosystem. The core driver is referrals — ambassadors earn commissions by referring travelers to partners.

**Decision:** Design the business logic around a referral-first model:
- `referralEngine.ts`: Create referrals with 4 stages (`click`, `visit`, `lead`, `conversion`) per `types.ts:6`.
- `commissionEngine.ts`: Calculate commissions based on lead budget and partner rating using flat/percentage/tier rates from `settings.json`.
- `ambassadorEngine.ts`: Each ambassador has a unique referral code (`EGY-AMB-XXXX`, generated at `line:47-49`).
- `qrEngine.ts`: QR code scanning triggers referral creation (`type: 'visit'`).
- `leadAttributionEngine.ts`: Full attribution chain (lead → ambassador → partner → referral → commission).

**Consequences:**
- Benefit: Clear incentive structure — ambassadors are motivated to drive quality leads.
- Benefit: Full tracking pipeline from click to commission payout.
- Trade-off: All data is mock JSON (`src/data/network/ambassadors.json`, `partners.json`, `leads.json`, `commissions.json`, `referrals.json`, `settings.json`) — no real persistence.
- Trade-off: No actual payment or payout system exists (see Business Capability Map: Payments = Future).
- Trade-off: Referral links use `window.location.origin` (`referralEngine.ts:42`) and only work in browser context.

**Evidence:** `src/lib/network/referralEngine.ts:1-67`, `src/lib/network/commissionEngine.ts:1-103`, `src/lib/network/ambassadorEngine.ts:47-49`, `src/lib/network/leadAttributionEngine.ts:1-56`
