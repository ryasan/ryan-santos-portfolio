import { client } from '~/services/contentful.server'
import { type Blog, type Page } from '~/graphql/__generated/sdk'
import { type LoaderFunctionArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const host = url.host
	const protocol = url.protocol
	const baseUrl = `${protocol}//${host}`

	const [pages, blogs] = await Promise.all([
		client.getAllPages(),
		client.getAllBlogs(),
		//...other collections here...
	])

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map((page: Page) => {
			const slug = page.slug
			const lastMod = page.sys?.publishedAt
				? new Date(page.sys.publishedAt).toISOString()
				: new Date().toISOString()

			let pageUrl = `${baseUrl}/${slug}`
			if (slug === 'home') {
				pageUrl = `${baseUrl}/`
			}

			return `
    <url>
      <loc>${pageUrl}</loc>
      <lastmod>${lastMod}</lastmod>
    </url>
  `
		})
		.join('')}
  ${blogs
		.map((blog: Blog) => {
			const slug = blog.slug
			const lastMod = blog.publishDate
				? new Date(blog.publishDate).toISOString()
				: new Date().toISOString()

			return `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
      <lastmod>${lastMod}</lastmod>
    </url>
  `
		})
		.join('')}
</urlset>
`

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			encoding: 'UTF-8',
			'xml-version': '1.0',
		},
		status: 200,
	})
}
