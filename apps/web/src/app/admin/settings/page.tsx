'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneralSettings {
  siteNameAr: string; siteNameEn: string; description: string;
  contactEmail: string; phone: string; currency: string; defaultLang: string;
}

interface CommissionSettings {
  partnerRate: number; ambassadorRate: number; minWithdrawal: number;
}

interface BookingSettings {
  maxDaysAdvance: number; cancellationPolicy: string; depositPercent: number; autoConfirm: boolean;
}

interface FeatureToggles {
  ambassadors: boolean; referral: boolean; partnerApproval: boolean; aiConcierge: boolean; loyalty: boolean;
}

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function SettingsPage() {
  const [general, setGeneral] = useState<GeneralSettings>({
    siteNameAr: 'إيجيبت هب', siteNameEn: 'EgyptHub', description: 'منصة حجز التجارب السياحية في مصر',
    contactEmail: 'info@egypthub.com', phone: '+201234567890', currency: 'EGP', defaultLang: 'ar',
  });
  const [commission, setCommission] = useState<CommissionSettings>({ partnerRate: 15, ambassadorRate: 5, minWithdrawal: 500 });
  const [booking, setBooking] = useState<BookingSettings>({ maxDaysAdvance: 90, cancellationPolicy: 'flexible', depositPercent: 30, autoConfirm: false });
  const [features, setFeatures] = useState<FeatureToggles>({ ambassadors: true, referral: true, partnerApproval: true, aiConcierge: false, loyalty: false });
  const [saved, setSaved] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  function showSaved(section: string) {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  }

  function resetDefaults() {
    setGeneral({ siteNameAr: 'إيجيبت هب', siteNameEn: 'EgyptHub', description: 'منصة حجز التجارب السياحية في مصر', contactEmail: 'info@egypthub.com', phone: '+201234567890', currency: 'EGP', defaultLang: 'ar' });
    setCommission({ partnerRate: 15, ambassadorRate: 5, minWithdrawal: 500 });
    setBooking({ maxDaysAdvance: 90, cancellationPolicy: 'flexible', depositPercent: 30, autoConfirm: false });
    setFeatures({ ambassadors: true, referral: true, partnerApproval: true, aiConcierge: false, loyalty: false });
    setResetConfirm(false);
    showSaved('تم');
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-all ${value ? 'bg-emerald-500' : 'bg-theme-border'}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? 'right-[22px]' : 'right-0.5'}`} />
    </button>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إعدادات المنصة</h1>
          <p className="text-sm text-theme-muted font-cairo">تخصيص إعدادات منصة إيجيبت هب</p>
        </div>
        <button onClick={() => setResetConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-400 text-xs font-bold font-cairo hover:bg-red-500/10 transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
          إعادة تعيين
        </button>
      </motion.div>

      <SettingsSection title="الإعدادات العامة" icon="⚙️" saved={saved === 'general'} onSave={() => showSaved('general')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingField label="اسم الموقع (عربي)" value={general.siteNameAr} onChange={v => setGeneral(p => ({ ...p, siteNameAr: v }))} />
          <SettingField label="اسم الموقع (إنجليزي)" value={general.siteNameEn} onChange={v => setGeneral(p => ({ ...p, siteNameEn: v }))} />
          <div className="md:col-span-2">
            <SettingField label="وصف الموقع" value={general.description} onChange={v => setGeneral(p => ({ ...p, description: v }))} />
          </div>
          <SettingField label="البريد الإلكتروني" value={general.contactEmail} onChange={v => setGeneral(p => ({ ...p, contactEmail: v }))} />
          <SettingField label="رقم الهاتف" value={general.phone} onChange={v => setGeneral(p => ({ ...p, phone: v }))} />
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">العملة</label>
            <select value={general.currency} onChange={e => setGeneral(p => ({ ...p, currency: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
              <option value="EGP">جنيه مصري (EGP)</option><option value="USD">دولار أمريكي (USD)</option><option value="EUR">يورو (EUR)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">اللغة الافتراضية</label>
            <select value={general.defaultLang} onChange={e => setGeneral(p => ({ ...p, defaultLang: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
              <option value="ar">العربية</option><option value="en">English</option><option value="fr">Français</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="إعدادات العمولات" icon="💰" saved={saved === 'commission'} onSave={() => showSaved('commission')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberField label="نسبة عمولة الشريك (%)" value={commission.partnerRate} onChange={v => setCommission(p => ({ ...p, partnerRate: v }))} />
          <NumberField label="نسبة عمولة السفير (%)" value={commission.ambassadorRate} onChange={v => setCommission(p => ({ ...p, ambassadorRate: v }))} />
          <NumberField label="الحد الأدنى للسحب (ج.م)" value={commission.minWithdrawal} onChange={v => setCommission(p => ({ ...p, minWithdrawal: v }))} />
        </div>
      </SettingsSection>

      <SettingsSection title="إعدادات الحجوزات" icon="📋" saved={saved === 'booking'} onSave={() => showSaved('booking')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField label="أقصى حجز مسبق (يوم)" value={booking.maxDaysAdvance} onChange={v => setBooking(p => ({ ...p, maxDaysAdvance: v }))} />
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">سياسة الإلغاء</label>
            <select value={booking.cancellationPolicy} onChange={e => setBooking(p => ({ ...p, cancellationPolicy: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
              <option value="flexible">مرن</option><option value="moderate">معتدل</option><option value="strict">صارم</option>
            </select>
          </div>
          <NumberField label="نسبة الدفعة المقدمة (%)" value={booking.depositPercent} onChange={v => setBooking(p => ({ ...p, depositPercent: v }))} />
          <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
            <span className="text-sm text-theme font-cairo">تأكيد تلقائي</span>
            <Toggle value={booking.autoConfirm} onChange={v => setBooking(p => ({ ...p, autoConfirm: v }))} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="تفعيل الميزات" icon="🚀" saved={saved === 'features'} onSave={() => showSaved('features')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ToggleRow label="برنامج السفراء" value={features.ambassadors} onChange={v => setFeatures(p => ({ ...p, ambassadors: v }))} />
          <ToggleRow label="نظام الإحالات" value={features.referral} onChange={v => setFeatures(p => ({ ...p, referral: v }))} />
          <ToggleRow label="موافقة الشركاء مطلوبة" value={features.partnerApproval} onChange={v => setFeatures(p => ({ ...p, partnerApproval: v }))} />
          <ToggleRow label="المساعد الذكي (AI Concierge)" value={features.aiConcierge} onChange={v => setFeatures(p => ({ ...p, aiConcierge: v }))} />
          <ToggleRow label="برنامج الولاء" value={features.loyalty} onChange={v => setFeatures(p => ({ ...p, loyalty: v }))} />
        </div>
      </SettingsSection>

      <AnimatePresence>
        {resetConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-amber-500/20 bg-theme-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد إعادة التعيين</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">سيتم استعادة جميع الإعدادات إلى القيم الافتراضية. هل أنت متأكد؟</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setResetConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={resetDefaults}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold font-cairo hover:bg-amber-600 transition-all">إعادة تعيين</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SettingsSection({ title, icon, children, saved, onSave }: { title: string; icon: string; children: React.ReactNode; saved: boolean; onSave: () => void }) {
  return (
    <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h2 className="text-sm font-bold font-cairo text-theme">{title}</h2>
        </div>
        <button onClick={onSave}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
            saved ? 'bg-emerald-500 text-white' : 'bg-theme-gold text-dark-900 hover:opacity-90'
          }`}>
          {saved ? 'تم الحفظ ✓' : 'حفظ'}
        </button>
      </div>
      {children}
    </motion.div>
  );
}

function SettingField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-theme-muted font-cairo mb-1.5">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-xs text-theme-muted font-cairo mb-1.5">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40" />
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
      <span className="text-sm text-theme font-cairo">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-all ${value ? 'bg-emerald-500' : 'bg-theme-border'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? 'right-[22px]' : 'right-0.5'}`} />
      </button>
    </div>
  );
}
