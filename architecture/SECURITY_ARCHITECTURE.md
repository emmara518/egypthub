# SECURITY ARCHITECTURE — EgyptHub

**Scope:** `apps/web` (Next.js static app) + `services/` (NestJS backend)
**Audit Method:** Source code verification against every file referenced.

---

## IMPLEMENTED (verified in code)

### In `apps/web` (Next.js) — **NONE**

The web app has **zero** security features implemented:

| Feature | Status | Evidence |
|---|---|---|
| JWT / Auth tokens | NOT FOUND | `src/app/auth/login/page.tsx:32` — submit handler is `setTimeout(() => setIsSubmitting(false), 1500)` — no API call |
| Password hashing | NOT FOUND | Login/register pages do client-side validation only (email regex + password length check) |
| Secrets management | NOT FOUND | No `.env.*` secrets in web app; only `NEXT_PUBLIC_API_URL` which is unused |
| RBAC | NOT FOUND | No role checks, guards, or protected routes in web app |
| Rate limiting | NOT FOUND | No middleware, no API calls to rate-limit |
| Security headers | NOT FOUND | `next.config.js` has no `headers()` function |
| Audit logging | NOT FOUND | `analyticsTracker.ts` tracks UI events to localStorage — not security audit |
| CORS | NOT FOUND | Static export has no CORS concerns |
| CSRF protection | NOT FOUND | No CSRF tokens |
| Input sanitization | NOT FOUND | No `xss`, `dompurify`, or sanitization anywhere |

### In `services/` (NestJS backends) — **PARTIALLY IMPLEMENTED**

These services exist but are **not connected** to the web app (the web app is a static export).

**Backend service (`services/backend/`):**
- **Security headers**: `helmet()` applied in `services/backend/src/main.ts:37`
- **Rate limiting**: `@nestjs/throttler` configured at `services/backend/src/app.module.ts:13-18` (120 req/min)
- **JWT auth**: `@nestjs/jwt` + `passport-jwt` in `services/backend/src/modules/identity/`
- **Password hashing**: `argon2` (package) + `bcrypt` (package) in dependencies
- **CORS**: Configured with origin whitelist at `services/backend/src/main.ts:32-35`
- **Validation**: Global `ValidationPipe` with `whitelist: true, forbidNonWhitelisted: true` at `services/backend/src/main.ts:19-26`

**Auth service (`services/auth-service/`):**
- **JWT**: Full JWT implementation with access + refresh tokens at `services/auth-service/src/auth/auth.service.ts:106-114`
- **Password hashing**: `bcryptjs.compare()` at `services/auth-service/src/auth/auth.service.ts:94`
- **Bearer token auth**: Passport JWT strategy at `services/auth-service/src/auth/jwt.strategy.ts:21` with `ExtractJwt.fromAuthHeaderAsBearerToken()`
- **OTP authentication**: Phone-based OTP with Redis + in-memory fallback at `services/auth-service/src/auth/auth.service.ts:22-47`
- **Role-based user model**: `UserRole` enum in `services/auth-service/src/user/user.entity.ts` (implied by usage at line 80)

---

## PLANNED (files exist, incomplete)

### In `apps/web`

| Feature | File | What's there |
|---|---|---|
| Auth UI (Login) | `src/app/auth/login/page.tsx` | Full UI with email/password form, social buttons, "remember me" toggle. Submit is a stub (`setTimeout`). No actual authentication. |
| Auth UI (Register) | `src/app/auth/register/page.tsx` | 3-step multi-page form with name/phone/email/password fields. Submit is a stub. No actual registration. |
| API connection | `.env.local` | Contains `NEXT_PUBLIC_API_URL=http://localhost:4000` — points to a backend that the static export cannot use (Next.js `output: 'export'` removes all server-side API routes). |

### In `services/`

| Feature | Status | Notes |
|---|---|---|
| Auth service | Implemented | JWT, OTP, bcrypt, Passport — fully coded but not integrated with web app |
| Backend service | Implemented | Helmet, throttling, Prisma, Redis, identity module — fully coded but not reachable from the static web app |

---

## FUTURE (not found in code anywhere)

| Feature | Notes |
|---|---|
| **Secrets management** | Backend uses hardcoded fallback values: `JWT_SECRET: 'super-secret-jwt-key-change-in-production'` and `DATABASE_URL` with embedded password `egypthub_secret_2024` (services/auth-service). No Vault, AWS Secrets Manager, or encrypted env. |
| **Audit trail / logging** | Backend has `nestjs-pino` for request logging but no structured audit log for security events (login failures, role changes, data access). |
| **2FA / MFA** | `speakeasy` is a dependency of backend but no 2FA endpoints found. |
| **API key management** | No API key system for third-party integrations. |
| **Session management** | Using JWT only; no refresh token rotation, no token blacklisting beyond expiration. |
| **Data encryption at rest** | No mention of encryption; PostgreSQL data is in plaintext. |
| **Data encryption in transit** | Services have no HTTPS configuration (no TLS cert setup in code). |
| **OWASP Top 10 mitigations** | No CSRF tokens, no XSS sanitization in web app, no CSP headers. |
| **Security scanning** | No `snyk`, `npm audit` CI step, or SAST tooling. |
| **Dependency audit** | No automated vulnerability scanning in CI/CD. |
| **Authentication in web app** | Login/register pages are UI shells with no actual auth flow. |
| **Protected routes** | No route guards; all pages are publicly accessible. |

---

## KEY FINDING

The web app (`apps/web`) is a **fully static Next.js export** (`next.config.js:4` — `output: 'export'`). It has:
- No server-side code
- No API calls
- No backend connection
- Zero authentication
- Zero authorization

The backend services exist in the monorepo (`services/`) with production-ready security features (JWT, Helmet, rate limiting, etc.) but they are **completely disconnected** from the web app. The auth UI pages are pure frontend mockups that submit to nowhere.

**Integration gap:** The web app `NEXT_PUBLIC_API_URL` env var points to a backend that cannot be called from a static export (no server-side runtime). To use the backend, the web app would need to either:
1. Switch from `output: 'export'` to server-rendered Next.js
2. Add an API gateway layer
3. Use client-side fetch calls (currently none exist)

---

## Confidence Level

**HIGH** — every claim is backed by specific file lines verified through source code audit.
