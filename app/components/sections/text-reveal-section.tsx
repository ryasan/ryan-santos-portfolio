import TextBlock from '~/components/text-block'
import styles from '~/styles/components/sections/text-reveal-section.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const mockTextBlocks = [
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
		type: 'heading',
	},
	{
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
		type: 'heading',
	},
]

gsap.registerPlugin(ScrollTrigger)

type TextRevealSectionProps = {
	data?: any
}

export default function TextRevealSection({ data }: TextRevealSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const blockRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const section = sectionRef.current
		const blocks = blockRefs.current.filter(Boolean)

		if (!section || blocks.length === 0) return

		// Hide all blocks when scrolling up and section is no longer in view
		ScrollTrigger.create({
			trigger: section,
			onLeaveBack: () => {
				blocks.forEach((block) => {
					gsap.to(block, { opacity: 0, duration: 0.6, ease: 'power2.out' })
				})
			},
		})

		blocks.forEach((block, index) => {
			ScrollTrigger.create({
				trigger: block,
				start: 'bottom bottom',
				end: 'center center',
				onEnter: (args: any) => {
					// Fade in current block
					gsap.to(block, { opacity: 1, duration: 0.6, ease: 'power2.out' })
					// Fade out all other blocks
					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== index) {
							gsap.to(otherBlock, {
								opacity: 0,
								duration: 0.6,
								ease: 'power2.out',
							})
						}
					})
				},
				onEnterBack: (args: any) => {
					// Fade in current block when scrolling up
					gsap.to(block, { opacity: 1, duration: 0.6, ease: 'power2.out' })
					// Fade out all other blocks
					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== index) {
							gsap.to(otherBlock, {
								opacity: 0,
								duration: 0.6,
								ease: 'power2.out',
							})
						}
					})
				},
			})
		})

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.trigger) {
					if (blocks.includes(trigger.trigger as HTMLDivElement)) {
						trigger.kill()
					}
					if (trigger.trigger === section) {
						trigger.kill()
					}
				}
			})
		}
	}, [mockTextBlocks.length])

	return (
		<section className={styles.textRevealSection} ref={sectionRef}>
			<div className="container">
				<div className={styles.textBlocks}>
					{mockTextBlocks.map((block: any, index: number) => (
						<div
							className={styles.textBlockWrapper}
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
