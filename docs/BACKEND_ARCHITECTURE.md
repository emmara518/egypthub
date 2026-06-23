# EgyptHub — Backend Architecture

> **Version:** 1.0
> **Status:** Approved
> **Runtime:** Node.js 20 LTS
> **Framework:** NestJS 10
> **Date:** June 2026

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [NestJS Module Architecture](#3-nestjs-module-architecture)
4. [Service Layer](#4-service-layer)
5. [Queue Architecture (BullMQ)](#5-queue-architecture-bullmq)
6. [Event Architecture](#6-event-architecture)
7. [Outbox Pattern](#7-outbox-pattern)
8. [Saga Orchestration](#8-saga-orchestration)
9. [Observability](#9-observability)
10. [Scheduled Jobs](#10-scheduled-jobs)
11. [Health Checks](#11-health-checks)
12. [Graceful Shutdown](#12-graceful-shutdown)

---

## 1. Technology Stack

| Category | Technology | Version | Purpose |
|---|---|---|---|
| Runtime | Node.js | 20 LTS | JavaScript runtime |
| Framework | NestJS | 10.x | Backend framework |
| Language | TypeScript | 5.x | Type safety |
| ORM | Prisma | 5.x | Database ORM |
| Validation | class-validator | 0.14.x | DTO validation |
| Serialization | class-transformer | 0.5.x | Response serialization |
| Queue | BullMQ | 5.x | Background jobs |
| Redis | ioredis | 5.x | Redis client |
| Cache | NestJS Cache + ioredis | — | Distributed caching |
| Auth | Passport + JWT | — | Authentication |
| Documentation | @nestjs/swagger | 7.x | OpenAPI docs |
| Testing | Jest + Supertest | — | Unit + E2E tests |
| Logging | Pino + @nestjs/pino | — | Structured logging |
| Metrics | Prometheus + @willsoto/nestjs-prometheus | — | Metrics |
| Tracing | OpenTelemetry | — | Distributed tracing |
| Health | @nestjs/terminus | 10.x | Health checks |
| Rate Limiting | @nestjs/throttler | 5.x | Rate limiting |
| Serialization | Zod (optional) | 3.x | Schema validation |

---

## 2. Project Structure

### 2.1 Monorepo Layout

```
packages/
├── backend/
│   ├── src/
│   │   ├── main.ts                          # Bootstrap
│   │   ├── app.module.ts                    # Root module
│   │   ├── config/                          # Configuration
│   │   ├── common/                          # Shared utilities
│   │   ├── modules/                         # Domain modules
│   │   ├── database/                        # Prisma + migrations
│   │   ├── infrastructure/                  # External integrations
│   │   └── queues/                          # Queue definitions
│   ├── prisma/
│   │   ├── schema.prisma                    # Data model
│   │   ├── migrations/                      # Migration files
│   │   └── seeds/                           # Seed data
│   ├── test/
│   │   ├── unit/                            # Unit tests
│   │   ├── integration/                     # Integration tests
│   │   └── e2e/                             # End-to-end tests
│   └── jest.config.ts
└── shared/                                  # Shared types (internal)
    └── types/
```

### 2.2 Full Directory Structure

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── app.config.ts                    # App configuration
│   │   ├── database.config.ts               # DB configuration
│   │   ├── redis.config.ts                  # Redis configuration
│   │   ├── s3.config.ts                     # S3 configuration
│   │   ├── auth.config.ts                   # JWT, OAuth configuration
│   │   ├── queue.config.ts                  # BullMQ configuration
│   │   └── payment.config.ts                # Payment gateway configuration
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   ├── public.decorator.ts
│   │   │   ├── idempotency.decorator.ts
│   │   │   └── cache-ttl.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   ├── throttler.guard.ts
│   │   │   └── ownership.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── cache.interceptor.ts
│   │   │   ├── timeout.interceptor.ts
│   │   │   └── audit-log.interceptor.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   ├── validation.filter.ts
│   │   │   └── query-failed.filter.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   ├── parse-uuid.pipe.ts
│   │   │   └── parse-enum.pipe.ts
│   │   ├── middleware/
│   │   │   ├── request-id.middleware.ts
│   │   │   └── locale.middleware.ts
│   │   ├── dto/
│   │   │   ├── pagination.dto.ts
│   │   │   ├── api-response.dto.ts
│   │   │   └── error-response.dto.ts
│   │   ├── interfaces/
│   │   │   ├── api-response.interface.ts
│   │   │   └── pagination.interface.ts
│   │   ├── constants/
│   │   │   ├── error-codes.ts
│   │   │   ├── roles.enum.ts
│   │   │   └── booking-status.enum.ts
│   │   └── utils/
│   │       ├── slug.utils.ts
│   │       ├── crypto.utils.ts
│   │       └── date.utils.ts
│   ├── modules/
│   │   ├── catalog/
│   │   │   ├── catalog.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── destination.controller.ts
│   │   │   │   ├── experience.controller.ts
│   │   │   │   ├── category.controller.ts
│   │   │   │   ├── offer.controller.ts
│   │   │   │   ├── partner.controller.ts
│   │   │   │   ├── story.controller.ts
│   │   │   │   └── availability.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── destination.service.ts
│   │   │   │   ├── experience.service.ts
│   │   │   │   ├── category.service.ts
│   │   │   │   ├── offer.service.ts
│   │   │   │   ├── partner.service.ts
│   │   │   │   ├── story.service.ts
│   │   │   │   └── availability.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── destination.repository.ts
│   │   │   │   ├── experience.repository.ts
│   │   │   │   └── ...
│   │   │   ├── dto/
│   │   │   │   ├── create-destination.dto.ts
│   │   │   │   ├── update-destination.dto.ts
│   │   │   │   ├── query-destination.dto.ts
│   │   │   │   └── ...
│   │   │   ├── events/
│   │   │   │   ├── destination-published.event.ts
│   │   │   │   ├── experience-created.event.ts
│   │   │   │   └── ...
│   │   │   └── policies/
│   │   │       ├── destination.policy.ts
│   │   │       └── experience.policy.ts
│   │   ├── booking/
│   │   │   ├── booking.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── booking.controller.ts
│   │   │   │   └── availability.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── booking.service.ts
│   │   │   │   ├── availability.service.ts
│   │   │   │   └── pricing.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── booking.repository.ts
│   │   │   │   └── reservation.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-booking.dto.ts
│   │   │   │   ├── availability-query.dto.ts
│   │   │   │   └── ...
│   │   │   ├── saga/
│   │   │   │   ├── booking-saga.ts
│   │   │   │   └── steps/
│   │   │   │       ├── validate-availability.step.ts
│   │   │   │       ├── reserve-capacity.step.ts
│   │   │   │       ├── apply-pricing.step.ts
│   │   │   │       ├── process-payment.step.ts
│   │   │   │       ├── issue-ticket.step.ts
│   │   │   │       └── send-confirmation.step.ts
│   │   │   ├── events/
│   │   │   │   ├── booking-created.event.ts
│   │   │   │   ├── booking-confirmed.event.ts
│   │   │   │   ├── booking-cancelled.event.ts
│   │   │   │   ├── booking-failed.event.ts
│   │   │   │   └── ...
│   │   │   └── policies/
│   │   │       ├── booking.policy.ts
│   │   │       └── cancellation.policy.ts
│   │   ├── payment/
│   │   │   ├── payment.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── wallet.controller.ts
│   │   │   │   └── invoice.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── wallet.service.ts
│   │   │   │   ├── invoice.service.ts
│   │   │   │   └── refund.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── payment.repository.ts
│   │   │   │   ├── wallet.repository.ts
│   │   │   │   └── transaction.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── authorize-payment.dto.ts
│   │   │   │   ├── refund-request.dto.ts
│   │   │   │   └── ...
│   │   │   ├── webhooks/
│   │   │   │   ├── payment-gateway.webhook.ts
│   │   │   │   └── webhook-verifier.ts
│   │   │   └── events/
│   │   │       ├── payment-authorised.event.ts
│   │   │       ├── payment-captured.event.ts
│   │   │       ├── payment-failed.event.ts
│   │   │       ├── refund-processed.event.ts
│   │   │       └── ...
│   │   ├── engagement/
│   │   │   ├── engagement.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── review.controller.ts
│   │   │   │   ├── ambassador.controller.ts
│   │   │   │   ├── referral.controller.ts
│   │   │   │   └── notification.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── review.service.ts
│   │   │   │   ├── ambassador.service.ts
│   │   │   │   ├── reward.service.ts
│   │   │   │   ├── referral.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── review.repository.ts
│   │   │   │   ├── ambassador.repository.ts
│   │   │   │   ├── reward.repository.ts
│   │   │   │   └── notification.repository.ts
│   │   │   └── events/
│   │   │       ├── review-created.event.ts
│   │   │       ├── ambassador-approved.event.ts
│   │   │       ├── referral-converted.event.ts
│   │   │       ├── reward-earned.event.ts
│   │   │       └── ...
│   │   ├── ai/
│   │   │   ├── ai.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── conversation.controller.ts
│   │   │   │   ├── recommendation.controller.ts
│   │   │   │   ├── trip-plan.controller.ts
│   │   │   │   └── preferences.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── conversation.service.ts
│   │   │   │   ├── recommendation.service.ts
│   │   │   │   ├── trip-plan.service.ts
│   │   │   │   ├── intent-classifier.service.ts
│   │   │   │   ├── context-builder.service.ts
│   │   │   │   └── prompt-templates.service.ts
│   │   │   ├── repositories/
│   │   │   │   ├── conversation.repository.ts
│   │   │   │   ├── trip-plan.repository.ts
│   │   │   │   └── user-preferences.repository.ts
│   │   │   └── policies/
│   │   │       └── ai-usage.policy.ts
│   │   ├── identity/
│   │   │   ├── identity.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── role.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── mfa.service.ts
│   │   │   │   ├── password.service.ts
│   │   │   │   └── session.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── jwt-refresh.strategy.ts
│   │   │   │   └── api-key.strategy.ts
│   │   │   ├── repositories/
│   │   │   │   ├── user.repository.ts
│   │   │   │   ├── session.repository.ts
│   │   │   │   └── role.repository.ts
│   │   │   ├── events/
│   │   │   │   ├── user-registered.event.ts
│   │   │   │   ├── user-logged-in.event.ts
│   │   │   │   ├── mfa-enabled.event.ts
│   │   │   │   └── account-deleted.event.ts
│   │   │   └── dto/
│   │   │       ├── register.dto.ts
│   │   │       ├── login.dto.ts
│   │   │       └── ...
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── dashboard.controller.ts
│   │   │   │   └── reporting.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── dashboard.service.ts
│   │   │   │   ├── reporting.service.ts
│   │   │   │   └── event-tracker.service.ts
│   │   │   └── jobs/
│   │   │       ├── daily-report.job.ts
│   │   │       └── weekly-aggregation.job.ts
│   │   └── notification/
│   │       ├── notification.module.ts
│   │       ├── services/
│   │       │   ├── email.service.ts
│   │       │   ├── sms.service.ts
│   │       │   ├── push.service.ts
│   │       │   ├── in-app.service.ts
│   │       │   └── template.service.ts
│   │       ├── processors/
│   │       │   ├── email.processor.ts
│   │       │   ├── sms.processor.ts
│   │       │   └── push.processor.ts
│   │       └── templates/
│   │           ├── booking-confirmation.hbs
│   │           ├── booking-cancellation.hbs
│   │           ├── payment-receipt.hbs
│   │           └── ...
│   ├── database/
│   │   ├── database.module.ts
│   │   ├── database.service.ts
│   │   └── prisma/
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── infrastructure/
│   │   ├── redis/
│   │   │   ├── redis.module.ts
│   │   │   └── redis.service.ts
│   │   ├── s3/
│   │   │   ├── s3.module.ts
│   │   │   └── s3.service.ts
│   │   ├── cache/
│   │   │   ├── cache.module.ts
│   │   │   └── cache.service.ts
│   │   ├── payment/
│   │   │   ├── payment-gateway.module.ts
│   │   │   └── payment-gateway.service.ts
│   │   ├── ai/
│   │   │   ├── llm-client.module.ts
│   │   │   └── llm-client.service.ts
│   │   └── search/
│   │       ├── search.module.ts
│   │       └── search.service.ts
│   ├── queues/
│   │   ├── queue.module.ts
│   │   ├── queue.service.ts
│   │   └── processors/                     # Job processors
│   │       ├── email.processor.ts
│   │       ├── sms.processor.ts
│   │       ├── push.processor.ts
│   │       ├── notification.processor.ts
│   │       ├── analytics.processor.ts
│   │       ├── image-optimization.processor.ts
│   │       ├── cache-warm.processor.ts
│   │       └── outbox.processor.ts
│   └── common/
│       └── helpers/
│           ├── prisma.helper.ts
│           └── ...

test/
├── unit/
│   ├── modules/
│   │   ├── catalog/
│   │   ├── booking/
│   │   ├── payment/
│   │   └── ...
│   └── common/
├── integration/
│   ├── modules/
│   └── infrastructure/
└── e2e/
    ├── auth.e2e-spec.ts
    ├── destinations.e2e-spec.ts
    ├── bookings.e2e-spec.ts
    └── ...

prisma/
├── schema.prisma
├── migrations/
├── seeds/
│   ├── seed.ts
│   ├── destinations.seed.ts
│   ├── experiences.seed.ts
│   └── test-data.seed.ts
└── generated/
    └── types/

jest.config.ts
tsconfig.json
tsconfig.build.json
tsup.config.ts (or nest-cli.json)
package.json
Dockerfile
docker-compose.yml
.eslintrc.js
.prettierrc
```

---

## 3. NestJS Module Architecture

### 3.1 Module Dependency Graph

```
                      ┌──────────────┐
                      │   AppModule   │
                      └──────┬───────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │  Config   │   │Database  │   │    │
       │  Module   │   │ Module   │   │ Redis     │
       └──────────┘   └──────────┘   │ Module    │
                                     └──────────┘
              │              │              │
              ▼              ▼              ▼
       ┌─────────────────────────────────────────┐
       │            Domain Modules                │
       │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
       │  │Catalog│ │Booking│ │Payment│ │Engage│  │
       │  └──────┘ └──────┘ └──────┘ └──────┘  │
       │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
       │  │  AI   │ │Ident │ │Analyt│ │Notif │  │
       │  └──────┘ └──────┘ └──────┘ └──────┘  │
       └─────────────────────────────────────────┘
              │              │
              ▼              ▼
       ┌──────────┐   ┌──────────┐
       │ Queue    │   │Infrastr  │
       │ Module   │   │ Module   │
       └──────────┘   └──────────┘
```

### 3.2 Module Responsibility

| Module | Responsibility | Depends On |
|---|---|---|
| **AppModule** | Root module, imports all | Config, Database, Redis |
| **ConfigModule** | Environment configuration | — |
| **DatabaseModule** | Prisma connection + migrations | Config |
| **RedisModule** | Redis client + cache | Config |
| **CatalogModule** | Destinations, experiences, categories, offers, partners, stories | Database |
| **BookingModule** | Booking CRUD, availability, pricing, Saga orchestration | Database, Redis, Payment, Queue |
| **PaymentModule** | Payment processing, wallet, invoices, refunds | Database, Redis, Queue |
| **EngagementModule** | Reviews, ambassadors, referrals, rewards, notifications | Database, Queue |
| **AIModule** | Conversations, recommendations, trip plans, LLM integration | Database, Infrastructure |
| **IdentityModule** | Auth, users, roles, MFA, sessions | Database, Redis |
| **AnalyticsModule** | Dashboard, reports, event tracking | Database, Queue |
| **NotificationModule** | Email, SMS, push, in-app notifications | Database, Queue |
| **QueueModule** | BullMQ queue definitions + processors | Redis, Database |
| **InfrastructureModule** | External integrations (S3, payment gateway, LLM, search) | Config |

### 3.3 Module Registration Pattern

```typescript
// catalog.module.ts
@Module({
  imports: [
    PrismaModule,
    forwardRef(() => QueueModule),
  ],
  controllers: [
    DestinationController,
    ExperienceController,
    CategoryController,
    OfferController,
    PartnerController,
    StoryController,
    AvailabilityController,
  ],
  providers: [
    // Services
    DestinationService,
    ExperienceService,
    CategoryService,
    OfferService,
    PartnerService,
    StoryService,
    AvailabilityService,
    // Repositories
    DestinationRepository,
    ExperienceRepository,
    CategoryRepository,
    OfferRepository,
    PartnerRepository,
    StoryRepository,
    AvailabilityRepository,
    // Policies
    DestinationPolicy,
    ExperiencePolicy,
  ],
  exports: [
    DestinationService,
    ExperienceService,
    DestinationRepository,
    ExperienceRepository,
  ],
})
export class CatalogModule {}
```

---

## 4. Service Layer

### 4.1 Layered Architecture

```
Controller (HTTP)         → DTO validation, routing, response formatting
    ↓
Policy (Authorization)   → Business rule enforcement
    ↓
Service (Business Logic) → Domain operations, event emission
    ↓
Repository (Data Access) → Prisma queries, read models
    ↓
Prisma (Database)        → PostgreSQL via Prisma ORM
```

### 4.2 Service Pattern

```typescript
@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly availabilityService: AvailabilityService,
    private readonly pricingService: PricingService,
    private readonly eventBus: EventBusService,
    private readonly logger: PinoLogger,
  ) {}

  @Transactional()
  async create(dto: CreateBookingDto, userId: string): Promise<Booking> {
    // 1. Validate business rules
    await this.bookingPolicy.validateCreation(dto, userId);

    // 2. Check availability (optimistic lock)
    const availability = await this.availabilityService.reserveSlot(
      dto.experienceId,
      dto.scheduleDate,
      dto.travelers.total,
    );

    // 3. Calculate pricing
    const pricing = await this.pricingService.calculate(
      dto.experienceId,
      dto.travelers,
      dto.couponCode,
    );

    // 4. Create booking record
    const booking = await this.bookingRepository.create({
      userId,
      experienceId: dto.experienceId,
      scheduleDate: dto.scheduleDate,
      travelers: dto.travelers,
      totalAmount: pricing.total,
      currency: pricing.currency,
      status: BookingStatus.PENDING,
    });

    // 5. Emit event (outbox pattern)
    await this.eventBus.emit(new BookingCreatedEvent(booking));

    // 6. Trigger saga
    await this.bookingSaga.start(booking.id);

    // 7. Return
    return booking;
  }

  async cancel(id: string, userId: string, reason?: string): Promise<Booking> {
    const booking = await this.bookingRepository.findByIdOrThrow(id);
    this.bookingPolicy.validateCancellation(booking, userId);

    const cancelled = await this.bookingRepository.updateStatus(
      id,
      BookingStatus.CANCELLED,
      { cancelledBy: userId, cancellationReason: reason },
    );

    await this.eventBus.emit(new BookingCancelledEvent(cancelled));
    return cancelled;
  }

  async findByUser(
    userId: string,
    pagination: PaginationDto,
    filters?: BookingFilters,
  ): Promise<PaginatedResult<Booking>> {
    return this.bookingRepository.findByUser(userId, pagination, filters);
  }
}
```

### 4.3 Repository Pattern

```typescript
@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBookingData): Promise<Booking> {
    return this.prisma.booking.create({ data });
  }

  async findByIdOrThrow(id: string): Promise<Booking> {
    return this.prisma.booking.findUniqueOrThrow({ where: { id } });
  }

  async findByUser(
    userId: string,
    pagination: PaginationDto,
    filters?: BookingFilters,
  ): Promise<PaginatedResult<Booking>> {
    const where = { userId, ...this.buildFilters(filters) };
    const orderBy = this.buildSort(pagination.sort);

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        orderBy,
        take: pagination.limit,
        skip: pagination.offset,
        include: { experience: { select: { title: true, slug: true, media: true } } },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return paginate({ data, totalCount, pagination });
  }

  async updateStatus(
    id: string,
    status: BookingStatus,
    extra?: Prisma.BookingUpdateInput,
  ): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: { status, statusChangedAt: new Date(), ...extra },
    });
  }

  private buildFilters(filters?: BookingFilters): Prisma.BookingWhereInput {
    if (!filters) return {};
    const where: Prisma.BookingWhereInput = {};
    if (filters.status) where.status = filters.status;
    if (filters.dateFrom || filters.dateTo) {
      where.scheduleDate = {};
      if (filters.dateFrom) where.scheduleDate.gte = filters.dateFrom;
      if (filters.dateTo) where.scheduleDate.lte = filters.dateTo;
    }
    return where;
  }

  private buildSort(sort?: string): Prisma.BookingOrderByWithRelationInput {
    const mapping: Record<string, string> = {
      created_at: 'createdAt',
      schedule_date: 'scheduleDate',
      status: 'status',
    };
    if (!sort) return { createdAt: 'desc' };
    const [field, dir] = sort.startsWith('-')
      ? [sort.slice(1), 'desc']
      : [sort, 'asc'];
    return { [mapping[field] || 'createdAt']: dir };
  }
}
```

### 4.4 Policy Layer

```typescript
@Injectable()
export class BookingPolicy {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
  ) {}

  async validateCreation(dto: CreateBookingDto, userId: string): Promise<void> {
    const experience = await this.experienceRepository.findById(dto.experienceId);
    if (!experience) throw new NotFoundException('Experience not found');
    if (experience.status !== 'published') throw new ConflictException('Experience not available');
    if (experience.minTravelers && dto.travelers.total < experience.minTravelers) {
      throw new UnprocessableEntityException('Minimum travelers not met');
    }
    if (experience.maxTravelers && dto.travelers.total > experience.maxTravelers) {
      throw new UnprocessableEntityException('Maximum travelers exceeded');
    }
  }

  validateCancellation(booking: Booking, userId: string): void {
    if (booking.userId !== userId) {
      throw new ForbiddenException('Cannot cancel another user\'s booking');
    }
    if (![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(booking.status)) {
      throw new InvalidStateTransitionException('Booking cannot be cancelled in current status');
    }
    const hoursUntil = differenceInHours(booking.scheduleDate, new Date());
    if (hoursUntil < 24) throw new ConflictException('Cannot cancel within 24 hours of start');
  }
}
```

---

## 5. Queue Architecture (BullMQ)

### 5.1 Queue Definitions

| Queue Name | Concurrency | Retries | Description |
|---|---|---|---|
| `email` | 5 | 3 | Email delivery |
| `sms` | 10 | 3 | SMS delivery |
| `push` | 5 | 2 | Push notification delivery |
| `notification` | 10 | 3 | In-app notification creation |
| `analytics` | 5 | 2 | Analytics event processing |
| `image-optimization` | 3 | 2 | Image resize + optimization |
| `cache-warm` | 2 | 1 | Cache warming after invalidation |
| `outbox` | 1 | 5 | Outbox message relay |
| `payment-webhook` | 3 | 3 | Payment webhook processing |
| `scheduled-jobs` | 1 | 1 | Cron-driven batch jobs |

### 5.2 Queue Configuration

```typescript
// queue.config.ts
export default registerAs('queue', () => ({
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: { age: 3600 * 24 },     // 24 hours
    removeOnFail: { age: 3600 * 24 * 7 },      // 7 days
  },
  queues: {
    email: {
      defaultJobOptions: { attempts: 3, backoff: { type: 'fixed', delay: 5000 } },
    },
    payment: {
      defaultJobOptions: { attempts: 5, backoff: { type: 'exponential', delay: 2000 } },
    },
    outbox: {
      defaultJobOptions: { attempts: 5, backoff: { type: 'exponential', delay: 1000 } },
    },
  },
  limiter: {
    email: { max: 50, duration: 1000 },           // 50 emails/sec
    sms: { max: 10, duration: 1000 },
    paymentWebhook: { max: 100, duration: 1000 },
  },
}));
```

### 5.3 Queue Service

```typescript
@Injectable()
export class QueueService {
  private queues: Map<string, Queue> = new Map();

  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    @InjectQueue('sms') private smsQueue: Queue,
    @InjectQueue('push') private pushQueue: Queue,
    @InjectQueue('notification') private notificationQueue: Queue,
    @InjectQueue('analytics') private analyticsQueue: Queue,
    @InjectQueue('image-optimization') private imageOptimizationQueue: Queue,
    @InjectQueue('cache-warm') private cacheWarmQueue: Queue,
    @InjectQueue('outbox') private outboxQueue: Queue,
    @InjectQueue('payment-webhook') private paymentWebhookQueue: Queue,
    @InjectQueue('scheduled-jobs') private scheduledJobsQueue: Queue,
  ) {
    this.queues.set('email', this.emailQueue);
    this.queues.set('sms', this.smsQueue);
    this.queues.set('push', this.pushQueue);
    this.queues.set('notification', this.notificationQueue);
    this.queues.set('analytics', this.analyticsQueue);
    this.queues.set('image-optimization', this.imageOptimizationQueue);
    this.queues.set('cache-warm', this.cacheWarmQueue);
    this.queues.set('outbox', this.outboxQueue);
    this.queues.set('payment-webhook', this.paymentWebhookQueue);
    this.queues.set('scheduled-jobs', this.scheduledJobsQueue);
  }

  async add<T>(queueName: string, jobName: string, data: T, opts?: JobsOptions): Promise<Job<T>> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    return queue.add(jobName, data, opts);
  }

  async addBulk<T>(queueName: string, jobs: { name: string; data: T; opts?: JobsOptions }[]): Promise<Job<T>[]> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    return queue.addBulk(jobs);
  }

  async getJob(queueName: string, jobId: string): Promise<Job | null> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    return queue.getJob(jobId);
  }

  async getQueueMetrics(queueName: string): Promise<{ waiting: number; active: number; completed: number; failed: number; delayed: number }> {
    const queue = this.queues.get(queueName);
    if (!queue) return { waiting: 0, active: 0, completed: 0, failed: 0, delayed: 0 };
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ]);
    return { waiting, active, completed, failed, delayed };
  }

  async pauseQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    await queue.pause();
  }

  async resumeQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    await queue.resume();
  }

  async emptyQueue(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue ${queueName} not found`);
    await queue.obliterate({ force: true });
  }
}
```

### 5.4 Job Processor Pattern

```typescript
@Processor('email')
export class EmailProcessor {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: PinoLogger,
  ) {}

  @Process('send-booking-confirmation')
  async handleBookingConfirmation(job: Job<EmailJobData>): Promise<void> {
    const { to, template, context } = job.data;
    this.logger.info({ jobId: job.id, to }, 'Sending booking confirmation email');

    try {
      await this.emailService.send({
        to,
        template: 'booking-confirmation',
        context,
      });
      this.logger.info({ jobId: job.id }, 'Email sent successfully');
    } catch (error) {
      this.logger.error({ jobId: job.id, error }, 'Email sending failed');
      throw error; // BullMQ will retry based on config
    }
  }

  @Process('send-payment-receipt')
  async handlePaymentReceipt(job: Job<EmailJobData>): Promise<void> {
    const { to, context } = job.data;
    await this.emailService.send({ to, template: 'payment-receipt', context });
  }
}
```

---

## 6. Event Architecture

### 6.1 Event Bus

```typescript
@Injectable()
export class EventBusService {
  constructor(
    private readonly queueService: QueueService,
  ) {}

  async emit<T>(event: IDomainEvent<T>): Promise<void> {
    // Write to outbox for guaranteed delivery
    await this.queueService.add('outbox', 'relay-event', {
      eventName: event.constructor.name,
      aggregateId: event.aggregateId,
      aggregateType: event.aggregateType,
      payload: event,
      metadata: {
        correlationId: event.correlationId,
        causationId: event.causationId,
        occurredAt: event.occurredAt,
      },
    });
  }
}
```

### 6.2 Domain Event Interface

```typescript
export interface IDomainEvent<T = any> {
  eventName: string;
  aggregateId: string;
  aggregateType: string;
  payload: T;
  correlationId: string;
  causationId: string;
  occurredAt: Date;
}
```

### 6.3 Event Definitions

```typescript
// booking-created.event.ts
export class BookingCreatedEvent implements IDomainEvent<BookingCreatedPayload> {
  readonly eventName = 'booking.created';
  readonly aggregateType = 'booking';
  readonly occurredAt = new Date();

  constructor(
    public readonly aggregateId: string,
    public readonly payload: BookingCreatedPayload,
    public readonly correlationId: string,
    public readonly causationId: string,
  ) {}
}

export interface BookingCreatedPayload {
  bookingId: string;
  userId: string;
  experienceId: string;
  experienceTitle: string;
  scheduleDate: Date;
  travelers: TravelerCount;
  totalAmount: number;
  currency: string;
}

// booking-confirmed.event.ts
export class BookingConfirmedEvent implements IDomainEvent<BookingConfirmedPayload> {
  readonly eventName = 'booking.confirmed';
  readonly aggregateType = 'booking';
  readonly occurredAt = new Date();

  constructor(
    public readonly aggregateId: string,
    public readonly payload: BookingConfirmedPayload,
    public readonly correlationId: string,
    public readonly causationId: string,
  ) {}
}

// booking-cancelled.event.ts
export class BookingCancelledEvent implements IDomainEvent<BookingCancelledPayload> {
  readonly eventName = 'booking.cancelled';
  readonly aggregateType = 'booking';
  readonly occurredAt = new Date();

  constructor(
    public readonly aggregateId: string,
    public readonly payload: BookingCancelledPayload,
    public readonly correlationId: string,
    public readonly causationId: string,
  ) {}
}

// payment-captured.event.ts
export class PaymentCapturedEvent implements IDomainEvent<PaymentCapturedPayload> {
  readonly eventName = 'payment.captured';
  readonly aggregateType = 'payment';
  readonly occurredAt = new Date();

  constructor(
    public readonly aggregateId: string,
    public readonly payload: PaymentCapturedPayload,
    public readonly correlationId: string,
    public readonly causationId: string,
  ) {}
}
```

### 6.4 Event Handlers

```typescript
@Injectable()
export class BookingEventHandlers {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly analyticsService: AnalyticsService,
    private readonly rewardService: RewardService,
  ) {}

  @OnEvent('booking.created')
  async onBookingCreated(event: BookingCreatedEvent): Promise<void> {
    // Send booking confirmation notification
    await this.notificationService.send(event.payload.userId, {
      type: NotificationType.BOOKING_CONFIRMATION,
      title: 'Booking Confirmed',
      body: `Your booking for ${event.payload.experienceTitle} is confirmed`,
      data: { bookingId: event.payload.bookingId },
    });

    // Track analytics
    await this.analyticsService.track('booking.created', {
      userId: event.payload.userId,
      experienceId: event.payload.experienceId,
      amount: event.payload.totalAmount,
    });
  }

  @OnEvent('booking.cancelled')
  async onBookingCancelled(event: BookingCancelledEvent): Promise<void> {
    await this.notificationService.send(event.payload.userId, {
      type: NotificationType.BOOKING_CANCELLED,
      title: 'Booking Cancelled',
      body: `Your booking for ${event.payload.experienceTitle} has been cancelled`,
      data: { bookingId: event.payload.bookingId },
    });
  }

  @OnEvent('booking.confirmed')
  async onBookingConfirmed(event: BookingConfirmedEvent): Promise<void> {
    // Award points for completed booking
    await this.rewardService.awardPoints(
      event.payload.userId,
      event.payload.totalAmount,
      RewardTransactionType.BOOKING_COMPLETED,
    );
  }
}
```

### 6.5 Event Catalog

```
Event Name                     Publisher      Subscribers
────────────────────────────────────────────────────────────────────
catalog.destination.published   Catalog       SearchIndex, CacheInvalidation
catalog.experience.created     Catalog       SearchIndex, CacheInvalidation
catalog.experience.updated     Catalog       SearchIndex, CacheInvalidation
catalog.experience.published   Catalog       SearchIndex, AIRecommendation
catalog.offer.activated        Catalog       CacheInvalidation, Notification
catalog.offer.expired          Catalog       CacheInvalidation

booking.created                Booking       Notification, Analytics, Availability
booking.confirmed              Booking       Notification, Reward, TicketGeneration
booking.cancelled              Booking       Notification, Payment(Refund), Availability
booking.updated                Booking       Notification

payment.authorised             Payment       Booking(confirm), Notification
payment.captured               Payment       Booking(confirm), InvoiceGeneration
payment.failed                 Payment       Booking(fail), Notification
payment.refunded               Payment       Booking(update), Wallet(refund)

engagement.review.created      Engagement    Catalog(rating update), Reward
engagement.ambassador.approved Engagement    Notification
engagement.referral.converted  Engagement    Reward, Ambassador(commission)

identity.user.registered       Identity      WelcomeNotification, Analytics
identity.user.login            Identity      Analytics
identity.account.deleted       Identity      Anonymization, Cleanup

ai.recommendation.served       AI            Analytics
ai.conversation.started        AI            Analytics
ai.trip-plan.created           AI            Notification

notification.sent              Notification  Analytics
```

---

## 7. Outbox Pattern

### 7.1 Outbox Table

```sql
-- Defined in DATABASE_ARCHITECTURE.md, event_store schema
CREATE TABLE event_store.outbox_messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name      TEXT NOT NULL,
    aggregate_id    TEXT NOT NULL,
    aggregate_type  TEXT NOT NULL,
    payload         JSONB NOT NULL,
    correlation_id  TEXT,
    causation_id    TEXT,
    occurred_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at    TIMESTAMPTZ,
    error_message   TEXT,
    retry_count     INT NOT NULL DEFAULT 0,
    status          TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_outbox_status_occurred
    ON event_store.outbox_messages(status, occurred_at)
    WHERE status = 'pending';
```

### 7.2 Outbox Writer

```typescript
@Injectable()
export class OutboxService {
  constructor(private readonly prisma: PrismaService) {}

  async write(event: IDomainEvent): Promise<void> {
    await this.prisma.outboxMessage.create({
      data: {
        eventName: event.eventName,
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: event.payload as any,
        correlationId: event.correlationId,
        causationId: event.causationId,
        occurredAt: event.occurredAt,
      },
    });
  }

  async markProcessed(id: string): Promise<void> {
    await this.prisma.outboxMessage.update({
      where: { id },
      data: { status: 'completed', processedAt: new Date() },
    });
  }

  async markFailed(id: string, error: string): Promise<void> {
    await this.prisma.outboxMessage.update({
      where: { id },
      data: { status: 'failed', errorMessage: error },
    });
  }

  async incrementRetry(id: string): Promise<void> {
    await this.prisma.outboxMessage.update({
      where: { id },
      data: { retryCount: { increment: 1 } },
    });
  }

  async fetchPending(batchSize: number = 50): Promise<OutboxMessage[]> {
    return this.prisma.outboxMessage.findMany({
      where: { status: 'pending' },
      orderBy: { occurredAt: 'asc' },
      take: batchSize,
    });
  }
}
```

### 7.3 Outbox Processor

```typescript
@Processor('outbox')
export class OutboxProcessor {
  constructor(
    private readonly outboxService: OutboxService,
    private readonly eventBus: EventBusService,
    private readonly logger: PinoLogger,
  ) {}

  @Process('relay-event')
  async relayEvent(job: Job<OutboxJobData>): Promise<void> {
    const { eventName, aggregateId, payload, metadata } = job.data;
    this.logger.debug({ eventName, aggregateId }, 'Relaying outbox event');

    try {
      // Reconstruct and emit event to local handlers
      const event = this.reconstructEvent(eventName, aggregateId, payload, metadata);
      await this.eventBus.emitLocal(event);
    } catch (error) {
      this.logger.error({ eventName, aggregateId, error }, 'Failed to relay outbox event');
      throw error;
    }
  }

  private reconstructEvent(
    eventName: string,
    aggregateId: string,
    payload: any,
    metadata: OutboxMetadata,
  ): IDomainEvent {
    const registry: Record<string, new (...args: any[]) => IDomainEvent> = {
      'booking.created': BookingCreatedEvent,
      'booking.confirmed': BookingConfirmedEvent,
      'booking.cancelled': BookingCancelledEvent,
      'payment.captured': PaymentCapturedEvent,
      // ... all events registered here
    };

    const EventClass = registry[eventName];
    if (!EventClass) throw new Error(`Unknown event type: ${eventName}`);

    return new EventClass(aggregateId, payload, metadata.correlationId, metadata.causationId);
  }
}
```

### 7.4 Outbox Polling Job

```typescript
@Injectable()
export class OutboxPollingJob {
  constructor(
    private readonly outboxService: OutboxService,
    private readonly queueService: QueueService,
    private readonly logger: PinoLogger,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async pollOutbox(): Promise<void> {
    const pending = await this.outboxService.fetchPending(50);
    this.logger.debug({ count: pending.length }, 'Polling outbox messages');

    for (const message of pending) {
      await this.queueService.add('outbox', 'relay-event', {
        eventName: message.eventName,
        aggregateId: message.aggregateId,
        payload: message.payload,
        metadata: {
          correlationId: message.correlationId,
          causationId: message.causationId,
          occurredAt: message.occurredAt,
        },
      });
    }
  }
}
```

---

## 8. Saga Orchestration

### 8.1 Booking Saga

The Booking Saga is a distributed transaction that spans multiple bounded contexts with compensation steps.

```
Booking Saga Flow:
                  ┌─────────────────────────────────────┐
                  │          Booking Saga                 │
                  │  Parallel/Sequential Execution        │
                  └─────────────────────────────────────┘

Step 1: Validate Availability ─────────────────────────────┐
    ├── Success → Reserve Capacity                         │
    └── Failure → FAIL_SAGA (no compensation needed)       │
                                                           │
Step 2: Reserve Capacity ─────────────────────────────────┤
    ├── Success → Calculate Pricing                        │
    ├── Failure → FAIL_SAGA (release availability)         │
    └── Compensate → RELEASE_RESERVATION                   │
                                                           │
Step 3: Apply Pricing ────────────────────────────────────┤
    ├── Success → Process Payment                          │
    ├── Failure → FAIL_SAGA (release availability)         │
    └── Compensate → RELEASE_RESERVATION                   │
                                                           │
Step 4: Process Payment ─────────────────────────────────┤
    ├── Success → Issue Ticket                             │
    ├── Failure → FAIL_SAGA (release availability)         │
    └── Compensate → RELEASE_RESERVATION + REFUND          │
                                                           │
Step 5: Issue Ticket ────────────────────────────────────┤
    ├── Success → Send Confirmation                        │
    ├── Failure → FAIL_SAGA (release + refund, partial)    │
    └── Compensate → RELEASE + REFUND + CANCEL_TICKET      │
                                                           │
Step 6: Send Confirmation ────────────────────────────────┤
    ├── Success → SAGA_COMPLETE (booking confirmed)        │
    └── Failure → RETRY (not critical, will retry async)    │
                                                           │
                ┌──────────────────────────┐               │
                │ Saga State Persistence   │               │
                │ saga_id, step,           │               │
                │ status, compensation_data│               │
                │ created_at, updated_at   │               │
                └──────────────────────────┘               │
```

### 8.2 Saga State

```sql
-- Saga state persistence table
CREATE TABLE booking."SagaState" (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    saga_type                TEXT NOT NULL,
    booking_id               UUID NOT NULL REFERENCES booking.bookings(id),
    current_step             INT NOT NULL DEFAULT 0,
    status                   TEXT NOT NULL DEFAULT 'running'
        CHECK (status IN ('running', 'completed', 'failed', 'compensating', 'compensated')),
    step_states              JSONB NOT NULL DEFAULT '[]',
    compensation_data        JSONB NOT NULL DEFAULT '{}',
    error_message            TEXT,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_saga_booking ON booking."SagaState"(booking_id);
CREATE INDEX idx_saga_status ON booking."SagaState"(status) WHERE status = 'running';
```

### 8.3 Saga Step Interface

```typescript
export interface SagaStep<TContext = any> {
  readonly name: string;
  readonly order: number;
  execute(context: TContext): Promise<void>;
  compensate(context: TContext): Promise<void>;
}
```

### 8.4 Booking Saga Implementation

```typescript
@Injectable()
export class BookingSaga {
  private readonly steps: SagaStep<BookingSagaContext>[];

  constructor(
    private readonly validateAvailabilityStep: ValidateAvailabilityStep,
    private readonly reserveCapacityStep: ReserveCapacityStep,
    private readonly applyPricingStep: ApplyPricingStep,
    private readonly processPaymentStep: ProcessPaymentStep,
    private readonly issueTicketStep: IssueTicketStep,
    private readonly sendConfirmationStep: SendConfirmationStep,
    private readonly sagaRepository: SagaRepository,
    private readonly queueService: QueueService,
    private readonly logger: PinoLogger,
  ) {
    this.steps = [
      this.validateAvailabilityStep,
      this.reserveCapacityStep,
      this.applyPricingStep,
      this.processPaymentStep,
      this.issueTicketStep,
      this.sendConfirmationStep,
    ];
  }

  async start(bookingId: string): Promise<void> {
    const saga = await this.sagaRepository.create({
      sagaType: 'booking',
      bookingId,
      currentStep: 0,
      status: 'running',
    });

    await this.queueService.add(
      'scheduled-jobs',
      'execute-saga-step',
      { sagaId: saga.id, stepIndex: 0 },
      { delay: 100 }, // Small delay to allow transaction to commit
    );

    this.logger.info({ bookingId, sagaId: saga.id }, 'Booking saga started');
  }

  async executeStep(sagaId: string, stepIndex: number): Promise<void> {
    const saga = await this.sagaRepository.findByIdOrThrow(sagaId);
    if (saga.status !== 'running') return;

    const step = this.steps[stepIndex];
    if (!step) return this.complete(saga);

    this.logger.info({ sagaId, step: step.name }, 'Executing saga step');

    try {
      await step.execute({ bookingId: saga.bookingId, sagaId });
      await this.sagaRepository.updateStepState(sagaId, stepIndex, 'completed');

      // Move to next step
      await this.queueService.add(
        'scheduled-jobs',
        'execute-saga-step',
        { sagaId, stepIndex: stepIndex + 1 },
      );
    } catch (error) {
      this.logger.error({ sagaId, step: step.name, error }, 'Saga step failed');
      await this.sagaRepository.updateStepState(sagaId, stepIndex, 'failed');

      // Start compensation
      await this.compensate(saga, stepIndex);
    }
  }

  private async complete(saga: SagaState): Promise<void> {
    await this.sagaRepository.updateStatus(saga.id, 'completed');
    this.logger.info({ sagaId: saga.id, bookingId: saga.bookingId }, 'Saga completed');
  }

  private async compensate(saga: SagaState, failedStepIndex: number): Promise<void> {
    await this.sagaRepository.updateStatus(saga.id, 'compensating');
    this.logger.info({ sagaId: saga.id, failedStep: failedStepIndex }, 'Starting saga compensation');

    // Execute compensations in reverse order (from failed-1 to 0)
    for (let i = failedStepIndex - 1; i >= 0; i--) {
      const step = this.steps[i];
      try {
        await step.compensate({ bookingId: saga.bookingId, sagaId: saga.id });
        await this.sagaRepository.markStepCompensated(saga.id, i);
      } catch (error) {
        this.logger.error({ sagaId: saga.id, step: step.name, error }, 'Compensation step failed');
        // Mark saga as failed_compensation — alert operators
        await this.sagaRepository.updateStatus(saga.id, 'failed_compensation');
        throw error;
      }
    }

    await this.sagaRepository.updateStatus(saga.id, 'compensated');
    this.logger.info({ sagaId: saga.id }, 'Saga fully compensated');
  }
}
```

### 8.5 Saga Steps

```typescript
// validate-availability.step.ts
@Injectable()
export class ValidateAvailabilityStep implements SagaStep<BookingSagaContext> {
  readonly name = 'validate-availability';
  readonly order = 0;

  constructor(
    private readonly availabilityService: AvailabilityService,
  ) {}

  async execute(context: BookingSagaContext): Promise<void> {
    const booking = await this.getBooking(context.bookingId);
    const available = await this.availabilityService.checkAvailability(
      booking.experienceId,
      booking.scheduleDate,
      booking.travelers.total,
    );
    if (!available) throw new ConflictException('Insufficient capacity');
  }

  async compensate(_context: BookingSagaContext): Promise<void> {
    // No compensation needed — validation is read-only
  }

  private async getBooking(bookingId: string): Promise<Booking> {
    // Injected via constructor
    return {} as Booking;
  }
}

// reserve-capacity.step.ts
@Injectable()
export class ReserveCapacityStep implements SagaStep<BookingSagaContext> {
  readonly name = 'reserve-capacity';
  readonly order = 1;

  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly sagaRepository: SagaRepository,
  ) {}

  async execute(context: BookingSagaContext): Promise<void> {
    const booking = await this.getBooking(context.bookingId);
    const reservation = await this.availabilityService.reserveSlot(
      booking.experienceId,
      booking.scheduleDate,
      booking.travelers.total,
    );
    // Store reservation ID for compensation
    await this.sagaRepository.setCompensationData(context.sagaId, {
      reservationId: reservation.id,
      experienceId: booking.experienceId,
      date: booking.scheduleDate,
      quantity: booking.travelers.total,
    });
  }

  async compensate(context: BookingSagaContext): Promise<void> {
    const data = await this.sagaRepository.getCompensationData(context.sagaId);
    if (data.reservationId) {
      await this.availabilityService.releaseSlot(data.reservationId);
    }
  }
}

// process-payment.step.ts
@Injectable()
export class ProcessPaymentStep implements SagaStep<BookingSagaContext> {
  readonly name = 'process-payment';
  readonly order = 3;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly sagaRepository: SagaRepository,
  ) {}

  async execute(context: BookingSagaContext): Promise<void> {
    // Authorize payment
    const result = await this.paymentService.authorize({
      bookingId: context.bookingId,
      amount: 100, // from pricing step
      currency: 'EGP',
    });
    await this.sagaRepository.setCompensationData(context.sagaId, {
      paymentIntentId: result.paymentIntentId,
    });
  }

  async compensate(context: BookingSagaContext): Promise<void> {
    const data = await this.sagaRepository.getCompensationData(context.sagaId);
    if (data.paymentIntentId) {
      await this.paymentService.refund(data.paymentIntentId);
    }
  }
}
```

---

## 9. Observability

### 9.1 Structured Logging (Pino)

```typescript
// Logger configuration
import { LoggerModule } from 'nestjs-pino';

LoggerModule.forRoot({
  pinoHttp: {
    transport: process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
    level: process.env.LOG_LEVEL || 'info',
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        requestId: req.headers['x-request-id'],
        userId: req.user?.id,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
      err: pino.stdSerializers.err,
    },
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie', 'body.password', 'body.token'],
      censor: '***',
    },
    customProps: (req) => ({
      requestId: req.headers['x-request-id'] || generateId(),
      locale: req.headers['accept-language'],
    }),
  },
});
```

### 9.2 Log Levels

| Level | Usage |
|---|---|
| `fatal` | Service is unusable, requires immediate operator intervention |
| `error` | Operation failed, requires investigation |
| `warn` | Unexpected condition that is recoverable |
| `info` | Normal operation events (saga started, booking created) |
| `debug` | Detailed information for debugging |
| `trace` | Very detailed tracing (DB queries, external calls) |

### 9.3 Log Fields

Every log entry includes:

| Field | Description | Example |
|---|---|---|
| `timestamp` | ISO 8601 timestamp | `2026-06-22T07:00:00.123Z` |
| `level` | Log level | `info` |
| `requestId` | Request identifier | `req_abc123` |
| `correlationId` | Cross-service trace ID | `corr_xyz789` |
| `service` | Service name | `backend` |
| `module` | NestJS module | `BookingModule` |
| `action` | Action being performed | `createBooking` |
| `duration` | Operation duration (ms) | `42` |
| `userId` | Authenticated user | `user_123` |

### 9.4 Metrics (Prometheus)

```typescript
// Metrics definition
@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly httpRequestsTotal: Counter<string>,

    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDuration: Histogram<string>,

    @InjectMetric('http_requests_in_flight')
    private readonly httpRequestsInFlight: Gauge<string>,

    @InjectMetric('db_query_duration_seconds')
    private readonly dbQueryDuration: Histogram<string>,

    @InjectMetric('queue_jobs_total')
    private readonly queueJobsTotal: Counter<string>,

    @InjectMetric('queue_job_duration_seconds')
    private readonly queueJobDuration: Histogram<string>,

    @InjectMetric('business_operations_total')
    private readonly businessOperationsTotal: Counter<string>,
  ) {}

  incrementHttpRequest(method: string, status: number, path: string): void {
    this.httpRequestsTotal.labels(method, String(status), path).inc();
  }

  observeHttpDuration(method: string, path: string, duration: number): void {
    this.httpRequestDuration.labels(method, path).observe(duration);
  }

  incrementHttpInFlight(): () => void {
    this.httpRequestsInFlight.inc();
    return () => this.httpRequestsInFlight.dec();
  }

  observeDbQuery(query: string, duration: number): void {
    this.dbQueryDuration.labels(query).observe(duration);
  }

  incrementQueueJob(queue: string, status: string): void {
    this.queueJobsTotal.labels(queue, status).inc();
  }

  observeQueueJobDuration(queue: string, duration: number): void {
    this.queueJobDuration.labels(queue).observe(duration);
  }

  incrementBusinessOperation(operation: string, status: string): void {
    this.businessOperationsTotal.labels(operation, status).inc();
  }
}
```

### 9.5 Metrics Catalog

| Metric | Type | Labels | Description |
|---|---|---|---|
| `http_requests_total` | Counter | method, status, path | Total HTTP requests |
| `http_request_duration_seconds` | Histogram | method, path | Request latency (buckets: 0.01, 0.05, 0.1, 0.5, 1, 5) |
| `http_requests_in_flight` | Gauge | — | Current in-flight requests |
| `db_query_duration_seconds` | Histogram | query | Database query latency |
| `db_connections_active` | Gauge | — | Active DB connections |
| `db_connections_idle` | Gauge | — | Idle DB connections |
| `queue_jobs_total` | Counter | queue, status | Total queue jobs processed |
| `queue_job_duration_seconds` | Histogram | queue | Queue job processing time |
| `queue_queue_size` | Gauge | queue | Current queue size |
| `cache_hit_ratio` | Gauge | cache | Cache hit/miss ratio |
| `cache_size_bytes` | Gauge | cache | Cache memory usage |
| `business_operations_total` | Counter | operation, status | Domain operations (bookings, payments, etc.) |
| `saga_duration_seconds` | Histogram | saga_type | Saga execution time |
| `saga_failures_total` | Counter | saga_type, step | Saga failure count |
| `payment_gateway_duration_seconds` | Histogram | gateway | Payment gateway latency |
| `email_delivery_duration_seconds` | Histogram | template | Email sending latency |
| `notification_delivery_total` | Counter | type, channel | Notification delivery count |
| `outbox_size` | Gauge | — | Pending outbox messages |

### 9.6 Distributed Tracing (OpenTelemetry)

```typescript
// OpenTelemetry configuration
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'egypthub-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new PrismaInstrumentation(),
  ],
});

sdk.start();
```

### 9.7 Alerting Rules

| Alert | Condition | Severity | Response |
|---|---|---|---|
| `HighErrorRate` | Error rate > 5% over 5 min | Critical | PagerDuty |
| `HighLatency` | p99 latency > 2s over 5 min | Warning | Investigate |
| `QueueBacklog` | Queue depth > 1000 for > 5 min | Warning | Scale consumers |
| `PaymentFailure` | Payment errors > 1% over 5 min | Critical | PagerDuty |
| `OutboxBacklog` | Outbox pending > 500 for > 1 min | Warning | Investigate |
| `SagaFailure` | Saga failure rate > 0 over 5 min | Critical | PagerDuty |
| `DBConnectionPool` | Connection pool > 80% for > 5 min | Warning | Scale DB |
| `CacheHitRate` | Cache hit rate < 50% over 5 min | Warning | Tune cache |
| `DiskUsage` | Disk usage > 85% | Warning | Scale storage |
| `MemoryUsage` | Memory usage > 90% | Critical | Restart + investigate |

---

## 10. Scheduled Jobs

### 10.1 Job Definitions

| Job Name | Schedule | Description |
|---|---|---|
| `poll-outbox` | Every 5 seconds | Relay pending outbox messages |
| `expire-reservations` | Every minute | Release expired availability reservations |
| `expire-offers` | Every hour | Deactivate expired offers |
| `send-booking-reminders` | Every 15 minutes | Send 24h-before reminders |
| `process-refunds` | Every 10 minutes | Initiate pending refunds |
| `aggregate-analytics` | Hourly | Materialize analytics read models |
| `generate-invoices` | Daily at 00:00 | Generate invoices for completed bookings |
| `cleanup-expired-sessions` | Every 30 minutes | Delete expired sessions |
| `warm-cache` | Every hour | Pre-warm frequently accessed data |
| `backup-database` | Daily at 02:00 | Create DB snapshot |
| `anonymize-old-data` | Weekly on Sunday 03:00 | Anonymize data per retention policy |
| `send-weekly-digest` | Weekly on Monday 08:00 | Send user digest emails |
| `partner-report` | Weekly on Monday 06:00 | Send partner performance reports |

### 10.2 Job Implementation

```typescript
@Injectable()
export class ScheduledJobs {
  constructor(
    private readonly outboxService: OutboxService,
    private readonly queueService: QueueService,
    private readonly bookingService: BookingService,
    private readonly analyticsService: AnalyticsService,
    private readonly notificationService: NotificationService,
    private readonly logger: PinoLogger,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async pollOutbox(): Promise<void> {
    const pending = await this.outboxService.fetchPending(50);
    if (pending.length === 0) return;

    this.logger.debug({ count: pending.length }, 'Polling outbox');
    for (const message of pending) {
      await this.queueService.add('outbox', 'relay-event', {
        eventName: message.eventName,
        aggregateId: message.aggregateId,
        payload: message.payload,
        metadata: {
          correlationId: message.correlationId,
          causationId: message.causationId,
          occurredAt: message.occurredAt,
        },
      });
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async expireReservations(): Promise<void> {
    const count = await this.bookingService.expireStaleReservations(15); // 15 min timeout
    if (count > 0) {
      this.logger.info({ count }, 'Expired stale reservations');
    }
  }

  @Cron(CronExpression.EVERY_15_MINUTES)
  async sendBookingReminders(): Promise<void> {
    const upcomingBookings = await this.bookingService.findBookingsStartingIn(24, 25);
    for (const booking of upcomingBookings) {
      await this.notificationService.send(booking.userId, {
        type: NotificationType.BOOKING_REMINDER,
        title: 'Upcoming Experience Tomorrow!',
        body: `Your experience "${booking.experienceTitle}" starts tomorrow at ${booking.scheduleTime}`,
        data: { bookingId: booking.id },
      });
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async processRefunds(): Promise<void> {
    const pendingRefunds = await this.bookingService.findPendingRefunds();
    for (const refund of pendingRefunds) {
      await this.queueService.add('scheduled-jobs', 'process-refund', {
        refundId: refund.id,
        bookingId: refund.bookingId,
      });
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async aggregateAnalytics(): Promise<void> {
    await this.analyticsService.aggregateHourly();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDailyInvoices(): Promise<void> {
    const count = await this.bookingService.generateInvoices(
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    );
    this.logger.info({ count }, 'Daily invoices generated');
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async backupDatabase(): Promise<void> {
    this.logger.info('Starting database backup');
    // Backup handled externally via pg_dump / WAL archiving
  }

  @Cron(CronExpression.EVERY_HOUR)
  async warmCache(): Promise<void> {
    await this.queueService.add('cache-warm', 'warm-popular-destinations', {});
    await this.queueService.add('cache-warm', 'warm-popular-experiences', {});
  }

  @Cron(CronExpression.EVERY_WEEK)
  async sendWeeklyDigest(): Promise<void> {
    const users = await this.bookingService.findActiveUsers();
    for (const user of users) {
      await this.queueService.add('email', 'send-weekly-digest', {
        to: user.email,
        userId: user.id,
      });
    }
  }
}
```

---

## 11. Health Checks

### 11.1 Health Endpoints

| Endpoint | Description | Response Timeout |
|---|---|---|
| `GET /health` | Basic health (liveness) | 2s |
| `GET /health/ready` | Readiness check (all dependencies) | 10s |
| `GET /health/startup` | Startup check (migrations complete) | 30s |

### 11.2 Health Check Implementation

```typescript
// health.module.ts
import { HealthModule } from '@nestjs/terminus';

@Module({
  imports: [
    HealthModule.forRootAsync({
      imports: [PrismaModule, RedisModule, QueueModule],
      inject: [PrismaService, RedisService, QueueService],
      useFactory: (
        prisma: PrismaService,
        redis: RedisService,
        queue: QueueService,
      ) => ({
        healthIndicatorFunction: async () => ({
          database: await prisma.healthCheck(),
          redis: await redis.healthCheck(),
          queue: await queue.healthCheck(),
        }),
      }),
    }),
  ],
})
export class AppHealthModule {}

// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private redisHealth: RedisHealthIndicator,
    private queueHealth: QueueHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database'),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database'),
      () => this.redisHealth.isHealthy('redis'),
      () => this.queueHealth.isHealthy('queue'),
    ]);
  }

  @Get('startup')
  @HealthCheck()
  startup(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database'),
      () => this.checkMigrations(),
    ]);
  }

  private async checkMigrations(): Promise<HealthIndicatorResult> {
    const isMigrated = await this.prismaHealth.isMigrated();
    return {
      migrations: {
        status: isMigrated ? 'up' : 'down',
      },
    };
  }
}
```

### 11.3 Health Response

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up", "latencyMs": 3 },
    "redis": { "status": "up", "latencyMs": 1 },
    "queue": { "status": "up", "queues": 10 }
  },
  "error": {},
  "details": {
    "uptime": 1234567,
    "version": "1.0.0",
    "environment": "production"
  }
}
```

---

## 12. Graceful Shutdown

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Graceful shutdown
  app.enableShutdownHooks();

  // Signal handlers
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Starting graceful shutdown...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received. Starting graceful shutdown...');
    await app.close();
    process.exit(0);
  });

  // Listen
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
```

### 12.1 Shutdown Sequence

```
1. Health check endpoint returns 503 (load balancer stops routing)
2. HTTP server stops accepting new connections (drain period: 30s)
3. BullMQ queues pause (no new jobs picked up)
4. Active job processors finish current jobs (grace period: 25s)
5. Database connection pool drains
6. Redis connections close
7. OpenTelemetry exporter flushes traces
8. Logger flushes buffer
9. Process exits
```

---

*End of Backend Architecture — Version 1.0*
