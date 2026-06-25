'use client';

import { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
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

  const filters = [
    { id: 'all' as const, label: 'الكل' },
    { id: 'destinations' as const, label: 'الوجهات' },
    { id: 'experiences' as const, label: 'التجارب' },
  ];

  return (
    <div className="min-h-screen bg-[#080C18] pt-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-[#D4A24C] hover:text-[#D4A24C]/80 transition-colors text-sm font-cairo mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-2">
            {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'البحث'}
          </h1>
          <p className="text-white/50 text-lg font-cairo">
            {searchQuery ? `${results.total} نتيجة` : 'ابحث عن وجهات وتجارب في مصر'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجهات، تجارب..."
              className="w-full h-14 pr-12 pl-12 rounded-xl bg-[#0F1525] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A24C]/30 transition-all font-cairo text-base" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F1525] border border-white/[0.06] text-xs text-white/40 font-cairo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            تصفية:
          </div>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all ${
                activeFilter === f.id ? 'bg-[#D4A24C] text-[#080C18]' : 'bg-[#0F1525] border border-white/[0.06] text-white/50 hover:text-[#D4A24C] hover:border-[#D4A24C]/30'
              }`}>{f.label}</button>
          ))}
          <div className="flex-1" />
          <select value={activeRegion} onChange={(e) => setActiveRegion(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#0F1525] border border-white/[0.06] text-white/50 text-sm font-cairo outline-none focus:border-[#D4A24C]/30">
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
              <svg className="w-16 h-16 mx-auto mb-4 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <p className="text-white/50 text-lg font-cairo mb-2">ابحث عن وجهتك المثالية</p>
              <p className="text-white/30 text-sm font-cairo">اكتب كلمة مفتاحية للبدء</p>
            </motion.div>
          ) : results.total === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <p className="text-white/50 text-lg font-cairo mb-2">لا توجد نتائج لبحثك</p>
              <p className="text-white/30 text-sm font-cairo mb-6">حاول استخدام كلمات مختلفة أو تصفح الوجهات</p>
              <Link href="/destinations" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] font-bold font-cairo transition-all hover:shadow-[0_4px_15px_rgba(212,162,76,0.3)]">
                تصفح الوجهات
              </Link>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8">
              {results.destinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A24C"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <h2 className="text-lg font-bold font-playfair text-white">الوجهات ({results.destinations.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {results.destinations.map((d, idx) => (
                      <motion.div key={d.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/destinations/${d.slug}`}
                          className="group block relative h-52 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0F1525] transition-all hover:-translate-y-1 hover:border-[#D4A24C]/20">
                          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${d.image})` }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/95 via-[#080C18]/40 to-transparent" />
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#080C18]/70 text-[#D4A24C] border border-[#D4A24C]/20 font-cairo backdrop-blur-sm">{d.region}</span>
                          </div>
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#080C18]/70 backdrop-blur-sm">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#D4A24C"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                            <span className="text-[#D4A24C] text-xs font-bold font-english">{d.rating}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold font-playfair text-white mb-1">{d.name}</h3>
                            <p className="text-white/50 text-xs font-cairo">{d.subtitle}</p>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <h2 className="text-lg font-bold font-playfair text-white">التجارب ({results.experiences.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.experiences.map((exp, idx) => (
                      <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/experiences/${exp.slug}`}
                          className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0F1525] transition-all hover:-translate-y-1 hover:border-[#D4A24C]/20">
                          <div className="relative h-40 overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${exp.image})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/80 to-transparent" />
                            <div className="absolute bottom-2 right-2">
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#D4A24C]/90 text-[#080C18]">{exp.category}</span>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="#D4A24C"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                              <span className="text-[#D4A24C] text-xs font-bold font-english">{exp.rating}</span>
                              <span className="text-white/30 text-[10px] font-english">({exp.reviewCount})</span>
                            </div>
                            <h3 className="font-bold text-sm text-white font-cairo group-hover:text-[#D4A24C] transition-colors">{exp.name}</h3>
                            <p className="text-white/30 text-[10px] font-cairo mt-1 flex items-center gap-1">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="#D4A24C"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {exp.location}
                            </p>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                              <span className="text-[#D4A24C] text-xs font-bold font-english">{exp.price.toLocaleString()} {exp.currency}</span>
                              <span className="text-white/30 text-[10px] font-cairo flex items-center gap-1">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {exp.duration}
                              </span>
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
      <div className="min-h-screen bg-[#080C18] pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A24C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
