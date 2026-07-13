const baseCacheHeaders = {
	// Browsers revalidate; the CDN does the heavy lifting
	'Cache-Control': 'public, max-age=0, must-revalidate',
	// Netlify CDN: fresh 1 hour, serve stale up to 1 year while revalidating in the background.
	// Ideal for portfolios: maximizes cache hits for instant loads across infrequent visits,
	// while still automatically fetching updates behind the scenes when content changes. Refresh
	// twice in a row if you want to see the latest content from the server.
	'Netlify-CDN-Cache-Control':
		'public, s-maxage=3600, stale-while-revalidate=31536000',
}

// 1. Headers for the HTML Document
// We MUST vary on the theme cookie here so the server can render the correct initial HTML.
export const documentCacheHeaders = {
	...baseCacheHeaders,
	'Netlify-Vary': 'query=_data|cookie=en_theme',
}

// 2. Headers for the JSON Loader Data
// We DO NOT vary on the theme cookie here, because the data is the same for both themes.
export const loaderCacheHeaders = {
	...baseCacheHeaders,
	// Remix uses ?_data to tell HTML document requests apart from JSON loader
	// requests; without this, Netlify ignores the query string and serves the
	// cached document for data requests (loader data comes back undefined).
	'Netlify-Vary': 'query=_data',
}

export function generateCacheHeaders(tags: string[]) {
	return {
		...loaderCacheHeaders,
		'Netlify-Cache-Tag': tags.join(','),
	}
}

export const mergeHeaders = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
	const tags = loaderHeaders.get('Netlify-Cache-Tag')
	return {
		...documentCacheHeaders,
		...(tags ? { 'Netlify-Cache-Tag': tags } : {}),
	}
}
