'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const STYLES = [
  { id: 'budget', label: 'اقتصادي', desc: 'مواصلات عامة، فنادق اقتصادية', multiplier: 0.6 },
  { id: 'mid-range', label: 'متوسط', desc: 'مزيج من الراحة والتوفير', multiplier: 1.0 },
  { id: 'luxury', label: 'فاخر', desc: 'أفضل الفنادق والخدمات', multiplier: 1.8 },
];

const ESTIMATES = {
  flights: { base: 8000, perPerson: true },
  accommodation: { base: 1500, perPerson: false },
  food: { base: 500, perPerson: true },
  activities: { base: 2000, perPerson: true },
  misc: { base: 1000, perPerson: true },
};

const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function BudgetPlannerPage() {
  const { travelDna, setTravelDna } = useAppStore();
  const [duration, setDuration] = useState(travelDna.tripDuration ? parseInt(travelDna.tripDuration) || 7 : 7);
  const [people, setPeople] = useState(2);
  const [style, setStyle] = useState(travelDna.budget || 'mid-range');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const selectedStyle = STYLES.find(s => s.id === style) || STYLES[1];

  const breakdown = useMemo(() => {
    const m = selectedStyle.multiplier;
    const flights = Math.round(ESTIMATES.flights.base * people * m);
    const accommodation = Math.round(ESTIMATES.accommodation.base * duration * m);
    const food = Math.round(ESTIMATES.food.base * duration * people * m);
    const activities = Math.round(ESTIMATES.activities.base * duration * m);
    const misc = Math.round(ESTIMATES.misc.base * duration * m);
    const total = flights + accommodation + food + activities + misc;
    return { flights, accommodation, food, activities, misc, total };
  }, [duration, people, selectedStyle.multiplier]);

  const handleSubmit = () => {
    setTravelDna({ tripDuration: duration.toString(), budget: style });
    setShowBreakdown(true);
  };

  const maxBudget = useMemo(() => {
    const m = STYLES.find(s => s.id === 'luxury')!.multiplier;
    const flights = Math.round(ESTIMATES.flights.base * people * m);
    const accommodation = Math.round(ESTIMATES.accommodation.base * 30 * m);
    const food = Math.round(ESTIMATES.food.base * 30 * people * m);
    const activities = Math.round(ESTIMATES.activities.base * 30 * m);
    const misc = Math.round(ESTIMATES.misc.base * 30 * m);
    return flights + accommodation + food + activities + misc;
  }, [people]);

  const percentage = Math.min((breakdown.total / maxBudget) * 100, 100);

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-[900px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold font-playfair text-theme mb-3">
            مخطّط الميزانية <span className="text-theme-gold">الذكي</span>
          </h1>
          <p className="text-theme-secondary font-cairo max-w-xl mx-auto">احسب ميزانية رحلتك في مصر بدقة — كل اللي عليك تحدد المدة وعدد الأشخاص وأسلوب السفر</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 shadow-gold-border">
              <h2 className="text-lg font-bold text-theme font-cairo mb-5">تفاصيل الرحلة</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-cairo text-theme-secondary mb-2">مدة الرحلة</label>
                  <div className="flex gap-2">
                    {[3, 5, 7, 10, 14].map(d => (
                      <button key={d} onClick={() => setDuration(d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-cairo font-bold transition-all ${
                          duration === d ? 'bg-theme-gold text-dark-900' : 'bg-theme-bg border border-theme-gold/20 text-theme-secondary hover:border-theme-gold/40'
                        }`}>{d} أيام</button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input type="range" min={1} max={30} value={duration} onChange={e => setDuration(parseInt(e.target.value))}
                      className="w-full accent-theme-gold" />
                    <div className="flex justify-between text-xs text-theme-muted font-cairo"><span>يوم</span><span>٣٠ يوم</span></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-cairo text-theme-secondary mb-2">عدد الأشخاص</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <button key={n} onClick={() => setPeople(n)}
                        className={`w-10 h-10 rounded-xl text-sm font-cairo font-bold transition-all ${
                          people === n ? 'bg-theme-gold text-dark-900' : 'bg-theme-bg border border-theme-gold/20 text-theme-secondary hover:border-theme-gold/40'
                        }`}>{n}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-cairo text-theme-secondary mb-3">أسلوب السفر</label>
                  <div className="space-y-2">
                    {STYLES.map(s => (
                      <button key={s.id} onClick={() => setStyle(s.id)}
                        className={`w-full text-right p-3 rounded-xl border transition-all ${
                          style === s.id ? 'border-theme-gold bg-theme-gold/10' : 'border-theme-gold/10 bg-theme-bg hover:border-theme-gold/30'
                        }`}>
                        <span className={`text-sm font-bold font-cairo ${style === s.id ? 'text-theme-gold' : 'text-theme'}`}>{s.label}</span>
                        <span className="block text-[11px] text-theme-muted font-cairo">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold font-cairo text-sm">
                  احسب الميزانية
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {showBreakdown ? (
                <motion.div key="breakdown" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 shadow-gold-border">
                  <h2 className="text-lg font-bold text-theme font-cairo mb-5">تقسيم الميزانية</h2>

                  <div className="relative mb-6">
                    <div className="h-4 rounded-full bg-theme-bg overflow-hidden border border-theme-gold/10">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-l from-theme-gold to-theme-gold/60" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-theme-muted font-cairo">جنيه ٠</span>
                      <span className="text-[10px] text-theme-gold font-bold font-cairo">{breakdown.total.toLocaleString()} ج.م</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'flights', label: '✈️ تذاكر الطيران', value: 'base', icon: '✈️' },
                      { key: 'accommodation', label: '🏨 الإقامة', value: 'tickets' },
                      { key: 'food', label: '🍽️ الأكل', value: 'base' },
                      { key: 'activities', label: '🎯 الأنشطة', value: 'base' },
                      { key: 'misc', label: '📦 مصروفات أخرى', value: 'base' },
                    ].map(item => {
                      const amount = breakdown[item.key as keyof typeof breakdown];
                      const pct = breakdown.total > 0 ? (amount / breakdown.total) * 100 : 0;
                      return (
                        <div key={item.key} className="bg-theme-bg rounded-xl p-3 border border-theme-gold/10">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-cairo text-theme">{item.label}</span>
                            <span className="text-sm font-bold font-cairo text-theme-gold">{amount.toLocaleString()} ج.م</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-theme-card overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-full rounded-full bg-theme-gold/40" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-gradient-to-l from-theme-gold/15 to-transparent border border-theme-gold/20 text-center">
                    <p className="text-xs text-theme-secondary font-cairo mb-1">المجموع التقريبي</p>
                    <p className="text-2xl font-bold font-playfair text-theme-gold">{breakdown.total.toLocaleString()} <span className="text-sm">ج.م</span></p>
                    <p className="text-[10px] text-theme-muted font-cairo mt-1">لمدة {duration} أيام · {people} {people > 1 ? 'أشخاص' : 'شخص'} · {selectedStyle.label}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-theme-gold/10 border-dashed bg-theme-card/50 p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <span className="text-5xl mb-4">💰</span>
                  <h3 className="text-lg font-bold text-theme font-cairo mb-2">خطط لميزانيتك بذكاء</h3>
                  <p className="text-sm text-theme-secondary font-cairo text-center max-w-xs">اختر مدة رحلتك، عدد الأشخاص، وأسلوب السفر، ثم اضغط &quot;احسب الميزانية&quot;</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 rounded-2xl border border-theme-gold/20 bg-theme-card p-6 shadow-gold-border">
          <h3 className="text-lg font-bold text-theme font-cairo mb-4">💡 نصائح لتوفير المال في مصر</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'استخدم المواصلات العامة', desc: 'المترو والأتوبيسات أرخص بكثير من التاكسي أو أوبر' },
              { title: 'كل محلي', desc: 'المطاعم المحلية أطعم وأرخص من المطاعم السياحية' },
              { title: 'احجز مسبقاً', desc: 'الفنادق والطيران أرخص عند الحجز المبكر' },
            ].map((tip, i) => (
              <div key={i} className="bg-theme-bg rounded-xl p-4 border border-theme-gold/10">
                <p className="text-sm font-bold text-theme font-cairo mb-1">{tip.title}</p>
                <p className="text-xs text-theme-secondary font-cairo">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
