'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from '@/components/Icons';

const localExperts = [
  { name: 'Omar', location: 'Cairo', img: '/assets/home/avatar-man-professional.jpg?w=120&q=80' },
  { name: 'Nour', location: 'Luxor', img: '/assets/home/avatar-woman-professional.jpg?w=120&q=80' },
  { name: 'Yousef', location: 'Aswan', img: '/assets/home/avatar-man-suit.jpg?w=120&q=80' },
  { name: 'Mai', location: 'Luxor', img: '/assets/home/avatar-woman-glasses.jpg?w=120&q=80' },
  { name: 'Karim', location: 'Dahab', img: '/assets/home/avatar-man-beard.jpg?w=120&q=80' },
  { name: 'Salma', location: 'Alexandria', img: '/assets/home/avatar-woman-brown-hair.jpg?w=120&q=80' },
];

const storyCards = [
  { category: 'EXPERIENCE', title: 'Sunrise in Dahab', desc: 'A magical morning by the Red Sea', rating: 4.9, img: '/assets/home/desert-dahab.jpg?w=400&q=80' },
  { category: 'CULTURE', title: 'Hidden Cafés of Alexandria', desc: 'Where history meets coffee', rating: 4.8, img: '/assets/home/alexandria.jpg?w=400&q=80' },
  { category: 'LUXURY', title: 'Nile Dinner in Aswan', desc: 'Floating luxury under the stars', rating: 4.9, img: '/assets/home/nile-sunset.jpg?w=400&q=80' },
  { category: 'ADVENTURE', title: 'Desert Safari in Siwa', desc: 'Adventure beyond imagination', rating: 4.7, img: '/assets/home/desert-dahab.jpg?w=400&q=80' },
];

const stats = [
  { num: 500, suffix: '+', label: 'Curated Experiences', desc: 'Handpicked activities across Egypt' },
  { num: 80, suffix: '+', label: 'Expert Guides', desc: 'Certified local knowledge & support' },
  { num: 15000, suffix: '+', label: 'Happy Travelers', desc: 'Served since our launch' },
  { num: 4.9, suffix: '', label: 'Average Rating', desc: 'From thousands of reviews' },
];

function CountUp({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 30;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) { setCount(value); clearInterval(timer); }
            else setCount(current);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="count-up">{count.toFixed(decimals)}{suffix}</span>;
}

export default function StatsAndLocalEyes() {
  return (
    <section className="bg-theme-bg py-12 md:py-20 lg:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
            <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">LOCAL EYES</p>
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white mb-2 gold-underline">
            Through Local Eyes
          </h2>
          <p className="text-white/40 text-sm max-w-md">Real people. Real stories. See Egypt through their eyes.</p>
        </div>

        <div className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 mb-8 md:mb-12">
          {localExperts.map((expert, i) => (
            <motion.button key={expert.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="shrink-0 flex flex-col items-center gap-2 group touch-target"
            >
              <div className="stories-ring w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px]">
                <div className="w-full h-full rounded-full p-[3px] bg-theme-bg">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src={expert.img} alt={expert.name} fill sizes="80px" className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold font-english text-white">{expert.name}</p>
                <p className="text-[9px] text-white/40 font-english">{expert.location}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:gap-4 mb-10 md:mb-14">
          {storyCards.map((card, i) => (
            <motion.article key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="shrink-0 w-[220px] md:w-auto group cursor-pointer hover:shadow-[0_0_30px_rgba(212,162,76,0.12)] transition-all duration-500"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 border border-theme-gold/[0.08] group-hover:border-theme-gold/30 transition-all duration-500">
                <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 220px, 20vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[8px] md:text-[9px] font-bold font-english tracking-[0.15em] text-theme-gold bg-theme-bg/60 backdrop-blur-sm px-2 py-1 rounded-full border border-theme-gold/20">{card.category}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold font-english text-white mb-0.5">{card.title}</h3>
                  <p className="text-[10px] text-white/50 font-english">{card.desc}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={12} />
                    <span className="text-[11px] font-bold text-theme-gold font-english">{card.rating}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="gold-divider mb-8 md:mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 glass-card">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="text-center">
              <div className="text-[clamp(1.5rem,4vw,2rem)] font-bold font-display text-theme-gold leading-none mb-1">
                <CountUp value={stat.num} suffix={stat.suffix} decimals={stat.num === 4.9 ? 1 : 0} />
              </div>
              <p className="text-xs font-bold font-english text-white mb-0.5">{stat.label}</p>
              <p className="text-[10px] text-white/40 font-english">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
