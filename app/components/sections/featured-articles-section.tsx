import RichText from '~/components/rich-text'
import clsx from 'clsx'
import { type FeaturedArticlesSection } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { normalizeSlide } from '~/utils'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import styles from './featured-articles-section.module.css'

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
			const cardClass = styles.card
			const activeClass = styles.active
			const articles =
				(cardClass && section?.querySelectorAll(`.${cardClass}`)) || []

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
				if (!activeClass) return

				ScrollTrigger.create({
					end: 'bottom center-=100px',
					onEnter: () => {
						article.classList.add(activeClass)
					},
					onEnterBack: () => {
						article.classList.add(activeClass)
					},
					onLeave: () => {
						article.classList.remove(activeClass)
					},
					onLeaveBack: () => {
						article.classList.remove(activeClass)
					},
					start: 'top center+=100px',
					trigger: article,
				})
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={styles.root} id={id} ref={sectionRef}>
			<div className="container">
				<div className={styles.stickyBox} ref={stickyBoxRef}>
					{data?.title && (
						<h2 className={clsx(styles.title, 'h1 mb-32')} ref={titleRef}>
							{data.title}
						</h2>
					)}
					{data?.subtitle && (
						<p className={clsx(styles.subtitle, 'body-1')} ref={subtitleRef}>
							{data.subtitle}
						</p>
					)}
				</div>

				{data?.featuredArticlesCollection && (
					<div className={styles.list}>
						{data.featuredArticlesCollection.items
							.map(normalizeSlide)
							.map((article, index) => {
								if (!article) return null
								const cardIndex = index % cardAlignments.length
								const cardAlignment = cardAlignments[cardIndex] || 'center'

								return (
									<div
										className={clsx(
											styles.container,
											styles[cardAlignment],
										)}
										key={article.id}
									>
										<div className={styles.card}>
											<div className={styles.image}>
												{article?.image && (
													<img
														alt={article.image?.description || ''}
														className={styles.image}
														src={article.image?.url || ''}
													/>
												)}
											</div>
											<div className={styles.content}>
												{article.title && (
													<h3 className={styles.cardTitle}>
														{article.title}
													</h3>
												)}
												{article.caption && (
													<p className={styles.caption}>{article.caption}</p>
												)}
												{article.description && (
													<RichText
														className={styles.description}
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
														className={clsx(styles.link, 'button')}
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
