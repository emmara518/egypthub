'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiStar, HiPlay } from 'react-icons/hi';

const stories = [
  { tag: 'EXPERIENCE', title: 'Sunrise in Dahab', desc: 'A magical morning by the sea where golden light meets turquoise waters.', rating: 4.9, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
  { tag: 'CULTURE', title: 'Hidden Cafés of Alexandria', desc: 'Where centuries of history meet the aroma of freshly brewed coffee.', rating: 4.8, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { tag: 'LUXURY', title: 'Nile Dinner in Aswan', desc: 'Floating luxury beneath a canopy of stars on the timeless river.', rating: 4.9, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { tag: 'ADVENTURE', title: 'Desert Safari in Siwa', desc: 'Adventure beyond imagination across golden dunes and ancient oases.', rating: 4.8, img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80' },
  { tag: 'FOOD', title: 'Street Food in Cairo', desc: 'A culinary journey through bustling markets and hidden alleyways.', rating: 4.8, img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80' },
];

const tagColors: Record<string, string> = {
  EXPERIENCE: 'bg-blue-500/15 text-blue-300',
  CULTURE: 'bg-purple-500/15 text-purple-300',
  LUXURY: 'bg-theme-gold/15 text-theme-gold',
  ADVENTURE: 'bg-green-500/15 text-green-300',
  FOOD: 'bg-orange-500/15 text-orange-300',
};

export default function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-mobile bg-[#080C18] relative overflow-hidden">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 mb-6 md:mb-10">
        <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold mb-1">STORIES</p>
        <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-display leading-[1.1]">
          Stories waiting to happen
        </h2>
      </div>

      {/* Snap Carousel */}
      <div ref={scrollRef} className="snap-carousel pb-4">
        {stories.map((story, i) => (
          <motion.div
            key={story.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="snap-start shrink-0 w-[85vw] max-w-[340px] rounded-2xl overflow-hidden bg-[#0F1525] border border-white/[0.06] group cursor-pointer"
          >
            <div className="relative h-48 md:h-56 overflow-hidden">
              <Image src={story.img} alt={story.title} fill sizes="(max-width: 768px) 85vw, 340px" className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1525] via-transparent to-transparent" />
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-english tracking-wider ${tagColors[story.tag]}`}>
                {story.tag}
              </span>
              <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-theme-gold/90 backdrop-blur flex items-center justify-center">
                <HiPlay className="w-4 h-4 text-[#080C18] ml-0.5" />
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-base mb-1">{story.title}</h4>
              <p className="text-sm text-white/50 mb-3 leading-relaxed line-clamp-2">{story.desc}</p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-white/[0.04]">
                <HiStar className="w-4 h-4 text-theme-gold fill-theme-gold" />
                <span className="text-sm font-bold text-theme-gold font-english">{story.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
