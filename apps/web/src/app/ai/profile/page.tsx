'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiCheck } from 'react-icons/hi';

const LANGUAGES = ['العربية', 'English', 'Français', 'Deutsch', 'Español', '中文', 'Русский'];
const TRIP_TYPES = ['تاريخية', 'استرخاء', 'مغامرات', 'فاخرة', 'عائلية', 'شاطئية'];
const BUDGETS = ['اقتصادية', 'متوسطة', 'فاخرة'];
const FOODS = ['مصري', 'إيطالي', 'آسيوي', 'مأكولات بحرية', 'شرق أوسطي', 'وجبات سريعة'];

export default function AIProfilePage() {
  const [lang, setLang] = useState('العربية');
  const [tripTypes, setTripTypes] = useState<string[]>(['تاريخية']);
  const [budget, setBudget] = useState('متوسطة');
  const [foods, setFoods] = useState<string[]>(['مصري']);

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[700px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/ai" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-2">الملف الشخصي لزينب</h1>
          <p className="text-sm text-theme-muted font-cairo">خصص تجربتك مع المساعد الذكي</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="font-bold text-sm text-theme font-cairo mb-3">اللغة المفضلة</h2>
            <div className="flex gap-2 flex-wrap">
              {LANGUAGES.map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
                    lang === l ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-border text-theme-secondary hover:border-theme-gold/20'
                  }`}>{l}</button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="font-bold text-sm text-theme font-cairo mb-3">نوع الرحلات المفضل</h2>
            <div className="flex gap-2 flex-wrap">
              {TRIP_TYPES.map((t) => (
                <button key={t} onClick={() => setTripTypes(toggleArray(tripTypes, t))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
                    tripTypes.includes(t) ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-border text-theme-secondary hover:border-theme-gold/20'
                  }`}>{t}</button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="font-bold text-sm text-theme font-cairo mb-3">الميزانية</h2>
            <div className="flex gap-2 flex-wrap">
              {BUDGETS.map((b) => (
                <button key={b} onClick={() => setBudget(b)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
                    budget === b ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-border text-theme-secondary hover:border-theme-gold/20'
                  }`}>{b}</button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="font-bold text-sm text-theme font-cairo mb-3">المأكولات المفضلة</h2>
            <div className="flex gap-2 flex-wrap">
              {FOODS.map((f) => (
                <button key={f} onClick={() => setFoods(toggleArray(foods, f))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
                    foods.includes(f) ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-border text-theme-secondary hover:border-theme-gold/20'
                  }`}>{f}</button>
              ))}
            </div>
          </motion.div>

          <button
            className="w-full py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <HiCheck className="w-4 h-4" />
            حفظ التفضيلات
          </button>
        </div>
      </div>
    </div>
  );
}
