'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Provider {
  id: string;
  businessNameAr: string;
  businessNameEn: string | null;
  category: string | null;
  descriptionAr: string | null;
  descriptionEn: string | null;
  locationCity: string | null;
  locationAddress: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  images: string[];
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
  experiences: Experience[];
  reviews: Review[];
}

interface Experience {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string | null;
  priceEgp: number;
  priceUsd: number | null;
  durationHours: number | null;
  images: string[];
  category: string;
  averageRating: number;
  totalReviews: number;
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  createdAt: string;
  user: { name: string; avatarUrl: string | null };
}

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#D4A24C' : 'none'} stroke={filled ? '#D4A24C' : '#5A6478'} strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon key={s} filled={s <= Math.round(rating)} size={size} />
      ))}
      <span className="text-theme-gold text-sm font-bold mr-2">{rating > 0 ? rating.toFixed(1) : 'جديد'}</span>
    </div>
  );
}

function Spinner() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full" />
    </div>
  );
}

export default function ProviderDetailPage({ params }: { params: { id: string } }) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/providers/${params.id}`);
        if (res.status === 404) {
          setProvider(null);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('فشل في تحميل بيانات مقدم الخدمة');
        const json = await res.json();
        setProvider(json.data || json);
      } catch (err: any) {
        setError(err.message || 'حدث خطأ أثناء التحميل');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme-secondary font-cairo mb-4">{error}</p>
          <Link href="/providers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
            العودة لمقدمي الخدمات
          </Link>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">مقدم الخدمة غير موجود</p>
          <Link href="/providers" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
            العودة لمقدمي الخدمات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      {/* Hero Cover */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {provider.images?.[0] ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${provider.images[0]})` }} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-gold/10 to-theme-card flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-theme-muted opacity-30">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/providers" className="inline-flex items-center gap-2 text-theme-gold font-cairo text-sm hover:underline mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              العودة لمقدمي الخدمات
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {provider.category && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-theme-gold/15 text-theme-gold border border-theme-gold/20 font-cairo">
                        {provider.category}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-theme-card text-theme-secondary border border-theme-gold/10 font-cairo flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {provider.locationCity || 'مصر'}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme">{provider.businessNameAr}</h1>
                  {provider.businessNameEn && (
                    <p className="text-theme-muted text-sm font-cairo mt-1">{provider.businessNameEn}</p>
                  )}
                  <div className="mt-3"><StarRating rating={provider.averageRating} size={18} /></div>
                </div>
              </div>
              {provider.descriptionAr && (
                <p className="text-theme-secondary font-cairo leading-relaxed whitespace-pre-line">{provider.descriptionAr}</p>
              )}
            </motion.div>

            {/* Experiences Grid */}
            {provider.experiences && provider.experiences.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-bold font-playfair text-theme mb-5">التجارب</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.experiences.map((exp, i) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={`/experiences/${exp.slug}`}
                        className="group flex gap-4 rounded-2xl border border-theme-gold/15 bg-theme-card p-3 hover:border-theme-gold/30 transition-all duration-300"
                      >
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-theme-gold/5 to-theme-card">
                          {exp.images?.[0] ? (
                            <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${exp.images[0]})` }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-30">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-theme-gold"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className="text-sm font-bold font-playfair text-theme group-hover:text-theme-gold transition-colors truncate">{exp.titleAr}</h3>
                          <div className="flex items-center gap-2 text-xs text-theme-muted font-cairo">
                            {exp.durationHours && (
                              <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                {Math.round(exp.durationHours)} ساعات
                              </span>
                            )}
                          </div>
                          <p className="text-base font-bold text-theme-gold font-english">{exp.priceEgp.toLocaleString()} ج.م</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            {provider.reviews && provider.reviews.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold font-playfair text-theme mb-5">التقييمات ({provider.totalReviews})</h2>
                <div className="space-y-4">
                  {provider.reviews.map((review, i) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="rounded-2xl border border-theme-gold/15 bg-theme-card p-5"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-card flex items-center justify-center text-theme-gold text-sm font-bold font-cairo shrink-0">
                          {review.user?.name?.charAt(0) || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-theme font-cairo">{review.user?.name || 'مستخدم'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} size={12} />
                            <span className="text-theme-muted text-[10px] font-cairo">
                              {new Date(review.createdAt).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.title && <p className="text-sm font-bold text-theme font-cairo mb-1">{review.title}</p>}
                      {review.body && <p className="text-sm text-theme-secondary font-cairo leading-relaxed">{review.body}</p>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">معلومات الاتصال</h2>
              <div className="space-y-4">
                {provider.phone && (
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-theme text-sm font-cairo" dir="ltr">{provider.phone}</span>
                  </div>
                )}
                {provider.email && (
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a href={`mailto:${provider.email}`} className="text-theme text-sm font-cairo hover:text-theme-gold transition-colors truncate">{provider.email}</a>
                  </div>
                )}
                {provider.website && (
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-theme-gold text-sm font-cairo hover:underline truncate">{provider.website}</a>
                  </div>
                )}
                {provider.locationAddress && (
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-theme text-sm font-cairo">{provider.locationAddress}</span>
                  </div>
                )}
              </div>
              {provider.averageRating > 0 && (
                <div className="mt-5 pt-4 border-t border-theme-gold/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-theme-muted font-cairo">إجمالي التقييمات</span>
                    <span className="text-theme font-bold font-english">{provider.totalReviews}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
