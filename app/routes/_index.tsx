import JumpLinks from '~/components/jump-links'
import SectionRenderer from '~/components/section-renderer'
import  { type HeadersFunction, type MetaFunction } from '@netlify/remix-runtime'
import { type PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { cdnCacheHeaders } from '~/utils'
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

export const headers: HeadersFunction = () => cdnCacheHeaders

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.page) {
		return [{ title: 'Page Not Found' }]
	}

	const { page } = data

	return [
		{ title: page.seoMetadata?.title || page.title },
		{
			content: page.seoMetadata?.description || 'Page description',
			name: 'description',
		},
		{
			content: page.seoMetadata?.title || page.title,
			property: 'og:title',
		},
		{
			content: page.seoMetadata?.description || 'Page description',
			property: 'og:description',
		},
		{
			content: 'https://ryan-santos.com',
			property: 'og:url',
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

export default function Index() {
	const { page } = useLoaderData<typeof loader>()
	const sections = page.pageSectionsCollection?.items

	return (
		<>
			{sections?.map((section: PagePageSectionsItem) => {
				if (!section?.sys?.id) return null
				return (
					<SectionRenderer
						id={section.sys.id}
						key={section.sys.id}
						section={section}
					/>
				)
			})}
			{page.jumpLinksEnabled && sections?.length > 0 && (
				<JumpLinks sections={sections} />
			)}
		</>
	)
}
