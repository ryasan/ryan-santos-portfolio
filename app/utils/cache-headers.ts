// Only the production build (which reads the `master` Contentful environment)
// caches on the CDN. Other environments (e.g. staging) serve fresh content so
// edits show up immediately without waiting on cache purges.
const cachingEnabled = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT === 'master'

const baseCacheHeaders = cachingEnabled
	? {
			// Browsers revalidate; the CDN does the heavy lifting
			'Cache-Control': 'public, max-age=0, must-revalidate',
			// Netlify CDN: fresh 1 hour, serve stale up to 1 year while revalidating in the background.
			// Ideal for portfolios: maximizes cache hits for instant loads across infrequent visits,
			// while still automatically fetching updates behind the scenes when content changes. Refresh
			// twice in a row if you want to see the latest content from the server.
			'Netlify-CDN-Cache-Control':
				'public, s-maxage=3600, stale-while-revalidate=31536000',
		}
	: {
			// Set explicitly so @netlify/remix-edge-adapter doesn't fall back to
			// its default CDN caching when no cache-control header is present.
			'Cache-Control': 'no-cache',
			'Netlify-CDN-Cache-Control': 'no-store',
		}

export const cdnCacheHeaders = {
	...baseCacheHeaders,
	// Remix uses ?_data to tell HTML document requests apart from JSON loader
	// requests; without this, Netlify ignores the query string and serves the
	// cached document for data requests (loader data comes back undefined).
	'Netlify-Vary': 'query=_data',
}

export function generateCacheHeaders(tags: string[]) {
	return {
		...cdnCacheHeaders,
		'Netlify-Cache-Tag': tags.join(','),
	}
}

export const mergeHeaders = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
	const tags = loaderHeaders.get('Netlify-Cache-Tag')
	return {
		...cdnCacheHeaders,
		...(tags ? { 'Netlify-Cache-Tag': tags } : {}),
	}
}
