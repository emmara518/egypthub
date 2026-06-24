'use client';

import { motion } from 'framer-motion';
import { HiShieldCheck, HiCurrencyDollar, HiBadgeCheck, HiClock, HiRefresh } from 'react-icons/hi';

const trustItems = [
  { icon: HiShieldCheck, title: 'Secure Booking' },
  { icon: HiCurrencyDollar, title: 'Best Price' },
  { icon: HiBadgeCheck, title: 'Verified' },
  { icon: HiClock, title: '24/7 Support' },
  { icon: HiRefresh, title: 'Free Cancel' },
];

export default function TrustBadges() {
  return (
    <section className="section-mobile bg-[#080C18]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-theme-gold/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-theme-gold" />
              </div>
              <p className="text-sm md:text-base font-bold mb-1">{item.title}</p>
              <p className="text-[12px] md:text-sm text-white/40">Trusted partner</p>
            </motion.div>
          ))}
        </div>

        {/* Payment logos row */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 md:mt-12 flex-wrap opacity-40">
          {['VISA', 'MC', 'AMEX', 'Booking.com', 'Expedia', 'Google'].map((p) => (
            <span key={p} className="text-white/40 text-xs md:text-sm font-english font-bold tracking-wider">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
