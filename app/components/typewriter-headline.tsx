import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export const FIRST_HEADLINE = 'Hi, My Name is Ryan'
export const SECOND_HEADLINE = "I'm a Frontend Engineer"
export const THIRD_HEADLINE = 'I Build Digital Web Products'

type TypewriterHeadlineProps = {
	isPlaying?: boolean
}

export default function TypewriterHeadline({
	isPlaying = true,
}: TypewriterHeadlineProps) {
	const [mounted, setMounted] = useState(false)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
	const isPlayingRef = useRef(isPlaying)
	const sequenceRef = useRef<Array<string | (() => Promise<void>)> | null>(
		null,
	)

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
			pauseAwareDelay(1500),
			waitWhilePaused,
			FIRST_HEADLINE,
			pauseAwareDelay(1500),
			waitWhilePaused,
			'',
			pauseAwareDelay(400),
			waitWhilePaused,
			SECOND_HEADLINE,
			pauseAwareDelay(1500),
			waitWhilePaused,
			'',
			pauseAwareDelay(400),
			waitWhilePaused,
			THIRD_HEADLINE,
			pauseAwareDelay(1500),
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
		return <span>{FIRST_HEADLINE}</span>
	}

	return (
		<TypeAnimation
			cursor={false}
			deletionSpeed={30}
			preRenderFirstString={false}
			repeat={Infinity}
			sequence={sequenceRef.current}
			speed={20}
			wrapper="span"
		/>
	)
}
