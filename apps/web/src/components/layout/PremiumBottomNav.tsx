'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, Search, User } from '@/components/Icons';

const TAB_ICONS = [Home, Compass, Heart, Search, User] as const;

const TABS: { id: string; label: string; labelEn: string; href: string }[] = [
  { id: 'home', label: 'الرئيسية', labelEn: 'Home', href: '/' },
  { id: 'explore', label: 'استكشف', labelEn: 'Explore', href: '/explore' },
  { id: 'saved', label: 'المحفوظات', labelEn: 'Saved', href: '/favorites' },
  { id: 'search', label: 'بحث', labelEn: 'Search', href: '/search' },
  { id: 'profile', label: 'حسابي', labelEn: 'Profile', href: '/portal' },
];

const ICON_SPRING = { type: 'spring' as const, stiffness: 500, damping: 22, mass: 0.6 };
const LABEL_SPRING = { type: 'spring' as const, stiffness: 350, damping: 25 };

const TAB_HEIGHT = 72;
const ORB_SIZE = 48;
const JUMP_HEIGHT = -30;

function RippleEffect({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.span
          initial={{ width: 0, height: 0, opacity: 0.35 }}
          animate={{ width: 64, height: 64, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-gold/20 pointer-events-none"
          style={{ marginTop: -4 }}
        />
      )}
    </AnimatePresence>
  );
}

function PressScale({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 600, damping: 20 }}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

interface TabContentProps {
  id: string;
  Icon: typeof Home;
  label: string;
  labelEn: string;
  href: string;
  isActive: boolean;
}

function TabContent({ id, Icon, label, labelEn, href, isActive }: TabContentProps) {
  const [rippleKey, setRippleKey] = useState(0);

  const handleClick = () => {
    setRippleKey(k => k + 1);
  };

  return (
    <PressScale onClick={handleClick}>
      <Link
        href={href}
        className="relative flex flex-col items-center justify-center w-full h-full gap-0.5 select-none"
        style={{ height: TAB_HEIGHT, minHeight: TAB_HEIGHT }}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        tabIndex={0}
        draggable={false}
      >
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: 28, height: 28 }}
          animate={{
            scale: isActive ? 1.15 : 1,
            y: isActive ? -2 : 0,
          }}
          transition={ICON_SPRING}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: isActive
                ? 'radial-gradient(circle, rgba(212,162,76,0.18) 0%, transparent 70%)'
                : 'radial-gradient(circle, transparent 0%, transparent 70%)',
              scale: isActive ? 1.3 : 0.8,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <Icon
            size={24}
            className="relative z-10 transition-colors duration-300"
            style={{ color: isActive ? '#D4A24C' : 'rgba(255,255,255,0.35)' }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isActive && (
            <motion.span
              key={`label-${id}`}
              initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
              transition={LABEL_SPRING}
              className="text-[9px] font-cairo font-semibold text-theme-gold leading-none"
              style={{ letterSpacing: '0.02em' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>

        {!isActive && (
          <span
            className="text-[9px] font-cairo text-white/25 leading-none"
            style={{ opacity: 0, letterSpacing: '0.02em', userSelect: 'none', pointerEvents: 'none', height: 13 }}
          >
            {label}
          </span>
        )}

        <RippleEffect isActive={rippleKey > 0} />
      </Link>
    </PressScale>
  );
}

export default function PremiumBottomNav() {
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const prevIdx = useRef(activeIdx);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const idx = TABS.findIndex(t => {
      if (t.href === '/') return pathname === '/';
      return pathname.startsWith(t.href);
    });
    if (idx >= 0) setActiveIdx(idx);
  }, [pathname]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevIdx.current = activeIdx;
      return;
    }
    if (prevIdx.current !== activeIdx) {
      setIsJumping(true);
      const timer = setTimeout(() => setIsJumping(false), 550);
      prevIdx.current = activeIdx;
      return () => clearTimeout(timer);
    }
  }, [activeIdx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setTabWidth(entry.contentRect.width / TABS.length);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const orbX = tabWidth > 0 ? activeIdx * tabWidth + tabWidth / 2 - ORB_SIZE / 2 : -999;

  return (
    <nav
      ref={containerRef}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{ height: TAB_HEIGHT, minHeight: TAB_HEIGHT }}
      aria-label="التنقل الرئيسي"
    >
      <div className="relative h-full">
        <div
          className="absolute inset-0 border-t border-theme-gold/[0.08]"
          style={{
            background: 'linear-gradient(180deg, rgba(8,12,24,0.85) 0%, rgba(8,12,24,0.98) 100%)',
            backdropFilter: 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          animate={{
            opacity: activeIdx >= 0 ? 1 : 0,
            background: activeIdx >= 0
              ? 'linear-gradient(90deg, transparent 0%, rgba(212,162,76,0.15) 20%, rgba(212,162,76,0.3) 50%, rgba(212,162,76,0.15) 80%, transparent 100%)'
              : 'transparent',
          }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ORB_SIZE,
            height: ORB_SIZE,
            top: 8,
            background: 'radial-gradient(circle at 35% 30%, rgba(255,220,130,0.95) 0%, rgba(212,162,76,0.5) 45%, rgba(180,130,50,0.15) 70%, transparent 100%)',
            boxShadow: [
              '0 0 24px rgba(212,162,76,0.35)',
              '0 0 60px rgba(212,162,76,0.1)',
              'inset 0 2px 6px rgba(255,255,255,0.25)',
            ].join(', '),
            border: '1px solid rgba(212,162,76,0.15)',
            willChange: 'transform',
            zIndex: 0,
          }}
          animate={{
            x: orbX,
            y: isJumping ? [0, JUMP_HEIGHT, 0] : 0,
            scaleX: isJumping ? [1, 0.85, 1.18, 1] : 1,
            scaleY: isJumping ? [1, 1.18, 0.82, 1] : 1,
            rotate: isJumping ? [0, 180, 360] : 0,
          }}
          transition={{
            x: { type: 'spring', stiffness: 450, damping: 28, mass: 0.7 },
            y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            scaleX: { duration: 0.5, ease: 'easeInOut' },
            scaleY: { duration: 0.5, ease: 'easeInOut' },
            rotate: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
        />

        <div
          className="relative flex items-center justify-around h-full"
          style={{ paddingBottom: 0 }}
        >
          {TABS.map((tab, i) => {
            const Icon = TAB_ICONS[i];
            const isActive = i === activeIdx;
            return (
              <div
                key={tab.id}
                className="flex-1 flex items-center justify-center"
              >
                <TabContent
                  id={tab.id}
                  Icon={Icon}
                  label={tab.label}
                  labelEn={tab.labelEn}
                  href={tab.href}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
