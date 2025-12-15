'use client';

import React from 'react';
import { GuideCard } from '@/components/content';
import { GuideFrontmatter } from '@/types/content';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import styles from '@/app/guides/page.module.scss';

interface GuidesContentProps {
    guidesEn: Array<{ slug: string; data: GuideFrontmatter }>;
    guidesTr: Array<{ slug: string; data: GuideFrontmatter }>;
}

export default function GuidesContent({ guidesEn, guidesTr }: GuidesContentProps) {
    const { locale } = useLocale();
    const t = translations[locale].guides;

    React.useEffect(() => {
        document.title = `${t.title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}`;
    }, [locale, t.title]);

    const initialGuides = locale === 'tr' ? guidesTr : guidesEn;

    // State for filters
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedDifficulties, setSelectedDifficulties] = React.useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

    // Get unique difficulty levels and topics for filtering based on current locale content
    const difficulties = Array.from(new Set(initialGuides.map(g => g.data.difficulty)));
    const allTopics = Array.from(new Set(initialGuides.flatMap(g => g.data.topics)));

    // Handlers
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDifficultyChange = (difficulty: string) => {
        if (difficulty === 'all') {
            setSelectedDifficulties([]);
            return;
        }
        setSelectedDifficulties(prev =>
            prev.includes(difficulty)
                ? prev.filter(d => d !== difficulty)
                : [...prev, difficulty]
        );
    };

    const handleTopicChange = (topic: string) => {
        if (topic === 'all') {
            setSelectedTopics([]);
            return;
        }
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    // Filtering logic
    const filteredGuides = initialGuides.filter(guide => {
        const matchesSearch =
            guide.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.data.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty =
            selectedDifficulties.length === 0 ||
            selectedDifficulties.includes(guide.data.difficulty);

        const matchesTopic =
            selectedTopics.length === 0 ||
            guide.data.topics.some(topic => selectedTopics.includes(topic));

        return matchesSearch && matchesDifficulty && matchesTopic;
    });

    return (
        <div className={styles.guidesPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t.title}</h1>
                    <p className={styles.subtitle}>
                        {t.subtitle}
                    </p>
                </header>

                <div className={styles.content}>
                    <aside className={styles.sidebar}>
                        <div className={styles.searchSection}>
                            <h3 className={styles.filterTitle}>{t.title}</h3>
                            <input
                                type="search"
                                placeholder={t.searchPlaceholder}
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>{t.filters.difficulty}</h3>
                            <div className={styles.filterOptions}>
                                <label className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={selectedDifficulties.length === 0}
                                        onChange={() => handleDifficultyChange('all')}
                                    />
                                    <span>{t.filters.allLevels}</span>
                                </label>
                                {difficulties.map(difficulty => (
                                    <label key={difficulty} className={styles.filterOption}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDifficulties.includes(difficulty)}
                                            onChange={() => handleDifficultyChange(difficulty)}
                                        />
                                        <span className={styles.capitalize}>{difficulty}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h3 className={styles.filterTitle}>{t.filters.topics}</h3>
                            <div className={styles.filterOptions}>
                                <label className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTopics.length === 0}
                                        onChange={() => handleTopicChange('all')}
                                    />
                                    <span>{t.filters.allTopics}</span>
                                </label>
                                {allTopics.slice(0, 8).map(topic => (
                                    <label key={topic} className={styles.filterOption}>
                                        <input
                                            type="checkbox"
                                            checked={selectedTopics.includes(topic)}
                                            onChange={() => handleTopicChange(topic)}
                                        />
                                        <span>{topic}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className={styles.main}>
                        <div className={styles.results}>
                            <p className={styles.resultCount}>
                                {t.results.showing} {filteredGuides.length} {filteredGuides.length === 1 ? t.results.guide : t.results.guides}
                            </p>
                        </div>

                        <div className={styles.guidesList}>
                            {filteredGuides.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>{t.results.empty}</p>
                                </div>
                            ) : (
                                filteredGuides.map((guide) => (
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
