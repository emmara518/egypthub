'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { PyramidIcon } from './EgyptianIcons';
import ThemeToggle from './ThemeToggle';

const exploreItems = [
  { name: 'مطاعم', href: '/category/restaurants' },
  { name: 'كافيهات', href: '/category/cafes' },
  { name: 'أنشطة', href: '/category/activities' },
  { name: 'فنادق', href: '/category/hotels' },
  { name: 'تسوق', href: '/category/shopping' },
  { name: 'نقل', href: '/category/transport' },
];

const mobileCategories = [
  { name: 'مطاعم', href: '/category/restaurants', icon: '🍽' },
  { name: 'كافيهات', href: '/category/cafes', icon: '☕' },
  { name: 'أنشطة', href: '/category/activities', icon: '🏄' },
  { name: 'فنادق', href: '/category/hotels', icon: '🏨' },
  { name: 'تسوق', href: '/category/shopping', icon: '🛍' },
  { name: 'نقل', href: '/category/transport', icon: '🚗' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-theme-bg/95 backdrop-blur-lg shadow-md border-b border-theme-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            scrolled
              ? 'bg-theme-gold/10 border border-theme-gold/30'
              : 'bg-white/15 backdrop-blur-sm'
          }`}>
            <PyramidIcon className="w-6 h-6 text-theme-gold" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">مصر</span>
              <span className="text-xl font-bold text-theme-gold">هب</span>
            </div>
            <span className="text-[10px] tracking-[0.2em] text-white/70 -mt-1">EGYPT HUB</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium font-cairo transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10">
            الرئيسية
          </Link>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium font-cairo transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10">
              اكتشف
              <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-theme-gold/20 overflow-hidden"
                >
                  <div className="p-2">
                    {exploreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 rounded-xl text-sm text-gray-800 hover:bg-[#FAEDCD]/40 transition-colors font-cairo"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/offers" className="px-4 py-2 rounded-lg text-sm font-medium font-cairo transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10">
            العروض
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/auth/login"
            className="px-5 py-2 rounded-xl border border-white/30 text-white/90 hover:bg-white/10 transition-all duration-200 font-cairo text-sm font-medium"
          >
            دخول
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-xl bg-gradient-gold text-[#0A0E17] hover:brightness-110 transition-all duration-200 font-cairo text-sm font-bold"
          >
            حساب جديد
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-white shadow-xl border-r border-theme-gold/20 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <PyramidIcon className="w-8 h-8 text-theme-gold" />
                    <span className="text-lg font-bold">
                      <span className="text-gray-900">مصر</span>
                      <span className="text-theme-gold">هب</span>
                    </span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500">
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1 mb-8">
                  <Link href="/" className="block px-4 py-3 rounded-xl text-gray-800 hover:bg-theme-gold/10 font-cairo font-medium" onClick={() => setMobileOpen(false)}>
                    الرئيسية
                  </Link>
                  <Link href="/offers" className="block px-4 py-3 rounded-xl text-gray-800 hover:bg-theme-gold/10 font-cairo font-medium" onClick={() => setMobileOpen(false)}>
                    العروض
                  </Link>
                </nav>

                <div className="mb-8">
                  <h3 className="px-4 text-xs font-bold text-theme-gold uppercase tracking-wider mb-3 font-poppins">التصنيفات</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {mobileCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-theme-gold/10 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm text-gray-800 font-cairo">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    className="block w-full text-center px-5 py-3 rounded-xl border-2 border-theme-gold/30 text-theme-gold font-cairo font-bold transition-colors hover:bg-theme-gold/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    دخول
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold"
                    onClick={() => setMobileOpen(false)}
                  >
                    حساب جديد
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
