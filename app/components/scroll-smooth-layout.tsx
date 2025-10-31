import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

type ScrollSmoothLayoutProps = {
	children: React.ReactNode
}

export default function ScrollSmoothLayout({
	children,
}: ScrollSmoothLayoutProps) {
	useGSAP(() => {
		const instance = ScrollSmoother.create({
			smooth: 2,
			effects: true,
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
