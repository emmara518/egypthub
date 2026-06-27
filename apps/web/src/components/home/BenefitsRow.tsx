import { motion } from 'framer-motion';
import { Shield, Dollar, Check, Support, Refresh } from '@/components/Icons';

const benefits = [
  { icon: Shield, title: 'Secure Booking', desc: 'Your data is safe with us' },
  { icon: Dollar, title: 'Best Price Guarantee', desc: 'Get the best value on every booking' },
  { icon: Check, title: 'Verified & Trusted', desc: 'All partners verified for your peace of mind' },
  { icon: Support, title: '24/7 Concierge', desc: 'We\'re with you every step of the journey' },
  { icon: Refresh, title: 'Flexible Cancellation', desc: 'Plans that adapt to your plans' },
];

export default function BenefitsRow() {
  return (
    <section className="py-16 bg-gradient-to-b from-theme-surface/30 to-transparent border-y border-white/[0.03]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-theme-gold/10 flex items-center justify-center mb-3 group-hover:bg-theme-gold/15 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(212,162,76,0.1)]">
                <item.icon size={20} />
              </div>
              <p className="text-xs font-bold mb-1">{item.title}</p>
              <p className="text-[10px] text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
