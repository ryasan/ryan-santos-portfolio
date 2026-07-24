import { PauseIcon, PlayIcon } from '~/components/icons'
import TypewriterHeadline, {
	SECOND_HEADLINE,
} from '~/components/typewriter-headline'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './hero-section.module.css'


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
			className={clsx(styles.root, data?.isTopOfPage && 'is-top-of-page')}
			id={id}
		>
			<div className={styles.container}>
				<div className={styles.stickyBox}>
					<div className={styles.headlineWrap}>
						<h1
							aria-label={SECOND_HEADLINE}
							className={clsx(styles.title, 'hero-title')}
						>
							<span aria-hidden className={styles.headlineText}>
								<TypewriterHeadline isPlaying={isPlaying} />
								<span
									className={clsx(
										styles.cursor,
										!isPlaying && styles.paused,
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
							className={styles.playbackButton}
							onClick={() => setIsPlaying((playing) => !playing)}
							type="button"
						>
							{isPlaying ? (
								<PauseIcon
									aria-hidden
									className={styles.playbackIcon}
								/>
							) : (
								<PlayIcon
									aria-hidden
									className={styles.playbackIcon}
								/>
							)}
						</button>
					)}
				</div>
			</div>
		</section>
	)
}
