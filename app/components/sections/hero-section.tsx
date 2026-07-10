import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { MouseIcon } from '~/components/icons'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const scrollToExploreRef = useRef<HTMLDivElement>(null)
	const scrollToExploreWrapperRef = useRef<HTMLDivElement>(null)
	const accentRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const scrollToExplore = scrollToExploreRef.current
			const scrollToExploreWrapper = scrollToExploreWrapperRef.current
			const accent = accentRef.current

			if (
				!section ||
				!stickyBox ||
				!scrollToExplore ||
				!scrollToExploreWrapper ||
				!accent
			)
				return

			const words = gsap.utils.toArray<HTMLElement>('.word')
			words.forEach((word, wordIndex) => {
				const chars = word.querySelectorAll('.char')
				gsap.to(chars, {
					delay: wordIndex * 0.05,
					duration: 0.5,
					ease: 'power3.out',
					stagger: 0.003,
					y: 0,
				})
			})

			gsap.to(scrollToExplore, {
				delay: 1.2,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(accent, {
				delay: 1.2,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					end: '+=100%',
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
								[LOC: 34.0522° N, 118.2437° W]
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
							<h1 className={styles.title}>
								{data.titleWords?.map((word, index) => {
									if (!word) return null

									return (
										<span className={styles.wordMask} key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span
														className={clsx(styles.word, 'word')}
														key={wordIndex}
													>
														{singleWord.split('').map((char, charIndex) => (
															<span
																className={clsx(styles.char, 'char')}
																key={charIndex}
															>
																{char}
															</span>
														))}
													</span>
												))
												.reduce<ReactNode[]>((acc, curr, wordIndex) => {
													if (wordIndex === 0) return [curr]
													return [...acc, ' ', curr]
												}, [])}
										</span>
									)
								})}
							</h1>
						)}

						{data?.titleWordsMobile && (
							<h1 className={clsx(styles.title, styles.mobile)}>
								{data.titleWordsMobile?.map((word, index) => {
									if (!word) return null

									return (
										<span className={styles.wordMask} key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span
														className={clsx(styles.word, 'word')}
														key={wordIndex}
													>
														{singleWord.split('').map((char, charIndex) => (
															<span
																className={clsx(styles.char, 'char')}
																key={charIndex}
															>
																{char}
															</span>
														))}
													</span>
												))
												.reduce<ReactNode[]>((acc, curr, wordIndex) => {
													if (wordIndex === 0) return [curr]
													return [...acc, ' ', curr]
												}, [])}
										</span>
									)
								})}
							</h1>
						)}
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
