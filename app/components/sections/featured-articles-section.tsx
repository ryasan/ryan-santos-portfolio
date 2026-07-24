import RichText from '~/components/rich-text'
import clsx from 'clsx'
import { type FeaturedArticlesSection } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { normalizeSlide } from '~/utils'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const ns = 'featured-articles-section'
const cardAlignments = ['left', 'right', 'center']

type FeaturedArticlesSectionProps = {
	data?: FeaturedArticlesSection
	id?: string
}

export default function FeaturedArticlesSection({
	data,
	id,
}: FeaturedArticlesSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const title = titleRef.current
			const subtitle = subtitleRef.current
			const articles = section?.querySelectorAll(`.${ns}__card`) ?? []

			ScrollTrigger.create({
				anticipatePin: 1,
				end: 'bottom bottom',
				pin: stickyBox,
				pinSpacing: false,
				start: 'top top',
				trigger: section,
			})

			gsap.fromTo(
				title,
				{ opacity: 0 },
				{
					ease: 'power2.out',
					opacity: 1,
					scrollTrigger: {
						end: 'top center',
						once: true,
						start: 'top bottom-=150px',
						trigger: title,
					},
				},
			)

			gsap.fromTo(
				subtitle,
				{ opacity: 0 },
				{
					ease: 'power2.out',
					opacity: 1,
					scrollTrigger: {
						end: 'top center',
						once: true,
						start: 'top bottom-=150px',
						trigger: subtitle,
					},
				},
			)

			articles.forEach((article) => {
				ScrollTrigger.create({
					end: 'bottom center',
					onEnter: () => {
						article.classList.add('active')
					},
					onEnterBack: () => {
						article.classList.add('active')
					},
					onLeave: () => {
						article.classList.remove('active')
					},
					onLeaveBack: () => {
						article.classList.remove('active')
					},
					start: 'top center',
					trigger: article,
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={ns} id={id} ref={sectionRef}>
			<div className="container">
				<div className={`${ns}__sticky-box`} ref={stickyBoxRef}>
					{data?.title && (
						<h2 className={clsx(`${ns}__title`, 'h2 mb-32')} ref={titleRef}>
							{data.title}
						</h2>
					)}
					{data?.subtitle && (
						<p className={clsx(`${ns}__subtitle`, 'body-1')} ref={subtitleRef}>
							{data.subtitle}
						</p>
					)}
				</div>

				{data?.featuredArticlesCollection && (
					<div className={`${ns}__list`}>
						{data.featuredArticlesCollection.items
							.map(normalizeSlide)
							.map((article, index) => {
								if (!article) return null
								const cardIndex = index % cardAlignments.length
								const cardAlignment = cardAlignments[cardIndex] || 'center'

								return (
									<div
										className={clsx(`${ns}__container`, cardAlignment)}
										key={article.id}
									>
										<div className={`${ns}__card`}>
											<div className={`${ns}__image`}>
												{article?.image && (
													<img
														alt={article.image?.description || ''}
														className={`${ns}__image`}
														src={article.image?.url || ''}
													/>
												)}
											</div>
											<div className={`${ns}__content`}>
												{article.title && (
													<h3 className={`${ns}__card-title`}>
														{article.title}
													</h3>
												)}
												{article.caption && (
													<p className={`${ns}__caption`}>{article.caption}</p>
												)}
												{article.description && (
													<RichText
														className={`${ns}__description`}
														data={article.description}
													/>
												)}
												{article.link && (
													<a
														aria-label={
															article.title
																? `View project: ${article.title}`
																: 'View project'
														}
														className={clsx(`${ns}__link`, 'button')}
														href={article.link || ''}
														rel="noopener noreferrer"
														target="_blank"
													>
														View Project
													</a>
												)}
											</div>
										</div>
									</div>
								)
							})}
					</div>
				)}
			</div>
		</section>
	)
}
