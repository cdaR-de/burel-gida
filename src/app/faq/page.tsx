'use client';

import { useState, useMemo } from 'react';
import { getAllFAQs, getFAQCategories } from '@/lib/faq';
import { FAQItem } from '@/components/content';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import styles from './page.module.scss';

export default function FAQPage() {
  const { locale } = useLocale();
  const t = translations[locale].faq;

  const allFAQs = useMemo(() => getAllFAQs(locale), [locale]);
  const categories = useMemo(() => getFAQCategories(locale), [locale]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    let faqs = allFAQs;

    // Filter by category
    if (selectedCategory !== 'all') {
      faqs = faqs.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      faqs = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return faqs;
  }, [allFAQs, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setExpandedId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setExpandedId(null);
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>
            {t.subtitle}
          </p>
        </header>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
              aria-label="Search FAQs"
            />
          </div>

          <div className={styles.categories}>
            <button
              className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''
                }`}
              onClick={() => handleCategoryChange('all')}
            >
              {t.categories.all}
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''
                  }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.faqList}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isExpanded={expandedId === faq.id}
                onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>{t.noResults}</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
