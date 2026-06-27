'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageLightbox from './ImageLightbox';

interface Experience {
  id: string;
  titleAr: string;
  titleEn?: string;
  locationCity: string;
  averageRating: number;
  totalReviews: number;
  priceEgp: number;
  images: string[];
  category: string;
  slug: string;
  description?: string;
}

function getTag(category: string): string {
  const map: Record<string, string> = {
    HISTORICAL: 'HISTORY',
    ADVENTURE: 'ADVENTURE',
    CULTURAL: 'CULTURE',
    BEACH: 'BEACH',
    DESERT: 'DESERT',
    FOOD: 'FOOD',
    SHOPPING: 'SHOPPING',
    NIGHTLIFE: 'NIGHTLIFE',
    WELLNESS: 'WELLNESS',
  };
  return map[category] || 'POPULAR';
}

function formatPrice(price: number): string {
  return `ج.م ${price.toLocaleString()}`;
}

function SkeletonCard() {
  return (
    <div className="shrink-0 w-[240px] md:w-auto animate-pulse">
      <div className="rounded-2xl overflow-hidden mb-3 border border-white/[0.08] bg-theme-surface">
        <div className="relative aspect-[4/5] bg-white/5" />
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-12 bg-white/10 rounded" />
            <div className="h-3 w-16 bg-white/10 rounded" />
          </div>
          <div className="h-4 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-1/2 bg-white/10 rounded" />
          <div className="h-3 w-2/3 bg-white/10 rounded" />
          <div className="flex items-center justify-between pt-1">
            <div className="h-5 w-20 bg-white/10 rounded" />
            <div className="h-7 w-16 bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencesSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch('/api/experiences/featured');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setExperiences(data);
      } catch {
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section className="bg-theme-bg py-8 md:py-14">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">EXPERIENCES</p>
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white">
              Top Experiences in Egypt
            </h2>
          </div>
          <Link href="/experiences" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg text-sm font-bold font-english shrink-0 shadow-[0_4px_15px_rgba(212,162,76,0.25)] hover:shadow-[0_8px_30px_rgba(212,162,76,0.4)] transition-all">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:gap-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            experiences.map((exp, i) => (
              <motion.div
                key={exp.id || exp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="shrink-0 w-[240px] md:w-auto group cursor-pointer hover:shadow-[0_0_30px_rgba(212,162,76,0.12)] transition-all duration-500"
              >
                <Link href={`/experiences/${exp.slug}`} className="block">
                  <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/[0.08] group-hover:border-theme-gold/30 transition-all duration-500 bg-theme-surface">
                    <div className="relative aspect-[4/5]">
                      <button onClick={(e) => { e.preventDefault(); setLightbox({ src: exp.images?.[0] || '/assets/placeholder.jpg', title: exp.titleAr }); }} className="absolute inset-0 z-10 w-full h-full" aria-label={`View ${exp.titleAr} image`} />
                      <Image src={exp.images?.[0] || '/assets/placeholder.jpg'} alt={exp.titleAr} fill sizes="(max-width: 768px) 240px, 20vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/90 via-theme-bg/30 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="text-[8px] md:text-[9px] font-bold font-english tracking-[0.1em] text-theme-gold bg-theme-bg/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-theme-gold/20">{getTag(exp.category)}</span>
                      </div>
                      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-theme-bg/60 backdrop-blur-sm flex items-center justify-center touch-target z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} aria-label="Save">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 hover:text-red-400 transition-colors"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex items-center gap-0.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                          <span className="text-[11px] font-bold text-theme-gold font-english">{exp.averageRating}</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-english">({exp.totalReviews?.toLocaleString()})</span>
                      </div>
                      <h3 className="text-sm font-bold font-english text-white leading-tight mb-1">{exp.titleAr}</h3>
                      <p className="text-[10px] text-white/40 font-english mb-2">{exp.locationCity}</p>
                      <p className="text-[9px] text-white/35 font-english line-clamp-1 mb-3">{exp.description || ''}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold font-display text-theme-gold">{formatPrice(exp.priceEgp)}</span>
                          <span className="text-[9px] text-white/30 font-english">/person</span>
                        </div>
                        <Link href="/booking" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg text-[10px] font-bold font-english hover:shadow-[0_4px_12px_rgba(212,162,76,0.3)] transition-all">
                          احجز الآن
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <div className="md:hidden mt-5 flex justify-center">
          <Link href="/experiences" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg text-sm font-bold font-english shadow-[0_4px_12px_rgba(212,162,76,0.2)]">
            View All Experiences
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.title} open={!!lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
