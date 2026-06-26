export type Locale = 'ar' | 'en';

const translationsAr = {
  common: { loading: 'استنى شوية...', error: 'حصل خطأ، ارجع جرب تاني', success: 'تمام، تم بنجاح!',
    save: 'احفظ', cancel: 'إلغاء', delete: 'احذف', edit: 'عدل',
    search: 'دور', filter: 'فلتر', back: 'رجوع', next: 'كمل',
    confirm: 'أكيد', yes: 'أيوه', no: 'لأ', welcome: 'أهلًا بيك',
    logout: 'تسجيل خروج', login: 'تسجيل دخول', register: 'حساب جديد',
    phone: 'رقم الموبايل', password: 'كلمة السر', submit: 'تقديم',
    language: 'English', lang_label: 'EN',
  },
  nav: { home: 'الرئيسية', explore: 'اكتشف', offers: 'العروض',
    search: 'دوّر', dashboard: 'لوحة التحكم', profile: 'البروفايل',
    bookings: 'حجوزاتي', favorites: 'المفضلة', wallet: 'المحفظة',
    ai: 'الذكاء الاصطناعي', more: 'المزيد',
    close_search: 'إغلاق البحث', open_search: 'فتح البحث',
  },
  categories: { restaurants: 'مطاعم', cafes: 'كافيهات', activities: 'أنشطة',
    hotels: 'فنادق', shopping: 'تسوق', transport: 'نقل', all: 'كل التصنيفات',
  },
  ai: { zainab: 'زينب — المساعد الذكي', advanced: 'المساعد المتقدم',
    budget: 'مخطط الميزانية', translator: 'المترجم الذكي',
    safety: 'السفر الآمن', follow_up: 'متابعة الرحلة',
  },
  header: { login_btn: 'دخول', register_btn: 'حساب جديد',
    egypt: 'مصر', hub: 'هب', subtitle: 'EGYPT HUB',
  },
} as const;

const translationsEn = {
  common: { loading: 'Loading...', error: 'Something went wrong', success: 'Done successfully!',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
    search: 'Search', filter: 'Filter', back: 'Back', next: 'Next',
    confirm: 'Confirm', yes: 'Yes', no: 'No', welcome: 'Welcome',
    logout: 'Logout', login: 'Login', register: 'Sign Up',
    phone: 'Phone Number', password: 'Password', submit: 'Submit',
    language: 'العربية', lang_label: 'AR',
  },
  nav: { home: 'Home', explore: 'Explore', offers: 'Offers',
    search: 'Search', dashboard: 'Dashboard', profile: 'Profile',
    bookings: 'My Bookings', favorites: 'Favorites', wallet: 'Wallet',
    ai: 'AI', more: 'More',
    close_search: 'Close search', open_search: 'Open search',
  },
  categories: { restaurants: 'Restaurants', cafes: 'Cafes', activities: 'Activities',
    hotels: 'Hotels', shopping: 'Shopping', transport: 'Transport', all: 'All Categories',
  },
  ai: { zainab: 'Zainab — AI Assistant', advanced: 'Advanced Assistant',
    budget: 'Budget Planner', translator: 'Smart Translator',
    safety: 'Safe Travel', follow_up: 'Trip Follow-up',
  },
  header: { login_btn: 'Login', register_btn: 'Sign Up',
    egypt: 'Egypt', hub: 'Hub', subtitle: 'EGYPT HUB',
  },
} as const;

const all = { ar: translationsAr, en: translationsEn } as const;

type NestedKeyOf<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? NestedKeyOf<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];
export type TranslationKey = NestedKeyOf<typeof translationsAr>;

function getNested(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else return path;
  }
  return typeof current === 'string' ? current : path;
}

export function t(locale: Locale, path: TranslationKey, params?: Record<string, string | number>): string {
  const dict = all[locale] as unknown as Record<string, unknown>;
  let value = getNested(dict, path);
  if (params) {
    value = Object.entries(params).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), value);
  }
  return value;
}

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
