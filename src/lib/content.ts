import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get the directory path for a specific content type
 */
export function getContentDirectory(type: 'blog' | 'guides' | 'pages'): string {
  return path.join(contentDirectory, type);
}

/**
 * Generate a slug from a filename
 */
export function generateSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, '');
}

/**
 * Validate a slug format
 */
export function validateSlug(slug: string): boolean {
  // Slug should only contain lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Get all MDX files from a directory
 */
export function getContentFiles(type: 'blog' | 'guides' | 'pages'): string[] {
  const dir = getContentDirectory(type);
  
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  return files.filter((file) => /\.mdx?$/.test(file));
}

/**
 * Read and parse an MDX file with frontmatter
 */
export function readContentFile<T = Record<string, any>>(
  type: 'blog' | 'guides' | 'pages',
  slug: string
): { data: T; content: string; readTime: number } | null {
  try {
    const dir = getContentDirectory(type);
    const fullPath = path.join(dir, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate reading time
    const stats = readingTime(content);
    const readTime = Math.ceil(stats.minutes);

    return {
      data: data as T,
      content,
      readTime,
    };
  } catch (error) {
    console.error(`Error reading content file: ${type}/${slug}`, error);
    return null;
  }
}

/**
 * Get all content items of a specific type
 */
export function getAllContent<T = Record<string, any>>(
  type: 'blog' | 'guides' | 'pages'
): Array<{ slug: string; data: T; content: string; readTime: number }> {
  const files = getContentFiles(type);
  
  const content = files
    .map((filename) => {
      const slug = generateSlug(filename);
      const fileData = readContentFile<T>(type, slug);
      
      if (!fileData) {
        return null;
      }

      return {
        slug,
        ...fileData,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return content;
}

/**
 * Sort content by date (newest first)
 */
export function sortByDate<T extends { data: { publishDate?: string | Date } }>(
  content: T[]
): T[] {
  return content.sort((a, b) => {
    const dateA = new Date(a.data.publishDate || 0);
    const dateB = new Date(b.data.publishDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Filter content by category
 */
export function filterByCategory<T extends { data: { category?: string } }>(
  content: T[],
  category: string
): T[] {
  return content.filter((item) => item.data.category === category);
}

/**
 * Filter content by tag
 */
export function filterByTag<T extends { data: { tags?: string[] } }>(
  content: T[],
  tag: string
): T[] {
  return content.filter((item) => item.data.tags?.includes(tag));
}

/**
 * Filter content by multiple tags (OR logic)
 */
export function filterByTags<T extends { data: { tags?: string[] } }>(
  content: T[],
  tags: string[]
): T[] {
  return content.filter((item) =>
    tags.some((tag) => item.data.tags?.includes(tag))
  );
}

/**
 * Get unique categories from content
 */
export function getUniqueCategories<T extends { data: { category?: string } }>(
  content: T[]
): string[] {
  const categories = content
    .map((item) => item.data.category)
    .filter((category): category is string => !!category);
  
  return Array.from(new Set(categories));
}

/**
 * Get unique tags from content
 */
export function getUniqueTags<T extends { data: { tags?: string[] } }>(
  content: T[]
): string[] {
  const allTags = content.flatMap((item) => item.data.tags || []);
  return Array.from(new Set(allTags));
}

/**
 * Paginate content
 */
export function paginateContent<T>(
  content: T[],
  page: number = 1,
  perPage: number = 10
): {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalItems = content.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const items = content.slice(startIndex, endIndex);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Search content by query string
 */
export function searchContent<T extends { data: { title?: string }; content: string }>(
  content: T[],
  query: string
): T[] {
  const lowerQuery = query.toLowerCase();
  
  return content.filter((item) => {
    const titleMatch = item.data.title?.toLowerCase().includes(lowerQuery);
    const contentMatch = item.content.toLowerCase().includes(lowerQuery);
    return titleMatch || contentMatch;
  });
}

/**
 * Get related content based on tags
 */
export function getRelatedContent<T extends { slug: string; data: { tags?: string[] } }>(
  content: T[],
  currentSlug: string,
  currentTags: string[] = [],
  limit: number = 3
): T[] {
  if (currentTags.length === 0) {
    return [];
  }

  // Filter out current item and find items with matching tags
  const related = content
    .filter((item) => item.slug !== currentSlug)
    .map((item) => {
      const matchingTags = item.data.tags?.filter((tag) =>
        currentTags.includes(tag)
      ) || [];
      
      return {
        item,
        score: matchingTags.length,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);

  return related;
}
