/**
 * Optimized GROQ query fragments for common data fetching patterns
 * These projections fetch only the necessary fields to reduce payload size
 */

// Optimized image projection - only fetch URL
export const imageProjection = `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  }
`;

// Minimal image projection for cards/thumbnails
export const thumbnailProjection = `
  image {
    asset->{
      _id,
      url
    }
  }
`;

// Slug projection
export const slugProjection = `
  slug {
    current
  }
`;

/**
 * Common query patterns for better performance
 */
export const queries = {
  // Get all news articles (optimized)
  newsArticles: `*[_type == "newsArticle"] | order(publishedAt desc) {
    _id,
    title,
    ${slugProjection},
    publishedAt,
    ${thumbnailProjection},
    excerpt,
    category
  }`,

  // Get single news article with full content
  newsArticleBySlug: (slug: string) => `*[_type == "newsArticle" && slug.current == "${slug}"][0]{
    _id,
    title,
    ${slugProjection},
    publishedAt,
    ${imageProjection},
    excerpt,
    category,
    content
  }`,

  // Get all projects (optimized)
  projects: `*[_type == "project"] | order(title asc) {
    _id,
    title,
    ${slugProjection},
    location,
    county,
    ${thumbnailProjection},
    description,
    treesPlanted,
    schoolsInvolved
  }`,

  // Get featured items only
  featuredNews: `*[_type == "newsArticle" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    ${slugProjection},
    publishedAt,
    ${thumbnailProjection},
    excerpt,
    category
  }`,

  featuredProjects: `*[_type == "project" && featured == true] | order(treesPlanted desc) [0...3] {
    _id,
    title,
    ${slugProjection},
    location,
    ${thumbnailProjection},
    description,
    treesPlanted,
    schoolsInvolved
  }`,
};

/**
 * Prefetch data for faster page transitions
 */
export async function prefetchQuery<T>(
  client: { fetch: (query: string, params?: Record<string, unknown>) => Promise<T> },
  query: string,
  params?: Record<string, unknown>
): Promise<void> {
  try {
    // Prefetch in the background
    await client.fetch(query, params);
  } catch (error) {
    console.warn('Prefetch failed:', error);
  }
}

