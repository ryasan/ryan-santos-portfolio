import styles from '~/styles/components/sections/hero-section.module.scss'
import { HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const mockTitleWords = ['Creative', 'Frontend', 'Engineer']

gsap.registerPlugin(ScrollTrigger)

type HeroSectionProps = {
	data?: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const boxRef = useRef<HTMLDivElement>(null)
	const titleWordRefs = useRef<(HTMLSpanElement | null)[]>([])
	const subtitleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const section = sectionRef.current
		const box = boxRef.current
		const titleWords = titleWordRefs.current
		const subtitle = subtitleRef.current

		if (!section || !box || !subtitle || !titleWords.length) return

		titleWords.forEach((word, index) => {
			gsap.to(word, {
				y: 0,
				duration: 0.75,
				ease: 'power2.inOut',
				delay: index * 0.075,
			})
		})

		gsap.to(subtitle, {
			opacity: 1,
			duration: 1,
			ease: 'power2.out',
			delay: titleWords.length * 0.25,
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

				gsap.to(box, {
					scale,
					opacity,
					duration: 0.1,
					ease: 'none',
				})
			},
		})

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.trigger === section) {
					trigger.kill()
				}
			})
		}
	}, [])

	return (
		<section className={styles.section} ref={sectionRef}>
			<div className="container">
				<div className={styles.stickyBox} ref={boxRef}>
					<h1 className={styles.title}>
						{mockTitleWords.map((word, index) => (
							<span className={styles.wordMask} key={index}>
								<span
									className={styles.word}
									ref={(el) => (titleWordRefs.current[index] = el)}
								>
									{word}
								</span>
								{index < mockTitleWords.length - 1 && <br />}
							</span>
						))}
					</h1>
					<div className={styles.subtitle} ref={subtitleRef}>
						<div>
							Currently building <br /> things @ Envoy
						</div>
						<div>(2022 - Present)</div>
					</div>
				</div>
				<div className={styles.box} />
			</div>
		</section>
	)
}
