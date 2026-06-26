'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiSearch, HiStar, HiLocationMarker, HiClock } from 'react-icons/hi';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';

const categories = ['الكل', 'جولات تاريخية', 'رياضات مائية', 'مغامرات', 'رحلات نيلية'];

const categoryApiMap: Record<string, string | undefined> = {
  'الكل': undefined,
  'جولات تاريخية': 'HISTORICAL',
  'رياضات مائية': 'WATER_SPORTS',
  'مغامرات': 'ADVENTURE',
  'رحلات نيلية': 'NILE',
};

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('limit', '20');
      const apiCategory = categoryApiMap[category];
      if (apiCategory) params.set('category', apiCategory);
      const res = await fetch(`/api/experiences?${params}`);
      if (!res.ok) throw new Error('فشل في تحميل التجارب');
      const json = await res.json();
      setExperiences(json.data);
      setTotal(json.total);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء التحميل');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences(activeCategory);
  }, [activeCategory, fetchExperiences]);

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return experiences;
    const q = debouncedSearch;
    return experiences.filter(e =>
      (e.titleAr || '').includes(q) ||
      (e.descriptionAr || '').includes(q) ||
      (e.locationCity || '').includes(q)
    );
  }, [experiences, debouncedSearch]);

  const formatDuration = (hours?: number) => {
    if (hours == null) return '';
    return `${Math.round(hours)} ساعات`;
  };

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <path d="M0 400 Q 200 200 400 400 T 800 400 T 1200 400 T 1440 400" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <path d="M0 500 Q 200 300 400 500 T 800 500 T 1200 500 T 1440 500" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold mb-6">
              <HiStar className="w-4 h-4" />
              {total} تجربة
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-theme leading-tight mb-6">
            التجارب <span className="text-theme-gold">السياحية</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-theme/70 mb-10 max-w-2xl font-cairo">
            اختر تجربتك المثالية من بين مئات التجارب السياحية في جميع أنحاء مصر.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <HiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن تجربة..."
                className="w-full h-14 pl-5 pr-12 rounded-xl bg-theme-card border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-theme-gold transition-all duration-200 font-cairo" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap gap-3 mt-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                  activeCategory === cat ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
                }`}>{cat}</button>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
      </section>

      <section className="py-24 bg-theme-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">{filtered.length} تجربة متاحة</p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">اختر <span className="text-theme-gold">تجربتك</span></h2>
              <p className="text-theme-secondary mt-3 font-cairo max-w-xl">مغامرات فريدة وتجارب لا تنسى في جميع أنحاء مصر.</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-theme-card animate-pulse">
                  <div className="h-52 bg-white/5" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="pt-2 border-t border-theme-gold/10">
                      <div className="h-5 bg-white/5 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg font-cairo">{error}</p>
              <button onClick={() => fetchExperiences(activeCategory)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold transition-all duration-200 font-cairo">
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((exp, idx) => (
                  <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                    <Link href={`/experiences/${exp.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-theme-gold/20 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]">
                      <div className="relative h-52 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                          style={{ backgroundImage: `url(${exp.images?.[0] || ''})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30 font-cairo">{exp.category}</span>
                        </div>
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-dark-900/70">
                          <HiStar className="w-3.5 h-3.5 text-accent-amber" />
                          <span className="text-accent-amber text-xs font-bold">{exp.averageRating?.toFixed(1)}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-xl font-bold font-playfair text-white mb-1 group-hover:text-theme-gold transition-colors">{exp.titleAr}</h3>
                          {exp.titleEn && (
                            <p className="text-white/60 text-sm font-cairo">{exp.titleEn}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-theme-secondary text-xs font-cairo line-clamp-2">{exp.descriptionAr}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-theme-muted font-cairo">
                            <span className="flex items-center gap-1"><HiLocationMarker />{exp.locationCity}</span>
                            <span className="flex items-center gap-1"><HiClock />{formatDuration(exp.durationHours)}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-theme-gold/10">
                          <span className="text-lg font-bold text-theme-gold font-english">{exp.priceEgp.toLocaleString()} ج.م</span>
                          <span className="text-xs text-theme-muted font-cairo">للشخص</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-theme-secondary text-lg font-cairo">لا توجد تجارب تطابق بحثك</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('الكل'); }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold transition-all duration-200 font-cairo">
                    إعادة ضبط
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <StatsBar />
      <Testimonials />
    </>
  );
}
