import { createClient } from '@sanity/client';
import { sanityConfig } from './cms/sanity.config';

// Create the official Sanity client for better performance
const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: true, // Enable CDN for faster reads (use false for real-time data)
  perspective: 'published', // Only fetch published documents
});

// Simple in-memory cache with TTL (Time To Live)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Wrapper with caching
const cachedClient = {
  fetch: async <T = any>(query: string, params?: Record<string, unknown>): Promise<T> => {
    const cacheKey = JSON.stringify({ query, params });
    const cached = cache.get(cacheKey);
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
    
    // Fetch fresh data
    const result = await sanityClient.fetch<T>(query, params || {});
    
    // Store in cache
    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    
    return result;
  },
  
  // Method to clear cache (useful for admin actions)
  clearCache: () => {
    cache.clear();
  }
};

export default cachedClient;
