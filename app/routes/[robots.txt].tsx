import { type LoaderFunctionArgs } from '@remix-run/node'

export const loader = ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const host = url.host
	const protocol = url.protocol

	const robotText = `
User-agent: *
Allow: /

Sitemap: ${protocol}//${host}/sitemap.xml
`

	return new Response(robotText, {
		headers: {
			'Content-Type': 'text/plain',
		},
		status: 200,
	})
}

