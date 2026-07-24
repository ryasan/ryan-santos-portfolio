import BlogPostSection from '~/components/sections/blog-post-section'
import ContactSection from '~/components/sections/contact-section'
import { generateCacheHeaders, mergeHeaders } from '~/utils'
import { client } from '~/services/contentful.server'
import {
	json,
	type HeadersFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
	const { post } = params
	if (!post) {
		throw new Response('Not Found', { status: 404 })
	}

	const blog = await client.getBlogBySlug(post)
	const contactSection = await client.getContactSection('Contact - Default')

	const tags = [
		blog?.sys?.id ? `entry-${blog.sys.id}` : null,
		blog?.author?.sys?.id ? `entry-${blog.author.sys.id}` : null,
		blog?.seoMetadata?.sys?.id ? `entry-${blog.seoMetadata?.sys?.id}` : null,
	].filter((tag): tag is string => tag !== null)

	return json({ blog, contactSection }, { headers: generateCacheHeaders(tags) })
}

export const headers: HeadersFunction = mergeHeaders

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.blog) {
		return [{ title: 'Page Not Found' }]
	}

	const { blog } = data

	return [
		{ title: `${blog.title} - Blog | Ryan Santos` },
		{
			content: blog.description,
			name: 'description',
		},
		...(blog.openGraphImage
			? [
					{
						content: blog.openGraphImage.url,
						property: 'og:image',
					},
				]
			: []),
	]
}

export default function BlogPost() {
	const { blog, contactSection } = useLoaderData<typeof loader>()

	return (
		<>
			<BlogPostSection data={blog} />
			<ContactSection data={contactSection} />
		</>
	)
}
