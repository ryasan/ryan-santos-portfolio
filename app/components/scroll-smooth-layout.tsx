import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigation } from '@remix-run/react'
import { useLayoutEffect } from 'react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

function killPageScrollTriggers() {
	const smoother = ScrollSmoother.get()
	const smootherTrigger = smoother?.scrollTrigger

	ScrollTrigger.getAll().forEach((trigger) => {
		if (trigger !== smootherTrigger) {
			trigger.kill()
		}
	})
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	const location = useLocation()
	const navigation = useNavigation()

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

	// Kill page-level ScrollTriggers (especially pins) while the old route
	// is still mounted so React can safely swap the DOM on navigation.
	// Skip same-path updates (e.g. blog tag search params).
	useLayoutEffect(() => {
		if (navigation.state !== 'loading' || !navigation.location) return
		if (navigation.location.pathname === location.pathname) return

		const smoother = ScrollSmoother.get()
		smoother?.paused(true)
		killPageScrollTriggers()
	}, [navigation.state, navigation.location, location.pathname])

	useLayoutEffect(() => {
		const smoother = ScrollSmoother.get()

		if (smoother) {
			smoother.scrollTop(0)
			smoother.paused(false)
		} else {
			window.scrollTo(0, 0)
		}

		// Refresh after the new route's triggers have been created
		const frame = requestAnimationFrame(() => {
			ScrollTrigger.refresh()
		})

		return () => cancelAnimationFrame(frame)
	}, [location.pathname])

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">{children}</div>
		</div>
	)
}
