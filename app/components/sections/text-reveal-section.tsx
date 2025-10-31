import TextBlock from '~/components/text-block'
import styles from '~/styles/components/sections/text-reveal-section.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
	TextRevealItem,
	TextRevealSection as TextRevealSectionType,
} from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type TextRevealSectionProps = {
	id?: string
	data?: TextRevealSectionType
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
		<section className={styles.section} id={id} ref={sectionRef}>
			<div className="container">
				<div className={styles.box}>
					<div ref={blockListRef}>
						{data?.textRevealListCollection?.items?.map(
							(block: TextRevealItem | null, index: number) => {
								if (!block) return null
								return (
									<TextBlock
										className={styles.textBlock}
										block={block}
										align="center"
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
