'use client';

import Link from 'next/link';
import { Home, Compass, Heart, Search, User } from '@/components/Icons';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: Heart, label: 'Saved', href: '/favorites' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: User, label: 'Profile', href: '/portal' },
];

export default function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080C18]/95 backdrop-blur-xl border-t border-theme-gold/[0.08] safe-area-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around py-1.5">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-white/40 hover:text-theme-gold transition-colors touch-target" aria-label={item.label}
          >
            <item.icon size={20} />
            <span className="text-[8px] font-english tracking-wider">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
