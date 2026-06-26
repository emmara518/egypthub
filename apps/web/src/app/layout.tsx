import type { Metadata } from 'next';
import { Playfair_Display, Cairo, Poppins, Amiri } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import LanguageProvider from '@/components/LanguageProvider';
import NavigationShell from '@/components/layout/NavigationShell';

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
  description: 'Discover Egypt your way — AI-powered travel marketplace connecting you with authentic local experiences, Nile cruises, Red Sea diving, and ancient wonders.',
  metadataBase: new URL('https://egypthub.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'EGYPTHUB - Egypt Travel Marketplace',
    description: 'Discover Egypt your way — AI-powered travel marketplace connecting you with authentic local experiences, Nile cruises, Red Sea diving, and ancient wonders.',
    url: 'https://egypthub.co',
    siteName: 'EGYPTHUB',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630, alt: 'EGYPTHUB - Egypt Travel Marketplace' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EGYPTHUB - Egypt Travel Marketplace',
    description: 'Discover Egypt your way — AI-powered travel marketplace connecting you with authentic local experiences.',
    images: ['/assets/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/icon-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" className={`${playfair.variable} ${cairo.variable} ${poppins.variable} ${amiri.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D4A24C" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Egypt travel, Egypt tourism, AI travel planner, Nile cruises, Red Sea diving, Egyptian experiences, luxury travel Egypt, booking platform" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'EGYPTHUB',
              url: 'https://egypthub.co',
              description: 'Egyptian AI-powered travel marketplace connecting travelers with authentic local experiences.',
              logo: '/assets/icon-512.png',
              sameAs: [
                'https://instagram.com/egypthub',
                'https://facebook.com/egypthub',
                'https://twitter.com/egypthub',
              ],
              address: { '@type': 'PostalAddress', addressCountry: 'EG' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'EGYPTHUB',
              url: 'https://egypthub.co',
              potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: 'https://egypthub.co/search?q={search_term_string}' },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col noise-overlay">
        <LanguageProvider>
          <ThemeProvider>
            <NavigationShell>
              {children}
            </NavigationShell>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
