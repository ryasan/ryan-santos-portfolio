import { clsx } from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MarqueeSection as MarqueeSectionType } from '~/graphql/__generated/sdk'
import styles from '~/styles/components/sections/marquee-section.module.scss'

const mockItems = [
	{ text: 'STRATEGIC', delimiter: 'mindful' },
	{ text: 'INNOVATIVE', delimiter: 'creative' },
	{ text: 'DEDICATED', delimiter: 'delivery' },
]

type MarqueeSectionProps = {
	id?: string
	data: MarqueeSectionType
}

export default function MarqueeSection({ data, id }: MarqueeSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const tracks = gsap.utils.toArray<HTMLElement>(`.${styles.track}`)

			tracks.forEach((track, index) => {
				const isReverse = index % 2 !== 0

				gsap.fromTo(
					track,
					{
						xPercent: isReverse ? -5 : 0,
					},
					{
						xPercent: isReverse ? 0 : -5,
						ease: 'none',
						scrollTrigger: {
							trigger: sectionRef.current,
							start: 'top bottom',
							end: 'bottom top',
							scrub: 2,
						},
					},
				)
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={styles.marqueeSection} id={id} ref={sectionRef}>
			{mockItems.map((item, rowIndex) => (
				<div className={styles.marquee} key={rowIndex}>
					<div className={styles.track}>
						<div className={styles.item}>
							{/* Create repeated array of the specific item for this row */}
							{Array(8)
								.fill(item)
								.map((repeatedItem, index) => (
									<div
										key={`${rowIndex}-${index}`}
										style={{ display: 'contents' }}
									>
										<span className={clsx(styles.text, 'h1')}>
											{repeatedItem.text}
										</span>
										<span className={styles.delimiter}>
											{repeatedItem.delimiter}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			))}
		</section>
	)
}
