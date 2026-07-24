import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

const HEADLINES = [
	'Digital Products',
	'Accessible Interfaces',
	'Design Systems',
	'Web Applications',
	'Interactive Components',
	'Component Libraries',
	'E-Commerce Stores',
	'Seamless Workflows',
	'Headless Frontends',
	'Scalable Systems',
] as const

const HOLD_MS = 1500
const CLEAR_MS = 400

type TypewriterHeadlineProps = {
	isPlaying?: boolean
}

export default function TypewriterHeadline({
	isPlaying = true,
}: TypewriterHeadlineProps) {
	const [mounted, setMounted] = useState(false)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
	const isPlayingRef = useRef(isPlaying)
	const sequenceRef = useRef<Array<string | (() => Promise<void>)> | null>(null)

	isPlayingRef.current = isPlaying

	if (!sequenceRef.current) {
		const waitWhilePaused = async () => {
			while (!isPlayingRef.current) {
				await new Promise((resolve) => setTimeout(resolve, 100))
			}
		}

		const pauseAwareDelay = (ms: number) => async () => {
			let remaining = ms

			while (remaining > 0) {
				await waitWhilePaused()
				const slice = Math.min(50, remaining)
				await new Promise((resolve) => setTimeout(resolve, slice))
				remaining -= slice
			}
		}

		sequenceRef.current = [
			pauseAwareDelay(HOLD_MS),
			waitWhilePaused,
			...HEADLINES.flatMap((headline) => [
				headline,
				pauseAwareDelay(HOLD_MS),
				waitWhilePaused,
				'',
				pauseAwareDelay(CLEAR_MS),
				waitWhilePaused,
			]),
		]
	}

	useEffect(() => {
		setPrefersReducedMotion(
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		)
		setMounted(true)
	}, [])

	if (!mounted) {
		return <span />
	}

	if (prefersReducedMotion) {
		return <span>{HEADLINES[0]}</span>
	}

	return (
		<TypeAnimation
			cursor={false}
			deletionSpeed={40}
			preRenderFirstString={false}
			repeat={Infinity}
			sequence={sequenceRef.current}
			speed={30}
			wrapper="span"
		/>
	)
}
