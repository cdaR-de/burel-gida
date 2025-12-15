import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { GuideDifficulty } from '@/types/content';
import {
  ShieldAlert,
  ShieldCheck,
  Microscope,
  Award,
  BookOpen,
  LucideIcon
} from 'lucide-react';
import styles from './GuideCard.module.scss';

export interface GuideCardProps {
  title: string;
  description: string;
  difficulty: GuideDifficulty;
  topics: string[];
  relatedStandards: string[];
  slug: string;
  icon?: string;
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

const iconMap: Record<string, LucideIcon> = {
  'shield-alert': ShieldAlert,
  'shield-check': ShieldCheck,
  'microscope': Microscope,
  'award': Award,
  'book-open': BookOpen,
};

export const GuideCard: React.FC<GuideCardProps> = ({
  title,
  description,
  difficulty,
  topics,
  relatedStandards,
  slug,
  icon = 'book-open'
}) => {
  const IconComponent = iconMap[icon];

  return (
    <Link href={`/guides/${slug}`} className={styles.guideCard}>
      <div className={styles.iconWrapper}>
        {IconComponent ? (
          <IconComponent className={styles.iconSvg} size={32} />
        ) : (
          <span className={styles.icon}>{icon}</span>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <Badge
            variant={difficultyColors[difficulty]}
            size="small"
            className={styles.difficulty}
          >
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
        <p className={styles.description}>{description}</p>

        {topics.length > 0 && (
          <div className={styles.topics}>
            {topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="secondary" size="small">
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <span className={styles.moreTopics}>+{topics.length - 3} more</span>
            )}
          </div>
        )}

        {relatedStandards.length > 0 && (
          <div className={styles.standards}>
            <span className={styles.standardsLabel}>Standards:</span>
            {relatedStandards.map((standard, index) => (
              <Badge key={index} variant="primary" size="small">
                {standard}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
