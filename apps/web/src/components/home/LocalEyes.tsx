'use client';

import { motion } from 'framer-motion';
import { HiPlay } from 'react-icons/hi';

const locals = [
  { name: 'Omar', city: 'Cairo', role: 'Cultural Guide', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Nour', city: 'Alexandria', role: 'Food Explorer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Youssef', city: 'Luxor', role: 'History Expert', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Mai', city: 'Dahab', role: 'Adventure Curator', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

export default function LocalEyes() {
  return (
    <section className="py-24 bg-[#080C18] relative">
      <div className="absolute top-1/2 right-1/4 w-48 h-48 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <span className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-4 block">LOCAL GUIDES</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-3 leading-[1.1]">
              Egypt Through<br />Local Eyes
            </h2>
            <p className="text-white/50 text-sm">See Egypt like never before — through the eyes of those who live it.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex items-center gap-6 lg:gap-8"
          >
            {locals.map((local, i) => (
              <motion.div
                key={local.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2.5 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-theme-gold/30 group-hover:border-theme-gold/60 transition-all duration-300 shadow-[0_0_20px_rgba(212,162,76,0.1)] group-hover:shadow-[0_0_30px_rgba(212,162,76,0.2)]">
                    <img src={local.img} alt={local.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#080C18]" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold">{local.name}</p>
                  <p className="text-[9px] text-white/40 font-english">{local.city}</p>
                  <p className="text-[8px] text-theme-gold/60 font-english">{local.role}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-3 pl-2 border-l border-white/[0.06]">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,162,76,0.4)' }}
                className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-theme-gold/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,162,76,0.15)]"
              >
                <HiPlay className="w-5 h-5 text-white/60 ml-0.5" />
              </motion.button>
              <div>
                <span className="text-[10px] text-white/40 font-english">Watch film</span>
                <p className="text-[9px] text-white/30 font-english">2:45 min</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
