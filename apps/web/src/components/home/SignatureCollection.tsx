'use client';

import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

export default function SignatureCollection() {
  return (
    <section className="py-24 bg-[#080C18] relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.06] group hover:border-theme-gold/20 transition-all duration-500 min-h-[420px] flex items-end"
        >
          {/* Full-width photography background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85"
              alt="Luxury resort in Egypt"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
            />
            {/* Gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/60 to-[#080C18]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/80 to-transparent" />
          </div>

          {/* Gold ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-700">
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>

          <div className="relative z-10 p-10 md:p-14 max-w-xl">
            <span className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-4 block">CURATED LUXURY</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-[1.1]">
              Egypt Signature Collection
            </h2>
            <p className="text-white/70 text-sm mb-8 leading-relaxed max-w-md">
              Handpicked luxury experiences crafted for unforgettable moments. From private Nile dinners to exclusive desert camps.
            </p>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-theme-gold font-english border border-theme-gold/30 rounded-xl px-5 py-2.5 hover:bg-theme-gold/10 transition-all duration-300"
            >
              View Collection
              <HiArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
