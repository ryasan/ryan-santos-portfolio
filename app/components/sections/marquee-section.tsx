import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { type MarqueeSection as MarqueeSectionType } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const ns = 'marquee-section'

const mockItems = [
	{ delimiter: 'purpose', text: 'STRATEGIC' },
	{ delimiter: 'human', text: 'COLLABORATIVE' },
	{ delimiter: 'integrity', text: 'EXPERIMENTAL' },
]

type MarqueeSectionProps = {
	data: MarqueeSectionType
	id?: string
}

export default function MarqueeSection({ id }: MarqueeSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			const tracks = gsap.utils.toArray<HTMLElement>(`.${ns}__track`)

			tracks.forEach((track, index) => {
				const isReverse = index % 2 !== 0

				gsap.fromTo(
					track,
					{
						xPercent: isReverse ? -60 : -57,
					},
					{
						ease: 'none',
						scrollTrigger: {
							end: 'bottom top',
							scrub: 2,
							start: 'top bottom',
							trigger: sectionRef.current,
						},
						xPercent: isReverse ? -57 : -60,
					},
				)
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={ns} id={id} ref={sectionRef}>
			{mockItems.map((item, rowIndex) => (
				<div className={`${ns}__marquee`} key={rowIndex}>
					<div className={`${ns}__track`}>
						<div className={`${ns}__item`}>
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
												`${ns}__text`,
												`${ns}__text--outline`,
											)}
										>
											{repeatedItem.text}
										</span>
										<span className={`${ns}__delimiter`}>
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
