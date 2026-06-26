'use client';

import { usePathname } from 'next/navigation';
import PremiumBottomNav from './PremiumBottomNav';
import PageTransition from './PageTransition';

const NAV_ROUTES = ['/', '/explore', '/favorites', '/search', '/portal'];

export default function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = NAV_ROUTES.includes(pathname);

  return (
    <div className="relative flex flex-col min-h-screen">
      <PageTransition>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </PageTransition>
      {showNav && <PremiumBottomNav />}
      {showNav && <div className="lg:hidden h-[72px]" aria-hidden="true" />}
    </div>
  );
}
