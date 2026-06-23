// ============================================================
// مصر هب - الترجمة باللهجة المصرية
// ============================================================

// كل النصوص هنا باللهجة المصرية (مش فصحى)
const translations = {
  common: {
    loading: 'استنى شوية...',
    error: 'حصل خطأ، ارجع جرب تاني',
    success: 'تمام، تم بنجاح!',
    save: 'احفظ',
    cancel: 'ألفين سلامة',
    delete: 'احذف',
    edit: 'عدل',
    search: 'دور',
    filter: 'فلتر',
    back: 'رجوع',
    next: 'كمل',
    confirm: 'أكيد',
    yes: 'أيوه',
    no: 'لأ',
    welcome: 'أهلًا بيك',
    logout: 'تسجيل خروج',
    login: 'تسجيل دخول',
    register: 'حساب جديد',
    phone: 'رقم الموبايل',
    password: 'كلمة السر',
    submit: 'تقديم',
  },

  nav: {
    home: 'الرئيسية',
    explore: 'اكتشف',
    offers: 'العروض',
    partners: 'الشركاء',
    about: 'عن مصر هب',
    contact: 'كلمنا',
    dashboard: 'لوحة التحكم',
    profile: 'البروفايل',
    bookings: 'حجوزاتي',
  },

  hero: {
    title: 'مصر على مزاجك',
    subtitle: 'جرب مصر بالطريقة الأصيلة. مطاعم، غوص، سفاري، وبازار - كل حاجة مع سفير مصري.',
    cta: 'اكتشف شرم الشيخ',
    search_placeholder: 'دوّر على مطعم، نشاط، أو مكان...',
  },

  features: {
    ambassadors: 'سفراء مصريين',
    ambassadors_desc: 'ناس من البلد يعرفوك على أحلى الأماكن',
    authentic: 'تجربة أصيلة',
    authentic_desc: 'مش سياحة تقليدية، دي مصر الحقيقية',
    earn: 'اكسب كمان',
    earn_desc: 'سجّل سفير واكسب عمولة على كل حجز',
  },

  categories: {
    restaurants: 'مطاعم',
    cafes: 'كافيهات وقهوة بلدي',
    activities: 'أنشطة ومغامرات',
    shopping: 'تسوق وبازار',
    diving: 'غوص وسنوركلينج',
  },

  business: {
    about: 'عن المكان',
    offers: 'العروض',
    reviews: 'التقييمات',
    contact: 'اتصل بنا',
    location: 'الموقع',
    whatsapp: 'واتساب',
    call: 'اتصال',
    book_now: 'احجز دلوقتي',
    share: 'شارك',
    working_hours: 'مواعيد الشغل',
  },

  booking: {
    title: 'احجز مكانك',
    date: 'اختر اليوم',
    time: 'اختر الوقت',
    guests: 'عدد الأشخاص',
    notes: 'ملاحظات (اختياري)',
    total: 'الإجمالي',
    commission: 'خصم السفير',
    confirm_booking: 'أكد الحجز',
    success: 'تم الحجز! هنبعتلك كود الحجز على الموبايل',
    code: 'كود الحجز',
    qr: 'QR كود',
    status: {
      pending: 'تحت المراجعة',
      confirmed: 'مؤكد',
      completed: 'تم',
      cancelled: 'ملغي',
    },
  },

  ambassador: {
    dashboard: 'لوحة السفير',
    earnings: 'أرباحي',
    total_earnings: 'إجمالي الأرباح',
    available: 'المتاح للسحب',
    referral_link: 'الرابط بتاعي',
    copy_link: 'انسخ الرابط',
    copied: 'تم النسخ!',
    withdraw: 'طلب سحب',
    history: 'سجل الأرباح',
    no_earnings: 'لسه ما كسبتش حاجة. ابدأ شارك الرابط!',
    commission_rate: 'نسبة العمولة',
  },

  partner: {
    dashboard: 'لوحة الشريك',
    my_bookings: 'حجوزاتي',
    my_offers: 'عروضي',
    add_offer: 'ضيف عرض',
    business_info: 'بينات المنشأة',
    earnings: 'الأرباح',
    today_bookings: 'حجوزات النهاردة',
    total_bookings: 'كل الحجوزات',
  },

  admin: {
    dashboard: 'لوحة الأدمن',
    pending_partners: 'شركاء في الانتظار',
    manage_partners: 'إدارة الشركاء',
    manage_ambassadors: 'إدارة السفراء',
    commission_settings: 'إعدادات العمولات',
    cities: 'المدن',
    categories: 'التصنيفات',
    app_settings: 'إعدادات التطبيق',
    approve: 'وافقت',
    reject: 'مرفوض',
    suspend: 'إيقاف',
  },

  auth: {
    login_title: 'أهلاً بيك تاني',
    register_title: 'أنشئ حسابك',
    otp_sent: 'كود التفعيل اتبعت لـ',
    otp_placeholder: 'اكتب الكود',
    verify: 'تأكيد',
    resend: 'ابعته تاني',
    terms: 'بالتسجيل أنا موافق على شروط الاستخدام',
    role_user: 'زائر',
    role_partner: 'شريك (صاحب منشأة)',
    role_ambassador: 'سفير',
    role_admin: 'أدمن',
  },

  footer: {
    tagline: 'مصر هب - شبكة السفراء الرقمية للسياحة المصرية',
    rights: 'جميع الحقوق محفوظة © 2024 مصر هب',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
  },
} as const;

export type TranslationKey = keyof typeof translations;
export type SectionKey<T extends TranslationKey> = keyof (typeof translations)[T];

export function t<T extends TranslationKey>(
  section: T,
  key: SectionKey<T>,
  params?: Record<string, string | number>,
): string {
  const value = (translations[section] as any)?.[key];
  if (!value) return `${section}.${String(key)}`;

  if (params) {
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)),
      value,
    );
  }

  return value;
}

export default translations;
