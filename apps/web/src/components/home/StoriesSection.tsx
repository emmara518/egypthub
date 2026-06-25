'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from '@/components/Icons';

const stories = [
  { category: 'EXPERIENCE', title: 'Sunrise in Dahab', desc: 'A magical morning by the Red Sea', rating: 4.9, image: '/assets/home/desert-dahab.jpg?w=400&q=80' },
  { category: 'CULTURE', title: 'Hidden Cafés of Alexandria', desc: 'Where history meets coffee', rating: 4.8, image: '/assets/home/alexandria.jpg?w=400&q=80' },
  { category: 'LUXURY', title: 'Nile Dinner in Aswan', desc: 'Floating luxury under the stars', rating: 4.9, image: '/assets/home/nile-sunset.jpg?w=400&q=80' },
  { category: 'ADVENTURE', title: 'Desert Safari in Siwa', desc: 'Adventure beyond imagination', rating: 4.7, image: '/assets/home/desert-dahab.jpg?w=400&q=80' },
  { category: 'FOOD', title: 'Street Food in Cairo', desc: "A taste you'll never forget", rating: 4.8, image: '/assets/home/pyramids.jpg?w=400&q=80' },
];

export default function StoriesSection() {
  return (
    <section className="bg-[#080C18] py-8 md:py-12 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <h2 className="section-title-large text-white gold-underline">
              Stories waiting<br />to happen
            </h2>
            <p className="text-white/40 text-sm mt-2">Real stories. Real people. Real Egypt.</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm shrink-0 shadow-[0_4px_12px_rgba(212,162,76,0.2)]">
            Explore All Stories <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:gap-4">
          {stories.map((story, i) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`shrink-0 w-[260px] md:w-auto group cursor-pointer hover:shadow-[0_0_50px_rgba(212,162,76,0.15)] transition-all duration-500 glass-card neon-gold scale-reveal story-card-hover ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3 border border-theme-gold/[0.08] group-hover:border-theme-gold/30 transition-all duration-500">
                <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 260px, 20vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 story-gradient-overlay pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {i === 0 && (
                    <span className="text-[8px] md:text-[9px] font-bold font-english tracking-[0.15em] text-[#080C18] bg-theme-gold px-2 py-1 rounded-full">FEATURED</span>
                  )}
                  <span className="text-[9px] md:text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-theme-gold/30">{story.category}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 overflow-hidden">
                  <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                  >
                    <h3 className="text-lg md:text-xl font-bold font-english text-white mb-0.5">{story.title}</h3>
                    <p className="text-xs md:text-sm text-white/50 font-english">{story.desc}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={16} />
                      <span className="text-xs font-bold text-theme-gold font-english">{story.rating}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="md:hidden mt-5">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm shadow-[0_4px_12px_rgba(212,162,76,0.2)]">
            Explore All Stories <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
