# Business Capability Map

## Part 1 — Capability Map

| Capability | Owner | Status | Evidence |
|---|---|---|---|
| Identity & Auth | — | **Planned** | `src/app/auth/login/` and `src/app/auth/register/` exist as UI shells with no backend; no session management, JWT, or OAuth found anywhere |
| Discovery (Destinations, Experiences, Stories) | Explorer Engine | **Implemented** | `src/app/destinations/`, `src/app/experiences/`, `src/app/stories/` all have listing pages (`page.tsx`) + detail pages (`[slug]/page.tsx`); data from `src/data/destinations.json`, `experiences.json`, `stories.json` |
| Explorer (Graph-based navigation) | Explorer Engine | **Implemented** | `src/app/explore/page.tsx` with `buildExplorerGraph()` (`src/lib/explorer/explorerEngine.ts:137`), filter engine (`filterEngine.ts`), SVG map with markers (`mapDataTransformer.ts`), favorites (`favoritesEngine.ts`), analytics (`analyticsTracker.ts`), deep links (`deepLinkEngine.ts`) |
| AI Concierge (Zainab) | Zainab AI Engine | **Implemented** | `src/app/zainab/page.tsx` and `src/app/ai-concierge/page.tsx` with `AIConciergeChat` component; rule-based intent resolution (`intentResolver.ts`), recommendations (`recommendationEngine.ts`), trip planning (`tripPlanner.ts`), suggestions (`suggestionEngine.ts`) |
| Network & Partners | Network Engine | **Implemented** | `src/app/partners/` (listing + `[slug]/` detail + `join/` + `dashboard/`); `partnerEngine.ts` CRUD; `partnerLifecycleEngine.ts` application workflow |
| Referral Economy | Network Engine | **Implemented** | `referralEngine.ts` (create, track, stats), `ambassadorEngine.ts` (referral codes), `qrEngine.ts` (scannable referrals), `commissionEngine.ts` (earnings calculation) |
| Analytics (localStorage-based) | Explorer Engine | **Implemented** | `analyticsTracker.ts` tracks 15 event types (`city_click`, `experience_click`, `search_query`, etc.) to localStorage; `networkAnalytics.ts` aggregates partner/ambassador/lead/revenue stats from static JSON |
| Ambassador Portal | Network Engine | **Implemented** | `src/app/ambassadors/` (listing + `[slug]/` + `dashboard/`); `ambassadorEngine.ts` for search/filter/profile; `dashboard/` for per-ambassador analytics |
| Booking & Checkout | — | **Planned (UI shell)** | `src/app/booking/` has a 5-step booking wizard (`page.tsx`), `checkout/page.tsx`, `confirmation/page.tsx`, `details/page.tsx`; `src/app/booking/checkout/` exists but no real payment integration |
| Payment Processing | — | **Future** | `src/app/payment/page.tsx` is a UI shell showing mock card forms; no Stripe/PayPal/etc. integration; `checkout/` flows are entirely simulated |
| Wallet | — | **Planned** | `src/app/wallet/page.tsx` exists as a stub |
| Favorites / Saved Items | Explorer Engine | **Implemented** | `favoritesEngine.ts` with localStorage CRUD; `src/app/favorites/page.tsx` |
| Search | Explorer Engine | **Implemented** | `src/app/search/page.tsx`; `src/data/search-index.json` for keyword-based lookup; `searchNodes()` in `explorerEngine.ts:306`, `searchByKeyword()` in `suggestionEngine.ts:46` |
| Admin Dashboard | Network Engine | **Planned (UI shell)** | `src/app/admin/network/page.tsx` exists; no authentication or backend integration |

---

## Part 2 — Architecture Traceability Matrix

| Business Goal | Capability | Engine / Module | Key Routes | Evidence File & Line |
|---|---|---|---|---|
| Discover Egypt destinations | Discovery | Explorer Engine | `/destinations`, `/destinations/[slug]`, `/experiences`, `/experiences/[slug]`, `/stories`, `/stories/[slug]` | `src/app/destinations/page.tsx:1`, `src/lib/explorer/explorerEngine.ts:33-113` |
| Explore interactively | Explorer | Explorer Engine | `/explore` | `src/app/explore/page.tsx:1`, `src/lib/explorer/explorerEngine.ts:137-206` |
| Get AI travel recommendations | AI Concierge | Zainab AI Engine | `/zainab`, `/ai-concierge` | `src/app/zainab/page.tsx:1`, `src/lib/zainab/conversationEngine.ts:168-204` |
| Plan a trip | AI Concierge | Zainab AI Engine (Trip Planner) | `/zainab` | `src/lib/zainab/tripPlanner.ts:57-85` |
| List business as partner | Network & Partners | Network Engine | `/partners/join`, `/partners/dashboard` | `src/lib/network/partnerLifecycleEngine.ts:13-15` |
| Earn via referrals | Referral Economy | Network Engine | `/ambassadors/dashboard` | `src/lib/network/referralEngine.ts:11-67`, `ambassadorEngine.ts:43-49` |
| Track commissions | Referral Economy | Network Engine (Commission Engine) | `/ambassadors/dashboard` | `src/lib/network/commissionEngine.ts:28-43` |
| Generate QR referral | Referral Economy | Network Engine (QR Engine) | N/A (utility) | `src/lib/network/qrEngine.ts:5-10` |
| Track user behavior | Analytics | Explorer Engine (Analytics Tracker) | throughout app | `src/lib/explorer/analyticsTracker.ts:48-57` |
| Save favorites | Favorites | Explorer Engine | `/favorites` | `src/lib/explorer/favoritesEngine.ts:33-43` |
| Search content | Search | Explorer Engine / Zainab Engine | `/search`, `/explore` | `src/lib/explorer/explorerEngine.ts:306-319`, `src/lib/zainab/suggestionEngine.ts:46-98` |
| Administer network | Admin Dashboard | Network Engine | `/admin/network` | `src/app/admin/network/page.tsx` |
| Book a trip | Booking & Checkout | — (UI shell) | `/booking`, `/booking/checkout`, `/booking/confirmation` | `src/app/booking/page.tsx:1` (5-step wizard, no real payment) |
| Make payment | Payment Processing | — (Future) | `/payment` | `src/app/payment/page.tsx:1` (mock card form, no gateway) |

---

**Confidence Level: HIGH** — Every capability, route, and engine is traced to actual source files confirmed via `src/app/`, `src/lib/`, and `src/data/` inspection. Planned/Future items explicitly documented as such.
