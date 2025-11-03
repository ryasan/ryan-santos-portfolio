import BlogPostSection from '~/components/sections/blog-post-section'
import ScrollSmoothLayout from '~/components/scroll-smooth-layout'
import { client } from '~/services/contentful.server'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
	const { post } = params
	if (!post) {
		throw new Response('Not Found', { status: 404 })
	}

	const blog = await client.getBlogBySlug(post)
	return json({ blog })
}

export default function BlogPost() {
	const { blog } = useLoaderData<typeof loader>()

	return (
		<ScrollSmoothLayout disabled>
			<BlogPostSection data={blog} />
		</ScrollSmoothLayout>
	)
}
