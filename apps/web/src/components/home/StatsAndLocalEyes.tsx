'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Experiences' },
  { value: '80+', label: 'Destinations' },
  { value: '15K+', label: 'Travelers' },
  { value: '4.9', label: 'Rating' },
];

const locals = [
  { name: 'Omar', city: 'Cairo', role: 'Guide', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Nour', city: 'Alexandria', role: 'Foodie', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Youssef', city: 'Luxor', role: 'Historian', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Mai', city: 'Dahab', role: 'Adventurer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Khaled', city: 'Aswan', role: 'Nubian', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
];

export default function StatsAndLocalEyes() {
  return (
    <section className="section-mobile bg-[#080C18] relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Stats — 2-column grid, large */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-theme-gold/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-theme-gold text-xl md:text-2xl font-bold font-english">{stat.value.charAt(0)}</span>
              </div>
              <p className="text-[clamp(1.75rem,5vw,2.25rem)] font-bold font-english text-white leading-tight">{stat.value}</p>
              <p className="text-sm md:text-base text-white/50 font-english">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Local Eyes — Instagram-style stories */}
        <div>
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold font-display leading-[1.1] mb-1">
            Egypt Through Local Eyes
          </h2>
          <p className="text-white/50 text-sm md:text-base mb-5">See Egypt like never before</p>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            {locals.map((local, i) => (
              <motion.div
                key={local.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
              >
                <div className="stories-ring">
                  <div className="stories-ring-inner relative">
                    <Image src={local.img} alt={local.name} fill sizes="64px" className="object-cover" unoptimized />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{local.name}</p>
                  <p className="text-[11px] text-white/40 font-english">{local.city}</p>
                  <p className="text-[10px] text-theme-gold/60 font-english">{local.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
