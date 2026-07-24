import { PauseIcon, PlayIcon } from '~/components/icons'
import TypewriterHeadline, {
	SECOND_HEADLINE,
} from '~/components/typewriter-headline'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ns = 'hero-section'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const [isPlaying, setIsPlaying] = useState(true)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const playbackButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setPrefersReducedMotion(
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		)
	}, [])

	useGSAP(
		() => {
			const stickyBox = stickyBoxRef.current

			if (!stickyBox) return

			gsap.to(stickyBox, {
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})
		},
		{ dependencies: [prefersReducedMotion] },
	)

	return (
		<section
			className={clsx(ns, data?.isTopOfPage && 'is-top-of-page')}
			id={id}
		>
			<div className={`${ns}__container`}>
				<div className={`${ns}__sticky-box`} ref={stickyBoxRef}>
					<div className={`${ns}__headline-wrap`}>
						<h1
							aria-label={SECOND_HEADLINE}
							className={`${ns}__title`}
							ref={titleRef}
						>
							<span aria-hidden className={`${ns}__headline-text`}>
								<TypewriterHeadline isPlaying={isPlaying} />
								<span
									className={clsx(
										`${ns}__cursor`,
										!isPlaying && `${ns}__cursor--paused`,
									)}
								/>
							</span>
						</h1>
					</div>

					<div className={`${ns}__scroll-indicator`}>
						<span className={`${ns}__scroll-indicator-icon`}>↓</span>
						<span className={`${ns}__scroll-indicator-text`}>Scroll</span>
					</div>

					{!prefersReducedMotion && (
						<button
							aria-label={
								isPlaying
									? 'Pause typewriter animation'
									: 'Play typewriter animation'
							}
							aria-pressed={isPlaying}
							className={`${ns}__playback-button`}
							onClick={() => setIsPlaying((playing) => !playing)}
							ref={playbackButtonRef}
							type="button"
						>
							{isPlaying ? (
								<PauseIcon aria-hidden className={`${ns}__playback-icon`} />
							) : (
								<PlayIcon aria-hidden className={`${ns}__playback-icon`} />
							)}
						</button>
					)}
				</div>
			</div>
		</section>
	)
}
