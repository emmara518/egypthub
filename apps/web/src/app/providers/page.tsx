'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Provider {
  id: string;
  businessNameAr: string;
  businessNameEn: string | null;
  category: string | null;
  locationCity: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  descriptionAr: string | null;
  images: string[];
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
  _count?: { experiences: number };
}

const categoryFilters = [
  { label: 'الكل', value: '' },
  { label: 'نشاط', value: 'ADVENTURE' },
  { label: 'يخت', value: 'NILE' },
  { label: 'مطعم', value: 'FOOD' },
  { label: 'فندق', value: 'WELLNESS' },
  { label: 'غوص', value: 'WATER_SPORTS' },
  { label: 'سفاري', value: 'HISTORICAL' },
  { label: 'تصوير', value: 'CULTURE' },
];

const categoryBadge: Record<string, string> = {
  ADVENTURE: 'tag-adventure',
  NILE: 'tag-luxury',
  FOOD: 'tag-culture',
  WELLNESS: 'tag-beach',
  WATER_SPORTS: 'tag-beach',
  HISTORICAL: 'tag-history',
  CULTURE: 'tag-culture',
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? 'var(--gold)' : 'none'} stroke={filled ? 'var(--gold)' : 'var(--text-muted)'} strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-theme-gold/15 bg-theme-card animate-pulse">
      <div className="h-44 bg-theme-elevated" />
      <div className="p-4 space-y-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-theme-elevated" />
          ))}
        </div>
        <div className="h-5 bg-theme-elevated rounded w-3/4" />
        <div className="h-3 bg-theme-elevated rounded w-1/2" />
        <div className="h-3 bg-theme-elevated rounded w-1/3" />
      </div>
    </div>
  );
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('');

  const fetchProviders = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('isActive', 'true');
      if (category) params.set('category', category);
      const res = await fetch(`/api/providers?${params}`);
      if (!res.ok) throw new Error('فشل في تحميل مقدمي الخدمات');
      const json = await res.json();
      setProviders(json.data || json);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء التحميل');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders(activeCategory);
  }, [activeCategory, fetchProviders]);

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 pt-24">
          <div className="flex items-center gap-2 text-theme-muted text-sm font-cairo mb-2">
            <Link href="/" className="hover:text-theme-gold transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-theme">مقدمو الخدمات</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-theme mb-2">مقدمو الخدمات</h1>
          <p className="text-theme-secondary font-cairo max-w-2xl">
            نخبة من أفضل مقدمي الخدمات والتجارب السياحية في مصر
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((cat) => (
            <motion.button
              key={cat.value || 'all'}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-cairo font-semibold transition-all ${
                activeCategory === cat.value
                  ? 'bg-theme-gold text-dark-900'
                  : 'bg-theme-card border border-theme-gold/15 text-theme-secondary hover:border-theme-gold/30'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-theme-muted mb-4">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-theme-secondary font-cairo mb-4">{error}</p>
            <button
              onClick={() => fetchProviders(activeCategory)}
              className="px-6 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90"
            >
              إعادة المحاولة
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {providers.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-theme-muted mb-4">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <p className="text-theme-secondary font-cairo">لا يوجد مقدمي خدمات مطابقون</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory || 'all'}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {providers.map((provider) => (
                  <motion.div
                    key={provider.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/providers/${provider.id}`}
                      className="group block rounded-2xl border border-theme-gold/15 bg-theme-card overflow-hidden hover:border-theme-gold/30 transition-all duration-300 h-full"
                    >
                      <div className="relative h-44 bg-gradient-to-br from-theme-gold/5 to-theme-card overflow-hidden">
                        {provider.images?.[0] ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${provider.images[0]})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-theme-gold">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        {provider.category && (
                          <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-dark-900/70 text-theme-gold border border-theme-gold/20 font-cairo ${categoryBadge[provider.category] || ''}`}>
                            {provider.category}
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s}><StarIcon filled={s <= Math.round(provider.averageRating)} /></span>
                          ))}
                          <span className="text-theme-gold text-xs font-semibold mr-1">
                            {provider.averageRating > 0 ? provider.averageRating.toFixed(1) : 'جديد'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-playfair text-theme leading-tight">{provider.businessNameAr}</h3>
                        <p className="text-xs text-theme-muted font-cairo flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {provider.locationCity || 'مصر'}
                        </p>
                        <p className="text-xs text-theme-secondary font-cairo">
                          {(provider as any)._count?.experiences ?? 0} تجارب
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
