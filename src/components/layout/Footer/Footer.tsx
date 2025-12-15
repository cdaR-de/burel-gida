'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import styles from './Footer.module.scss';

export default function Footer() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: locale === 'tr' ? 'Ana Sayfa' : 'Home' },
    { href: '/blog', label: locale === 'tr' ? 'Blog' : 'Blog' },
    { href: '/guides', label: locale === 'tr' ? 'Rehberler' : 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: locale === 'tr' ? 'Hakkımızda' : 'About' },
    { href: '/contact', label: locale === 'tr' ? 'İletişim' : 'Contact' },
  ];

  const legalLinks = [
    { href: '/privacy', label: locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy' },
    { href: '/terms', label: locale === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service' },
    { href: '/cookies', label: locale === 'tr' ? 'Çerez Politikası' : 'Cookie Policy' },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Info Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}
            </h2>
            <p className={styles.description}>
              {locale === 'tr'
                ? 'Gıda güvenliği konusunda güvenilir bilgi ve kaynak platformunuz.'
                : 'Your trusted platform for food safety information and resources.'}
            </p>
            {/* Social Media Links */}
            <nav className={styles.socialLinks} aria-label="Social Media">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" />
                </svg>
              </a>
            </nav>
          </div>

          {/* Quick Links Section */}
          <nav className={styles.section} aria-label="Quick Links">
            <h3 className={styles.sectionTitle}>
              {locale === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}
            </h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Information Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {locale === 'tr' ? 'İletişim' : 'Contact'}
            </h3>
            <address className={styles.address}>
              <ul className={styles.contactList}>
                <li>
                  <strong>{locale === 'tr' ? 'E-posta:' : 'Email:'}</strong>
                  <a href="mailto:info@foodsafety.com" className={styles.contactLink}>
                    info@foodsafety.com
                  </a>
                </li>
                <li>
                  <strong>{locale === 'tr' ? 'Telefon:' : 'Phone:'}</strong>
                  <a href="tel:+905551234567" className={styles.contactLink}>
                    +90 555 123 45 67
                  </a>
                </li>
                <li>
                  <strong>{locale === 'tr' ? 'Adres:' : 'Address:'}</strong>
                  <span>İstanbul, Türkiye</span>
                </li>
              </ul>
            </address>
          </div>

          {/* Legal Links Section */}
          <nav className={styles.section} aria-label="Legal Links">
            <h3 className={styles.sectionTitle}>
              {locale === 'tr' ? 'Yasal' : 'Legal'}
            </h3>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear}{' '}
            {locale === 'tr' ? 'Gıda Güvenliği. Tüm hakları saklıdır.' : 'Food Safety. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
