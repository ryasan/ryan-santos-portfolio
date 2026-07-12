import { type ActionFunctionArgs } from '@remix-run/node'
import { purgeCache } from '@netlify/functions'

export async function action({ request }: ActionFunctionArgs) {
	if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 })
	}

	// Check a secret token to ensure only Contentful can trigger this
	const authHeader = request.headers.get('Authorization')
	const secret = process.env.CONTENTFUL_WEBHOOK_SECRET
	
	if (secret && authHeader !== `Bearer ${secret}`) {
		return new Response('Unauthorized', { status: 401 })
	}

	try {
		const payload = await request.json()
		const entryId = payload?.sys?.id
		const contentTypeId = payload?.sys?.contentType?.sys?.id

		if (!entryId) {
			return new Response('Bad Request: Missing entry ID', { status: 400 })
		}

		// We purge the specific entry, and also the generic content type tag
		// so that list pages (like the blog list) update when a new item is added.
		const tagsToPurge = [`entry-${entryId}`]
		if (contentTypeId) {
			tagsToPurge.push(`content-type-${contentTypeId}`)
		}

		console.log('Purging Netlify cache for tags:', tagsToPurge)

		await purgeCache({
			tags: tagsToPurge,
		})

		return new Response('Cache purged successfully', { status: 200 })
	} catch (error) {
		console.error('Error purging cache:', error)
		return new Response('Internal Server Error', { status: 500 })
	}
}
