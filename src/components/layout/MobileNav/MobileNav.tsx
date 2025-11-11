'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './MobileNav.module.scss';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

export default function MobileNav({ isOpen, onClose, locale = 'tr' }: MobileNavProps) {
  const navigationLinks = [
    { href: '/', label: locale === 'tr' ? 'Ana Sayfa' : 'Home' },
    { href: '/blog', label: locale === 'tr' ? 'Blog' : 'Blog' },
    { href: '/guides', label: locale === 'tr' ? 'Rehberler' : 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: locale === 'tr' ? 'Hakkımızda' : 'About' },
    { href: '/contact', label: locale === 'tr' ? 'İletişim' : 'Contact' },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'tr' ? 'Mobil menü' : 'Mobile menu'}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {locale === 'tr' ? 'Menü' : 'Menu'}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label={locale === 'tr' ? 'Menüyü kapat' : 'Close menu'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav} aria-label="Mobile navigation">
          <ul className={styles.navList}>
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <input
            type="search"
            placeholder={locale === 'tr' ? 'Ara...' : 'Search...'}
            className={styles.searchInput}
            aria-label={locale === 'tr' ? 'Arama' : 'Search'}
          />
        </div>

        {/* Language Switcher */}
        <div className={styles.languageSection}>
          <button className={styles.langButton} aria-label="Switch language">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{locale === 'tr' ? 'Türkçe' : 'English'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
