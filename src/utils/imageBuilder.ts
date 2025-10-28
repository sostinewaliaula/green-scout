import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import { sanityConfig } from '../cms/sanity.config';

// Create a Sanity client for image URL building
const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: true,
});

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image object
 * @param source - Sanity image object
 * @param width - Desired width (optional)
 * @param height - Desired height (optional)
 * @param quality - Image quality 1-100 (default: 80)
 * @returns Optimized image URL
 */
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Get optimized image URL with specific dimensions
 */
export function getOptimizedImageUrl(
  image: any,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
    auto?: 'format';
  } = {}
): string {
  if (!image) return '';
  
  const { width, height, quality = 80, fit = 'max', auto = 'format' } = options;
  
  let url = builder.image(image).auto(auto).quality(quality);
  
  if (width) url = url.width(width);
  if (height) url = url.height(height);
  if (fit) url = url.fit(fit);
  
  return url.url();
}

/**
 * Preset image sizes for common use cases
 */
export const imagePresets = {
  thumbnail: (image: any) => getOptimizedImageUrl(image, { width: 200, height: 200, fit: 'crop' }),
  card: (image: any) => getOptimizedImageUrl(image, { width: 400, height: 300, fit: 'crop' }),
  hero: (image: any) => getOptimizedImageUrl(image, { width: 1200, height: 600, fit: 'crop' }),
  full: (image: any) => getOptimizedImageUrl(image, { width: 1920, quality: 85 }),
};

