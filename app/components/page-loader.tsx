import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import Teleport from '~/components/teleport'
import { useTheme } from '~/hooks/use-theme'

const ns = 'page-loader'

export default function PageLoader() {
	const [percentage, setPercentage] = useState(0)
	const [isMounted, setIsMounted] = useState(false)
	const theme = useTheme()
	const loaderRef = useRef<HTMLDivElement>(null)
	const leftHalfRef = useRef<HTMLDivElement>(null)
	const rightHalfRef = useRef<HTMLDivElement>(null)
	const cutLineRef = useRef<HTMLDivElement>(null)
	const percentageTextRef = useRef<HTMLDivElement>(null)
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
				duration: 0.8,
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

			// 1. Fade out percentage text
			tl.to(percentageTextRef.current, {
				autoAlpha: 0,
				duration: 0.4,
				ease: 'power2.inOut',
			})

			// 2. "Cut" animation - line appears AND clip-path creates a slit
			tl.to(
				[cutLineRef.current, loaderRef.current],
				{
					clipPath:
						'polygon(0% 0%, 49.8% 0%, 49.8% 100%, 50.2% 100%, 50.2% 0%, 100% 0%, 100% 100%, 0% 100%)',
					duration: 0.5,
					ease: 'power4.inOut',
					scaleY: 1, // Only applies to cutLineRef
					stagger: 0,
				},
				'-=0.1',
			)

			// 3. Slide the two halves apart AND widen the clip-path slit to reveal everything
			tl.to(
				loaderRef.current,
				{
					clipPath:
						'polygon(0% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 0% 100%)',
					duration: 1,
					ease: 'power4.inOut',
				},
				'+=0.1',
			)

			tl.to(
				[leftHalfRef.current, rightHalfRef.current],
				{
					duration: 1,
					ease: 'power4.inOut',
					xPercent: (i) => (i === 0 ? -100 : 100),
				},
				'<',
			)

			// 4. Hide the line as they separate
			tl.to(
				cutLineRef.current,
				{
					autoAlpha: 0,
					duration: 0.3,
				},
				'<',
			)

			// 5. Final cleanup
			tl.set(loaderRef.current, {
				display: 'none',
				onComplete: () => {
					document.body.style.overflow = ''
				},
			})
		},
		{ dependencies: [isMounted], scope: loaderRef },
	)

	return (
		<Teleport to="body">
			<div className={ns} data-theme={theme} ref={loaderRef}>
				<div className={`${ns}__half`} data-side="left" ref={leftHalfRef} />
				<div className={`${ns}__half`} data-side="right" ref={rightHalfRef} />
				<div className={`${ns}__percentage`} ref={percentageTextRef}>
					{percentage}%
				</div>
				<div className={`${ns}__cut-line`} ref={cutLineRef} />
			</div>
		</Teleport>
	)
}
