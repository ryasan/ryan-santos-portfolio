import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
	disabled?: boolean
}

export default function ScrollSmoothLayout({
	children,
	disabled = false,
}: ScrollSmoothLayoutProps) {
	useGSAP(() => {
		if (disabled) return

		// Only enable on desktop (non-touch devices)
		const isTouchDevice =
			'ontouchstart' in window || navigator.maxTouchPoints > 0

		if (isTouchDevice) return

		const instance = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			ignoreMobileResize: true,
			normalizeScroll: true,
		})

		return () => {
			instance.kill()
		}
	}, [disabled])

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
