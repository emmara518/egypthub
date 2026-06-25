'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart } from '@/components/Icons';

const recs = [
  { title: 'Nubian Village Tour', location: 'Aswan', rating: 4.8, price: '$85', image: '/assets/home/nile-sunset.jpg?w=200&q=80', tag: 'CULTURE' },
  { title: 'White Desert Camping', location: 'Farafra', rating: 4.7, price: '$160', image: '/assets/home/desert-dahab.jpg?w=200&q=80', tag: 'ADVENTURE' },
  { title: 'Coptic Cairo Walk', location: 'Cairo', rating: 4.6, price: '$65', image: '/assets/home/pyramids.jpg?w=200&q=80', tag: 'HISTORY' },
];

export default function SmartRecommendations() {
  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (i: number) => {
    setSaved(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  };

  return (
    <section className="bg-[#0a1020]/40 py-10 md:py-16 border-t border-theme-gold/[0.04]">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
          <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold">RECOMMENDED FOR YOU</p>
        </div>
        <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold font-display text-white gold-underline mb-6" style={{ paddingBottom: '6px' }}>
          Based on Your Interests
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 pb-2">
          {recs.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
               className="shrink-0 w-[260px] md:w-[300px] group relative rounded-xl overflow-hidden border border-theme-gold/[0.06] hover:border-theme-gold/30 hover:shadow-[0_0_25px_rgba(212,162,76,0.1)] transition-all duration-500 glass-card neon-gold"
            >
              <div className="relative h-[200px]">
                <Image src={r.image} alt={r.title} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[8px] font-bold font-english tracking-[0.1em] text-theme-gold bg-[#080C18]/70 backdrop-blur-sm px-2 py-1 rounded-full border border-theme-gold/20">{r.tag}</span>
                <button onClick={() => toggleSave(i)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#080C18]/60 backdrop-blur-sm flex items-center justify-center touch-target"
                  aria-label={saved.includes(i) ? 'Unsave' : 'Save'}>
                  <Heart size={13} className={saved.includes(i) ? 'text-red-400' : 'text-white/60'} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold font-english text-white">{r.title}</h3>
                <p className="text-[10px] text-white/50 font-english">{r.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-0.5">
                    <Star size={11} />
                    <span className="text-xs font-bold text-theme-gold font-english">{r.rating}</span>
                  </div>
                  <span className="text-sm font-bold font-display text-theme-gold">{r.price}<span className="text-[9px] text-white/30 font-english">/person</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
