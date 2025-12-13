import { MarqueeSection as MarqueeSectionType } from '~/graphql/__generated/sdk'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import styles from '~/styles/components/sections/marquee-section.module.scss'

const mockItems = [
	{ text: 'STRATEGIC', delimiter: 'purpose' },
	{ text: 'COLLABORATIVE', delimiter: 'human' },
	{ text: 'EXPERIMENTAL', delimiter: 'integrity' },
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
						xPercent: isReverse ? -60 : -57,
					},
					{
						xPercent: isReverse ? -57 : -60,
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
										<span
											className={clsx(
												'h1',
												styles.text,
												styles.outline
											)}
										>
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
