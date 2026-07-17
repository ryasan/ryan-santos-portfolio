import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
// import { useLocation } from '@remix-run/react'
// import { useLayoutEffect } from 'react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	// const location = useLocation()

	useGSAP(() => {
		// Only enable on desktop (non-touch devices)
		const isTouchDevice =
			'ontouchstart' in window || navigator.maxTouchPoints > 0

		if (isTouchDevice) return

		const instance = ScrollSmoother.create({
			effects: true,
			ignoreMobileResize: true,
			smooth: 2,
		})

		return () => {
			instance.kill()
		}
	}, [])

	// useLayoutEffect(() => {
	// 	// Reset scroll position to top on page change
	// 	const smoother = ScrollSmoother.get()
	// 	if (smoother) {
	// 		smoother.scrollTop(0)
	// 	} else {
	// 		window.scrollTo(0, 0)
	// 	}
	// }, [location.pathname])

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
