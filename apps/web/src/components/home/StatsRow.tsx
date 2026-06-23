'use client';

import { motion } from 'framer-motion';
import { HiHeart, HiLocationMarker, HiUsers, HiStar, HiSupport } from 'react-icons/hi';

const stats = [
  { icon: HiHeart, value: '500+', label: 'Unique Experiences' },
  { icon: HiLocationMarker, value: '80+', label: 'Destinations' },
  { icon: HiUsers, value: '15K+', label: 'Happy Travelers' },
  { icon: HiStar, value: '4.9', label: 'Average Rating' },
  { icon: HiSupport, value: '24/7', label: 'Concierge Support' },
];

export default function StatsRow() {
  return (
    <section className="py-16 bg-[#080C18] relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-center group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-theme-gold/30 flex items-center justify-center mx-auto mb-3 group-hover:border-theme-gold/50 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-theme-gold" />
              </div>
              <p className="text-2xl md:text-3xl font-bold font-english mb-1">{stat.value}</p>
              <p className="text-[11px] text-white/50 font-english">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
