'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { submitPartnerApplication } from '@/lib/network';
import type { PartnerCategory } from '@/lib/network';

const categories: { value: PartnerCategory; label: string }[] = [
  { value: 'Hotel', label: 'فندق' },
  { value: 'Resort', label: 'منتجع' },
  { value: 'Restaurant', label: 'مطعم' },
  { value: 'Dive Center', label: 'مركز غوص' },
  { value: 'Tour Operator', label: 'منظم رحلات' },
  { value: 'Transportation', label: 'مواصلات' },
  { value: 'Shopping', label: 'تسوق' },
  { value: 'Experience Provider', label: 'مقدم تجارب' },
];

const cities = [
  { value: 'cairo', label: 'القاهرة' },
  { value: 'alexandria', label: 'الإسكندرية' },
  { value: 'luxor', label: 'الأقصر' },
  { value: 'aswan', label: 'أسوان' },
  { value: 'hurghada', label: 'الغردقة' },
  { value: 'sharm-el-sheikh', label: 'شرم الشيخ' },
  { value: 'dahab', label: 'دهب' },
  { value: 'siwa', label: 'سيوة' },
];

const serviceOptions = [
  'إقامة فاخرة', 'مطاعم عالمية', 'جولات سياحية', 'منتجع صحي',
  'غوص', 'رياضات مائية', 'نقل سياحي', 'تسوق', 'رحلات سفاري',
  'جولات أثرية', 'سبا', 'نادي أطفال', 'خدمة غرف', 'واي فاي',
  'حفلات خاصة', 'مؤتمرات', 'جولات نيلية', 'أنشطة عائلية',
  'دليفري', 'خدمة عملاء',
];

const stepLabels = ['معلومات النشاط', 'الخدمات والتواصل', 'المراجعة والإرسال'];

interface Step1Data {
  name: string;
  nameEn: string;
  category: PartnerCategory | '';
  city: string;
  description: string;
}

interface Step2Data {
  services: string[];
  email: string;
  phone: string;
  website: string;
  address: string;
}

export default function JoinPartnerPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({
    name: '', nameEn: '', category: '', city: '', description: '',
  });
  const [step2, setStep2] = useState<Step2Data>({
    services: [], email: '', phone: '', website: '', address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!step1.name.trim()) e.name = 'حقل مطلوب';
    if (!step1.nameEn.trim()) e.nameEn = 'حقل مطلوب';
    if (!step1.category) e.category = 'اختر تصنيفاً';
    if (!step1.city) e.city = 'اختر مدينة';
    if (!step1.description.trim()) e.description = 'حقل مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!step2.email.trim()) e.email = 'حقل مطلوب';
    if (!step2.phone.trim()) e.phone = 'حقل مطلوب';
    if (!step2.address.trim()) e.address = 'حقل مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateStep1()) setStep(1);
    else if (step === 1 && validateStep2()) setStep(2);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!step1.category) return;
    submitPartnerApplication({
      name: step1.name,
      nameEn: step1.nameEn,
      category: step1.category as PartnerCategory,
      city: step1.city,
      description: step1.description,
      descriptionEn: step1.nameEn,
      contactEmail: step2.email,
      contactPhone: step2.phone,
      website: step2.website,
      address: step2.address,
      coordinates: { lat: 0, lng: 0 },
      featured: false,
      rating: 0,
      services: step2.services,
      gallery: [],
      ambassadorIds: [],
    });
    setSubmitted(true);
  };

  const toggleService = (s: string) => {
    setStep2((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((v) => v !== s)
        : [...prev.services, s],
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto mb-5">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold font-playfair text-theme mb-3">تم استلام طلبك!</h2>
          <p className="text-theme-secondary font-cairo mb-8">سنتواصل معك قريباً</p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/90"
          >
            العودة للشركاء
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/partners" className="inline-flex items-center gap-2 text-theme-gold font-cairo text-sm hover:underline">
            ← العودة للشركاء
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-2">انضم كشريك</h1>
          <p className="text-theme-secondary font-cairo">كن جزءاً من شبكة EGYPTHUB السياحية</p>
        </motion.div>

        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-cairo transition-all ${
                i <= step ? 'bg-theme-gold text-dark-900' : 'bg-theme-card text-theme-muted border border-theme-gold/15'
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs font-cairo hidden sm:block ${i <= step ? 'text-theme' : 'text-theme-muted'}`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-theme-gold/60' : 'bg-theme-gold/10'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-4"
            >
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">معلومات النشاط التجاري</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">اسم النشاط بالعربية *</label>
                  <input
                    type="text"
                    value={step1.name}
                    onChange={(e) => setStep1({ ...step1, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="مثال: مطعم أبو السيد"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">اسم النشاط بالإنجليزية *</label>
                  <input
                    type="text"
                    value={step1.nameEn}
                    onChange={(e) => setStep1({ ...step1, nameEn: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="Ex: Abou El Sid"
                   
                  />
                  {errors.nameEn && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.nameEn}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">التصنيف *</label>
                  <select
                    value={step1.category}
                    onChange={(e) => setStep1({ ...step1, category: e.target.value as PartnerCategory })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm focus:outline-none focus:border-theme-gold/40"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">المدينة *</label>
                  <select
                    value={step1.city}
                    onChange={(e) => setStep1({ ...step1, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm focus:outline-none focus:border-theme-gold/40"
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.city}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-cairo text-theme mb-1.5">الوصف *</label>
                <textarea
                  value={step1.description}
                  onChange={(e) => setStep1({ ...step1, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 resize-none"
                  placeholder="صف نشاطك التجاري..."
                />
                {errors.description && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.description}</p>}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-4"
            >
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">الخدمات ومعلومات التواصل</h2>
              <div>
                <label className="block text-xs font-cairo text-theme mb-2">الخدمات المقدمة</label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => {
                    const selected = step2.services.includes(s);
                    return (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleService(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-cairo transition-all ${
                          selected
                            ? 'bg-theme-gold text-dark-900 font-semibold'
                            : 'bg-theme-bg border border-theme-gold/10 text-theme-secondary hover:border-theme-gold/30'
                        }`}
                      >
                        {s}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    value={step2.email}
                    onChange={(e) => setStep2({ ...step2, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="info@example.com"
                   
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">رقم الهاتف *</label>
                  <input
                    type="tel"
                    value={step2.phone}
                    onChange={(e) => setStep2({ ...step2, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="+20xxxxxxxxx"
                   
                  />
                  {errors.phone && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">الموقع الإلكتروني</label>
                  <input
                    type="url"
                    value={step2.website}
                    onChange={(e) => setStep2({ ...step2, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="https://example.com"
                   
                  />
                </div>
                <div>
                  <label className="block text-xs font-cairo text-theme mb-1.5">العنوان *</label>
                  <input
                    type="text"
                    value={step2.address}
                    onChange={(e) => setStep2({ ...step2, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40"
                    placeholder="مثال: 15 شارع السيد، وسط البلد"
                  />
                  {errors.address && <p className="text-red-400 text-[10px] font-cairo mt-1">{errors.address}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-5"
            >
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">مراجعة الطلب</h2>
              <div className="space-y-4">
                <div className="rounded-xl bg-theme-bg p-4">
                  <h3 className="text-xs font-bold text-theme-gold font-cairo mb-3">معلومات النشاط</h3>
                  <div className="space-y-2 text-sm font-cairo">
                    <div className="flex justify-between"><span className="text-theme-muted">الاسم:</span><span className="text-theme">{step1.name}</span></div>
                    <div className="flex justify-between"><span className="text-theme-muted">Name:</span><span className="text-theme">{step1.nameEn}</span></div>
                    <div className="flex justify-between"><span className="text-theme-muted">التصنيف:</span><span className="text-theme">{categories.find((c) => c.value === step1.category)?.label}</span></div>
                    <div className="flex justify-between"><span className="text-theme-muted">المدينة:</span><span className="text-theme">{cities.find((c) => c.value === step1.city)?.label}</span></div>
                  </div>
                </div>
                <div className="rounded-xl bg-theme-bg p-4">
                  <h3 className="text-xs font-bold text-theme-gold font-cairo mb-3">الخدمات والتواصل</h3>
                  <div className="space-y-2 text-sm font-cairo">
                    <div className="flex justify-between">
                      <span className="text-theme-muted">الخدمات:</span>
                      <span className="text-theme text-left">{step2.services.length > 0 ? step2.services.join(' - ') : 'لا توجد'}</span>
                    </div>
                    <div className="flex justify-between"><span className="text-theme-muted">البريد:</span><span className="text-theme">{step2.email}</span></div>
                    <div className="flex justify-between"><span className="text-theme-muted">الهاتف:</span><span className="text-theme">{step2.phone}</span></div>
                    {step2.website && <div className="flex justify-between"><span className="text-theme-muted">الموقع:</span><span className="text-theme-gold text-left">{step2.website}</span></div>}
                    <div className="flex justify-between"><span className="text-theme-muted">العنوان:</span><span className="text-theme text-left">{step2.address}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            disabled={step === 0}
            className={`px-6 py-3 rounded-xl text-sm font-bold font-cairo transition-all ${
              step === 0
                ? 'bg-theme-card text-theme-muted cursor-not-allowed'
                : 'bg-theme-card border border-theme-gold/15 text-theme hover:border-theme-gold/30'
            }`}
          >
            السابق
          </motion.button>
          {step < 2 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90"
            >
              التالي
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90"
            >
              إرسال الطلب
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
