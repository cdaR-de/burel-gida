'use client';

import React from 'react';
import { BlogPostFrontmatter } from '@/types/content';
import { BlogCard } from '@/components/content/BlogCard';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import styles from '@/app/blog/page.module.scss';

interface BlogContentProps {
    postsEn: Array<{ slug: string; data: BlogPostFrontmatter; readTime: number }>;
    postsTr: Array<{ slug: string; data: BlogPostFrontmatter; readTime: number }>;
}

export default function BlogContent({ postsEn, postsTr }: BlogContentProps) {
    const { locale } = useLocale();
    const t = translations[locale].blog;

    React.useEffect(() => {
        document.title = `${t.title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}`;
    }, [locale, t.title]);

    const sortedPosts = locale === 'tr' ? postsTr : postsEn;

    // Get unique categories and tags for filtering based on current locale content
    const categories = Array.from(new Set(sortedPosts.map(p => p.data.category).filter(Boolean) as string[]));
    const tags = Array.from(new Set(sortedPosts.flatMap(p => p.data.tags || [])));

    return (
        <div className={styles.blogPage}>
            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <h1 className={styles.title}>{t.title}</h1>
                    <p className={styles.description}>
                        {t.description}
                    </p>
                </header>

                {/* Filter Section */}
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="category-filter" className={styles.filterLabel}>
                            {t.filterCategory}
                        </label>
                        <select id="category-filter" className={styles.filterSelect}>
                            <option value="">{t.allCategories}</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label htmlFor="tag-filter" className={styles.filterLabel}>
                            {t.filterTag}
                        </label>
                        <select id="tag-filter" className={styles.filterSelect}>
                            <option value="">{t.allTags}</option>
                            {tags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className={styles.postsGrid}>
                    {sortedPosts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            title={post.data.title}
                            excerpt={post.data.excerpt}
                            publishDate={post.data.publishDate}
                            author={post.data.author}
                            category={post.data.category}
                            slug={post.slug}
                            featuredImage={post.data.featuredImage}
                            readTime={post.readTime}
                        />
                    ))}
                </div>

                {/* Pagination Placeholder */}
                {sortedPosts.length > 9 && (
                    <div className={styles.pagination}>
                        <button className={styles.paginationButton} disabled>
                            {t.pagination.previous}
                        </button>
                        <span className={styles.pageInfo}>{t.pagination.page} 1 / 1</span>
                        <button className={styles.paginationButton} disabled>
                            {t.pagination.next}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
