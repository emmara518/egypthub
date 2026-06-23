'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { HiGlobeAlt, HiMap, HiEmojiHappy, HiStar } from 'react-icons/hi';

const stats = [
  { value: 500, suffix: '+', label: 'وجهة', icon: HiGlobeAlt },
  { value: 80, suffix: '+', label: 'مدينة مغطاة', icon: HiMap },
  { value: 15, suffix: 'K+', label: 'مسافر سعيد', icon: HiEmojiHappy },
  { value: 49, suffix: '', label: 'متوسط التقييم', icon: HiStar, decimal: true },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-16 bg-gradient-to-l from-theme-bg via-theme-bg/95 to-theme-bg overflow-hidden"
    >
      {/* Background decorative glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-theme-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-theme-gold/5 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-theme-card/40 backdrop-blur-sm border border-theme-border/50 hover:border-theme-gold/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-theme-gold" />
                </div>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold font-playfair text-theme-gold">
                    {isInView ? (
                      stat.decimal ? (
                        <>
                          <CountUp start={0} end={stat.value / 10} decimals={1} duration={2} />
                          {stat.suffix}
                        </>
                      ) : (
                        <>
                          <CountUp start={0} end={stat.value} duration={2} />
                          {stat.suffix}
                        </>
                      )
                    ) : (
                      '0'
                    )}
                  </p>
                  <p className="text-theme-secondary text-sm font-cairo mt-1">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
