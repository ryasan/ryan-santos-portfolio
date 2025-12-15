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
	const progressBarRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const title = titleRef.current
			const container = containerRef.current
			const progressBar = progressBarRef.current

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
			// Filter out the progress bar from items if it's a child
			const experienceItems = items.filter((item) =>
				item.classList.contains(styles.experienceItem || ''),
			)

			experienceItems.forEach((item) => {
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

			// Progress Bar Animation
			const numbers = gsap.utils.toArray<HTMLElement>(
				'.experience-number-target',
			)

			if (progressBar && numbers.length > 0) {
				const updatePosition = () => {
					const containerRect = container.getBoundingClientRect()
					const firstNum = numbers[0]
					const lastNum = numbers[numbers.length - 1]

					if (!firstNum || !lastNum) return

					const firstRect = firstNum.getBoundingClientRect()
					const lastRect = lastNum.getBoundingClientRect()

					const left = firstRect.left - containerRect.left + firstRect.width / 2
					const top = firstRect.top - containerRect.top + firstRect.height / 2
					const height = lastRect.top - firstRect.top

					gsap.set(progressBar, {
						left: left,
						top: top,
						height: height,
					})
				}

				updatePosition()
				window.addEventListener('resize', updatePosition)

				const firstNum = numbers[0]
				const lastNum = numbers[numbers.length - 1]

				if (!firstNum || !lastNum) return

				// We need relative positions for ScrollTrigger start/end if we trigger on container
				// Or we can use the elements themselves as reference points

				gsap.fromTo(
					progressBar.firstElementChild,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: 'none',
						scrollTrigger: {
							trigger: container,
							start: () => {
								const containerRect = container.getBoundingClientRect()
								const firstRect = firstNum.getBoundingClientRect()
								// When the center of the first number hits the center of viewport
								// Offset from container top
								const offset =
									firstRect.top - containerRect.top + firstRect.height / 2
								return `top+=${offset} center`
							},
							end: () => {
								const containerRect = container.getBoundingClientRect()
								const lastRect = lastNum.getBoundingClientRect()
								const offset =
									lastRect.top - containerRect.top + lastRect.height / 2
								return `top+=${offset} center`
							},
							scrub: true,
						},
					},
				)

				return () => window.removeEventListener('resize', updatePosition)
			}
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
						<div className={styles.progressBar} ref={progressBarRef}>
							<div className={styles.progressBarInner} />
						</div>
						{data?.experienceCollection?.items?.map((item, index) => {
							if (!item) return null

							return (
								<div className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.count}>
										<div
											className={clsx(
												styles.countNumber,
												'h4',
												'experience-number-target',
											)}
										>
											{index < 10 ? `0${index + 1}` : index + 1}
										</div>
									</div>
									<div className={styles.info}>
										{item.jobTitle && (
											<div className={clsx(styles.jobTitle, 'h6')}>
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
