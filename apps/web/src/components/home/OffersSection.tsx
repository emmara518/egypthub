'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from '@/components/Icons';

const rates = { USD: 1, EGP: 48.5 };

const plans = [
  { name: 'Explorer', priceUSD: 299, period: '/person', desc: 'Perfect for solo travelers', image: '/assets/home/pyramids.jpg?w=400&q=80', tag: 'SOLO', rating: 4.8, reviews: 1240, features: ['3 guided tours', 'Airport transfer', 'Breakfast included', 'Local SIM card', '24/7 support'], popular: false },
  { name: 'Premium', priceUSD: 599, period: '/person', desc: 'Best value for couples', image: '/assets/home/nile-sunset.jpg?w=400&q=80', tag: 'COUPLES', rating: 4.9, reviews: 2180, features: ['7 guided tours', 'Private transfers', 'Half-board meals', 'Nile dinner cruise', 'VIP airport lounge', 'Photography package'], popular: true },
  { name: 'Luxury', priceUSD: 1299, period: '/person', desc: 'Ultimate VIP experience', image: '/assets/home/red-sea.jpg?w=400&q=80', tag: 'VIP', rating: 5.0, reviews: 860, features: ['12 private tours', 'Business class flights', 'All-inclusive meals', 'Luxury Nile cruise', 'Personal concierge', 'Spa & wellness'], popular: false },
];

export default function OffersSection() {
  const [currency, setCurrency] = useState<'USD' | 'EGP'>('USD');

  const formatPrice = (usd: number) => {
    if (currency === 'EGP') return `${Math.round(usd * rates.EGP).toLocaleString()} EGP`;
    return `$${usd.toLocaleString()}`;
  };

  return (
    <section className="bg-theme-bg py-12 md:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
            <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">PRICING</p>
            <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white mb-2 gold-underline-center" style={{ paddingBottom: '8px' }}>
            Choose Your Egypt Journey
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-4">Tailored packages designed for every type of traveler. All include AI concierge support.</p>
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setCurrency('USD')} className={`px-3 py-1.5 rounded-lg text-xs font-bold font-english transition-all touch-target ${currency === 'USD' ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/30' : 'text-white/40 border border-white/[0.06] hover:border-white/20'}`}>USD $</button>
            <button onClick={() => setCurrency('EGP')} className={`px-3 py-1.5 rounded-lg text-xs font-bold font-english transition-all touch-target ${currency === 'EGP' ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/30' : 'text-white/40 border border-white/[0.06] hover:border-white/20'}`}>EGP £</button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 pb-2">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`shrink-0 w-[280px] md:w-[340px] relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_0_35px_rgba(212,162,76,0.12)] glass-card neon-gold ${plan.popular ? 'border-theme-gold/30 bg-theme-surface/80 shadow-[0_0_20px_rgba(212,162,76,0.1)]' : 'border-theme-gold/[0.08] bg-theme-surface/40 hover:border-theme-gold/25'}`}
            >
              {plan.popular && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg text-[9px] font-bold font-english px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-[0_0_20px_rgba(212,162,76,0.3)]">
                  <Sparkles size={12} /> MOST POPULAR
                </div>
              )}
              <div className="relative h-[180px]">
                <Image src={plan.image} alt={plan.name} fill sizes="400px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[8px] font-bold font-english tracking-[0.1em] text-theme-gold bg-theme-bg/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-theme-gold/20">{plan.tag}</span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                  <span className="text-[11px] font-bold text-theme-gold font-english">{plan.rating}</span>
                  <span className="text-[9px] text-white/40 font-english">({plan.reviews.toLocaleString()})</span>
                </div>
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold font-display text-white mb-1">{plan.name}</h3>
                <p className="text-[11px] text-white/40 font-english mb-3">{plan.desc}</p>
                <div className="mb-4">
                  <span className="text-[clamp(1.5rem,4vw,2rem)] font-bold font-display text-theme-gold">{formatPrice(plan.priceUSD)}</span>
                  <span className="text-[11px] text-white/30 font-english">{plan.period}</span>
                </div>
                <Link href="/booking" className="w-full py-2.5 rounded-xl text-sm font-bold font-english mb-5 touch-target gold-btn shadow-[0_4px_12px_rgba(212,162,76,0.2)] ripple block text-center">
                  Get Started <ArrowRight size={14} className="inline ml-1" />
                </Link>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[11px] text-white/60 font-english">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-theme-gold/15 text-theme-gold' : 'bg-white/[0.06] text-white/40'}`}>
                        <Check size={10} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
