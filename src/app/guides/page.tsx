import React from 'react';
import { Metadata } from 'next';
import { getAllContent } from '@/lib/content';
import { GuideFrontmatter } from '@/types/content';
import GuidesContent from '@/components/pages/Guides/GuidesContent';

export const metadata: Metadata = {
  title: 'Food Safety Guides | Educational Resources',
  description: 'Comprehensive guides on food safety, HACCP, ISO 22000, and industry best practices.',
  keywords: ['food safety guides', 'HACCP', 'ISO 22000', 'food safety training']
};

export default function GuidesPage() {
  const guidesEn = getAllContent<GuideFrontmatter>('guides', 'en');
  const guidesTr = getAllContent<GuideFrontmatter>('guides', 'tr');

  return (
    <GuidesContent
      guidesEn={guidesEn}
      guidesTr={guidesTr}
    />
  );
}
