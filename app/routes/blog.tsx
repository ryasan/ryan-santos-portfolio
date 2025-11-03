import BlogSection from '~/components/sections/blog-section'
import SectionRenderer from '~/components/section-renderer'
import type { MetaFunction } from '@netlify/remix-runtime'
import type { PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { BlogFilterProvider } from '~/contexts/blog-filter-context'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
	const page = await client.getPageBySlug('blog')
	const blogs = await client.getAllBlogs('publishDate_DESC')

	if (!page) {
		throw new Response('Not Found', { status: 404 })
	}

	return json({ page, blogs })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.page) {
		return [{ title: 'Page Not Found' }]
	}

	const { page } = data

	return [
		{ title: page.seoMetadata?.title || page.title },
		{
			name: 'description',
			content: page.seoMetadata?.description || 'Page description',
		},
		...(page.seoMetadata?.ogImage
			? [
					{
						property: 'og:image',
						content: page.seoMetadata.ogImage.url,
					},
				]
			: []),
	]
}

export default function BlogPage() {
	const { page, blogs } = useLoaderData<typeof loader>()

	return (
		<>
			{page.pageSectionsCollection?.items?.map(
				(section: PagePageSectionsItem) => {
					if (!section?.sys?.id) return null
					return <SectionRenderer key={section.sys.id} section={section} />
				},
			)}
			<BlogSection />
		</>
	)
}
