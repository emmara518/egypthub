import type { Metadata } from 'next';
import { Playfair_Display, Cairo, Poppins, Amiri } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EGYPTHUB - Egypt Travel Marketplace',
  description: 'EgyptHub — Multi-role Egyptian Travel Marketplace. Discover Egypt your way.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" className={`${playfair.variable} ${cairo.variable} ${poppins.variable} ${amiri.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
