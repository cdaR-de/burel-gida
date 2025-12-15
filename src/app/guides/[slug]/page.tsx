import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui';
import { MDXComponents } from '@/components/mdx';
import { getAllContent, readContentFile } from '@/lib/content';
import { GuideFrontmatter, GuideDifficulty } from '@/types/content';
import { TableOfContents } from '@/components/content';
import styles from './page.module.scss';

interface GuidePageProps {
  params: {
    slug: string;
  };
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

export async function generateStaticParams() {
  const guides = getAllContent<GuideFrontmatter>('guides');
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = readContentFile<GuideFrontmatter>('guides', params.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  const { data } = guide;

  return {
    title: data.seo?.title || `${data.title} | Food Safety Guide`,
    description: data.seo?.description || data.description,
    keywords: data.seo?.keywords || [...data.topics, ...data.relatedStandards],
    openGraph: {
      title: data.seo?.title || data.title,
      description: data.seo?.description || data.description,
      type: 'article',
    },
  };
}

import GuideDetailContent from '@/components/pages/Guides/GuideDetailContent';

export default async function GuidePage({ params }: GuidePageProps) {
  const guideEn = readContentFile<GuideFrontmatter>('guides', params.slug, 'en');
  const guideTr = readContentFile<GuideFrontmatter>('guides', params.slug, 'tr');

  if (!guideEn && !guideTr) {
    notFound();
  }

  // Render MDX content on server
  const contentEnNode = guideEn ? (
    <MDXRemote source={guideEn.content} components={MDXComponents} />
  ) : null;

  const contentTrNode = guideTr ? (
    <MDXRemote source={guideTr.content} components={MDXComponents} />
  ) : null;

  // Extract headings
  const headingsEn = guideEn ? guideEn.content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || [] : [];
  const headingsTr = guideTr ? guideTr.content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || [] : [];

  return (
    <GuideDetailContent
      guideEn={guideEn ? { ...guideEn } : null}
      guideTr={guideTr ? { ...guideTr } : null}
      contentEnNode={contentEnNode}
      contentTrNode={contentTrNode}
      headingsEn={headingsEn}
      headingsTr={headingsTr}
      slug={params.slug}
    />
  );
}
