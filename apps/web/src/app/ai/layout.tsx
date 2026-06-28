'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiChat, HiCalendar, HiMicrophone, HiClock, HiUser } from 'react-icons/hi';

const NAV_ITEMS = [
  { href: '/ai', icon: HiHome, label: 'الرئيسية' },
  { href: '/ai/chat', icon: HiChat, label: 'المحادثة' },
  { href: '/ai/planner', icon: HiCalendar, label: 'المخطط' },
  { href: '/ai/voice', icon: HiMicrophone, label: 'صوتي' },
  { href: '/ai/history', icon: HiClock, label: 'الرحلات' },
  { href: '/ai/profile', icon: HiUser, label: 'الملف' },
];

export default function AILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-theme-bg">
      {children}

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-theme-bg/95 backdrop-blur-xl border-t border-theme-gold/10 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-[1200px] mx-auto px-2">
          <div className="flex items-center justify-around py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                    isActive ? 'text-theme-gold' : 'text-theme-muted hover:text-theme-secondary'
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-cairo font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="h-[72px] min-h-[env(safe-area-inset-bottom,0px)]" />
    </div>
  );
}
