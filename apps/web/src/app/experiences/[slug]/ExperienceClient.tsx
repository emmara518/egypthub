'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiStar, HiLocationMarker, HiClock, HiUserGroup, HiCheck, HiX } from 'react-icons/hi';

interface ReviewUser {
  name: string;
  avatarUrl: string | null;
}

interface Review {
  id: string;
  rating: number;
  body: string | null;
  createdAt: string;
  user: ReviewUser;
}

interface ProviderInfo {
  id: string;
  businessNameAr: string;
  businessNameEn: string | null;
  locationCity: string | null;
}

interface RelatedExperience {
  id: string;
  slug: string;
  titleAr: string;
  images: string[];
  priceEgp: number;
  averageRating: number;
  totalReviews: number;
  locationCity: string;
}

interface ExperienceData {
  id: string;
  slug: string;
  titleAr: string;
  descriptionAr: string;
  category: string;
  locationCity: string;
  durationHours: number | null;
  maxParticipants: number | null;
  priceEgp: number;
  images: string[];
  included: string[];
  excluded: string[];
  averageRating: number;
  totalReviews: number;
  provider: ProviderInfo;
  reviews: Review[];
  relatedExperiences: RelatedExperience[];
}

const categoryLabels: Record<string, string> = {
  HISTORICAL: 'جولات تاريخية',
  WATER_SPORTS: 'رياضات مائية',
  ADVENTURE: 'مغامرات',
  NILE: 'رحلات نيلية',
  WELLNESS: 'استجمام',
  CULTURE: 'ثقافة',
  FOOD: 'طعام',
};

export default function ExperienceClient({ slug }: { slug: string }) {
  const [experience, setExperience] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/experiences/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError({ status: 404, message: 'التجربة غير موجودة' });
          } else {
            setError({ message: 'حدث خطأ أثناء تحميل التجربة' });
          }
          return;
        }
        const data: ExperienceData = await res.json();
        setExperience(data);
      } catch {
        setError({ message: 'حدث خطأ أثناء تحميل التجربة' });
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-gold/20 border-t-theme-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen bg-theme-bg flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
            <p className="text-theme text-lg font-cairo mb-8">التجربة غير موجودة</p>
            <Link href="/experiences" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
              العودة للتجارب
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme text-lg font-cairo mb-8">{error.message}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!experience) return null;

  const {
    titleAr, descriptionAr, category, averageRating, totalReviews,
    locationCity, priceEgp, durationHours, maxParticipants, images,
    included, excluded, reviews, relatedExperiences, provider,
  } = experience;

  return (
    <div className="min-h-screen bg-theme-bg">
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[0] || ''})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-theme-gold/20 text-theme-gold text-xs font-bold font-cairo border border-theme-gold/30">
                {categoryLabels[category] || category}
              </span>
              <div className="flex items-center gap-1.5">
                <HiStar className="w-4 h-4 text-accent-amber" />
                <span className="text-accent-amber text-sm font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-white/50 text-xs font-cairo">({totalReviews} تقييم)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-4">{titleAr}</h1>
            <div className="flex items-center gap-2 text-white/70 font-cairo">
              <HiLocationMarker className="w-5 h-5" />
              <span>{locationCity}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="py-6">
          <Link href="/experiences" className="inline-flex items-center gap-2 text-theme-gold font-cairo hover:underline text-sm">
            ← العودة للتجارب
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          <div className="lg:col-span-2 space-y-10">
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/10">
                  <p className="text-theme-gold text-lg font-bold font-english">ج.م {priceEgp.toLocaleString()}</p>
                  <p className="text-theme-muted text-xs font-cairo mt-1">للشخص</p>
                </div>
                {durationHours && (
                  <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/10">
                    <HiClock className="w-5 h-5 text-theme-gold mb-1" />
                    <p className="text-theme text-sm font-cairo">{durationHours} {durationHours >= 2 ? 'ساعات' : 'ساعة'}</p>
                    <p className="text-theme-muted text-xs font-cairo mt-1">المدة</p>
                  </div>
                )}
                {maxParticipants && (
                  <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/10">
                    <HiUserGroup className="w-5 h-5 text-theme-gold mb-1" />
                    <p className="text-theme text-sm font-cairo">{maxParticipants} أشخاص</p>
                    <p className="text-theme-muted text-xs font-cairo mt-1">الحد الأقصى</p>
                  </div>
                )}
                <div className="p-4 rounded-2xl bg-theme-card border border-theme-gold/10">
                  <HiLocationMarker className="w-5 h-5 text-theme-gold mb-1" />
                  <p className="text-theme text-sm font-cairo">{locationCity}</p>
                  <p className="text-theme-muted text-xs font-cairo mt-1">الموقع</p>
                </div>
              </div>
              <Link
                href={`/booking?experience=${slug}`}
                className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-lg transition-all hover:bg-theme-gold/80 w-full justify-center"
              >
                احجز الآن
              </Link>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-playfair font-bold text-theme mb-6">عن التجربة</h2>
              <p className="text-theme/80 font-cairo leading-relaxed whitespace-pre-line">{descriptionAr}</p>
            </motion.section>

            {(included.length > 0 || excluded.length > 0) && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {included.length > 0 && (
                    <div className="p-6 rounded-2xl bg-theme-card border border-green-500/10">
                      <h3 className="text-lg font-bold font-cairo text-green-400 mb-4">يشمل</h3>
                      <ul className="space-y-3">
                        {included.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <HiCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <span className="text-theme/80 font-cairo text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {excluded.length > 0 && (
                    <div className="p-6 rounded-2xl bg-theme-card border border-red-500/10">
                      <h3 className="text-lg font-bold font-cairo text-red-400 mb-4">لا يشمل</h3>
                      <ul className="space-y-3">
                        {excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <HiX className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <span className="text-theme/80 font-cairo text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-playfair font-bold text-theme mb-6">التقييمات</h2>
              {reviews.length === 0 ? (
                <p className="text-theme-muted font-cairo">لا توجد تقييمات بعد</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-5 rounded-2xl bg-theme-card border border-theme-gold/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-theme-gold/20 flex items-center justify-center text-theme-gold font-bold font-cairo">
                            {review.user.name.charAt(0)}
                          </div>
                          <p className="text-theme font-cairo font-semibold">{review.user.name}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <HiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent-amber' : 'text-neutral-600'}`} />
                          ))}
                        </div>
                      </div>
                      {review.body && <p className="text-theme/70 font-cairo text-sm leading-relaxed">{review.body}</p>}
                    </div>
                  ))}
                </div>
              )}
            </motion.section>

            {relatedExperiences && relatedExperiences.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-playfair font-bold text-theme mb-6">تجارب مشابهة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedExperiences.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/experiences/${rel.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-theme-gold/20 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                          style={{ backgroundImage: `url(${rel.images[0] || ''})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                        <div className="absolute bottom-3 right-3 left-3">
                          <h3 className="text-sm md:text-base font-bold font-playfair text-white group-hover:text-theme-gold transition-colors">{rel.titleAr}</h3>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <HiStar className="w-3.5 h-3.5 text-accent-amber" />
                          <span className="text-accent-amber text-xs font-bold">{rel.averageRating.toFixed(1)}</span>
                        </div>
                        <span className="text-theme-gold text-sm font-bold">{rel.priceEgp.toLocaleString()} ج.م</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

            {relatedExperiences && relatedExperiences.length === 0 && (
              <p className="text-theme-muted font-cairo">لا توجد تجارب مشابهة</p>
            )}
          </div>

          <div className="space-y-6">
            {provider && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-theme-card border border-theme-gold/10"
              >
                <h3 className="text-lg font-bold font-cairo text-theme mb-4">مقدم الخدمة</h3>
                <p className="text-theme font-cairo font-semibold">{provider.businessNameAr}</p>
                {provider.businessNameEn && (
                  <p className="text-theme-muted text-sm font-cairo mt-1">{provider.businessNameEn}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
