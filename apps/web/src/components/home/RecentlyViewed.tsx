'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Close } from '@/components/Icons';

interface Item {
  title: string;
  image: string;
  price: string;
  href?: string;
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<Item[]>([]);
  const [showAll, setShowAll] = useState(false);

  const displayLimit = showAll ? 12 : 4;

  useEffect(() => {
    const stored = localStorage.getItem('egypthub_recent');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const clearAll = () => {
    localStorage.removeItem('egypthub_recent');
    setItems([]);
  };

  if (items.length === 0) return null;

  const displayed = items.slice(0, displayLimit);

  return (
    <div className="fixed left-4 top-36 z-40 hidden xl:flex flex-col">
      <div className="flex items-center gap-1.5 mb-2">
        <Clock size={12} />
        <span className="text-[8px] font-bold font-english tracking-[0.15em] text-theme-gold">RECENTLY VIEWED</span>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[7px] text-theme-muted hover:text-theme-gold transition-colors font-english mr-1"
          >
            CLEAR
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        {displayed.map((item, i) => {
          const content = (
            <motion.div key={`${item.title}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className="group relative w-10 h-10 rounded-lg overflow-hidden border border-theme-gold/[0.06] hover:border-theme-gold/30 transition-all cursor-pointer"
              title={item.title}
            >
              <Image src={item.image} alt={item.title} fill sizes="40px" className="object-cover" />
              <div className="absolute inset-0 bg-[#080C18]/0 group-hover:bg-[#080C18]/40 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <span className="text-[6px] text-white font-english text-center px-0.5 leading-tight">VIEW</span>
              </div>
            </motion.div>
          );

          if (item.href) {
            return <Link key={`${item.title}-${i}`} href={item.href}>{content}</Link>;
          }
          return content;
        })}
      </div>
      {items.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-1.5 text-[8px] font-english text-theme-gold hover:underline"
        >
          {showAll ? 'LESS' : `${items.length - 4} MORE`}
        </button>
      )}
    </div>
  );
}

export function useRecentlyViewed() {
  const addItem = (item: Item) => {
    const stored = localStorage.getItem('egypthub_recent');
    const list: Item[] = stored ? JSON.parse(stored) : [];
    const filtered = list.filter(i => i.title !== item.title);
    const updated = [item, ...filtered].slice(0, 12);
    localStorage.setItem('egypthub_recent', JSON.stringify(updated));
  };
  return { addItem };
}
