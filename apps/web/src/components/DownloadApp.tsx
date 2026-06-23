'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DownloadApp() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-primary-500/20 bg-dark-800">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-500/10 to-transparent" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-16">
            <div className="flex-1 text-center lg:text-right">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">التطبيق المحمول</p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-4">
                خذ مصر <span className="text-theme-gold">أينما ذهبت</span>
              </h2>
              <p className="text-theme-secondary font-cairo mb-8 max-w-md leading-relaxed">
                حمّل تطبيق EgyptHub لحجز سلس وتحديثات فورية ومساعدة ذكية في السفر أينما كنت.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-dark-700 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-200"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#D2CFCA">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div>
                    <p className="text-theme-secondary text-xs font-cairo">حمّل من</p>
                    <p className="text-theme text-sm font-bold">App Store</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-dark-700 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-200"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#D2CFCA">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div>
                    <p className="text-theme-secondary text-xs font-cairo">احصل عليه من</p>
                    <p className="text-theme text-sm font-bold">Google Play</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-80 rounded-2xl border-2 border-primary-500/30 bg-dark-700 flex items-center justify-center overflow-hidden"
              >
                <div className="text-center p-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8843A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <p className="text-primary-500 font-bold font-playfair text-lg">EGYPT<span className="text-neutral-100">HUB</span></p>
                  <p className="text-neutral-500 text-xs mt-2">Coming Soon</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
