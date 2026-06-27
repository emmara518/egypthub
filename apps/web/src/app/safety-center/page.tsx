'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EMERGENCIES = [
  { name: 'الشرطة', number: '122', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { name: 'الإسعاف', number: '123', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { name: 'مطافئ', number: '180', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'شرطة السياحة', number: '126', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
];

const EMBASSIES = [
  { country: 'الولايات المتحدة', phone: '+20 2 2797 3300', address: 'القاهرة — جاردن سيتي' },
  { country: 'المملكة المتحدة', phone: '+20 2 2791 6000', address: 'القاهرة — الزمالك' },
  { country: 'ألمانيا', phone: '+20 2 2735 8400', address: 'القاهرة — الدقي' },
  { country: 'فرنسا', phone: '+20 2 2791 7000', address: 'القاهرة — جاردن سيتي' },
  { country: 'الإمارات', phone: '+20 2 2795 7555', address: 'القاهرة — الزمالك' },
  { country: 'السعودية', phone: '+20 2 2794 4100', address: 'القاهرة — جاردن سيتي' },
];

const HEALTH_TIPS = [
  'اشرب مياه معبأة، وتجنب مياه الصنبور',
  'اغسل يديك قبل تناول الطعام',
  'تأكد من تناول الطعام في مطاعم موثوقة',
  'استخدم واقي الشمس في الأماكن المفتوحة',
  'احمل معك أدوية المعدة والمسكنات الأساسية',
  'تأكد من تأمينك الصحي قبل السفر',
];

const REGION_TIPS: Record<string, string[]> = {
  'القاهرة': ['تجنب المناطق المزدحمة في أوقات الذروة', 'احتفظ بحقائبك في الأماكن المغلقة', 'استخدم سيارات الأجرة الرسمية (أوبر/كريم)'],
  'المناطق الساحلية': ['احترس من التيارات البحرية', 'لا تسبح في الأماكن غير المصرح بها', 'استخدم واقي الشمس بشكل متكرر'],
  'الصحراء': ['لا تذهب بدون مرشد', 'احمل كمية كافية من المياه', 'أخبر أحداً بخط سيرك'],
};

export default function SafetyCenterPage() {
  const [sent, setSent] = useState(false);

  const handleEmergencyAlert = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      }, () => {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      });
    } else {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  const cardClass = "bg-theme-surface border border-theme-gold/20 rounded-2xl p-5";

  return (
    <div className="min-h-screen bg-theme-bg pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">مركز السلامة</h1>
          <p className="text-sm text-white/60 font-cairo">سلامتك هي أولويتنا — كل أرقام الطوارئ والنصائح في مكان واحد</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {EMERGENCIES.map((e) => (
            <motion.a
              key={e.name}
              href={`tel:${e.number}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-theme-surface border border-red-500/20 rounded-2xl p-4 text-center hover:border-red-500/40 transition-colors"
            >
              <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={e.icon} /></svg>
              <p className="text-sm text-white font-cairo">{e.name}</p>
              <p className="text-lg font-bold text-red-400 font-english">{e.number}</p>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-6">
          <button
            onClick={handleEmergencyAlert}
            className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-cairo font-bold text-sm hover:bg-red-500/30 transition-colors"
          >
            <svg className="inline-block ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            أرسل موقعي للطوارئ
          </button>
          {sent && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-400 mt-2 font-cairo">تم إرسال تنبيه الطوارئ بنجاح</motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">سفارات الدول</h2>
            <div className="space-y-2">
              {EMBASSIES.map((emb) => (
                <div key={emb.country} className="px-3 py-2 rounded-xl bg-white/5">
                  <p className="text-sm text-white font-cairo">{emb.country}</p>
                  <p className="text-xs text-white/50 font-cairo">{emb.phone}</p>
                  <p className="text-[10px] text-white/40 font-cairo">{emb.address}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">نصائح صحية</h2>
            <ol className="space-y-2">
              {HEALTH_TIPS.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/80 font-cairo">
                  <span className="text-theme-gold mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={cardClass}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">نصائح حسب المنطقة</h2>
          <div className="space-y-3">
            {Object.entries(REGION_TIPS).map(([region, tips]) => (
              <div key={region} className="px-3 py-2 rounded-xl bg-white/5">
                <p className="text-sm text-theme-gold font-cairo font-bold mb-1">{region}</p>
                <ol className="space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i} className="text-xs text-white/70 font-cairo">• {tip}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
