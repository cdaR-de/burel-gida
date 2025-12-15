import Fuse from 'fuse.js';
import { getAllContent } from './content';
import { getAllFAQs } from './faq';
import { BlogPostFrontmatter, GuideFrontmatter, FAQ } from '@/types/content';

/**
 * Search result type
 */
export type SearchResultType = 'blog' | 'guide' | 'faq';

/**
 * Unified search result interface
 */
export interface UnifiedSearchResult {
  type: SearchResultType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  url: string;
}

/**
 * Search result with highlighting
 */
export interface SearchResultWithHighlight extends UnifiedSearchResult {
  score: number;
  matches: Array<{
    key: string;
    value: string;
    indices: [number, number][];
  }>;
  highlightedTitle?: string;
  highlightedExcerpt?: string;
}

/**
 * Build search index from all content
 */
export function buildSearchIndex(locale: string = 'en'): UnifiedSearchResult[] {
  const searchIndex: UnifiedSearchResult[] = [];

  // Add blog posts
  const blogPosts = getAllContent<BlogPostFrontmatter>('blog', locale);
  blogPosts.forEach((post) => {
    searchIndex.push({
      type: 'blog',
      slug: post.slug,
      title: post.data.title,
      excerpt: post.data.excerpt,
      content: post.content,
      category: post.data.category,
      tags: post.data.tags,
      url: `/blog/${post.slug}`,
    });
  });

  // Add guides
  const guides = getAllContent<GuideFrontmatter>('guides', locale);
  guides.forEach((guide) => {
    searchIndex.push({
      type: 'guide',
      slug: guide.slug,
      title: guide.data.title,
      excerpt: guide.data.description,
      content: guide.content,
      category: guide.data.difficulty,
      tags: guide.data.topics,
      url: `/guides/${guide.slug}`,
    });
  });

  // Add FAQs
  const faqs = getAllFAQs(locale);
  faqs.forEach((faq) => {
    searchIndex.push({
      type: 'faq',
      slug: faq.id,
      title: faq.question,
      excerpt: faq.answer.substring(0, 200),
      content: faq.answer,
      category: faq.category,
      url: `/faq#${faq.id}`,
    });
  });

  return searchIndex;
}

/**
 * Fuse.js configuration
 */
const fuseOptions = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'excerpt', weight: 2 },
    { name: 'content', weight: 1 },
    { name: 'tags', weight: 1.5 },
    { name: 'category', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

/**
 * Perform search using Fuse.js
 */
export function performSearch(
  query: string,
  locale: string = 'en'
): SearchResultWithHighlight[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchIndex = buildSearchIndex(locale);
  const fuse = new Fuse(searchIndex, fuseOptions);
  const results = fuse.search(query);

  return results.map((result) => ({
    ...result.item,
    score: result.score || 0,
    matches: result.matches?.map((match) => ({
      key: match.key || '',
      value: match.value || '',
      indices: (match.indices || []).map(([start, end]) => [start, end] as [number, number]),
    })) || [],
  }));
}

/**
 * Highlight matched text in a string
 */
export function highlightMatches(
  text: string,
  indices: [number, number][]
): string {
  if (!indices || indices.length === 0) {
    return text;
  }

  let result = '';
  let lastIndex = 0;

  // Sort indices by start position
  const sortedIndices = [...indices].sort((a, b) => a[0] - b[0]);

  sortedIndices.forEach(([start, end]) => {
    // Add text before match
    result += text.substring(lastIndex, start);
    // Add highlighted match
    result += `<mark>${text.substring(start, end + 1)}</mark>`;
    lastIndex = end + 1;
  });

  // Add remaining text
  result += text.substring(lastIndex);

  return result;
}

/**
 * Get context snippet around matched text
 */
export function getContextSnippet(
  text: string,
  indices: [number, number][],
  contextLength: number = 150
): string {
  if (!indices || indices.length === 0) {
    return text.substring(0, contextLength) + (text.length > contextLength ? '...' : '');
  }

  // Get the first match
  const [start] = indices[0];

  // Calculate snippet boundaries
  const snippetStart = Math.max(0, start - contextLength / 2);
  const snippetEnd = Math.min(text.length, start + contextLength / 2);

  let snippet = text.substring(snippetStart, snippetEnd);

  // Add ellipsis if needed
  if (snippetStart > 0) {
    snippet = '...' + snippet;
  }
  if (snippetEnd < text.length) {
    snippet = snippet + '...';
  }

  return snippet;
}

/**
 * Apply highlighting to search results
 */
export function applyHighlighting(
  results: SearchResultWithHighlight[]
): SearchResultWithHighlight[] {
  return results.map((result) => {
    const titleMatch = result.matches.find((m) => m.key === 'title');
    const excerptMatch = result.matches.find((m) => m.key === 'excerpt');
    const contentMatch = result.matches.find((m) => m.key === 'content');

    return {
      ...result,
      highlightedTitle: titleMatch
        ? highlightMatches(result.title, titleMatch.indices)
        : result.title,
      highlightedExcerpt: excerptMatch
        ? highlightMatches(result.excerpt, excerptMatch.indices)
        : contentMatch
          ? getContextSnippet(result.content, contentMatch.indices)
          : result.excerpt,
    };
  });
}

/**
 * Group search results by type
 */
export function groupResultsByType(
  results: SearchResultWithHighlight[]
): Record<SearchResultType, SearchResultWithHighlight[]> {
  return {
    blog: results.filter((r) => r.type === 'blog'),
    guide: results.filter((r) => r.type === 'guide'),
    faq: results.filter((r) => r.type === 'faq'),
  };
}

/**
 * Get search suggestions based on partial query
 */
export function getSearchSuggestions(
  query: string,
  locale: string = 'en',
  limit: number = 5
): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchIndex = buildSearchIndex(locale);
  const suggestions = new Set<string>();

  // Extract unique titles that match the query
  searchIndex.forEach((item) => {
    if (item.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(item.title);
    }
  });

  return Array.from(suggestions).slice(0, limit);
}

/**
 * Main search function with all features
 */
export function search(
  query: string,
  locale: string = 'en',
  options: {
    groupByType?: boolean;
    applyHighlights?: boolean;
    limit?: number;
  } = {}
): SearchResultWithHighlight[] | Record<SearchResultType, SearchResultWithHighlight[]> {
  const {
    groupByType = false,
    applyHighlights = true,
    limit,
  } = options;

  let results = performSearch(query, locale);

  if (applyHighlights) {
    results = applyHighlighting(results);
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  if (groupByType) {
    return groupResultsByType(results);
  }

  return results;
}
