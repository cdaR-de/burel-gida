/**
 * SEO Metadata interface
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * Social Link interface
 */
export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'github' | 'website';
  url: string;
}

/**
 * Author interface
 */
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  role: string;
  socialLinks?: SocialLink[];
}

/**
 * Category interface
 */
export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

/**
 * Link interface
 */
export interface Link {
  title: string;
  url: string;
}

/**
 * Blog Post interface
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: Date | string;
  updateDate?: Date | string;
  author: string | Author;
  category: string | Category;
  tags: string[];
  featuredImage?: string;
  readTime: number;
  seo?: SEOMetadata;
}

/**
 * Blog Post Frontmatter (what's in the MDX file)
 */
export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  publishDate: string;
  updateDate?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  seo?: SEOMetadata;
}

/**
 * Guide difficulty levels
 */
export type GuideDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Guide interface
 */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
  difficulty: GuideDifficulty;
  topics: string[];
  relatedStandards: string[];
  lastUpdated: Date | string;
  icon?: string;
  readTime: number;
  seo?: SEOMetadata;
}

/**
 * Guide Frontmatter (what's in the MDX file)
 */
export interface GuideFrontmatter {
  title: string;
  description: string;
  difficulty: GuideDifficulty;
  topics: string[];
  relatedStandards: string[];
  lastUpdated: string;
  icon?: string;
  seo?: SEOMetadata;
}

/**
 * FAQ interface
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  relatedLinks?: Link[];
}

/**
 * FAQ Frontmatter (what's in the MDX file)
 */
export interface FAQFrontmatter {
  id: string;
  question: string;
  category: string;
  order: number;
  relatedLinks?: Link[];
}

/**
 * Page interface (for static pages like About, Contact, etc.)
 */
export interface Page {
  slug: string;
  title: string;
  content: string;
  lastUpdated?: Date | string;
  seo?: SEOMetadata;
}

/**
 * Page Frontmatter (what's in the MDX file)
 */
export interface PageFrontmatter {
  title: string;
  lastUpdated?: string;
  seo?: SEOMetadata;
}

/**
 * Content with metadata (generic)
 */
export interface ContentWithMetadata<T> {
  slug: string;
  data: T;
  content: string;
  readTime: number;
}

/**
 * Pagination result
 */
export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Search result
 */
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: {
    field: string;
    value: string;
    indices: [number, number][];
  }[];
}
