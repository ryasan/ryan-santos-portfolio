import Teleport from '~/components/teleport'
import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { ArrowRightIcon } from '~/components/icons'
import { HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'

type HeroSectionProps = {
	id?: string
	data?: HeroSectionType
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const subtitleRef = useRef<HTMLDivElement>(null)
	const scrollToExploreRef = useRef<HTMLDivElement>(null)

	const [isTeleported, setIsTeleported] = useState(false)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const subtitle = subtitleRef.current
			const scrollToExplore = scrollToExploreRef.current

			if (
				!section ||
				!stickyBox ||
				!subtitle ||
				!scrollToExplore ||
				!isTeleported
			)
				return

			gsap.to('.word', {
				y: 0,
				duration: 0.75,
				ease: 'power2.inOut',
				stagger: 0.1,
			})

			gsap.to(subtitle, {
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
				delay: 0.75,
			})

			gsap.to(scrollToExplore, {
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
				delay: 0.75,
			})

			ScrollTrigger.create({
				trigger: section,
				pin: stickyBox,
				start: 'top top',
				end: 'bottom bottom-=300px',
				pinSpacing: false,
				anticipatePin: 1,
			})

			ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress
					const scale = 1 - progress * 0.3
					const opacity = 1 - progress * 1

					gsap.to(stickyBox, {
						scale,
						opacity,
						duration: 0.1,
						ease: 'none',
					})

					gsap.to(scrollToExplore, {
						opacity,
						duration: 0.1,
						ease: 'none',
					})
				},
			})

			ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress
					const scale = 1 - progress * 0.3
					const opacity = 1 - progress * 1

					gsap.to(stickyBox, {
						scale,
						opacity,
						duration: 0.1,
						ease: 'none',
					})

					gsap.to(scrollToExplore, {
						opacity,
						duration: 0.1,
						ease: 'none',
					})
				},
			})
		},
		{ scope: sectionRef, dependencies: [isTeleported] },
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
					<div className={clsx(styles.subtitle, 'h5')} ref={subtitleRef}>
						{data?.leftSubtitle && (
							<div className={styles.leftSubtitle}>{data?.leftSubtitle}</div>
						)}
						{data?.rightSubtitle && (
							<div className={styles.rightSubtitle}>{data?.rightSubtitle}</div>
						)}
					</div>
				</div>
				<Teleport to="#global-main" onReady={() => setIsTeleported(true)}>
					<div
						className={clsx(styles.scrollToExplore, 'link')}
						ref={scrollToExploreRef}
					>
						<span>Scroll To Explore</span>
						<ArrowRightIcon className={styles.arrowRightIcon} />
					</div>
				</Teleport>
				<div className={styles.spacer} />
			</div>
		</section>
	)
}
