import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { ArrowRightIcon } from '~/components/icons'
import { HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type HeroSectionProps = {
	id?: string
	data?: HeroSectionType
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

			if (!section || !stickyBox || !subtitle || !scrollToExplore) return

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
			gsap.to(section, {
				scrollTrigger: {
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
				},
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={styles.section} id={id} ref={sectionRef}>
			<div className="container">
				<div className={styles.stickyBox} ref={stickyBoxRef}>
					{data?.title && (
						<h1 className={styles.title}>
							{data.titleWords?.map((word, index, array) => (
								<span className={styles.wordMask} key={index}>
									<span className={clsx(styles.word, 'word')}>{word}</span>
									{index < array.length - 1 && <br />}
								</span>
							))}
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
				{data?.isTopOfPage && (
					<div className={clsx(styles.scrollToExplore, 'link')} ref={scrollToExploreRef}>
						<span>Scroll to explore</span>
						<ArrowRightIcon className={styles.arrowRightIcon} />
					</div>
				)}
				<div className={styles.box} />
			</div>
		</section>
	)
}
