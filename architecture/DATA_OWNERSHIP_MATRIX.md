# Data Ownership Matrix (AS-IS)

> Generated: 2026-06-23 | Status: Implemented vs Planned

## Legend
| Icon | Meaning |
|------|---------|
| ✅ | Implemented |
| ⚠️ | Partial / Shell |
| ❌ | Not implemented |

---

## Matrix

| Bounded Context | Aggregate | Owner Service | Database | Persistence | Notes |
|-----------------|-----------|---------------|----------|-------------|-------|
| **Identity** | User | ❌ No service | ❌ N/A | ❌ | Auth pages exist at `auth/login` & `auth/register` but no backend. No User type defined. ✅ Profile page shell exists but empty. |
| **Identity** | Session | ❌ N/A | ❌ N/A | ❌ | No auth middleware, no JWT, no session store. Page routing is unrestricted. |
| **Explorer** | Destination | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/destinations.json` ✅ | JSON file, read-only | 8 destinations, loaded at build time. No edit API. |
| **Explorer** | Experience | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/experiences.json` ✅ | JSON file, read-only | 80 experiences. No admin CRUD. |
| **Explorer** | Story | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/stories.json` ✅ | JSON file, read-only | 50 stories. No admin CRUD. |
| **Explorer** | Food | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/food.json` ✅ | JSON file, read-only | 100 food items. No admin CRUD. |
| **Explorer** | Ambassador (content) | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/ambassadors.json` ✅ | JSON file, read-only | 32 content ambassadors. |
| **Explorer** | ExplorerGraph | `src/lib/explorer/explorerEngine.ts` ✅ | In-memory (built from JSON) | Runtime memory | Graph built at call time. React state not persisted. |
| **Explorer** | CityRelations | `src/lib/explorer/explorerEngine.ts` ✅ | `src/data/city-relations.json` ✅ | JSON file, read-only | City-to-city travel relations. |
| **Explorer** | SearchIndex | ❌ No search engine | `src/data/search-index.json` ✅ | JSON file, static | Search index exists as data file but `src/hooks/` is empty — no search logic wired. |
| **Explorer** | Analytics | `src/lib/explorer/analyticsTracker.ts` ✅ | `localStorage` ✅ | Browser localStorage | ⚠️ 15 event types tracked. Non-identifying. 500 event cap. No backend export. |
| **Explorer** | Favorites | `src/lib/explorer/favoritesEngine.ts` ✅ | `localStorage` ✅ | Browser localStorage | No server sync. |
| **Network** | Ambassador (network) | `src/lib/network/ambassadorEngine.ts` ✅ | `src/data/network/ambassadors.json` ✅ | JSON file, read-only | 100 network ambassadors. Bilingual. |
| **Network** | Partner | `src/lib/network/partnerEngine.ts` ✅ | `src/data/network/partners.json` ✅ | JSON file, read-only | 50 partners with lifecycle status. |
| **Network** | Lead | `src/lib/network/leadPipelineEngine.ts` ✅ | `src/data/network/leads.json` ✅ | JSON file, read-write | 30 leads with full history timeline. In-memory only — changes not flushed to disk. |
| **Network** | Referral | `src/lib/network/referralEngine.ts` ✅ | `src/data/network/referrals.json` ✅ | JSON file, read-write | 20 referrals. In-memory push — no disk flush. |
| **Network** | Commission | `src/lib/network/commissionEngine.ts` ✅ | `src/data/network/commissions.json` ✅ | JSON file, read-write | 20 commissions. In-memory push — no disk flush. |
| **Network** | NetworkSettings | `src/lib/network/partnerEngine.ts` ⚠️ | `src/data/network/settings.json` ✅ | JSON file, read-only | Configured but not actively used in engine logic. |
| **Network** | QR | `src/lib/network/qrEngine.ts` ✅ | Referral data | In-memory | QR generation + scan creates referrals. No actual QR image generation. |
| **Network** | Attribution | `src/lib/network/leadAttributionEngine.ts` ✅ | Derived (cross-entity) | Computed | Attribution chains across Lead → Ambassador → Partner → Referral → Commission. |
| **AI** | Zainab AI | `src/lib/zainab/conversationEngine.ts` ✅ | In-memory state | Runtime memory | Stateless per session. No LLM integration — rule-based. |
| **AI** | Intent | `src/lib/zainab/intentResolver.ts` ✅ | `src/data/zainab-knowledge.json` ✅ | JSON file, read-only | 14 intent types resolved by keyword matching. |
| **AI** | Recommendation | `src/lib/zainab/recommendationEngine.ts` ✅ | Derived from data files | In-memory | Cross-entity recommendations (destinations, experiences, food, stories). |
| **AI** | Suggestion | `src/lib/zainab/suggestionEngine.ts` ✅ | Computed | In-memory | Quick-suggestion prompts for UI. |
| **AI** | TripPlanner | `src/lib/zainab/tripPlanner.ts` ⚠️ | In-memory | Runtime | Basic day-by-day plan structure. Limited to single-city. |
| **Booking** | Booking | ❌ No service | ❌ None | ❌ | `src/app/booking/` → UI shell only. `page.tsx`, `checkout/`, `confirmation/`, `details/` exist but no booking model or logic. |
| **Booking** | Payment | ❌ No service | ❌ None | ❌ | `src/app/payment/` → UI shell. No payment integration. |
| **Admin** | Admin | ❌ No service | ❌ None | ❌ | `src/app/admin/` exists, `admin/network/` page exists, but no admin logic. |
| **Business** | Business | ❌ No service | ❌ None | ❌ | `src/app/business/[slug]/` exists, UI only. |

## Summary

| Storage Type | Count | Details |
|-------------|-------|---------|
| JSON files (static) | 16 | All data files in `src/data/` |
| JSON files (simulated write) | 3 | leads.json, referrals.json, commissions.json — written in-memory, NOT flushed |
| localStorage | 2 | Analytics events + favorites |
| API / Database | 0 | No API routes, no database, no ORM |
| Auth / Session | 0 | No user system |
| Payment | 0 | No payment integration |

## Planned vs Implemented

- **Identity & Auth**: Planned for Phase 16 — currently open access
- **Booking engine**: Planned — only UI shells exist
- **Payment gateway**: Not planned in current codebase
- **Admin CRUD**: Planned — only route shells
- **Data persistence**: JSON files are read-only; simulated writes never hit disk
- **LLM integration**: Zainab is rule-based, no external AI API
- **Search engine**: Search index data exists but search hooks are empty
