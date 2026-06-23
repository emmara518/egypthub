'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiCash, HiLink, HiCreditCard, HiLogout, HiUser } from 'react-icons/hi';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: HiHome },
  { href: '/earnings', label: 'أرباحي', icon: HiCash },
  { href: '/referral', label: 'الرابط بتاعي', icon: HiLink },
  { href: '/withdraw', label: 'طلب سحب', icon: HiCreditCard },
  { href: '/profile', label: 'البروفايل', icon: HiUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-primary-500 text-white flex flex-col z-50">
      <div className="p-6 border-b border-primary-400">
        <Link href="/" className="text-xl font-bold">
          مصر<span className="text-secondary-400">هب</span>
        </Link>
        <p className="text-primary-100 text-sm mt-1">لوحة السفير</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-primary-700 text-secondary-400' : 'text-primary-100 hover:bg-primary-600'
              }`}
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-400">
        <Link href="/auth/logout" className="flex items-center gap-3 text-primary-100 hover:text-red-300 transition-colors px-4 py-2">
          <HiLogout className="text-xl" />
          <span>تسجيل خروج</span>
        </Link>
      </div>
    </aside>
  );
}
