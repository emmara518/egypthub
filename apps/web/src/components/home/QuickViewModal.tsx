'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Clock, Location, Close } from '@/components/Icons';

interface Experience {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  tag: string;
  desc: string;
}

interface Props {
  experience: Experience | null;
  onClose: () => void;
}

export default function QuickViewModal({ experience, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (experience) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [experience, onClose]);

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl overflow-hidden max-w-[520px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-[240px]">
              <Image src={experience.image.replace('?w=400&q=80', '?w=800&q=90')} alt={experience.title} fill sizes="520px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent" />
              <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10 touch-target" aria-label="Close"><Close size={16} /></button>
              <button className="absolute top-3 left-3 text-[8px] font-bold font-english tracking-[0.1em] text-theme-gold bg-theme-bg/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-theme-gold/20">{experience.tag}</button>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-xl font-bold font-display text-white">{experience.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Location size={13} />
                  <span className="text-xs text-white/60 font-english">{experience.location}</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-theme-gold/[0.08] border border-theme-gold/15 px-3 py-1.5 rounded-full">
                  <Star size={14} />
                  <span className="text-sm font-bold text-theme-gold font-english">{experience.rating}</span>
                  <span className="text-[10px] text-white/40 font-english">({experience.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1 text-white/40">
                  <Clock size={13} />
                  <span className="text-[11px] font-english">4-6 hours</span>
                </div>
                <button className="ml-auto w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all touch-target" aria-label="Save to wishlist">
                  <Heart size={14} />
                </button>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-4">{experience.desc} — This unforgettable experience immerses you in the beauty and culture of Egypt.</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold font-display text-theme-gold">{experience.price}</span>
                  <span className="text-[11px] text-white/30 font-english ml-1">/ person</span>
                </div>
                <span className="text-[11px] text-green-400 font-english">✓ Free cancellation</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2.5 rounded-xl gold-btn text-sm font-bold text-center">Book Now</button>
                <button className="px-4 py-2.5 rounded-xl border border-theme-gold/25 text-theme-gold text-sm font-bold font-english bg-transparent hover:bg-theme-gold/[0.06] transition-all">Add to Trip</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
