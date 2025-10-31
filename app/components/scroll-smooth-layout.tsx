import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollSmoother)

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	useGSAP(() => {
		ScrollSmoother.create({ smooth: 2 })
	})

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
