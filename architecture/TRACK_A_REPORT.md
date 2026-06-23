# TRACK A REPORT — Platform Foundation

**Author:** EgyptHub Architecture Office
**Date:** June 2026
**Phase:** 16 — Live Foundation & Market Activation

---

## Executive Summary

Track A built the minimum live platform required to validate EgyptHub's business model. The architecture shifted from a fully client-side static export to a full-stack Next.js 14 application with PostgreSQL persistence, JWT authentication, and RESTful APIs.

---

## Sprint A1 — Identity & Persistence

### Database — PostgreSQL + Prisma ORM

**Schemas Created:**
| Model | Purpose | Key Fields |
|---|---|---|
| `User` | Core identity | id, email, passwordHash, role (enum: TRAVELER, AMBASSADOR, PARTNER, ADMIN) |
| `Ambassador` | Ambassador profile | id, userId, name, city, specialties, rating |
| `Partner` | Partner profile | id, userId, name, category, status (draft→approved) |
| `Lead` | Customer inquiry | id, source, status (new→closed), clientName, clientPhone |
| `Referral` | Ambassador referrals | id, type (click/lead/conversion), ambassadorId |
| `Commission` | Earnings tracking | id, type (flat/percentage/tier), amount, status |

**Seed Data:**
- 1 Admin: `admin@egypthub.com`
- 2 Ambassadors: `karim@egypthub.com` (Sharm, diving), `nadia@egypthub.com` (Cairo, history)
- 2 Partners: `info@redsea-divers.com` (Dive Center), `book@cataract.com` (Hotel)
- Password: `EgyptHub@2026`

### Authentication — JWT RS256

**Implemented:**
- `POST /api/auth/register` — Create account + return tokens
- `POST /api/auth/login` — Email/password → JWT pair
- `POST /api/auth/logout` — Clear httpOnly cookies
- `POST /api/auth/refresh` — Rotate refresh token
- `GET /api/auth/me` — Current user info

**Security:**
- httpOnly cookies (access_token 15m, refresh_token 7d)
- Password hashing with bcrypt (10 rounds)
- JWT with RS256 signing (dev fallback: HS256)
- Role-based guard: `requireRole()`

---

## Sprint A2 — Live Environment

### Docker Setup

- `Dockerfile` — Multi-stage build (deps → builder → runner)
- `docker-compose.yml` — PostgreSQL 16 + Next.js web service
- Automatic `prisma db push` + `prisma db seed` on startup

### Deployment Guide

`STAGING_DEPLOYMENT_GUIDE.md` documents:
1. VPS prerequisites (Ubuntu 22.04, Docker)
2. JWT key generation (OpenSSL RS256)
3. Docker Compose deployment
4. Caddy reverse proxy + HTTPS
5. Environment variable reference

### Known Limitation

**Not yet deployed.** Requires:
- VPS with public IP
- Domain `staging.egypthub.com` DNS configured
- GitHub Actions CI/CD pipeline (future)

---

## Sprint A3 — Activation Layer

### Ambassador Dashboard (API)

- `GET /api/ambassadors` — List all ambassadors
- `POST /api/ambassadors/profile` — Update own profile
- `GET /api/ambassadors/stats` — View referrals and leads

### Partner Dashboard (API)

- `GET /api/partners` — List approved partners
- `GET /api/partners/profile` — View own profile + leads
- `POST /api/partners/profile` — Create/update profile

### Lead Capture (API)

- `POST /api/leads` — Create lead (public, no auth required)
- `GET /api/leads` — List leads (authenticated, scoped by role)

**Fields captured:** name, phone, email, destination, budget, timeline, source.

---

## API Documentation

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Sign in |
| POST | `/api/auth/logout` | No | Sign out |
| POST | `/api/auth/refresh` | Cookie | Refresh tokens |
| GET | `/api/auth/me` | Cookie | Current user |
| GET | `/api/ambassadors` | No | List ambassadors |
| POST | `/api/ambassadors/profile` | Ambassador | Update profile |
| GET | `/api/ambassadors/stats` | Ambassador | Get stats |
| GET | `/api/partners` | No | List partners |
| GET | `/api/partners/profile` | Partner | Get own profile |
| POST | `/api/partners/profile` | Partner | Update profile |
| POST | `/api/leads` | No | Create lead |
| GET | `/api/leads` | Auth | List leads |

---

## Files Created

```
apps/web/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── lib/api/
│   │   ├── prisma.ts
│   │   ├── jwt.ts
│   │   └── auth.ts
│   └── app/api/
│       ├── auth/
│       │   ├── register/route.ts
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   ├── refresh/route.ts
│       │   └── me/route.ts
│       ├── ambassadors/
│       │   ├── route.ts
│       │   ├── profile/route.ts
│       │   └── stats/route.ts
│       ├── partners/
│       │   ├── route.ts
│       │   └── profile/route.ts
│       └── leads/
│           └── route.ts
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── .env.local (updated)
```

---

## Blockers

1. **Deployment not executed** — requires VPS provisioning and DNS configuration
2. **CI/CD pipeline not created** — manual deployment only
3. **Frontend not rewired** — auth pages still use mock data, not real API
4. **OTP/2FA not implemented** — planned for future

---

## Confidence Level

**HIGH** — all code compiles, schemas are valid Prisma, API routes follow Next.js 14 Route Handler patterns.
