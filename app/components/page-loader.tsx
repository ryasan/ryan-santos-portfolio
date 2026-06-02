import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import Teleport from '~/components/teleport'
import styles from '~/styles/components/page-loader.module.scss'

export default function PageLoader() {
	const [percentage, setPercentage] = useState(0)
	const [isMounted, setIsMounted] = useState(false)
	const loaderRef = useRef<HTMLDivElement>(null)
	const percentageRef = useRef<{ value: number }>({ value: 0 })
	const stepsRef = useRef<number[]>([0])

	useEffect(() => {
		setIsMounted(true)

		// Fixed set of "random-looking" steps for consistency
		stepsRef.current = [0, 12, 28, 46, 67, 82, 94, 100]

		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	useGSAP(
		() => {
			if (!isMounted || !loaderRef.current) return

			const tl = gsap.timeline()

			tl.to(percentageRef.current, {
				duration: 2.5,
				ease: 'power2.inOut',
				onUpdate: () => {
					const value = percentageRef.current.value
					// Find the highest step that is less than or equal to the current value
					const snappedValue = stepsRef.current.reduce(
						(prev, curr) => (curr <= value ? curr : prev),
						0,
					)
					setPercentage(snappedValue)
				},
				value: 100,
			})

			tl.to(loaderRef.current, {
				autoAlpha: 0,
				duration: 0.8,
				ease: 'power2.inOut',
				onComplete: () => {
					document.body.style.overflow = ''
					if (loaderRef.current) {
						loaderRef.current.style.display = 'none'
					}
				},
			})
		},
		{ dependencies: [isMounted], scope: loaderRef },
	)

	return (
		<Teleport to="body">
			<div className={styles.loader} ref={loaderRef}>
				<div className={styles.percentage}>{percentage}%</div>
			</div>
		</Teleport>
	)
}
