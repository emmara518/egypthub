'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumCard from './PremiumCard';
import type { ExplorerGraph, ExplorerNode, CityStats } from '@/lib/explorer/types';

interface CityExplorerViewProps {
  citySlug: string;
  onClose: () => void;
  onPlanTrip: (citySlug: string) => void;
  onTalkToZainab: (citySlug: string) => void;
  graph: ExplorerGraph;
}

interface CityHero {
  name: string;
  nameEn: string;
  description: string;
  image: string;
}

const CITY_HERO: Record<string, CityHero> = {
  cairo: { name: 'القاهرة', nameEn: 'Cairo', description: 'مدينة الألف مئذنة', image: '/images/destinations/cairo.jpg' },
  alexandria: { name: 'الإسكندرية', nameEn: 'Alexandria', description: 'عروس البحر الأبيض المتوسط', image: '/images/destinations/alexandria.jpg' },
  luxor: { name: 'الأقصر', nameEn: 'Luxor', description: 'معابد فرعونية ووادي الملوك', image: '/images/destinations/luxor.jpg' },
  aswan: { name: 'أسوان', nameEn: 'Aswan', description: 'سحر النيل وروحانياته', image: '/images/destinations/aswan.jpg' },
  'sharm-el-sheikh': { name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', description: 'غوص عالمي وحياة ليلية', image: '/images/destinations/sharm.jpg' },
  hurghada: { name: 'الغردقة', nameEn: 'Hurghada', description: 'شواطئ ذهبية ورياضات مائية', image: '/images/destinations/hurghada.jpg' },
  dahab: { name: 'دهب', nameEn: 'Dahab', description: 'مغامرات البدو والغوص', image: '/images/destinations/dahab.jpg' },
  siwa: { name: 'سيوة', nameEn: 'Siwa', description: 'واحة الأحلام', image: '/images/destinations/siwa.jpg' },
};

const RELATED: Record<string, string[]> = {
  cairo: ['alexandria', 'luxor'], alexandria: ['cairo', 'siwa'],
  luxor: ['aswan', 'cairo'], aswan: ['luxor', 'cairo'],
  'sharm-el-sheikh': ['dahab', 'hurghada'], hurghada: ['sharm-el-sheikh', 'luxor'],
  dahab: ['sharm-el-sheikh'], siwa: ['alexandria'],
};

type TabId = 'experiences' | 'stories' | 'food' | 'ambassadors';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'experiences', label: 'تجارب', icon: '✨' },
  { id: 'stories', label: 'قصص', icon: '📖' },
  { id: 'food', label: 'مطاعم', icon: '🍽️' },
  { id: 'ambassadors', label: 'مرشدون', icon: '🧕' },
];

function StatCard({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-xl bg-theme-card/80 border border-theme-border p-4 text-center hover:border-theme-gold/20 transition-colors"
    >
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        className="text-2xl font-bold text-theme-gold font-playfair"
      >
        {value}
      </motion.p>
      <p className="text-[10px] text-theme-secondary font-cairo mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function CityExplorerView({
  citySlug, onClose, onPlanTrip, onTalkToZainab, graph,
}: CityExplorerViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('experiences');
  const hero = CITY_HERO[citySlug] || { name: citySlug, nameEn: citySlug, description: '', image: '' };

  const experiences = graph.experienceNodes.filter(n => n.citySlug === citySlug);
  const stories = graph.storyNodes.filter(n => n.citySlug === citySlug);
  const foodNodes = graph.foodNodes.filter(n => n.citySlug === citySlug);
  const ambassadors = graph.ambassadorNodes.filter(n => n.citySlug === citySlug);

  const relatedSlugs = RELATED[citySlug] || [];

  const tabNodes: Record<TabId, ExplorerNode[]> = {
    experiences, stories, food: foodNodes, ambassadors,
  };

  const handleSelect = (node: ExplorerNode) => {
    if (node.type === 'city') onClose();
    else onClose();
  };

  const handleFav = () => {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-theme-bg"
    >
      <div className="relative min-h-screen">
        <div className="h-72 md:h-96 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-theme-bg/50 to-theme-bg" />

          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-theme-card/60 backdrop-blur-md border border-theme-border flex items-center justify-center text-theme hover:text-theme-gold hover:border-theme-gold/30 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-10 right-6 left-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold font-playfair text-white drop-shadow-lg"
            >
              {hero.name}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg text-white/70 font-cairo drop-shadow"
            >
              {hero.description}
            </motion.p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            <StatCard label="تجارب" value={experiences.length} delay={0.25} />
            <StatCard label="قصص" value={stories.length} delay={0.3} />
            <StatCard label="مطاعم" value={foodNodes.length} delay={0.35} />
            <StatCard label="مرشدون" value={ambassadors.length} delay={0.4} />
          </motion.div>

          <div className="flex gap-1 mb-6 border-b border-theme-border overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-cairo whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-theme-gold text-theme-gold'
                    : 'border-transparent text-theme-secondary hover:text-theme'
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
                <span className={`text-[10px] ${activeTab === tab.id ? 'text-theme-gold' : 'text-theme-muted'}`}>
                  ({tabNodes[tab.id].length})
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'ambassadors' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ambassadors.length > 0 ? ambassadors.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-xl border border-theme-border bg-theme-card p-5 text-center hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 mx-auto mb-3 overflow-hidden ring-2 ring-transparent group-hover:ring-emerald-500/30 transition-all">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${n.image || '/images/avatars/default.jpg'})` }}
                        />
                      </div>
                      <h4 className="text-sm font-bold text-theme font-cairo">{n.label}</h4>
                      <p className="text-[10px] text-theme-secondary font-cairo mt-1">{n.subtitle}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-[10px] text-theme font-english">{n.data?.rating || '—'}</span>
                      </div>
                    </motion.div>
                  )) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا يوجد مرشدون متاحون</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {tabNodes[activeTab].length > 0 ? tabNodes[activeTab].map((n, i) => (
                    <PremiumCard
                      key={n.id}
                      node={n}
                      index={i}
                      onSelect={() => handleSelect(n)}
                      onFavorite={handleFav}
                      variant="default"
                    />
                  )) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا توجد نتائج متاحة</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {relatedSlugs.length > 0 && (
            <div className="mt-12 mb-8">
              <h3 className="text-sm font-bold text-theme font-playfair mb-4">مدن ذات صلة</h3>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                {relatedSlugs.map(slug => {
                  const related = CITY_HERO[slug];
                  if (!related) return null;
                  return (
                    <div
                      key={slug}
                      className="flex-shrink-0 w-40 rounded-xl border border-theme-border bg-theme-card overflow-hidden hover:border-theme-gold/30 hover:shadow-lg hover:shadow-theme-gold/5 transition-all duration-300 cursor-pointer group"
                      onClick={onClose}
                    >
                      <div className="h-24 bg-theme-surface overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url(${related.image})` }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-theme font-cairo">{related.name}</p>
                        <p className="text-[10px] text-theme-secondary font-cairo mt-0.5 line-clamp-1">{related.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pb-16">
            <button
              onClick={() => onPlanTrip(citySlug)}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-amber-500 text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-theme-gold/15"
            >
              اقتراح رحلة إلى {hero.name}
            </button>
            <button
              onClick={() => onTalkToZainab(citySlug)}
              className="flex-1 px-6 py-3 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/5 hover:border-theme-gold/30 transition-all active:scale-[0.98]"
            >
              تحدث مع زينب عن {hero.name}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
