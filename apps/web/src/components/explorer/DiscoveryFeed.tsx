'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ExplorerGraph, ExplorerNode, ExplorerFilter } from '@/lib/explorer/types';

interface DiscoveryFeedProps {
  graph: ExplorerGraph;
  onNodeSelect: (nodeId: string) => void;
  onCitySelect: (citySlug: string) => void;
  filter?: ExplorerFilter;
  highlightedIds?: string[];
}

interface FeedSection {
  id: string;
  title: string;
  subtitle: string;
  nodes: ExplorerNode[];
}

function getCardType(node: ExplorerNode) {
  switch (node.type) {
    case 'city': return 'city';
    case 'experience': return 'experience';
    case 'story': return 'story';
    case 'food': return 'food';
    case 'ambassador': return 'ambassador';
  }
}

export default function DiscoveryFeed({
  graph,
  onNodeSelect,
  onCitySelect,
  filter,
  highlightedIds = [],
}: DiscoveryFeedProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sections: FeedSection[] = useMemo(() => {
    const all = [
      ...graph.experienceNodes,
      ...graph.storyNodes,
      ...graph.foodNodes,
      ...graph.ambassadorNodes,
      ...graph.cityNodes,
    ];

    const filtered = filter
      ? all.filter(n => {
          if (filter.categories.length > 0 && !n.tags.some(t => filter.categories.includes(t))) return false;
          if (filter.types.length > 0 && !filter.types.includes(n.type)) return false;
          return true;
        })
      : all;

    if (filtered.length === 0) return [];

    const trending = [...filtered].sort((a, b) => b.priority - a.priority).slice(0, 8);
    const featured = graph.storyNodes.filter(n => !filter || filter.categories.length === 0 || n.tags.some(t => filter.categories.includes(t))).slice(0, 6);
    const popularFood = graph.foodNodes.filter(n => !filter || filter.categories.length === 0 || n.tags.some(t => filter.categories.includes(t))).slice(0, 6);
    const recommended = [...filtered].sort(() => Math.random() - 0.5).slice(0, 6);

    return [
      { id: 'trending', title: 'رائج الآن', subtitle: 'الأكثر مشاهدة', nodes: trending },
      { id: 'stories', title: 'قصص مميزة', subtitle: 'اكتشف حكايات مصر', nodes: featured },
      { id: 'food', title: 'أشهر الأكلات', subtitle: 'مذاق أصيل', nodes: popularFood },
      { id: 'recommended', title: 'موصى به من زينب', subtitle: 'اختيارات ذكية لك', nodes: recommended },
    ].filter(s => s.nodes.length > 0);
  }, [graph, filter]);

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" />
          <path d="M12 18V6" />
        </svg>
        <p className="text-theme-secondary font-cairo mt-4">لا توجد نتائج</p>
      </div>
    );
  }

  const renderCard = (node: ExplorerNode, idx: number) => {
    const isHighlighted = highlightedIds.includes(node.id);
    const isFav = favorites.has(node.id);
    const cardType = getCardType(node);

    const handleClick = () => {
      if (node.type === 'city') onCitySelect(node.citySlug);
      else onNodeSelect(node.id);
    };

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.04 }}
        className={`group relative flex-shrink-0 w-56 rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${
          isHighlighted
            ? 'border-theme-gold bg-theme-gold/5'
            : 'border-theme-border bg-theme-card hover:border-theme-gold/30'
        }`}
        onClick={handleClick}
      >
        <div className="aspect-[4/3] bg-theme-surface overflow-hidden relative">
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${node.image})`, backgroundSize: 'cover' }}
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-cairo ${
              cardType === 'city' ? 'bg-theme-gold/20 text-theme-gold' :
              cardType === 'experience' ? 'bg-blue-500/20 text-blue-400' :
              cardType === 'story' ? 'bg-purple-500/20 text-purple-400' :
              cardType === 'food' ? 'bg-orange-500/20 text-orange-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {node.type}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(node.id); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill={isFav ? '#D4A24C' : 'none'}
              stroke={isFav ? '#D4A24C' : 'rgba(255,255,255,0.6)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-theme-gold font-cairo mb-0.5">{node.labelEn}</p>
          <h4 className="text-sm font-bold text-theme font-cairo line-clamp-1">{node.label}</h4>
          <p className="text-xs text-theme-secondary font-cairo mt-1 line-clamp-2">{node.subtitle || node.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-10">
      {sections.map(section => (
        <section key={section.id}>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-theme font-playfair">{section.title}</h3>
              <p className="text-xs text-theme-secondary font-cairo">{section.subtitle}</p>
            </div>
            <button className="text-xs text-theme-gold hover:underline font-cairo">استكشف الكل</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
            {section.nodes.map((node, i) => renderCard(node, i))}
          </div>
        </section>
      ))}
    </div>
  );
}
