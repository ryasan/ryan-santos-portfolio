import { type LoaderFunctionArgs } from '@remix-run/node'
import { client } from '~/services/contentful.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const host = url.host
	const protocol = url.protocol
	const baseUrl = `${protocol}//${host}`

	const [pages, blogs] = await Promise.all([
		client.getAllPages(),
		client.getAllBlogs(),
	])

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map((page: any) => {
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
      <changefreq>weekly</changefreq>
      <priority>${slug === 'home' ? '1.0' : '0.8'}</priority>
    </url>
  `
		})
		.join('')}
  ${blogs
		.map((blog: any) => {
			const slug = blog.slug
			const lastMod = blog.publishDate
				? new Date(blog.publishDate).toISOString()
				: new Date().toISOString()

			return `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
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
