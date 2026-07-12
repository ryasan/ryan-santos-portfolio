import JumpLinks from '~/components/jump-links'
import SectionRenderer from '~/components/section-renderer'
import  { type HeadersFunction, type LoaderFunctionArgs, type MetaFunction } from '@netlify/remix-runtime'
import  { type PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { cdnCacheHeaders, generateCacheHeaders, mergeHeaders } from '~/utils'
import { client } from '~/services/contentful.server'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
	const { slug } = params

	if (!slug) {
		throw new Response('Not Found', { status: 404 })
	}

	const page = await client.getPageBySlug(slug)

	if (!page) {
		throw new Response('Not Found', { status: 404 })
	}

	const tags = [`entry-${page.sys.id}`, 'content-type-page']
	return json({ page }, { headers: generateCacheHeaders(tags) })
}

export const headers: HeadersFunction = mergeHeaders

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

export default function DynamicPage() {
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
