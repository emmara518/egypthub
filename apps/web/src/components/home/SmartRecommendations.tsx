'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart } from '@/components/Icons';
import { useAuthStore } from '@/lib/auth-store';

interface Recommendation {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string | null;
  category: string;
  locationCity: string;
  priceEgp: number;
  averageRating: number;
  totalReviews: number;
  images: string[];
  durationHours: number | null;
}

export default function SmartRecommendations() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/recommendations')
      .then((r) => r.json())
      .then((res) => {
        setRecs(res.data?.slice(0, 6) || []);
        setLoading(false);
      })
      .catch(() => {
        setRecs([]);
        setLoading(false);
      });
  }, []);

  const toggleSave = (id: string) => {
    setSaved((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  };

  return (
    <section className="bg-[#0a1020]/40 py-10 md:py-16 border-t border-theme-gold/[0.04]">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
          <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold">RECOMMENDED FOR YOU</p>
        </div>
        <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold font-display text-white gold-underline mb-6" style={{ paddingBottom: '6px' }}>
          Based on Your Interests
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 pb-2">
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="shrink-0 w-[260px] md:w-[300px] rounded-xl overflow-hidden border border-theme-gold/[0.06]">
                  <div className="h-[200px] skeleton-gold" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 skeleton-gold" />
                    <div className="h-3 w-1/2 skeleton-gold" />
                    <div className="flex justify-between mt-2">
                      <div className="h-4 w-12 skeleton-gold" />
                      <div className="h-4 w-16 skeleton-gold" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {!loading && recs.length === 0 && (
            <div className="w-full text-center py-12">
              <p className="text-white/30 text-sm font-cairo">لا توجد توصيات متاحة حالياً</p>
            </div>
          )}

          {!loading && recs.map((r, i) => (
            <Link key={r.id} href={`/experiences/${r.slug}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                 className="shrink-0 w-[260px] md:w-[300px] group relative rounded-xl overflow-hidden border border-theme-gold/[0.06] hover:border-theme-gold/30 hover:shadow-[0_0_25px_rgba(212,162,76,0.1)] transition-all duration-500 glass-card neon-gold"
              >
                <div className="relative h-[200px]">
                  {r.images[0] ? (
                    <Image src={r.images[0]} alt={r.titleAr} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-theme-surface flex items-center justify-center text-4xl">📍</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-[8px] font-bold font-english tracking-[0.1em] text-theme-gold bg-theme-bg/70 backdrop-blur-sm px-2 py-1 rounded-full border border-theme-gold/20">
                    {r.category}
                  </span>
                  <button onClick={(e) => { e.preventDefault(); toggleSave(r.id); }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-theme-bg/60 backdrop-blur-sm flex items-center justify-center touch-target"
                    aria-label={saved.includes(r.id) ? 'Unsave' : 'Save'}>
                    <Heart size={13} className={saved.includes(r.id) ? 'text-red-400' : 'text-white/60'} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold font-english text-white">{r.titleAr}</h3>
                  <p className="text-[10px] text-white/50 font-english">{r.locationCity}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} />
                      <span className="text-xs font-bold text-theme-gold font-english">{r.averageRating}</span>
                    </div>
                    <span className="text-sm font-bold font-display text-theme-gold">
                      ج.م {r.priceEgp.toLocaleString()}
                      <span className="text-[9px] text-white/30 font-english">/person</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
