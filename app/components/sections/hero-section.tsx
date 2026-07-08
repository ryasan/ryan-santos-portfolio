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

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const subtitle = subtitleRef.current
			const scrollToExplore = scrollToExploreRef.current

			if (!section || !stickyBox || !scrollToExplore) return

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
				delay: 1,
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
				scrollToExplore,
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
				<div
					className={clsx(styles.scrollToExplore, 'link')}
					ref={scrollToExploreRef}
				>
					<span>Scroll To Explore</span>
					<MouseIcon className={styles.mouseIcon} />
				</div>
			</div>
		</section>
	)
}
