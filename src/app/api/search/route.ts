import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/search';

// Cache for search results (simple in-memory cache)
const searchCache = new Map<string, { results: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * GET /api/search
 * Search endpoint for all content
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const locale = searchParams.get('locale') || 'en';
    const groupByType = searchParams.get('groupByType') === 'true';
    const limit = searchParams.get('limit');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Create cache key
    const cacheKey = `${query}-${locale}-${groupByType}-${limit}`;

    // Check cache
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        results: cached.results,
        cached: true,
        query,
      });
    }

    // Perform search
    const startTime = Date.now();
    const results = search(query, locale, {
      groupByType,
      applyHighlights: true,
      limit: limit ? parseInt(limit) : undefined,
    });
    const searchTime = Date.now() - startTime;

    // Cache results
    searchCache.set(cacheKey, {
      results,
      timestamp: Date.now(),
    });

    // Clean old cache entries (simple cleanup)
    if (searchCache.size > 100) {
      const oldestKey = Array.from(searchCache.keys())[0];
      searchCache.delete(oldestKey);
    }

    return NextResponse.json({
      results,
      query,
      searchTime,
      cached: false,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
