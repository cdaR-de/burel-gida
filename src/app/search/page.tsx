'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { UnifiedSearchResult, SearchResultType } from '@/lib/client-search'; // Updated import
import { performClientSearch } from '@/lib/client-search'; // Updated import
import { Badge } from '@/components/ui';
import { Loading } from '@/components/ui';
import styles from './page.module.scss';
// Re-export or alias for clarity if needed, or just use UnifiedSearchResult
type SearchResult = UnifiedSearchResult;

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [groupedResults, setGroupedResults] = useState<Record<SearchResultType, SearchResult[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTime, setSearchTime] = useState<number>(0);

  const { locale } = useLocale();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setGroupedResults(null);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      setError(null);
      const startTime = Date.now();

      try {
        // Use client search
        const data = await performClientSearch(query, locale);
        const endTime = Date.now();

        setResults(data || []);
        setSearchTime(endTime - startTime);

        // Group results by type
        const grouped: Record<SearchResultType, SearchResult[]> = {
          blog: [],
          guide: [],
          faq: [],
        };

        (data || []).forEach((result) => {
          if (grouped[result.type]) {
            grouped[result.type].push(result);
          }
        });

        setGroupedResults(grouped);
      } catch (err) {
        console.error('Search error:', err);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, locale]);

  const getTypeLabel = (type: SearchResultType): string => {
    switch (type) {
      case 'blog':
        return 'Blog Post';
      case 'guide':
        return 'Guide';
      case 'faq':
        return 'FAQ';
      default:
        return type;
    }
  };

  const getTypeBadgeVariant = (type: SearchResultType): 'primary' | 'secondary' | 'success' => {
    switch (type) {
      case 'blog':
        return 'primary';
      case 'guide':
        return 'secondary';
      case 'faq':
        return 'success';
      default:
        return 'primary';
    }
  };

  if (!query || query.trim().length < 2) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          {/* SVG Content */}
          <svg
            className={styles.emptyIcon}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 52C41.2548 52 52 41.2548 52 28C52 14.7452 41.2548 4 28 4C14.7452 4 4 14.7452 4 28C4 41.2548 14.7452 52 28 52Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 60L45.65 45.65"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2>Start Searching</h2>
          <p>Enter a search query to find blog posts, guides, and FAQs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Search Results for &quot;{query}&quot;
        </h1>
        {!isLoading && results.length > 0 && (
          <p className={styles.meta}>
            Found {results.length} result{results.length !== 1 ? 's' : ''} in {searchTime}ms
          </p>
        )}
      </div>

      {isLoading && (
        <div className={styles.loadingContainer}>
          <Loading size="large" />
          <p>Searching...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && results.length === 0 && (
        <div className={styles.noResults}>
          <svg
            className={styles.noResultsIcon}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 52C41.2548 52 52 41.2548 52 28C52 14.7452 41.2548 4 28 4C14.7452 4 4 14.7452 4 28C4 41.2548 14.7452 52 28 52Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 60L45.65 45.65"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 28H36"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <h2>No Results Found</h2>
          <p>We couldn&apos;t find any content matching &quot;{query}&quot;</p>
          <div className={styles.suggestions}>
            <h3>Try these suggestions:</h3>
            <ul>
              <li>Check your spelling</li>
              <li>Try different keywords</li>
              <li>Use more general terms</li>
              <li>Browse our <Link href="/blog">blog</Link> or <Link href="/guides">guides</Link></li>
            </ul>
          </div>
        </div>
      )}

      {!isLoading && !error && groupedResults && results.length > 0 && (
        <div className={styles.results}>
          {/* Blog Posts */}
          {groupedResults.blog.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.sectionTitle}>
                Blog Posts ({groupedResults.blog.length})
              </h2>
              <div className={styles.resultList}>
                {groupedResults.blog.map((result, index) => (
                  <article key={`blog-${index}`} className={styles.resultItem}>
                    <div className={styles.resultHeader}>
                      <Badge variant={getTypeBadgeVariant(result.type)} size="small">
                        {getTypeLabel(result.type)}
                      </Badge>
                      {result.category && (
                        <span className={styles.category}>{result.category}</span>
                      )}
                    </div>
                    <Link href={result.url} className={styles.resultLink}>
                      <h3
                        className={styles.resultTitle}
                      >
                        {result.title}
                      </h3>
                    </Link>
                    <p
                      className={styles.resultExcerpt}
                    >
                      {result.excerpt}
                    </p>
                    {result.tags && result.tags.length > 0 && (
                      <div className={styles.tags}>
                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Guides */}
          {groupedResults.guide.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.sectionTitle}>
                Guides ({groupedResults.guide.length})
              </h2>
              <div className={styles.resultList}>
                {groupedResults.guide.map((result, index) => (
                  <article key={`guide-${index}`} className={styles.resultItem}>
                    <div className={styles.resultHeader}>
                      <Badge variant={getTypeBadgeVariant(result.type)} size="small">
                        {getTypeLabel(result.type)}
                      </Badge>
                      {result.category && (
                        <span className={styles.category}>{result.category}</span>
                      )}
                    </div>
                    <Link href={result.url} className={styles.resultLink}>
                      <h3
                        className={styles.resultTitle}
                      >
                        {result.title}
                      </h3>
                    </Link>
                    <p
                      className={styles.resultExcerpt}
                    >
                      {result.excerpt}
                    </p>
                    {result.tags && result.tags.length > 0 && (
                      <div className={styles.tags}>
                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {groupedResults.faq.length > 0 && (
            <section className={styles.resultSection}>
              <h2 className={styles.sectionTitle}>
                FAQs ({groupedResults.faq.length})
              </h2>
              <div className={styles.resultList}>
                {groupedResults.faq.map((result, index) => (
                  <article key={`faq-${index}`} className={styles.resultItem}>
                    <div className={styles.resultHeader}>
                      <Badge variant={getTypeBadgeVariant(result.type)} size="small">
                        {getTypeLabel(result.type)}
                      </Badge>
                      {result.category && (
                        <span className={styles.category}>{result.category}</span>
                      )}
                    </div>
                    <Link href={result.url} className={styles.resultLink}>
                      <h3
                        className={styles.resultTitle}
                      >
                        {result.title}
                      </h3>
                    </Link>
                    <p
                      className={styles.resultExcerpt}
                    >
                      {result.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loading size="large" />
          <p>Loading search...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
