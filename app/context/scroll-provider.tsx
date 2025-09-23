import LocomotiveScroll from 'locomotive-scroll'
import { useEffect, useRef } from 'react'

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
	const scrollRef = useRef<LocomotiveScroll | null>(null)

	useEffect(() => {
		// const container = document.querySelector('#scroll-container') as HTMLElement

		// if (!container) {
		// 	console.warn('Scroll container not found')
		// 	return
		// }

		// scrollRef.current = new LocomotiveScroll({
		// 	el: container,
		// 	smooth: true,
		// 	direction: 'vertical',
		// 	tablet: { 
		// 		breakpoint: 0,
		// 	},
		// })

		// return () => {
		// 	if (scrollRef.current) {
		// 		scrollRef.current.destroy()
		// 		scrollRef.current = null
		// 	}
		// }
	}, [])

	return <>{children}</>
}
