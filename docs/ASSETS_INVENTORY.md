# مصر هب — فهرسة الأصول (Assets Inventory)

> **آخر تحديث:** 22 يونيو 2026  
> **المسار المرجعي:** `C:\SharmsGo\egypthub\`

---

## 1. الصور المحلية (Local Assets)

### 1.1 أيقونات SVG — `apps/web/public/images/businesses/`

| الملف | النوع | الأبعاد | الاستخدام |
|-------|-------|---------|-----------|
| `dive-placeholder.svg` | SVG | 400×300 | Placeholder للغوص — `#0D3B66` + `🤿` ذهبي |
| `restaurant-placeholder.svg` | SVG | 400×300 | Placeholder للمطاعم — `#0D3B66` + `🍽` ذهبي |

### 1.2 صور JPG — `apps/web/public/images/businesses/`

| الملف | النوع | ملاحظات |
|-------|-------|---------|
| `Sharm El-Sheikh.jpg` | JPEG | ⚠️ اسم بمسافة — يحتاج إعادة تسمية |

---

## 2. مسارات صور وهمية — `screens/` (ممنوع استخدامها)

المكونات في `components/screens/` تستخدم مسارات غير موجودة. **ممنوع استخدامها إلا بعد إنشاء الصور.**

| المسار الوهمي | الملفات المستخدمة فيها |
|---------------|----------------------|
| `/images/egypt/pyramids.png` | Screen1, Screen2, Screen3, Screen4, Screen6 |
| `/images/egypt/nile.png` | Screen1, Screen2, Screen3, Screen4, Screen5, Screen6 |
| `/images/egypt/luxor.png` | Screen1, Screen2, Screen3, Screen4, Screen5, Screen6 |
| `/images/egypt/desert.png` | Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7 |
| `/images/egypt/cairo.png` | Screen1, Screen2, Screen3, Screen4, Screen6 |
| `/images/egypt/redsea.png` | Screen1, Screen2, Screen3, Screen4, Screen5, Screen6 |

---

## 3. صور Unsplash المستخدمة (موجودة في `components/`)

### Hero.tsx (7 صور)
| الوجهة | الرابط |
|--------|--------|
| شرم الشيخ | `https://images.unsplash.com/photo-1590075899396-1e311e1e9b9a?w=1920&q=85` |
| الأقصر | `https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1920&q=85` |
| أسوان | `https://images.unsplash.com/photo-1566144999429-0efd197474d0?w=1920&q=85` |
| الإسكندرية | `https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1920&q=85` |
| الغردقة | `https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1920&q=85` |
| القاهرة | `https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1920&q=85` |
| سيوة | `https://images.unsplash.com/photo-1591025207163-942350e47db4?w=1920&q=85` |

### AboutSection.tsx (3)
| المشهد | الرابط |
|--------|--------|
| شرم الشيخ | `https://images.unsplash.com/photo-1590075899396-1e311e1e9b9a?w=600&q=85` |
| القاهرة | `https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=85` |
| الأقصر | `https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=85` |

### DestinationIntro.tsx (5)
شرم الشيخ، القاهرة، الأقصر، الغردقة، الساحل الشمالي

### CityWheel.tsx (6)
شرم الشيخ، الغردقة، القاهرة، الأقصر، الإسكندرية، الساحل الشمالي

### FeaturedBusinesses.tsx (6)
فريدي للغوص، البوابة للمأكولات، سهارى سفاري، مقهى النيل، خان الخليلي، كورال ريزورت

### CategoryGrid.tsx (6)
مطاعم، كافيهات، أنشطة، فنادق، تسوق، نقل

### OfferSection.tsx (3)
غوص، عشاء نيل، أهرامات

---

## 4. أيقونات SVG داخلية

معرفة في `EgyptianIcons.tsx`:
`SunIcon`, `WaveIcon`, `PalmIcon`, `PyramidIcon`, `LotusIcon`, `CompassIcon`, `StarIcon`

كلها تستخدم `stroke="#E9C46A"`, `strokeWidth="1.5"`, `fill="none"`.

---

## 5. TODO — الأصول المطلوب إنشاؤها

- [ ] **إنشاء مجلد** `public/images/egypt/` — للصور المصرية
- [ ] **صور مطلوبة للمسارات الوهمية في `screens/`:**
  - `pyramids.png` — أهرامات الجيزة
  - `nile.png` — نهر النيل
  - `luxor.png` — معابد الأقصر
  - `desert.png` — الصحراء المصرية
  - `cairo.png` — القاهرة
  - `redsea.png` — البحر الأحمر
- [ ] **استبدال صور Unsplash بصور محلية** (جميع الـ 7 مكونات)
- [ ] **نقل ملفات ChatGPT PNG** من الجذر إلى `docs/mockups/`
- [ ] **إعادة تسمية** `Sharm El-Sheikh.jpg` → `sharm-el-sheikh.jpg`
- [ ] **إضافة صورة أسوان** — موجودة في Hero.tsx ولكن لا يوجد ملف
- [ ] **إضافة صورة سيوة** — موجودة في Hero.tsx ولكن لا يوجد ملف
