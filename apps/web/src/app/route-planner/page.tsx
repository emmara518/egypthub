'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Star, Clock, Check, Plus } from '@/components/Icons';
import cityRelations from '@/data/city-relations.json';

interface CityOption {
  slug: string;
  name: string;
  region: string;
  rating: string;
}

const cities: CityOption[] = [
  { slug: 'cairo', name: 'القاهرة', region: 'Capital', rating: '4.8' },
  { slug: 'alexandria', name: 'الإسكندرية', region: 'Mediterranean', rating: '4.6' },
  { slug: 'luxor', name: 'الأقصر', region: 'Upper Egypt', rating: '4.9' },
  { slug: 'aswan', name: 'أسوان', region: 'Upper Egypt', rating: '4.9' },
  { slug: 'sharm-el-sheikh', name: 'شرم الشيخ', region: 'South Sinai', rating: '4.9' },
  { slug: 'hurghada', name: 'الغردقة', region: 'Red Sea', rating: '4.7' },
  { slug: 'dahab', name: 'دهب', region: 'South Sinai', rating: '4.8' },
  { slug: 'siwa', name: 'سيوة', region: 'Western Desert', rating: '4.7' },
  { slug: 'marsa-alam', name: 'مرسى علم', region: 'Red Sea', rating: '4.8' },
  { slug: 'abu-simbel', name: 'أبو سمبل', region: 'South Egypt', rating: '4.9' },
];

const relations = (cityRelations as any).relations as Record<string, string[]>;
const routeTemplates = (cityRelations as any).routes as any[];

const travelMatrix: Record<string, Record<string, { hours: number; label: string }>> = {
  cairo: { alexandria: { hours: 3, label: '٣ ساعات' }, luxor: { hours: 8, label: '٨ ساعات' }, siwa: { hours: 8, label: '٨ ساعات' } },
  alexandria: { cairo: { hours: 3, label: '٣ ساعات' } },
  luxor: { aswan: { hours: 3, label: '٣ ساعات' }, cairo: { hours: 8, label: '٨ ساعات' }, hurghada: { hours: 4, label: '٤ ساعات' } },
  aswan: { luxor: { hours: 3, label: '٣ ساعات' }, cairo: { hours: 8, label: '٨ ساعات' }, 'abu-simbel': { hours: 4, label: '٤ ساعات' } },
  'sharm-el-sheikh': { dahab: { hours: 1.5, label: '١٫٥ ساعة' }, hurghada: { hours: 5, label: '٥ ساعات' } },
  hurghada: { luxor: { hours: 4, label: '٤ ساعات' }, 'sharm-el-sheikh': { hours: 5, label: '٥ ساعات' }, cairo: { hours: 6, label: '٦ ساعات' } },
  dahab: { 'sharm-el-sheikh': { hours: 1.5, label: '١٫٥ ساعة' } },
  siwa: { cairo: { hours: 8, label: '٨ ساعات' }, alexandria: { hours: 6, label: '٦ ساعات' } },
  'marsa-alam': { hurghada: { hours: 3, label: '٣ ساعات' } },
  'abu-simbel': { aswan: { hours: 4, label: '٤ ساعات' } },
};

function calcTotalDays(selected: CityOption[]): number {
  if (selected.length === 0) return 0;
  let total = selected.length * 2;
  for (let i = 0; i < selected.length - 1; i++) {
    const from = selected[i].slug;
    const to = selected[i + 1].slug;
    const travel = travelMatrix[from]?.[to];
    if (travel) total += Math.ceil(travel.hours / 4);
  }
  return Math.max(selected.length, total);
}

export default function RoutePlannerPage() {
  const saveDraft = useAppStore((s) => s.saveDraft);
  const visitCity = useAppStore((s) => s.visitCity);
  const trackEvent = useAppStore((s) => s.trackEvent);

  const [selected, setSelected] = useState<CityOption[]>([]);
  const [available, setAvailable] = useState<CityOption[]>([...cities]);
  const [saved, setSaved] = useState(false);

  const pickCity = (city: CityOption) => {
    setSelected((prev) => [...prev, city]);
    setAvailable((prev) => prev.filter((c) => c.slug !== city.slug));
    trackEvent('route_planner_add_city', 'route-planner');
  };

  const removeCity = (slug: string) => {
    const removed = selected.find((c) => c.slug === slug);
    setSelected((prev) => prev.filter((c) => c.slug !== slug));
    if (removed) setAvailable((prev) => [...prev, removed]);
  };

  const moveCity = useCallback((index: number, direction: -1 | 1) => {
    setSelected((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return next;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const totalDays = useMemo(() => calcTotalDays(selected), [selected]);

  const travelLegs = useMemo(() => {
    const legs: { from: CityOption; to: CityOption; hours: number; label: string }[] = [];
    for (let i = 0; i < selected.length - 1; i++) {
      const from = selected[i];
      const to = selected[i + 1];
      const travel = travelMatrix[from.slug]?.[to.slug];
      if (travel) legs.push({ from, to, ...travel });
    }
    return legs;
  }, [selected]);

  const handleSave = () => {
    saveDraft('route-planner', {
      cities: selected.map((c) => c.slug),
      totalDays,
      legs: travelLegs.map((l) => ({ from: l.from.slug, to: l.to.slug, hours: l.hours })),
    });
    selected.forEach((c) => visitCity(c.name));
    setSaved(true);
    trackEvent('route_planner_save', 'route-planner');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#080C18] pt-24" dir="ltr">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <ChevronRight size={14} />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-playfair text-white">مخطط الرحلة</h1>
            <p className="text-sm text-white/50 font-cairo mt-1">خطط لرحلتك المثالية في مصر</p>
          </div>
          <button
            onClick={handleSave}
            disabled={selected.length < 2}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all flex items-center gap-2 ${
              selected.length < 2
                ? 'bg-theme-gold/30 text-white/40 cursor-not-allowed'
                : 'bg-theme-gold hover:bg-theme-gold/80 text-dark-900 shadow-[0_4px_16px_rgba(212,162,76,0.25)]'
            }`}
          >
            {saved ? <> <Check size={14} /> تم الحفظ</> : 'حفظ الرحلة'}
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5">
              <h2 className="text-sm font-bold text-white font-cairo mb-4">اختر المدن</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {available.map((city) => (
                  <motion.button
                    key={city.slug}
                    onClick={() => pickCity(city)}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-theme-gold/15 bg-white/[0.03] hover:bg-theme-gold/5 hover:border-theme-gold/30 text-white/70 hover:text-white text-[11px] font-cairo transition-all"
                  >
                    <Plus size={10} />
                    {city.name}
                  </motion.button>
                ))}
                {available.length === 0 && (
                  <p className="text-white/30 text-xs font-cairo">تم اختيار جميع المدن</p>
                )}
              </div>

              <div className="space-y-2">
                {selected.length === 0 && (
                  <p className="text-white/30 text-xs font-cairo text-center py-8">اختر مدينة للبدء</p>
                )}
                <AnimatePresence>
                  {selected.map((city, index) => (
                    <motion.div
                      key={city.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 bg-[#1A2235]/60 rounded-xl border border-theme-gold/10 p-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-theme-gold/10 text-theme-gold text-[10px] font-bold font-english flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white font-cairo">{city.name}</p>
                        <p className="text-[10px] text-white/40 font-english">{city.region} · {city.rating}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveCity(index, -1)}
                          disabled={index === 0}
                          className="w-7 h-7 rounded-lg bg-white/[0.04] border border-theme-gold/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                          aria-label="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveCity(index, 1)}
                          disabled={index === selected.length - 1}
                          className="w-7 h-7 rounded-lg bg-white/[0.04] border border-theme-gold/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                          aria-label="Move down"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => removeCity(city.slug)}
                          className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                          aria-label="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {travelLegs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5 mt-4"
              >
                <h3 className="text-sm font-bold text-white font-cairo mb-3">تفاصيل السفر</h3>
                <div className="space-y-2">
                  {travelLegs.map((leg, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-white/60 font-cairo">
                      <Clock size={12} />
                      <span className="font-bold text-white">{leg.from.name}</span>
                      <span className="text-white/30">→</span>
                      <span className="font-bold text-white">{leg.to.name}</span>
                      <span className="text-theme-gold font-english">{leg.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5 text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0F1525] flex items-center justify-center">
                      <span className="text-3xl">🗺️</span>
                    </div>
                  </div>
                </div>
                <p className="text-3xl font-bold font-playfair text-white mb-1">{selected.length}</p>
                <p className="text-xs text-white/50 font-cairo mb-4">مدن مختارة</p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star size={14} />
                  <span className="text-2xl font-bold font-playfair text-theme-gold">{totalDays}</span>
                </div>
                <p className="text-xs text-white/50 font-cairo">إجمالي الأيام المقترحة</p>
              </div>

              {selected.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-4"
                >
                  <h4 className="text-xs font-bold text-white font-cairo mb-3">الملخص</h4>
                  <div className="relative h-24 rounded-lg overflow-hidden bg-[#0a1020] border border-theme-gold/10 mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {selected.map((city, i) => (
                        <div
                          key={city.slug}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            left: `${20 + (i * 60) / Math.max(selected.length - 1, 1)}%`,
                            top: '45%',
                            backgroundColor: '#D4A24C',
                            boxShadow: '0 0 6px rgba(212,162,76,0.5)',
                          }}
                        />
                      ))}
                      {travelLegs.map((leg, i) => (
                        <svg key={i} className="absolute inset-0 w-full h-full" viewBox="0 0 120 40">
                          <line
                            x1={20 + (i * 60) / Math.max(selected.length - 1, 1)}
                            y1="16"
                            x2={20 + ((i + 1) * 60) / Math.max(selected.length - 1, 1)}
                            y2="16"
                            stroke="rgba(212,162,76,0.2)"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-white/30 font-english">Route Preview</p>
                  </div>
                  <div className="space-y-1.5">
                    {selected.map((city, i) => (
                      <div key={city.slug} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-theme-gold/10 text-theme-gold text-[8px] font-bold font-english flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[11px] text-white/70 font-cairo">{city.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
