
import Fuse from 'fuse.js';

export type SearchResultType = 'blog' | 'guide' | 'faq';

export interface UnifiedSearchResult {
    type: SearchResultType;
    slug: string;
    locale: string;
    title: string;
    excerpt: string;
    content: string;
    category?: string;
    tags?: string[];
    url: string;
}

// Fuse.js options
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
    ignoreLocation: true,
    minMatchCharLength: 2,
};

let searchIndexCache: UnifiedSearchResult[] | null = null;
let fuseInstance: Fuse<UnifiedSearchResult> | null = null;

/**
 * Load the search index from the static JSON file
 */
export async function loadSearchIndex(): Promise<UnifiedSearchResult[]> {
    if (searchIndexCache) {
        return searchIndexCache;
    }

    try {
        const response = await fetch('/search-index.json');
        if (!response.ok) {
            throw new Error('Failed to load search index');
        }
        const data = await response.json();
        searchIndexCache = data;
        return data;
    } catch (error) {
        console.error('Error loading search index:', error);
        return [];
    }
}

/**
 * Initialize Fuse instance
 */
async function getFuseInstance(locale: string = 'en'): Promise<Fuse<UnifiedSearchResult>> {
    const index = await loadSearchIndex();

    // Filter index by locale
    const localeIndex = index.filter(item => item.locale === locale || !item.locale); // !item.locale just in case

    // Always create new fuse instance if locale changes or first time, 
    // but for simplicity we can just create it every time or memoize by locale.
    // Since this is client side, let's just create it nicely.

    return new Fuse(localeIndex, fuseOptions);
}

/**
 * Get suggestions based on query
 */
export async function getClientSuggestions(query: string, locale: string = 'en', limit: number = 5): Promise<string[]> {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const fuse = await getFuseInstance(locale);
    const results = fuse.search(query);

    // Extract unique titles
    const suggestions = new Set<string>();
    results.forEach(result => {
        suggestions.add(result.item.title);
    });

    return Array.from(suggestions).slice(0, limit);
}

/**
 * Perform full search
 */
export async function performClientSearch(query: string, locale: string = 'en'): Promise<UnifiedSearchResult[]> {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const fuse = await getFuseInstance(locale);
    const results = fuse.search(query);

    return results.map(result => result.item);
}
