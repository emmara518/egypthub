'use client';

import { motion } from 'framer-motion';
import { HiChevronRight } from 'react-icons/hi';

const partners = [
  { name: 'FOUR SEASONS', style: 'text-[13px] tracking-[0.25em] font-light' },
  { name: 'AMAN', style: 'text-[16px] tracking-[0.35em] font-light' },
  { name: 'KEMPINSKI', style: 'text-[12px] tracking-[0.2em] font-medium' },
  { name: 'STEIGENBERGER', style: 'text-[10px] tracking-[0.15em] font-medium' },
  { name: 'Jaz', style: 'text-[18px] tracking-[0.1em] font-light italic' },
];

export default function PartnerLogos() {
  return (
    <section className="py-10 md:py-16 bg-[#080C18] relative border-y border-white/[0.03]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Desktop: centered row */}
        <div className="hidden md:flex items-center justify-center gap-8 xl:gap-12 flex-wrap">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className={`font-english text-white/30 hover:text-white/50 transition-all duration-300 cursor-pointer ${partner.style}`}
            >
              {partner.name}
            </motion.div>
          ))}
          <motion.button
            whileHover={{ x: 4 }}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-theme-gold/30 transition-all"
          >
            <HiChevronRight className="w-4 h-4 text-white/40" />
          </motion.button>
        </div>

        {/* Mobile: horizontal scrolling marquee */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-8 min-w-max px-2">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className={`font-english text-white/30 whitespace-nowrap shrink-0 ${partner.style}`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
