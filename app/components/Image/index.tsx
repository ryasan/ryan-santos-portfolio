import { useState } from 'react';
import { getPlaiceholder } from 'plaiceholder';
import styles from './image.module.scss';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
}

function Image({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 75,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Determine if it's a Contentful URL
  const isContentful = src.includes('ctfassets.net') || src.includes('contentful.com');
  
  // Build optimized URL
  const getOptimizedUrl = () => {
    if (isContentful) {
      // Contentful optimization
      const baseUrl = src.split('?')[0];
      const params = new URLSearchParams();
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', quality.toString());
      params.set('f', 'webp');
      
      return `${baseUrl}?${params.toString()}`;
    }
    
    // Static asset - return as is
    return src;
  };

  const optimizedSrc = getOptimizedUrl();

  return (
    <div className={`${styles.imageContainer} ${className}`}>
      {placeholder === 'blur' && blurDataURL && (
        <div 
          className={styles.imagePlaceholder}
          style={{
            backgroundImage: `url(${blurDataURL})`,
          }}
        />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        className={`${styles.image} ${isLoading ? styles.loading : styles.loaded} ${hasError ? styles.error : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      
      {hasError && (
        <div className={styles.imageError}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
}

export default Image

// @Todo: Add placeholder generation

// // Utility function to generate blur placeholder
// export async function getImagePlaceholder(src: string) {
//   try {
//     const response = await fetch(src);
//     const buffer = await response.arrayBuffer();
//     const { base64 } = await getPlaiceholder(Buffer.from(buffer));
//     return base64;
//   } catch (error) {
//     console.warn('Failed to generate placeholder:', error);
//     return null;
//   }
// }
