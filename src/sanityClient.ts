import { fetchSanity } from './cms/sanityRest';

// Sanity client wrapper to provide a similar API to @sanity/client
const sanityClient = {
  fetch: async <T = any>(query: string, params?: Record<string, unknown>): Promise<T> => {
    const result = await fetchSanity<T>(query, params);
    return result as T;
  }
};

export default sanityClient;
