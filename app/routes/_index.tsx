// import SectionRenderer from '~/components/section-renderer'
// import SpaceSceneSection from '~/components/sections/space-scene-section';
// import { PagePageSectionsItem } from '~/graphql/__generated/sdk'
import ContactSection from '~/components/sections/contact-section'
import FeaturedArticlesSection from '~/components/sections/featured-articles-section'
import HeroSection from '~/components/sections/hero-section'
import TextRevealSection from '~/components/sections/text-reveal-section'
import type { MetaFunction } from '@netlify/remix-runtime'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
	const page = await client.getPageBySlug('home')
	const projects = await client.getAllProjects()

	if (!page) {
		throw new Response('Not Found', { status: 404 })
	}

	return json({ page, projects })
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

export default function Index() {
	const { page, projects } = useLoaderData<typeof loader>()

	return (
		<>
			{/* Hero Section */}
			<HeroSection />
			{/* Space Scene Section */}
			{/* <SpaceSceneSection /> */}
			{/* Text Reveal Section */}
			<TextRevealSection />
			{/* Featured Projects Section */}
			<FeaturedArticlesSection data={{ title: 'Featured Work', articles: projects }} />
			{/* Experience Section */}
			{/* Contact Section */}
			<ContactSection />
			{/* Footer Section */}
		</>
	)
}
