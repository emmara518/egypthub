import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'لوحة السفير - مصر هب',
  description: 'لوحة تحكم السفير في مصر هب',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 mr-64">{children}</main>
      </body>
    </html>
  );
}
