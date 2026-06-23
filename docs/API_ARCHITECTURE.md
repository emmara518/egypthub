# EgyptHub — API Architecture

> **Version:** 1.0
> **Status:** Approved
> **Patterns:** REST, Server Actions (Next.js), BFF
> **Protocol:** HTTPS, gRPC (internal)
> **Date:** June 2026

---

## Table of Contents

1. [API Design Principles](#1-api-design-principles)
2. [REST API Design](#2-rest-api-design)
3. [BFF Layer](#3-bff-layer)
4. [Server Actions](#4-server-actions)
5. [Query APIs](#5-query-apis)
6. [Mutation APIs](#6-mutation-apis)
7. [Permissions](#7-permissions)
8. [Rate Limiting](#8-rate-limiting)
9. [Validation](#9-validation)
10. [Error Contracts](#10-error-contracts)
11. [Pagination](#11-pagination)
12. [Filtering](#12-filtering)
13. [Sorting](#13-sorting)
14. [Versioning](#14-versioning)
15. [Caching](#15-caching)
16. [Idempotency](#16-idempotency)

---

## 1. API Design Principles

1. **Resource-oriented** — URLs represent nouns (resources), not actions
2. **Consistent naming** — Plural nouns, kebab-case, snake_case query params
3. **Stateless** — No server-side session state (JWT-based)
4. **Versioned** — URL prefix `/v1/` for external, no version for BFF
5. **Idempotent mutations** — Safe PUT/DELETE where semantics allow
6. **CQRS-aligned** — Separate read and write endpoints for complex resources
7. **Error contract** — Unified error response structure
8. **Backward compatible** — Non-breaking changes only within a version
9. **Self-describing** — HATEOAS links for navigation
10. **Secure by default** — Every endpoint requires authentication unless explicitly public

---

## 2. REST API Design

### 2.1 Base URL Structure

```
Environment        Base URL
──────────────────────────────────────────────────────
Production         https://api.egypthub.com/v1
Staging            https://api-staging.egypthub.com/v1
Development        http://localhost:4000/v1
Internal (gRPC)    api.egypthub.internal:50051
```

### 2.2 Resource Naming

| Pattern | Example | Description |
|---|---|---|
| `/{resources}` | `/destinations` | Collection |
| `/{resources}/{id}` | `/destinations/{id}` | Single resource |
| `/{resources}/{id}/{sub-resources}` | `/destinations/{id}/experiences` | Sub-collection |
| `/{resources}/{id}/{action}` | `/bookings/{id}/cancel` | Action (non-CRUD) |
| `/me/{resource}` | `/me/bookings` | Current user's resource |

### 2.3 HTTP Methods

| Method | Semantics | Idempotent | Safe |
|---|---|---|---|
| `GET` | Retrieve resource(s) | Yes | Yes |
| `POST` | Create resource or execute action | No | No |
| `PUT` | Full replace of resource | Yes | No |
| `PATCH` | Partial update of resource | No* | No |
| `DELETE` | Remove resource | Yes** | No |

*`PATCH` is not idempotent by default (use `If-Unmodified-Since` or `If-Match` for idempotency)\
**Subsequent `DELETE` calls return `404`, making the observable state idempotent

### 2.4 Standard Headers

| Header | When | Example |
|---|---|---|
| `Authorization: Bearer {jwt}` | All authenticated requests | — |
| `Accept-Language` | Localization | `ar-SA`, `en-US` |
| `Idempotency-Key` | Mutation requests | UUID |
| `If-Match` | Conditional updates | `"5"` (resource version) |
| `If-None-Match` | Conditional reads | ETag value |
| `X-Request-Id` | Tracing (optional client) | UUID |

---

## 3. BFF Layer

### 3.1 BFF Architecture

```
Client (Next.js)
    │
    ├── Server Component ──► Server Action ──► Internal API (NestJS)
    │                              │
    │                              └──► External API (3rd party)
    │
    ├── Client Component ──► BFF Route Handler ──► Internal API
    │
    └── Service Worker ──► BFF Route Handler ──► Internal API
```

### 3.2 BFF Responsibilities

| Responsibility | Implementation | Notes |
|---|---|---|
| Authentication | JWT validation + refresh | Before forwarding to internal API |
| Data aggregation | Combine multiple API calls | Server-side only |
| Response shaping | Trim fields for frontend | Remove internal fields |
| Localization | Resolve `Accept-Language` | Map to internal locale codes |
| Error mapping | Translate error contracts | NestJS → Next.js error format |
| Caching | Server-side cache for read data | Redis via Next.js `unstable_cache` |

### 3.3 BFF Endpoint Examples

```
Frontend Route              BFF Endpoint               Internal API(s)
────────────────────────────────────────────────────────────────────────
/                           GET /api/page/home          destinations[featured], experiences[top], offers[active]
/destinations/{slug}        GET /api/page/destination   destination[slug], experiences[destination_id], reviews
/book/{expId}               GET /api/page/booking        experience[id], availability, pricing
/me/bookings                GET /api/me/bookings         bookings[user_id], payments, reviews
```

---

## 4. Server Actions

### 4.1 Server Action Scope

Server Actions are used exclusively for **mutations initiated from Next.js Server Components** where:

- The action requires server-side auth checks
- The action benefits from zero-JS payload (Progressive Enhancement)
- The action triggers revalidation of related cached data

### 4.2 Action Pattern

```typescript
// apps/web/app/(dashboard)/bookings/[id]/cancel/actions.ts
'use server';

export async function cancelBooking(prevState: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate session (server-side)
  const session = await auth();
  if (!session) return { error: 'unauthorized' };

  // 2. Call internal API
  const result = await api.bookings.cancel(formData.get('bookingId') as string, {
    reason: formData.get('reason') as string,
  });

  // 3. Revalidate cache
  revalidatePath(`/bookings/${formData.get('bookingId')}`);

  // 4. Return result
  return { success: true, booking: result };
}
```

### 4.3 Server Action Catalog

| Action | Input | Internal API Call |
|---|---|---|
| `submitBooking` | experienceId, date, travelers | POST /v1/bookings |
| `applyCoupon` | code, bookingId | POST /v1/bookings/{id}/apply-coupon |
| `cancelBooking` | bookingId, reason | POST /v1/bookings/{id}/cancel |
| `createReview` | targetId, rating, content | POST /v1/reviews |
| `submitAmbassadorApplication` | — | POST /v1/ambassadors/apply |
| `toggleFavorite` | targetId, targetType | POST /v1/me/favorites/toggle |
| `updateProfile` | profile data | PATCH /v1/me/profile |

---

## 5. Query APIs

### 5.1 Query Endpoints

#### Catalog

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/destinations` | List all destinations | Public |
| `GET` | `/v1/destinations/{slug}` | Destination detail | Public |
| `GET` | `/v1/destinations/{id}/experiences` | Experiences in destination | Public |
| `GET` | `/v1/experiences` | Search/list experiences | Public |
| `GET` | `/v1/experiences/{slug}` | Experience detail | Public |
| `GET` | `/v1/experiences/{id}/availability` | Availability calendar | Public |
| `GET` | `/v1/categories` | List all categories | Public |
| `GET` | `/v1/offers` | List active offers | Public |
| `GET` | `/v1/offers/{id}` | Offer detail | Public |
| `GET` | `/v1/partners/{slug}` | Partner profile | Public |
| `GET` | `/v1/partners/{id}/experiences` | Partner's experiences | Public |
| `GET` | `/v1/stories` | List published stories | Public |
| `GET` | `/v1/stories/{id}` | Story detail | Public |

#### Booking

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/bookings/{id}` | Booking detail | User/Admin |
| `GET` | `/v1/me/bookings` | Current user's bookings | User |
| `GET` | `/v1/me/bookings/upcoming` | Upcoming bookings | User |
| `GET` | `/v1/me/bookings/past` | Past bookings | User |
| `GET` | `/v1/bookings/{id}/timeline` | Booking status timeline | User/Admin |
| `GET` | `/v1/availability/{experienceId}` | Date range availability | Public |
| `GET` | `/v1/availability/{experienceId}/slots` | Available time slots | Public |
| `GET` | `/v1/experiences/{id}/pricing` | Price calculation | Public |

#### Payment

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/payments/{id}` | Payment details | User/Admin |
| `GET` | `/v1/me/wallet` | Wallet balance + history | User |
| `GET` | `/v1/me/wallet/transactions` | Wallet transaction list | User |
| `GET` | `/v1/invoices/{id}` | Invoice detail | User/Admin |
| `GET` | `/v1/payment-methods` | Available payment methods | Public |

#### Engagement

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/experiences/{id}/reviews` | Experience reviews | Public |
| `GET` | `/v1/destinations/{id}/reviews` | Destination reviews | Public |
| `GET` | `/v1/me/reviews` | Current user's reviews | User |
| `GET` | `/v1/me/reward-profile` | Points, tier, badges | User |
| `GET` | `/v1/ambassadors/{code}` | Ambassador referral info | Public |
| `GET` | `/v1/me/ambassador` | Ambassador dashboard data | Ambassador |
| `GET` | `/v1/me/notifications` | User notifications | User |

#### AI

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/ai/recommendations` | Personalized recommendations | User |
| `GET` | `/v1/ai/conversations` | User conversation list | User |
| `GET` | `/v1/ai/conversations/{id}` | Conversation messages | User |
| `GET` | `/v1/ai/trip-plans` | User trip plans | User |
| `GET` | `/v1/ai/trip-plans/{id}` | Trip plan detail | User |
| `GET` | `/v1/ai/me/preferences` | User AI preferences | User |

#### Identity

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/v1/me/profile` | Current user profile | User |
| `GET` | `/v1/users/{id}` | Public user info | Public |
| `GET` | `/v1/roles` | Available roles | Admin |

### 5.2 Query Response Envelope

```json
{
  "data": { ... },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-06-22T07:00:00Z",
    "locale": "ar-SA"
  }
}
```

### 5.3 Collection Response Envelope

```json
{
  "data": [ ... ],
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-06-22T07:00:00Z",
    "page": 1,
    "pageSize": 20,
    "totalCount": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 6. Mutation APIs

### 6.1 Mutation Endpoints

#### Catalog (Admin/Partner)

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/destinations` | Admin | No |
| `PUT` | `/v1/destinations/{id}` | Admin | Yes |
| `PATCH` | `/v1/destinations/{id}` | Admin | No |
| `DELETE` | `/v1/destinations/{id}` | Admin | Yes |
| `POST` | `/v1/experiences` | Partner/Admin | No |
| `PUT` | `/v1/experiences/{id}` | Partner/Admin | Yes |
| `PATCH` | `/v1/experiences/{id}` | Partner/Admin | No |
| `DELETE` | `/v1/experiences/{id}` | Admin | Yes |
| `POST` | `/v1/experiences/{id}/publish` | Content Admin | No |
| `POST` | `/v1/offers` | Marketing/Admin | No |
| `POST` | `/v1/partners` | Admin | No |
| `PUT` | `/v1/partners/{id}` | Admin/Partner | Yes |
| `POST` | `/v1/stories` | User/Content | No |
| `POST` | `/v1/availability` | Partner/Admin | No |
| `PUT` | `/v1/availability/{id}` | Partner/Admin | Yes |

#### Booking

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/bookings` | User (or guest) | No* |
| `POST` | `/v1/bookings/{id}/confirm` | System | No |
| `POST` | `/v1/bookings/{id}/cancel` | User/Admin | No |
| `POST` | `/v1/bookings/preview` | Public | Yes |

\*Idempotency enforced via `Idempotency-Key` header

#### Payment

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/payments/authorize` | System | Yes (idempotency key) |
| `POST` | `/v1/payments/capture` | System | Yes (idempotency key) |
| `POST` | `/v1/payments/{id}/refund` | Admin/Finance | No |
| `POST` | `/v1/me/wallet/deposit` | User | Yes |
| `POST` | `/v1/me/wallet/withdraw` | User | Yes |
| `POST` | `/v1/installment-plans` | User | No |

#### Engagement

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/reviews` | User | No* |
| `PUT` | `/v1/reviews/{id}` | User | Yes |
| `DELETE` | `/v1/reviews/{id}` | User/Admin | Yes |
| `POST` | `/v1/reviews/{id}/helpful` | User | Yes |
| `POST` | `/v1/ambassadors/apply` | User | No |
| `POST` | `/v1/ambassadors/{id}/approve` | Admin | No |
| `POST` | `/v1/referrals/track` | Public (tracked link) | No |
| `PUT` | `/v1/me/reward-profile/redeem` | User | Yes |
| `PATCH` | `/v1/me/notifications/{id}/read` | User | Yes |

\*Idempotency enforced via unique constraint (one review per user-target)

#### AI

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/ai/conversations` | User | No |
| `POST` | `/v1/ai/conversations/{id}/messages` | User | No |
| `POST` | `/v1/ai/conversations/{id}/voice` | User | No |
| `POST` | `/v1/ai/trip-plans` | User | No |
| `PUT` | `/v1/ai/trip-plans/{id}` | User | Yes |
| `PATCH` | `/v1/ai/me/preferences` | User | No |

#### Identity

| Method | Path | Auth | Idempotent |
|---|---|---|---|
| `POST` | `/v1/auth/register` | Public | No |
| `POST` | `/v1/auth/login` | Public | No |
| `POST` | `/v1/auth/refresh` | Public | No |
| `POST` | `/v1/auth/logout` | User | Yes |
| `POST` | `/v1/auth/mfa/setup` | User | No |
| `POST` | `/v1/auth/mfa/verify` | User | No |
| `PATCH` | `/v1/me/profile` | User | No |
| `PATCH` | `/v1/me/password` | User | No |
| `DELETE` | `/v1/me/account` | User | Yes (soft) |

### 6.2 Mutation Request Envelope

```json
{
  "data": { ... },
  "meta": {
    "idempotencyKey": "uuid-v4",
    "requestId": "req_abc123"
  }
}
```

### 6.3 Mutation Response Envelope (Success)

```json
{
  "data": { ... },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-06-22T07:00:00Z",
    "changes": [
      { "field": "status", "from": "draft", "to": "confirmed" }
    ]
  }
}
```

---

## 7. Permissions

### 7.1 Permission Model

```
Permission = Action + Resource + Scope
Example: booking:read:own | booking:read:any | experience:write:partner
```

### 7.2 Permission Matrix

| Resource | Public | Traveler | Partner | Ambassador | Content Admin | Finance | Super Admin |
|---|---|---|---|---|---|---|---|
| destinations | read | read | read | read | read, write | read | read, write |
| experiences | read | read | read, write (own) | read | read, write | read | read, write |
| bookings | — | read, write (own) | read (own) | — | read | read | read, write |
| payments | — | read (own) | read (own, financial) | — | — | read, write | read, write |
| reviews | read | read, write | read | read | read, moderate | read | read, write |
| ambassadors | — | apply | — | read, write | — | — | read, approve |
| offers | read | read | read | read | read, write | read | read, write |
| partners | read | read | read, write | — | read, write | read | read, write |
| users | — | read, write (own) | read (own) | read (own) | read | read | read, write |
| notifications | — | read (own) | read (own) | read (own) | read | read | read |
| ai | — | read, write | — | — | — | — | read |
| analytics | — | — | read (own) | read (own) | read | read | read |

### 7.3 Permission Enforcement Points

| Layer | Enforcement | Mechanism |
|---|---|---|
| API Gateway | JWT validation, rate limiting | Middleware |
| BFF | Scope check before proxying | Server-side check |
| Controller | Resource-level authorization | NestJS guard |
| Service | Business rule enforcement | Service-layer check |
| Database | Row-level security | PostgreSQL RLS |

---

## 8. Rate Limiting

### 8.1 Rate Limit Tiers

| Tier | Requests/min | Burst | Applies To |
|---|---|---|---|
| Public (unauthenticated) | 30 | 10 | Search, destination list |
| Authenticated (traveler) | 120 | 30 | All read/write endpoints |
| Partner API | 300 | 60 | Partner dashboard, availability |
| Admin API | 600 | 120 | Admin dashboard |
| AI Concierge | 60 (per conversation) | 10 | Message send endpoint |
| Payment webhook | 1000 | — | Webhook receiver |

### 8.2 Rate Limit Headers

```http
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1624320000
Retry-After: 37
```

### 8.3 Rate Limit Exceeded Response

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 37 seconds.",
    "retryAfter": 37,
    "requestId": "req_abc123"
  }
}
```

---

## 9. Validation

### 9.1 Validation Layers

| Layer | What | Library |
|---|---|---|
| HTTP | Content-Type, Accept headers | NestJS built-in |
| Schema | Request body/query shape | class-validator + class-transformer |
| Business | Domain rules (e.g., capacity check) | Service-layer validation |
| Database | Constraints, unique indexes, FKs | PostgreSQL |

### 9.2 Schema Validation Rules

| Rule | Applies To | Error Code |
|---|---|---|
| String max/min length | All string fields | `VALIDATION_STRING_LENGTH` |
| Email format | email fields | `VALIDATION_EMAIL` |
| UUID format | id fields | `VALIDATION_UUID` |
| ISO 8601 date | date fields | `VALIDATION_DATE` |
| Enum value | status/type fields | `VALIDATION_ENUM` |
| Numeric range | price, rating, count | `VALIDATION_RANGE` |
| Array max items | tags, media | `VALIDATION_ARRAY_SIZE` |
| Required if condition | conditional fields | `VALIDATION_REQUIRED` |

### 9.3 Validation Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "travelers.adults",
        "code": "VALIDATION_RANGE",
        "message": "Adult count must be between 1 and 10",
        "value": 15
      },
      {
        "field": "schedule.date",
        "code": "VALIDATION_DATE",
        "message": "Date must be in the future",
        "value": "2024-01-01"
      }
    ],
    "requestId": "req_abc123"
  }
}
```

---

## 10. Error Contracts

### 10.1 Standard Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": {},
    "requestId": "req_abc123",
    "timestamp": "2026-06-22T07:00:00Z"
  }
}
```

### 10.2 Error Code Catalog

| HTTP Status | Error Code | Description | When |
|---|---|---|---|
| 400 | `VALIDATION_ERROR` | Request validation failed | Invalid input |
| 400 | `INVALID_STATE_TRANSITION` | Invalid status change | E.g., cancelling completed booking |
| 401 | `UNAUTHENTICATED` | Missing or invalid JWT | No auth header / expired token |
| 403 | `FORBIDDEN` | Authenticated but not authorized | Insufficient role |
| 404 | `NOT_FOUND` | Resource not found | Invalid ID/slug |
| 409 | `CONFLICT` | Resource conflict | Duplicate booking, version conflict |
| 409 | `INSUFFICIENT_CAPACITY` | Not enough availability | Overbooking attempt |
| 409 | `INVALID_COUPON` | Coupon code invalid or expired | Coupon apply |
| 410 | `EXPIRED` | Resource expired | Expired offer |
| 422 | `UNPROCESSABLE_ENTITY` | Business rule violation | Early booking, min travelers |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests | Rate limit |
| 500 | `INTERNAL_ERROR` | Unexpected server error | Bug |
| 502 | `GATEWAY_TIMEOUT` | Upstream service failure | Payment gateway timeout |
| 503 | `SERVICE_UNAVAILABLE` | Service temporarily down | Maintenance |

### 10.3 Error Code Prefixes

| Prefix | Context | Example |
|---|---|---|
| `AUTH_*` | Authentication/Authorization | `AUTH_TOKEN_EXPIRED` |
| `VAL_*` | Validation | `VAL_INVALID_EMAIL` |
| `BIZ_*` | Business rules | `BIZ_INSUFFICIENT_BALANCE` |
| `NOT_FOUND_*` | Not found | `NOT_FOUND_BOOKING` |
| `CONFLICT_*` | Conflict | `CONFLICT_DUPLICATE_BOOKING` |
| `RATE_*` | Rate limiting | `RATE_LIMIT_EXCEEDED` |
| `INT_*` | Internal errors | `INT_PAYMENT_GATEWAY_ERROR` |
| `EXT_*` | External service errors | `EXT_SMS_PROVIDER_FAILURE` |

---

## 11. Pagination

### 11.1 Cursor-Based Pagination (Primary)

Used for all list endpoints with dynamic data (bookings, notifications, conversations).

```http
GET /v1/me/bookings?cursor=eyJpZCI6IjEyMyIsImNyZWF0ZWRfYXQiOiIyMDI2LTA2LTIyIn0=&limit=20
```

```json
{
  "data": [ ... ],
  "meta": {
    "nextCursor": "eyJpZCI6IjEyMyIsImNyZWF0ZWRfYXQiOiIyMDI2LTA2LTIyIn0=",
    "hasNext": true,
    "limit": 20
  }
}
```

**Cursor format**: Base64-encoded JSON `{ id, sortValue }`

### 11.2 Offset-Based Pagination (Secondary)

Used for stable, filter-heavy lists (search results, admin lists).

```http
GET /v1/experiences?page=1&pageSize=20
```

```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 11.3 Pagination Rules

| Context | Method | Default Limit | Max Limit |
|---|---|---|---|
| Public lists | Offset | 20 | 50 |
| Authenticated lists | Cursor | 20 | 50 |
| Admin lists | Offset | 50 | 200 |
| Search results | Offset | 20 | 50 |
| Notifications | Cursor | 20 | 50 |
| Messages | Cursor | 50 | 100 |

---

## 12. Filtering

### 12.1 Filter Query Syntax

```
GET /v1/experiences?filter[category_id]=eq:uuid&filter[price_min]=gte:500&filter[price_max]=lte:5000&filter[duration]=in:2,4,6&filter[rating]=gte:4&filter[language]=eq:en
```

### 12.2 Filter Operators

| Operator | Symbol | Example | Description |
|---|---|---|---|
| Equals | `eq` | `eq:cairo` | Exact match |
| Not equals | `neq` | `neq:archived` | Not equal |
| Greater than | `gt` | `gt:100` | Greater than |
| Greater or equal | `gte` | `gte:4` | Greater than or equal |
| Less than | `lt` | `lt:2026-07-01` | Less than |
| Less or equal | `lte` | `lte:500` | Less than or equal |
| In array | `in` | `in:adventure,history` | Value in list |
| Contains | `contains` | `contains:هرم` | Text contains |
| Between | `bt` | `bt:500,5000` | Between two values |
| Is null | `isnull` | `isnull:true` | Field is null |

### 12.3 Complex Filtering

```http
# Logical OR across categories
GET /v1/experiences?filter[category_id][or]=eq:uuid1,eq:uuid2

# Nested resource filter
GET /v1/destinations?filter[experiences.price_min]=gte:1000
```

### 12.4 Search

```http
# Full-text search
GET /v1/experiences?q=أهرامات+الجيزة

# Search with filters
GET /v1/experiences?q=غوص&filter[destination_id]=eq:uuid&filter[price_max]=lte:3000
```

Search uses PostgreSQL full-text search via tsvector columns in read models.

---

## 13. Sorting

### 13.1 Sort Query Syntax

```http
# Single field sort (default: ascending)
GET /v1/experiences?sort=price_min

# Single field sort (descending)
GET /v1/experiences?sort=-price_min

# Multi-field sort
GET /v1/experiences?sort=-rating,price_min

# Sort by relevance (search only)
GET /v1/experiences?q=غوص&sort=_relevance
```

### 13.2 Sortable Fields by Endpoint

| Endpoint | Sortable Fields | Default |
|---|---|---|
| `/v1/experiences` | `price_min`, `rating`, `created_at`, `name_ar`, `name_en` | `-rating` |
| `/v1/destinations` | `name_ar`, `name_en`, `created_at`, `-rating` | `name_ar` |
| `/v1/bookings` | `created_at`, `schedule_date`, `status` | `-created_at` |
| `/v1/reviews` | `created_at`, `rating` | `-created_at` |
| `/v1/offers` | `validity_end`, `created_at`, `usage_current` | `validity_end` |
| `/v1/notifications` | `created_at` | `-created_at` |

---

## 14. Versioning

### 14.1 Versioning Strategy

| Layer | Strategy | Example |
|---|---|---|
| External APIs | URL prefix | `/v1/destinations` |
| Internal APIs | No versioning | Breaking changes managed via contract testing |
| BFF | No versioning | Deployed in lockstep with frontend |
| Webhooks | Header-based | `X-Webhook-Version: 1` |
| gRPC | Proto package | `egypthub.v1.BookingService` |

### 14.2 Version Lifecycle

| Phase | Duration | Behavior |
|---|---|---|
| Current (v1) | Active | Full support, all features |
| Deprecated (v1) | 6 months after v2 release | Still operational, warning header added |
| Sunset (v1) | After deprecation + 6 months | Returns 410 Gone |

### 14.3 Deprecation Warning Header

```http
Sunset: Sat, 22 Jun 2027 00:00:00 GMT
Deprecation: true
Link: </v2/experiences>; rel="successor-version"
```

---

## 15. Caching

### 15.1 HTTP Caching Headers

| Endpoint Type | Cache-Control | ETag | CDN TTL |
|---|---|---|---|
| Public catalog (destinations, experiences) | `public, max-age=300, stale-while-revalidate=60` | Content hash | 5 min |
| Authenticated data (bookings, profile) | `private, no-cache` | — | — |
| Search results | `public, max-age=60, stale-while-revalidate=30` | Query hash | 1 min |
| Static content | `public, max-age=3600, immutable` | Content hash | 1 hour |
| AI recommendations | `private, max-age=1800` | — | 30 min |

### 15.2 Conditional Requests

```http
# Request
GET /v1/experiences/cairo-pyramids-tour
If-None-Match: "abc123"

# Response (not modified)
304 Not Modified
ETag: "abc123"

# Response (modified)
200 OK
ETag: "def456"
{ ... }
```

### 15.3 Cache Invalidation Triggers

| Event | Invalidates |
|---|---|
| Experience published | Related destination page, search results, experience detail |
| Review created | Experience detail (rating), destination page |
| Offer activated | Experience detail (pricing), search results |
| Booking created (any) | Availability data (30s TTL) |
| CMS content update | Manual purge via admin dashboard |

---

## 16. Idempotency

### 16.1 Idempotency Key Usage

Required for all POST mutations that create resources or trigger side effects.

```http
POST /v1/bookings
Idempotency-Key: 7c9e5e8a-3f1d-4a5e-8c2d-1b3f5a7c9e5e
Content-Type: application/json

{ "experienceId": "...", "date": "2026-07-15", "travelers": { "adults": 2 } }
```

### 16.2 Idempotency Lifecycle

```sql
-- Idempotency tracking table
CREATE TABLE event_store.idempotency_keys (
    idempotency_key  UUID PRIMARY KEY,
    request_hash     TEXT NOT NULL,
    response_status  INT NOT NULL,
    response_body    JSONB NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at       TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '24 hours'
);
CREATE INDEX idx_idempotency_expires ON event_store.idempotency_keys(expires_at);
```

### 16.3 Idempotency Rules

| If | Then |
|---|---|
| New key, first request | Execute mutation, store response, return 201 |
| Existing key, same request | Return stored response (idempotent replay) |
| Existing key, different request | Return 409 Conflict |
| Expired key (> 24h) | Treat as new request |
| In-flight request (duplicate) | Return 409 with `retryAfter: 5` |

### 16.4 Idempotency Response

```http
HTTP/1.1 201 Created
Idempotency-Key: 7c9e5e8a-3f1d-4a5e-8c2d-1b3f5a7c9e5e
Idempotent-Replayed: false

{ "data": { "bookingId": "abc-123" } }
```

```http
HTTP/1.1 200 OK
Idempotency-Key: 7c9e5e8a-3f1d-4a5e-8c2d-1b3f5a7c9e5e
Idempotent-Replayed: true

{ "data": { "bookingId": "abc-123" } }
```

---

*End of API Architecture — Version 1.0*
