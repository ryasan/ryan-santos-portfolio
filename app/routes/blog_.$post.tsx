import BlogPostSection from '~/components/sections/blog-post-section'
import { generateCacheHeaders, mergeHeaders } from '~/utils'
import { client } from '~/services/contentful.server'
import { json, type HeadersFunction, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
	const { post } = params
	if (!post) {
		throw new Response('Not Found', { status: 404 })
	}

	const blog = await client.getBlogBySlug(post)
	const tags = [
		blog?.sys?.id ? `entry-${blog.sys.id}` : null,
		'content-type-blog'
	].filter((tag): tag is string => tag !== null)
	return json({ blog }, { headers: generateCacheHeaders(tags) })
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
	const { blog } = useLoaderData<typeof loader>()

	return <BlogPostSection data={blog} />
}
