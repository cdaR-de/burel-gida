'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostFrontmatter } from '@/types/content';
import { Badge, ShareButtons } from '@/components/ui';
import { useLocale } from '@/contexts/LocaleContext';
import styles from '@/app/blog/[slug]/page.module.scss';

interface BlogDetailContentProps {
    postEn: { data: BlogPostFrontmatter; readTime: number } | null;
    postTr: { data: BlogPostFrontmatter; readTime: number } | null;
    contentEnNode: React.ReactNode;
    contentTrNode: React.ReactNode;
    slug: string;
}

export default function BlogDetailContent({ postEn, postTr, contentEnNode, contentTrNode, slug }: BlogDetailContentProps) {
    const { locale } = useLocale();

    // Select post based on locale, fallback to English if Turkish is missing
    const post = locale === 'tr' && postTr ? postTr : postEn;
    const contentNode = locale === 'tr' && postTr ? contentTrNode : contentEnNode;

    React.useEffect(() => {
        if (post && post.data) {
            const title = post.data.seo?.title || post.data.title;
            document.title = `${title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety Website'}`;
        }
    }, [post, locale]);

    if (!post) {
        return (
            <div className={styles.container}>
                <h1>Post Not Found</h1>
                <Link href="/blog">Back to Blog</Link>
            </div>
        );
    }

    const { data, readTime } = post;

    const formattedDate = new Date(data.publishDate).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className={styles.blogPost}>
            {/* Breadcrumb Navigation */}
            <nav className={styles.breadcrumb}>
                <div className={styles.container}>
                    <Link href="/">{locale === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
                    <span className={styles.separator}>/</span>
                    <Link href="/blog">Blog</Link>
                    <span className={styles.separator}>/</span>
                    <span className={styles.current}>{data.title}</span>
                </div>
            </nav>

            {/* Article Header */}
            <header className={styles.header}>
                <div className={styles.container}>
                    <Badge variant="primary" size="medium" className={styles.category}>
                        {data.category}
                    </Badge>

                    <h1 className={styles.title}>{data.title}</h1>

                    <p className={styles.excerpt}>{data.excerpt}</p>

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span className={styles.icon}>👤</span>
                            <span>{data.author}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.icon}>📅</span>
                            <span>{formattedDate}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.icon}>📖</span>
                            <span>{readTime} {locale === 'tr' ? 'dk okuma' : 'min read'}</span>
                        </div>
                    </div>

                    {data.tags && data.tags.length > 0 && (
                        <div className={styles.tags}>
                            {data.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" size="small">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {data.featuredImage && (
                <div className={styles.featuredImage}>
                    <div className={styles.container}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={data.featuredImage}
                                alt={data.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.prose}>
                        {contentNode}
                    </div>

                    {/* Share Buttons */}
                    <div className={styles.shareSection}>
                        <ShareButtons
                            url={`/blog/${slug}`}
                            title={data.title}
                            description={data.excerpt}
                        />
                    </div>
                </div>
            </div>

            {/* Article Footer */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.backLink}>
                        <Link href="/blog" className={styles.backButton}>
                            ← {locale === 'tr' ? 'Bloga Dön' : 'Back to Blog'}
                        </Link>
                    </div>
                </div>
            </footer>
        </article>
    );
}
