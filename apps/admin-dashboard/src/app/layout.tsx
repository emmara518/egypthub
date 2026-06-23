import type { Metadata } from 'next';
import './globals.css';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata: Metadata = {
  title: 'لوحة الأدمن - مصر هب',
  description: 'لوحة تحكم الأدمن في مصر هب',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8 mr-64">{children}</main>
      </body>
    </html>
  );
}
