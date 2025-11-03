import Header from '~/components/header'
import ScrollSmoothLayout from '~/components/scroll-smooth-layout'
import { GlobalHeader, GlobalFooter } from '~/graphql/__generated/sdk'
import { useRef } from 'react'

type GlobalLayoutProps = {
	children: React.ReactNode
	data?: {
		headerData?: GlobalHeader
		footerData?: GlobalFooter
	}
}

export default function GlobalLayout({ children, data }: GlobalLayoutProps) {
	const mainRef = useRef<HTMLDivElement>(null)

	return (
		<main id="global-main" ref={mainRef}>
			<Header data={data?.headerData} />
			<ScrollSmoothLayout>{children}</ScrollSmoothLayout>
			{/* Teleport any elements that shouldn't be affected by the scroll smoother here */}
		</main>
	)
}
