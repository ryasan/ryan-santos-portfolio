// app/routes/$slug.tsx
import SectionRenderer from '~/components/section-renderer'
import type { LoaderFunctionArgs, MetaFunction } from '@netlify/remix-runtime'
import type { PagePageSectionsItem } from '~/graphql/__generated/sdk'
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
		<>
			{page.pageSectionsCollection?.items?.map((section: PagePageSectionsItem) => {
				if (!section?.sys?.id) return null
				return <SectionRenderer key={section.sys.id} section={section} />
			})}
		</>
	)
}
