import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { ArrowRightIcon } from '~/components/icons'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

			gsap.to('.word', {
				duration: 0.75,
				ease: 'power2.inOut',
				stagger: 0.1,
				y: 0,
			})

			gsap.to(subtitle, {
				delay: 0.75,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(scrollToExplore, {
				delay: 0.75,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			ScrollTrigger.create({
				end: '+=120%',
				onUpdate: (self) => {
					const progress = self.progress
					const scale = 1 - progress * 0.3
					const opacity = 1 - progress * 1

					gsap.to(stickyBox, {
						duration: 0.1,
						ease: 'none',
						opacity,
						// scale,
					})

					gsap.to(scrollToExplore, {
						duration: 0.1,
						ease: 'none',
						opacity,
					})
				},
				pin: true,
				scrub: 1,
				start: 'top top',
				trigger: section,
			})
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
										<span className={clsx(styles.word, 'word')}>{word}</span>
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
					<ArrowRightIcon className={styles.arrowRightIcon} />
				</div>
			</div>
		</section>
	)
}
