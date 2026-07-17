import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const accentRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const accent = accentRef.current

			if (!section || !stickyBox || !accent) return

			const titles = gsap.utils.toArray<HTMLElement>('.hero-title')

			gsap.to(titles, {
				duration: 0.8,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(accent, {
				delay: 0.6,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section
			className={clsx(
				styles.heroSection,
				data?.isTopOfPage && styles.isTopOfPage,
			)}
			id={id}
			ref={sectionRef}
		>
			<div className={clsx(styles.container, 'container')}>
				<div className={styles.stickyBox} ref={stickyBoxRef}>
					<div className={styles.accentWrapper}>
						<div className={styles.accentContainer} ref={accentRef}>
							<div className={clsx(styles.cornerBracket, styles.topRight)} />
							<div className={clsx(styles.cornerBracket, styles.bottomLeft)} />
							<div
								className={clsx(
									styles.accentLabel,
									styles.labelTopRight,
									'code',
								)}
							>
								[v2.6_PROD]
							</div>
							<div
								className={clsx(
									styles.accentLabel,
									styles.labelBottomLeft,
									'code',
								)}
							>
								[STACK: REMIX / GSAP / CONTENTFUL]
							</div>
						</div>

						{data?.titleWords && (
							<h1 className={clsx(styles.title, 'hero-title')}>
								{data.titleWords.map((word, index) => {
									if (!word) return null

									return (
										<span className={styles.wordMask} key={index}>
											{word}
										</span>
									)
								})}
							</h1>
						)}

						{data?.titleWordsMobile && (
							<h1
								className={clsx(
									styles.title,
									'hero-title',
									'hero-title--mobile',
								)}
							>
								{data.titleWordsMobile.map((word, index) => {
									if (!word) return null

									return (
										<span className={styles.wordMask} key={index}>
											{word}
										</span>
									)
								})}
							</h1>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
