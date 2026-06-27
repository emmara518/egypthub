'use client';

import { motion } from 'framer-motion';
import { Star } from '@/components/Icons';

const guides = [
  { name: 'Mohamed A.', role: 'Egyptologist Guide', rating: 4.9, reviews: 312, languages: 'EN, AR, FR', image: '/assets/home/luxor-temple.jpg?w=200&q=80' },
  { name: 'Laila K.', role: 'Cultural Expert', rating: 4.8, reviews: 287, languages: 'EN, AR, DE', image: '/assets/home/pyramids.jpg?w=200&q=80' },
  { name: 'Omar S.', role: 'Adventure Guide', rating: 4.7, reviews: 198, languages: 'EN, AR', image: '/assets/home/desert-dahab.jpg?w=200&q=80' },
];

export default function GuideProfiles() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
        <p className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">LOCAL GUIDES</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {guides.map((g, i) => (
          <motion.div key={g.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-theme-gold/[0.06] hover:border-theme-gold/20 bg-theme-bg/40 hover:bg-theme-bg/60 transition-all cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden relative bg-theme-gold/10 border border-theme-gold/20 shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-theme-gold/20 to-transparent" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold font-english text-white truncate">{g.name}</h4>
              <p className="text-[10px] text-white/50 font-english truncate">{g.role}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={9} />
                <span className="text-[10px] font-bold text-theme-gold font-english">{g.rating}</span>
                <span className="text-[9px] text-white/30 font-english">({g.reviews})</span>
              </div>
              <p className="text-[9px] text-white/30 font-english mt-0.5">{g.languages}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
