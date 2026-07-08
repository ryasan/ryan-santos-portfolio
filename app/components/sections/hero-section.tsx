import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { MouseIcon } from '~/components/icons'
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
	const subtitleRef = useRef<HTMLDivElement>(null)
	const scrollToExploreRef = useRef<HTMLDivElement>(null)
	const scrollToExploreWrapperRef = useRef<HTMLDivElement>(null)
	const hudRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const subtitle = subtitleRef.current
			const scrollToExplore = scrollToExploreRef.current
			const scrollToExploreWrapper = scrollToExploreWrapperRef.current
			const hud = hudRef.current

			if (!section || !stickyBox || !scrollToExplore || !scrollToExploreWrapper) return

			const words = gsap.utils.toArray<HTMLElement>('.word')
			words.forEach((word, wordIndex) => {
				const chars = word.querySelectorAll('.char')
				gsap.to(chars, {
					delay: wordIndex * 0.15,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.01,
					y: 0,
				})
			})

			gsap.to(subtitle, {
				delay: 1,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(scrollToExplore, {
				delay: 1.2,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(hud, {
				delay: 1.2,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					end: '+=120%',
					pin: true,
					scrub: 1,
					start: 'top top',
					trigger: section,
				},
			})

			tl.fromTo(
				stickyBox,
				{ opacity: 1 },
				{ ease: 'none', immediateRender: false, opacity: 0 },
				0,
			)

			tl.fromTo(
				scrollToExploreWrapper,
				{ opacity: 1 },
				{ ease: 'none', immediateRender: false, opacity: 0 },
				0,
			)
		},
		{ scope: sectionRef },
	)

	return (
		<section className={styles.heroSection} id={id} ref={sectionRef}>
			<div className="container">
				<div className={styles.stickyBox} ref={stickyBoxRef}>
					<div className={styles.hudWrapper}>
						<div className={styles.hudContainer} ref={hudRef}>
							<div className={clsx(styles.cornerBracket, styles.topLeft)} />
							<div className={clsx(styles.cornerBracket, styles.topRight)} />
							<div className={clsx(styles.cornerBracket, styles.bottomLeft)} />
							<div className={clsx(styles.cornerBracket, styles.bottomRight)} />

							<div className={clsx(styles.hudLabel, styles.labelTopLeft, 'code')}>
								{/* [SYS_STATUS: ACTIVE] */}
							</div>
							<div className={clsx(styles.hudLabel, styles.labelTopRight, 'code')}>
								[LOC: 34.0522° N, 118.2437° W]
							</div>
							<div className={clsx(styles.hudLabel, styles.labelBottomLeft, 'code')}>
								[STACK: REMIX / GSAP / CONTENTFUL]
							</div>
							<div className={clsx(styles.hudLabel, styles.labelBottomRight, 'code')}>
								{/* [v2.6_PROD] */}
							</div>
						</div>

						{data?.titleWords && (
							<h1 className={styles.title}>
								{data.titleWords?.map((word, index) => {
									if (!word) return null

									return (
										<span className={styles.wordMask} key={index}>
											<span className={clsx(styles.word, 'word')}>
												{word.split('').map((char, charIndex) => (
													<span className={clsx(styles.char, 'char')} key={charIndex}>
														{char === ' ' ? '\u00A0' : char}
													</span>
												))}
											</span>
										</span>
									)
								})}
							</h1>
						)}
						<div className={clsx(styles.subtitle, 'h6')} ref={subtitleRef}>
							{data?.leftSubtitle && (
								<div className={styles.leftSubtitle}>{data?.leftSubtitle}</div>
							)}
							{data?.rightSubtitle && (
								<div className={styles.rightSubtitle}>{data?.rightSubtitle}</div>
							)}
						</div>
					</div>
				</div>
				<div
					className={styles.scrollToExploreWrapper}
					ref={scrollToExploreWrapperRef}
				>
					<div
						className={clsx(styles.scrollToExplore, 'link')}
						ref={scrollToExploreRef}
					>
						<span>Scroll To Explore</span>
						<MouseIcon className={styles.mouseIcon} />
					</div>
				</div>
			</div>
		</section>
	)
}
