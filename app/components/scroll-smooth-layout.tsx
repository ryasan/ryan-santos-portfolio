import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import { useState } from 'react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	const [isReady, setIsReady] = useState(false)

	useGSAP(() => {
		// Only enable on desktop (non-touch devices)
		const isTouchDevice =
			'ontouchstart' in window || navigator.maxTouchPoints > 0

		if (isTouchDevice) {
			setIsReady(true)
			return
		}

		const instance = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			ignoreMobileResize: true,
			normalizeScroll: true,
			onUpdate: () => {
				// Mark as ready after first update
				if (!isReady) setIsReady(true)
			},
		})

		// Fallback in case onUpdate doesn't fire immediately
		requestAnimationFrame(() => setIsReady(true))

		return () => {
			instance.kill()
		}
	}, [])

	if (!isReady) return null;

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
