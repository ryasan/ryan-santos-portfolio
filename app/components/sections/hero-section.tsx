import { PauseIcon, PlayIcon } from '~/components/icons'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import gsap from 'gsap'
import TypewriterHeadline from '~/components/typewriter-headline'

const ns = 'hero-section'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const [isPlaying, setIsPlaying] = useState(true)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const playbackButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setPrefersReducedMotion(
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		)
	}, [])

	useGSAP(
		() => {
			const title = titleRef.current
			const playbackButton = playbackButtonRef.current
			
			if (!title || !playbackButton) return

			gsap.to(title, {
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(playbackButton, {
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
				<div className={`${ns}__sticky-box`}>
					<div className={`${ns}__headline-wrap`}>
						<h1
							aria-label="Hi, My Name is Ryan Santos"
							className={`${ns}__title`}
							ref={titleRef}
						>
							<span className={`${ns}__headline-text`}>
								Hi, My Name is Ryan
							</span>
							<span aria-hidden className={`${ns}__headline-text`}>
								I Build <TypewriterHeadline isPlaying={isPlaying} />
								<span
									className={clsx(
										`${ns}__cursor`,
										!isPlaying && `${ns}__cursor--paused`,
									)}
								/>
							</span>
						</h1>
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
