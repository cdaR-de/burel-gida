import React from 'react';
import { Metadata } from 'next';
import { GuideCard } from '@/components/content';
import { getAllContent } from '@/lib/content';
import { GuideFrontmatter, ContentWithMetadata } from '@/types/content';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Food Safety Guides | Educational Resources',
  description: 'Comprehensive guides on food safety, HACCP, ISO 22000, and industry best practices.',
  keywords: ['food safety guides', 'HACCP', 'ISO 22000', 'food safety training']
};

type GuideWithMetadata = ContentWithMetadata<GuideFrontmatter>;

export default function GuidesPage() {
  const guides = getAllContent<GuideFrontmatter>('guides');
  
  // Get unique difficulty levels and topics for filtering
  const difficulties = Array.from(new Set(guides.map(g => g.data.difficulty)));
  const allTopics = Array.from(new Set(guides.flatMap(g => g.data.topics)));

  return (
    <div className={styles.guidesPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Food Safety Guides</h1>
          <p className={styles.subtitle}>
            Comprehensive educational resources to help you understand and implement food safety best practices.
          </p>
        </header>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Difficulty Level</h3>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input type="checkbox" value="all" defaultChecked />
                  <span>All Levels</span>
                </label>
                {difficulties.map(difficulty => (
                  <label key={difficulty} className={styles.filterOption}>
                    <input type="checkbox" value={difficulty} />
                    <span className={styles.capitalize}>{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Topics</h3>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input type="checkbox" value="all" defaultChecked />
                  <span>All Topics</span>
                </label>
                {allTopics.slice(0, 8).map(topic => (
                  <label key={topic} className={styles.filterOption}>
                    <input type="checkbox" value={topic} />
                    <span>{topic}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.searchSection}>
              <h3 className={styles.filterTitle}>Search Guides</h3>
              <input 
                type="search" 
                placeholder="Search by keyword..."
                className={styles.searchInput}
              />
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.results}>
              <p className={styles.resultCount}>
                Showing {guides.length} {guides.length === 1 ? 'guide' : 'guides'}
              </p>
            </div>

            <div className={styles.guidesList}>
              {guides.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No guides found. Check back soon for new content!</p>
                </div>
              ) : (
                guides.map((guide) => (
                  <GuideCard
                    key={guide.slug}
                    title={guide.data.title}
                    description={guide.data.description}
                    difficulty={guide.data.difficulty}
                    topics={guide.data.topics}
                    relatedStandards={guide.data.relatedStandards}
                    slug={guide.slug}
                    icon={guide.data.icon}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
