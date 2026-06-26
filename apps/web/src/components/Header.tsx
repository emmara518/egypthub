'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { t, getDir } from '@/lib/i18n';
import { useLang } from '@/components/LanguageProvider';
import { PyramidIcon } from './EgyptianIcons';
import BrandMotif from './BrandMotif';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './notifications/NotificationBell';

type Locale = 'ar' | 'en';

interface NavItem { name: string; href: string; }
interface CatItem extends NavItem { icon: string; }

const navItems = (l: Locale) => ({
  explore: [
    { name: t(l, 'categories.restaurants'), href: '/category/restaurants' },
    { name: t(l, 'categories.cafes'), href: '/category/cafes' },
    { name: t(l, 'categories.activities'), href: '/category/activities' },
    { name: t(l, 'categories.hotels'), href: '/category/hotels' },
    { name: t(l, 'categories.shopping'), href: '/category/shopping' },
    { name: t(l, 'categories.transport'), href: '/category/transport' },
  ] as NavItem[],
  ai: [
    { name: t(l, 'ai.zainab'), href: '/zainab' },
    { name: t(l, 'ai.advanced'), href: '/ai-concierge' },
    { name: t(l, 'ai.budget'), href: '/budget-planner' },
    { name: t(l, 'ai.translator'), href: '/translator' },
    { name: t(l, 'ai.safety'), href: '/safety' },
    { name: t(l, 'ai.follow_up'), href: '/follow-up' },
  ] as NavItem[],
  more: [
    { name: 'Offline', href: '/offline' },
    { name: t(l, 'nav.dashboard'), href: '/analytics' },
    { name: t(l, 'nav.wallet'), href: '/wallet' },
    { name: t(l, 'nav.favorites'), href: '/favorites' },
    { name: t(l, 'nav.bookings'), href: '/bookings' },
    { name: 'Travel DNA', href: '/travel-dna' },
    { name: t(l, 'nav.profile'), href: '/profile' },
  ] as NavItem[],
  mobileCats: [
    { name: t(l, 'categories.restaurants'), href: '/category/restaurants', icon: '🍽' },
    { name: t(l, 'categories.cafes'), href: '/category/cafes', icon: '☕' },
    { name: t(l, 'categories.activities'), href: '/category/activities', icon: '🏄' },
    { name: t(l, 'categories.hotels'), href: '/category/hotels', icon: '🏨' },
    { name: t(l, 'categories.shopping'), href: '/category/shopping', icon: '🛍' },
    { name: t(l, 'categories.transport'), href: '/category/transport', icon: '🚗' },
  ] as CatItem[],
});

const dropdownItem = `block w-full text-right px-4 py-2.5 rounded-xl text-sm font-cairo transition-colors`;
const dropdownItemAr = `text-gray-800 hover:bg-[#FAEDCD]/40`;
const dropdownItemEn = `text-gray-800 hover:bg-amber-50`;

export default function Header() {
  const { locale, toggle: toggleLang, dir } = useLang();
  const isRtl = dir === 'rtl';
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout>>();

  const items = navItems(locale);
  const aiItems = navItems(locale).ai;
  const moreItems = navItems(locale).more;

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

  const handleDropdown = useCallback((name: string | null) => {
    clearTimeout(dropdownTimer.current);
    setOpenDropdown(name);
  }, []);

  const handleDropdownLazy = useCallback(() => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) => {
    const active = isActive(href);
    return `px-4 py-2 rounded-lg text-sm font-medium font-cairo transition-all duration-200 ${
      active
        ? 'text-theme-gold bg-theme-gold/10'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;
  };

  const dropdownBtnClass = (name: string) => {
    const active = isActive(items[name as keyof typeof items]?.[0]?.href || '');
    return `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium font-cairo transition-all duration-200 ${
      active
        ? 'text-theme-gold bg-theme-gold/10'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;
  };

  const renderDropdown = (name: string, navList: NavItem[]) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdown(name)}
      onMouseLeave={handleDropdownLazy}
    >
      <button className={dropdownBtnClass(name)} aria-label={t(locale, name === 'explore' ? 'nav.explore' : name === 'ai' ? 'nav.ai' : 'nav.more' as any)}>
        {t(locale, name === 'explore' ? 'nav.explore' : name === 'ai' ? 'nav.ai' : 'nav.more' as any)}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === name ? (isRtl ? '-rotate-90' : 'rotate-180') : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <AnimatePresence>
        {openDropdown === name && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 w-52 rounded-2xl bg-white shadow-xl border border-theme-gold/20 overflow-hidden z-50`}
          >
            <div className="p-2">
              {navList.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${dropdownItem} ${isRtl ? dropdownItemAr : dropdownItemEn} ${isActive(item.href) ? 'text-theme-gold font-semibold !bg-[#FAEDCD]/40' : ''}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const searchInput = (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t(locale, 'nav.search')}
        aria-label={t(locale, 'nav.search')}
        className={`bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-theme-gold/40 transition-all w-40 lg:w-56 ${isRtl ? 'pr-4 pl-9' : 'pl-4 pr-9'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
      <svg className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 ${isRtl ? 'left-3' : 'right-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-theme-bg/95 backdrop-blur-lg shadow-md border-b border-theme-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className={`max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            <BrandMotif variant="avatar-ring" size="sm" className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 ${
              scrolled ? 'bg-theme-gold/10 border border-theme-gold/30' : 'bg-white/15 backdrop-blur-sm'
            }`}>
              <PyramidIcon className="w-6 h-6 text-theme-gold" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className={`flex items-baseline gap-1 ${isRtl ? '' : 'flex-row-reverse'}`}>
              <span className="text-xl font-bold text-white">{t(locale, 'header.egypt')}</span>
              <span className="text-xl font-bold text-theme-gold">{t(locale, 'header.hub')}</span>
            </div>
            <span className={`text-[10px] tracking-[0.2em] text-white/70 -mt-1 ${isRtl ? 'text-right' : 'text-left'}`}>{t(locale, 'header.subtitle')}</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className={navLinkClass('/')}>{t(locale, 'nav.home')}</Link>
          {renderDropdown('explore', items.explore)}
          <Link href="/offers" className={navLinkClass('/offers')}>{t(locale, 'nav.offers')}</Link>
          {renderDropdown('ai', aiItems)}
          {renderDropdown('more', moreItems)}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              {searchInput}
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-2 text-white/60 hover:text-white transition-colors" aria-label={t(locale, 'nav.close_search')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all" aria-label={t(locale, 'nav.open_search')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          )}

          <button onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border border-white/20 text-xs font-medium text-white/80 hover:bg-white/10 transition-all font-cairo"
            aria-label={t(locale, 'common.lang_label')}>
            {t(locale, 'common.lang_label')}
          </button>

          <NotificationBell />
          <ThemeToggle />

          <Link href="/auth/login"
            className="px-5 py-2 rounded-xl border border-white/30 text-white/90 hover:bg-white/10 transition-all duration-200 font-cairo text-sm font-medium">
            {t(locale, 'header.login_btn')}
          </Link>
          <Link href="/auth/register"
            className="px-5 py-2 rounded-xl bg-gradient-gold text-[#0A0E17] hover:brightness-110 transition-all duration-200 font-cairo text-sm font-bold">
            {t(locale, 'header.register_btn')}
          </Link>
        </div>

        {/* Mobile: Search + Lang + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleLang}
            className="px-2 py-1 rounded-lg border border-white/20 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-all font-cairo"
            aria-label={t(locale, 'common.lang_label')}>
            {t(locale, 'common.lang_label')}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-white transition-colors"
            aria-label={t(locale, 'nav.more')}>
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} bottom-0 w-full max-w-sm bg-theme-surface border-${isRtl ? 'l' : 'r'} border-theme-gold/20 overflow-y-auto`}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className={`flex items-center justify-between mb-6 ${isRtl ? '' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                    <BrandMotif variant="avatar-ring" size="sm" />
                    <div>
                      <div className={`flex items-baseline gap-1 ${isRtl ? '' : 'flex-row-reverse'}`}>
                        <span className="text-lg font-bold text-white">{t(locale, 'header.egypt')}</span>
                        <span className="text-lg font-bold text-theme-gold">{t(locale, 'header.hub')}</span>
                      </div>
                      <span className={`text-[9px] tracking-[0.2em] text-white/40 ${isRtl ? 'text-right' : 'text-left'} block`}>{t(locale, 'header.subtitle')}</span>
                    </div>
                  </div>
                  <motion.button whileTap={{ rotate: 180, scale: 0.9 }}
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                    aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </motion.button>
                </div>

                {/* Search in Mobile */}
                <div className="mb-6">{searchInput}</div>

                {/* Main Nav */}
                <motion.nav
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
                  initial="hidden" animate="visible"
                  className="space-y-1 mb-8"
                >
                  {[
                    { name: t(locale, 'nav.home'), href: '/' },
                    { name: t(locale, 'nav.offers'), href: '/offers' },
                    { name: t(locale, 'nav.explore'), href: '/explore' },
                    { name: t(locale, 'nav.bookings'), href: '/bookings' },
                    { name: t(locale, 'nav.favorites'), href: '/favorites' },
                    { name: t(locale, 'nav.wallet'), href: '/wallet' },
                    { name: t(locale, 'nav.profile'), href: '/profile' },
                    { name: 'Offline', href: '/offline' },
                    { name: t(locale, 'nav.dashboard'), href: '/analytics' },
                    { name: 'Notifications', href: '/notifications' },
                  ].map((item) => (
                    <motion.div key={item.href}
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                      whileTap={{ scale: 0.97 }}>
                      <Link href={item.href}
                        className={`block px-4 py-3 rounded-xl font-cairo font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-theme-gold bg-theme-gold/10 border-l-2 border-theme-gold'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={() => setMobileOpen(false)}>
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* AI Section */}
                <div className="mb-6">
                  <h3 className={`px-4 text-xs font-bold text-theme-gold uppercase tracking-wider mb-3 font-poppins ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t(locale, 'nav.ai')}
                  </h3>
                  <div className="space-y-1">
                    {aiItems.map((item) => (
                      <Link key={item.href} href={item.href}
                        className={`block px-4 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 font-cairo transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                        onClick={() => setMobileOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="mb-8">
                  <h3 className={`px-4 text-xs font-bold text-theme-gold uppercase tracking-wider mb-3 font-poppins ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t(locale, 'categories.all')}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {items.mobileCats.map((cat) => (
                      <Link key={cat.href} href={cat.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors ${isRtl ? '' : 'flex-row-reverse'}`}
                        onClick={() => setMobileOpen(false)}>
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm text-white/80 font-cairo">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="space-y-3">
                  <Link href="/auth/login"
                    className="block w-full text-center px-5 py-3 rounded-xl border-2 border-theme-gold/30 text-theme-gold font-cairo font-bold transition-colors hover:bg-theme-gold/10"
                    onClick={() => setMobileOpen(false)}>
                    {t(locale, 'header.login_btn')}
                  </Link>
                  <Link href="/auth/register"
                    className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold"
                    onClick={() => setMobileOpen(false)}>
                    {t(locale, 'header.register_btn')}
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
