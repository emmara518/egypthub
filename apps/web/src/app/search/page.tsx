'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { HiSearch, HiStar, HiLocationMarker, HiClock, HiChevronLeft, HiAdjustments, HiX, HiFilter, HiTag } from 'react-icons/hi';
import { destinations, experiences, regions } from '@/lib/mock-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'destinations' | 'experiences'>('all');
  const [activeRegion, setActiveRegion] = useState('all');

  const results = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return { destinations: [], experiences: [], total: 0 };

    const matchedDests = destinations.filter(d => {
      const matchesRegion = activeRegion === 'all' || d.region === activeRegion;
      const matchesQuery = d.name.includes(query) || d.subtitle.toLowerCase().includes(query) || d.description.includes(query) || d.region.includes(query) || d.highlights.some(h => h.includes(query));
      return matchesRegion && matchesQuery;
    });

    const matchedExps = experiences.filter(e => {
      const matchesRegion = activeRegion === 'all' || e.region === activeRegion;
      const matchesQuery = e.name.includes(query) || e.subtitle.toLowerCase().includes(query) || e.description.includes(query) || e.location.includes(query) || e.category.includes(query);
      return matchesRegion && matchesQuery;
    });

    return {
      destinations: activeFilter === 'all' || activeFilter === 'destinations' ? matchedDests : [],
      experiences: activeFilter === 'all' || activeFilter === 'experiences' ? matchedExps : [],
      total: (activeFilter === 'all' || activeFilter === 'destinations' ? matchedDests.length : 0) +
             (activeFilter === 'all' || activeFilter === 'experiences' ? matchedExps.length : 0),
    };
  }, [searchQuery, activeFilter, activeRegion]);

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-playfair text-theme mb-2">
            {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'البحث'}
          </h1>
          <p className="text-theme-secondary text-lg font-cairo">
            {searchQuery ? `${results.total} نتيجة` : 'ابحث عن وجهات وتجارب في مصر'}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <HiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجهات، تجارب..."
              className="w-full h-14 pr-12 pl-12 rounded-xl bg-theme-card border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-theme-gold transition-all font-cairo text-base" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme transition-colors">
                <HiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-card border border-theme-border text-xs text-theme-muted font-cairo">
            <HiFilter className="text-theme-gold" />
            تصفية:
          </div>
          {[
            { id: 'all' as const, label: 'الكل' },
            { id: 'destinations' as const, label: 'الوجهات' },
            { id: 'experiences' as const, label: 'التجارب' },
          ].map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all ${
                activeFilter === f.id ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
              }`}>{f.label}</button>
          ))}
          <div className="flex-1" />
          <select value={activeRegion} onChange={(e) => setActiveRegion(e.target.value)}
            className="px-4 py-2 rounded-xl bg-theme-card border border-theme text-theme text-sm font-cairo outline-none focus:border-theme-gold">
            <option value="all">جميع المناطق</option>
            {regions.filter(r => r.slug !== 'all').map(r => (
              <option key={r.slug} value={r.slug}>{r.name}</option>
            ))}
          </select>
        </div>

        <AnimatePresence mode="wait">
          {!searchQuery ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <HiSearch className="w-16 h-16 mx-auto mb-4 text-theme-muted" />
              <p className="text-theme-secondary text-lg font-cairo mb-2">ابحث عن وجهتك المثالية</p>
              <p className="text-theme-muted text-sm font-cairo">اكتب كلمة مفتاحية للبدء</p>
            </motion.div>
          ) : results.total === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <p className="text-theme-secondary text-lg font-cairo mb-2">لا توجد نتائج لبحثك</p>
              <p className="text-theme-muted text-sm font-cairo mb-6">حاول استخدام كلمات مختلفة أو تصفح الوجهات</p>
              <Link href="/destinations" className="px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold font-cairo transition-all">
                تصفح الوجهات
              </Link>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8">
              {results.destinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <HiLocationMarker className="text-theme-gold" />
                    <h2 className="text-lg font-bold font-playfair text-theme">الوجهات ({results.destinations.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {results.destinations.map((d, idx) => (
                      <motion.div key={d.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/destinations/${d.slug}`}
                          className="group block relative h-52 rounded-xl overflow-hidden border border-theme-gold/10 bg-theme-card transition-all hover:-translate-y-1">
                          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${d.image})` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/40 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30 font-cairo">{d.region}</span>
                          </div>
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-dark-900/70">
                            <HiStar className="w-3 h-3 text-accent-amber" />
                            <span className="text-accent-amber text-xs font-bold">{d.rating}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold font-playfair text-white mb-1">{d.name}</h3>
                            <p className="text-white/60 text-xs font-cairo">{d.subtitle}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {results.experiences.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <HiTag className="text-theme-gold" />
                    <h2 className="text-lg font-bold font-playfair text-theme">التجارب ({results.experiences.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.experiences.map((exp, idx) => (
                      <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/experiences/${exp.slug}`}
                          className="group block rounded-xl overflow-hidden border border-theme-gold/10 bg-theme-card transition-all hover:-translate-y-1">
                          <div className="relative h-40 overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${exp.image})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                            <div className="absolute bottom-2 right-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/90 text-dark-900">{exp.category}</span>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <HiStar className="w-3 h-3 text-accent-amber" />
                              <span className="text-accent-amber text-xs font-bold">{exp.rating}</span>
                              <span className="text-theme-muted text-[10px]">({exp.reviewCount})</span>
                            </div>
                            <h3 className="font-bold text-sm text-theme font-cairo group-hover:text-theme-gold transition-colors">{exp.name}</h3>
                            <p className="text-theme-muted text-[10px] font-cairo mt-1 flex items-center gap-1"><HiLocationMarker />{exp.location}</p>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-theme-gold/10">
                              <span className="text-theme-gold text-xs font-bold font-english">{exp.price.toLocaleString()} {exp.currency}</span>
                              <span className="text-theme-muted text-[10px] font-cairo flex items-center gap-1"><HiClock />{exp.duration}</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-theme-bg pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
