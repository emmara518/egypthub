# EgyptHub — Database Architecture

> **Version:** 1.0
> **Database:** PostgreSQL 16
> **Extensions:** postgis, pgcrypto, pg_stat_statements, timescaledb (analytics), pg_partman
> **Status:** Approved
> **Date:** June 2026

---

## Table of Contents

1. [Schema Design](#1-schema-design)
2. [Table Definitions](#2-table-definitions)
3. [Relationships](#3-relationships)
4. [Indexes](#4-indexes)
5. [Partitioning](#5-partitioning)
6. [Audit Tables](#6-audit-tables)
7. [Soft Deletes](#7-soft-deletes)
8. [Caching Strategy](#8-caching-strategy)
9. [Read Models](#9-read-models)
10. [Write Models](#10-write-models)
11. [Multi-tenant Strategy](#11-multi-tenant-strategy)
12. [Data Retention](#12-data-retention)
13. [Backup Strategy](#13-backup-strategy)

---

## 1. Schema Design

### 1.1 Schema List

| Schema | Purpose | Access |
|---|---|---|
| `catalog` | Destinations, experiences, categories, offers, partners, stories | All services |
| `booking` | Reservations, availability, travelers | Booking service |
| `payment` | Transactions, wallets, invoices, installments | Payment service |
| `engagement` | Reviews, ambassadors, rewards, notifications | Engagement service |
| `ai` | Conversations, trip plans, user preferences | AI service |
| `identity` | Users, sessions, roles, permissions | Identity service |
| `audit` | Audit logs for all schemas | Audit service only |
| `analytics` | Aggregated metrics and event logs | Analytics service |
| `event_store` | Domain event outbox and inbox | All services |
| `read_models` | Denormalized read projections | Read services |

### 1.2 Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Tables | `snake_case`, plural | `experiences`, `booking_schedule` |
| Columns | `snake_case` | `original_price`, `max_guests` |
| Primary keys | `{entity}_id` (UUID) | `experience_id` |
| Foreign keys | `{referenced_table}_id` | `destination_id` |
| Indexes | `idx_{table}_{column(s)}` | `idx_experiences_destination_status` |
| Unique constraints | `uq_{table}_{column(s)}` | `uq_users_email` |
| Audit triggers | `trg_{table}_audit` | `trg_experiences_audit` |
| Enum types | `{name}_type` | `booking_status_type`, `content_status_type` |

---

## 2. Table Definitions

### 2.1 `identity` Schema

#### users
```sql
CREATE TABLE identity.users (
    user_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email            TEXT NOT NULL,
    phone            TEXT,
    password_hash    TEXT NOT NULL,
    password_algo    TEXT NOT NULL DEFAULT 'argon2id',
    profile_json     JSONB NOT NULL DEFAULT '{}',
    roles            TEXT[] NOT NULL DEFAULT '{traveler}',
    status           TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active','suspended','deleted')),
    email_verified   BOOLEAN NOT NULL DEFAULT false,
    phone_verified   BOOLEAN NOT NULL DEFAULT false,
    mfa_enabled      BOOLEAN NOT NULL DEFAULT false,
    mfa_secret       TEXT,
    last_login_at    TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_users_email ON identity.users(LOWER(email)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_users_phone ON identity.users(phone) WHERE phone IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX idx_users_status ON identity.users(status);
```

#### sessions
```sql
CREATE TABLE identity.sessions (
    session_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    refresh_token    TEXT NOT NULL,
    device_info      JSONB NOT NULL DEFAULT '{}',
    ip_address       INET NOT NULL,
    expires_at       TIMESTAMPTZ NOT NULL,
    revoked_at       TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_sessions_user ON identity.sessions(user_id);
CREATE INDEX idx_sessions_expires ON identity.sessions(expires_at) WHERE revoked_at IS NULL;
```

### 2.2 `catalog` Schema

#### destinations
```sql
CREATE TABLE catalog.destinations (
    destination_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    slug             TEXT NOT NULL,
    description_ar   TEXT NOT NULL DEFAULT '',
    description_en   TEXT NOT NULL DEFAULT '',
    media_json       JSONB NOT NULL DEFAULT '{}',
    location         GEOGRAPHY(POINT, 4326) NOT NULL,
    stats_json       JSONB NOT NULL DEFAULT '{"experience_count":0,"review_count":0,"average_rating":0}',
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','pending','published','archived')),
    meta_json        JSONB NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_destinations_slug ON catalog.destinations(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_destinations_status ON catalog.destinations(status);
CREATE INDEX idx_destinations_location ON catalog.destinations USING GIST(location);
CREATE INDEX idx_destinations_search ON catalog.destinations
    USING GIN(to_tsvector('arabic', name_ar || ' ' || description_ar));
```

#### categories
```sql
CREATE TABLE catalog.categories (
    category_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    slug             TEXT NOT NULL,
    icon             TEXT NOT NULL DEFAULT '',
    display_order    INT NOT NULL DEFAULT 0,
    parent_id        UUID REFERENCES catalog.categories(category_id),
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','archived')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_categories_slug ON catalog.categories(slug);
```

#### experiences
```sql
CREATE TABLE catalog.experiences (
    experience_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id   UUID NOT NULL REFERENCES catalog.destinations(destination_id),
    partner_id       UUID NOT NULL REFERENCES catalog.partners(partner_id),
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    slug             TEXT NOT NULL,
    description_ar   TEXT NOT NULL DEFAULT '',
    description_en   TEXT NOT NULL DEFAULT '',
    media_json       JSONB NOT NULL DEFAULT '{}',
    pricing_json     JSONB NOT NULL DEFAULT '{}',
    scheduling_json  JSONB NOT NULL DEFAULT '{}',
    capacity_json    JSONB NOT NULL DEFAULT '{}',
    itinerary_json   JSONB DEFAULT '[]',
    inclusions       TEXT[] NOT NULL DEFAULT '{}',
    exclusions       TEXT[] NOT NULL DEFAULT '{}',
    requirements     TEXT[] NOT NULL DEFAULT '{}',
    languages        TEXT[] NOT NULL DEFAULT '{ar,en}',
    location         GEOGRAPHY(POINT, 4326),
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','pending','published','archived')),
    rating_json      JSONB NOT NULL DEFAULT '{"average":0,"count":0}',
    meta_json        JSONB NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_experiences_slug ON catalog.experiences(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_experiences_destination ON catalog.experiences(destination_id);
CREATE INDEX idx_experiences_partner ON catalog.experiences(partner_id);
CREATE INDEX idx_experiences_status ON catalog.experiences(status);
CREATE INDEX idx_experiences_destination_status ON catalog.experiences(destination_id, status);
CREATE INDEX idx_experiences_search ON catalog.experiences
    USING GIN(to_tsvector('arabic', name_ar || ' ' || description_ar));
```

#### experience_categories (junction)
```sql
CREATE TABLE catalog.experience_categories (
    experience_id    UUID NOT NULL REFERENCES catalog.experiences(experience_id),
    category_id      UUID NOT NULL REFERENCES catalog.categories(category_id),
    PRIMARY KEY (experience_id, category_id)
);
CREATE INDEX idx_expcat_category ON catalog.experience_categories(category_id);
```

#### offers
```sql
CREATE TABLE catalog.offers (
    offer_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    offer_type       TEXT NOT NULL CHECK (offer_type IN ('percentage','fixed','bundle')),
    value_amount     NUMERIC(10,2) NOT NULL,
    value_currency   TEXT NOT NULL DEFAULT 'EGP',
    conditions_json  JSONB NOT NULL DEFAULT '{}',
    validity_start   TIMESTAMPTZ NOT NULL,
    validity_end     TIMESTAMPTZ NOT NULL,
    usage_max        INT NOT NULL DEFAULT 0,
    usage_current    INT NOT NULL DEFAULT 0,
    per_user_limit   INT NOT NULL DEFAULT 1,
    target_type      TEXT NOT NULL CHECK (target_type IN ('destination','experience','category','all')),
    target_ids       UUID[] NOT NULL DEFAULT '{}',
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','expired')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE INDEX idx_offers_validity ON catalog.offers(validity_start, validity_end);
CREATE INDEX idx_offers_status ON catalog.offers(status);
```

#### partners
```sql
CREATE TABLE catalog.partners (
    partner_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID REFERENCES identity.users(user_id),
    name             TEXT NOT NULL,
    slug             TEXT NOT NULL,
    description_ar   TEXT NOT NULL DEFAULT '',
    description_en   TEXT NOT NULL DEFAULT '',
    logo_url         TEXT,
    contact_json     JSONB NOT NULL DEFAULT '{}',
    location         GEOGRAPHY(POINT, 4326),
    verification     TEXT NOT NULL DEFAULT 'pending'
                         CHECK (verification IN ('pending','verified','suspended')),
    commission_rate  NUMERIC(4,2) NOT NULL DEFAULT 0.15,
    payout_json      JSONB NOT NULL DEFAULT '{}',
    metrics_json     JSONB NOT NULL DEFAULT '{}',
    status           TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','active','suspended')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_partners_slug ON catalog.partners(slug) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_partners_user ON catalog.partners(user_id) WHERE user_id IS NOT NULL AND deleted_at IS NULL;
```

#### stories
```sql
CREATE TABLE catalog.stories (
    story_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id        UUID REFERENCES identity.users(user_id),
    destination_id   UUID REFERENCES catalog.destinations(destination_id),
    experience_id    UUID REFERENCES catalog.experiences(experience_id),
    story_type       TEXT NOT NULL CHECK (story_type IN ('review','blog','guide','video')),
    title_ar         TEXT NOT NULL,
    title_en         TEXT NOT NULL,
    content_ar       TEXT NOT NULL DEFAULT '',
    content_en       TEXT NOT NULL DEFAULT '',
    media_json       JSONB NOT NULL DEFAULT '{}',
    tags             TEXT[] NOT NULL DEFAULT '{}',
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','pending','published','archived')),
    moderation       TEXT NOT NULL DEFAULT 'pending'
                         CHECK (moderation IN ('pending','approved','rejected','flagged')),
    meta_json        JSONB NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE INDEX idx_stories_author ON catalog.stories(author_id);
CREATE INDEX idx_stories_destination ON catalog.stories(destination_id);
CREATE INDEX idx_stories_status ON catalog.stories(status, moderation);
```

### 2.3 `booking` Schema

#### bookings
```sql
CREATE TABLE booking.bookings (
    booking_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number   TEXT NOT NULL,
    user_id          UUID REFERENCES identity.users(user_id),
    experience_id    UUID NOT NULL REFERENCES catalog.experiences(experience_id),
    offer_id         UUID REFERENCES catalog.offers(offer_id),
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','pending','confirmed','cancelled','completed','refunded')),
    schedule_json    JSONB NOT NULL,
    travelers_json   JSONB NOT NULL,
    pricing_json     JSONB NOT NULL,
    payment_id       UUID,
    cancellation_json JSONB,
    notes            TEXT DEFAULT '',
    timeline_json    JSONB NOT NULL DEFAULT '[]',
    metadata_json    JSONB NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_bookings_number ON booking.bookings(booking_number);
CREATE INDEX idx_bookings_user ON booking.bookings(user_id);
CREATE INDEX idx_bookings_experience ON booking.bookings(experience_id);
CREATE INDEX idx_bookings_status ON booking.bookings(status);
CREATE INDEX idx_bookings_user_status ON booking.bookings(user_id, status);
CREATE INDEX idx_bookings_created ON booking.bookings(created_at DESC);
```

#### availability
```sql
CREATE TABLE booking.availability (
    availability_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experience_id    UUID NOT NULL REFERENCES catalog.experiences(experience_id),
    date             DATE NOT NULL,
    is_available     BOOLEAN NOT NULL DEFAULT true,
    capacity_override INT,
    pricing_override_json JSONB,
    version          INT NOT NULL DEFAULT 1,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_availability_experience_date
    ON booking.availability(experience_id, date);
CREATE INDEX idx_availability_date_range
    ON booking.availability(experience_id, date) WHERE is_available = true;
```

#### availability_slots
```sql
CREATE TABLE booking.availability_slots (
    slot_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    availability_id  UUID NOT NULL REFERENCES booking.availability(availability_id),
    start_time       TIME NOT NULL,
    end_time         TIME NOT NULL,
    capacity         INT NOT NULL DEFAULT 10,
    booked           INT NOT NULL DEFAULT 0,
    pricing_override_json JSONB,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_slots_availability ON booking.availability_slots(availability_id);
```

#### travelers
```sql
CREATE TABLE booking.travelers (
    traveler_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id       UUID NOT NULL REFERENCES booking.bookings(booking_id),
    first_name       TEXT NOT NULL,
    last_name        TEXT NOT NULL,
    email            TEXT,
    phone            TEXT,
    passport_number  TEXT,
    nationality      TEXT,
    date_of_birth    DATE,
    traveler_type    TEXT NOT NULL DEFAULT 'adult' CHECK (traveler_type IN ('adult','child','infant')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_travelers_booking ON booking.travelers(booking_id);
```

### 2.4 `payment` Schema

#### payments
```sql
CREATE TABLE payment.payments (
    payment_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id       UUID NOT NULL,
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    amount           NUMERIC(10,2) NOT NULL,
    currency         TEXT NOT NULL DEFAULT 'EGP',
    method           TEXT NOT NULL CHECK (method IN ('card','wallet','installment','stcpay','applepay')),
    status           TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','authorized','captured','failed','refunded','partially_refunded')),
    gateway_id       TEXT,
    gateway_txn_id   TEXT,
    gateway_response JSONB,
    metadata_json    JSONB NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_payments_booking ON payment.payments(booking_id);
CREATE INDEX idx_payments_user ON payment.payments(user_id);
CREATE INDEX idx_payments_status ON payment.payments(status);
CREATE INDEX idx_payments_gateway ON payment.payments(gateway_txn_id);
CREATE UNIQUE INDEX uq_payments_booking ON payment.payments(booking_id);
```

#### refunds
```sql
CREATE TABLE payment.refunds (
    refund_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id       UUID NOT NULL REFERENCES payment.payments(payment_id),
    amount           NUMERIC(10,2) NOT NULL,
    reason           TEXT NOT NULL,
    status           TEXT NOT NULL DEFAULT 'initiated'
                         CHECK (status IN ('initiated','processing','completed','failed')),
    gateway_refund_id TEXT,
    processed_at     TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_refunds_payment ON payment.refunds(payment_id);
```

#### wallets
```sql
CREATE TABLE payment.wallets (
    wallet_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    balance          NUMERIC(10,2) NOT NULL DEFAULT 0,
    currency         TEXT NOT NULL DEFAULT 'EGP',
    status           TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active','frozen','closed')),
    version          INT NOT NULL DEFAULT 1,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_wallets_user ON payment.wallets(user_id);
```

#### wallet_ledger
```sql
CREATE TABLE payment.wallet_ledger (
    ledger_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id        UUID NOT NULL REFERENCES payment.wallets(wallet_id),
    amount           NUMERIC(10,2) NOT NULL,
    balance_before   NUMERIC(10,2) NOT NULL,
    balance_after    NUMERIC(10,2) NOT NULL,
    direction        TEXT NOT NULL CHECK (direction IN ('credit','debit')),
    reason           TEXT NOT NULL,
    reference_type   TEXT,
    reference_id     UUID,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ledger_wallet ON payment.wallet_ledger(wallet_id);
CREATE INDEX idx_ledger_created ON payment.wallet_ledger(wallet_id, created_at DESC);
```

#### invoices
```sql
CREATE TABLE payment.invoices (
    invoice_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id       UUID NOT NULL,
    invoice_number   TEXT NOT NULL,
    issuer_json      JSONB NOT NULL,
    recipient_json   JSONB NOT NULL,
    line_items_json  JSONB NOT NULL DEFAULT '[]',
    tax_json         JSONB NOT NULL DEFAULT '[]',
    subtotal         NUMERIC(10,2) NOT NULL,
    tax_total        NUMERIC(10,2) NOT NULL DEFAULT 0,
    total            NUMERIC(10,2) NOT NULL,
    currency         TEXT NOT NULL DEFAULT 'EGP',
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','issued','paid','cancelled','credit_note')),
    issued_at        TIMESTAMPTZ,
    paid_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_invoices_number ON payment.invoices(invoice_number);
CREATE INDEX idx_invoices_booking ON payment.invoices(booking_id);
```

#### installment_plans
```sql
CREATE TABLE payment.installment_plans (
    plan_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id       UUID NOT NULL REFERENCES payment.payments(payment_id),
    total_amount     NUMERIC(10,2) NOT NULL,
    months           INT NOT NULL,
    monthly_amount   NUMERIC(10,2) NOT NULL,
    interest_rate    NUMERIC(4,2) NOT NULL DEFAULT 0,
    status           TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active','completed','defaulted')),
    schedule_json    JSONB NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_installments_payment ON payment.installment_plans(payment_id);
```

### 2.5 `engagement` Schema

#### reviews
```sql
CREATE TABLE engagement.reviews (
    review_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    target_id        UUID NOT NULL,
    target_type      TEXT NOT NULL CHECK (target_type IN ('experience','destination','partner')),
    rating           INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content_ar       TEXT NOT NULL DEFAULT '',
    content_en       TEXT NOT NULL DEFAULT '',
    media_json       JSONB NOT NULL DEFAULT '{}',
    verified         BOOLEAN NOT NULL DEFAULT false,
    helpful_count    INT NOT NULL DEFAULT 0,
    helpful_user_ids UUID[] NOT NULL DEFAULT '{}',
    moderation       TEXT NOT NULL DEFAULT 'pending'
                         CHECK (moderation IN ('pending','approved','rejected','flagged')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at       TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_reviews_user_target ON engagement.reviews(user_id, target_id, target_type)
    WHERE deleted_at IS NULL;
CREATE INDEX idx_reviews_target ON engagement.reviews(target_id, target_type, moderation)
    WHERE moderation = 'approved';
CREATE INDEX idx_reviews_user ON engagement.reviews(user_id);
```

#### ambassadors
```sql
CREATE TABLE engagement.ambassadors (
    ambassador_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    referral_code    TEXT NOT NULL,
    tier             TEXT NOT NULL DEFAULT 'bronze'
                         CHECK (tier IN ('bronze','silver','gold','platinum')),
    commission_json  JSONB NOT NULL DEFAULT '{}',
    earnings_json    JSONB NOT NULL DEFAULT '{"total":0,"pending":0,"paid":0}',
    status           TEXT NOT NULL DEFAULT 'applied'
                         CHECK (status IN ('applied','approved','active','suspended')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_ambassadors_user ON engagement.ambassadors(user_id);
CREATE UNIQUE INDEX uq_ambassadors_code ON engagement.ambassadors(referral_code);
```

#### referrals
```sql
CREATE TABLE engagement.referrals (
    referral_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ambassador_id    UUID NOT NULL REFERENCES engagement.ambassadors(ambassador_id),
    referral_code    TEXT NOT NULL,
    referred_email   TEXT,
    referred_phone   TEXT,
    booking_id       UUID,
    status           TEXT NOT NULL DEFAULT 'clicked'
                         CHECK (status IN ('clicked','booked','completed','expired')),
    commission_earned NUMERIC(10,2) DEFAULT 0,
    clicked_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    booked_at        TIMESTAMPTZ,
    completed_at     TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_referrals_ambassador ON engagement.referrals(ambassador_id);
CREATE INDEX idx_referrals_booking ON engagement.referrals(booking_id) WHERE booking_id IS NOT NULL;
CREATE INDEX idx_referrals_code ON engagement.referrals(referral_code);
```

#### reward_profiles
```sql
CREATE TABLE engagement.reward_profiles (
    profile_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    points           INT NOT NULL DEFAULT 0 CHECK (points >= 0),
    lifetime_points  INT NOT NULL DEFAULT 0 CHECK (lifetime_points >= 0),
    tier             TEXT NOT NULL DEFAULT 'bronze'
                         CHECK (tier IN ('bronze','silver','gold','platinum')),
    badges_json     JSONB NOT NULL DEFAULT '[]',
    version          INT NOT NULL DEFAULT 1,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_reward_profiles_user ON engagement.reward_profiles(user_id);
```

#### point_history
```sql
CREATE TABLE engagement.point_history (
    point_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id       UUID NOT NULL REFERENCES engagement.reward_profiles(profile_id),
    points           INT NOT NULL,
    balance_before   INT NOT NULL,
    balance_after    INT NOT NULL,
    direction        TEXT NOT NULL CHECK (direction IN ('earned','redeemed','expired')),
    reason           TEXT NOT NULL,
    reference_type   TEXT,
    reference_id     UUID,
    expires_at       TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_points_profile ON engagement.point_history(profile_id);
CREATE INDEX idx_points_expiry ON engagement.point_history(expires_at)
    WHERE direction = 'earned' AND expires_at IS NOT NULL;
```

#### notifications
```sql
CREATE TABLE engagement.notifications (
    notification_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    type             TEXT NOT NULL,
    title_ar         TEXT NOT NULL,
    title_en         TEXT NOT NULL,
    body_ar          TEXT NOT NULL DEFAULT '',
    body_en          TEXT NOT NULL DEFAULT '',
    data_json        JSONB NOT NULL DEFAULT '{}',
    channel          TEXT NOT NULL CHECK (channel IN ('in_app','push','email','sms')),
    status           TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','sent','delivered','read','failed')),
    read_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON engagement.notifications(user_id, status, created_at DESC);
CREATE INDEX idx_notifications_pending ON engagement.notifications(status, created_at)
    WHERE status = 'pending';
```

### 2.6 `ai` Schema

#### conversations
```sql
CREATE TABLE ai.conversations (
    conversation_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    title            TEXT NOT NULL DEFAULT '',
    context_json     JSONB NOT NULL DEFAULT '{}',
    message_count    INT NOT NULL DEFAULT 0,
    status           TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active','archived')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_conversations_user ON ai.conversations(user_id, updated_at DESC);
```

#### messages
```sql
CREATE TABLE ai.messages (
    message_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id  UUID NOT NULL REFERENCES ai.conversations(conversation_id),
    role             TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
    content          TEXT NOT NULL,
    metadata_json    JSONB NOT NULL DEFAULT '{}',
    tokens_in        INT,
    tokens_out       INT,
    processing_ms    INT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_conversation ON ai.messages(conversation_id, created_at);
```

#### trip_plans
```sql
CREATE TABLE ai.trip_plans (
    trip_plan_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    name             TEXT NOT NULL DEFAULT '',
    destination      TEXT NOT NULL,
    budget_min       NUMERIC(10,2),
    budget_max       NUMERIC(10,2),
    start_date       DATE,
    end_date         DATE,
    companions_json  JSONB NOT NULL DEFAULT '{}',
    preferences_json JSONB NOT NULL DEFAULT '{}',
    days_json        JSONB NOT NULL DEFAULT '[]',
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','saved','booked','archived')),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_trip_plans_user ON ai.trip_plans(user_id, status);
```

#### user_preferences
```sql
CREATE TABLE ai.user_preferences (
    preference_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES identity.users(user_id),
    interests        TEXT[] NOT NULL DEFAULT '{}',
    budget_min       NUMERIC(10,2),
    budget_max       NUMERIC(10,2),
    travel_styles    TEXT[] NOT NULL DEFAULT '{}',
    languages        TEXT[] NOT NULL DEFAULT '{}',
    dietary          TEXT[] NOT NULL DEFAULT '{}',
    accessibility    TEXT[] NOT NULL DEFAULT '{}',
    past_destinations TEXT[] NOT NULL DEFAULT '{}',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_user_preferences ON ai.user_preferences(user_id);
```

### 2.7 `event_store` Schema

#### outbox
```sql
CREATE TABLE event_store.outbox (
    event_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type   TEXT NOT NULL,
    aggregate_id     UUID NOT NULL,
    event_type       TEXT NOT NULL,
    payload          JSONB NOT NULL,
    metadata_json    JSONB NOT NULL DEFAULT '{}',
    status           TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','published','failed')),
    retry_count      INT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at     TIMESTAMPTZ
);
CREATE INDEX idx_outbox_status ON event_store.outbox(status, created_at) WHERE status = 'pending';
```

#### inbox
```sql
CREATE TABLE event_store.inbox (
    inbox_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id         UUID NOT NULL,
    source_service   TEXT NOT NULL,
    event_type       TEXT NOT NULL,
    payload          JSONB NOT NULL,
    status           TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','processed','failed')),
    error_message    TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at     TIMESTAMPTZ
);
CREATE UNIQUE INDEX uq_inbox_event ON event_store.inbox(event_id, source_service);
CREATE INDEX idx_inbox_status ON event_store.inbox(status, created_at) WHERE status = 'pending';
```

---

## 3. Relationships

### 3.1 Foreign Key Summary

```sql
-- All foreign keys defined inline above.
-- Additional cross-schema references:

-- Booking -> Payment (soft reference via booking.payment_id)
-- Payment -> Booking (soft reference via payment.booking_id)
-- Review -> Target (polymorphic, no FK — application-enforced)
-- Notification -> User (FK to identity.users)
-- Referral -> Booking (soft reference via referral.booking_id)
```

### 3.2 Relationship Enforcement

| Cross-Schema Reference | Mechanism | Notes |
|---|---|---|
| booking → payment | Application-level | Booking.payment_id validated at service layer |
| payment → booking | Application-level | Payment.booking_id validated at service layer |
| reviews → targets | Application-level + trigger | Review target existence validated before insert |
| referrals → bookings | Application-level | Referral.booking_id set after booking confirmed |
| event_store → all | Outbox pattern | Logical references only |

---

## 4. Indexes

### 4.1 Performance Indexes (Non-Unique)

| Index Name | Table | Columns | Type | Rationale |
|---|---|---|---|---|
| `idx_bookings_user_status` | bookings | user_id, status | B-tree | User booking history filtered by status |
| `idx_bookings_created_desc` | bookings | created_at DESC | B-tree | Recent bookings queries |
| `idx_experiences_dest_status` | experiences | destination_id, status | B-tree | Destination page experience list |
| `idx_availability_date_range` | availability | experience_id, date | B-tree (partial) | Availability queries for date range |
| `idx_reviews_target_approved` | reviews | target_id, target_type | B-tree (partial) | Approved review display |
| `idx_notifications_pending` | notifications | status, created_at | B-tree (partial) | Notification dispatch worker |
| `idx_outbox_pending` | outbox | status, created_at | B-tree (partial) | Event publisher worker |
| `idx_inbox_pending` | inbox | status, created_at | B-tree (partial) | Event consumer worker |
| `idx_points_expiry` | point_history | expires_at | B-tree (partial) | Point expiry cron job |
| `idx_sessions_active` | sessions | expires_at | B-tree (partial) | Session cleanup job |

### 4.2 Full-Text Search Indexes

| Index | Table | Language | Columns |
|---|---|---|---|
| `idx_destinations_search` | destinations | arabic | name_ar, description_ar |
| `idx_experiences_search` | experiences | arabic | name_ar, description_ar |
| `idx_destinations_search_en` | destinations | english | name_en, description_en |
| `idx_experiences_search_en` | experiences | english | name_en, description_en |

### 4.3 Geospatial Indexes

| Index | Table | Type | Column |
|---|---|---|---|
| `idx_destinations_location` | destinations | GIST | location |
| `idx_experiences_location` | experiences | GIST | location |
| `idx_partners_location` | partners | GIST | location |

### 4.4 Composite Index Design Principles

1. **Leading column = most selective**: e.g., `(user_id, status)` not `(status, user_id)`
2. **Covering indexes for hot queries**: e.g., booking list queries that join travelers
3. **Partial indexes for filtered queries**: e.g., `WHERE status = 'pending'` indexes
4. **Descending order for recent records**: e.g., `created_at DESC`
5. **Avoid over-indexing write-heavy tables**: e.g., wallet_ledger has 2 indexes only

---

## 5. Partitioning

### 5.1 Partitioned Tables

| Table | Strategy | Partition Key | Partitions | Retention |
|---|---|---|---|---|
| `booking.bookings` | LIST | status | 8 partitions (draft, pending, confirmed, cancelled, completed, refunded) | All |
| `payment.wallet_ledger` | RANGE | created_at | Monthly | 12 months hot, then compressed |
| `engagement.point_history` | RANGE | created_at | Monthly | 24 months hot, then compressed |
| `engagement.notifications` | RANGE | created_at | Daily | 7 days hot, 90 days warm |
| `ai.messages` | RANGE | created_at | Monthly | 6 months hot, then archived |
| `event_store.outbox` | RANGE | created_at | Daily | 7 days |
| `event_store.inbox` | RANGE | created_at | Daily | 7 days |

### 5.2 Partition Management

```sql
-- Example: Monthly partitioning for wallet_ledger
CREATE TABLE payment.wallet_ledger_y2026m06
    PARTITION OF payment.wallet_ledger
    FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');

-- Auto-management via pg_partman
SELECT partman.create_parent(
    p_parent_table := 'payment.wallet_ledger',
    p_control := 'created_at',
    p_type := 'native',
    p_interval := '1 month',
    p_premake := 3
);
```

---

## 6. Audit Tables

### 6.1 Audit Schema Structure

Each audited table has a corresponding `{table}_audit` table in the `audit` schema:

| Audit Table | Source Table | Row Estimate |
|---|---|---|
| `audit.users_audit` | identity.users | All user mutations |
| `audit.experiences_audit` | catalog.experiences | All content changes |
| `audit.bookings_audit` | booking.bookings | Status transitions + data changes |
| `audit.payments_audit` | payment.payments | Financial mutation history |
| `audit.wallets_audit` | payment.wallets | Balance change history |
| `audit.offers_audit` | catalog.offers | Offer lifecycle |

### 6.2 Audit Table Template

```sql
CREATE TABLE audit.bookings_audit (
    audit_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name       TEXT NOT NULL,
    record_id        UUID NOT NULL,
    operation        TEXT NOT NULL CHECK (operation IN ('INSERT','UPDATE','DELETE')),
    old_data         JSONB,
    new_data         JSONB,
    changed_fields   TEXT[],
    changed_by       UUID,
    change_reason    TEXT,
    ip_address       INET,
    user_agent       TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_record ON audit.bookings_audit(table_name, record_id);
CREATE INDEX idx_audit_time ON audit.bookings_audit(created_at DESC);
```

### 6.3 Audit Implementation

```sql
-- Trigger function (applied to each audited table)
CREATE OR REPLACE FUNCTION audit.trigger_audit()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit.bookings_audit (
        table_name, record_id, operation,
        old_data, new_data, changed_by, ip_address
    ) VALUES (
        TG_TABLE_NAME,
        COALESCE(NEW.booking_id, OLD.booking_id),
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN row_to_json(OLD)::jsonb ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END,
        current_setting('app.current_user_id')::UUID,
        current_setting('app.client_ip')::INET
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 6.4 Audit Retention

| Audit Table | Retention | Action |
|---|---|---|
| bookings_audit | 7 years | Archive to cold storage after 7 years |
| payments_audit | 10 years (legal requirement) | Archive after 10 years |
| wallets_audit | 7 years | Archive after 7 years |
| users_audit | 5 years after account deletion | Purge after 5 years |
| content_audit | 3 years | Purge after 3 years |

---

## 7. Soft Deletes

### 7.1 Soft Delete Policy

| Entity | Delete Type | Column | Cascade |
|---|---|---|---|
| users | Soft | `deleted_at` TIMMESTAMPTZ | Cascade to sessions, notifications |
| destinations | Soft | `deleted_at` | Block if active experiences exist |
| experiences | Soft | `deleted_at` | Block if future bookings exist |
| partners | Soft | `deleted_at` | Block if active experiences exist |
| offers | Soft | `deleted_at` | Block if active redemptions exist |
| stories | Soft | `deleted_at` | None |
| reviews | Soft | `deleted_at` | None |
| bookings | Soft | `deleted_at` | None (audit trail preserved) |

### 7.2 Hard Delete Entities

| Entity | Rationale |
|---|---|
| sessions | Revoked on logout, no audit value |
| outbox | Purged after 7 days |
| inbox | Purged after 7 days |
| wallet_ledger | Immutable, never deleted |
| point_history | Immutable, never deleted |
| notifications | Purged after 90 days (user-facing older records archived) |
| audit logs | Retained per schedule above, never deleted individually |

### 7.3 Soft Delete Query Pattern

```sql
-- All user-facing queries include deleted_at IS NULL
CREATE OR REPLACE VIEW catalog.active_experiences AS
SELECT * FROM catalog.experiences
WHERE deleted_at IS NULL AND status = 'published';
```

---

## 8. Caching Strategy

### 8.1 Cache Layers

| Layer | Technology | Purpose | TTL |
|---|---|---|---|
| L1 — App Memory | In-process LRU | Hot data (categories, settings) | 5 minutes |
| L2 — Redis Cluster | Redis 7 | Session data, rate limits, API responses, search results | Variable |
| L3 — CDN | CloudFront/CDN | Static assets, images, compiled CSS/JS | 1 hour |
| L4 — Database | PostgreSQL | Materialized views for read models | Variable |

### 8.2 Redis Cache Namespaces

| Namespace | Content | TTL | Invalidation |
|---|---|---|---|
| `session:{token}` | User session data | 15 min (sliding) | On logout/revoke |
| `rate_limit:{ip}:{endpoint}` | Rate limit counters | 1 min — 1 hour | Auto-expire |
| `catalog:destination:{id}` | Destination detail | 10 min | On destination update event |
| `catalog:experience:{id}` | Experience detail | 10 min | On experience update event |
| `catalog:search:{query}` | Search results | 5 min | On catalog update event |
| `booking:availability:{exp_id}:{date}` | Availability data | 30 sec (short TTL) | On booking creation |
| `booking:pricing:{exp_id}:{params}` | Calculated price | 5 min | On pricing/offer change |
| `analytics:dashboard:{partner_id}` | Partner dashboard metrics | 5 min | On booking/review event |
| `ai:recommendations:{user_id}` | Personal recommendations | 30 min | On profile/behavior change |
| `content:static:{path}` | Static rendered content | 1 hour | Manual purge |

### 8.3 Cache-Aside Pattern

```
GET experience/{id}:
  1. Check Redis: experience:{id}
  2. Cache hit → return
  3. Cache miss → query PostgreSQL
  4. Store in Redis with TTL
  5. Return

WRITE experience/{id}:
  1. Update PostgreSQL
  2. Publish ExperienceUpdated event
  3. Event consumer invalidates:
     - catalog:experience:{id}
     - catalog:search:* (eventual)
```

### 8.4 Cache Invalidation Events

| Event | Invalidates |
|---|---|
| DestinationPublished | catalog:destination:{id}, catalog:search:* |
| ExperiencePublished | catalog:experience:{id}, catalog:destination:{destination_id}, catalog:search:* |
| OfferActivated/Expired | booking:pricing:* |
| BookingCreated | booking:availability:{exp_id}:* |
| BookingConfirmed | booking:pricing:{exp_id}:* |
| ReviewCreated | catalog:experience:{id} (rating change) |

---

## 9. Read Models

### 9.1 Read Model Schema (`read_models`)

#### destination_detail (denormalized for destination page)
```sql
CREATE TABLE read_models.destination_detail (
    destination_id   UUID PRIMARY KEY,
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    slug             TEXT NOT NULL,
    description_ar   TEXT NOT NULL,
    description_en   TEXT NOT NULL,
    media_json       JSONB NOT NULL,
    location_json    JSONB NOT NULL,
    stats_json       JSONB NOT NULL,
    categories       JSONB NOT NULL DEFAULT '[]',
    top_experiences  JSONB NOT NULL DEFAULT '[]',
    review_summary   JSONB NOT NULL DEFAULT '{"average":0,"count":0,"distribution":{}}',
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### experience_search (search + listing)
```sql
CREATE TABLE read_models.experience_search (
    experience_id    UUID PRIMARY KEY,
    destination_id   UUID NOT NULL,
    destination_name_ar TEXT NOT NULL,
    destination_name_en TEXT NOT NULL,
    name_ar          TEXT NOT NULL,
    name_en          TEXT NOT NULL,
    slug             TEXT NOT NULL,
    price_min        NUMERIC(10,2),
    price_max        NUMERIC(10,2),
    currency         TEXT NOT NULL DEFAULT 'EGP',
    duration         INT,
    duration_unit    TEXT,
    rating           NUMERIC(2,1) DEFAULT 0,
    review_count     INT DEFAULT 0,
    categories       TEXT[] NOT NULL DEFAULT '{}',
    languages        TEXT[] NOT NULL DEFAULT '{}',
    media_thumbnail  TEXT,
    partner_name     TEXT,
    partner_slug     TEXT,
    status           TEXT NOT NULL,
    is_available     BOOLEAN NOT NULL DEFAULT true,
    has_offer        BOOLEAN NOT NULL DEFAULT false,
    search_vector_ar TSVECTOR,
    search_vector_en TSVECTOR,
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_experience_search_vec_ar ON read_models.experience_search USING GIN(search_vector_ar);
CREATE INDEX idx_experience_search_vec_en ON read_models.experience_search USING GIN(search_vector_en);
CREATE INDEX idx_experience_search_filters ON read_models.experience_search(destination_id, categories, price_min, rating);
```

#### booking_history (user booking list)
```sql
CREATE TABLE read_models.booking_history (
    booking_id       UUID PRIMARY KEY,
    booking_number   TEXT NOT NULL,
    user_id          UUID NOT NULL,
    experience_name_ar TEXT NOT NULL,
    experience_name_en TEXT NOT NULL,
    destination_name_ar TEXT NOT NULL,
    destination_name_en TEXT NOT NULL,
    experience_image TEXT,
    schedule_date    DATE NOT NULL,
    schedule_time    TIME,
    status           TEXT NOT NULL,
    total_amount     NUMERIC(10,2) NOT NULL,
    currency         TEXT NOT NULL DEFAULT 'EGP',
    traveler_count   INT NOT NULL,
    booking_created  TIMESTAMPTZ NOT NULL,
    payment_status   TEXT,
    can_cancel       BOOLEAN NOT NULL DEFAULT false,
    can_review       BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX idx_booking_history_user ON read_models.booking_history(user_id, booking_created DESC);
```

### 9.2 Read Model Refresh Triggers

| Read Model | Refresh Trigger | Delay | Method |
|---|---|---|---|
| destination_detail | DestinationPublished, ExperiencePublished | < 1s | Event → Materialized View refresh |
| experience_search | ExperiencePublished, ReviewCreated, OfferActivated | < 5s | Event → Incremental update |
| booking_history | BookingCreated, BookingConfirmed, BookingCancelled | < 1s | Synchronous write-through |

---

## 10. Write Models

### 10.1 Write Model Principles

1. **Aggregate per table** — Each aggregate root maps to a single table
2. **Event-sourced for critical aggregates** — Booking and Payment maintain event streams via timeline_json
3. **Optimistic concurrency** — Version column on high-contention aggregates (Wallet, Availability)
4. **Immediate consistency within aggregate** — All writes to a single aggregate are ACID
5. **Outbox pattern for cross-aggregate** — Events published reliably via outbox table

### 10.2 Concurrency Control

| Aggregate | Strategy | Notes |
|---|---|---|
| Wallet | Optimistic (version column) | Balance updates check version; retry on conflict (max 3) |
| Availability | Optimistic (version column) | Slot reservations via `UPDATE ... WHERE version = X` |
| Booking | Serial (within transaction) | Single transaction per booking creation |
| RewardProfile | Optimistic (version column) | Point mutations retry on conflict |
| Experience | Application-level | Unique slug constraint prevents duplicates |

### 10.3 Write Transaction Template

```sql
-- Booking creation transaction (pseudocode)
BEGIN;
  -- 1. Validate availability (SELECT ... FOR UPDATE)
  SELECT * FROM booking.availability
  WHERE experience_id = $1 AND date = $2
  FOR UPDATE;

  -- 2. Reserve slot
  UPDATE booking.availability_slots
  SET booked = booked + $3, updated_at = now()
  WHERE slot_id = $4 AND (capacity - booked) >= $3;
  IF NOT FOUND THEN ROLLBACK; END IF;

  -- 3. Create booking
  INSERT INTO booking.bookings (...)
  VALUES (...)

  -- 4. Write outbox event
  INSERT INTO event_store.outbox (aggregate_type, aggregate_id, event_type, payload)
  VALUES ('booking', $booking_id, 'BookingCreated', jsonb_build_object(...));

COMMIT;
```

---

## 11. Multi-tenant Strategy

### 11.1 Tenant Model

EgyptHub uses a **single-database, row-level tenant isolation** model.

| Tenant Type | Isolation | Identification | Example |
|---|---|---|---|
| Traveler (End User) | Row-level (user_id) | JWT subject claim | Individual traveler |
| Partner | Row-level (partner_id) | JWT + role claim | Experience provider |
| Ambassador | Row-level (ambassador_id) | JWT + role claim | Affiliate marketer |
| Admin | Full access | JWT + role claim | Staff |

### 11.2 Row-Level Security

```sql
-- Enable RLS on tenant-aware tables
ALTER TABLE booking.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking.travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement.reviews ENABLE ROW LEVEL SECURITY;

-- Partner can see their own experiences and bookings
CREATE POLICY partner_experiences ON catalog.experiences
    FOR ALL TO partner_role
    USING (partner_id = current_setting('app.current_partner_id')::UUID);

-- User can see their own bookings
CREATE POLICY user_bookings ON booking.bookings
    FOR SELECT TO authenticated
    USING (user_id = current_setting('app.current_user_id')::UUID);
```

### 11.3 Tenant Context Propagation

```
HTTP Request
  → API Gateway authenticates JWT
  → Sets PostgreSQL session variables:
      SET app.current_user_id = '...';
      SET app.current_partner_id = '...';  // if partner role
      SET app.current_ambassador_id = '...'; // if ambassador role
      SET app.client_ip = '...';
      SET app.user_agent = '...';
  → Application queries respect RLS policies
```

---

## 12. Data Retention

### 12.1 Retention Schedule

| Data | Retention Period | Action After Retention | Legal Basis |
|---|---|---|---|
| User accounts | Until deletion request | Anonymize after 5 years inactivity | GDPR / PDPL |
| Booking records | 10 years | Archive to cold storage | Tax/legal (Saudi ZATCA, Egyptian Tax Authority) |
| Payment records | 10 years | Archive to cold storage | Financial regulations |
| Wallet ledger | 10 years | Archive to cold storage | Financial regulations |
| Refund records | 10 years | Archive to cold storage | Financial regulations |
| Invoice records | 10 years | Archive to cold storage | Tax regulations |
| Review content | Indefinite (until deletion request) | Anonymize author on account deletion | — |
| Ambassador records | 5 years after last referral | Anonymize | — |
| Conversation history | 2 years | Anonymize (remove user PII) | — |
| Trip plans | 2 years after last activity | Delete | — |
| Notifications | 90 days | Hard delete | — |
| Audit logs | 7 years (financial), 3 years (non-financial) | Archive to cold storage | — |
| Session data | Until expiry + 30 days | Hard delete | — |
| Event outbox/inbox | 7 days | Hard delete | — |
| Analytics events | 3 years | Aggregate and delete raw | — |
| Point history | 5 years | Aggregate and delete raw | — |

### 12.2 Data Anonymization

```sql
-- Anonymize user data on account deletion request
CREATE OR REPLACE FUNCTION identity.anonymize_user(p_user_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE identity.users SET
        email = 'deleted-' || p_user_id || '@anon.egypthub.com',
        phone = NULL,
        password_hash = 'ANONYMIZED',
        profile_json = '{"anonymized":true}',
        status = 'deleted',
        deleted_at = now()
    WHERE user_id = p_user_id;

    -- Anonymize reviews but keep content
    UPDATE engagement.reviews SET
        user_id = NULL
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 13. Backup Strategy

### 13.1 Backup Schedule

| Type | Frequency | Retention | Method | Target |
|---|---|---|---|---|
| Full database | Daily (00:00 UTC) | 30 days | `pg_dump -Fc` | S3 (encrypted) |
| WAL archiving | Continuous (every 5 min) | 7 days | `archive_command` to S3 | S3 (encrypted) |
| Transaction log | Continuous | 7 days | PostgreSQL WAL | S3 (encrypted) |
| Read replica | Hot standby | N/A | Streaming replication | Separate AZ |
| Configuration | On change | All versions | Git (infra repo) | GitHub |

### 13.2 Recovery Point Objective (RPO) / Recovery Time Objective (RTO)

| Scenario | RPO | RTO | Method |
|---|---|---|---|
| Single instance failure | 0 (zero) | < 1 min | Failover to read replica |
| AZ outage | < 5 min | < 5 min | Promote cross-AZ replica |
| Data corruption | < 24 hours | < 4 hours | Point-in-time recovery from full backup + WAL |
| Catastrophic region failure | < 24 hours | < 8 hours | Cross-region restore from backup |

### 13.3 Backup Encryption

```sql
-- All backups encrypted at rest in S3 using AWS KMS
-- pg_dump pipe through gpg:
-- pg_dump -Fc egypthub | gpg --encrypt --recipient backups@egypthub.com > backup.gpg
```

### 13.4 Backup Verification

```sql
-- Weekly automated restore test
-- CI/CD job in staging environment:
-- 1. Restore latest backup to isolated test database
-- 2. Run integrity checks:
--    SELECT count(*) FROM information_schema.tables;
--    SELECT schemaname, tablename, n_live_tup FROM pg_stat_user_tables;
-- 3. Run sample queries against restored data
-- 4. Report success/failure to #alerts Slack channel
```

### 13.5 Monitoring Alerts

| Metric | Threshold | Alert |
|---|---|---|
| Replication lag | > 30 seconds | PagerDuty (critical) |
| Backup failure | Any failure | PagerDuty (high) |
| WAL archiving delay | > 10 minutes | Slack #alerts |
| Connection count | > 80% of max | Slack #alerts |
| Long-running queries | > 30 seconds | Slack #slow-queries |
| Table bloat | > 20% dead tuples | Scheduled vacuum notification |

---

*End of Database Architecture — Version 1.0*
