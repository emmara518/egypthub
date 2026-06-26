'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const OFFERS = [
  { id: 1, title: 'خصم 20% على رحلات البحر الأحمر', desc: 'اغوص في أجمل بقاع العالم مع خصم حصري لمستخدمي مصر هب', discount: 20, validUntil: '2026-08-15', image: '/images/destinations/sharm-el-sheikh.jpg', tag: 'محدود', color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30' },
  { id: 2, title: 'استكشف الأقصر بخصم 35%', desc: 'جولة كاملة في معابد الأقصر ووادي الملوك — أقل سعر في السنة', discount: 35, validUntil: '2026-07-30', image: '/images/destinations/luxor.jpg', tag: 'أفضل عرض', color: 'from-amber-500/20 to-orange-600/10 border-amber-500/30' },
  { id: 3, title: 'عرض النيل: 3 أيام بـ 2', desc: 'احجز رحلة نيلية بين أسوان والأقصر وادفع ثالث يوم مجانًا', discount: 33, validUntil: '2026-09-01', image: '/images/destinations/aswan.jpg', tag: 'شامل', color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30' },
  { id: 4, title: 'ويبناير مجاني مع كل حجز', desc: 'احجز أي تجربة واحصل على جلسة تصوير احترافية مجانية في الأهرامات', discount: 100, validUntil: '2026-08-20', image: '/images/destinations/cairo.jpg', tag: 'هدية', color: 'from-purple-500/20 to-pink-600/10 border-purple-500/30' },
];

function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    function calc() {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setTime('انتهى');
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      setTime(`${d} يوم ${h} ساعة`);
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [target]);
  return <span className="text-[10px] font-cairo text-theme-muted">{time}</span>;
}

export default function OffersPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-theme-bg pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">Limited Offers</p>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-theme mb-2">عروض محدودة</h1>
          <p className="text-theme-secondary font-cairo">احجز الآن ووفر في مغامرتك المصرية</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setActiveIdx(i)}
              onHoverEnd={() => setActiveIdx(null)}
              className={`relative rounded-2xl border ${offer.color} bg-theme-card overflow-hidden group cursor-pointer`}
            >
              <div className="flex h-full">
                <div className="w-1/3 min-h-[160px] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${offer.image})` }}
                  />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold font-poppins tracking-widest uppercase px-2 py-0.5 rounded-full bg-theme-gold/15 text-theme-gold border border-theme-gold/20">{offer.tag}</span>
                      <span className="text-lg font-bold font-english text-theme-gold">-{offer.discount}%</span>
                    </div>
                    <h3 className="text-sm font-bold font-cairo text-theme mb-1 leading-relaxed">{offer.title}</h3>
                    <p className="text-xs font-cairo text-theme-secondary leading-relaxed">{offer.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-theme-border">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <Countdown target={offer.validUntil} />
                    </div>
                    <span className="text-[11px] font-bold font-cairo text-theme-gold group-hover:translate-x-1 transition-transform">
                      احجز الآن ←
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold font-cairo transition-all duration-200 hover:brightness-110 shadow-lg shadow-theme-gold/20">
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
