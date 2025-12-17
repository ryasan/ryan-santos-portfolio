// import { getPlaiceholder } from 'plaiceholder';
import clsx from 'clsx'
import styles from '~/styles/components/image.module.scss'
import { useState } from 'react'

interface ImageProps {
	alt: string
	blurDataURL?: string
	className?: string
	height?: number
	loading?: 'lazy' | 'eager'
	placeholder?: 'blur' | 'empty'
	priority?: boolean
	quality?: number
	sizes?: string
	src: string
	width?: number
}

export default function Image({
	alt,
	blurDataURL,
	className = '',
	height,
	loading = 'lazy',
	placeholder = 'blur',
	priority = false,
	quality = 75,
	sizes,
	src,
	width,
}: ImageProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	// Determine if it's a Contentful URL
	const isContentful =
		src.includes('ctfassets.net') || src.includes('contentful.com')

	// Build optimized URL
	const getOptimizedUrl = () => {
		if (isContentful) {
			// Contentful optimization
			const baseUrl = src.split('?')[0]
			const params = new URLSearchParams()

			if (width) params.set('w', width.toString())
			if (height) params.set('h', height.toString())
			params.set('q', quality.toString())
			params.set('f', 'webp')

			return `${baseUrl}?${params.toString()}`
		}

		// Static asset - return as is
		return src
	}

	const optimizedSrc = getOptimizedUrl()

	return (
		<div className={clsx(styles.imageContainer, className)}>
			{placeholder === 'blur' && blurDataURL && (
				<div
					className={styles.imagePlaceholder}
					style={{
						backgroundImage: `url(${blurDataURL})`,
					}}
				/>
			)}

			<img
				alt={alt}
				className={clsx(
					styles.image,
					isLoading ? styles.loading : styles.loaded,
					hasError ? styles.error : '',
				)}
				height={height}
				loading={priority ? 'eager' : loading}
				onError={() => setHasError(true)}
				onLoad={() => setIsLoading(false)}
				sizes={sizes}
				src={optimizedSrc}
				width={width}
			/>
		</div>
	)
}

// @Todo: Improve image experience by loading placeholder and then the image

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
