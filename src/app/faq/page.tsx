'use client';

import { useState, useMemo } from 'react';
import { getAllFAQs, getFAQCategories } from '@/lib/faq';
import { FAQItem } from '@/components/content';
import styles from './page.module.scss';

export default function FAQPage() {
  // For now, we'll use 'en' as default. This will be replaced with proper i18n later
  const locale = 'en';
  
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
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Find answers to common questions about food safety, regulations, and certifications
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
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
              aria-label="Search FAQs"
            />
          </div>

          <div className={styles.categories}>
            <button
              className={`${styles.categoryButton} ${
                selectedCategory === 'all' ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ''
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
              <p>No FAQs found matching your search.</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
