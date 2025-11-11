import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllContent, readContentFile } from '@/lib/content';
import { BlogPostFrontmatter } from '@/types/content';
import { Badge, ShareButtons } from '@/components/ui';
import { MDXComponents } from '@/components/mdx';
import styles from './page.module.scss';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllContent<BlogPostFrontmatter>('blog');
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = readContentFile<BlogPostFrontmatter>('blog', params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.data.seo?.title || post.data.title,
    description: post.data.seo?.description || post.data.excerpt,
    keywords: post.data.seo?.keywords || post.data.tags,
    openGraph: {
      title: post.data.seo?.title || post.data.title,
      description: post.data.seo?.description || post.data.excerpt,
      images: post.data.featuredImage ? [post.data.featuredImage] : [],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = readContentFile<BlogPostFrontmatter>('blog', params.slug);

  if (!post) {
    notFound();
  }

  const { data, content, readTime } = post;
  const formattedDate = new Date(data.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.blogPost}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link href="/">Home</Link>
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
              <span>{readTime} min read</span>
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
            <MDXRemote source={content} components={MDXComponents} />
          </div>

          {/* Share Buttons */}
          <div className={styles.shareSection}>
            <ShareButtons
              url={`/blog/${params.slug}`}
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
              ← Back to Blog
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
