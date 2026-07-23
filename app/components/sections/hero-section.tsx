import { PauseIcon, PlayIcon } from '~/components/icons'
import TypewriterHeadline, {
	SECOND_HEADLINE,
} from '~/components/typewriter-headline'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const ns = 'hero-section'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const [isPlaying, setIsPlaying] = useState(true)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

	useEffect(() => {
		setPrefersReducedMotion(
			window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		)
	}, [])

	return (
		<section
			className={clsx(ns, data?.isTopOfPage && 'is-top-of-page')}
			id={id}
		>
			<div className={`${ns}__container`}>
				<div className={`${ns}__sticky-box`}>
					<div className={`${ns}__headline-wrap`}>
						<h1
							aria-label={SECOND_HEADLINE}
							className={`${ns}__title hero-title`}
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
							type="button"
						>
							{isPlaying ? (
								<PauseIcon
									aria-hidden
									className={`${ns}__playback-icon`}
								/>
							) : (
								<PlayIcon
									aria-hidden
									className={`${ns}__playback-icon`}
								/>
							)}
						</button>
					)}
				</div>
			</div>
		</section>
	)
}
