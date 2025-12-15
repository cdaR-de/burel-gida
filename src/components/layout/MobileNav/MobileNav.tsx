'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import styles from './MobileNav.module.scss';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { locale, setLocale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  const navLinks = [
    { href: '/', label: locale === 'tr' ? 'Ana Sayfa' : 'Home' },
    { href: '/blog', label: locale === 'tr' ? 'Blog' : 'Blog' },
    { href: '/guides', label: locale === 'tr' ? 'Rehberler' : 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: locale === 'tr' ? 'Hakkımızda' : 'About' },
    { href: '/contact', label: locale === 'tr' ? 'İletişim' : 'Contact' },
  ];

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'tr' ? 'en' : 'tr');
  };

  if (!mounted || !isOpen) return null;

  const drawerWidth = isMobile ? '100%' : '85%';
  const drawerMaxWidth = isMobile ? '100%' : '400px';

  const content = (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9998,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'tr' ? 'Mobil menü' : 'Mobile menu'}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: drawerWidth,
          maxWidth: drawerMaxWidth,
          backgroundColor: 'white',
          zIndex: 9999,
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {locale === 'tr' ? 'Menü' : 'Menu'}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
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

        {/* Search Bar */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={locale === 'tr' ? 'Ara...' : 'Search...'}
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav} aria-label={locale === 'tr' ? 'Ana navigasyon' : 'Main navigation'}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
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

        {/* Language Switcher */}
        <div className={styles.languageSection}>
          <button
            className={styles.langButton}
            onClick={toggleLanguage}
            aria-label="Switch language"
          >
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
    </div>
  );

  return createPortal(content, document.body);
}
