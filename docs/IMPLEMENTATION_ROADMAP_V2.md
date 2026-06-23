# EgyptHub — Implementation Roadmap v2

> **Version:** 2.0
> **Status:** Approved
> **Date:** June 2026
> **Target Production:** Q4 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Phase Overview](#2-phase-overview)
3. [Phase A: Foundation (Weeks 1-4)](#3-phase-a-foundation-weeks-1-4)
4. [Phase B: Catalog Core (Weeks 3-6)](#4-phase-b-catalog-core-weeks-3-6)
5. [Phase C: Authentication & Identity (Weeks 4-7)](#5-phase-c-authentication--identity-weeks-4-7)
6. [Phase D: Booking Engine (Weeks 6-10)](#6-phase-d-booking-engine-weeks-6-10)
7. [Phase E: Payment Processing (Weeks 8-12)](#7-phase-e-payment-processing-weeks-8-12)
8. [Phase F: AI Concierge (Weeks 10-14)](#8-phase-f-ai-concierge-weeks-10-14)
9. [Phase G: Engagement & Rewards (Weeks 11-14)](#9-phase-g-engagement--rewards-weeks-11-14)
10. [Phase H: Admin Dashboard (Weeks 12-16)](#10-phase-h-admin-dashboard-weeks-12-16)
11. [Phase I: Integration & Testing (Weeks 14-18)](#11-phase-i-integration--testing-weeks-14-18)
12. [Phase J: Production Readiness (Weeks 16-20)](#12-phase-j-production-readiness-weeks-16-20)
13. [Phase K: Soft Launch (Weeks 18-22)](#13-phase-k-soft-launch-weeks-18-22)
14. [Phase L: Full Launch (Weeks 20-24)](#14-phase-l-full-launch-weeks-20-24)
15. [Resource Allocation](#15-resource-allocation)
16. [Dependencies](#16-dependencies)
17. [Risk Register](#17-risk-register)
18. [Milestone Summary](#18-milestone-summary)

---

## 1. Executive Summary

| Metric | Target |
|---|---|
| Total duration | 24 weeks |
| Total engineering teams | 4 (Backend x2, Frontend x1, AI/ML x1) |
| Total engineers | 12-16 |
| Infrastructure | AWS (production), Docker Compose (dev) |
| Launch markets | Egypt (primary), UAE, KSA (phase 2) |
| Initial capacity | 10,000 concurrent users, 500 bookings/day |

### Feature Breakdown by Launch

| Feature | Soft Launch (Week 18) | Full Launch (Week 24) |
|---|---|---|
| Destination browsing | ✅ | ✅ |
| Experience search + filter | ✅ | ✅ |
| Booking + payment | ✅ | ✅ |
| User authentication | ✅ | ✅ |
| Reviews + ratings | ✅ | ✅ |
| AI Concierge | MVP (text-only) | Full (voice + trip plans) |
| Ambassador program | — | ✅ |
| Wallet + rewards | — | ✅ |
| Admin dashboard | MVP | Full |
| Analytics | MVP | Full |
| Mobile app | — | Q1 2027 |

---

## 2. Phase Overview

```
Week   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
      ┌─────────────────────────────────────────────────────────────────────┐
A     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                           │
B     │    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                       │
C     │        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                   │
D     │            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                   │
E     │                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓               │
F     │                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           │
G     │                        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │
H     │                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
I     │                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
J     │                                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
K     │                                        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
L     │                                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
      └─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase A: Foundation (Weeks 1-4)

### Goal
Establish backend infrastructure, CI/CD, development environment, and core shared libraries.

### Team
Backend Team 1 (3 engineers), Platform Engineer (1)

### Tasks

#### Week 1-2: Project Scaffolding

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Initialize NestJS monorepo with shared configs | 2 days | BE1 | — |
| Configure ESLint, Prettier, TypeScript strict mode | 1 day | BE1 | — |
| Set up Prisma + PostgreSQL connection with Docker Compose | 2 days | BE1 | — |
| Create base NestJS module structure (all domains) | 2 days | BE1 | — |
| Configure environment variables (validation via Zod) | 1 day | BE1 | — |
| Set up Redis + BullMQ with Docker Compose | 2 days | BE1 | — |
| Create common layer (decorators, guards, pipes, filters) | 3 days | BE1 | — |
| Implement request ID middleware + logger (Pino) | 1 day | BE1 | — |
| Configure Swagger/OpenAPI documentation | 1 day | BE1 | — |
| Set up shared types package | 2 days | BE1 | — |

#### Week 2-3: CI/CD + Infrastructure

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Create CI pipeline (GitHub Actions): lint, test, build | 2 days | Platform | — |
| Create CD pipeline: staging deployment | 2 days | Platform | — |
| Set up AWS infrastructure (ECS/RDS/ElastiCache/S3) via Terraform | 4 days | Platform | — |
| Configure CloudFront CDN + WAF | 2 days | Platform | — |
| Set up Sentry error tracking | 1 day | Platform | — |
| Configure Prometheus + Grafana monitoring stack | 3 days | Platform | — |
| Set up OpenTelemetry tracing | 2 days | Platform | — |
| Create Docker images + ECR registry | 1 day | Platform | — |
| Configure staging environment | 1 day | Platform | — |

#### Week 3-4: Database Foundation

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Create Prisma schema for all 10 schemas | 5 days | BE1 | Database Config |
| Write initial migration | 1 day | BE1 | Prisma Schema |
| Implement audit logging infrastructure | 3 days | BE1 | — |
| Set up outbox pattern (table + service + relay) | 3 days | BE1 | — |
| Implement soft-delete mixin/prisma middleware | 2 days | BE1 | — |
| Configure row-level security policies | 3 days | BE1 | — |
| Create seed data for development | 3 days | BE1 | — |
| Write database integration tests | 3 days | BE1 | — |

### Deliverables

- [ ] NestJS project with full module structure
- [ ] CI/CD pipelines operational
- [ ] Staging environment deployed (Docker Compose + AWS)
- [ ] Prisma schema with all tables
- [ ] Base migration applied
- [ ] Audit logging, outbox, soft-delete operational
- [ ] Development seed data loaded

### Exit Criteria

- `npm run lint` clean
- `npm run test` passes (unit + integration)
- `docker compose up` starts all services
- Health endpoints return 200
- Sample API call (GET /health) returns response

---

## 4. Phase B: Catalog Core (Weeks 3-6)

### Goal
Build destinations, experiences, categories, offers, partners, and stories modules.

### Team
Backend Team 1 (3 engineers), Frontend (2 engineers, parallel)

### Tasks

#### Week 3-4: Catalog Data Model + Repositories

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Implement destination CRUD (service, controller, repository) | 3 days | BE1 | Phase A |
| Implement experience CRUD with multi-language support | 4 days | BE1 | Phase A |
| Implement category CRUD with hierarchy | 2 days | BE1 | Phase A |
| Implement offer CRUD with date validation | 2 days | BE1 | Phase A |
| Implement partner CRUD with verification flow | 2 days | BE1 | Phase A |
| Implement story CRUD | 2 days | BE1 | Phase A |
| Add full-text search (tsvector columns + triggers) | 3 days | BE1 | Phase A |
| Create catalog read model tables + refresh triggers | 2 days | BE1 | Phase A |

#### Week 4-5: Catalog API Endpoints

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Destination list + detail with pagination | 2 days | BE1 | Catalog Data |
| Experience search with filters + sorting | 3 days | BE1 | Catalog Data |
| Experience detail with availability + pricing | 2 days | BE1 | Catalog Data |
| Category tree endpoint | 1 day | BE1 | Catalog Data |
| Offer list + detail | 1 day | BE1 | Catalog Data |
| Partner profile + experiences | 2 days | BE1 | Catalog Data |
| Story list + detail | 1 day | BE1 | Catalog Data |
| Search endpoint (global full-text) | 2 days | BE1 | Catalog Data |
| Cache public catalog endpoints | 2 days | BE1 | Catalog Data |

#### Week 4-6: Frontend Catalog Integration (Parallel)

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Create React Query hooks for catalog API | 3 days | FE | API Endpoints |
| Wire destination pages to API | 2 days | FE | — |
| Wire experience detail to API | 2 days | FE | — |
| Implement search UI with debounced input | 3 days | FE | — |
| Wire category navigation | 2 days | FE | — |
| Add loading skeletons + error states | 2 days | FE | — |
| Implement server-side rendering for catalog pages | 3 days | FE | — |

### Deliverables

- [ ] Complete catalog CRUD (all entities)
- [ ] Public API endpoints: destinations, experiences, categories, offers, partners, stories
- [ ] Full-text search with PostgreSQL
- [ ] Read model tables for catalog queries
- [ ] Cached public endpoints (Redis)
- [ ] Frontend catalog pages connected to API

### Exit Criteria

- `GET /v1/destinations?filter[category_id]=eq:...&sort=-rating` returns correct results
- Full-text search in Arabic + English returns relevant results
- Cache hit rate > 60% for public catalog endpoints
- Search response < 200ms p95
- Frontend catalog pages render with real data

---

## 5. Phase C: Authentication & Identity (Weeks 4-7)

### Goal
Implement user registration, login, JWT, MFA, session management, RBAC.

### Team
Backend Team 2 (2-3 engineers), Frontend (1 engineer, parallel)

### Tasks

#### Week 4-5: Auth Backend

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Implement user model + repository | 2 days | BE2 | Phase A |
| Implement registration with validation | 2 days | BE2 | — |
| Implement login with rate limiting | 2 days | BE2 | — |
| JWT token service (access + refresh rotation) | 3 days | BE2 | — |
| Session management with Redis caching | 2 days | BE2 | — |
| Implement Passport JWT strategy + guard | 2 days | BE2 | — |
| Implement RBAC roles guard + decorator | 2 days | BE2 | — |
| Implement ownership guard | 2 days | BE2 | — |
| Password service (bcrypt, history, common check) | 2 days | BE2 | — |
| MFA: TOTP setup + verification | 3 days | BE2 | — |
| MFA: SMS code | 2 days | BE2 | Twilio |
| Account lockout service | 2 days | BE2 | — |

#### Week 5-6: Auth API + Profile

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Register endpoint | 1 day | BE2 | Auth Backend |
| Login endpoint | 1 day | BE2 | Auth Backend |
| Token refresh endpoint | 1 day | BE2 | Auth Backend |
| Logout endpoint | 1 day | BE2 | Auth Backend |
| MFA setup + verify endpoints | 2 days | BE2 | Auth Backend |
| Profile read/update endpoints | 2 days | BE2 | Auth Backend |
| Password change endpoint | 1 day | BE2 | Auth Backend |
| Account deletion endpoint | 1 day | BE2 | Auth Backend |
| API key management endpoints | 2 days | BE2 | Auth Backend |

#### Week 5-7: Frontend Auth (Parallel)

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Login page UI | 2 days | FE | — |
| Registration page UI | 2 days | FE | — |
| Auth context + JWT storage (httpOnly cookie) | 3 days | FE | Auth API |
| Protected route wrapper | 1 day | FE | — |
| MFA setup page | 2 days | FE | MFA API |
| Profile page | 2 days | FE | Profile API |
| Password change form | 1 day | FE | — |
| Session management UI (view active sessions) | 2 days | FE | — |
| API key management page (partner dashboard) | 2 days | FE | API Key API |

### Deliverables

- [ ] Full auth flow (register, login, logout, refresh)
- [ ] JWT with refresh token rotation
- [ ] Session management with concurrent session limit
- [ ] MFA (TOTP + SMS)
- [ ] Account lockout with progressive duration
- [ ] RBAC with role hierarchy
- [ ] API key management
- [ ] Frontend auth pages + protected routing

### Exit Criteria

- Registration → login → protected API call → token refresh → logout cycle works end-to-end
- Invalid credentials return 401 with rate limit headers
- MFA challenge appears for MFA-enabled users
- Role guard blocks unauthorized access with 403
- All sessions invalidated on password change
- Login rate limit: 5 attempts → 15-min lockout

---

## 6. Phase D: Booking Engine (Weeks 6-10)

### Goal
Build the core booking system with availability management, pricing, saga orchestration, and reservation handling.

### Team
Backend Team 1 (3 engineers), Backend Team 2 (2 engineers)

### Tasks

#### Week 6-7: Availability + Reservation

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Availability data model + repository | 2 days | BE1 | Phase A |
| Availability management endpoints (partner/admin) | 2 days | BE1 | — |
| Time slot generation + management | 3 days | BE1 | — |
| Reservation system with 15-min hold | 3 days | BE1 | Redis |
| Capacity check with optimistic locking | 2 days | BE1 | — |
| Availability read model + cache | 2 days | BE1 | — |
| Expired reservation cleanup job | 1 day | BE1 | — |

#### Week 7-8: Pricing Engine

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Pricing data model (base price, tiers, add-ons) | 2 days | BE2 | Phase A |
| Dynamic pricing calculation service | 4 days | BE2 | — |
| Coupon/discount system (codes, validation, limits) | 3 days | BE2 | — |
| Tax calculation (VAT, service fees) | 2 days | BE2 | — |
| Currency conversion (EGP, USD, SAR, AED) | 2 days | BE2 | Exchange rate API |
| Pricing preview endpoint | 2 days | BE2 | — |

#### Week 8-9: Booking Saga

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Saga state machine + repository | 3 days | BE1 | Phase A |
| Saga orchestrator service | 4 days | BE1 | — |
| Step 1: Validate availability | 1 day | BE1 | Availability |
| Step 2: Reserve capacity | 1 day | BE1 | Reservation |
| Step 3: Apply pricing | 1 day | BE1 | Pricing |
| Step 4: Process payment (authorize) | 2 days | BE1 | Payment (dep) |
| Step 5: Issue ticket | 2 days | BE1 | — |
| Step 6: Send confirmation | 1 day | BE1 | Notification (dep) |
| Compensation handlers for each step | 4 days | BE1 | — |
| Booking CRUD endpoints | 3 days | BE2 | Saga |
| Booking cancellation with refund logic | 2 days | BE2 | — |
| Booking timeline/history endpoints | 2 days | BE2 | — |

#### Week 9-10: Booking API + Validation

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| POST /v1/bookings with idempotency | 3 days | BE1 | Saga |
| Booking confirmation webhook handler | 2 days | BE1 | — |
| Cancellation with business rule validation | 2 days | BE2 | — |
| User booking list with filters + pagination | 2 days | BE2 | — |
| Admin booking management endpoints | 2 days | BE2 | — |
| Idempotency key processing | 2 days | BE1 | — |
| Booking notification triggers | 2 days | BE1 | Notification |

### Deliverables

- [ ] Availability management with time slots
- [ ] Reservation system with 15-min hold
- [ ] Pricing engine with dynamic calculation
- [ ] Coupon/discount system
- [ ] Booking saga with 6 steps + compensation
- [ ] Booking CRUD endpoints with idempotency
- [ ] Booking timeline + history
- [ ] Cancellation with business rules + refund

### Exit Criteria

- Full booking flow: search → select → preview → create → confirm works end-to-end
- Two concurrent users cannot overbook the last slot
- Saga completes within 30s for successful bookings
- Saga compensates fully for failed bookings (availability released, no payment charged)
- Idempotency key prevents duplicate bookings
- Booking cancellation within rules succeeds, outside rules returns 409

---

## 7. Phase E: Payment Processing (Weeks 8-12)

### Goal
Integrate payment gateway, wallet system, invoice generation, and refund processing.

### Team
Backend Team 2 (2 engineers), Backend Team 1 (1 engineer, support)

### Tasks

#### Week 8-9: Payment Gateway Integration

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Payment gateway selection + contract | 3 days | BE2 | — |
| Payment gateway client (authorize, capture, refund, void) | 5 days | BE2 | — |
| Webhook handler with HMAC verification | 3 days | BE2 | Phase A |
| Payment model + repository | 2 days | BE2 | Phase A |
| Authorize payment endpoint | 2 days | BE2 | Booking |
| Capture payment endpoint | 2 days | BE2 | — |
| Payment status sync from webhook | 2 days | BE2 | — |
| Idempotency for payment operations | 2 days | BE2 | — |

#### Week 9-10: Wallet System

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Wallet model + repository | 2 days | BE2 | Phase A |
| Wallet CRUD endpoints | 2 days | BE2 | — |
| Deposit flow (top-up via payment gateway) | 3 days | BE2 | Payment Gateway |
| Withdraw flow | 2 days | BE2 | — |
| Wallet-to-payment integration (use wallet balance) | 2 days | BE2 | — |
| Transaction history with pagination | 2 days | BE2 | — |

#### Week 10-11: Installment Plans

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Installment plan model + repository | 2 days | BE1 | Phase A |
| Installment calculation service (3, 6, 12 months) | 3 days | BE1 | — |
| Installment plan creation + approval | 2 days | BE1 | — |
| Installment payment scheduling + processing | 3 days | BE1 | — |
| Late payment handling + reminders | 2 days | BE1 | — |

#### Week 10-12: Invoices + Refunds

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Invoice model + repository | 2 days | BE2 | Phase A |
| Invoice generation (triggered on booking confirmation) | 3 days | BE2 | Booking |
| Invoice PDF generation (server-side) | 3 days | BE2 | — |
| Refund processing (full, partial, with reason) | 3 days | BE2 | Payment Gateway |
| Refund approval workflow (admin) | 2 days | BE2 | — |
| Daily invoice aggregation job | 1 day | BE2 | — |

### Deliverables

- [ ] Payment gateway integration (authorize, capture, refund, void)
- [ ] Webhook handler with HMAC verification + replay protection
- [ ] Wallet system with deposit/withdraw/payment
- [ ] Installment plans (3/6/12 months)
- [ ] Invoice generation + PDF download
- [ ] Refund processing with admin approval
- [ ] Payment idempotency

### Exit Criteria

- Payment authorization → capture → confirmation flow works end-to-end
- Webhook events processed reliably (< 1% loss)
- Wallet balance correctly maintained (optimistic locking prevents race conditions)
- Invoice generated automatically on booking confirmation
- Refund initiated, processed, and reflected in booking + wallet
- Installment schedule calculated correctly with payment reminders

---

## 8. Phase F: AI Concierge (Weeks 10-14)

### Goal
Build AI-powered conversational concierge with recommendations, trip planning, voice support.

### Team
AI/ML Team (3 engineers), Backend Team 1 (1 engineer, support)

### Tasks

#### Week 10-11: AI Infrastructure

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| LLM provider selection + integration (OpenAI / Gemini / Claude) | 3 days | AI | — |
| LLM client service (rate-limited, cached) | 2 days | AI | — |
| Prompt template management service | 2 days | AI | — |
| Context builder (user history, preferences, catalog data) | 3 days | AI | Phase B |
| Intent classifier (pipeline: rule-based → LLM) | 4 days | AI | — |
| Conversation repository + message model | 2 days | BE1 | Phase A |

#### Week 11-12: Conversation Engine

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| POST /v1/ai/conversations | 1 day | AI | AI Infra |
| POST /v1/ai/conversations/{id}/messages | 3 days | AI | AI Infra |
| Conversation context window management (sliding window + summarization) | 3 days | AI | — |
| Streaming response (SSE) | 2 days | AI | — |
| Multi-language response (Arabic + English) | 2 days | AI | — |
| Rate limiting per conversation (60 req/min) | 1 day | BE1 | — |
| Conversation history list | 1 day | BE1 | — |

#### Week 11-13: Recommendations

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Recommendation service (collaborative + content-based) | 5 days | AI | Phase B |
| GET /v1/ai/recommendations endpoint | 2 days | AI | — |
| Personalized recommendations based on user history | 3 days | AI | Phase C |
| Contextual recommendations (season, location, trend) | 3 days | AI | — |
| Recommendation cache (30 min TTL) | 1 day | BE1 | — |

#### Week 12-14: Trip Planner

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Trip plan model + repository | 2 days | BE1 | Phase A |
| Trip plan CRUD endpoints | 2 days | BE1 | — |
| AI-powered itinerary generation | 5 days | AI | Conversation Engine |
| Budget-aware planning | 2 days | AI | — |
| Multi-day itinerary with time slots | 3 days | AI | — |
| Trip plan export (PDF, iCal) | 2 days | AI | — |

#### Week 13-14: Voice Support (MVP)

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Speech-to-text service (Whisper API) | 3 days | AI | — |
| Voice message upload endpoint | 2 days | BE1 | S3 |
| Voice → text → conversation flow | 3 days | AI | Conversation Engine |
| Text-to-speech for responses (optional) | 2 days | AI | — |

### Deliverables

- [ ] AI conversation engine with streaming responses
- [ ] Intent classifier (book, recommend, plan, inquire, etc.)
- [ ] Multi-language support (Arabic + English)
- [ ] Personalized recommendations
- [ ] AI trip planner with budget awareness
- [ ] Voice message support (MVP)
- [ ] Rate limiting + context management

### Exit Criteria

- User asks "recommend experiences in Cairo" → gets personalized list
- User asks "book the Pyramids tour for next Friday" → creates booking via conversation
- User plans "3 days in Luxor with budget 5000 EGP" → generates multi-day itinerary
- Arabic conversation maintains context correctly
- Voice message → text → response cycle completes within 10s
- Recommendation accuracy > 70% user engagement

---

## 9. Phase G: Engagement & Rewards (Weeks 11-14)

### Goal
Build reviews, ambassador program, referral system, reward points, notifications.

### Team
Backend Team 2 (2 engineers)

### Tasks

#### Week 11-12: Reviews + Ratings

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Review model + repository | 2 days | BE2 | Phase A |
| Review CRUD endpoints | 2 days | BE2 | — |
| Review moderation (flag, approve, reject) | 3 days | BE2 | — |
| Rating aggregation (average, distribution) | 2 days | BE2 | — |
| Review helpfulness voting | 2 days | BE2 | — |
| Media upload for reviews (images) | 2 days | BE2 | S3 |

#### Week 12-13: Ambassador Program

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Ambassador model + repository | 2 days | BE2 | Phase A |
| Ambassador application + approval workflow | 3 days | BE2 | — |
| Referral code generation + tracking | 3 days | BE2 | — |
| Referral link click tracking | 2 days | BE2 | — |
| Ambassador dashboard endpoints (stats, earnings) | 3 days | BE2 | — |
| Commission calculation service | 2 days | BE2 | — |

#### Week 13-14: Rewards + Points

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Reward profile model + repository | 2 days | BE2 | Phase A |
| Points earning rules engine (booking, review, referral) | 4 days | BE2 | — |
| Points redemption (discount on next booking) | 3 days | BE2 | — |
| Tier system (Bronze, Silver, Gold, Platinum) | 2 days | BE2 | — |
| Tier benefits configuration | 2 days | BE2 | — |
| Points expiry job (annual) | 1 day | BE2 | — |
| Reward notification triggers | 2 days | BE2 | — |

#### Week 13-14: Notifications

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Notification model + repository | 2 days | BE2 | Phase A |
| In-app notification service | 2 days | BE2 | — |
| Email notification service (SendGrid/Amazon SES) | 3 days | BE2 | — |
| SMS notification service (Twilio) | 2 days | BE2 | — |
| Push notification service (Firebase) | 3 days | BE2 | — |
| Notification preference management | 2 days | BE2 | — |
| Notification template system (Handlebars) | 2 days | BE2 | — |
| Notification queue processors | 2 days | BE2 | — |

### Deliverables

- [ ] Review system with ratings, media, moderation
- [ ] Ambassador program with referral tracking
- [ ] Rewards/points engine with tiers
- [ ] Multi-channel notification system (in-app, email, SMS, push)
- [ ] Notification preferences + templates

### Exit Criteria

- Review created → rating reflected on experience page within 1s
- Referral link → user registers → points awarded end-to-end
- Points earned on booking completion, redeemable on next booking
- Tier upgrade triggers notification
- Email notification delivered within 30s of trigger
- SMS notification delivered within 10s

---

## 10. Phase H: Admin Dashboard (Weeks 12-16)

### Goal
Build admin and partner dashboards for content management, analytics, and operations.

### Team
Frontend (2 engineers), Backend Team 2 (1 engineer, support)

### Tasks

#### Week 12-13: Admin API Endpoints

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Admin CRUD for all catalog entities | 3 days | BE2 | Phase B |
| Admin user management endpoints | 2 days | BE2 | Phase C |
| Admin booking management endpoints | 2 days | BE2 | Phase D |
| Admin refund approval endpoints | 2 days | BE2 | Phase E |
| Admin analytics endpoints | 3 days | BE2 | — |
| Audit log viewer endpoint | 2 days | BE2 | Phase A |

#### Week 13-14: Admin Dashboard UI

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Admin layout + navigation | 2 days | FE | — |
| Dashboard overview (KPIs, charts) | 3 days | FE | Admin API |
| Destination management page | 3 days | FE | Admin API |
| Experience management page | 3 days | FE | Admin API |
| Offer management page | 2 days | FE | Admin API |
| Booking management + calendar view | 3 days | FE | Admin API |
| User management page | 2 days | FE | Admin API |

#### Week 14-15: Content Management

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Rich text editor (Arabic + English) | 3 days | FE | — |
| Media upload + gallery management | 3 days | FE | S3 |
| SEO metadata editor | 2 days | FE | — |
| Version history for content | 2 days | FE | — |
| Bulk operations (publish, archive) | 2 days | FE | — |
| Scheduling (publish at future date) | 3 days | FE | — |

#### Week 14-16: Analytics Dashboard

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Revenue analytics (daily, weekly, monthly) | 3 days | BE2 | Phase D+E |
| User growth + retention charts | 2 days | BE2 | Phase C |
| Booking volume + conversion funnel | 3 days | BE2 | Phase D |
| Top destinations/experiences report | 2 days | BE2 | Phase B |
| Partner performance report | 2 days | BE2 | Phase B+G |
| Analytics frontend (charts, tables, exports) | 4 days | FE | Admin API |
| PDF report generation | 2 days | BE2 | — |

#### Week 15-16: Partner Dashboard

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Partner layout + navigation | 2 days | FE | — |
| Experience management (partner's own) | 3 days | FE | Admin API |
| Availability management UI | 3 days | FE | Phase D |
| Booking view (own experiences) | 2 days | FE | Phase D |
| Revenue + performance charts | 3 days | FE | Admin API |
| Payout history | 2 days | FE | Phase E |

### Deliverables

- [ ] Admin dashboard with full CRUD for all entities
- [ ] Rich content editor with Arabic support
- [ ] Media gallery management
- [ ] Analytics dashboard (revenue, users, bookings, top content)
- [ ] Partner dashboard (own experiences, availability, bookings, revenue)
- [ ] PDF report generation
- [ ] Audit log viewer

### Exit Criteria

- Admin creates/edits destination with Arabic + English content → publishes → visible on public site within 1s
- Admin views booking dashboard with filters + pagination
- Partner manages availability calendar → reflected in booking flow
- Revenue chart matches actual booking data
- Audit log shows all admin actions with timestamps
- Dashboard loads < 3s with production data volume

---

## 11. Phase I: Integration & Testing (Weeks 14-18)

### Goal
Full integration testing, E2E testing, load testing, security testing, and bug fixing.

### Team
All teams (dedicated QA engineer + engineers on rotation)

### Tasks

#### Week 14-15: Integration Testing

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Auth → Booking → Payment E2E test | 3 days | QA | Phase D+E |
| Booking saga integration test (all paths) | 3 days | QA | Phase D |
| AI conversation → Booking integration | 2 days | QA | Phase F |
| Ambassador → Referral → Reward flow | 2 days | QA | Phase G |
| Notification trigger → delivery flow | 2 days | QA | Phase G |
| Webhook → Payment → Booking integration | 2 days | QA | Phase E |
| Cross-module event propagation tests | 3 days | QA | Phase A |

#### Week 15-16: E2E Testing (Playwright/Cypress)

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| User registration → browse → book → pay flow | 3 days | QA | All |
| Admin content management flow | 2 days | QA | Phase H |
| Partner availability management flow | 2 days | QA | Phase H |
| AI conversation → booking flow | 2 days | QA | Phase F |
| Ambassador referral flow | 1 day | QA | Phase G |
| Mobile responsive testing | 2 days | QA | — |
| RTL layout testing | 2 days | QA | — |
| Accessibility audit (WCAG 2.1 AA) | 3 days | QA | — |

#### Week 15-16: Performance + Load Testing

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| k6 load test scripts (all critical flows) | 4 days | QA | All |
| Target: 10,000 concurrent users | 2 days | QA | — |
| Target: 500 bookings/hour throughput | 2 days | QA | — |
| Database query profiling + optimization | 3 days | BE | — |
| Cache tuning (Redis, CDN, HTTP) | 2 days | BE | — |
| Queue throughput testing (notification bursts) | 2 days | BE | — |
| Pagination performance at scale | 1 day | BE | — |

#### Week 16-17: Security Testing

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| OWASP Top 10 vulnerability scan | 3 days | QA/Security | — |
| Dependency vulnerability audit (npm audit, Snyk) | 2 days | ALL | — |
| Penetration testing (auth, booking, payment) | 5 days | External | — |
| Rate limiting verification | 1 day | QA | — |
| JWT token security review | 1 day | BE | — |
| SQL injection + XSS testing | 2 days | QA | — |
| RBAC permission boundary testing | 2 days | QA | — |

#### Week 17-18: Bug Fixing + Polish

| Task | Effort | Owner |
|---|---|---|
| Bug triage + resolution (priority P0/P1) | 5 days | ALL |
| Performance optimization based on load tests | 4 days | ALL |
| Error message polish (Arabic + English) | 2 days | ALL |
| Loading states + empty states throughout | 2 days | FE |
| Edge case hardening | 3 days | ALL |

### Deliverables

- [ ] Integration test suite passing (all modules)
- [ ] E2E test suite passing (critical user flows)
- [ ] Load test report with p50/p95/p99 latency
- [ ] Security audit report + resolved findings
- [ ] Performance optimized for 10K concurrent users
- [ ] All P0/P1 bugs fixed

### Exit Criteria

- All integration tests pass (CI gate)
- Load test: p95 < 500ms for all endpoints
- No critical (P0/P1) bugs open
- Security scan: zero high/critical findings
- E2E flow: register → browse → book → pay → receive notification → review

---

## 12. Phase J: Production Readiness (Weeks 16-20)

### Goal
Production environment setup, monitoring, documentation, compliance, disaster recovery.

### Team
Platform Engineer (1), All teams

### Tasks

#### Week 16-17: Production Infrastructure

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Provision production AWS environment (RDS, ElastiCache, ECS, S3) | 5 days | Platform | — |
| Configure auto-scaling policies (ECS Service Auto Scaling) | 2 days | Platform | — |
| Set up RDS Multi-AZ + read replicas | 2 days | Platform | — |
| Configure WAF rules + IP whitelist | 2 days | Platform | — |
| Set up CloudFront CDN + custom domain | 2 days | Platform | — |
| Configure Route53 DNS + health checks | 1 day | Platform | — |
| Set up backup strategy (daily + WAL) | 2 days | Platform | — |
| Configure RTO/RPO monitoring | 1 day | Platform | — |

#### Week 17-18: Monitoring + Alerting

| Task | Effort | Owner | Dependencies |
|---|---|---|---|
| Set up Grafana dashboards (all metrics) | 3 days | Platform | — |
| Configure alert rules (PagerDuty integration) | 2 days | Platform | — |
| Set up log aggregation (DataDog / ELK) | 2 days | Platform | — |
| Configure APM tracing (Datadog / New Relic) | 2 days | Platform | — |
| Set up synthetic monitoring (checkly / Pingdom) | 1 day | Platform | — |
| Create runbook for common incidents | 3 days | ALL | — |

#### Week 17-18: Documentation

| Task | Effort | Owner |
|---|---|---|
| API reference documentation (OpenAPI served) | 3 days | BE |
| Deployment runbook | 2 days | Platform |
| Developer onboarding guide | 2 days | ALL |
| Operations runbook (backup, restore, scaling) | 3 days | Platform |
| GDPR data subject request procedure | 2 days | Legal |
| Incident response playbook | 2 days | Security |

#### Week 18-19: Compliance

| Task | Effort | Owner |
|---|---|---|
| GDPR compliance checklist | 3 days | Legal/Platform |
| Data processing agreement (DPA) for sub-processors | 2 days | Legal |
| Terms of service + privacy policy finalization | 2 days | Legal |
| Cookie consent implementation | 2 days | FE |
| Data retention policy enforcement verification | 2 days | BE |
| Accessibility compliance verification (WCAG 2.1 AA) | 3 days | FE |

#### Week 19-20: DR + Backup Testing

| Task | Effort | Owner |
|---|---|---|
| Database restore drill (from backup) | 2 days | Platform |
| Cross-AZ failover test | 2 days | Platform |
| Full disaster recovery simulation | 3 days | Platform |
| Backup integrity verification | 1 day | Platform |
| RTO measurement + optimization | 2 days | Platform |

### Deliverables

- [ ] Production AWS environment fully provisioned
- [ ] Auto-scaling configured for traffic patterns
- [ ] Grafana dashboards for all services
- [ ] Alert rules with PagerDuty integration
- [ ] API documentation published
- [ ] Deployment + operations runbooks
- [ ] GDPR compliance verified
- [ ] Disaster recovery tested (RTO < 1 hour)

### Exit Criteria

- Production deployment pipeline green
- All Grafana dashboards showing data
- Alert rules tested (fire test alert → PagerDuty notification in < 1 min)
- DB restore from backup verified (RTO < 30 min)
- Cross-AZ failover completes in < 5 min
- API docs accessible at /docs

---

## 13. Phase K: Soft Launch (Weeks 18-22)

### Goal
Launch to limited users, monitor, iterate, stabilize.

### Team
All teams (dedicated on-call rotation)

### Tasks

#### Week 18-19: Launch Preparation

| Task | Effort | Owner |
|---|---|---|
| Create invite-only access list | 1 day | Product |
| Set up feature flags (LaunchDarkly) | 2 days | Platform |
| Configure gradual rollout (10% → 25% → 50% → 100%) | 2 days | Platform |
| Prepare rollback plan | 1 day | ALL |
| Brief support team on known issues | 1 day | Product |
| Set up user feedback channels (in-app + Intercom/email) | 2 days | FE |

#### Week 19-20: Soft Launch (10% Users)

| Task | Effort | Owner |
|---|---|---|
| Deploy to production | 1 day | Platform |
| Monitor error rates, latency, throughput real-time | 5 days | ALL |
| Respond to P0/P1 incidents (on-call rotation) | 5 days | ALL |
| Collect user feedback | 5 days | Product |
| Fix critical issues discovered | 5 days | ALL |

#### Week 20-21: Scale to 50%

| Task | Effort | Owner |
|---|---|---|
| Review monitoring data + adjust thresholds | 2 days | Platform |
| Increase rollout to 50% | 1 day | Platform |
| Load test production traffic at scale | 2 days | QA |
| Address performance bottlenecks | 3 days | ALL |
| Fix P2 issues discovered | 5 days | ALL |

#### Week 21-22: Scale to 100%

| Task | Effort | Owner |
|---|---|---|
| Full rollout to 100% users | 1 day | Platform |
| Monitor for 48 hours post-full rollout | 2 days | ALL |
| Conduct post-launch retrospective | 1 day | ALL |
| Prioritize backlog for post-launch | 2 days | Product |

### Deliverables

- [ ] Soft launch with invite-only users
- [ ] Gradual rollout from 10% → 100%
- [ ] Production monitoring operational
- [ ] On-call rotation established + working
- [ ] Known issues documented + prioritized
- [ ] User feedback collection active

### Exit Criteria

- Error rate < 0.1% over 24h at 100% rollout
- p95 latency < 500ms for all endpoints
- No P0 incidents in last 72 hours
- Support team handling volume successfully
- User feedback positive (> 4/5 satisfaction)

---

## 14. Phase L: Full Launch (Weeks 20-24)

### Goal
Public launch, marketing campaigns, scaling, optimization.

### Team
All teams (expanded on-call for launch week)

### Tasks

#### Week 20-21: Launch Campaign Support

| Task | Effort | Owner |
|---|---|---|
| Marketing campaign preparation (landing page, emails, social) | 5 days | Marketing |
| Load test for expected launch traffic (50K concurrent) | 3 days | QA/Platform |
| Scale infrastructure for launch spike (temporary 2x) | 2 days | Platform |
| Prepare launch-day runbook | 2 days | ALL |

#### Week 21-22: Launch Week

| Task | Effort | Owner |
|---|---|---|
| 24/7 on-call rotation (week 1) | 7 days | ALL |
| Real-time monitoring + war room | 7 days | ALL |
| Immediate incident response | 7 days | ALL |
| Marketing campaigns go live | 1 day | Marketing |
| Press + PR management | 5 days | Marketing |

#### Week 22-24: Post-Launch Optimization

| Task | Effort | Owner |
|---|---|---|
| Performance optimization (address bottlenecks) | 5 days | ALL |
| AI Concierge full features (voice, trip plans) | 5 days | AI |
| Mobile app planning + prototyping | 5 days | FE |
| Remaining feature backlog (not launch-critical) | 10 days | ALL |
| User analytics review + product iteration plan | 3 days | Product |
| Infrastructure cost optimization | 3 days | Platform |

### Deliverables

- [ ] Public launch with marketing campaigns
- [ ] 24/7 on-call for launch week
- [ ] Full AI Concierge (voice + trip plans)
- [ ] Post-launch performance report
- [ ] Q1 2027 roadmap
- [ ] Mobile app prototype

### Exit Criteria

- System stable at 50K concurrent users
- All launch KPIs met (see below)
- Zero P0 incidents for 7 days post-launch
- All critical features functional
- User satisfaction > 4/5

### Launch KPIs

| KPI | Target | Measurement |
|---|---|---|
| Daily active users | 5,000 after 30 days | Analytics |
| Bookings per day | 200 after 30 days | Booking system |
| Conversion rate (browse → book) | > 5% | Analytics funnel |
| Payment success rate | > 95% | Payment system |
| API uptime | > 99.9% | Monitoring |
| API p95 latency | < 500ms | Monitoring |
| Error rate | < 0.1% | Sentry |
| AI conversation engagement | > 20% of users | AI system |
| User satisfaction (NPS) | > 40 | Survey |
| App Store rating | > 4.0 | App Store (future) |

---

## 15. Resource Allocation

### 15.1 Team Structure

```
Engineering (12-16 people)
├── Backend Team 1 (3-4 engineers)
│   ├── Senior Backend Engineer (Tech Lead)
│   ├── Backend Engineer
│   └── Backend Engineer
│   └── (Junior Backend Engineer — optional)
├── Backend Team 2 (2-3 engineers)
│   ├── Backend Engineer
│   └── Backend Engineer
│   └── (Junior Backend Engineer — optional)
├── Frontend Team (2-3 engineers)
│   ├── Senior Frontend Engineer
│   └── Frontend Engineer
│   └── (Frontend Engineer — optional)
├── AI/ML Team (2-3 engineers)
│   ├── ML Engineer (AI Lead)
│   ├── ML/NLP Engineer
│   └── (Backend Engineer — AI support)
├── Platform/DevOps (1-2 engineers)
│   ├── Platform Engineer
│   └── (SRE — optional, part-time)
└── QA (1-2 engineers)
    ├── QA Engineer
    └── (Automation QA — optional)

Non-Engineering
├── Product Manager (1)
├── Designer (1)
├── Marketing (1-2)
└── Legal/Compliance (part-time)
```

### 15.2 Load by Phase

```
Phase     BE1   BE2   FE    AI    Platform   QA    Total
────────────────────────────────────────────────────────
A          3     —     —     —      2         —      5
B          3     —     2     —      —         —      5
C          —     3     1     —      —         —      4
D          3     2     —     —      —         —      5
E          1     2     —     —      —         —      3
F          1     —     —     3      —         —      4
G          —     2     —     —      —         —      2
H          1     —     2     —      —         —      3
I          —     —     —     —      1         2      3 (+ all)
J          1     1     1     1      1         —      5
K          1     1     1     1      1         1      6
L          1     1     1     1      1         1      6
```

### 15.3 Key Hiring Timeline

| Role | Needed By | Source |
|---|---|---|
| Senior Backend Engineer (BE Lead) | Week 1 | Existing/hire |
| Platform/DevOps Engineer | Week 1 | Existing/hire |
| ML Engineer (AI Lead) | Week 8 | Hire |
| QA Engineer | Week 12 | Hire |
| Product Manager | Week 1 | Existing |

---

## 16. Dependencies

### 16.1 External Dependencies

| Dependency | Type | Needed By | Risk |
|---|---|---|---|
| Payment gateway provider contract | Legal | Week 8 | Medium (negotiation time) |
| SMS provider (Twilio) | Setup | Week 4 | Low |
| Email provider (SendGrid/Amazon SES) | Setup | Week 4 | Low |
| LLM provider API key (OpenAI/Gemini/Claude) | Access | Week 10 | Low |
| Object storage (S3-compatible) | Setup | Week 4 | Low |
| CDN (CloudFront/Cloudflare) | Setup | Week 4 | Low |
| Monitoring (Datadog/Grafana Cloud) | Access | Week 4 | Low |
| Map tiles provider | API Key | Week 4 | Low |
| Currency exchange rate API | API Key | Week 8 | Low |
| HaveIBeenPwned API (optional) | Access | Week 4 | Low |

### 16.2 Internal Dependencies

| Task | Depends On | Slack |
|---|---|---|
| Booking saga step 4 (payment) | Payment API | 1 week |
| Booking saga step 6 (confirmation) | Notification system | 1 week |
| AI trip plan booking | Booking engine | 2 weeks |
| Referral reward points | Reward system | 1 week |
| Ambassador commission payouts | Wallet system | 1 week |
| Admin booking management | Booking engine | 1 week |
| Partner availability UI | Availability API | 1 week |
| AI conversation catalog context | Catalog API | 1 week |

---

## 17. Risk Register

| ID | Risk | Probability | Impact | Mitigation | Contingency |
|---|---|---|---|---|---|
| R01 | Key team member leaves | Medium | High | Cross-training, documentation | Contractor coverage |
| R02 | Payment gateway integration delays | Medium | High | Start legal early, have backup provider | Manual payment processing temporarily |
| R03 | LLM API cost exceeds budget | Medium | Medium | Caching, prompt optimization, usage limits | Cheaper model fallback |
| R04 | Performance bottlenecks at scale | Medium | High | Load test early, auto-scaling, CDN | Vertical scaling, read replicas |
| R05 | Security vulnerability discovered | Low | Critical | Regular scanning, pen test, code review | Hotfix within 4 hours |
| R06 | GDPR compliance gaps | Low | High | Legal review from week 1, data mapping | External DPO consultancy |
| R07 | Arabic NLP quality poor | Medium | Medium | Test with native speakers, fine-tuning | Hybrid rule-based + LLM |
| R08 | Third-party API rate limiting | Medium | Medium | Caching, circuit breaker, fallback | Queue + retry with backoff |
| R09 | Database migration issues | Low | High | Automated rollback, staging test | Manual DB restore |
| R10 | Browser compatibility issues | Low | Medium | Test on all target browsers | Graceful degradation |

---

## 18. Milestone Summary

| Milestone | Week | Deliverable | Gate |
|---|---|---|---|
| M1 | Week 4 | Foundation complete | All Phase A exit criteria met |
| M2 | Week 6 | Catalog API live | All Phase B exit criteria met |
| M3 | Week 7 | Auth system live | All Phase C exit criteria met |
| M4 | Week 10 | Booking engine live | All Phase D exit criteria met |
| M5 | Week 12 | Payment processing live | All Phase E exit criteria met |
| M6 | Week 14 | AI Concierge MVP live | All Phase F exit criteria met |
| M7 | Week 14 | Engagement system live | All Phase G exit criteria met |
| M8 | Week 16 | Admin dashboard live | All Phase H exit criteria met |
| M9 | Week 18 | Integration testing passed | All Phase I exit criteria met |
| M10 | Week 20 | Production ready | All Phase J exit criteria met |
| M11 | Week 22 | Soft launch complete | All Phase K exit criteria met |
| M12 | Week 24 | Full launch | All Phase L exit criteria met + KPIs |

---

*End of Implementation Roadmap v2 — Version 2.0*
