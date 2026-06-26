'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, experiences, stories } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';

const categoryLabels: Record<string, string> = {
  experiences: 'التجارب',
  destinations: 'الوجهات',
  stories: 'القصص',
};

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCollectionModal, setShowCollectionModal] = useState<string | null>(null);
  const { collections, addToCollection } = useAppStore();

  const groupedByCategory = useMemo(() => {
    const favoriteDestinations = destinations.filter(d => d.slug === 'sharm-el-sheikh' || d.slug === 'cairo' || d.slug === 'luxor');
    const favoriteExperiences = experiences.filter(e => e.slug === 'pyramids-private-tour' || e.slug === 'red-sea-diving-adventure' || e.slug === 'luxor-temple-tour');
    const favoriteStories = stories?.filter(s => s.slug === 'bedouin-night-under-stars' || s.slug === 'diving-with-turtles') || [];
    return {
      destinations: favoriteDestinations.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      experiences: favoriteExperiences.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      stories: favoriteStories.filter((s) =>
        s.title?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    };
  }, [searchQuery]);

  const collectionNames = Object.keys(collections);

  const assignToCollection = (itemId: string, collectionName: string) => {
    addToCollection(collectionName, itemId);
    setShowCollectionModal(null);
  };

  const tabs = [
    { id: 'destinations', label: 'الوجهات', count: groupedByCategory.destinations.length },
    { id: 'experiences', label: 'التجارب', count: groupedByCategory.experiences.length },
    { id: 'stories', label: 'القصص', count: groupedByCategory.stories.length },
  ];

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          العودة للرئيسية
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white font-playfair">المفضلة</h1>
          <p className="text-white/50 font-cairo mt-1">جميع عناصرك المفضلة في مكان واحد</p>
        </div>

        <div className="relative mb-6">
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المفضلة..."
            className="w-full max-w-md pr-12 pl-4 py-3 rounded-xl bg-theme-surface border border-white/[0.08] text-white placeholder:text-white/30 font-cairo text-sm focus:outline-none focus:border-theme-gold/30 transition-all"
          />
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-cairo whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'bg-theme-surface text-white/60 border border-white/[0.06]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/10 bg-theme-surface p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-theme-gold" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                </div>
                <h2 className="font-bold text-lg font-playfair text-white">أحمد محمد</h2>
                <p className="text-xs text-white/40 font-cairo mb-4">مستكشف مصر</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ val: '24', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '8', label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-theme-card rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-white/40 font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/10 bg-theme-surface p-4 space-y-0.5">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-white/50 hover:text-white hover:bg-theme-card'
                    }`}>
                    <div className="flex items-center justify-between">
                      <span>{tab.label}</span>
                      <span className="text-[10px] opacity-60">{tab.count}</span>
                    </div>
                  </button>
                ))}
              </div>
              <Link href="/collections" className="block w-full text-center px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10 transition-all">
                إدارة المجموعات
              </Link>
            </div>
          </motion.aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'destinations' && (
                <motion.div key="destinations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-3">
                  {groupedByCategory.destinations.length === 0 ? (
                    <div className="text-center py-20">
                      <svg className="w-16 h-16 mx-auto mb-4 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <p className="text-white/40 font-cairo">لا توجد وجهات مطابقة</p>
                    </div>
                  ) : groupedByCategory.destinations.map((dest, idx) => (
                    <motion.div key={dest.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="rounded-xl border border-white/[0.06] bg-theme-surface hover:border-theme-gold/20 transition-all overflow-hidden flex">
                      <div className="relative w-28 shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1525]" />
                      </div>
                      <div className="flex-1 p-4 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A24C"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="text-[10px] text-white/40 font-cairo">{dest.region}</span>
                          </div>
                          <h3 className="font-bold text-white font-cairo mb-0.5">{dest.name}</h3>
                          <p className="text-[10px] text-white/35 font-cairo line-clamp-1">{dest.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 mr-4">
                          <div className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A24C"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                            <span className="text-xs text-white/60 font-english">{dest.rating}</span>
                          </div>
                          <button className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all" aria-label="إزالة من المفضلة">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'experiences' && (
                <motion.div key="experiences" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-3">
                  {groupedByCategory.experiences.length === 0 ? (
                    <div className="text-center py-20">
                      <svg className="w-16 h-16 mx-auto mb-4 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <p className="text-white/40 font-cairo">لا توجد تجارب مطابقة</p>
                    </div>
                  ) : groupedByCategory.experiences.map((exp, idx) => (
                    <motion.div key={exp.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="rounded-xl border border-white/[0.06] bg-theme-surface hover:border-theme-gold/20 transition-all overflow-hidden flex">
                      <div className="relative w-28 shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${exp.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1525]" />
                      </div>
                      <div className="flex-1 p-4 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A24C"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="text-[10px] text-white/40 font-cairo">{exp.location}</span>
                          </div>
                          <h3 className="font-bold text-white text-sm font-cairo mb-0.5">{exp.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-theme-gold text-xs font-bold font-english">EGP {exp.price.toLocaleString()}</span>
                            <span className="text-[10px] text-white/30 font-cairo flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {exp.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 mr-4">
                          <button className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all" aria-label="إزالة من المفضلة">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'stories' && (
                <motion.div key="stories" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-3">
                  {groupedByCategory.stories.length === 0 ? (
                    <div className="text-center py-20">
                      <svg className="w-16 h-16 mx-auto mb-4 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <p className="text-white/40 font-cairo">لا توجد قصص مطابقة</p>
                    </div>
                  ) : groupedByCategory.stories.map((story, idx) => (
                    <motion.div key={story.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="rounded-xl border border-white/[0.06] bg-theme-surface hover:border-theme-gold/20 transition-all overflow-hidden flex">
                      <div className="relative w-28 shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${story.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1525]" />
                      </div>
                      <div className="flex-1 p-4 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white font-cairo mb-1">{story.title}</h3>
                          <p className="text-[10px] text-white/35 font-cairo line-clamp-1">{story.excerpt}</p>
                        </div>
                        <button className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all shrink-0 mr-4" aria-label="إزالة من المفضلة">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCollectionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCollectionModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-theme-card border border-theme-gold/20 p-6 mx-4"
            >
              <h3 className="text-lg font-bold text-white font-cairo mb-4">أضف إلى مجموعة</h3>
              {collectionNames.length === 0 ? (
                <p className="text-sm text-white/40 font-cairo">لا توجد مجموعات. أنشئ مجموعة أولاً.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {collectionNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => assignToCollection(showCollectionModal, name)}
                      className="w-full text-right px-4 py-3 rounded-xl bg-theme-surface/50 hover:bg-theme-gold/10 border border-white/[0.05] hover:border-theme-gold/20 transition-all text-sm text-white font-cairo"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowCollectionModal(null)}
                className="mt-4 w-full py-2.5 rounded-xl border border-white/10 text-white/50 text-sm font-cairo hover:border-white/20 transition-all"
              >
                إلغاء
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
