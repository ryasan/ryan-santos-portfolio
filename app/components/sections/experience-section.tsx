import RichText from '~/components/rich-text'
import clsx from 'clsx'
import gsap from 'gsap'
import styles from '~/styles/components/sections/experience-section.module.scss'
import { ExperienceSection as ExperienceSectionType } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type ExperienceSectionProps = {
	data?: ExperienceSectionType
	id?: string
}

function extractYear(date: string) {
	return date.split('-')[0]
}

export default function ExperienceSection({
	data,
	id,
}: ExperienceSectionProps) {
	const titleRef = useRef<HTMLHeadingElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const title = titleRef.current
			const container = containerRef.current

			if (!title || !container) return

			ScrollTrigger.create({
				trigger: title,
				start: 'bottom bottom-=200px',
				onEnter: () => {
					gsap.to(title, {
						opacity: 1,
						duration: 1,
						ease: 'power2.out',
					})
				},
			})

			const items = gsap.utils.toArray<HTMLElement>(container.children)

			items.forEach((item) => {
				// gsap.fromTo(
				// 	item,
				// 	{ opacity: 0 },
				// 	{
				// 		opacity: 1,
				// 		scrollTrigger: {
				// 			trigger: item,
				// 			start: 'top 70%',
				// 			end: 'top 40%',
				// 			scrub: true,
				// 		},
				// 	},
				// )

				ScrollTrigger.create({
					trigger: item,
					start: 'bottom bottom-=100px',
					onEnter: () => {
						gsap.to(item, {
							opacity: 1,
							duration: 1,
							ease: 'power2.out',
						})
					},
				})
			})
		},
		{ scope: containerRef },
	)

	return (
		<section className={styles.experienceSection} id={id}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && (
						<h2 className={clsx(styles.title, 'h2')} ref={titleRef}>
							{data?.title}
						</h2>
					)}

					<div className={styles.experienceList} ref={containerRef}>
						{data?.experienceCollection?.items?.map((item, index) => {
							if (!item) return null

							return (
								<div className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.count}>
										<div className={clsx(styles.countNumber, 'h3')}>
											{index < 10 ? `0${index + 1}` : index + 1}
										</div>
									</div>
									<div className={styles.info}>
										{item.jobTitle && (
											<div className={clsx(styles.jobTitle, 'h5')}>
												{item.jobTitle}
											</div>
										)}
										{item.company && (
											<div className={clsx(styles.company, 'h3')}>
												{item.company}
											</div>
										)}
										{item.description?.json && (
											<div className={clsx(styles.description)}>
												<RichText data={item.description.json} />
											</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
