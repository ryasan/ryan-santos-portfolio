import RichText from '~/components/rich-text'
import clsx from 'clsx'
import { type FeaturedArticlesSection } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { normalizeSlide } from '~/utils'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

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
			const articles = section?.querySelectorAll('.article-card') ?? []

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
					end: 'bottom center-=100px',
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
					start: 'top center+=100px',
					trigger: article,
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className="featured-articles-section" id={id} ref={sectionRef}>
			<div className="container">
				<div className="sticky-box" ref={stickyBoxRef}>
					{data?.title && (
						<h2 className={clsx('title', 'h1 mb-56')} ref={titleRef}>
							{data.title}
						</h2>
					)}
					{data?.subtitle && (
						<p className={clsx('subtitle', 'h6')} ref={subtitleRef}>
							{data.subtitle}
						</p>
					)}
				</div>

				{data?.featuredArticlesCollection && (
					<div className="article-list">
						{data.featuredArticlesCollection.items
							.map(normalizeSlide)
							.map((article, index) => {
								if (!article) return null
								const cardIndex = index % cardAlignments.length
								const cardAlignment = cardAlignments[cardIndex] || 'center'

								return (
									<div
										className={clsx('article-container', cardAlignment)}
										key={article.id}
									>
										<div className="article-card">
											<div className="article-image">
												{article?.image && (
													<img
														alt={article.image?.description || ''}
														className="article-image"
														src={article.image?.url || ''}
													/>
												)}
											</div>
											<div className="article-content">
												{article.title && (
													<h3 className="article-title">{article.title}</h3>
												)}
												{article.caption && (
													<p className="article-caption">{article.caption}</p>
												)}
												{article.description && (
													<RichText
														className="article-description"
														data={article.description}
													/>
												)}
												{article.link && (
													<a
														className={clsx('article-link', 'button')}
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
