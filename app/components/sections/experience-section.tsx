import RichText from '~/components/rich-text'
import clsx from 'clsx'
import gsap from 'gsap'
import { type ExperienceSection as ExperienceSectionType } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type ExperienceSectionProps = {
	data?: ExperienceSectionType
	id?: string
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

			if (!container) return

			gsap.fromTo(
				title,
				{ opacity: 0 },
				{
					ease: 'power2.out',
					opacity: 1,
					scrollTrigger: {
						end: 'top center',
						scrub: 1,
						start: 'top bottom-=150px',
						trigger: title,
					},
				},
			)

			const items = gsap.utils.toArray<HTMLElement>(container.children)
			const experienceItems = items.filter((item) =>
				item.classList.contains('experience-item'),
			)

			experienceItems.forEach((item) => {
				gsap.fromTo(
					item,
					{ opacity: 0 },
					{
						ease: 'power2.out',
						opacity: 1,
						scrollTrigger: {
							end: 'top center',
							scrub: 1,
							start: 'top bottom-=150px',
							trigger: item,
						},
					},
				)
			})

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
						height: height,
						left: left,
						top: top,
					})
				}

				updatePosition()
				window.addEventListener('resize', updatePosition)

				const firstNum = numbers[0]
				const lastNum = numbers[numbers.length - 1]

				if (!firstNum || !lastNum) return

				gsap.fromTo(
					progressBar.firstElementChild,
					{ scaleY: 0 },
					{
						ease: 'none',
						scaleY: 1,
						scrollTrigger: {
							end: () => {
								const containerRect = container.getBoundingClientRect()
								const lastRect = lastNum.getBoundingClientRect()
								const offset =
									lastRect.top - containerRect.top + lastRect.height / 2
								return `top+=${offset} center+=100px`
							},
							scrub: 1,
							start: () => {
								const containerRect = container.getBoundingClientRect()
								const firstRect = firstNum.getBoundingClientRect()
								const offset =
									firstRect.top - containerRect.top + firstRect.height / 2
								return `top+=${offset} center+=100px`
							},
							trigger: container,
						},
					},
				)

				return () => window.removeEventListener('resize', updatePosition)
			}
		},
		{ scope: containerRef },
	)

	return (
		<section className="experience-section" id={id}>
			<div className="container">
				<div className="box">
					{data?.title && (
						<h2 className={clsx('title', 'h2')} ref={titleRef}>
							{data?.title}
						</h2>
					)}
					<div className="experience-list" ref={containerRef}>
						<div className="progress-bar" ref={progressBarRef}>
							<div className="progress-bar-inner" />
						</div>
						{data?.experienceCollection?.items?.map((item, index) => {
							if (!item) return null

							return (
								<div className="experience-item" key={item.sys.id}>
									<div className="count">
										<div
											className={clsx(
												'count-number',
												'h4',
												'experience-number-target',
											)}
										>
											{index < 10 ? `0${index + 1}` : index + 1}
										</div>
									</div>
									<div className="info">
										{item.jobTitle && (
											<div className={clsx('job-title', 'h6')}>
												{item.jobTitle}
											</div>
										)}
										{item.company && (
											<div className={clsx('company', 'h2')}>
												{item.company}
											</div>
										)}
										{item.description?.json && (
											<div className="description">
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
