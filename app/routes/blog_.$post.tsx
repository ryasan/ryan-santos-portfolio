import BlogPostSection from '~/components/sections/blog-post-section'
import { client } from '~/services/contentful.server'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
	const { post } = params
	if (!post) {
		throw new Response('Not Found', { status: 404 })
	}

	const blog = await client.getBlogBySlug(post)
	return json({ blog })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.blog) {
		return [{ title: 'Page Not Found' }]
	}

	const { blog } = data

	return [
		{ title: blog.title },
		{
			name: 'description',
			content: blog.description,
		},
		...(blog.openGraphImage
			? [
					{
						property: 'og:image',
						content: blog.openGraphImage.url,
					},
				]
			: []),
	]
}

export default function BlogPost() {
	const { blog } = useLoaderData<typeof loader>()

	return <BlogPostSection data={blog} />
}
