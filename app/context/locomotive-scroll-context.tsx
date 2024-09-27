import type LocomotiveScroll from 'locomotive-scroll'
import {
	createContext,
	useContext,
	type ReactNode,
	useEffect,
	useState,
} from 'react'
import { noop } from '~/utils'

type LocomotiveScrollContextType = {
	scroll: LocomotiveScroll | null
}

const LocomotiveScrollContext = createContext<
	LocomotiveScrollContextType | undefined
>(undefined)

export function useLocomotiveScroll() {
	const context = useContext(LocomotiveScrollContext)
	if (context === undefined) {
		throw new Error(
			'useLocomotiveScroll must be used within a LocomotiveScrollProvider',
		)
	}
	return context
}

export default function LocomotiveScrollProvider({
	children,
}: {
	children: ReactNode
}) {
	const [scroll, setScroll] = useState<LocomotiveScroll | null>(null)

	useEffect(() => {
		// Defer Locomotive Scroll initialization to the end of the event loop
		const timeoutId = setTimeout(() => {
			async function initializeLocomotiveScroll() {
				const LocomotiveScroll = (await import('locomotive-scroll')).default
				const scrollContainer = document.querySelector(
					'#scroll-container',
				) as HTMLElement

				if (!scrollContainer) {
					throw new Error('Scroll container not found')
				}

				const scroll = new LocomotiveScroll({
					el: scrollContainer,
					smooth: true,
					direction: 'vertical',
					tablet: {
						breakpoint: 0,
					},
				})
				return scroll
			}

			const _scroll = initializeLocomotiveScroll()
				.then((s) => {
					setScroll(s)
					return s
				})
				.catch(noop)

			return () => {
				_scroll
					.then((s) => {
						s?.destroy()
					})
					.catch(noop)
			}
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [])

	return (
		<LocomotiveScrollContext.Provider value={{ scroll }}>
			{children}
		</LocomotiveScrollContext.Provider>
	)
}
