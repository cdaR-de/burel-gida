import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui';
import { MDXComponents } from '@/components/mdx';
import { getAllContent, readContentFile } from '@/lib/content';
import { GuideFrontmatter, GuideDifficulty } from '@/types/content';
import styles from './page.module.scss';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

const difficultyColors: Record<GuideDifficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error'
};

const difficultyLabels: Record<GuideDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export async function generateStaticParams() {
  const guides = getAllContent<GuideFrontmatter>('guides');
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = readContentFile<GuideFrontmatter>('guides', params.slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  const { data } = guide;
  
  return {
    title: data.seo?.title || `${data.title} | Food Safety Guide`,
    description: data.seo?.description || data.description,
    keywords: data.seo?.keywords || [...data.topics, ...data.relatedStandards],
    openGraph: {
      title: data.seo?.title || data.title,
      description: data.seo?.description || data.description,
      type: 'article',
    },
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = readContentFile<GuideFrontmatter>('guides', params.slug);

  if (!guide) {
    notFound();
  }

  const { data, content, readTime } = guide;
  const formattedDate = new Date(data.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Extract headings for table of contents (simplified version)
  const headings = content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || [];

  return (
    <div className={styles.guidePage}>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span>{data.title}</span>
          </nav>

          <div className={styles.heroContent}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{data.icon || '📚'}</span>
            </div>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.description}>{data.description}</p>
              
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span>📊</span>
                  <Badge variant={difficultyColors[data.difficulty]} size="medium">
                    {difficultyLabels[data.difficulty]}
                  </Badge>
                </div>
                <div className={styles.metaItem}>
                  <span>📖</span>
                  <span>{readTime} min read</span>
                </div>
                <div className={styles.metaItem}>
                  <span>🏷️</span>
                  <span>{data.topics.length} topics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.tocCard}>
            <h3 className={styles.tocTitle}>Table of Contents</h3>
            <ul className={styles.tocList}>
              {headings.map((heading, index) => {
                const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <li key={index} className={styles.tocItem}>
                    <a href={`#${id}`}>{heading}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <article className={styles.article}>
            <div className={styles.lastUpdated}>
              <span>Last Updated:</span>
              <span>{formattedDate}</span>
            </div>

            <div className={styles.badges}>
              {data.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" size="medium">
                  {topic}
                </Badge>
              ))}
            </div>

            <MDXRemote source={content} components={MDXComponents} />

            {data.relatedStandards.length > 0 && (
              <div className={styles.standards}>
                <h3 className={styles.standardsTitle}>Related Standards</h3>
                <div className={styles.standardsList}>
                  {data.relatedStandards.map((standard, index) => (
                    <Badge key={index} variant="primary" size="large">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
