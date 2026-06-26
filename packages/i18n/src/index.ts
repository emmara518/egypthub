// ============================================================
// مصر هب - Bilingual Translation System (AR / EN)
// ============================================================

export type Locale = 'ar' | 'en';

// كل النصوص هنا باللهجة المصرية (مش فصحى)
const translationsAr = {
  common: {
    loading: 'استنى شوية...', error: 'حصل خطأ، ارجع جرب تاني', success: 'تمام، تم بنجاح!',
    save: 'احفظ', cancel: 'إلغاء', delete: 'احذف', edit: 'عدل',
    search: 'دور', filter: 'فلتر', back: 'رجوع', next: 'كمل',
    confirm: 'أكيد', yes: 'أيوه', no: 'لأ', welcome: 'أهلًا بيك',
    logout: 'تسجيل خروج', login: 'تسجيل دخول', register: 'حساب جديد',
    phone: 'رقم الموبايل', password: 'كلمة السر', submit: 'تقديم',
    language: 'English', lang_label: 'EN',
  },
  nav: {
    home: 'الرئيسية', explore: 'اكتشف', offers: 'العروض',
    search: 'دوّر', dashboard: 'لوحة التحكم', profile: 'البروفايل',
    bookings: 'حجوزاتي', favorites: 'المفضلة', wallet: 'المحفظة',
    ai: 'الذكاء الاصطناعي', more: 'المزيد',
    close_search: 'إغلاق البحث', open_search: 'فتح البحث',
  },
  hero: {
    title: 'مصر على مزاجك',
    subtitle: 'جرب مصر بالطريقة الأصيلة. مطاعم، غوص، سفاري، وبازار - كل حاجة مع سفير مصري.',
    cta: 'اكتشف شرم الشيخ',
    search_placeholder: 'دوّر على مطعم، نشاط، أو مكان...',
  },
  categories: {
    restaurants: 'مطاعم', cafes: 'كافيهات', activities: 'أنشطة',
    hotels: 'فنادق', shopping: 'تسوق', transport: 'نقل',
    all: 'كل التصنيفات',
  },
  ai: {
    zainab: 'زينب — المساعد الذكي', advanced: 'المساعد المتقدم',
    budget: 'مخطط الميزانية', translator: 'المترجم الذكي',
    safety: 'السفر الآمن', follow_up: 'متابعة الرحلة',
  },
  header: {
    login_btn: 'دخول', register_btn: 'حساب جديد',
    egypt: 'مصر', hub: 'هب', subtitle: 'EGYPT HUB',
  },
  booking: {
    title: 'احجز مكانك', date: 'اختر اليوم', time: 'اختر الوقت',
    guests: 'عدد الأشخاص', notes: 'ملاحظات (اختياري)',
    total: 'الإجمالي', confirm_booking: 'أكد الحجز',
    pay_now: 'ادفع الآن', success_title: 'تم تأكيد حجزك بنجاح!',
    status_pending: 'تحت المراجعة', status_confirmed: 'مؤكد',
    status_completed: 'تم', status_cancelled: 'ملغي',
  },
  footer: {
    tagline: 'مصر هب - شبكة السفراء الرقمية للسياحة المصرية',
    rights: 'جميع الحقوق محفوظة © 2024 مصر هب',
    privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام',
  },
} as const;

const translationsEn = {
  common: {
    loading: 'Loading...', error: 'Something went wrong', success: 'Done successfully!',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
    search: 'Search', filter: 'Filter', back: 'Back', next: 'Next',
    confirm: 'Confirm', yes: 'Yes', no: 'No', welcome: 'Welcome',
    logout: 'Logout', login: 'Login', register: 'Register',
    phone: 'Phone Number', password: 'Password', submit: 'Submit',
    language: 'العربية', lang_label: 'AR',
  },
  nav: {
    home: 'Home', explore: 'Explore', offers: 'Offers',
    search: 'Search', dashboard: 'Dashboard', profile: 'Profile',
    bookings: 'My Bookings', favorites: 'Favorites', wallet: 'Wallet',
    ai: 'AI', more: 'More',
    close_search: 'Close search', open_search: 'Open search',
  },
  hero: {
    title: 'Egypt Your Way',
    subtitle: 'Experience Egypt authentically. Restaurants, diving, safaris, and bazaars — all with a local ambassador.',
    cta: 'Explore Sharm El-Sheikh',
    search_placeholder: 'Search restaurants, activities, places...',
  },
  categories: {
    restaurants: 'Restaurants', cafes: 'Cafes', activities: 'Activities',
    hotels: 'Hotels', shopping: 'Shopping', transport: 'Transport',
    all: 'All Categories',
  },
  ai: {
    zainab: 'Zainab — AI Assistant', advanced: 'Advanced Assistant',
    budget: 'Budget Planner', translator: 'Smart Translator',
    safety: 'Safe Travel', follow_up: 'Trip Follow-up',
  },
  header: {
    login_btn: 'Login', register_btn: 'Sign Up',
    egypt: 'Egypt', hub: 'Hub', subtitle: 'EGYPT HUB',
  },
  booking: {
    title: 'Book Now', date: 'Pick Date', time: 'Pick Time',
    guests: 'Number of Guests', notes: 'Notes (optional)',
    total: 'Total', confirm_booking: 'Confirm Booking',
    pay_now: 'Pay Now', success_title: 'Booking Confirmed!',
    status_pending: 'Pending', status_confirmed: 'Confirmed',
    status_completed: 'Completed', status_cancelled: 'Cancelled',
  },
  footer: {
    tagline: 'Egypt Hub — Digital Ambassador Network for Egyptian Tourism',
    rights: 'All rights reserved © 2024 Egypt Hub',
    privacy: 'Privacy Policy', terms: 'Terms of Use',
  },
} as const;

const allTranslations = { ar: translationsAr, en: translationsEn } as const;

type ArType = typeof translationsAr;
type DeepKey<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? DeepKey<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];
export type TranslationKey = DeepKey<ArType>;

function getNested(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function t(locale: Locale, path: TranslationKey, params?: Record<string, string | number>): string {
  const dict = allTranslations[locale] as unknown as Record<string, unknown>;
  let value = getNested(dict, path);

  if (params) {
    value = Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)),
      value,
    );
  }

  return value;
}

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
