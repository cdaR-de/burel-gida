import React from 'react';
import { getAllContent, sortByDate, getUniqueCategories, getUniqueTags } from '@/lib/content';
import { BlogPostFrontmatter } from '@/types/content';
import BlogContent from '@/components/pages/Blog/BlogContent';

export const metadata = {
  title: 'Blog - Food Safety Insights',
  description: 'Latest articles, tips, and insights about food safety, HACCP, and industry best practices.',
};

export default function BlogPage() {
  // Get all blog posts for both locales
  const postsEn = sortByDate(getAllContent<BlogPostFrontmatter>('blog', 'en'));
  const postsTr = sortByDate(getAllContent<BlogPostFrontmatter>('blog', 'tr'));

  return (
    <BlogContent
      postsEn={postsEn}
      postsTr={postsTr}
    />
  );
}
