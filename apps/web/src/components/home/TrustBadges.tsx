'use client';

import { Shield, Clock, Support, Globe } from '@/components/Icons';
import { motion } from 'framer-motion';
import Image from 'next/image';

const badges = [
  { icon: Shield, title: 'Verified & Safe', desc: 'Every property and experience is verified for quality and safety.' },
  { icon: Clock, title: '24/7 Support', desc: 'Our concierge team is always available, day or night.' },
  { icon: Globe, title: 'Global Standards', desc: 'International quality standards applied to every service.' },
  { icon: Support, title: 'AI Concierge', desc: 'Smart recommendations tailored to your preferences.' },
];

const paymentMethods = [
  { img: '/assets/payment/visa.svg', label: 'Visa' },
  { img: '/assets/payment/mastercard.svg', label: 'Mastercard' },
  { img: '/assets/payment/amex.svg', label: 'Amex' },
  { img: '/assets/payment/fawry.svg', label: 'Fawry' },
  { img: '/assets/payment/vodafone-cash.svg', label: 'Vodafone Cash' },
];

export default function TrustBadges() {
  return (
    <section className="bg-theme-surface/30 py-12 md:py-16 border-t border-white/[0.04] glass-card neon-gold">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="lg:flex lg:items-start lg:gap-16">
          <div className="lg:flex-1 mb-10 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">TRUST & SECURITY</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {badges.map((badge, i) => (
                <motion.div key={badge.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex flex-col items-center text-center">
                  <badge.icon size={28} className="mb-2" />
                  <p className="text-[11px] md:text-xs font-bold font-english text-white mb-1">{badge.title}</p>
                  <p className="text-[9px] md:text-[10px] text-white/40 font-english leading-relaxed">{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-[280px] shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">PAYMENT METHODS</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((p) => (
                <span key={p.label} className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-white/50 font-english px-3 py-1.5 rounded-lg border border-theme-gold/[0.08] bg-white/[0.03] hover:border-theme-gold/25 transition-all duration-300">
                  <Image src={p.img} alt={p.label} width={20} height={14} className="object-contain shrink-0" />
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
