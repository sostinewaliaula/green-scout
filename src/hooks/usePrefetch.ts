import { useEffect } from 'react';
import sanityClient from '../sanityClient';

/**
 * Hook to prefetch data on component mount
 * Useful for preloading data for likely navigation paths
 */
export function usePrefetch(query: string, params?: Record<string, unknown>) {
  useEffect(() => {
    // Prefetch in background
    sanityClient.fetch(query, params).catch((err) => {
      console.warn('Prefetch failed:', err);
    });
  }, [query, params]);
}

/**
 * Hook to prefetch data on hover
 * Returns a handler to attach to onMouseEnter
 */
export function usePrefetchOnHover(query: string, params?: Record<string, unknown>) {
  const handleHover = () => {
    sanityClient.fetch(query, params).catch((err) => {
      console.warn('Prefetch failed:', err);
    });
  };

  return handleHover;
}

