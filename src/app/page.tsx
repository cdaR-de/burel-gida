import Link from 'next/link';
import { getAllContent, sortByDate } from '@/lib/content';
import { BlogPostFrontmatter, GuideFrontmatter } from '@/types/content';
import { BlogCard } from '@/components/content/BlogCard';
import { GuideCard } from '@/components/content/GuideCard';
import { CertificationDisplay } from '@/components/content/CertificationDisplay';
import styles from './page.module.scss';

export const metadata = {
  title: 'Gıda Güvenliği - Food Safety',
  description: 'HACCP, ISO 22000 ve gıda güvenliği standartları hakkında kapsamlı bilgi, eğitim kaynakları ve uzman rehberliği.',
};

export default function Home() {
  // Get latest blog posts
  const blogPosts = getAllContent<BlogPostFrontmatter>('blog');
  const latestPosts = sortByDate(blogPosts).slice(0, 3);

  // Get featured guides
  const guides = getAllContent<GuideFrontmatter>('guides');
  const featuredGuides = guides.slice(0, 3);

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Gıda Güvenliği ve Kalite Yönetimi
              </h1>
              <p className={styles.heroDescription}>
                HACCP, ISO 22000 ve gıda güvenliği standartları konusunda profesyonel eğitim, 
                danışmanlık ve güncel bilgi kaynağınız. Gıda sektöründe güvenlik ve kalite 
                standartlarını en üst seviyede tutmanız için kapsamlı rehberlik sunuyoruz.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>500+</div>
                  <div className={styles.statLabel}>Eğitim İçeriği</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Uzman Rehber</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10K+</div>
                  <div className={styles.statLabel}>Profesyonel</div>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" 
                  alt="Food Safety Professional"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Öne Çıkan Rehberler</h2>
            <Link href="/guides" className={styles.sectionLink}>
              Tümünü Gör →
            </Link>
          </div>
          <div className={styles.grid}>
            {featuredGuides.map((guide) => (
              <GuideCard
                key={guide.slug}
                title={guide.data.title}
                description={guide.data.description}
                difficulty={guide.data.difficulty}
                topics={guide.data.topics}
                relatedStandards={guide.data.relatedStandards || []}
                slug={guide.slug}
              />
            ))}
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Son Blog Yazıları</h2>
            <Link href="/blog" className={styles.sectionLink}>
              Tümünü Gör →
            </Link>
          </div>
          <div className={styles.grid}>
            {latestPosts.map((post) => (
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
        </section>

        {/* Standards Section */}
        <section className={styles.standardsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Uluslararası Standartlar</h2>
            <p className={styles.sectionSubtitle}>
              Gıda güvenliği ve kalite yönetimi alanında rehberlik ettiğimiz temel standartlar
            </p>
          </div>
          <div className={styles.standardsGrid}>
            <div className={styles.standardCard}>
              <div className={styles.standardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
              </div>
              <h3 className={styles.standardName}>ISO 22000</h3>
              <p className={styles.standardDescription}>
                Gıda güvenliği yönetim sistemi standardı
              </p>
            </div>
            <div className={styles.standardCard}>
              <div className={styles.standardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className={styles.standardName}>HACCP</h3>
              <p className={styles.standardDescription}>
                Tehlike analizi ve kritik kontrol noktaları sistemi
              </p>
            </div>
            <div className={styles.standardCard}>
              <div className={styles.standardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className={styles.standardName}>ISO 9001</h3>
              <p className={styles.standardDescription}>
                Kalite yönetim sistemi standardı
              </p>
            </div>
            <div className={styles.standardCard}>
              <div className={styles.standardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className={styles.standardName}>BRC Global Standards</h3>
              <p className={styles.standardDescription}>
                Küresel gıda güvenliği ve kalite standardı
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
