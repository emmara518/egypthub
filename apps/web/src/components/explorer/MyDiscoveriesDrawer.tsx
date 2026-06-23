'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplorerGraph, ExplorerNode, ExplorerNodeType } from '@/lib/explorer/types';

interface MyDiscoveriesDrawerProps {
  graph: ExplorerGraph;
  isOpen: boolean;
  onClose: () => void;
  onNodeSelect: (nodeId: string) => void;
}

type TabId = 'all' | ExplorerNodeType;

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'city', label: 'مدن' },
  { id: 'experience', label: 'تجارب' },
  { id: 'story', label: 'قصص' },
  { id: 'food', label: 'أكل' },
  { id: 'ambassador', label: 'مرشدون' },
];

export default function MyDiscoveriesDrawer({
  graph,
  isOpen,
  onClose,
  onNodeSelect,
}: MyDiscoveriesDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem('egypthub_favorites');
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch { }
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.delete(id);
      try {
        localStorage.setItem('egypthub_favorites', JSON.stringify([...next]));
      } catch { }
      return next;
    });
  };

  const allNodes = useMemo(() => {
    const all: ExplorerNode[] = [
      ...graph.cityNodes,
      ...graph.experienceNodes,
      ...graph.storyNodes,
      ...graph.foodNodes,
      ...graph.ambassadorNodes,
    ];
    return all.filter(n => favorites.has(n.id));
  }, [graph, favorites]);

  const filteredNodes = useMemo(() => {
    if (activeTab === 'all') return allNodes;
    return allNodes.filter(n => n.type === activeTab);
  }, [allNodes, activeTab]);

  const countByType = useMemo(() => {
    const counts: Record<string, number> = { all: allNodes.length };
    for (const n of allNodes) {
      counts[n.type] = (counts[n.type] || 0) + 1;
    }
    return counts;
  }, [allNodes]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-theme-bg border-l border-theme-border shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-theme-border">
              <h2 className="text-sm font-bold text-theme font-cairo">اكتشافاتي</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-theme-gold font-cairo">{allNodes.length}</span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-secondary hover:text-theme hover:bg-theme-border/30 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-1 p-3 border-b border-theme-border overflow-x-auto">
              {TABS.map(tab => {
                const count = countByType[tab.id] || 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-cairo whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary hover:border-theme-gold/50'
                    }`}
                  >
                    {tab.label}
                    <span className={`text-[10px] ${activeTab === tab.id ? 'text-theme-gold' : 'text-theme-secondary/60'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredNodes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  <p className="text-theme-secondary font-cairo text-sm mt-4">لا توجد اكتشافات محفوظة</p>
                  <p className="text-theme-secondary/60 font-cairo text-xs mt-1">ابدأ باستكشاف مصر واحفظ ما يعجبك</p>
                </div>
              ) : (
                filteredNodes.map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-theme-border bg-theme-card hover:border-theme-gold/20 transition-all duration-200 cursor-pointer group"
                    onClick={() => { onNodeSelect(node.id); onClose(); }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-theme-surface overflow-hidden flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${node.image})` }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-theme font-cairo truncate">{node.label}</p>
                      <p className="text-[10px] text-theme-secondary font-cairo truncate">{node.subtitle || node.description}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFavorite(node.id); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-theme-secondary/50 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
