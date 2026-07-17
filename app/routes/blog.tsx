import BlogSection from '~/components/sections/blog-section'
import ContactSection from '~/components/sections/contact-section'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
import { type HeadersFunction, type MetaFunction } from '@netlify/remix-runtime'
import { generateCacheHeaders, mergeHeaders } from '~/utils'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'

export async function loader() {
	const page = await client.getPageBySlug('blog')
	const blogs = await client.getAllBlogs('publishDate_DESC')
	const contactSection = await client.getContactSection('Contact - Default')

	if (!page) {
		throw new Response('Not Found', { status: 404 })
	}

	const tags = [
		page?.sys?.id ? `entry-${page.sys.id}` : null,
		page?.seoMetadata?.sys?.id ? `entry-${page.seoMetadata.sys.id}` : null,
		contactSection?.sys?.id ? `entry-${contactSection.sys.id}` : null,
		'content-type-blog', // Purge when any blog is published
		'content-type-page',
		'content-type-contactSection',
	].filter((tag): tag is string => tag !== null)

	return json(
		{ blogs, contactSection, page },
		{ headers: generateCacheHeaders(tags) },
	)
}

export const headers: HeadersFunction = mergeHeaders

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.page) {
		return [{ title: 'Page Not Found' }]
	}

	const { page } = data

	return [
		{ title: page.seoMetadata?.title || page.title || 'Blog | Ryan Santos' },
		{
			content: page.seoMetadata?.description || 'Page description',
			name: 'description',
		},
		...(page.seoMetadata?.ogImage
			? [
					{
						content: page.seoMetadata.ogImage.url,
						property: 'og:image',
					},
				]
			: []),
	]
}

export default function BlogPage() {
	const { blogs, contactSection } = useLoaderData<typeof loader>()

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
		<>
			<BlogSection posts={blogs} tags={tags} />
			<ContactSection data={contactSection} />
		</>
	)
}
