import BlogSection from '~/components/sections/blog-section'
import type { Blog, ContentfulTag } from '~/graphql/__generated/sdk'
import type { MetaFunction } from '@netlify/remix-runtime'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'

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
	const { blogs } = useLoaderData<typeof loader>()

	const tags = useMemo(() => {
		const uniqueTags: ContentfulTag[] = []

		blogs.forEach((blog: Blog) => {
			blog.contentfulMetadata?.tags?.filter(Boolean).forEach((tag) => {
				if (tag && !uniqueTags.some((t) => t?.name === tag?.name)) {
					uniqueTags.push(tag)
				}
			})
		})

		return uniqueTags
	}, [blogs])

	return (
		<BlogSection posts={blogs} tags={tags} />
	)
}
