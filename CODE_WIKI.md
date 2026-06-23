# EgyptHub Code Wiki

## 1. نظرة عامة

هذا المستند يشرح **الحالة الحالية الفعلية** لمشروع `EgyptHub` كما تظهر في الكود والـ manifests وملفات البنية التحتية داخل:

```text
c:\SharmsGo\egypthub
```

المشروع عبارة عن **monorepo** مبني باستخدام `pnpm workspace` و`Turborepo`، ويجمع بين:

- تطبيقات واجهة أمامية متعددة مبنية بـ `Next.js`
- خدمات Backend مستقلة مبنية بـ `NestJS`
- Backend أحدث بصيغة أقرب إلى **modular monolith**
- حزم داخلية مشتركة لإعادة استخدام UI والأنواع والترجمة والتصميم

## 2. الحالة المعمارية الحالية

### 2.1 الصورة الكبيرة

البنية الحالية ليست مسارًا واحدًا بسيطًا، بل فيها **ازدواج معماري واضح**:

1. **مسار خدمات مستقلة**
   - `services/api-gateway`
   - `services/auth-service`
   - `services/listings-service`
   - `services/bookings-service`
   - `services/ambassador-service`

2. **مسار Backend موحد أحدث**
   - `services/backend`

3. **مسار Web غني بالمنطق المحلي**
   - `apps/web` لا يعمل كواجهة فقط، بل يحتوي أيضًا على:
     - `Route Handlers`
     - `Prisma schema`
     - طبقات منطق مثل `explorer`, `network`, `zainab`

### 2.2 الـ Tech Stack الفعلي

اعتمادًا على ملفات `package.json` الحالية:

- **Monorepo orchestration:** `pnpm`, `turbo`
- **Frontend الرئيسي:** `Next.js 14.2`, `React 18.3`, `TypeScript`
- **Animations/UI:** `framer-motion`, `react-icons`, `Tailwind CSS`
- **Backend الحديث:** `NestJS 10`, `Prisma`, `ioredis`, `Swagger`, `helmet`
- **Backend الخدمات القديمة/المستقلة:** `NestJS`, `TypeORM`, `pg`, `cache-manager`
- **Database & Cache:** `PostgreSQL`, `Redis`
- **Testing الحالي:** `Vitest` في بعض الحزم الأمامية و`Jest` في `services/backend`

### 2.3 بنية المجلدات

```text
egypthub/
├── apps/                  # تطبيقات Next.js
│   ├── web/
│   ├── admin-dashboard/
│   ├── partner-dashboard/
│   └── ambassador-dashboard/
├── services/              # خدمات NestJS
│   ├── api-gateway/
│   ├── auth-service/
│   ├── listings-service/
│   ├── bookings-service/
│   ├── ambassador-service/
│   └── backend/
├── packages/              # حزم مشتركة
│   ├── ui/
│   ├── design-tokens/
│   ├── shared-types/
│   └── i18n/
├── infra/
│   ├── docker/
│   └── scripts/
├── data/                  # بيانات static وتقارير
└── docs/                  # وثائق معمارية وتقارير
```

## 3. مسؤوليات الوحدات الكبرى

### 3.1 تطبيقات الواجهة

#### `apps/web`
التطبيق الرئيسي للمستخدم النهائي، ويغطي أكثر من دور:

- صفحات عامة وتجربة استكشاف
- صفحات auth
- صفحات حجز ودفع وملف شخصي ومحفظة
- صفحات قصص وتجارب ووجهات
- واجهات داخلية مرتبطة بالشبكة والسفراء
- API route handlers محلية
- Prisma محلي لإدارة بعض البيانات مباشرة

هذا التطبيق هو **مركز المنتج الفعلي** في الواجهة وليس مجرد landing page.

#### `apps/admin-dashboard`
لوحة إدارة للإشراف على النظام، تبدو حاليًا أقرب إلى MVP أو واجهة تشغيل/عرض، وتركز على:

- مؤشرات عامة
- مراجعات تشغيلية
- إدارة كيانات على مستوى عال

#### `apps/partner-dashboard`
لوحة للشركاء المحليين، ومسؤوليتها الأساسية:

- متابعة الحجوزات
- إدارة العروض
- متابعة الأداء والبيانات التجارية

#### `apps/ambassador-dashboard`
لوحة للسفراء، وتغطي:

- الأرباح
- الروابط أو الإحالات
- حالة السحب
- ملخص نشاط السفير

### 3.2 الخدمات الخلفية

#### `services/api-gateway`
بوابة أمامية لطلبـات REST، ومسؤوليتها:

- استقبال الطلبات تحت `api/v1`
- إعادة توجيهها إلى خدمات `auth`, `listings`, `bookings`, `ambassador`
- توحيد نقطة الدخول للخدمات المنفصلة

#### `services/auth-service`
خدمة توثيق مستقلة تعتمد على `TypeORM` و`PostgreSQL`، وتغطي:

- OTP flow
- login
- profile
- JWT

#### `services/listings-service`
خدمة خاصة بالمنشآت والعروض/الكتالوج، ومسؤوليتها:

- الكيانات الخاصة بالمحتوى التجاري
- عرض العناصر الخاصة بالمنشآت والتجارب

#### `services/bookings-service`
خدمة مستقلة للحجوزات، مخصصة لـ:

- إدارة دورة حياة الحجز
- ربط الحجوزات بالكيانات الأخرى

#### `services/ambassador-service`
خدمة للسفراء والإحالات والعمولات والنشاط المرتبط بالشبكة.

#### `services/backend`
هذه هي الخدمة الأكثر نضجًا تنظيميًا داخل المشروع، وتعمل كـ backend موحد. في `AppModule` الحالية يتم تفعيل:

- `ConfigModule`
- `DatabaseModule`
- `RedisModule`
- `HealthModule`
- `IdentityModule`
- logging / validation / swagger / rate limiting

كما أن الشجرة المصدرية تحتوي وحدات مجال إضافية مثل `CatalogModule` وخدماتها، حتى لو لم تكن كلها موصولة في `AppModule` الحالية.

وجودها بجانب المايكروسيرفس يعني أن المشروع في مرحلة انتقالية أو مسارين متوازيين.

### 3.3 الحزم المشتركة

#### `packages/ui`
مكتبة UI مشتركة وكبيرة نسبيًا، لا تقتصر على primitives فقط، بل تحتوي على:

- أدوات formatting
- hooks عامة
- مكونات أساسية مثل `Button`, `Input`, `Card`
- مكونات discovery
- مكونات AI
- مكونات booking
- مكونات wallet/rewards

#### `packages/design-tokens`
حزمة design tokens مركزية، وتصدر:

- colors
- typography
- spacing
- radius
- shadows
- breakpoints
- z-index
- motion
- gradients

#### `packages/shared-types`
الحزمة المشتركة للأنواع، وتوفر:

- `UserRole`
- `BusinessStatus`
- `BookingStatus`
- `OfferStatus`
- نماذج المستخدم والمدينة والمنشأة والعرض والحجز والسفير
- صيغة موحدة لـ API response

#### `packages/i18n`
حزمة الترجمة الحالية، وتركز على:

- نصوص باللهجة المصرية
- مفاتيح لواجهات common / nav / booking / partner / admin / auth / footer

## 4. نقاط الدخول الأساسية

### 4.1 Web App

#### `apps/web/src/app/layout.tsx`
`RootLayout` هو المدخل الهيكلي للتطبيق، ومسؤوليته:

- تحميل الخطوط
- ضبط `lang="ar"` و`dir="rtl"`
- حقن `Header` و`Footer`
- تغليف المحتوى داخل `ThemeProvider`

#### `apps/web/src/app/page.tsx`
`Home` هو مدخل الصفحة الرئيسية، ويجمع أقسام الصفحة عبر `dynamic imports` مثل:

- `CityWheel`
- `AIMapSection`
- `ZainabWidget`
- `FeaturedStories`
- `OfferSection`
- `Testimonials`

هذا يوضح أن الصفحة الرئيسية مبنية composition-first وتجمع عدة وحدات مستقلة.

### 4.2 Web Route Handlers

#### `apps/web/src/app/api/auth/login/route.ts`
المسار `POST` مسؤول عن:

- استقبال `email` و`password`
- التحقق من المستخدم عبر Prisma
- مقارنة كلمة السر باستخدام `bcryptjs`
- إصدار `access token` و`refresh token`
- تخزين التوكنات في cookies

هذا المسار مهم لأنه يثبت أن `apps/web` يحتوي منطق auth server-side داخليًا.

## 5. أهم الكلاسات والدوال

### 5.1 داخل `apps/web`

#### `RootLayout`
المسؤول عن الغلاف العام للتطبيق:

- fonts
- direction / language
- theme
- header/footer shell

#### `Home`
الدالة/المكون المسؤول عن تجميع الصفحة الرئيسية من أقسام كثيرة عبر imports ديناميكية.

#### `planTrip()`
موجودة في `src/lib/zainab/tripPlanner.ts`، ومسؤوليتها:

- بناء itinerary جاهز لمدينة معينة
- اختيار خطة ثابتة إذا كانت المدينة مدعومة
- توليد خطة تلقائية إذا لم يوجد itinerary مسبق
- إرجاع `TripPlan` جاهز للعرض

#### `getAvailableTripCities()`
تعيد المدن التي يمكن تخطيط رحلة لها اعتمادًا على itineraries الجاهزة أو وجود تجارب مرتبطة.

#### `getCityImmersion()`
موجودة في `src/lib/explorer/cityExplorer.ts`، ومسؤوليتها:

- بناء مشهد شامل للمدينة من `ExplorerGraph`
- استخراج التجارب والقصص والأكل والسفراء
- حساب إحصاءات المدينة
- إرجاع model واحد جاهز للعرض في واجهات الاستكشاف

#### `getCitiesByCategory()`
تفيد في تصفية المدن حسب موضوع أو فئة باستخدام البيانات والعلاقات والعلامات.

#### `generateQRData()`
موجودة في `src/lib/network/qrEngine.ts`، ومسؤوليتها:

- توليد payload QR يربط السفير بالصفحة المستهدفة
- استخدام `referralCode` الخاص بالسفير

#### `scanQR()`
تفك محتوى QR، وتنشئ referral جديدًا من النوع `visit` وتعيد معلومات الزيارة.

#### `getQRStats()`
تحسب ملخص referrals الخاصة بالـ QR:

- عدد الزيارات
- عدد الـ leads
- عدد التحويلات

### 5.2 داخل `services/backend`

#### `bootstrap()`
موجودة في `services/backend/src/main.ts`، ومسؤوليتها:

- إنشاء تطبيق Nest
- تفعيل `ValidationPipe`
- تسجيل `HttpExceptionFilter`
- تفعيل `TransformInterceptor`
- ضبط CORS
- تفعيل `helmet`
- إنشاء Swagger docs

#### `AppModule`
موجودة في `services/backend/src/app.module.ts`، وهي نقطة تجميع الوحدات الأساسية:

- config
- throttling
- logger
- database
- redis
- health
- identity

#### `AuthService` الحديثة
موجودة في `services/backend/src/modules/identity/services/auth.service.ts`، وتغطي:

- register
- login
- refresh
- logout
- MFA setup/enable/disable
- إصدار access tokens وربطها بالجلسات

هذه نسخة أكثر نضجًا من auth مقارنة بالخدمة القديمة المستقلة.

#### `UserService`
موجودة في `services/backend/src/modules/identity/services/user.service.ts`، ومسؤوليتها:

- إنشاء المستخدم
- تشفير PII مثل email/phone
- إدارة الملف الشخصي
- soft delete
- تتبع المحاولات الفاشلة
- lock/unlock للحساب

#### `PartnersService`
موجودة في `services/backend/src/modules/catalog/partners/services/partners.service.ts`، ومسؤوليتها:

- CRUD للشركاء
- توليد أو اعتماد slug
- تحويل الصفوف القادمة من قاعدة البيانات إلى DTOs

#### `ExperiencesService`
موجودة في `services/backend/src/modules/catalog/experiences/services/experiences.service.ts`، ومسؤوليتها:

- CRUD للتجارب
- إنشاء slug فريد
- ربط التجارب بالتصنيفات
- تطبيق filters على القراءة
- تحويل النتائج إلى response DTO

### 5.3 داخل طبقة الخدمات المستقلة

#### `GatewayController`
موجودة في `services/api-gateway/src/gateway/gateway.controller.ts`، ومسؤوليتها:

- استقبال الطلبات لكل من `auth`, `listings`, `bookings`, `ambassador`
- تمريرها إلى `GatewayService`
- توفير endpoint صحي بسيط للبوابة

#### `AuthService` القديمة
موجودة في `services/auth-service/src/auth/auth.service.ts`، ومسؤوليتها:

- إرسال OTP
- التحقق من OTP
- login بكلمة السر
- إنشاء JWT
- استرجاع profile

هذه الخدمة تستخدم Redis عند التوفر، ومعها fallback in-memory للـ OTP.

## 6. علاقات الاعتماد

### 6.1 على مستوى الـ Monorepo

الجذر `egypthub` يعرّف:

- `pnpm-workspace.yaml`
  - `apps/*`
  - `services/*`
  - `packages/*`
- `turbo.json`
  - مهام `build`, `dev`, `lint`, `test`, `clean`

هذا يعني أن البناء والتشغيل يتم على مستوى workspace وليس كمشاريع معزولة فقط.

### 6.2 علاقة التطبيقات بالحزم

العلاقة الحالية يمكن تلخيصها هكذا:

```text
packages/shared-types   -> أنواع موحدة
packages/design-tokens  -> design tokens
packages/i18n           -> ترجمة
packages/ui             -> مكونات وhooks وأدوات UI
apps/*                  -> تستهلك هذه الحزم حسب الحاجة
```

### 6.3 علاقة `apps/web` بالبيانات والخدمات

`apps/web` يعتمد على أكثر من طبقة:

- بيانات static JSON داخل `src/data`
- Route handlers داخل `src/app/api`
- Prisma محلي عبر `@prisma/client`
- طبقات منطق مثل:
  - `explorer`
  - `network`
  - `zainab`

إذًا التطبيق ليس frontend رفيعًا فقط، بل يحتوي جزءًا مهمًا من منطق التطبيق.

### 6.4 علاقة الـ API Gateway بالخدمات

`services/api-gateway` يوجه الطلبات إلى:

- `AUTH_SERVICE_URL`
- `LISTINGS_SERVICE_URL`
- `BOOKINGS_SERVICE_URL`
- `AMBASSADOR_SERVICE_URL`

كما هو معرف في `infra/docker/docker-compose.dev.yml`.

### 6.5 علاقة `services/backend` الداخلية

`services/backend` يعتمد على:

- `Prisma` للوصول إلى قاعدة البيانات
- `Redis` للبنية الداعمة
- `NestJS modules` لعزل المجالات
- `Swagger` وfilters/interceptors لتوحيد السلوك التشغيلي

## 7. تدفق البيانات وحدود المسؤولية

### 7.1 مسار Web المحلي

```text
UI Components
  -> App Router pages
  -> Route Handlers
  -> Prisma / local engines / JSON data
```

هذا المسار ظاهر بوضوح في `apps/web`.

### 7.2 مسار Gateway-based backend

```text
Client
  -> api-gateway
  -> auth-service / listings-service / bookings-service / ambassador-service
```

### 7.3 مسار Backend الموحد

```text
Client أو Service Consumer
  -> services/backend
  -> AppModule
  -> Identity/Catalog/Health/Infra layers
  -> Prisma + Redis
```

## 8. التشغيل والتطوير المحلي

### 8.1 المتطلبات

- Node.js `>= 18`
- `pnpm >= 8`، والملف الجذري يثبت `pnpm@9`
- Docker وDocker Compose
- أدوات PostgreSQL إذا كنت ستستخدم `psql` محليًا

### 8.2 الدخول إلى المشروع الصحيح

> المرجع التشغيلي الفعلي هو:

```bash
cd c:\SharmsGo\egypthub
```

ولا يُنصح بالاعتماد على `c:\SharmsGo` نفسه كمرجع تشغيل، لأن الجذر يحتوي بقايا مشروع أقدم غير متطابقة بالكامل.

### 8.3 تثبيت الاعتماديات

```bash
pnpm install
```

### 8.4 تشغيل البنية التحتية

```bash
pnpm docker:dev
```

هذا يشغّل:

- PostgreSQL على `5432`
- Redis على `6379`
- API Gateway على `4000`
- Auth Service على `4001`
- Listings Service على `4002`
- Bookings Service على `4003`
- Ambassador Service على `4004`
- Backend الموحد على `4010` خارجيًا ويعمل داخليًا على `4000`

### 8.5 تهيئة قاعدة البيانات

```bash
pnpm db:init
```

هذا السكربت يعتمد على:

```bash
psql -U egypthub -d egypthub_dev -f infra/scripts/init-db.sql
```

### 8.6 تشغيل المشروع

```bash
pnpm dev
```

وهذا يشغّل `turbo dev` على مستوى الـ workspace.

> ملاحظة: هذا المسار مناسب للتطوير على مستوى المونوربو، لكن يجب الانتباه إلى أن بعض الخدمات تضبط المنفذ `4000` افتراضيًا، لذلك يجب التعامل معه كتشغيل workspace يحتاج مراجعة إعدادات البيئة إذا ظهرت تعارضات منافذ.

### 8.7 أوامر عامة

```bash
pnpm build
pnpm test
pnpm docker:stop
```

### 8.8 تشغيل جزء محدد

إذا أردت تشغيل جزء بعينه، استخدم مجلده مباشرة:

- داخل `apps/web`
  - `pnpm dev`
  - `pnpm test`
  - `pnpm prisma:generate`
  - `pnpm prisma:push`

- داخل `services/backend`
  - `pnpm dev`
  - `pnpm test`
  - `pnpm test:e2e`
  - `pnpm prisma:generate`
  - `pnpm prisma:migrate`

- داخل dashboards أو الخدمات القديمة
  - `pnpm dev`
  - `pnpm build`

## 9. Reality Check: الفجوات بين الوثائق والتنفيذ

هذا القسم مهم لأن المشروع يحتوي وثائق كثيرة، لكن بعضها يصف حالة مستهدفة أو أشمل من التنفيذ الحالي.

### 9.1 الجذر القديم مقابل المشروع الفعلي

- الجذر `c:\SharmsGo` يحتوي ملفات package/compose قديمة تشير إلى مسارات غير موجودة مثل `frontends/*`
- المشروع الفعلي الذي يجب توثيقه وتشغيله هو `c:\SharmsGo\egypthub`

### 9.2 الـ Tech Stack في الوثائق أوسع من الواقع الحالي

بعض الوثائق تشير إلى:

- `Next.js 15`
- `React 19`
- `TanStack Query`
- `Zustand`
- `BullMQ` كجزء واسع الانتشار

بينما الـ manifests الفعلية الحالية تثبت على الأقل في `apps/web`:

- `Next.js 14.2`
- `React 18.3`

أي أن الوثائق المعمارية يجب قراءتها كـ **target architecture** أو حالة تصميمية جزئيًا، لا كمرآة حرفية للوضع الحالي.

### 9.3 `db:seed` غير موثوق حاليًا

الملف `egypthub/package.json` يعرّف:

```bash
pnpm db:seed
```

لكن السكربت يشير إلى ملف `infra/scripts/seed.sql` غير الموجود حاليًا.

### 9.4 ازدواج الـ Backend

المشروع يشغّل في الوقت نفسه:

- خدمات مستقلة عبر `api-gateway`
- Backend موحد داخل `services/backend`

هذا لا يعني خطأ بالضرورة، لكنه يعني أن أي قارئ جديد يجب أن يفهم أن المشروع ليس settled architecture بالكامل بعد.

### 9.5 `apps/web` ليس مجرد frontend

الوثائق قد توحي أحيانًا أن الويب مجرد مستهلك لخدمات backend، لكن الواقع الحالي يثبت أن `apps/web` يحتوي:

- Prisma
- auth route handlers
- leads/partners/ambassadors APIs محلية
- engines منطقية مستقلة

## 10. خلاصة عملية

إذا كنت جديدًا على المشروع، فابدأ بفهمه بهذا الترتيب:

1. `package.json` + `pnpm-workspace.yaml` + `turbo.json`
2. `apps/web`
3. `packages/ui` و`shared-types` و`design-tokens` و`i18n`
4. `services/api-gateway` والخدمات المستقلة
5. `services/backend` كالاتجاه المعماري الأحدث
6. `infra/docker/docker-compose.dev.yml` لفهم التشغيل الفعلي

باختصار:

- **المنتج الحالي يتمحور حول `apps/web`**
- **طبقة الخدمات الحالية مزدوجة**
- **الحزم المشتركة فعالة ومهمة**
- **الوثائق المعمارية مفيدة، لكن يجب وزنها دائمًا مقابل الكود الفعلي**
