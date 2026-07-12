import Header from '~/components/header'
import JumpLinks from '~/components/jump-links'
import ScrollSmoothLayout from '~/components/scroll-smooth-layout'
import { type GlobalHeader, type GlobalFooter } from '~/graphql/__generated/sdk'
import { useRef } from 'react'
import { useMatches } from '@remix-run/react'

type GlobalLayoutProps = {
	children: React.ReactNode
	data?: {
		footerData?: GlobalFooter
		headerData?: GlobalHeader
	}
}

export default function GlobalLayout({ children, data }: GlobalLayoutProps) {
	const mainRef = useRef<HTMLDivElement>(null)
	const matches = useMatches()

	// Find the matched route data that contains the page data of the current route
	const matchWithPage = matches.find((match) => (match.data as any)?.page)

	const page = matchWithPage?.data ? (matchWithPage.data as any).page : null

	const sections = page?.pageSectionsCollection?.items
	const shouldShowJumpLinks = page?.jumpLinksEnabled && sections?.length > 0

	return (
		<main id="global-main" ref={mainRef}>
			<Header data={data?.headerData} />
			<ScrollSmoothLayout>{children}</ScrollSmoothLayout>
			{shouldShowJumpLinks && <JumpLinks sections={sections} />}
		</main>
	)
}
