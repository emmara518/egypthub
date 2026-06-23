# مصر هب — مواصفات المكونات البصرية (Visual Reference Spec)

> **آخر تحديث:** 22 يونيو 2026  
> **الغرض:** وصف هندسي لكل مكون بصري بحيث أي Agent يقدر يعيد بناء المكون بدون ما يشوف صورة

---

## 1. الهيدر (`Header.tsx`)

### الحالة الطبيعية (Top of page — Transparent)
- **الخلفية:** `bg-transparent` (شفاف تمامًا)
- **الموضع:** `fixed top-0 left-0 right-0 z-50`
- **الارتفاع:** `h-20` (80px)
- **الشعار (يمين):**
  - أيقونة هرم (`PyramidIcon`) بحجم `w-10 h-10` في مربع `rounded-xl` بخلفية `white/15 backdrop-blur-sm`
  - نص "مصر" باللون الأبيض + "هب" باللون `#E9C46A` — خط عريض حجم `text-xl`
  - نص "EGYPT HUB" بحجم `text-[10px]`، تتبع أحرف `tracking-[0.2em]`، لون `white/70`
- **روابط الناف (وسط):**
  - الرئيسية، اكتشف (قائمة منسدلة)، العروض
  - اللون: `text-white/90` hover: `text-white bg-white/10`
- **أزرار (يسار):**
  - "دخول": border `white/30`، `rounded-xl`، hover `bg-white/10`
  - "حساب جديد": `.btn-primary`

### عند التمرير (Scrolled — Glassmorphism)
```
scrollY > 30px → تفعيل الكلاس:
  bg-[#0D3B66]/95 backdrop-blur-lg shadow-md
  border-b border-[#E9C46A]/20
```
- الخلفية تتحول من شفاف إلى نیلي معتم `#0D3B66/95` + `backdrop-filter: blur(16px)`
- أيقونة الشعار: خلفية `#E9C46A/10` + border `#E9C46A/30`
- شريط سفلي: 1px border بلون ذهبي `#E9C46A/20`

### القائمة المنسدلة (Dropdown — "اكتشف")
- تظهر hover على زر "اكتشف"
- `absolute top-full right-0 mt-2`
- Card أبيض `rounded-2xl shadow-xl` مع border `#E9C46A/20`
- 6 عناصر: مطاعم، كافيهات، أنشطة، فنادق، تسوق، نقل
- Hover: `bg-[#FAEDCD]/40`

### القائمة الجانبية (Mobile)
- شاشات `<lg`: أيقونة `HiMenu` / `HiX`
- لوحة منزلقة: `bg-white` مع border ذهبي
- عناصر في grid `grid-cols-2` للتصنيفات

---

## 2. الهيرو (`Hero.tsx`)

### الهيكل العام (Split Layout)
```
<section> ─── relative, h-screen, min-h-[750px], max-h-[920px]
  ├── <Background Slideshow> ─── absolute inset-0
  │   ├── Gradient Overlay: bg-gradient-to-r from-[#0D3B66]/90 via-[#0D3B66]/80 to-[#0D3B66]/60
  │   └── Ken Burns Image ─── تغيير كل 5 ثوانٍ (7 صور Unsplash)
  │
  ├── <Content Container> ─── relative z-20, max-w-7xl, flex flex-col lg:flex-row
  │   ├── <Left Panel> ─── flex-1, lg:max-w-xl
  │   │   ├── Chip: "بوابتك لأصالة مصر" مع CompassIcon
  │   │   ├── H1: "مصر هب" ─── text-5xl→8xl, font-extrabold, color #E9C46A
  │   │   ├── H2: "عيشها على" + TypeWriter [مزاجك, طريقتك, ذوقك]
  │   │   │   └── TypeWriter ─── مؤشر وامض (2px, #E9C46A, animate-pulse)
  │   │   ├── P: وصف بالخط Amiri, white/80
  │   │   └── CTA Button: "ابدأ رحلتك" ─── bg #F4A261, rounded-full, px-8 py-4
  │   │
  │   └── <Right Panel> ─── flex-1, h-[500px], hidden md:block
  │       ├── Oval 1 (خلفي يسار) ─── w-48 h-72, rounded-full, border-4 white/20
  │       ├── Oval 2 (أمامي وسط) ─── w-64 h-96, rounded-full, border-4 #E9C46A, shadow gold
  │       └── Oval 3 (خلفي يمين) ─── w-48 h-72, rounded-full, border-4 white/20
  │
  ├── <Dots Indicator> ─── absolute bottom-24, center, 7 dots
  │   └── Active: w-8 h-2 bg-[#E9C46A], Inactive: w-2 h-2 bg-white/40
  │
  └── <SandWave Divider> ─── absolute bottom-0, fill #FAEDCD
```

### Ken Burns Effect
- كل صورة تبدأ بـ `scale: 1.1, opacity: 0` → `scale: 1, opacity: 1`
- مدة الانتقال: 1.4s
- الصور تتغير كل 5 ثوانٍ
- Parallax: `scrollYProgress` [0,1] → translateY [0%, 30%]

---

## 3. الكروت (Card System)

### 3.1 Egyptian Card (`.egypt-card`)

**المواصفات الهندسية:**
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │        Image Area           │    │
│  │        4:3 aspect           │    │
│  │  Badge (top-right chip)     │    │
│  │  Status (top-left pill)     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─ Category Chip ── ♥ ───────┐    │
│  │  Name (18px bold, #1f2937) │    │
│  ├── ★ rating  ·  location ───┤    │
│  │  Story box (content-box)   │    │
│  ├── سفير: name ──────────────┤    │
│  └─────────────────────────────┘    │
│                                     │
│  ██████████████████████████████     │
│  2px solid #E9C46A (bottom border)  │
└─────────────────────────────────────┘
```

| الخاصية | القيمة |
|---------|--------|
| Border Radius | 16px (`rounded-2xl`) |
| Background | `#fff` |
| Box Shadow | `0 2px 12px rgba(0,0,0,0.04)` |
| Bottom Border | 2px solid `#E9C46A` |
| **Hover Effect** | translateY(-8px), shadow gold `0 12px 40px rgba(233,196,106,0.15)` |
| Transition | `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### 3.2 Image Zoom on Hover
- Container: `overflow: hidden`
- Image Transition: `transform 0.7s`
- Hover: `scale(1.1)`

### 3.3 Content Box (Story / تفاصيل)
```
background: var(--color-warm) #F9F6F0
border-radius: 16px
padding: 2rem
```

---

## 4. الأقسام (Sections)

### 4.1 Destination Grid (`DestinationIntro.tsx`)
```
┌─────────────────────────────────────────┐
│          PalmIcon + عنوان               │
│       "اختار وجهتك" — 5 مداخل          │
├──────────────┬──────────────────────────┤
│  شرم الشيخ   │       القاهرة            │
│  (col-span 6)│      (col-span 6)        │
├──────┬───────┼──────────┬───────────────┤
│ الأقصر│الغردقة│ الساحل الشمالي           │
│(4)   │ (4)   │  (4)                     │
└──────┴───────┴──────────────────────────┘
```
- كل بطاقة: `rounded-3xl` (24px), `aspect-[4/3]`, `min-h-[300px]`
- Gradient overlay: `from-[#0D3B66]/90 via-[#0D3B66]/30 to-transparent`
- Text position: `absolute bottom-0 p-8`
- Hover: `scale(1.1)` على الصورة + دائرة ذهبية تظهر على اليمين

### 4.2 City Wheel (`CityWheel.tsx`)
- **Carousel أفقي** مع سحب (drag) + أزرار جانبية
- أبعاد الكارت: `width: 280px`, `aspect-[4/5]`
- الكارت النشط: `scale(1.08)`, `rotateY(0)`, `translateZ(60px)`
- الكروت غير النشطة: تتلاشى (`opacity: 0.3`) وتدور (`rotateY: ±15°`)
- Reflection: تأثير انعكاس تحت الكارت النشط `scaleY(-1)` مع `mask-image` gradient
- Dots indicator أسفل الكاروسيل
- Lightbox على الكارت النشط عند الكليك

### 4.3 Stats Bar (`StatsBar.tsx`)
- خلفية: `bg-gradient-to-l from-primary-600 to-primary-800` (درجات النيلي الداكن)
- 4 أعمدة: أيقونة + رقم animated (CountUp) + تسمية
- لون الرقم: `#E9C46A` (ذهبي)
- لون النص السفلي: `white/70`
- أيقونات في مربع `w-10 h-10 rounded-xl bg-white/10`

### 4.4 Category Grid (`CategoryGrid.tsx`)
- 6 كروت في grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`
- كل كارد: `egypt-card` مع صورة 4:3 + أيقونة SVG + اسم + عدد
- Gradient على الصورة: `from-black/55 via-transparent to-black/10`

### 4.5 How It Works (`HowItWorks.tsx`)
- 3 خطوات: `grid-cols-1 md:grid-cols-3`
- أيقونة في مربع `w-16 h-16 rounded-2xl bg-[#FAEDCD]` + border ذهبي
- رقم الخطوة: دائرة `w-7 h-7 rounded-full bg-[#E9C46A]` في الزاوية (`absolute -top-2 -right-2`)

### 4.6 Offer Section (`OfferSection.tsx`)
- 3 كروت عرض: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Badge أحمر: "-30%" مع `HiFire`
- سعر قديم: `line-through text-gray-400`
- سعر جديد: `text-2xl font-bold text-primary-500`
- Countdown timer: 4 مربعات `bg-primary-500 text-white`
- Progress bar: `bg-gradient-to-l from-[#E9C46A] to-[#F4A261]`
- زر "احجز العرض": `.btn-gold`

### 4.7 Testimonials (`Testimonials.tsx`)
- Avatar دائرية `w-16 h-16 rounded-full` بألوان متغيرة
- اقتباس بخط Amiri
- تقييم 5 نجوم (أيقونة `StarIcon`)
- أزرار تنقل (يمين/يسار) + dots
- Sliding animation: x: ±250px

### 4.8 About Section (`AboutSection.tsx`)
- **Split Layout**: Collage (يسار) + Content (يمين)
- **Collage**: 3 صور متداخلة
  - الصورة الكبرى: `w-[60%] aspect-[3/4]`, `rounded-3xl`, `border-4 border-white`
  - الصورة اليسرى العلوية: `w-[45%] aspect-square`, `rounded-3xl`, `border-4 border-white`
  - الصورة اليسرى السفلية: `w-[50%] aspect-video`, `rounded-3xl`, `border-4 border-white`
- خلفية القسم: `#FAEDCD`

### 4.9 Download App (`DownloadApp.tsx`)
- Content box مركزي مع radial gradients زخرفية
- زرين: App Store + Google Play — `bg-gray-900 text-white rounded-xl`
- أيقونات التطبيقات داخل الزر

---

## 5. الفوتر (`Footer.tsx`)

| العمود | المحتوى |
|--------|---------|
| 1 | الشعار + الوصف + أيقونات التواصل الاجتماعي (4) |
| 2 | روابط سريعة (الرئيسية، المدن، التصنيفات، العروض) |
| 3 | تصنيفات (مطاعم، كافيهات، أنشطة، فنادق) |
| 4 | اتصل بنا (بريد + هاتف) |

- الخلفية: `bg-primary-900`
- النصوص: `white/50` hover → `#E9C46A`
- أيقونات SVG جانبية لكل heading
- Footer bottom: border-top `white/8` مع حقوق النشر

---

## 6. الخريطة التفاعلية (Interactive Map)

> **⚠️ لم يتم تنفيذها بعد.**  
> المواصفات المطلوبة:
> - خريطة تفاعلية (Leaflet / Mapbox)
> - Tooltip عند hover على marker
> - Category Sidebar لتصفية المعالم
> - ربط مع API listings-service
> - نقطة تجميع للوجهات

---

## 7. أنماط عامة (Common Patterns)

### 7.1 Section Title System
```
.section-label ─── Poppins, 0.7rem, 600, tracking 0.2em, uppercase, #C8960C
.section-title ─── Cairo, 2.5rem, 800, #C8960C, بعدها خط 1px ذهبي (80px, centered)
.section-subtitle ─── 1rem, 300, #6b7280
```

### 7.2 Chip System
```
.chip ─── inline-flex, bg #FAEDCD, color #C8960C, rounded-full, 0.7rem, 700
.chip-gold ─── bg #E9C46A, color #1a1a2e
```

### 7.3 Lightbox
- `fixed inset-0 z-[100] bg-black/85 backdrop-blur-md`
- صورة `max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl`
- زر إغلاق في الزاوية اليسرى العليا

### 7.4 Parallax & Scroll Animations
- Framer Motion `useScroll` + `useTransform`
- `scrollYProgress` [0, 1] → `translateY` [0%, 30%]
- الهيرو يختفي تدريجيًا: `opacity` [1, 0] عند `scrollYProgress` [0, 0.45]

### 7.5 Glassmorphism Pattern
```css
background: rgba(255, 255, 255, 0.12);
backdrop-filter: blur(12px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.18);
```

---

## 8. قواعد صارمة (Hard Rules)

1. **الألوان:** استخدام الألوان من نظام التصميم فقط. ممنوع إضافة ألوان جديدة بدون توثيق.
2. **الخطوط:** فقط Cairo (عربي) و Poppins (إنجليزي) و Amiri (اقتباسات).
3. **الصور:** ممنوع استخدام صور غير موجودة في `ASSETS_INVENTORY.md`. كل مسار صورة لازم يكون موثق.
4. **الأيقونات:** استخدام أيقونات `EgyptianIcons.tsx` أو `react-icons/hi` فقط.
5. **RTL:** كل التخطيط يجب أن يدعم `direction: rtl` مع `text-align: right`.
6. **الاستجابة:** المكونات لازم تشتغل من 320px إلى 1920px.
7. **الأداء:** استخدام `loading="lazy"` لكل الصور.
8. **الرسوم المتحركة:** تفضيل `prefers-reduced-motion` (موجود في `globals.css`).
