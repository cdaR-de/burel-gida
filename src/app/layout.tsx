import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocaleProvider } from '@/contexts/LocaleContext';
import '@/styles/globals.scss';

// Font configurations
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Food Safety Website | Gıda Güvenliği',
    template: '%s | Food Safety Website',
  },
  description: 'Comprehensive food safety information, educational resources, and expert guidance for consumers and professionals.',
  keywords: ['food safety', 'HACCP', 'ISO 22000', 'gıda güvenliği', 'food hygiene', 'food regulations'],
  authors: [{ name: 'Food Safety Team' }],
  creator: 'Food Safety Website',
  publisher: 'Food Safety Website',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://foodsafety.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    url: 'https://foodsafety.com',
    siteName: 'Food Safety Website',
    title: 'Food Safety Website | Gıda Güvenliği',
    description: 'Comprehensive food safety information, educational resources, and expert guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Safety Website | Gıda Güvenliği',
    description: 'Comprehensive food safety information, educational resources, and expert guidance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <LocaleProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}

