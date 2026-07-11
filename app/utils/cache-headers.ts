export const cdnCacheHeaders = {
	// Browsers revalidate; the CDN does the heavy lifting
	'Cache-Control': 'public, max-age=0, must-revalidate',
	// Netlify CDN: fresh 5 min, serve stale up to 1 day while revalidating
	'Netlify-CDN-Cache-Control':
		'public, s-maxage=300, stale-while-revalidate=86400',
	// Remix uses ?_data to tell HTML document requests apart from JSON loader
	// requests; without this, Netlify ignores the query string and serves the
	// cached document for data requests (loader data comes back undefined).
	'Netlify-Vary': 'query=_data',
}
