'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileNav from '../MobileNav';
import SearchBar from '@/components/ui/SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  locale?: string;
}

export default function Header({ locale = 'tr' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: '/', label: locale === 'tr' ? 'Ana Sayfa' : 'Home' },
    { href: '/blog', label: locale === 'tr' ? 'Blog' : 'Blog' },
    { href: '/guides', label: locale === 'tr' ? 'Rehberler' : 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: locale === 'tr' ? 'Hakkımızda' : 'About' },
    { href: '/contact', label: locale === 'tr' ? 'İletişim' : 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo and Branding */}
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>
              {locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Search Bar */}
        <div className={styles.searchBar}>
          <SearchBar
            placeholder={locale === 'tr' ? 'Ara...' : 'Search...'}
            showSuggestions={true}
          />
        </div>

        {/* Language Switcher Placeholder */}
        <div className={styles.languageSwitcher}>
          <button className={styles.langButton} aria-label="Switch language">
            {locale === 'tr' ? 'TR' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
      />
    </header>
  );
}
