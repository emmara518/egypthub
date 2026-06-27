'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';

const categories = [
  { value: 'HISTORICAL', label: 'نشاط' },
  { value: 'WATER_SPORTS', label: 'رياضات مائية' },
  { value: 'ADVENTURE', label: 'مغامرات' },
  { value: 'NILE', label: 'نيل' },
  { value: 'WELLNESS', label: 'استجمام' },
  { value: 'CULTURE', label: 'ثقافة' },
  { value: 'FOOD', label: 'طعام' },
];

interface FormState {
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  locationCity: string;
  priceEgp: string;
  priceUsd: string;
  durationHours: string;
  maxParticipants: string;
}

const initialForm: FormState = {
  slug: '',
  titleAr: '',
  titleEn: '',
  descriptionAr: '',
  descriptionEn: '',
  category: 'HISTORICAL',
  locationCity: '',
  priceEgp: '',
  priceUsd: '',
  durationHours: '',
  maxParticipants: '',
};

export default function NewExperiencePage() {
  const { user, isAuthenticated, isLoading: authLoading, checkAuth } = useAuthStore();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ slug: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.slug.trim()) newErrors.slug = 'الرابط المختصر مطلوب';
    if (!form.titleAr.trim()) newErrors.titleAr = 'الاسم بالعربية مطلوب';
    if (!form.priceEgp.trim() || isNaN(Number(form.priceEgp))) newErrors.priceEgp = 'السعر بالجنيه مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError(null);
    try {
      const body = {
        slug: form.slug.trim(),
        titleAr: form.titleAr.trim(),
        titleEn: form.titleEn.trim() || null,
        descriptionAr: form.descriptionAr.trim(),
        descriptionEn: form.descriptionEn.trim() || null,
        category: form.category,
        locationCity: form.locationCity.trim(),
        priceEgp: parseFloat(form.priceEgp),
        priceUsd: form.priceUsd.trim() ? parseFloat(form.priceUsd) : null,
        durationHours: form.durationHours.trim() ? parseFloat(form.durationHours) : null,
        maxParticipants: form.maxParticipants.trim() ? parseInt(form.maxParticipants, 10) : null,
      };
      const res = await fetch('/api/provider/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setApiError(json.error || json.message || 'فشل في إنشاء التجربة');
        return;
      }
      setSuccess({ slug: json.data?.slug || json.slug || form.slug });
    } catch {
      setApiError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-theme mb-4">يرجى تسجيل الدخول</h1>
          <Link href="/auth/login" className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-playfair font-bold text-theme mb-3">تم إنشاء التجربة بنجاح!</h1>
          <p className="text-theme-secondary font-cairo mb-8">يمكنك الآن الاطلاع على تجربتك الجديدة</p>
          <Link
            href={`/experiences/${success.slug}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90"
          >
            عرض التجربة
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 transition-colors';
  const labelClass = 'block text-sm font-bold font-cairo text-theme mb-1.5';
  const errorClass = 'text-red-400 text-xs font-cairo mt-1';

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/provider/dashboard" className="inline-flex items-center gap-2 text-theme-gold font-cairo text-sm hover:underline mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            العودة للوحة التحكم
          </Link>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-2">إضافة تجربة جديدة</h1>
          <p className="text-theme-secondary font-cairo">قم بإنشاء تجربة جديدة لعرضها للمسافرين</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {apiError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-cairo">
              {apiError}
            </div>
          )}

          <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-5">
            <h2 className="text-lg font-bold font-playfair text-theme">المعلومات الأساسية</h2>

            <div>
              <label className={labelClass}>الرابط المختصر *</label>
              <input type="text" value={form.slug} onChange={(e) => setField('slug', e.target.value)} placeholder="experience-slug" className={inputClass} />
              {errors.slug && <p className={errorClass}>{errors.slug}</p>}
            </div>

            <div>
              <label className={labelClass}>الاسم بالعربية *</label>
              <input type="text" value={form.titleAr} onChange={(e) => setField('titleAr', e.target.value)} placeholder="اسم التجربة" className={inputClass} />
              {errors.titleAr && <p className={errorClass}>{errors.titleAr}</p>}
            </div>

            <div>
              <label className={labelClass}>الاسم بالإنجليزية</label>
              <input type="text" value={form.titleEn} onChange={(e) => setField('titleEn', e.target.value)} placeholder="Experience name" className={inputClass} dir="ltr" />
            </div>

            <div>
              <label className={labelClass}>الوصف بالعربية</label>
              <textarea value={form.descriptionAr} onChange={(e) => setField('descriptionAr', e.target.value)} placeholder="وصف التجربة" rows={4} className={inputClass + ' resize-none'} />
            </div>

            <div>
              <label className={labelClass}>الوصف بالإنجليزية</label>
              <textarea value={form.descriptionEn} onChange={(e) => setField('descriptionEn', e.target.value)} placeholder="Experience description" rows={4} className={inputClass + ' resize-none'} dir="ltr" />
            </div>
          </div>

          <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-5">
            <h2 className="text-lg font-bold font-playfair text-theme">التفاصيل</h2>

            <div>
              <label className={labelClass}>التصنيف</label>
              <select value={form.category} onChange={(e) => setField('category', e.target.value)} className={inputClass}>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>المدينة</label>
              <input type="text" value={form.locationCity} onChange={(e) => setField('locationCity', e.target.value)} placeholder="الغردقة، القاهرة..." className={inputClass} />
            </div>
          </div>

          <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 space-y-5">
            <h2 className="text-lg font-bold font-playfair text-theme">التسعير والسعة</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>السعر بالجنيه *</label>
                <input type="number" value={form.priceEgp} onChange={(e) => setField('priceEgp', e.target.value)} placeholder="1000" className={inputClass} min="0" step="0.01" />
                {errors.priceEgp && <p className={errorClass}>{errors.priceEgp}</p>}
              </div>
              <div>
                <label className={labelClass}>السعر بالدولار</label>
                <input type="number" value={form.priceUsd} onChange={(e) => setField('priceUsd', e.target.value)} placeholder="50" className={inputClass} min="0" step="0.01" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>المدة (ساعات)</label>
                <input type="number" value={form.durationHours} onChange={(e) => setField('durationHours', e.target.value)} placeholder="3" className={inputClass} min="0" step="0.5" />
              </div>
              <div>
                <label className={labelClass}>الحد الأقصى للمشاركين</label>
                <input type="number" value={form.maxParticipants} onChange={(e) => setField('maxParticipants', e.target.value)} placeholder="20" className={inputClass} min="1" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'جارٍ الإنشاء...' : 'إنشاء التجربة'}
            </motion.button>
            <Link
              href="/provider/dashboard"
              className="px-6 py-3.5 rounded-xl border border-theme-gold/20 text-theme-secondary font-cairo text-sm hover:text-theme transition-all"
            >
              إلغاء
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
