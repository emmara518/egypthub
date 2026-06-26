'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';

/* ───── Data ───── */
const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard' },
  { id: 'favorites', label: 'المفضلة', icon: 'favorites' },
  { id: 'bookings', label: 'الحجوزات', icon: 'bookings' },
  { id: 'wallet', label: 'المحفظة', icon: 'wallet' },
  { id: 'notifications', label: 'الإشعارات', icon: 'notifications' },
  { id: 'settings', label: 'الإعدادات', icon: 'settings' },
  { id: 'logout', label: 'الخروج', icon: 'logout' },
] as const;

type MenuId = (typeof menuItems)[number]['id'];

const recentBookings = [
  {
    id: 1,
    title: 'رحلة سفاري في الصحراء البيضاء',
    date: '28 يونيو 2026',
    status: 'مؤكد',
    statusType: 'confirmed' as const,
    price: 'ج.م 1,200',
    img: '/images/activities/desert-safari.svg',
  },
  {
    id: 2,
    title: 'جولة في وادي الملوك',
    date: '5 يوليو 2026',
    status: 'قيد الانتظار',
    statusType: 'pending' as const,
    price: 'ج.م 850',
    img: '/images/destinations/luxor.svg',
  },
  {
    id: 3,
    title: 'غوص في البحر الأحمر',
    date: '12 يوليو 2026',
    status: 'مؤكد',
    statusType: 'confirmed' as const,
    price: 'ج.م 650',
    img: '/images/activities/diving.svg',
  },
];

const upcomingTrips = [
  {
    id: 1,
    title: 'رحلة الأقصر',
    date: '5 يوليو',
    daysLeft: 10,
    img: '/images/destinations/luxor.svg',
  },
  {
    id: 2,
    title: 'استكشاف الأهرامات',
    date: '20 يوليو',
    daysLeft: 25,
    img: '/images/destinations/cairo.svg',
  },
  {
    id: 3,
    title: 'منتجع البحر الأحمر',
    date: '1 أغسطس',
    daysLeft: 37,
    img: '/images/destinations/sharm-el-sheikh.svg',
  },
];

const quickActions = [
  { label: 'ابحث عن رحلة', icon: 'search', href: '/destinations' },
  { label: 'استكشف الوجهات', icon: 'explore', href: '/destinations' },
  { label: 'شارك مع صديق', icon: 'share', href: '/referral' },
  { label: 'تواصل مع دليل', icon: 'guide', href: '/zainab' },
];

const stats = [
  { value: '34', label: 'الرحلات', icon: 'routes' },
  { value: '17', label: 'الوجهات', icon: 'destinations' },
  { value: '56', label: 'التجارب', icon: 'experiences' },
  { value: '4.5', label: 'التقييم', icon: 'rating' },
];

/* ───── Inline SVG Icons ───── */
function IconDashboard() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function IconFavorites() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconBookings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  );
}

function IconNotifications() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconRoutes() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function IconDestinations() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconExperiences() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconRating() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconExplore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconGuide() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

const iconMap = {
  dashboard: IconDashboard,
  favorites: IconFavorites,
  bookings: IconBookings,
  wallet: IconWallet,
  notifications: IconNotifications,
  settings: IconSettings,
  logout: IconLogout,
} as const;

const statsIconMap: Record<string, React.FC> = {
  routes: IconRoutes,
  destinations: IconDestinations,
  experiences: IconExperiences,
  rating: IconRating,
};

const quickActionIcons: Record<string, React.FC> = {
  search: IconSearch,
  explore: IconExplore,
  share: IconShare,
  guide: IconGuide,
};

/* ───── Component ───── */
export default function PortalPage() {
  const [activeMenu, setActiveMenu] = useState<MenuId>('dashboard');
  const gamification = useAppStore((s) => s.gamification);
  const logout = useAuthStore((s) => s.logout);

  const authUser = useAuthStore((s) => s.user);

  const user = {
    name: authUser?.name || 'زائر',
    email: authUser?.email || '',
    memberSince: authUser ? new Date().getFullYear().toString() : '2024',
    level: gamification.level,
    title: gamification.title,
    xp: gamification.xp,
  };

  return (
    <div className="min-h-screen bg-theme-bg text-white font-cairo">
      <div className="flex min-h-screen">
        {/* ─── Desktop Sidebar ─── */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-theme-bg border-l border-theme-border sticky top-0 h-screen overflow-y-auto">
          {/* Profile Card */}
          <div className="p-5 border-b border-theme-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                  <div className="w-full h-full rounded-full bg-theme-bg flex items-center justify-center">
                    <IconUser />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#0C1120]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{user.name}</p>
                <p className="text-[10px] text-theme-gold font-english">عضو منذ {user.memberSince}</p>
              </div>
            </div>
            <div className="bg-[#0F1420] rounded-xl p-3 border border-theme-border">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-theme-secondary">{user.title}</span>
                <span className="text-[10px] text-theme-gold font-english">{user.xp} XP</span>
              </div>
              <div className="w-full h-1.5 bg-[#1A2235] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user.xp / 3000) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-l from-theme-gold to-[#E8C97A] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-3">
            {menuItems.map((item) => {
              const IconComp = iconMap[item.icon];
              const isActive = activeMenu === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (item.id === 'logout') {
                      logout();
                      window.location.href = '/';
                    } else {
                      setActiveMenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D4A24C]/10 text-theme-gold font-medium border border-theme-gold/20'
                      : 'text-theme-secondary hover:text-white hover:bg-[#1A2235]'
                  }`}
                >
                  <IconComp />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="mr-auto w-1.5 h-1.5 rounded-full bg-[#D4A24C]"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-theme-border">
            <div className="flex items-center gap-2 text-[10px] text-theme-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>مصر هب — منصة السياحة المصرية</span>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 pt-6 lg:pt-8 pb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">
                  مرحباً <span className="text-theme-gold">{user.name.split(' ')[0]}</span>
                </h1>
                <p className="text-sm text-theme-secondary mt-1 flex items-center gap-2">
                  <IconCalendar />
                  <span className="font-english">
                    {new Date().toLocaleDateString('ar-EG', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="بحث..."
                    className="w-64 px-4 py-2.5 rounded-xl bg-[#0F1420] border border-theme-border text-sm text-white placeholder-[#5A6478] focus:outline-none focus:border-theme-gold/50 transition-colors"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="px-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => {
                const StatIcon = statsIconMap[stat.icon];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-theme-bg rounded-2xl border border-theme-border p-5 hover:border-theme-gold/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center text-theme-gold group-hover:bg-[#D4A24C]/20 transition-colors">
                        <StatIcon />
                      </div>
                      <IconChevronLeft />
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold font-english text-white">{stat.value}</p>
                    <p className="text-xs text-theme-secondary mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="xl:col-span-2 bg-theme-bg rounded-2xl border border-theme-border p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-lg">الحجوزات الأخيرة</h2>
                  <Link href="#" className="text-xs text-theme-gold hover:text-[#E8C97A] transition-colors flex items-center gap-1">
                    عرض الكل
                    <IconChevronLeft />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentBookings.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      whileHover={{ x: -4 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#0F1420] border border-theme-border hover:border-theme-gold/20 transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative">
                        <Image src={booking.img} alt={booking.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate group-hover:text-theme-gold transition-colors">{booking.title}</p>
                        <p className="text-[11px] text-theme-muted flex items-center gap-1.5 mt-1">
                          <IconCalendar />
                          <span className="font-english">{booking.date}</span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            booking.statusType === 'confirmed'
                              ? 'bg-[#10B981]/15 text-[#10B981]'
                              : 'bg-[#D4A24C]/15 text-theme-gold'
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span className="text-sm font-bold font-english text-theme-gold">{booking.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Trips Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-theme-bg rounded-2xl border border-theme-border p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-lg">الرحلات القادمة</h2>
                  <Link href="#" className="text-xs text-theme-gold hover:text-[#E8C97A] transition-colors flex items-center gap-1">
                    عرض الكل
                    <IconChevronLeft />
                  </Link>
                </div>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute right-[18px] top-0 bottom-0 w-px bg-[#1E2A3D]" />

                  <div className="space-y-4">
                    {upcomingTrips.map((trip, i) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="relative flex items-center gap-4"
                      >
                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${
                          i === 0
                            ? 'bg-[#D4A24C]/20 border-2 border-theme-gold'
                            : 'bg-[#1A2235] border-2 border-theme-border'
                        }`}>
                          {i === 0 && (
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 rounded-full bg-[#D4A24C]/10"
                            />
                          )}
                          <span className="text-xs font-bold font-english text-theme-gold">{i + 1}</span>
                        </div>

                        {/* Trip Card */}
                        <div className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[#0F1420] border border-theme-border hover:border-theme-gold/20 transition-all cursor-pointer">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
                            <Image src={trip.img} alt={trip.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{trip.title}</p>
                            <p className="text-[11px] text-theme-muted mt-0.5 font-english">{trip.date}</p>
                          </div>
                          <div className="text-left shrink-0">
                            <p className="text-[10px] text-theme-secondary">بعد</p>
                            <p className="text-sm font-bold font-english text-theme-gold">{trip.daysLeft}</p>
                            <p className="text-[10px] text-theme-muted">يوم</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <h2 className="font-bold text-lg mb-4">إجراءات سريعة</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, i) => {
                  const ActionIcon = quickActionIcons[action.icon];
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + i * 0.08 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={action.href}
                        className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-theme-bg border border-theme-border hover:border-theme-gold/30 hover:bg-[#0F1420] transition-all duration-300 group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#D4A24C]/10 flex items-center justify-center text-theme-gold group-hover:bg-[#D4A24C]/20 group-hover:scale-110 transition-all duration-300">
                          <ActionIcon />
                        </div>
                        <span className="text-sm font-medium text-center group-hover:text-theme-gold transition-colors">{action.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-theme-bg/95 backdrop-blur-lg border-t border-theme-border">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.slice(0, 5).map((item) => {
            const IconComp = iconMap[item.icon];
            const isActive = activeMenu === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveMenu(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive ? 'text-theme-gold' : 'text-theme-muted'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <IconComp />
                  {isActive && (
                    <motion.div
                      layoutId="mobileIndicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A24C]"
                    />
                  )}
                </div>
                <span className="text-[9px] mt-1">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
