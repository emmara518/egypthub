# EgyptHub — Domain Architecture

> **Version:** 1.0
> **Status:** Approved
> **Stack:** NestJS, PostgreSQL, Redis, TypeScript
> **Date:** June 2026

---

## Table of Contents

1. [Bounded Contexts](#1-bounded-contexts)
2. [Core Domains](#2-core-domains)
3. [Aggregates](#3-aggregates)
4. [Entities](#4-entities)
5. [Value Objects](#5-value-objects)
6. [Domain Services](#6-domain-services)
7. [Domain Events](#7-domain-events)
8. [Ownership Matrix](#8-ownership-matrix)
9. [Domain Relationships](#9-domain-relationships)
10. [Cross-Domain Communication](#10-cross-domain-communication)

---

## 1. Bounded Contexts

EgyptHub is decomposed into **6 bounded contexts**, each owning a distinct business capability:

| Context ID | Name | Primary Owner | Description |
|---|---|---|---|
| `CTX_CATALOG` | Catalog | Content Team | Destinations, experiences, offers, stories, partners |
| `CTX_BOOKING` | Booking | Operations Team | Reservations, schedules, traveler management, availability |
| `CTX_PAYMENT` | Payment | Finance Team | Transactions, invoices, refunds, installment plans |
| `CTX_ENGAGEMENT` | Engagement | Growth Team | Reviews, ratings, ambassador program, referrals, rewards |
| `CTX_AI` | AI Concierge | AI Team | Chat, recommendations, voice, trip planning, personalization |
| `CTX_IDENTITY` | Identity | Platform Team | Users, authentication, authorization, roles, profiles |

### 1.1 Context Map with Translations

```
CTX_IDENTITY ──────┬────── CTX_CATALOG
                   │
                   ├────── CTX_BOOKING ────── CTX_PAYMENT
                   │
                   ├────── CTX_ENGAGEMENT
                   │
                   └────── CTX_AI
```

- **CTX_IDENTITY** is the upstream dependency for all contexts
- **CTX_BOOKING** orchestrates across CTX_CATALOG (experiences), CTX_PAYMENT (transactions), and CTX_IDENTITY (users)
- **CTX_ENGAGEMENT** reads from CTX_BOOKING and CTX_CATALOG
- **CTX_AI** reads from all contexts but writes only to its own

### 1.2 Context Interaction Rules

| Source | Target | Interaction | Mechanism |
|---|---|---|---|
| CTX_BOOKING | CTX_PAYMENT | Payment authorization + capture | Async event via BullMQ |
| CTX_BOOKING | CTX_IDENTITY | User/guest validation | Synchronous gRPC call |
| CTX_ENGAGEMENT | CTX_BOOKING | Verified review status | Async event |
| CTX_AI | CTX_CATALOG | Content enrichment | Async event + read replica |
| All | CTX_IDENTITY | Auth + profile data | JWT + read API |

---

## 2. Core Domains

### 2.1 Domains by Context

#### CTX_CATALOG
| Domain | Type | Description |
|---|---|---|
| Destinations | Core | Egyptian cities and regions |
| Experiences | Core | Bookable tours, activities, transfers |
| Categories | Supporting | Experience categorization (history, adventure, etc.) |
| Offers | Supporting | Promotional campaigns and discounts |
| Stories | Supporting | User-generated and editorial content |
| Partners | Core | Experience providers and suppliers |
| Content Management | Generic | CMS for all catalog content |

#### CTX_BOOKING
| Domain | Type | Description |
|---|---|---|
| Bookings | Core | Reservations and orders |
| Scheduling | Supporting | Availability calendars, time slots |
| Travelers | Supporting | Guest information, traveler profiles |
| Pricing | Generic | Price calculation, dynamic pricing |

#### CTX_PAYMENT
| Domain | Type | Description |
|---|---|---|
| Payments | Core | Transaction processing |
| Invoicing | Supporting | Invoice generation, tax calculation |
| Wallet | Supporting | Digital wallet, balance management |
| Installments | Supporting | BNPL (Buy Now Pay Later) plans |

#### CTX_ENGAGEMENT
| Domain | Type | Description |
|---|---|---|
| Reviews | Core | User reviews and ratings |
| Rewards | Supporting | Loyalty points, tiers, badges |
| Ambassadors | Core | Affiliate/referral program |
| Notifications | Supporting | Push, email, in-app notifications |

#### CTX_AI
| Domain | Type | Description |
|---|---|---|
| AI Concierge | Core | Chat, recommendations, voice |
| Personalization | Supporting | User preferences, trip plans |
| Recommendation Engine | Generic | ML-powered suggestions |

#### CTX_IDENTITY
| Domain | Type | Description |
|---|---|---|
| Users | Core | Traveler accounts |
| Authentication | Supporting | Login, MFA, OAuth |
| Authorization | Supporting | RBAC, permissions |
| Profiles | Supporting | User profiles, preferences |
| Admin | Supporting | Admin user management |
| Ambassador Identity | Supporting | Ambassador accounts and tracking |

---

## 3. Aggregates

Each aggregate defines a transactional consistency boundary.

### 3.1 CTX_CATALOG Aggregates

#### Destination Aggregate
```
Destination
├── id: DestinationId
├── name: LocalizedName          (value object)
├── slug: Slug                   (value object)
├── description: LocalizedContent
├── media: MediaCollection       (value object)
├── location: GeoLocation        (value object)
├── stats: DestinationStats      (value object)
├── status: ContentStatus        (value object)
├── metadata: ContentMetadata    (value object)
├── categories: CategoryRef[]
├── seasons: Season[]
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Slug must be unique across all destinations
- At least one media item required before publish
- GeoLocation must contain valid lat/lng within Egypt

#### Experience Aggregate
```
Experience
├── id: ExperienceId
├── destinationId: DestinationId
├── partnerId: PartnerId
├── name: LocalizedName
├── slug: Slug
├── description: LocalizedContent
├── media: MediaCollection
├── pricing: ExperiencePricing      (value object)
├── scheduling: SchedulingConfig    (value object)
├── capacity: CapacityConfig        (value object)
├── itinerary: Itinerary[]
├── inclusions: string[]
├── exclusions: string[]
├── requirements: string[]
├── languages: Language[]
├── location: GeoLocation
├── status: ContentStatus
├── rating: AggregateRating         (value object)
├── metadata: ContentMetadata
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Experience must belong to a published destination before it can be published
- Pricing.originalPrice must be >= Pricing.salePrice
- Capacity.maxGuests must be >= Capacity.minGuests

#### Offer Aggregate
```
Offer
├── id: OfferId
├── name: LocalizedName
├── type: OfferType                (percentage | fixed | bundle)
├── value: Money                   (value object)
├── conditions: OfferConditions    (value object)
├── validity: DateRange             (value object)
├── usage: OfferUsage              (value object)
├── targetType: OfferTargetType    (destination | experience | category | all)
├── targetIds: string[]
├── status: OfferStatus
├── metadata: ContentMetadata
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Validity end date must be after start date
- Usage.maxRedemptions must be >= Usage.currentRedemptions
- A percentage offer value must be <= 100

#### Partner Aggregate
```
Partner
├── id: PartnerId
├── name: string
├── slug: Slug
├── description: LocalizedContent
├── logo: MediaRef
├── contact: ContactInfo           (value object)
├── location: GeoLocation
├── verification: VerificationStatus (value object)
├── commission: CommissionRate     (value object)
├── payout: PayoutSettings         (value object)
├── metrics: PartnerMetrics        (value object)
├── status: PartnerStatus          (active | suspended | pending)
├── metadata: ContentMetadata
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Partner must have verified contact info before accepting bookings
- Commission rate must be between 0 and 1

#### Story Aggregate
```
Story
├── id: StoryId
├── authorId: UserId
├── destinationId?: DestinationId
├── experienceId?: ExperienceId
├── type: StoryType                (review | blog | guide | video)
├── title: LocalizedString
├── content: LocalizedContent
├── media: MediaCollection
├── tags: string[]
├── status: ContentStatus
├── moderation: ModerationStatus   (value object)
├── metadata: ContentMetadata
└── createdAt, updatedAt: timestamp
```

### 3.2 CTX_BOOKING Aggregates

#### Booking Aggregate
```
Booking
├── id: BookingId
├── bookingNumber: BookingNumber     (value object — unique, human-readable)
├── userId: UserId
├── experienceId: ExperienceId
├── offerId?: OfferId
├── status: BookingStatus            (draft | pending | confirmed | cancelled | completed | refunded)
├── schedule: BookingSchedule        (value object)
├── travelers: TravelerGroup         (value object)
├── pricing: BookingPricing          (value object)
├── paymentId?: PaymentId
├── cancellation?: CancellationInfo  (value object)
├── notes: string
├── timeline: BookingTimelineEntry[]
├── metadata: BookingMetadata
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Booking status transitions: draft → pending → confirmed → completed (or cancelled from pending/confirmed)
- Confirmed booking must have a valid paymentId
- Traveler count must be within experience capacity
- Cancellation reason required when status = cancelled

#### Availability Aggregate
```
Availability
├── id: AvailabilityId
├── experienceId: ExperienceId
├── date: Date
├── slots: TimeSlot[]
├── isAvailable: boolean
├── capacityOverride?: number
├── pricingOverride?: ExperiencePricing
└── version: number                  (optimistic concurrency)
```

**Invariants:**
- Total booked slots + available slots must not exceed capacity
- Overlapping time slots not allowed for same experience on same day

### 3.3 CTX_PAYMENT Aggregates

#### Payment Aggregate
```
Payment
├── id: PaymentId
├── bookingId: BookingId
├── userId: UserId
├── amount: Money                   (value object)
├── currency: Currency
├── method: PaymentMethod           (card | wallet | installment | stcpay | applepay)
├── status: PaymentStatus           (pending | authorized | captured | failed | refunded | partially_refunded)
├── transactions: Transaction[]
├── gatewayResponse: GatewayData    (value object)
├── refunds: Refund[]
├── metadata: PaymentMetadata
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Sum of refund amounts must not exceed original payment amount
- Payment cannot be modified after capture (only refunded)
- Wallet payments require sufficient balance check

#### Wallet Aggregate
```
Wallet
├── id: WalletId
├── userId: UserId
├── balance: Money
├── currency: Currency
├── ledger: LedgerEntry[]
├── status: WalletStatus            (active | frozen | closed)
└── version: number                 (optimistic concurrency)
```

**Invariants:**
- Balance must never be negative
- All mutations create an immutable ledger entry
- Version-based optimistic locking for concurrent access

#### Invoice Aggregate
```
Invoice
├── id: InvoiceId
├── bookingId: BookingId
├── invoiceNumber: string
├── issuer: InvoiceParty            (value object)
├── recipient: InvoiceParty         (value object)
├── lineItems: InvoiceLineItem[]
├── taxBreakdown: TaxBreakdown[]
├── total: Money
├── currency: Currency
├── status: InvoiceStatus           (draft | issued | paid | cancelled | credit_note)
└── issuedAt, paidAt: timestamp
```

### 3.4 CTX_ENGAGEMENT Aggregates

#### Review Aggregate
```
Review
├── id: ReviewId
├── userId: UserId
├── targetId: string
├── targetType: ReviewTargetType    (experience | destination | partner)
├── rating: number                  (1-5)
├── content: LocalizedContent
├── media: MediaRef[]
├── verified: boolean
├── helpful: number[]
├── moderation: ModerationStatus
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- One review per user per target
- Rating must be 1-5 inclusive
- Verified flag requires completed booking for the target

#### Ambassador Aggregate
```
Ambassador
├── id: AmbassadorId
├── userId: UserId
├── referralCode: ReferralCode      (value object — unique)
├── tier: AmbassadorTier            (bronze | silver | gold | platinum)
├── commission: CommissionConfig    (value object)
├── earnings: AmbassadorEarnings    (value object)
├── referrals: Referral[]
├── payouts: PayoutRecord[]
├── links: TrackedLink[]
├── status: AmbassadorStatus
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Referral code must be globally unique
- A referral can only be attributed to one ambassador
- Commission earned only after referred booking is completed

#### RewardAggregate (Points + Tiers)
```
RewardProfile
├── id: RewardProfileId
├── userId: UserId
├── points: number
├── tier: RewardTier                (bronze | silver | gold | platinum)
├── tierProgress: TierProgress      (value object)
├── pointHistory: PointEntry[]
├── badges: Badge[]
├── lifetimePoints: number
└── version: number
```

**Invariants:**
- Points never negative
- Tier updates computed from lifetime points (not current balance)
- Points expire after configurable period (config: 365 days)

### 3.5 CTX_AI Aggregates

#### Conversation Aggregate
```
Conversation
├── id: ConversationId
├── userId: UserId
├── title: string
├── messages: Message[]
├── context: ConversationContext    (value object)
├── status: ConversationStatus
└── createdAt, updatedAt: timestamp
```

#### UserPreference Aggregate
```
UserPreference
├── id: UserPreferenceId
├── userId: UserId
├── interests: string[]
├── budget: BudgetRange             (value object)
├── travelStyle: TravelStyle[]
├── languages: Language[]
├── accessibility: AccessibilityNeed[]
├── dietary: DietaryPreference[]
├── preferredCategories: string[]
├── pastDestinations: string[]
└── createdAt, updatedAt: timestamp
```

#### TripPlan Aggregate
```
TripPlan
├── id: TripPlanId
├── userId: UserId
├── name: string
├── destination: string
├── duration: DateRange
├── budget: BudgetRange
├── companions: CompanionConfig
├── preferences: TripPreferences
├── days: TripDay[]
├── status: TripPlanStatus
└── createdAt, updatedAt: timestamp
```

### 3.6 CTX_IDENTITY Aggregates

#### User Aggregate
```
User
├── id: UserId
├── email: Email                    (value object)
├── phone: PhoneNumber              (value object)
├── password: PasswordHash          (value object)
├── profile: UserProfile            (value object)
├── addresses: Address[]
├── roles: Role[]                   (traveler | ambassador | partner_admin | admin | super_admin)
├── identities: SocialIdentity[]
├── security: SecuritySettings      (value object)
├── status: UserStatus              (active | suspended | deleted)
├── lastLoginAt: timestamp
└── createdAt, updatedAt: timestamp
```

**Invariants:**
- Email must be unique
- Phone must be unique if provided
- Password must meet complexity requirements (configurable)
- At least one verified contact method (email or phone) required

#### Session Aggregate
```
Session
├── id: SessionId
├── userId: UserId
├── refreshToken: TokenHash
├── deviceInfo: DeviceInfo          (value object)
├── ipAddress: IPAddress
├── expiresAt: timestamp
├── revokedAt?: timestamp
└── createdAt: timestamp
```

---

## 4. Entities

All entities across the system with their primary identifiers and lifecycle.

| Entity | Context | Identifier | Lifecycle | Parent Aggregate |
|---|---|---|---|---|
| Destination | Catalog | UUID | Created → Published → Archived | Destination |
| Experience | Catalog | UUID | Created → Published → Archived | Experience |
| Category | Catalog | UUID | Created → Active → Archived | Category |
| Season | Catalog | UUID | Created → Active → Expired | Destination |
| Offer | Catalog | UUID | Created → Active → Expired → Used | Offer |
| OfferRedemption | Catalog | UUID | Created → Used | Offer |
| Partner | Catalog | UUID | Pending → Verified → Active → Suspended | Partner |
| PayoutRecord | Catalog | UUID | Pending → Processed → Failed | Partner |
| Story | Catalog | UUID | Draft → Pending → Published → Archived | Story |
| Booking | Booking | UUID | Draft → Pending → Confirmed → Completed/Cancelled | Booking |
| BookingTimelineEntry | Booking | UUID | Created → (immutable) | Booking |
| Availability | Booking | UUID | Created → Updated → Removed | Availability |
| TimeSlot | Booking | UUID | Created → Reserved → Released | Availability |
| Traveler | Booking | UUID | Created → (immutable) | Booking |
| Payment | Payment | UUID | Pending → Authorized → Captured/Refunded | Payment |
| Transaction | Payment | UUID | Created → (immutable) | Payment |
| Refund | Payment | UUID | Initiated → Processed → Completed | Payment |
| LedgerEntry | Payment | UUID | Created → (immutable) | Wallet |
| Invoice | Payment | UUID | Draft → Issued → Paid/Cancelled | Invoice |
| InstallmentPlan | Payment | UUID | Active → Completed → Defaulted | InstallmentPlan |
| Review | Engagement | UUID | Draft → Published → Flagged → Removed | Review |
| Ambassador | Engagement | UUID | Applied → Approved → Active → Suspended | Ambassador |
| Referral | Engagement | UUID | Sent → Clicked → Booked → Completed | Ambassador |
| Badge | Engagement | UUID | Created → Awarded → Expired | RewardProfile |
| PointEntry | Engagement | UUID | Created → (immutable) | RewardProfile |
| Conversation | AI | UUID | Active → Archived | Conversation |
| Message | AI | UUID | Created → (immutable) | Conversation |
| TripPlan | AI | UUID | Draft → Saved → Booked → Archived | TripPlan |
| User | Identity | UUID | Created → Active → Suspended → Deleted | User |
| Session | Identity | UUID | Created → Revoked | Session |
| Notification | Engagement | UUID | Created → Sent → Read → Archived | Notification |
| NotificationTemplate | Engagement | UUID | Created → Active → Archived | NotificationTemplate |

---

## 5. Value Objects

### 5.1 Common (Shared Across Domains)

| Value Object | Properties | Validation |
|---|---|---|
| `Email` | `value: string` | Regex validation, max 254 chars |
| `PhoneNumber` | `countryCode, number` | E.164 format |
| `LocalizedName` | `ar: string, en: string` | Both required |
| `LocalizedContent` | `ar: string, en: string` | Both required |
| `Money` | `amount: number, currency: Currency` | Amount > 0, precision 2 |
| `Currency` | Enum | `EGP, USD, SAR, AED` |
| `DateRange` | `startDate, endDate` | End >= Start |
| `GeoLocation` | `latitude, longitude` | Valid geo coords |
| `MediaRef` | `url, alt, mimeType, size` | Valid URL, supported MIME |
| `MediaCollection` | `images[], videos[], cover: MediaRef` | At least one image |
| `Slug` | `value: string` | URL-safe, unique per entity |
| `ContentStatus` | Enum | `draft, pending, published, archived` |
| `ContentMetadata` | `createdBy, updatedBy, publishedAt, version` | |
| `Address` | `line1, line2?, city, state, zip, country` | |
| `Language` | Enum | `ar, en, fr, de, zh, ru` |
| `IPAddress` | `v4 or v6` | Valid IP |
| `PasswordHash` | `hash: string, algorithm: string` | bcrypt, argon2id |
| `AggregateRating` | `average: number, count: number` | 0-5 average |
| `ModerationStatus` | Enum | `pending, approved, rejected, flagged` |

### 5.2 Domain-Specific Value Objects

| Value Object | Domain | Properties |
|---|---|---|
| `DestinationStats` | Catalog | `experienceCount, offerCount, reviewCount, averageRating` |
| `ExperiencePricing` | Catalog | `originalPrice: Money, salePrice?: Money, currency, priceType: per_person | per_group | per_unit` |
| `SchedulingConfig` | Catalog | `duration: number, unit: hours | days, cancellationPolicy, advanceBooking: number` |
| `CapacityConfig` | Catalog | `minGuests, maxGuests, isPrivate: boolean` |
| `Itinerary` | Catalog | `title, description, duration, order, location?: GeoLocation` |
| `OfferConditions` | Catalog | `minBookingAmount?: Money, minTravelers?: number, applicableDays: DayOfWeek[]` |
| `OfferUsage` | Catalog | `maxRedemptions, currentRedemptions, perUserLimit: number` |
| `CommissionRate` | Catalog | `percentage: number, tier: string` |
| `PayoutSettings` | Catalog | `method: bank | wallet, frequency: weekly | biweekly | monthly, accountDetails` |
| `ContactInfo` | Catalog | `email, phone, website?` |
| `PartnerMetrics` | Catalog | `totalBookings, revenue, rating, responseTime` |
| `BookingNumber` | Booking | `prefix: BK-, sequential number` |
| `BookingSchedule` | Booking | `date, timeSlot, duration` |
| `TravelerGroup` | Booking | `adults, children, infants, details: TravelerDetail[]` |
| `BookingPricing` | Booking | `subtotal, discount?, tax, total, currency, breakdown: PriceLine[]` |
| `CancellationInfo` | Booking | `reason, cancelledBy, cancelledAt, refundAmount?` |
| `BookingMetadata` | Booking | `source: web | mobile | ai | partner, utm?: UTM, notes: string` |
| `AvailabilitySlot` | Booking | `startTime, endTime, capacity, booked, pricingOverride?` |
| `GatewayData` | Payment | `gatewayId, transactionId, status, rawResponse, authorizedAmount` |
| `InvoiceParty` | Payment | `name, taxId?, address, email` |
| `InvoiceLineItem` | Payment | `description, quantity, unitPrice, total, taxRate` |
| `TaxBreakdown` | Payment | `taxType, rate, amount` |
| `PaymentMetadata` | Payment | `ipAddress, userAgent, paymentMethod, installmentPlanId?, metadata` |
| `ReferralCode` | Engagement | `value: string` — 6-12 alphanumeric, unique |
| `CommissionConfig` | Engagement | `baseRate, tieredRates: Record<Tier, number>`, `maxPayout` |
| `AmbassadorEarnings` | Engagement | `total, pending, paid, currency` |
| `TrackedLink` | Engagement | `url, source, medium, campaign, clicks` |
| `TierProgress` | Engagement | `currentPoints, pointsToNextTier, progress: 0-100` |
| `ConversationContext` | AI | `currentDestination?, currentExperience?, bookingId?, language` |
| `TripDay` | AI | `dayNumber, title, activities: Activity[]` |
| `BudgetRange` | AI | `min: Money, max: Money` |
| `UserProfile` | Identity | `firstName, lastName, displayName, avatar?, bio?, nationality, dateOfBirth, gender` |
| `SecuritySettings` | Identity | `mfaEnabled, mfaMethod?, recentPasswordChanges, passwordLastChanged` |
| `DeviceInfo` | Identity | `type, os, browser, deviceId` |

---

## 6. Domain Services

### 6.1 CTX_CATALOG Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `PricingService` | Calculate experience pricing with offers | Experience, Offer[], BookingDate | CalculatedPrice |
| `AvailabilityResolver` | Resolve experience availability across date range | Experience, DateRange | AvailabilityDay[] |
| `ContentModerationService` | Flag and review content before publishing | Content, Rules | ModerationDecision |
| `SearchService` | Full-text search across destinations/experiences | Query, Filters, Sort | SearchResult[] |
| `PartnerCommissionService` | Calculate partner commission per booking | Booking, Partner, CommissionRate | CommissionAmount |
| `SlugService` | Generate and validate unique slugs | name, entity type, retry logic | Slug |
| `CategoryResolver` | Resolve category hierarchy and related categories | CategoryId | CategoryTree |

### 6.2 CTX_BOOKING Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `BookingOrchestrator` | Process full booking creation (validate → authorize → confirm) | BookingRequest | BookingResult |
| `AvailabilityGuard` | Validate and reserve availability during booking | ExperienceId, Date, Travelers | SlotReservation |
| `CancellationService` | Process booking cancellation with refund calculation | BookingId, CancelRequest | CancelResult |
| `PriceCalculationService` | Calculate final booking price with all modifiers | Experience, Offer?, Travelers, Date | BookingPricing |
| `BookingNumberGenerator` | Generate sequential, human-readable booking numbers | — | BookingNumber |

### 6.3 CTX_PAYMENT Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `PaymentGatewayService` | Interface with payment providers | PaymentRequest | PaymentResult |
| `RefundProcessor` | Process full and partial refunds | PaymentId, Amount, Reason | RefundResult |
| `WalletService` | Manage wallet balance, deposits, and payments | WalletId, Amount, Direction | WalletMutation |
| `InstallmentEngine` | Calculate and manage installment plans | TotalAmount, PlanType | InstallmentSchedule |
| `InvoiceService` | Generate and manage invoices | Booking | Invoice |
| `TaxCalculator` | Calculate applicable taxes based on location and type | Booking, Jurisdiction | TaxBreakdown[] |

### 6.4 CTX_ENGAGEMENT Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `ReviewVerificationService` | Verify review against completed booking | ReviewId, BookingId | Verified boolean |
| `AmbassadorTrackerService` | Track referral attribution and commissions | ReferralAction | AttributionResult |
| `LoyaltyEngine` | Calculate points, manage tiers, award badges | Action (booking, review, referral) | PointsAwarded |
| `NotificationRouter` | Route notifications to correct channels | Notification, User, Preferences | DispatchResult |
| `NotificationTemplateService` | Resolve and render notification templates | TemplateName, Locale, Variables | RenderedContent |

### 6.5 CTX_AI Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `NLPService` | Process natural language input and extract intent | UserMessage | ParsedIntent |
| `RecommendationEngine` | Generate personalized recommendations | UserContext, Filters | Recommendation[] |
| `TripBuilderService` | Build multi-day trip plans from preferences | UserPreferences, Destination | TripPlan |
| `ChatContextService` | Maintain and resolve conversation context | ConversationId | ContextSnapshot |
| `VoiceProcessingService` | Convert voice to text and extract intent | Audio | ParsedIntent |

### 6.6 CTX_IDENTITY Services

| Service | Responsibility | Input | Output |
|---|---|---|---|
| `AuthenticationService` | Authenticate users and issue tokens | Credentials, MFA | AuthResult |
| `AuthorizationService` | Check permissions and roles | UserId, Action, Resource | boolean |
| `ProfileService` | Manage user profiles and preferences | UserId, ProfileData | UserProfile |
| `SessionManager` | Create, validate, revoke sessions | UserId, DeviceInfo | Session |
| `PasswordService` | Hash, verify, and manage password policies | Password | PasswordHash |
| `MFAService` | Handle multi-factor authentication setup and verification | UserId, Method | MFAStatus |

---

## 7. Domain Events

### 7.1 Event Catalog

| Event | Publisher | Consumers | Payload |
|---|---|---|---|
| `UserRegistered` | Identity | AI, Engagement | userId, email, locale, interests |
| `UserLoggedIn` | Identity | Engagement | userId, timestamp, device |
| `UserProfileUpdated` | Identity | AI | userId, profileChanges |
| `DestinationPublished` | Catalog | Search, AI | destinationId, slug |
| `ExperiencePublished` | Catalog | Search, AI, Booking | experienceId, partnerId |
| `ExperienceUnpublished` | Catalog | Search, Booking | experienceId |
| `OfferActivated` | Catalog | Search, Booking | offerId, conditions |
| `OfferExpired` | Catalog | Booking | offerId |
| `PartnerVerified` | Catalog | Booking | partnerId |
| `AvailabilityUpdated` | Catalog | Booking | experienceId, dateRange, capacity |
| `BookingCreated` | Booking | Payment, Engagement, AI, Notification | bookingId, userId, amount |
| `BookingConfirmed` | Booking | Payment, Engagement, AI, Notification | bookingId, paymentId |
| `BookingCancelled` | Booking | Payment, Engagement, Notification | bookingId, reason, refundAmount |
| `BookingCompleted` | Booking | Engagement, AI, Notification | bookingId, userId |
| `PaymentAuthorized` | Payment | Booking | paymentId, bookingId, amount |
| `PaymentCaptured` | Payment | Booking, Notification | paymentId, bookingId, amount |
| `PaymentFailed` | Payment | Booking, Notification | paymentId, bookingId, reason |
| `PaymentRefunded` | Payment | Booking, Notification | paymentId, bookingId, amount |
| `WalletCredited` | Payment | Engagement, Notification | userId, amount, balance |
| `WalletDebited` | Payment | Booking | userId, amount, balance |
| `ReviewCreated` | Engagement | AI, Notification | reviewId, targetId, rating |
| `ReviewModerated` | Engagement | Notification | reviewId, status |
| `AmbassadorReferralConverted` | Engagement | Notification | referralCode, ambassadorId, reward |
| `AmbassadorApproved` | Engagement | Identity, Notification | ambassadorId, userId |
| `PointsAwarded` | Engagement | Notification | userId, points, reason, newTier |
| `PointsRedeemed` | Engagement | Payment | userId, points, value |
| `ConversationStarted` | AI | Engagement | conversationId, userId |
| `RecommendationGenerated` | AI | — | userId, recommendations |
| `TripPlanCreated` | AI | Booking | tripPlanId, userId |
| `TripPlanBooked` | AI | Engagement | tripPlanId, bookingId |

### 7.2 Event Delivery Guarantees

| Priority | Event | Delivery | Retry | SLA |
|---|---|---|---|---|
| Critical | `PaymentCaptured`, `PaymentFailed` | At-least-once | 5 retries, 30s backoff | < 1s |
| High | `BookingConfirmed`, `BookingCancelled` | At-least-once | 3 retries, 60s backoff | < 5s |
| Normal | `ReviewCreated`, `PointsAwarded` | At-least-once | 3 retries, 120s backoff | < 30s |
| Low | `UserProfileUpdated`, `ConversationStarted` | At-most-once | 1 retry | < 60s |

---

## 8. Ownership Matrix

### 8.1 Team Ownership

| Domain | Primary Team | Secondary Team | SLA |
|---|---|---|---|
| Destinations | Content Team | Platform | 4h |
| Experiences | Content Team | Platform | 4h |
| Categories | Content Team | — | 8h |
| Offers | Marketing Team | Engineering | 2h |
| Partners | Operations Team | Finance | 4h |
| Stories | Content Team | — | 8h |
| CMS | Platform Team | — | 2h |
| Bookings | Operations Team | Engineering | 30min |
| Scheduling | Operations Team | Engineering | 1h |
| Payments | Finance Team | Engineering | 15min |
| Wallet | Finance Team | Engineering | 1h |
| Invoicing | Finance Team | — | 4h |
| Installments | Finance Team | Engineering | 4h |
| Reviews | Community Team | — | 2h |
| Rewards | Growth Team | Engineering | 4h |
| Ambassadors | Growth Team | Marketing | 2h |
| Notifications | Platform Team | — | 1h |
| AI Concierge | AI Team | Engineering | 5min |
| Personalization | AI Team | Data | 4h |
| Users | Platform Team | — | 1h |
| Auth | Security Team | Platform | 15min |
| Roles/Permissions | Security Team | Platform | 2h |

### 8.2 CRUD Matrix

| Entity | Create | Read | Update | Delete |
|---|---|---|---|---|
| User | Self, Admin | Self, Admin | Self, Admin | Admin |
| Destination | Content Admin, Admin | All | Content Admin, Admin | Admin |
| Experience | Partner, Content Admin | All | Partner, Content Admin | Admin |
| Category | Admin | All | Admin | Admin |
| Offer | Marketing, Admin | All | Marketing, Admin | Marketing, Admin |
| Partner | Admin | All | Admin, Self | Admin |
| Booking | User, Partner Support | User, Partner, Admin | User, Partner, Admin | Admin (soft) |
| Payment | System | User, Admin, Finance | Finance (refund) | None |
| Review | User | All | User | User, Admin, Moderation |
| Ambassador | User (apply), Admin (approve) | Admin, Self | Self, Admin | Admin |
| Story | User, Content | All | Owner, Content | Admin |

---

## 9. Domain Relationships

### 9.1 Relationship Map

```
User ──1:N──> Booking ──1:1──> Payment
 │                │
 │                ├──N:1──> Experience ──N:1──> Destination
 │                │
 │                ├──N:1──> Offer
 │                │
 │                └──1:N──> Traveler
 │
 ├──1:1──> Wallet
 │
 ├──1:1──> RewardProfile ──1:N──> Badge
 │
 ├──1:N──> Review ──N:1──> Experience | Destination
 │
 ├──1:1──> Ambassador ──1:N──> Referral
 │
 ├──1:1──> UserPreference ──1:N──> TripPlan
 │
 └──1:N──> Conversation ──1:N──> Message

Partner ──1:N──> Experience ──N:M──> Category
 │                │
 │                └──1:N──> Availability
 │
 └──1:N──> PayoutRecord
```

### 9.2 Key Relationship Rules

| Relationship | Cardinality | Rule |
|---|---|---|
| User → Booking | 1:N | A user can have many bookings. Bookings can exist for guest checkouts (userId nullable). |
| Booking → Experience | N:1 | A booking is for exactly one experience. |
| Experience → Destination | N:1 | An experience belongs to exactly one destination. |
| Booking → Payment | 1:1 | A confirmed booking has exactly one payment. |
| Booking → Offer | N:1 | A booking may optionally apply one offer. |
| User → Wallet | 1:1 | A user has exactly one wallet (auto-created on registration). |
| User → Ambassador | 1:1 | A user can optionally be an ambassador (applies and gets approved). |
| Experience → Partner | N:1 | Each experience belongs to one partner. |
| Experience → Category | N:M | An experience can belong to multiple categories. |
| Review → Target | N:1 | A review targets either an experience or a destination (polymorphic). |
| Ambassador → Referral | 1:N | An ambassador can generate many referrals. |
| Referral → Booking | 1:1 | A referral converts to at most one booking. |

---

## 10. Cross-Domain Communication

### 10.1 Communication Patterns

| Pattern | Where Used | Technology |
|---|---|---|
| **Domain Events** | All async cross-context communication | BullMQ + Redis |
| **Synchronous API** | Identity → All (user data) | gRPC (internal) |
| **BFF API** | Frontend → Backend | REST (Next.js BFF) |
| **CQRS Read Model** | AI reads from catalog/bookings | PostgreSQL read replicas |
| **Saga Pattern** | Booking → Payment → Notification | BullMQ workflow |
| **Outbox Pattern** | Reliable event publishing | PostgreSQL + pg_listen |

### 10.2 Saga: Booking → Payment → Confirmation

```
Step 1: [Booking]  Create Booking (status: draft)
Step 2: [Booking]  Reserve Availability
Step 3: [Booking]  Publish BookingCreated event
Step 4: [Payment]  Authorize Payment
Step 5: [Payment]  Publish PaymentAuthorized event
Step 6: [Booking]  Confirm Booking (status: confirmed)
Step 7: [Booking]  Publish BookingConfirmed event
Step 8: [Booking]  Release Availability (finalize)
Step 9: [Payment]  Capture Payment (async, can be later)
Step 10: [Engagement] Send Confirmation Notification

Compensation (any step fails):
├── Step 2-3 fail: Delete draft booking, no compensation needed
├── Step 4 fail: Cancel booking, notify user
├── Step 5-6 fail: Void authorization, cancel booking
└── Step 7-8 fail: Manual reconciliation required, alert operations team
```

### 10.3 Event Flow Diagram: Booking Lifecycle

```
User                     Booking                Payment            Engagement/AI
 │                         │                      │                    │
 │── Book Experience ──>   │                      │                    │
 │                         │── BookingCreated ──> │                    │
 │                         │                      │── Authorize ──>    │
 │                         │<── PaymentAuthorized─│                    │
 │                         │── Confirm            │                    │
 │                         │                      │── Capture ──>      │
 │                         │── BookingConfirmed ─────────────────────> │
 │                         │                      │                    │── Send Email
 │                         │                      │                    │── Award Points
 │                         │                      │                    │── Update AI Context
 │<── Confirmation ───────│                      │                    │
```

### 10.4 Read Model Strategy

| Read Model | Source | Updated By | Refresh | Purpose |
|---|---|---|---|---|
| `experience_search` | Catalog + Reviews | Event (ReviewCreated) | Near-real-time | Search + listing + rating |
| `destination_detail` | Catalog + Reviews + Experiences | Event | Near-real-time | Destination page |
| `booking_history` | Booking + Payment | Event | Near-real-time | User booking list |
| `partner_dashboard` | Catalog + Booking + Payment | Event (batch) | 5-minute | Partner KPIs |
| `ai_catalog_cache` | Catalog | Event | Near-real-time | AI recommendations |
| `ambassador_analytics` | Engagement + Booking | Event (batch) | 15-minute | Ambassador dashboard |

### 10.5 Consistency Guarantees

| Operation | Consistency Model | Rationale |
|---|---|---|
| Booking creation | Strong (within aggregate) | Must not overbook |
| Payment processing | Strong | Financial integrity |
| Catalog updates | Eventual | Search indexing delay acceptable |
| Review counts | Eventual | Acceptable delay in rating updates |
| Point balances | Strong (within aggregate) | Must prevent double-spend |
| User profile | Strong | Profile must be immediately consistent |
| Recommendations | Eventual | Stale data acceptable |

---

*End of Domain Architecture — Version 1.0*
