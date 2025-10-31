import JumpLinks from '~/components/jump-links'
import ScrollSmoothLayout from '~/components/scroll-smooth-layout'
import SectionRenderer from '~/components/section-renderer'
import type { MetaFunction } from '@netlify/remix-runtime'
import { PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
	const page = await client.getPageBySlug('home')

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

export default function Index() {
	const { page } = useLoaderData<typeof loader>()
	const sections = page.pageSectionsCollection?.items

	return (
		<>
			{sections?.map((section: PagePageSectionsItem) => {
				if (!section?.sys?.id) return null
				return (
					<SectionRenderer
						key={section.sys.id}
						section={section}
						id={section.sys.id}
					/>
				)
			})}
			{page.jumpLinksEnabled && sections?.length > 0 && (
				<JumpLinks sections={sections} />
			)}
		</>
	)
}
