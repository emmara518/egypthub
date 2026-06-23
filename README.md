# مصر هب - EgyptHub 🏝️🇪🇬

**شبكة السفراء الرقمية للسياحة المصرية**

منصة بتجمع السائحين بالخدمات المحلية الأصيلة في مصر. مش مجرد حجز، دي تجربة مصرية كاملة.

## التقنيات

- **Frontend:** Next.js 14 (App Router) + TailwindCSS
- **Backend:** NestJS Microservices
- **Database:** PostgreSQL
- **Cache:** Redis
- **Monorepo:** TurboRepo + pnpm

## بداية سريعة

```bash
# نصّب الاعتماديات
pnpm install

# شغّل البنية التحتية
pnpm docker:dev

# صبّ البيانات
pnpm db:init

# شغّل المشروع كله
pnpm dev
```

## الهيكل

```
egypthub/
├── apps/              # تطبيقات Next.js
│   ├── web/           # بوابة العميل
│   ├── ambassador-dashboard/  # لوحة السفير
│   ├── partner-dashboard/     # لوحة الشريك
│   └── admin-dashboard/       # لوحة الأدمن
├── services/          # مايكروسيرفسيس NestJS
│   ├── api-gateway/   # البوابة الموحدة
│   ├── auth-service/  # التوثيق
│   ├── listings-service/      # المنشآت والعروض
│   ├── bookings-service/      # الحجوزات
│   └── ambassador-service/    # السفراء والأرباح
├── packages/          # حزم مشتركة
│   ├── shared-types/  # أنواع TypeScript
│   ├── i18n/          # ترجمة (لهجة مصرية)
│   └── design-tokens/ # ألوان وخطوط
└── infra/             # بنية تحتية
    ├── docker/        # إعدادات Docker
    └── scripts/       # سكريبتات قاعدة البيانات
```
