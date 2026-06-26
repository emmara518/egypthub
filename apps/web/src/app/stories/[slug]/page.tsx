'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiChevronLeft, HiHeart, HiShare, HiBookmark, HiTag } from 'react-icons/hi';
import { CompassIcon } from '@/components/EgyptianIcons';

interface StoryDetail {
  slug: string;
  titleAr: string;
  category: string;
  author: { name: string; avatar?: string };
  publishedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  bodyAr: string;
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/stories/${params.slug}`).then((res) => {
      if (cancelled) return;
      if (res.status === 404) { setError('not-found'); setLoading(false); return; }
      if (!res.ok) throw new Error('فشل في تحميل القصة');
      return res.json();
    }).then((data) => {
      if (!cancelled && data) { setStory(data); setLoading(false); }
    }).catch((e) => {
      if (!cancelled) { setError(e instanceof Error ? e.message : 'حدث خطأ'); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center pt-24">
        <div className="w-10 h-10 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error === 'not-found' || (!loading && !story)) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4 pt-24">
        <div className="text-center">
          <CompassIcon className="w-16 h-16 mx-auto mb-4 text-theme-gold/50" />
          <h1 className="text-2xl font-bold font-playfair text-theme mb-2">القصة غير موجودة</h1>
          <p className="text-theme-secondary mb-6 font-cairo">نأسف، لم نتمكن من العثور على هذه القصة</p>
          <Link href="/stories" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold transition-all font-cairo">
            استكشف القصص
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4 pt-24">
        <div className="text-center">
          <p className="text-theme-secondary font-cairo mb-4">{error}</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold font-cairo transition-all">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/stories" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة للقصص
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-theme-gold/15 text-theme-gold border border-theme-gold/20 font-cairo">
                  {story.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-theme-muted font-cairo">
                  <HiCalendar />{story.publishedAt}
                </span>
                <span className="flex items-center gap-1 text-xs text-theme-muted font-cairo">
                  <HiClock />{story.readTimeMinutes} دقائق
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-playfair text-theme leading-tight mb-6">
                {story.titleAr}
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-theme-gold/20 mb-8">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${story.coverImage || '/images/placeholder.svg'})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="prose prose-invert max-w-none mb-8">
              <p className="text-theme/90 text-base md:text-lg leading-relaxed font-cairo whitespace-pre-line">
                {story.bodyAr}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-between p-4 rounded-xl bg-theme-card border border-theme-gold/10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-theme-gold/30"
                  style={{ backgroundImage: `url(${story.author?.avatar || '/images/avatars/placeholder.svg'})` }} />
                <div>
                  <p className="text-sm font-bold text-theme font-cairo">{story.author?.name}</p>
                  <p className="text-xs text-theme-muted font-cairo">كاتب الرحلة</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-theme-muted hover:text-red-400 transition-colors">
                  <HiHeart className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-gold transition-colors">
                  <HiShare className="text-sm" />
                </button>
                <button className="w-9 h-9 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-gold transition-colors">
                  <HiBookmark className="text-sm" />
                </button>
              </div>
            </motion.div>
          </article>

          <aside className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <h3 className="font-bold text-theme text-sm font-cairo mb-3">معلومات القصة</h3>
                <div className="space-y-3">
                  {[
                    { icon: HiCalendar, label: 'التاريخ', value: story.publishedAt },
                    { icon: HiClock, label: 'وقت القراءة', value: `${story.readTimeMinutes} دقائق` },
                    { icon: HiTag, label: 'التصنيف', value: story.category },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                      <item.icon className="text-theme-gold text-sm" />
                      <div>
                        <p className="text-[10px] text-theme-muted font-cairo">{item.label}</p>
                        <p className="text-xs text-theme font-cairo font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/ai-concierge"
                className="block w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo text-center hover:opacity-90 transition-all">
                احكي قصتك مع زينب
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
