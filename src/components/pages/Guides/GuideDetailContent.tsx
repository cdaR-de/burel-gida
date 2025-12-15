
'use client';

import React from 'react';
import Link from 'next/link';
import { GuideFrontmatter, GuideDifficulty } from '@/types/content';
import { Badge } from '@/components/ui';
import { TableOfContents } from '@/components/content';
import { useLocale } from '@/contexts/LocaleContext';
import {
    ShieldAlert,
    ShieldCheck,
    Microscope,
    Award,
    BookOpen,
    LucideIcon
} from 'lucide-react';
import styles from '@/app/guides/[slug]/page.module.scss';

interface GuideDetailContentProps {
    guideEn: { data: GuideFrontmatter; readTime: number } | null;
    guideTr: { data: GuideFrontmatter; readTime: number } | null;
    contentEnNode: React.ReactNode;
    contentTrNode: React.ReactNode;
    headingsEn: string[];
    headingsTr: string[];
    slug: string;
}

const difficultyColors: Record<GuideDifficulty, 'success' | 'warning' | 'error'> = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
};

const difficultyLabels: Record<string, Record<GuideDifficulty, string>> = {
    en: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
    },
    tr: {
        beginner: 'Başlangıç',
        intermediate: 'Orta',
        advanced: 'İleri'
    }
};

const iconMap: Record<string, LucideIcon> = {
    'shield-alert': ShieldAlert,
    'shield-check': ShieldCheck,
    'microscope': Microscope,
    'award': Award,
    'book-open': BookOpen,
};

export default function GuideDetailContent({ guideEn, guideTr, contentEnNode, contentTrNode, headingsEn, headingsTr, slug }: GuideDetailContentProps) {
    const { locale } = useLocale();

    // Select guide based on locale, fallback to English if Turkish is missing
    const guide = locale === 'tr' && guideTr ? guideTr : guideEn;
    const headings = locale === 'tr' && guideTr ? headingsTr : headingsEn;
    const contentNode = locale === 'tr' && guideTr ? contentTrNode : contentEnNode;

    React.useEffect(() => {
        if (guide && guide.data) {
            const title = guide.data.seo?.title || guide.data.title;
            document.title = `${title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety Guide'}`;
        }
    }, [guide, locale]);

    if (!guide) {
        return (
            <div className={styles.container}>
                <h1>Guide Not Found</h1>
                <Link href="/guides">Back to Guides</Link>
            </div>
        );
    }

    const { data, readTime } = guide;

    const formattedDate = new Date(data.lastUpdated || new Date()).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const IconComponent = data.icon ? iconMap[data.icon] : null;

    return (
        <article className={styles.guidePage}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContainer}>
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb}>
                        <Link href="/">{locale === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
                        <span>/</span>
                        <Link href="/guides">{locale === 'tr' ? 'Rehberler' : 'Guides'}</Link>
                        <span>/</span>
                        <span className={styles.current}>{data.title}</span>
                    </nav>

                    <div className={styles.heroContent}>
                        <div className={styles.iconWrapper}>
                            {IconComponent ? (
                                <IconComponent className={styles.iconSvg} size={64} />
                            ) : (
                                <span className={styles.icon}>{data.icon}</span>
                            )}
                        </div>

                        <div className={styles.heroText}>
                            <div className={styles.badges}>
                                <Badge variant="secondary" size="medium" className={styles.difficulty}>
                                    {data.difficulty}
                                </Badge>
                            </div>

                            <h1 className={styles.title}>{data.title}</h1>
                            <p className={styles.description}>{data.description}</p>

                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Badge variant={difficultyColors[data.difficulty]} size="medium">
                                        {difficultyLabels[locale][data.difficulty]}
                                    </Badge>
                                </div>
                                <div className={styles.metaItem}>
                                    <span>⏱️</span>
                                    <span>{readTime} {locale === 'tr' ? 'dk okuma' : 'min read'}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span>📚</span>
                                    <span>{data.topics.length} {locale === 'tr' ? 'konu' : 'topics'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.contentWrapper}>
                <aside className={styles.sidebar}>
                    <TableOfContents headings={headings} />
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.article}>
                        <div className={styles.lastUpdated}>
                            <span>{locale === 'tr' ? 'Son Güncelleme:' : 'Last Updated:'}</span>
                            <span>{formattedDate}</span>
                        </div>

                        <div className={styles.badges}>
                            {data.topics.map((topic, index) => (
                                <Badge key={index} variant="secondary" size="medium">
                                    {topic}
                                </Badge>
                            ))}
                        </div>

                        <div className={styles.prose}>
                            {contentNode}
                        </div>

                        {data.relatedStandards.length > 0 && (
                            <div className={styles.standards}>
                                <h3 className={styles.standardsTitle}>{locale === 'tr' ? 'İlgili Standartlar' : 'Related Standards'}</h3>
                                <div className={styles.standardsList}>
                                    {data.relatedStandards.map((standard, index) => (
                                        <Badge key={index} variant="primary" size="large">
                                            {standard}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </article>
    );
}
