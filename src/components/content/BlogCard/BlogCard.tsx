import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui';
import styles from './BlogCard.module.scss';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  publishDate: Date | string;
  author: string;
  category: string;
  slug: string;
  featuredImage?: string;
  readTime: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  publishDate,
  author,
  category,
  slug,
  featuredImage,
  readTime
}) => {
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${slug}`} className={styles.blogCard}>
      {featuredImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={featuredImage}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.meta}>
          <Badge variant="primary" size="small" className={styles.category}>
            {category}
          </Badge>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.author}>
            <span>👤</span>
            <span>{author}</span>
          </span>
          <span className={styles.readTime}>
            <span>📖</span>
            <span>{readTime} min read</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
