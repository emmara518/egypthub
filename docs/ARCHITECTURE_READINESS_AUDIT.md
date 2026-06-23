# EgyptHub — Architecture Readiness Audit

> **Audit Date:** June 22, 2026
> **Documents Audited:** DOMAIN_ARCHITECTURE.md, DATABASE_ARCHITECTURE.md, API_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, SECURITY_ARCHITECTURE.md, IMPLEMENTATION_ROADMAP_V2.md
> **Auditors:** CTO, Principal Architect, Lead Backend Engineer, Lead Database Architect, Security Lead

---

## Scores

| Dimension | Score |
|---|---|
| **Architecture Completeness** | **87%** — All major domains, services, APIs, and modules defined. Gap in 3 tables, 1 module boundary, 1 RBAC role. |
| **Implementation Readiness** | **78%** — Senior engineers can begin implementation on ~80% of the system. 20% requires resolving documented gaps first. |
| **Production Readiness** | **65%** — Architecture is sound but 2 critical security gaps (PII encryption, token storage) must be resolved before production. |

---

## Cross-Document Alignment Summary

| Check Pair | Status | Critical Issues |
|---|---|---|
| Domain ↔ Database | ❌ 3 gaps | Seasons table, OfferRedemptions table, PayoutRecords table missing |
| Database ↔ API | ⚠️ 2 gaps | Favorites endpoint missing data model, cursor pagination unimplemented |
| API ↔ Backend | ⚠️ 2 gaps | Marketing role missing, notification module boundary split |
| Backend ↔ Security | ❌ 2 critical | PII stored in plaintext, refresh tokens stored in plaintext |
| Domain ↔ Security | ⚠️ 3 gaps | No password_history table, no OAuth tables, fraud_alerts table missing |

---

## Critical Risks (BLOCKING)

### CR-1: PII Stored in Plaintext
**Documents:** SECURITY_ARCHITECTURE §9.3–9.4 ↔ DATABASE_ARCHITECTURE §2.1

**Finding:** SECURITY mandates dual-encrypted email/phone storage (`email_encrypted` + `email_hash`) with AES-256-GCM. The `identity.users` table DDL stores `email TEXT NOT NULL` and `phone TEXT` in plaintext.

**Impact:** A database breach exposes all user emails and phone numbers — GDPR/PDPL violation with mandatory 72-hour breach notification.

**Fix Required:** Add `email_encrypted TEXT NOT NULL`, `email_hash TEXT NOT NULL UNIQUE`, `phone_encrypted TEXT`, `phone_hash TEXT UNIQUE` columns to `identity.users`. Backfill existing data. Remove plaintext `email` and `phone` columns.

---

### CR-2: Refresh Tokens Stored in Plaintext
**Documents:** SECURITY_ARCHITECTURE §5.1 ↔ DATABASE_ARCHITECTURE §2.1

**Finding:** DB schema defines `identity.sessions.refresh_token TEXT NOT NULL`. SECURITY specification requires `refresh_token_hash TEXT NOT NULL` (SHA-256 hashed). Plaintext storage of refresh tokens enables session hijacking if the database is compromised.

**Impact:** Any database read access exposes all active refresh tokens, allowing persistent session impersonation.

**Fix Required:** Change `refresh_token` to `refresh_token_hash TEXT NOT NULL` and hash tokens before storage. Update `TokenService` to store SHA-256 hash instead of raw token.

---

## High Risks (MUST FIX BEFORE IMPLEMENTATION)

### HR-1: Missing Seasons Table
**Documents:** DOMAIN_ARCHITECTURE §3.1 ↔ DATABASE_ARCHITECTURE §2.2

**Finding:** The `Destination` aggregate defines `seasons: Season[]` with lifecycle `Created → Active → Expired`. No `catalog.seasons` table exists in the database schema. Seasonal data (peak seasons, pricing periods, availability windows) cannot be stored.

**Impact:** Inability to model seasonal pricing, peak-season availability, or seasonal destination recommendations.

**Fix Required:** Add `catalog.seasons` table with `season_id, destination_id, name_ar, name_en, start_date, end_date, pricing_multiplier, status, created_at, updated_at`.

---

### HR-2: Missing OfferRedemptions Table
**Documents:** DOMAIN_ARCHITECTURE §4 ↔ DATABASE_ARCHITECTURE §2.2

**Finding:** The `OfferRedemption` entity has lifecycle `Created → Used` and is referenced in `Offer.usage.currentRedemptions`. No `catalog.offer_redemptions` table exists. Per-user offer usage limits cannot be enforced at the database level.

**Impact:** Coupon abuse (same user applying same offer across multiple bookings) cannot be prevented with database constraints — must rely on application-level checks only.

**Fix Required:** Add `catalog.offer_redemptions(user_id, offer_id, booking_id, redeemed_at)` with unique constraint on `(user_id, offer_id)`.

---

### HR-3: Missing PayoutRecords Table
**Documents:** DOMAIN_ARCHITECTURE §4 ↔ DATABASE_ARCHITECTURE §2.2

**Finding:** The `PayoutRecord` entity (parent: Partner) has lifecycle `Pending → Processed → Failed`. No corresponding table exists in the `catalog` schema. Partner payouts cannot be tracked.

**Impact:** No audit trail for partner commission payouts. Finance team cannot reconcile payments to partners.

**Fix Required:** Add `catalog.payout_records(partner_id, amount, currency, status, period_start, period_end, method, reference, paid_at)`.

---

### HR-4: Missing Marketing Role in RBAC
**Documents:** API_ARCHITECTURE §7.2, DOMAIN_ARCHITECTURE §8.1 ↔ SECURITY_ARCHITECTURE §3.2

**Finding:** Domain and API reference "Marketing" / "Marketing Team" as the owner for offer management with create/update permissions. The SECURITY RBAC system defines only 6 roles: TRAVELER, AMBASSADOR, PARTNER, FINANCE, CONTENT_ADMIN, SUPER_ADMIN. No Marketing role exists.

**Impact:** Offer management permissions cannot be assigned. Marketing team members must be granted CONTENT_ADMIN (too permissive) or SUPER_ADMIN (dangerous) to perform their duties, violating least privilege.

**Fix Required:** Add `MARKETING` role to the RBAC hierarchy between AMBASSADOR and FINANCE, with permissions: offers (read, write), destinations (read), experiences (read).

---

### HR-5: `/me/favorites` Has No Backing
**Documents:** API_ARCHITECTURE §4.3, IMPLEMENTATION_ROADMAP_V2 §4

**Finding:** The Server Action `toggleFavorite` calls `POST /v1/me/favorites/toggle`. No domain entity, database table, API endpoint definition, or backend module exists for favorites/wishlists.

**Impact:** The favorite toggle feature referenced in the roadmap cannot be implemented without a data model.

**Fix Required:** Either add a complete favorites module (entity: Favorite, table: `engagement.favorites(user_id, target_id, target_type, created_at)`, endpoints: toggle, list, delete), or remove the Server Action from the architecture if out of scope.

---

### HR-6: Missing Password History Table
**Documents:** SECURITY_ARCHITECTURE §7.2 ↔ DATABASE_ARCHITECTURE §2.1

**Finding:** SECURITY requires password history tracking with 5-entry history to prevent password reuse. The referenced `prisma.passwordHistory` in the code has no corresponding table in the database DDL. No `identity.password_history` table exists.

**Impact:** Password reuse prevention cannot be enforced. Users can cycle back to a previously used password immediately.

**Fix Required:** Add `identity.password_history(user_id, password_hash, created_at)` with foreign key to `identity.users`.

---

## Medium Risks (FIX DURING IMPLEMENTATION)

### MR-1: Notification Module Boundary Split
**Documents:** DOMAIN_ARCHITECTURE §2.1 (Engagement owns Notifications) ↔ BACKEND_ARCHITECTURE §3.2

**Finding:** Domain places Notifications under `CTX_ENGAGEMENT`. The BACKEND module structure defines `notification.module.ts` as a separate top-level module alongside `engagement.module.ts`. This creates two modules that both need access to the `engagement.notifications` table and notification templates.

**Impact:** Module boundary ambiguity. Duplicate service registrations possible. Unclear ownership for notification-related features.

**Fix Required:** Either merge NotificationModule into EngagementModule, or clearly separate: Engagement owns in-app notifications, NotificationModule owns channel delivery (email/SMS/push). Document the boundary.

---

### MR-2: Cursor Pagination Unimplemented
**Documents:** API_ARCHITECTURE §11.1 ↔ BACKEND_ARCHITECTURE §4.3

**Finding:** API defines cursor-based pagination as the primary method for authenticated lists (bookings, notifications, conversations). The BACKEND repository examples use offset-based pagination (`skip`/`take`) exclusively — no cursor implementation exists.

**Impact:** Authenticated list endpoints will use offset pagination, which degrades performance at scale (OFFSET + LIMIT scans all preceding rows). As user booking histories grow, queries slow linearly.

**Fix Required:** Add cursor pagination implementation to the common layer: `class CursorPaginationService { encodeCursor, decodeCursor, paginate }`. Implement in all authenticated list repositories.

---

### MR-3: Missing BookingModule → CatalogModule Dependency
**Documents:** BACKEND_ARCHITECTURE §3.2

**Finding:** BACKEND declares BookingModule dependencies as `Database, Redis, Payment, Queue`. BookingService queries experiences (name, price, capacity) from the catalog — this requires a dependency on CatalogModule (or at minimum, the ExperienceRepository).

**Impact:** NestJS will throw circular dependency errors or runtime injection failures when BookingService tries to use catalog data.

**Fix Required:** Add forward reference: `forwardRef(() => CatalogModule)` in BookingModule imports, and export ExperienceRepository from CatalogModule.

---

### MR-4: Missing NotificationModule → IdentityModule Dependency
**Documents:** BACKEND_ARCHITECTURE §3.2 ↔ SECURITY_ARCHITECTURE §2.3

**Finding:** NotificationModule sends emails/SMS requiring user email and phone from Identity. The declared dependencies (`Database, Queue`) don't include IdentityModule.

**Impact:** Cannot resolve user contact information for notifications at the module level. Must either query users table directly (coupling violation) or inject UserService from IdentityModule.

**Fix Required:** Add `forwardRef(() => IdentityModule)` to NotificationModule imports.

---

### MR-5: Password Algorithm Inconsistency
**Documents:** DOMAIN_ARCHITECTURE §5.1 ↔ DATABASE_ARCHITECTURE §2.1 ↔ SECURITY_ARCHITECTURE §7

**Finding:** Three documents specify different algorithms:
- DOMAIN: `PasswordHash` — `bcrypt, argon2id`
- DATABASE: `password_algo TEXT DEFAULT 'argon2id'` (default is argon2id)
- SECURITY: bcrypt with 12 salt rounds

**Impact:** Confusion during implementation. Engineer following SECURITY will use bcrypt but DB expects argon2id by default.

**Fix Required:** Standardize on **argon2id** (more modern, resistant to side-channel and GPU attacks). Update SECURITY to use argon2id. Update DOMAIN to prioritize argon2id.

---

### MR-6: No Event Signing/Encryption
**Documents:** DOMAIN_ARCHITECTURE §10.1 ↔ SECURITY_ARCHITECTURE §1

**Finding:** Cross-context events are published via BullMQ with the Outbox pattern but there is no mention of event payload signing (HMAC) or encryption for cross-service communication. All event bus consumers implicitly trust event payloads.

**Impact:** A compromised service can publish forged events (e.g., a fake `PaymentCaptured` event would trigger booking confirmation). Violates zero-trust principle.

**Fix Required:** Add event payload signing with a shared HMAC key. Each event consumer verifies the signature before processing. Document in Outbox section.

---

### MR-7: No Fraud Alerts Table
**Documents:** SECURITY_ARCHITECTURE §12.2 ↔ DATABASE_ARCHITECTURE

**Finding:** FraudDetectionService calls `this.prisma.fraudAlert.create(...)` to persist fraud alerts. No `audit.fraud_alerts` or `engagement.fraud_alerts` table exists in the database schema.

**Impact:** Fraud alerts are silently dropped at runtime (Prisma throws on missing table). The fraud team dashboard cannot display pending alerts.

**Fix Required:** Add `audit.fraud_alerts(id, user_id, checks, data, status, reviewed_by, reviewed_at, created_at)`.

---

### MR-8: Missing OAuth 2.0 Tables
**Documents:** SECURITY_ARCHITECTURE §2.1 ↔ DATABASE_ARCHITECTURE

**Finding:** SECURITY lists OAuth 2.0 (Google, Apple) as a supported authentication method. No `social_identities` table exists in the database schema. No OAuth strategy, controller, or endpoints are defined in BACKEND or API documents.

**Impact:** Social login cannot be implemented without a data model for storing external identity provider references.

**Fix Required:** Add `identity.social_identities(user_id, provider, provider_id, email, profile_json, created_at)` with unique constraint on `(provider, provider_id)`.

---

## Low Risks (ADDRESS IN SPRINT BACKLOG)

### LR-1: Payment event name inconsistency
`payment.authorised` (British, in domain events) vs `payment.captured` (American, in API). Standardize to American English (`payment.authorized`) throughout.

### LR-2: Gateway response schema validation
`payment.gateway_response JSONB` is opaque. Consider a structured schema or at minimum documented fields expected from each payment provider.

### LR-3: No category → destination relationship
Domain Destination aggregate includes `categories: CategoryRef[]`, but DB only has `experience_categories` junction. Categories can only relate to experiences, not directly to destinations.

### LR-4: Wallet currency limitation
Wallet table has `currency TEXT DEFAULT 'EGP'` — single currency per wallet. Multi-currency wallets (for international travelers) are not supported. If this is intentional, document the limitation.

### LR-5: No `experiences` location GIST index
DB defines GIST indexes for destinations and partners locations but not for `catalog.experiences.location`. Map-based experience search will be slow.

### LR-6: No `deleted_at` on notifications
Notification table has no soft-delete column. The retention policy says "Delete after 90 days" — hard delete is acceptable, but document explicitly.

### LR-7: Webhook retry persistence
Webhook retry state is in-memory only. If the service restarts during a retry backoff cycle, the retry state is lost.

### LR-8: No Ambassador earnings-ledger table
Ambassador earnings are stored as JSONB (`earnings_json`). For an auditable financial system, this should be a ledger table with immutable entries, matching the wallet_ledger pattern.

---

## Undocumented Assumptions

| Assumption | Implication | Validation Needed |
|---|---|---|
| Single payment gateway | No fallback if gateway is down | Define gateway redundancy strategy |
| Single-region deployment (primary) | Multi-AZ within one region | Document cross-region DR plan |
| No mobile app at launch | API contracts will be consumed by mobile later | Ensure API versioning strategy covers mobile |
| Prisma as ORM handles connection pooling | PgBouncer may still be needed at scale | Load test connection pool limits |
| Redis single cluster (not cluster mode) | May need Redis Cluster at scale | Define Redis sharding trigger |

---

## Final Decision

**APPROVED FOR IMPLEMENTATION — WITH CONDITIONS**

The architecture is structurally sound and covers the full scope of the EgyptHub platform. The 6-blocker conditions below must be resolved before any production deployment, and the high-risk items must be addressed in the first implementation sprint.

### Required Before Production Deployment

1. **CR-1**: Encrypt PII in `identity.users` (email, phone) — dual storage with encrypted + hash lookup
2. **CR-2**: Hash refresh tokens in `identity.sessions` — never store raw tokens
3. **HR-1**: Add `catalog.seasons` table for seasonal data
4. **HR-2**: Add `catalog.offer_redemptions` table for coupon tracking
5. **HR-3**: Add `catalog.payout_records` table for partner payouts
6. **HR-4**: Add `MARKETING` role to RBAC

### Required in First Implementation Sprint

7. **HR-5**: Either implement favorites data model or remove from Server Action catalog
8. **HR-6**: Add `identity.password_history` table
9. **MR-1**: Resolve NotificationModule/EngagementModule boundary
10. **MR-3**: Add CatalogModule dependency to BookingModule
11. **MR-4**: Add IdentityModule dependency to NotificationModule
12. **MR-5**: Standardize password algorithm to argon2id

### Recommended in First Two Sprints

13. **MR-2**: Implement cursor pagination for authenticated list endpoints
14. **MR-6**: Add event payload signing for cross-service event bus
15. **MR-7**: Add `audit.fraud_alerts` table
16. **MR-8**: Add `identity.social_identities` table for OAuth

---

*End of Architecture Readiness Audit — Version 1.0*
