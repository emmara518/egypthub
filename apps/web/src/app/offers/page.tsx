'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-primary-500 text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">Offers</p>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-neutral-100">عروض محدودة</h1>
          <p className="text-neutral-500 mt-3 font-cairo">احجز الآن ووفر في مغامرتك المصرية</p>
        </motion.div>
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-500 hover:bg-primary-500/80 text-dark-900 font-bold transition-all duration-200 font-cairo">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
