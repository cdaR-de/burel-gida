import React from 'react';
import { getAllContent, sortByDate, getUniqueCategories, getUniqueTags } from '@/lib/content';
import { BlogPostFrontmatter } from '@/types/content';
import { BlogCard } from '@/components/content/BlogCard';
import styles from './page.module.scss';

export const metadata = {
  title: 'Blog - Food Safety Insights',
  description: 'Latest articles, tips, and insights about food safety, HACCP, and industry best practices.',
};

export default function BlogPage() {
  // Get all blog posts
  const allPosts = getAllContent<BlogPostFrontmatter>('blog');
  const sortedPosts = sortByDate(allPosts);
  
  // Get unique categories and tags for filtering
  const categories = getUniqueCategories(allPosts);
  const tags = getUniqueTags(allPosts);

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.title}>Food Safety Blog</h1>
          <p className={styles.description}>
            Stay informed with the latest insights, tips, and best practices in food safety management.
          </p>
        </header>

        {/* Filter Section */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="category-filter" className={styles.filterLabel}>
              Filter by Category:
            </label>
            <select id="category-filter" className={styles.filterSelect}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="tag-filter" className={styles.filterLabel}>
              Filter by Tag:
            </label>
            <select id="tag-filter" className={styles.filterSelect}>
              <option value="">All Tags</option>
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
              Previous
            </button>
            <span className={styles.pageInfo}>Page 1 of 1</span>
            <button className={styles.paginationButton} disabled>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
