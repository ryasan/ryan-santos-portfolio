import TextBlock from '~/components/text-block'
import styles from '~/styles/components/sections/text-reveal-section.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const mockTextBlocks = [
	{
		text: 'I build applications that combine performance with thoughtful design.',
		type: 'heading',
	},
]

type TextRevealSectionProps = {
	data?: any
}

export default function TextRevealSection({ data }: TextRevealSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const blockRefs = useRef<(HTMLDivElement | null)[]>([])

	useGSAP(() => {
		const section = sectionRef.current
		const blocks = blockRefs.current.filter(Boolean)

		if (!section || blocks.length === 0) return

		ScrollTrigger.create({
			trigger: section,
			onLeave: () => {
				blocks.forEach((block) => {
					gsap.to(block, {
						y: 100,
						opacity: 0,
						duration: 0.75,
						ease: 'power2.out',
					})
				})
			},
			onLeaveBack: () => {
				blocks.forEach((block) => {
					gsap.to(block, {
						opacity: 0,
						duration: 0.75,
						ease: 'power2.out',
					})
				})
			},
		})

		blocks.forEach((currentBlock, currentIndex) => {
			ScrollTrigger.create({
				trigger: currentBlock,
				start: 'bottom bottom-=150px',
				end: 'top top+=150px',
				onEnter: () => {
					gsap.to(currentBlock, {
						opacity: 1,
						duration: 0.75,
						ease: 'power2.out',
					})

					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex < currentIndex) {
							gsap.to(otherBlock, {
								y: 100,
								opacity: 0,
								duration: 0.75,
								ease: 'power2.out',
							})
						}
					})
				},
				onEnterBack: () => {
					gsap.to(currentBlock, {
						y: 0,
						opacity: 1,
						duration: 0.75,
						ease: 'power2.out',
					})

					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== currentIndex) {
							gsap.to(otherBlock, {
								opacity: 0,
								duration: 0.75,
								ease: 'power2.out',
							})
						}
					})
				},
			})
		})
	}, [])

	return (
		<section className={styles.section} ref={sectionRef}>
			<div className="container">
				<div className={styles.box}>
					{mockTextBlocks.map((block, index) => (
						<div
							className={styles.textBlock}
							ref={(el) => (blockRefs.current[index] = el)}
							key={index}
						>
							<TextBlock block={block} align="center" index={index} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
