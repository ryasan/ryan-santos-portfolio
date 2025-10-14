import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/experience-section.module.scss'
import { ExperienceSection as ExperienceSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useState, useRef } from 'react'

type ExperienceSectionProps = {
	data?: ExperienceSectionType
}

function extractYear(date: string) {
	return date.split('-')[0]
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [scrollProgress, setScrollProgress] = useState(0)
	const animateScroll = data?.enableScrollAnimation ?? false

	useEffect(() => {
		if (!animateScroll) return

		const container = containerRef.current
		if (!container) return

		const handleScroll = () => {
			// Get the container's position relative to viewport
			const rect = container.getBoundingClientRect()
			const containerTop = rect.top
			const containerHeight = rect.height
			const viewportHeight = window.innerHeight

			// Calculate how much of the container has been scrolled through
			// When container top is at bottom of viewport, progress = 0
			// When container bottom is at top of viewport, progress = 100
			const scrollStart = viewportHeight - containerTop
			const scrollRange = containerHeight + viewportHeight
			const progress = Math.max(
				0,
				Math.min(100, (scrollStart / scrollRange) * 100),
			)

			setScrollProgress(progress)
		}

		// Initial calculation
		handleScroll()

		// Listen to scroll events
		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
		}
	}, [])

	return (
		<section className={styles.experienceSection}>
			{/* Temporary 750px height */}
			<div style={{ height: '750px' }}></div>

			<div className="container">
				<div className={styles.box}>
					{data?.title && <h2 className="h2">{data?.title}</h2>}

					<div className={styles.experienceList} ref={containerRef}>
						{/* Progress bar */}
						{animateScroll && (
							<div className={styles.progressBar}>
								<div
									className={styles.progressFill}
									style={{ height: `${scrollProgress}%` }}
								/>
							</div>
						)}

						{/* Experience items */}
						{data?.experienceCollection?.items?.map((item) => {
							if (!item) return null

							return (
								<div className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.yearRange}>
										{item.startDate && item.endDate && (
											<div>
												{extractYear(item.startDate)} -{' '}
												{item.isCurrent ? 'now' : extractYear(item.endDate)}
											</div>
										)}
									</div>
									<div className={styles.info}>
										{item.jobTitle && (
											<div className="label mb-2">{item.jobTitle}</div>
										)}
										{item.company && (
											<div className="h2 mb-16">{item.company}</div>
										)}
										{item.description?.json && (
											<div className={styles.description}>
												<RichText data={item.description.json} />
											</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
