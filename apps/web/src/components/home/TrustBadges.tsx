'use client';

import { motion } from 'framer-motion';
import { HiShieldCheck, HiCurrencyDollar, HiBadgeCheck, HiClock, HiRefresh } from 'react-icons/hi';

const paymentLogos = [
  { name: 'VISA', svg: (
    <svg viewBox="0 0 80 28" className="h-4 md:h-5 w-auto">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fontStyle="italic" fill="white" fillOpacity="0.35">VISA</text>
    </svg>
  )},
  { name: 'Mastercard', svg: (
    <svg viewBox="0 0 56 36" className="h-5 md:h-7 w-auto">
      <circle cx="20" cy="18" r="15" fill="#EB001B" fillOpacity="0.3" />
      <circle cx="36" cy="18" r="15" fill="#F79E1B" fillOpacity="0.3" />
    </svg>
  )},
  { name: 'American Express', svg: (
    <svg viewBox="0 0 120 28" className="h-3 md:h-4 w-auto">
      <text x="0" y="20" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="white" fillOpacity="0.35">AMERICAN EXPRESS</text>
    </svg>
  )},
  { name: 'Booking.com', svg: (
    <svg viewBox="0 0 140 28" className="h-4 md:h-5 w-auto">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="white" fillOpacity="0.35">Booking.com</text>
    </svg>
  )},
  { name: 'Expedia', svg: (
    <svg viewBox="0 0 90 28" className="h-4 md:h-5 w-auto">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="white" fillOpacity="0.35">Expedia</text>
    </svg>
  )},
  { name: 'Google', svg: (
    <svg viewBox="0 0 80 28" className="h-4 md:h-5 w-auto">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="white" fillOpacity="0.35">Google</text>
    </svg>
  )},
];

const trustItems = [
  { icon: HiShieldCheck, title: 'Secure Booking', desc: 'Your data is safe with us' },
  { icon: HiCurrencyDollar, title: 'Best Price Guarantee', desc: 'Get the best value on every booking' },
  { icon: HiBadgeCheck, title: 'Verified & Trusted', desc: 'All partners verified for your peace of mind' },
  { icon: HiClock, title: '24/7 Concierge', desc: 'We\'re with you every step of the way' },
  { icon: HiRefresh, title: 'Flexible Cancellation', desc: 'Plans that adapt to your needs' },
];

export default function TrustBadges() {
  return (
    <section className="py-12 md:py-16 bg-[#080C18]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Trust Label + Payment Logos */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8 md:mb-12 flex-wrap justify-center">
          <span className="text-[10px] md:text-[11px] text-white/30 font-english whitespace-nowrap text-center">Trusted by<br />the best</span>
          <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center overflow-x-auto scrollbar-hide pb-1">
            {paymentLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex items-center justify-center cursor-pointer shrink-0"
              >
                {logo.svg}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-center group"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-theme-gold/10 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-theme-gold/15 transition-all duration-300">
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-theme-gold" />
              </div>
              <p className="text-[10px] md:text-[11px] font-bold mb-1">{item.title}</p>
              <p className="text-[8px] md:text-[9px] text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
