// app/routes/$slug.tsx
import type { LoaderFunctionArgs, MetaFunction } from '@netlify/remix-runtime'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import Hero from '~/components/sections/hero'
import { client } from '~/services/contentful.server'
import type { PageSection } from '~/types/pages'

export async function loader({ params }: LoaderFunctionArgs) {
	const { slug } = params

	if (!slug) {
		throw new Response('Not Found', { status: 404 })
	}

	const page = await client.getPageBySlug(slug)

	if (!page) {
		throw new Response('Not Found', { status: 404 })
	}

	return json({ page })
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

export default function DynamicPage() {
	const { page } = useLoaderData<typeof loader>()

	return (
		<div>
			{page.pageSectionsCollection?.items?.map(
				(section: PageSection, index: number) => (
					<SectionRenderer key={index} section={section} />
				),
			)}
		</div>
	)
}

// Component to render different section types
function SectionRenderer({ section }: { section: PageSection }) {
	switch (section.__typename) {
		case 'HeroSection':
			return <Hero data={section} />
		default:
			return null
	}
}
