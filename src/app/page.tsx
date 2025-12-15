import { getAllContent, sortByDate } from '@/lib/content';
import { BlogPostFrontmatter, GuideFrontmatter } from '@/types/content';
import HomeContent from '@/components/pages/Home/HomeContent';

export const metadata = {
  title: 'Gıda Güvenliği - Food Safety',
  description: 'HACCP, ISO 22000 ve gıda güvenliği standartları hakkında kapsamlı bilgi, eğitim kaynakları ve uzman rehberliği.',
};

export default function Home() {
  // Get latest blog posts for both locales
  const latestPostsEn = sortByDate(getAllContent<BlogPostFrontmatter>('blog', 'en')).slice(0, 3);
  const latestPostsTr = sortByDate(getAllContent<BlogPostFrontmatter>('blog', 'tr')).slice(0, 3);

  // Get featured guides for both locales
  const featuredGuidesEn = getAllContent<GuideFrontmatter>('guides', 'en').slice(0, 3);
  const featuredGuidesTr = getAllContent<GuideFrontmatter>('guides', 'tr').slice(0, 3);

  return (
    <HomeContent
      latestPostsEn={latestPostsEn}
      latestPostsTr={latestPostsTr}
      featuredGuidesEn={featuredGuidesEn}
      featuredGuidesTr={featuredGuidesTr}
    />
  );
}
