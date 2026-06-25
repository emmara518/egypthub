'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Star } from '@/components/Icons';

const guestPhotos = [
  { img: '/assets/home/pyramids.jpg?w=200&q=80', user: 'Sarah M.', rating: 5, caption: 'Unforgettable sunrise at the Pyramids!' },
  { img: '/assets/home/nile-sunset.jpg?w=200&q=80', user: 'Ahmed K.', rating: 5, caption: 'Nile cruise was magical' },
  { img: '/assets/home/red-sea.jpg?w=200&q=80', user: 'Emma W.', rating: 4, caption: 'Best diving in the Red Sea' },
  { img: '/assets/home/luxor-temple.jpg?w=200&q=80', user: 'James L.', rating: 5, caption: 'Valley of Kings is mind-blowing' },
  { img: '/assets/home/desert-dahab.jpg?w=200&q=80', user: 'Lina R.', rating: 4, caption: 'Bedouin dinner under stars' },
];

export default function GuestPhotoGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
        <p className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">GUEST PHOTOS</p>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {guestPhotos.map((photo, i) => (
          <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(photo.img)}
            className="relative aspect-square rounded-lg overflow-hidden border border-theme-gold/[0.06] hover:border-theme-gold/30 hover:shadow-[0_0_15px_rgba(212,162,76,0.1)] transition-all group touch-target"
            aria-label={`Photo by ${photo.user}`}
          >
            <Image src={photo.img} alt={photo.user} fill sizes="100px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
              <p className="text-[8px] font-bold text-white font-english truncate">{photo.user}</p>
              <div className="flex items-center gap-0.5"><Star size={7} /><span className="text-[7px] text-theme-gold">{photo.rating}</span></div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10 touch-target" aria-label="Close"><Close size={18} /></button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-[80vw] max-h-[80vh] aspect-[4/3] w-full"
              onClick={e => e.stopPropagation()}
            >
              <Image src={selected} alt="Guest photo" fill sizes="(max-width: 768px) 80vw, 300px" className="object-contain rounded-xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
