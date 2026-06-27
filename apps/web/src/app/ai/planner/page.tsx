'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronLeft, HiCheck, HiLocationMarker, HiUserGroup,
  HiCurrencyDollar, HiCalendar, HiHeart, HiLightningBolt,
  HiStar, HiSparkles,
} from 'react-icons/hi';

const cities = [
  { name: 'شرم الشيخ', image: '/images/destinations/sharm-el-sheikh.svg', desc: 'الغوص والبحر' },
  { name: 'القاهرة', image: '/images/destinations/cairo.svg', desc: 'التاريخ والحضارة' },
  { name: 'الأقصر', image: '/images/destinations/luxor.svg', desc: 'معابد الفراعنة' },
  { name: 'أسوان', image: '/images/destinations/aswan.svg', desc: 'الطبيعة والنيل' },
  { name: 'الغردقة', image: '/images/destinations/hurghada.svg', desc: 'الشواطئ والغوص' },
  { name: 'الإسكندرية', image: '/images/destinations/alexandria.svg', desc: 'البحر المتوسط' },
  { name: 'دهب', image: '/images/destinations/dahab.svg', desc: 'الاسترخاء والرياضات' },
  { name: 'سيوة', image: '/images/destinations/siwa.svg', desc: 'الواحة والسحر' },
];

const interests = [
  { icon: HiStar, label: 'تاريخية', emoji: '🏛️' },
  { icon: HiHeart, label: 'استرخاء', emoji: '🧘' },
  { icon: HiLightningBolt, label: 'مغامرات', emoji: '🏄' },
  { icon: HiSparkles, label: 'فاخرة', emoji: '✨' },
  { icon: HiUserGroup, label: 'عائلية', emoji: '👨‍👩‍👧‍👦' },
];

export default function AIPlannerPage() {
  const [step, setStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState('');
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [planning, setPlanning] = useState(false);
  const [done, setDone] = useState(false);

  const steps = ['المدينة', 'عدد الأيام', 'عدد المسافرين', 'الميزانية', 'الاهتمامات'];
  const budgets = ['اقتصادية', 'متوسطة', 'فاخرة', 'غير محدد'];

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) => prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]);
  };

  const handleCreate = async () => {
    setPlanning(true);
    setTimeout(() => { setPlanning(false); setDone(true); }, 2000);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-theme-gold/10 border border-theme-gold/20 flex items-center justify-center mx-auto mb-6">
            <HiCheck className="w-10 h-10 text-theme-gold" />
          </div>
          <h1 className="text-2xl font-playfair font-bold text-theme mb-2">تم إنشاء رحلتك!</h1>
          <p className="text-sm text-theme-muted font-cairo mb-6">خط سير رحلتك إلى {selectedCity} جاهز. يمكنك مراجعته أو التحدث مع زينب.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/ai/chat" className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all">
              تحدث مع زينب
            </Link>
            <Link href="/ai/history" className="px-6 py-3 rounded-xl bg-theme-surface border border-theme-border text-theme font-cairo text-sm hover:border-theme-gold/20 transition-all">
              عرض الرحلات
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/ai" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة
        </Link>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-cairo transition-all ${
                i <= step ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-border text-theme-muted'
              }`}>{i + 1}</div>
              <span className={`text-xs font-cairo ${i <= step ? 'text-theme-gold' : 'text-theme-muted'} hidden sm:block`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? 'bg-theme-gold' : 'bg-theme-border'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-theme mb-1">اختر المدينة</h2>
                <p className="text-sm text-theme-muted font-cairo mb-4">إلى أين تريد السفر؟</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cities.map((city) => (
                    <button key={city.name} onClick={() => setSelectedCity(city.name)}
                      className={`p-4 rounded-2xl border text-right transition-all ${
                        selectedCity === city.name ? 'border-theme-gold bg-theme-gold/10' : 'border-theme-border bg-theme-card hover:border-theme-gold/20'
                      }`}>
                      <h3 className="font-bold text-sm text-theme font-cairo">{city.name}</h3>
                      <p className="text-[10px] text-theme-muted font-cairo">{city.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-theme mb-1">عدد الأيام</h2>
                <p className="text-sm text-theme-muted font-cairo mb-4">كم يوم تريد قضاءها؟</p>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                    <button key={n} onClick={() => setDays(n)}
                      className={`w-16 h-16 rounded-2xl font-bold text-sm transition-all ${
                        days === n ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme-border text-theme hover:border-theme-gold/20'
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-theme mb-1">عدد المسافرين</h2>
                <p className="text-sm text-theme-muted font-cairo mb-4">كم شخصًا معك؟</p>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                    <button key={n} onClick={() => setTravelers(n)}
                      className={`w-16 h-16 rounded-2xl font-bold text-sm transition-all ${
                        travelers === n ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme-border text-theme hover:border-theme-gold/20'
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-theme mb-1">الميزانية</h2>
                <p className="text-sm text-theme-muted font-cairo mb-4">حدد ميزانيتك التقريبية</p>
                <div className="grid grid-cols-2 gap-3">
                  {budgets.map((b) => (
                    <button key={b} onClick={() => setBudget(b)}
                      className={`p-5 rounded-2xl border text-right transition-all ${
                        budget === b ? 'border-theme-gold bg-theme-gold/10' : 'border-theme-border bg-theme-card hover:border-theme-gold/20'
                      }`}>
                      <HiCurrencyDollar className={`w-5 h-5 mb-2 ${budget === b ? 'text-theme-gold' : 'text-theme-muted'}`} />
                      <h3 className="font-bold text-sm text-theme font-cairo">{b}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-theme mb-1">الاهتمامات</h2>
                <p className="text-sm text-theme-muted font-cairo mb-4">اختر ما تهمك</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button key={interest.label} onClick={() => toggleInterest(interest.label)}
                      className={`p-5 rounded-2xl border text-center transition-all ${
                        selectedInterests.includes(interest.label) ? 'border-theme-gold bg-theme-gold/10' : 'border-theme-border bg-theme-card hover:border-theme-gold/20'
                      }`}>
                      <span className="text-3xl mb-2 block">{interest.emoji}</span>
                      <p className="text-xs font-bold text-theme font-cairo">{interest.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl bg-theme-surface border border-theme-border text-theme font-cairo text-sm hover:border-theme-gold/20 transition-all font-bold">
              السابق
            </button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} disabled={step === 0 && !selectedCity}
              className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all disabled:opacity-40 flex-1">
              التالي
            </button>
          ) : (
            <button onClick={handleCreate} disabled={selectedInterests.length === 0 || planning}
              className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all disabled:opacity-40 flex-1 flex items-center justify-center gap-2">
              {planning ? (
                <><div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" /> جاري الإنشاء...</>
              ) : 'إنشاء الرحلة'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
