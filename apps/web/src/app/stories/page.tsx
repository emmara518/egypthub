'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiBookmark, HiRefresh } from 'react-icons/hi';
import StatsBar from '@/components/StatsBar';

interface StoryItem {
  slug: string;
  titleAr: string;
  category: string;
  author: { name: string; avatar?: string };
  readTimeMinutes: number;
  coverImage: string;
  publishedAt: string;
}

function StoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-theme-gold/10 bg-theme-card animate-pulse">
      <div className="h-48 bg-theme-surface" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-theme-surface rounded" />
        <div className="h-3 w-full bg-theme-surface rounded" />
        <div className="flex justify-between">
          <div className="h-3 w-24 bg-theme-surface rounded" />
          <div className="h-3 w-16 bg-theme-surface rounded" />
        </div>
      </div>
    </div>
  );
}

export default function StoriesPage() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stories?page=1&limit=12');
      if (!res.ok) throw new Error('فشل في تحميل القصص');
      const json = await res.json();
      setStories(json.stories || json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <path d="M0 300 Q 200 150 400 300 T 800 300 T 1200 300 T 1440 300" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <path d="M0 400 Q 200 250 400 400 T 800 400 T 1200 400 T 1440 400" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold mb-6">
              <HiBookmark className="w-4 h-4" />
              {loading ? '...' : stories.length} قصة
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-theme leading-tight mb-6">
            قصص <span className="text-theme-gold">المسافرين</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-theme/70 mb-10 max-w-2xl font-cairo">
            قصص حقيقية من مسافرين استكشفوا مصر — حكايات ملهمة وتجارب لا تنسى.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
      </section>

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          {error && (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-theme-secondary font-cairo mb-4">{error}</p>
              <button onClick={fetchStories}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold text-sm font-cairo transition-all">
                <HiRefresh className="w-4 h-4" />إعادة المحاولة
              </button>
            </div>
          )}

          {loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <StoryCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && !error && stories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HiBookmark className="w-16 h-16 text-theme-gold/30 mb-4" />
              <h3 className="text-xl font-bold font-playfair text-theme mb-2">لا توجد قصص بعد</h3>
              <p className="text-theme-secondary font-cairo mb-6">كن أول من يشارك قصته مع المجتمع</p>
              <Link href="/ai-concierge"
                className="px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold font-cairo transition-all">
                ابدأ رحلتك
              </Link>
            </div>
          )}

          {!loading && !error && stories.length > 0 && (
            <>
              <div className="mb-8">
                <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-2 font-poppins">
                  {stories.length} قصة
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme">
                  أحدث <span className="text-theme-gold">القصص</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, idx) => (
                  <motion.div key={story.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                    <Link href={`/stories/${story.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-theme-gold/10 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]">
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                          style={{ backgroundImage: `url(${story.coverImage || '/images/placeholder.svg'})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30 font-cairo">
                            {story.category}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-bold font-playfair text-white mb-1 group-hover:text-theme-gold transition-colors">
                            {story.titleAr}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-xs text-theme-muted font-cairo">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1"><HiCalendar />{story.publishedAt}</span>
                            <span className="flex items-center gap-1"><HiClock />{story.readTimeMinutes} دقائق</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-cover bg-center border border-theme-gold/30"
                              style={{ backgroundImage: `url(${story.author?.avatar || '/images/avatars/placeholder.svg'})` }} />
                            <span>{story.author?.name}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <StatsBar />
    </>
  );
}
