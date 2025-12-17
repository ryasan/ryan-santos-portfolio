import TextBlock from '~/components/text-block'
import styles from '~/styles/components/sections/text-reveal-section.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
	type TextRevealItem,
	type TextRevealSection as TextRevealSectionType,
} from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type TextRevealSectionProps = {
	data?: TextRevealSectionType
	id?: string
}

export default function TextRevealSection({
	data,
	id,
}: TextRevealSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const blockListRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const section = sectionRef.current
		const blockList = blockListRef.current

		if (!section || !blockList) return

		const blocks = gsap.utils.toArray<HTMLDivElement>(blockList.children)

		ScrollTrigger.create({
			onLeave: () => {
				blocks.forEach((block) => {
					gsap.to(block, {
						duration: 0.75,
						ease: 'power2.out',
						opacity: 0,
						y: 100,
					})
				})
			},
			onLeaveBack: () => {
				blocks.forEach((block) => {
					gsap.to(block, {
						duration: 0.75,
						ease: 'power2.out',
						opacity: 0,
					})
				})
			},
			trigger: section,
		})

		blocks.forEach((currentBlock, currentIndex) => {
			ScrollTrigger.create({
				end: 'top top+=150px',
				onEnter: () => {
					gsap.to(currentBlock, {
						duration: 0.75,
						ease: 'power2.out',
						opacity: 1,
					})

					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex < currentIndex) {
							gsap.to(otherBlock, {
								duration: 0.75,
								ease: 'power2.out',
								opacity: 0,
								y: 100,
							})
						}
					})
				},
				onEnterBack: () => {
					gsap.to(currentBlock, {
						duration: 0.75,
						ease: 'power2.out',
						opacity: 1,
						y: 0,
					})

					blocks.forEach((otherBlock, otherIndex) => {
						if (otherIndex !== currentIndex) {
							gsap.to(otherBlock, {
								duration: 0.75,
								ease: 'power2.out',
								opacity: 0,
							})
						}
					})
				},
				start: 'bottom bottom-=150px',
				trigger: currentBlock,
			})
		})
	}, [])

	return (
		<section className={styles.textRevealSection} id={id} ref={sectionRef}>
			<div className="container">
				<div className={styles.box}>
					<div ref={blockListRef}>
						{data?.textRevealListCollection?.items?.map(
							(block: TextRevealItem | null, index: number) => {
								if (!block) return null
								return (
									<TextBlock
										align="center"
										block={block}
										className={styles.textBlock}
										index={index}
										key={index}
									/>
								)
							},
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
