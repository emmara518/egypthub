'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const offers = [
  {
    title: 'Summer Nile Escape',
    slug: 'summer-nile',
    image: '/images/luxury/four-seasons.svg',
    discount: '30%',
    originalPrice: 'EGP 12,000',
    discountedPrice: 'EGP 8,400',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Red Sea Diving Package',
    slug: 'red-sea-diving-offer',
    image: '/images/activities/diving.svg',
    discount: '25%',
    originalPrice: 'EGP 8,500',
    discountedPrice: 'EGP 6,375',
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: 'Luxor & Aswan Combo',
    slug: 'luxor-aswan-combo',
    image: '/images/destinations/luxor.svg',
    discount: '40%',
    originalPrice: 'EGP 18,000',
    discountedPrice: 'EGP 10,800',
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
];

function Countdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState('');
 
   useEffect(() => {
     const update = () => {
       const diff = target.getTime() - Date.now();
       if (diff <= 0) { setRemaining('انتهى'); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setRemaining(`${d}d ${h}h ${m}m`);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [target]);

  return <span className="text-accent-amber font-mono font-bold text-lg">{remaining}</span>;
}

export default function OfferSection() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">لفترة محدودة</p>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
            عروض <span className="text-theme-gold">حصريّة</span>
          </h2>
          <p className="text-theme-secondary mt-3 font-cairo max-w-xl mx-auto">
            لا تفوّت هذه العروض المذهلة. احجز الآن ووفّر كثيراً!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/offers/${offer.slug}`} className="group block rounded-xl overflow-hidden border border-theme bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow),0_4px_16px_rgba(0,0,0,0.06)]">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                    style={{ backgroundImage: `url(${offer.image})` }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 rounded-lg text-sm font-bold bg-accent-orange text-white">
                      -{offer.discount}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold font-playfair text-neutral-100 mb-3">{offer.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-neutral-500 line-through text-sm">{offer.originalPrice}</span>
                    <span className="text-primary-500 font-bold text-lg">{offer.discountedPrice}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-primary-500/10">
                    <span className="text-theme-secondary text-sm font-cairo">ينتهي في:</span>
                    <Countdown target={offer.expires} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold transition-all duration-200"
          >
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
