'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiChevronLeft, HiHeart, HiShare, HiBookmark, HiLocationMarker, HiTag } from 'react-icons/hi';
import { stories } from '@/lib/mock-data';
import { CompassIcon } from '@/components/EgyptianIcons';
import Testimonials from '@/components/Testimonials';

export default function StoryClient({ slug }: { slug: string }) {
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
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

  const relatedStories = stories.filter(s => s.slug !== story.slug && s.category === story.category).slice(0, 3);

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
                <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-theme-gold/15 text-theme-gold border border-theme-gold/20 font-cairo">{story.category}</span>
                <span className="flex items-center gap-1 text-xs text-theme-muted font-cairo"><HiCalendar />{story.date}</span>
                <span className="flex items-center gap-1 text-xs text-theme-muted font-cairo"><HiClock />{story.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-playfair text-theme leading-tight mb-2">{story.title}</h1>
              <p className="text-xl text-theme-secondary font-cairo mb-6">{story.subtitle}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-theme-gold/20 mb-8">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${story.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
              <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-900/70 text-white font-cairo">{story.location}</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="prose prose-invert max-w-none space-y-4 mb-8">
              {story.content.map((paragraph, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                  className="text-theme/90 text-base md:text-lg leading-relaxed font-cairo">
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8">
              {story.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-border text-xs text-theme-secondary font-cairo flex items-center gap-1">
                  <HiTag className="text-theme-gold text-[10px]" />{tag}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex items-center justify-between p-4 rounded-xl bg-theme-card border border-theme-gold/10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-theme-gold/30"
                  style={{ backgroundImage: `url(${story.authorAvatar})` }} />
                <div>
                  <p className="text-sm font-bold text-theme font-cairo">{story.author}</p>
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
                    { icon: HiCalendar, label: 'التاريخ', value: story.date },
                    { icon: HiClock, label: 'وقت القراءة', value: story.readTime },
                    { icon: HiLocationMarker, label: 'الموقع', value: story.location },
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

              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <h3 className="font-bold text-theme text-sm font-cairo mb-3">الوسوم</h3>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-theme-surface border border-theme-border text-[10px] text-theme-secondary font-cairo">{tag}</span>
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

        {relatedStories.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16">
            <div className="mb-6">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-1 font-poppins">قد تعجبك أيضاً</p>
              <h2 className="text-2xl font-bold font-playfair text-theme">قصص <span className="text-theme-gold">مشابهة</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedStories.map((rel, idx) => (
                <motion.div key={rel.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                  <Link href={`/stories/${rel.slug}`}
                    className="group block rounded-xl overflow-hidden border border-theme-gold/10 bg-theme-card transition-all hover:-translate-y-1">
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${rel.image})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/90 text-dark-900">{rel.category}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm text-theme font-cairo group-hover:text-theme-gold transition-colors">{rel.title}</h3>
                      <p className="text-theme-muted text-xs font-cairo mt-1">{rel.date} • {rel.readTime}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Testimonials />
    </div>
  );
}
