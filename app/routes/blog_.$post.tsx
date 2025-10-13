import BlogHeaderSection from '~/components/sections/blog-header-section'
import BlogRichTextSection from '~/components/sections/blog-rich-text-section'
import HeroImageSection from '~/components/sections/hero-image-section'
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
		<>
			<BlogHeaderSection data={blog} />
			<HeroImageSection data={{ image: blog.openGraphImage }} />
			{/* Rich Text Section - Post Content */}
			<BlogRichTextSection data={{ content: blog.blogBody }} />
			
			{/* Tags Section - Post Tags */}
			{/* Related Posts Section - Post Related Posts */}
			{/* Comments Section - Post Comments */}
			{/* Share Buttons Section - Post Share Buttons */}
		</>
	)
}
