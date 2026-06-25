'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight, HiViewGrid } from 'react-icons/hi';

const screens = [
  { name: 'Overview', slug: 'overview', num: 1 },
  { name: 'Design System', slug: 'design-system', num: 2 },
  { name: 'AI Concierge', slug: 'ai-concierge', num: 3 },
  { name: 'Traveler Portal', slug: 'traveler-portal', num: 4 },
  { name: 'Partner Admin', slug: 'partner-admin', num: 5 },
  { name: 'Mobile Experience', slug: 'mobile-experience', num: 6 },
  { name: 'Booking & Checkout', slug: 'booking-checkout', num: 7 },
  { name: 'Super Admin', slug: 'super-admin', num: 8 },
  { name: 'Ambassador Dashboard', slug: 'ambassador-dashboard', num: 9 },
];

export default function ScreensIndex() {
  return (
    <div className="min-h-screen bg-dark-900 text-neutral-100 font-cairo" dir="ltr">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <HiViewGrid className="text-primary-500" />
            <span className="text-primary-500 text-sm font-semibold">EGYPTHUB — Screens</span>
          </div>
          <h1 className="text-4xl font-bold font-playfair mb-3">
            All <span className="text-primary-500">Screens</span>
          </h1>
          <p className="text-neutral-500 text-lg">8 screens representing the EgyptHub platform</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/screens/${screen.slug}`}
                className="block p-6 rounded-2xl bg-dark-800 border border-primary-500/15 hover:border-primary-500/40 transition-all duration-300 group hover:shadow-gold-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 font-bold font-poppins">
                    {screen.num}
                  </span>
                  <HiArrowRight className="text-neutral-500 group-hover:text-primary-500 transition-colors" />
                </div>
                <h3 className="font-bold text-lg font-playfair text-neutral-100 mb-1">{screen.name}</h3>
                <p className="text-neutral-500 text-sm">Stage {screen.num}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
