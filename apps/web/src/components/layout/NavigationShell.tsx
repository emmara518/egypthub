'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumBottomNav from './PremiumBottomNav';
import PageTransition from './PageTransition';
import BackToTop from '@/components/home/BackToTop';

const ActionDrawer = dynamic(() => import('@/components/home/ActionDrawer'), { ssr: false });
const WhatsAppChat = dynamic(() => import('@/components/home/WhatsAppChat'), { ssr: false });
const RecentlyViewed = dynamic(() => import('@/components/home/RecentlyViewed'), { ssr: false });

const NAV_ROUTES = ['/', '/explore', '/favorites', '/search', '/portal'];

export default function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = NAV_ROUTES.includes(pathname);

  return (
    <div className="relative flex flex-col min-h-screen bg-theme-bg text-white">
      <Header />
      <PageTransition>
        <main className="flex-1 flex flex-col pt-20">
          {children}
        </main>
      </PageTransition>
      <Footer />
      {showNav && <PremiumBottomNav />}
      {showNav && <div className="lg:hidden h-[72px]" aria-hidden="true" />}
      <ActionDrawer />
      <WhatsAppChat />
      <RecentlyViewed />
      <BackToTop />
    </div>
  );
}
