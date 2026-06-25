'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBusinessesByCategory, categoryDisplayNames, SHARM_BUSINESSES } from '@/lib/mock-data';
import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';

const validSlugs = ['restaurants', 'cafes', 'activities', 'hotels', 'shopping', 'transport'];

export default function CategoryClient({ slug }: { slug: string }) {
  const { locale, dir } = useLang();
  const isRtl = dir === 'rtl';

  if (!validSlugs.includes(slug)) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">{t(locale, 'common.error')}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            {t(locale, 'common.back')}
          </Link>
        </div>
      </div>
    );
  }

  const businesses = getBusinessesByCategory(slug);
  const displayName = categoryDisplayNames[slug] || slug;

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <Link href="/" className={`inline-flex items-center gap-2 text-theme-gold font-cairo mb-8 hover:underline ${isRtl ? '' : 'flex-row-reverse'}`}>
          {isRtl ? '← العودة للرئيسية' : '← Back to Home'}
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-theme mb-2">{displayName}</h1>
              <p className="text-theme-secondary font-cairo">{businesses.length} {isRtl ? 'مكان في شرم الشيخ' : 'places in Sharm El-Sheikh'}</p>
            </div>
            <div className="text-5xl opacity-30">
              {slug === 'restaurants' ? '🍽' : slug === 'cafes' ? '☕' : slug === 'activities' ? '🏄' : slug === 'hotels' ? '🏨' : slug === 'shopping' ? '🛍' : '🚗'}
            </div>
          </div>

          {businesses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-theme-secondary font-cairo text-lg">{isRtl ? 'لا توجد أماكن في هذا التصنيف حالياً' : 'No places in this category yet'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((biz) => (
                <motion.div key={biz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-theme-gold/15 bg-theme-card overflow-hidden hover:border-theme-gold/30 transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {biz.featured && (
                      <span className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-3 py-1 rounded-full bg-theme-gold text-dark-900 text-[10px] font-bold font-cairo`}>
                        {isRtl ? 'مميز' : 'Featured'}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-theme font-cairo">{biz.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-theme-gold text-sm">★</span>
                        <span className="text-sm text-theme-secondary">{biz.rating}</span>
                      </div>
                    </div>
                    <p className="text-theme-muted text-sm font-cairo mb-3 line-clamp-2">{biz.description}</p>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {biz.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold text-[10px] font-cairo">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-theme-border">
                      <div className="flex items-center gap-2 text-theme-muted text-xs">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                        </svg>
                        <span className="font-cairo">{biz.address}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Nearby category links */}
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-theme mb-6">{isRtl ? 'تصفح تصنيفات أخرى' : 'Browse Other Categories'}</h2>
            <div className="flex flex-wrap gap-3">
              {validSlugs.filter(s => s !== slug).map(s => (
                <Link key={s} href={`/category/${s}`}
                  className="px-5 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold font-cairo text-sm hover:bg-theme-gold/10 transition-all">
                  {categoryDisplayNames[s]}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
