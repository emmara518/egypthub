'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplorerGraph, ExplorerNode, CityStats } from '@/lib/explorer/types';

interface CityExplorerViewProps {
  citySlug: string;
  onClose: () => void;
  onPlanTrip: (citySlug: string) => void;
  onTalkToZainab: (citySlug: string) => void;
  graph: ExplorerGraph;
}

interface CityInfo {
  name: string;
  nameEn: string;
  description: string;
  image: string;
}

const CITY_INFO: Record<string, CityInfo> = {
  cairo: { name: 'القاهرة', nameEn: 'Cairo', description: 'مدينة الألف مئذنة', image: '/egypthub/images/destinations/cairo.svg' },
  alexandria: { name: 'الإسكندرية', nameEn: 'Alexandria', description: 'عروس البحر الأبيض المتوسط', image: '/egypthub/images/destinations/alexandria.svg' },
  luxor: { name: 'الأقصر', nameEn: 'Luxor', description: 'معابد فرعونية ووادي الملوك', image: '/egypthub/images/destinations/luxor.svg' },
  aswan: { name: 'أسوان', nameEn: 'Aswan', description: 'سحر النيل وروحانياته', image: '/egypthub/images/destinations/aswan.svg' },
  'sharm-el-sheikh': { name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', description: 'غوص عالمي وحياة ليلية', image: '/egypthub/images/destinations/dahab.svg' },
  hurghada: { name: 'الغردقة', nameEn: 'Hurghada', description: 'شواطئ ذهبية ورياضات مائية', image: '/egypthub/images/destinations/hurghada.svg' },
  dahab: { name: 'دهب', nameEn: 'Dahab', description: 'مغامرات البدو والغوص', image: '/egypthub/images/destinations/dahab.svg' },
  siwa: { name: 'سيوة', nameEn: 'Siwa', description: 'واحة الأحلام', image: '/egypthub/images/destinations/hurghada.svg' },
};

const RELATED_CITIES: Record<string, string[]> = {
  cairo: ['alexandria', 'luxor'],
  alexandria: ['cairo', 'siwa'],
  luxor: ['aswan', 'cairo'],
  aswan: ['luxor', 'cairo'],
  'sharm-el-sheikh': ['dahab', 'hurghada'],
  hurghada: ['sharm-el-sheikh', 'luxor'],
  dahab: ['sharm-el-sheikh', 'cairo'],
  siwa: ['alexandria', 'cairo'],
};

type TabId = 'experiences' | 'stories' | 'food' | 'ambassadors';

const TABS: { id: TabId; label: string }[] = [
  { id: 'experiences', label: 'تجارب' },
  { id: 'stories', label: 'قصص' },
  { id: 'food', label: 'أكل' },
  { id: 'ambassadors', label: 'مرشدون' },
];

export default function CityExplorerView({
  citySlug,
  onClose,
  onPlanTrip,
  onTalkToZainab,
  graph,
}: CityExplorerViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>('experiences');
  const cityInfo = CITY_INFO[citySlug] || { name: citySlug, nameEn: citySlug, description: '', image: '' };

  const cityNodes = graph.cityNodes.filter(n => n.citySlug === citySlug);

  const experiences = graph.experienceNodes.filter(n => n.citySlug === citySlug);
  const stories = graph.storyNodes.filter(n => n.citySlug === citySlug);
  const foodNodes = graph.foodNodes.filter(n => n.citySlug === citySlug);
  const ambassadors = graph.ambassadorNodes.filter(n => n.citySlug === citySlug);

  const stats: CityStats = {
    totalExperiences: experiences.length,
    totalStories: stories.length,
    totalFood: foodNodes.length,
    totalAmbassadors: ambassadors.length,
    categories: [...new Set([...experiences, ...stories, ...foodNodes, ...ambassadors].flatMap(n => n.tags || []))],
    avgDuration: '3-5 أيام',
    popularTags: [],
  };

  const relatedSlugs = RELATED_CITIES[citySlug] || [];

  const renderCard = (node: ExplorerNode, idx: number) => (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="group relative rounded-xl overflow-hidden border border-theme-border bg-theme-card hover:border-theme-gold/30 transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-theme-surface overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${node.image})`, backgroundSize: 'cover' }}
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-theme-gold font-cairo mb-1">{node.labelEn}</p>
        <h4 className="text-sm font-bold text-theme font-cairo line-clamp-2">{node.label}</h4>
        <p className="text-xs text-theme-secondary font-cairo mt-1 line-clamp-2">{node.description}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-theme-bg"
    >
      <div className="relative min-h-screen">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${cityInfo.image})`, backgroundSize: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg/60 to-theme-bg" />

          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-theme-card/80 backdrop-blur-md border border-theme-border flex items-center justify-center text-theme hover:text-theme-gold transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-8 right-6 left-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold font-playfair text-theme mb-2"
            >
              {cityInfo.name}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-lg text-theme-secondary font-cairo"
            >
              {cityInfo.description}
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
            {[
              { label: 'تجارب', value: stats.totalExperiences },
              { label: 'قصص', value: stats.totalStories },
              { label: 'أكل', value: stats.totalFood },
              { label: 'مرشدون', value: stats.totalAmbassadors },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl bg-theme-card/80 border border-theme-border p-4 text-center">
                <p className="text-2xl font-bold text-theme-gold font-playfair">{stat.value}</p>
                <p className="text-xs text-theme-secondary font-cairo mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="flex gap-1 mb-6 border-b border-theme-border overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-cairo whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-theme-gold text-theme-gold'
                    : 'border-transparent text-theme-secondary hover:text-theme'
                }`}
              >
                {tab.label}
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
              {activeTab === 'experiences' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {experiences.length > 0 ? experiences.map((n, i) => renderCard(n, i)) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا توجد تجارب متاحة</p>
                  )}
                </div>
              )}
              {activeTab === 'stories' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stories.length > 0 ? stories.map((n, i) => renderCard(n, i)) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا توجد قصص متاحة</p>
                  )}
                </div>
              )}
              {activeTab === 'food' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {foodNodes.length > 0 ? foodNodes.map((n, i) => renderCard(n, i)) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا توجد أكلات متاحة</p>
                  )}
                </div>
              )}
              {activeTab === 'ambassadors' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ambassadors.length > 0 ? ambassadors.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-theme-border bg-theme-card p-4 text-center hover:border-theme-gold/30 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-theme-surface mx-auto mb-3 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${n.image})` }}
                        />
                      </div>
                      <h4 className="text-sm font-bold text-theme font-cairo">{n.label}</h4>
                      <p className="text-xs text-theme-secondary font-cairo mt-1">{n.subtitle}</p>
                    </motion.div>
                  )) : (
                    <p className="col-span-full text-center text-theme-secondary py-12 font-cairo">لا يوجد مرشدون متاحون</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {relatedSlugs.length > 0 && (
            <div className="mt-12 mb-8">
              <h3 className="text-lg font-bold text-theme font-playfair mb-4">مدن ذات صلة</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {relatedSlugs.map(slug => {
                  const related = CITY_INFO[slug];
                  if (!related) return null;
                  return (
                    <div
                      key={slug}
                      className="flex-shrink-0 w-40 rounded-xl border border-theme-border bg-theme-card overflow-hidden hover:border-theme-gold/30 transition-all duration-300 cursor-pointer"
                      onClick={() => onClose()}
                    >
                      <div className="h-20 bg-theme-surface">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${related.image})` }}
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-bold text-theme font-cairo">{related.name}</p>
                        <p className="text-[10px] text-theme-secondary font-cairo">{related.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pb-12">
            <button
              onClick={() => onPlanTrip(citySlug)}
              className="flex-1 px-6 py-3 rounded-xl bg-theme-gold text-theme-bg font-bold text-sm font-cairo hover:bg-theme-gold/90 transition-colors"
            >
              اقتراح رحلة إلى {cityInfo.name}
            </button>
            <button
              onClick={() => onTalkToZainab(citySlug)}
              className="flex-1 px-6 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo hover:bg-theme-gold/5 transition-colors"
            >
              تحدث مع زينب عن {cityInfo.name}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
