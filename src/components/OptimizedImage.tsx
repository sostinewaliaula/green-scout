import React, { useState } from 'react';
import { getOptimizedImageUrl } from '../utils/imageBuilder';

interface OptimizedImageProps {
  image: any;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  fallback?: string;
}

/**
 * Optimized image component with lazy loading and blur placeholder
 */
export function OptimizedImage({
  image,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  loading = 'lazy',
  fallback = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get the image URL from asset reference
  const imageUrl = image?.asset?.url || 
                   (image?.asset?._ref ? getOptimizedImageUrl(image, { width, height, quality }) : null);
  
  const finalUrl = hasError ? fallback : (imageUrl || fallback);

  // Generate a tiny placeholder (10px wide) for blur effect
  const placeholderUrl = image ? getOptimizedImageUrl(image, { width: 10, quality: 20 }) : null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {placeholderUrl && !isLoaded && (
        <img
          src={placeholderUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        src={finalUrl}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

