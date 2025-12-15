'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import { BlogPostFrontmatter, GuideFrontmatter } from '@/types/content';
import { BlogCard } from '@/components/content/BlogCard';
import { GuideCard } from '@/components/content/GuideCard';
import styles from '@/app/page.module.scss';

interface HomeContentProps {
    latestPostsEn: Array<{ slug: string; data: BlogPostFrontmatter; readTime: number }>;
    latestPostsTr: Array<{ slug: string; data: BlogPostFrontmatter; readTime: number }>;
    featuredGuidesEn: Array<{ slug: string; data: GuideFrontmatter }>;
    featuredGuidesTr: Array<{ slug: string; data: GuideFrontmatter }>;
}

export default function HomeContent({ latestPostsEn, latestPostsTr, featuredGuidesEn, featuredGuidesTr }: HomeContentProps) {
    const { locale } = useLocale();
    const t = translations[locale].home;

    React.useEffect(() => {
        document.title = locale === 'tr'
            ? 'Gıda Güvenliği ve Kalite Yönetimi | Gıda Güvenliği'
            : 'Food Safety and Quality Management | Food Safety';
    }, [locale]);

    const latestPosts = locale === 'tr' ? latestPostsTr : latestPostsEn;
    const featuredGuides = locale === 'tr' ? featuredGuidesTr : featuredGuidesEn;

    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <h1 className={styles.heroTitle}>
                                {t.hero.title}
                            </h1>
                            <p className={styles.heroDescription}>
                                {t.hero.description}
                            </p>
                            <div className={styles.heroStats}>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>500+</div>
                                    <div className={styles.statLabel}>{t.hero.stats.content}</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>50+</div>
                                    <div className={styles.statLabel}>{t.hero.stats.guides}</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>10K+</div>
                                    <div className={styles.statLabel}>{t.hero.stats.professionals}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.heroImage}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                                    alt="Food Safety Professional"
                                    width={800}
                                    height={600}
                                    className={styles.image}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Guides Section */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{t.sections.featuredGuides}</h2>
                        <Link href="/guides" className={styles.sectionLink}>
                            {t.sections.viewAll}
                        </Link>
                    </div>
                    <div className={styles.grid}>
                        {featuredGuides.map((guide) => (
                            <GuideCard
                                key={guide.slug}
                                title={guide.data.title}
                                description={guide.data.description}
                                difficulty={guide.data.difficulty}
                                topics={guide.data.topics}
                                relatedStandards={guide.data.relatedStandards || []}
                                slug={guide.slug}
                            />
                        ))}
                    </div>
                </section>

                {/* Latest Blog Posts Section */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{t.sections.latestPosts}</h2>
                        <Link href="/blog" className={styles.sectionLink}>
                            {t.sections.viewAll}
                        </Link>
                    </div>
                    <div className={styles.grid}>
                        {latestPosts.map((post) => (
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
                </section>

                {/* Standards Section */}
                <section className={styles.standardsSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{t.sections.standards}</h2>
                        <p className={styles.sectionSubtitle}>
                            {t.sections.standardsSubtitle}
                        </p>
                    </div>
                    <div className={styles.standardsGrid}>
                        <div className={styles.standardCard}>
                            <div className={styles.standardIcon}>
                                <Image
                                    src="/images/standards/iso-22000.png"
                                    alt="ISO 22000"
                                    width={120}
                                    height={120}
                                    className={styles.iconImage}
                                />
                            </div>
                            <h3 className={styles.standardName}>ISO 22000</h3>
                            <p className={styles.standardDescription}>
                                {t.standards.iso22000}
                            </p>
                        </div>
                        <div className={styles.standardCard}>
                            <div className={styles.standardIcon}>
                                <Image
                                    src="/images/standards/haccp.png"
                                    alt="HACCP"
                                    width={120}
                                    height={120}
                                    className={styles.iconImage}
                                />
                            </div>
                            <h3 className={styles.standardName}>HACCP</h3>
                            <p className={styles.standardDescription}>
                                {t.standards.haccp}
                            </p>
                        </div>
                        <div className={styles.standardCard}>
                            <div className={styles.standardIcon}>
                                <Image
                                    src="/images/standards/iso-9001.png"
                                    alt="ISO 9001"
                                    width={120}
                                    height={120}
                                    className={styles.iconImage}
                                />
                            </div>
                            <h3 className={styles.standardName}>ISO 9001</h3>
                            <p className={styles.standardDescription}>
                                {t.standards.iso9001}
                            </p>
                        </div>
                        <div className={styles.standardCard}>
                            <div className={styles.standardIcon}>
                                <Image
                                    src="/images/standards/brc.png"
                                    alt="BRC Global Standards"
                                    width={120}
                                    height={120}
                                    className={styles.iconImage}
                                />
                            </div>
                            <h3 className={styles.standardName}>BRC Global Standards</h3>
                            <p className={styles.standardDescription}>
                                {t.standards.brc}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
