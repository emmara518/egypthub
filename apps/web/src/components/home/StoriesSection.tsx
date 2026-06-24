'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiPlay, HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const stories = [
  { tag: 'EXPERIENCE', title: 'Sunrise in Dahab', desc: 'A magical morning by the sea where golden light meets turquoise waters.', rating: 4.9, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
  { tag: 'CULTURE', title: 'Hidden Cafés of Alexandria', desc: 'Where centuries of history meet the aroma of freshly brewed coffee.', rating: 4.8, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { tag: 'LUXURY', title: 'Nile Dinner in Aswan', desc: 'Floating luxury beneath a canopy of stars on the timeless river.', rating: 4.9, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { tag: 'ADVENTURE', title: 'Desert Safari in Siwa', desc: 'Adventure beyond imagination across golden dunes and ancient oases.', rating: 4.8, img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80' },
  { tag: 'FOOD', title: 'Street Food in Cairo', desc: 'A culinary journey through bustling markets and hidden alleyways.', rating: 4.8, img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80' },
];

const tagColors: Record<string, string> = {
  EXPERIENCE: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  CULTURE: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  LUXURY: 'bg-theme-gold/15 text-theme-gold border-theme-gold/20',
  ADVENTURE: 'bg-green-500/15 text-green-300 border-green-500/20',
  FOOD: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[...Array(5)].map((_, s) => (
          <HiStar
            key={s}
            className={`w-3 h-3 ${
              s < full
                ? 'text-theme-gold fill-theme-gold'
                : s === full && hasHalf
                ? 'text-theme-gold fill-theme-gold/50'
                : 'text-white/10'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-theme-gold font-english">{rating}</span>
    </div>
  );
}

export default function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[#080C18] relative">
      <div className="absolute top-0 left-1/4 w-48 md:w-64 h-48 md:h-64 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_xl:340px_1fr] gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="w-full"
          >
            <span className="text-[9px] md:text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-3 md:mb-4 block">STORIES</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold font-display leading-[1.1] mb-3 md:mb-4">
              Stories waiting<br />to happen
            </h2>
            <p className="text-white/50 text-[clamp(0.8rem,1vw,0.9rem)] mb-6 md:mb-8 leading-relaxed">
              Real stories. Real people.<br />Real Egypt. Every journey has a story waiting to be told.
            </p>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-[clamp(0.8rem,1vw,0.9rem)] font-medium text-theme-gold font-english group"
            >
              Explore All Stories
              <HiArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          <div className="relative w-full min-w-0">
            {/* Carousel arrows - desktop only */}
            <div className="absolute -left-3 xl:-left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#0F1525] border border-white/[0.08] flex items-center justify-center hover:border-theme-gold/30 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <HiChevronLeft className="w-4 h-4 xl:w-5 xl:h-5 text-white/60" />
              </motion.button>
            </div>
            <div className="absolute -right-3 xl:-right-5 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#0F1525] border border-white/[0.08] flex items-center justify-center hover:border-theme-gold/30 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <HiChevronRight className="w-4 h-4 xl:w-5 xl:h-5 text-white/60" />
              </motion.button>
            </div>

            <div ref={scrollRef} className="flex gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-6 scrollbar-hide -mx-1 px-1">
              {stories.map((story, i) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="min-w-[clamp(200px,35vw,280px)] max-w-[clamp(200px,35vw,280px)] rounded-xl overflow-hidden bg-[#0F1525] border border-white/[0.06] group cursor-pointer hover:border-theme-gold/25 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(212,162,76,0.05)] shrink-0"
                >
                  <div className="relative h-36 md:h-44 lg:h-48 overflow-hidden">
                    <div className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
                      <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1525] via-[#0F1525]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1525]/60" />
                    <span className={`absolute top-2 md:top-3 left-2 md:left-3 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold font-english tracking-wider backdrop-blur-sm border ${tagColors[story.tag]}`}>
                      {story.tag}
                    </span>
                    <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-theme-gold/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,162,76,0.3)]">
                        <HiPlay className="w-3 h-3 md:w-4 md:h-4 text-[#080C18] ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h4 className="font-bold text-[clamp(0.8rem,1.2vw,0.9rem)] mb-1 md:mb-1.5 group-hover:text-theme-gold transition-colors duration-300">{story.title}</h4>
                    <p className="text-[10px] md:text-[11px] text-white/50 mb-2 md:mb-3 leading-relaxed line-clamp-2">{story.desc}</p>
                    <div className="flex items-center justify-between pt-1.5 md:pt-2 border-t border-white/[0.04]">
                      <StarRating rating={story.rating} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
