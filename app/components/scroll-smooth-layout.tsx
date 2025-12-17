import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	useGSAP(() => {
		// Only enable on desktop (non-touch devices)
		const isTouchDevice =
			'ontouchstart' in window || navigator.maxTouchPoints > 0

		if (isTouchDevice) return

		const instance = ScrollSmoother.create({
			effects: true,
			ignoreMobileResize: true,
			normalizeScroll: true,
			smooth: 2,
		})

		return () => {
			instance.kill()
		}
	}, [])

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
