-- ============================================================
-- مصر هب - EgyptHub
-- قاعدة البيانات الأساسية + البيانات التجريبية
-- اللهجة المصرية في الأسماء والتعليقات
-- ============================================================

BEGIN;

-- ===== 1. إنشاء Extension =====
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===== 2. نوع الدور (enum) =====
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'partner', 'ambassador', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ===== 3. نوع حالة الحجز =====
DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ===== 4. نوع حالة المنشأة =====
DO $$ BEGIN
  CREATE TYPE business_status AS ENUM ('pending', 'active', 'rejected', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ===== 5. الجداول =====

-- 5.1. المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  password_hash VARCHAR(255),
  role user_role NOT NULL DEFAULT 'user',
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.2. المدن
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.3. التصنيفات (وسوم)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(50),
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.4. المنشآت (مطاعم، كافيهات، أنشطة، بازار)
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  name_ar VARCHAR(200) NOT NULL,
  name_en VARCHAR(200),
  description_ar TEXT NOT NULL,
  description_en TEXT,
  slug VARCHAR(200) UNIQUE NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  address_ar TEXT,
  address_en TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  images TEXT[] DEFAULT '{}',
  cover_image VARCHAR(500),
  status business_status NOT NULL DEFAULT 'pending',
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  is_featured BOOLEAN DEFAULT FALSE,
  working_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.5. ربط المنشآت بالتصنيفات
CREATE TABLE IF NOT EXISTS business_categories (
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (business_id, category_id)
);

-- 5.6. العروض
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  title_ar VARCHAR(200) NOT NULL,
  title_en VARCHAR(200),
  description_ar TEXT,
  description_en TEXT,
  original_price DECIMAL(10,2) NOT NULL,
  offer_price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EGP',
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  max_bookings INT DEFAULT 100,
  current_bookings INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  image_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_price CHECK (offer_price < original_price)
);

-- 5.7. السفراء
CREATE TABLE IF NOT EXISTS ambassadors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  bio_ar TEXT,
  bio_en TEXT,
  city_id UUID REFERENCES cities(id),
  is_approved BOOLEAN DEFAULT FALSE,
  total_earnings DECIMAL(12,2) DEFAULT 0.00,
  available_balance DECIMAL(12,2) DEFAULT 0.00,
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.8. أرباح السفراء
CREATE TABLE IF NOT EXISTS ambassador_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID NOT NULL REFERENCES ambassadors(id) ON DELETE CASCADE,
  booking_id UUID,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  description_ar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.9. طلبات سحب الأرباح
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ambassador_id UUID NOT NULL REFERENCES ambassadors(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  bank_account_ar TEXT,
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.10. الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  business_id UUID NOT NULL REFERENCES businesses(id),
  offer_id UUID REFERENCES offers(id),
  ambassador_id UUID REFERENCES ambassadors(id),
  booking_code VARCHAR(20) UNIQUE NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0.00,
  guest_count INT DEFAULT 1,
  booking_date DATE NOT NULL,
  booking_time TIME,
  notes TEXT,
  qr_code VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5.11. التقييمات
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  business_id UUID NOT NULL REFERENCES businesses(id),
  booking_id UUID REFERENCES bookings(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment_ar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id, booking_id)
);

-- ===== 6. الفهارس =====
CREATE INDEX idx_businesses_city ON businesses(city_id);
CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_offers_business ON offers(business_id);
CREATE INDEX idx_offers_active ON offers(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_business ON bookings(business_id);
CREATE INDEX idx_bookings_ambassador ON bookings(ambassador_id);
CREATE INDEX idx_bookings_code ON bookings(booking_code);
CREATE INDEX idx_ambassadors_code ON ambassadors(referral_code);
CREATE INDEX idx_reviews_business ON reviews(business_id);
CREATE INDEX idx_cities_slug ON cities(slug);

-- ===== 7. البيانات التجريبية (Seeder) =====

-- 7.1. مدينة شرم الشيخ (نشطة)
INSERT INTO cities (id, name_ar, name_en, slug, description_ar, description_en, image_url, is_active) VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'شرم الشيخ',
  'Sharm El Sheikh',
  'sharm-el-sheikh',
  'مدينة السلام على البحر الأحمر، أجمل وجهات الغوص في العالم.',
  'The city of peace on the Red Sea, one of the best diving destinations in the world.',
  '/images/cities/sharm.jpg',
  TRUE
);

-- 7.2. التصنيفات
INSERT INTO categories (id, name_ar, name_en, slug, icon, sort_order) VALUES
('c0000001-0000-0000-0000-000000000001', 'مطاعم', 'Restaurants', 'restaurants', 'utensils', 1),
('c0000001-0000-0000-0000-000000000002', 'كافيهات', 'Cafes', 'cafes', 'coffee', 2),
('c0000001-0000-0000-0000-000000000003', 'أنشطة ومغامرات', 'Activities', 'activities', 'compass', 3),
('c0000001-0000-0000-0000-000000000004', 'تسوق وبازار', 'Shopping', 'shopping', 'shopping-bag', 4),
('c0000001-0000-0000-0000-000000000005', 'غوص و snorkeling', 'Diving', 'diving', 'waves', 5);

-- 7.3. المستخدمين (كلمة السر: 123456 مشفرة بـ bcrypt)
-- كلمة السر: 12345678
INSERT INTO users (id, phone, name, email, password_hash, role, is_verified) VALUES
(
  'u0000000-0000-0000-0000-000000000001',
  '01000000000',
  'أحمد الأدمن',
  'admin@egypthub.com',
  crypt('Admin@123456', gen_salt('bf', 10)),
  'admin',
  TRUE
),
(
  'u0000000-0000-0000-0000-000000000002',
  '01011111111',
  'محمد الشريك',
  'partner@egypthub.com',
  crypt('Partner@123456', gen_salt('bf', 10)),
  'partner',
  TRUE
),
(
  'u0000000-0000-0000-0000-000000000003',
  '01022222222',
  'نور السفيرة',
  'ambassador@egypthub.com',
  crypt('Ambassador@123456', gen_salt('bf', 10)),
  'ambassador',
  TRUE
);

-- 7.4. المنشآت (5 منشآت مصرية)
INSERT INTO businesses (id, owner_id, city_id, name_ar, name_en, description_ar, slug, phone, whatsapp, address_ar, status, commission_rate, is_featured, images, cover_image) VALUES
(
  'b0000000-0000-0000-0000-000000000001',
  'u0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'فول وفلافل أبو العلا',
  'Abou El Ala Fool & Falafel',
  'أقدم مطعم فول وفلافل في شرم الشيخ. فول بلدي بالليمون والطحينة، فلافل مقرمشة، طعم مصر الأصيل.',
  'abou-el-ala-fool',
  '0693601000',
  '01011111112',
  'شارع السلام، منطقة النخيل',
  'active', 8.00, TRUE,
  ARRAY['/images/businesses/fool-1.jpg', '/images/businesses/fool-2.jpg'],
  '/images/businesses/fool-cover.jpg'
),
(
  'b0000000-0000-0000-0000-000000000002',
  'u0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'سمك رزق البحر',
  'Rizk El-Bahr Seafood',
  'أطعم مشويات بحرية في شرم. جمبري مشوي، كابوريا، سبيط، وكل حاجة طازة من البحر للصحن.',
  'rizk-el-bahr-seafood',
  '0693602000',
  '01011111113',
  'الكورنيش، أمام ميدان سوهو',
  'active', 12.00, TRUE,
  ARRAY['/images/businesses/seafood-1.jpg'],
  '/images/businesses/seafood-cover.jpg'
),
(
  'b0000000-0000-0000-0000-000000000003',
  'u0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'قهوة سي سلام بلدي',
  'See Salam Balady Cafe',
  'قهوة بلدي على البحر. شيشة، كركديه، قصب، وأجمل غروب في شرم الشيخ.',
  'see-salam-balady',
  '0693603000',
  '01011111114',
  'شاطئ السلام، طريق الفنار',
  'active', 10.00, FALSE,
  ARRAY['/images/businesses/cafe-1.jpg'],
  '/images/businesses/cafe-cover.jpg'
),
(
  'b0000000-0000-0000-0000-000000000004',
  'u0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'ديف دايف للغوص',
  'Deep Dive Center',
  'مركز غوص معتمد دولي. غوص في راس محمد، تيران، وصنافير. للمبتدئين والمحترفين.',
  'deep-dive-center',
  '0693604000',
  '01011111115',
  'منطقة الغوص القديمة، خليج نعمة',
  'active', 15.00, TRUE,
  ARRAY['/images/businesses/dive-1.jpg', '/images/businesses/dive-2.jpg'],
  '/images/businesses/dive-cover.jpg'
),
(
  'b0000000-0000-0000-0000-000000000005',
  'u0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'بازار خان الخليلي',
  'Khan El-Khalili Bazaar',
  'أجمل المشغولات اليدوية المصرية. فضة، نحاس، كارتيه، هدايا تذكارية، كل حاجة من مصر.',
  'khan-el-khalili-bazaar',
  '0693605000',
  '01011111116',
  'شارع السوق القديم، خليج نعمة',
  'active', 10.00, FALSE,
  ARRAY['/images/businesses/bazaar-1.jpg'],
  '/images/businesses/bazaar-cover.jpg'
);

-- 7.5. ربط المنشآت بالتصنيفات
INSERT INTO business_categories (business_id, category_id) VALUES
('b0000000-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000003'),
('b0000000-0000-0000-0000-000000000005', 'c0000001-0000-0000-0000-000000000004');

-- 7.6. العروض (2 عروض)
INSERT INTO offers (id, business_id, title_ar, description_ar, original_price, offer_price, valid_from, valid_until, max_bookings, is_active) VALUES
(
  'o0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  'فطور مصري كامل - عرض السفير',
  'فول، طعمية، جبنة، عسل، بيض، شاي. فطور مصري أصيل يكفي شخصين.',
  250.00, 150.00,
  NOW(), NOW() + INTERVAL '90 days',
  200, TRUE
),
(
  'o0000000-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000004',
  'رحلة غوص يوم كامل - خصم السفير',
  'غوص مكانين في راس محمد، غداء، مشروبات، معدات. صحبة مرشد مصري.',
  2500.00, 1800.00,
  NOW(), NOW() + INTERVAL '60 days',
  50, TRUE
);

-- 7.7. السفير
INSERT INTO ambassadors (id, user_id, referral_code, bio_ar, city_id, is_approved, commission_rate) VALUES
(
  'a0000000-0000-0000-0000-000000000002',
  'u0000000-0000-0000-0000-000000000003',
  'NORSHARM',
  'بنت شرم الشيخ. بعشق البحر والغوص وبحب أوري الناس جمال مصر.',
  'a0000000-0000-0000-0000-000000000001',
  TRUE, 7.00
);

COMMIT;
