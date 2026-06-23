import type { Metadata } from 'next';
import './globals.css';
import PartnerSidebar from '@/components/PartnerSidebar';

export const metadata: Metadata = {
  title: 'لوحة الشريك - مصر هب',
  description: 'لوحة تحكم الشريك في مصر هب',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen">
        <PartnerSidebar />
        <main className="flex-1 p-6 md:p-8 mr-64">{children}</main>
      </body>
    </html>
  );
}
