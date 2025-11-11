import { NextRequest, NextResponse } from 'next/server';
import { getSearchSuggestions } from '@/lib/search';

// Cache for suggestions
const suggestionsCache = new Map<string, { suggestions: string[]; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * GET /api/search/suggestions
 * Get search suggestions based on partial query
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const locale = searchParams.get('locale') || 'en';
    const limit = searchParams.get('limit');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // Create cache key
    const cacheKey = `${query}-${locale}-${limit}`;

    // Check cache
    const cached = suggestionsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        suggestions: cached.suggestions,
        cached: true,
      });
    }

    // Get suggestions
    const suggestions = getSearchSuggestions(
      query,
      locale,
      limit ? parseInt(limit) : 5
    );

    // Cache suggestions
    suggestionsCache.set(cacheKey, {
      suggestions,
      timestamp: Date.now(),
    });

    // Clean old cache entries
    if (suggestionsCache.size > 200) {
      const oldestKey = Array.from(suggestionsCache.keys())[0];
      suggestionsCache.delete(oldestKey);
    }

    return NextResponse.json({
      suggestions,
      cached: false,
    });
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
