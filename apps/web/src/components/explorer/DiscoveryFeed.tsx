'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PremiumCard from './PremiumCard';
import type { ExplorerGraph, ExplorerNode, ExplorerFilter } from '@/lib/explorer/types';

interface DiscoveryFeedProps {
  graph: ExplorerGraph;
  onNodeSelect: (nodeId: string) => void;
  onCitySelect: (citySlug: string) => void;
  onFavorite?: (nodeId: string) => void;
  onShare?: (nodeId: string) => void;
  filter?: ExplorerFilter;
  highlightedIds?: string[];
}

interface FeedSection {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  nodes: ExplorerNode[];
}

export default function DiscoveryFeed({
  graph, onNodeSelect, onCitySelect, onFavorite, onShare, filter, highlightedIds = [],
}: DiscoveryFeedProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    onFavorite?.(id);
  };

  const handleSelect = (node: ExplorerNode) => {
    if (node.type === 'city') onCitySelect(node.citySlug);
    else onNodeSelect(node.id);
  };

  const sections: FeedSection[] = useMemo(() => {
    const all = [...graph.experienceNodes, ...graph.storyNodes, ...graph.foodNodes, ...graph.ambassadorNodes];

    const filtered = filter
      ? all.filter(n => {
          if (filter.categories.length > 0 && !n.tags.some(t => filter.categories.includes(t))) return false;
          if (filter.types.length > 0 && !filter.types.includes(n.type)) return false;
          return true;
        })
      : all;

    if (filtered.length === 0) return [];

    const shuffle = (arr: ExplorerNode[]) => [...arr].sort(() => Math.random() - 0.5);

    const topRated = [...filtered].sort((a, b) => (b.data?.rating || 0) - (a.data?.rating || 0));
    const verified = filtered.filter(n => n.data?.verified);
    const trending = shuffle(filtered.filter(n => n.data?.trending || n.priority > 2));
    const recommended = shuffle(filtered.filter(n => n.data?.recommended));

    const stories = graph.storyNodes.filter(s => !filter || filter.categories.length === 0 || s.tags.some(t => filter.categories.includes(t)));
    const foodNodes = graph.foodNodes.filter(f => !filter || filter.categories.length === 0 || f.tags.some(t => filter.categories.includes(t)));

    return [
      { id: 'picks', title: 'اختيارات زينب', subtitle: 'موصى به لك', icon: '⭐', nodes: recommended.length > 0 ? recommended.slice(0, 8) : shuffle(filtered).slice(0, 8) },
      { id: 'trending', title: 'رائج الآن', subtitle: 'الأكثر بحثاً', icon: '🔥', nodes: trending.length > 0 ? trending.slice(0, 8) : topRated.slice(0, 8) },
      { id: 'top-rated', title: 'الأعلى تقييماً', subtitle: 'تصويت المسافرين', icon: '🏆', nodes: topRated.slice(0, 8) },
      { id: 'verified', title: 'موثوق', subtitle: 'تجارب معتمدة', icon: '✓', nodes: verified.length > 0 ? verified.slice(0, 8) : shuffle(filtered).slice(0, 8) },
      { id: 'stories', title: 'قصص ملهمة', subtitle: 'حكايات من مصر', icon: '📖', nodes: stories.slice(0, 6) },
      { id: 'food', title: 'مذاق أصيل', subtitle: 'أشهر المطاعم', icon: '🍽️', nodes: foodNodes.slice(0, 6) },
    ].filter(s => s.nodes.length > 0).slice(0, 6);
  }, [graph, filter]);

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" /><path d="M12 18V6" />
        </svg>
        <p className="text-theme-secondary font-cairo mt-4">لا توجد نتائج</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map(section => (
        <section key={section.id}>
          <div className="flex items-end justify-between mb-4">
            <div className="flex items-center gap-2">
              {section.icon && <span className="text-lg">{section.icon}</span>}
              <div>
                <h3 className="text-sm font-bold text-theme font-playfair">{section.title}</h3>
                <p className="text-[10px] text-theme-secondary font-cairo">{section.subtitle}</p>
              </div>
            </div>
            <button className="text-[10px] text-theme-gold hover:underline font-cairo shrink-0">استكشف الكل ←</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollSnapType: 'x mandatory' }}>
            {section.nodes.map((node, i) => (
              <div key={node.id} className="flex-shrink-0 w-56 snap-start" style={{ scrollSnapAlign: 'start' }}>
                <PremiumCard
                  node={node}
                  index={i}
                  highlighted={highlightedIds.includes(node.id)}
                  onSelect={() => handleSelect(node)}
                  onFavorite={toggleFavorite}
                  onShare={onShare}
                  isFavorited={favorites.has(node.id)}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
