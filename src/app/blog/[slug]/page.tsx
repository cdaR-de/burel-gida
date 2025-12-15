import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllContent, readContentFile } from '@/lib/content';
import { BlogPostFrontmatter } from '@/types/content';
import BlogDetailContent from '@/components/pages/Blog/BlogDetailContent';
import MDXComponents from '@/components/mdx/MDXComponents';

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postEn = readContentFile<BlogPostFrontmatter>('blog', params.slug, 'en');
  const postTr = readContentFile<BlogPostFrontmatter>('blog', params.slug, 'tr');

  if (!postEn && !postTr) {
    notFound();
  }

  // Render MDX content on server
  const contentEnNode = postEn ? (
    <MDXRemote source={postEn.content} components={MDXComponents} />
  ) : null;

  const contentTrNode = postTr ? (
    <MDXRemote source={postTr.content} components={MDXComponents} />
  ) : null;

  return (
    <BlogDetailContent
      postEn={postEn ? { ...postEn } : null}
      postTr={postTr ? { ...postTr } : null}
      contentEnNode={contentEnNode}
      contentTrNode={contentTrNode}
      slug={params.slug}
    />
  );
}


