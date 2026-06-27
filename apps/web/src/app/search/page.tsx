'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'experiences' | 'providers'>('all');
  const [results, setResults] = useState<{
    experiences: { titleAr: string; slug: string; locationCity: string; priceEgp: number; averageRating: number }[];
    providers: { businessNameAr: string; id: string; locationCity: string; category: string }[];
    stories: { titleAr: string; slug: string; category: string }[];
    total: number;
  }>({ experiences: [], providers: [], stories: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults({ experiences: [], providers: [], stories: [], total: 0 });
      setLoading(false);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('فشل البحث');
      const data = await res.json();
      setResults(data);
    } catch {
      setError('حدث خطأ أثناء البحث. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      fetchResults(initialQuery);
    }
  }, [initialQuery, fetchResults]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchResults(value);
    }, 300);
  };

  const filters = [
    { id: 'all' as const, label: 'الكل' },
    { id: 'experiences' as const, label: 'التجارب' },
    { id: 'providers' as const, label: 'المزودون' },
  ];

  const filteredExperiences = activeFilter === 'all' || activeFilter === 'experiences' ? results.experiences : [];
  const filteredProviders = activeFilter === 'all' || activeFilter === 'providers' ? results.providers : [];
  const filteredStories = activeFilter === 'all' ? results.stories : [];

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-2">
            {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'البحث'}
          </h1>
          <p className="text-white/50 text-lg font-cairo">
            {searchQuery ? `${results.total} نتيجة` : 'ابحث عن تجارب ومزودين في مصر'}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text" value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="ابحث عن تجارب، مزودين..."
              className="w-full h-14 pr-12 pl-12 rounded-xl bg-theme-surface border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-theme-gold/30 transition-all font-cairo text-base" />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setResults({ experiences: [], providers: [], stories: [], total: 0 }); setError(''); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-surface border border-white/[0.06] text-xs text-white/40 font-cairo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-theme-gold" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            تصفية:
          </div>
          {filters.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all ${
                activeFilter === f.id ? 'bg-theme-gold text-theme-bg' : 'bg-theme-surface border border-white/[0.06] text-white/50 hover:text-theme-gold hover:border-theme-gold/30'
              }`}>{f.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden bg-theme-surface border border-white/[0.06] animate-pulse">
                  <div className="h-40 bg-white/[0.05]" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-white/[0.05] rounded w-2/3" />
                    <div className="h-3 bg-white/[0.05] rounded w-1/2" />
                    <div className="h-3 bg-white/[0.05] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <p className="text-red-400 text-lg font-cairo mb-2">{error}</p>
              <button onClick={() => fetchResults(searchQuery)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-theme-gold to-accent-amber text-theme-bg font-bold font-cairo transition-all hover:shadow-gold">
                إعادة المحاولة
              </button>
            </motion.div>
          ) : !searchQuery ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <svg className="w-16 h-16 mx-auto mb-4 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <p className="text-white/50 text-lg font-cairo mb-2">ابحث عن تجربتك المثالية</p>
              <p className="text-white/30 text-sm font-cairo">اكتب كلمة مفتاحية للبدء</p>
            </motion.div>
          ) : results.total === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <p className="text-white/50 text-lg font-cairo mb-2">لا توجد نتائج لبحثك</p>
              <p className="text-white/30 text-sm font-cairo mb-6">حاول استخدام كلمات مختلفة أو تصفح التجارب</p>
              <Link href="/experiences" className="px-6 py-3 rounded-xl bg-gradient-to-r from-theme-gold to-accent-amber text-theme-bg font-bold font-cairo transition-all hover:shadow-gold">
                تصفح التجارب
              </Link>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8">
              {filteredExperiences.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-theme-gold" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <h2 className="text-lg font-bold font-playfair text-white">التجارب ({filteredExperiences.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredExperiences.map((exp, idx) => (
                      <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/experiences/${exp.slug}`}
                          className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-theme-surface transition-all hover:-translate-y-1 hover:border-theme-gold/20">
                          <div className="p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                              <span className="text-theme-gold text-xs font-bold font-english">{exp.averageRating}</span>
                            </div>
                            <h3 className="font-bold text-sm text-white font-cairo group-hover:text-theme-gold transition-colors">{exp.titleAr}</h3>
                            <p className="text-white/30 text-[10px] font-cairo mt-1 flex items-center gap-1">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="var(--gold)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {exp.locationCity}
                            </p>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                              <span className="text-theme-gold text-xs font-bold font-english">{exp.priceEgp.toLocaleString()} ج.م</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProviders.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <h2 className="text-lg font-bold font-playfair text-white">المزودون ({filteredProviders.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProviders.map((prov, idx) => (
                      <motion.div key={prov.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/partners/${prov.id}`}
                          className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-theme-surface transition-all hover:-translate-y-1 hover:border-theme-gold/20">
                          <div className="p-3">
                            <h3 className="font-bold text-sm text-white font-cairo group-hover:text-theme-gold transition-colors">{prov.businessNameAr}</h3>
                            <p className="text-white/30 text-[10px] font-cairo mt-1 flex items-center gap-1">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="var(--gold)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {prov.locationCity}
                            </p>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                              <span className="text-theme-gold text-xs font-bold font-cairo">{prov.category}</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {filteredStories.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-theme-gold" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <h2 className="text-lg font-bold font-playfair text-white">القصص ({filteredStories.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStories.map((story, idx) => (
                      <motion.div key={story.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                        <Link href={`/stories/${story.slug}`}
                          className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-theme-surface transition-all hover:-translate-y-1 hover:border-theme-gold/20">
                          <div className="p-3">
                            <h3 className="font-bold text-sm text-white font-cairo group-hover:text-theme-gold transition-colors">{story.titleAr}</h3>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                              <span className="text-theme-gold text-xs font-bold font-cairo">{story.category}</span>
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
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
