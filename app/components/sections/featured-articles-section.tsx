import RichText from '~/components/rich-text'
import clsx from 'clsx'
import styles from '~/styles/components/sections/featured-articles-section.module.scss'
import  { type FeaturedArticlesSection } from '~/graphql/__generated/sdk'
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

	useGSAP(() => {
		const section = sectionRef.current
		const stickyBox = stickyBoxRef.current
		const title = titleRef.current
		const subtitle = subtitleRef.current
		const articles = document.querySelectorAll(`.${styles.articleCard}`)

		ScrollTrigger.create({
			anticipatePin: 1,
			end: 'bottom bottom',
			pin: stickyBox,
			pinSpacing: false,
			start: 'top top',
			trigger: section,
		})

		ScrollTrigger.create({
			onEnter: () => {
				gsap.to(title, {
					duration: 1,
					ease: 'power2.out',
					opacity: 1,
				})
			},
			start: 'bottom bottom-=200px',
			trigger: title,
		})

		ScrollTrigger.create({
			onEnter: () => {
				gsap.to(subtitle, {
					duration: 1,
					ease: 'power2.out',
					opacity: 1,
				})
			},
			start: 'bottom bottom-=200px',
			trigger: subtitle,
		})

		articles.forEach((article) => {
			ScrollTrigger.create({
				end: 'bottom center-=100px',
				onEnter: () => {
					article.classList.add(styles.active as string)
				},
				onEnterBack: () => {
					article.classList.add(styles.active as string)
				},
				onLeave: () => {
					article.classList.remove(styles.active as string)
				},
				onLeaveBack: () => {
					article.classList.remove(styles.active as string)
				},
				start: 'top center+=100px',
				trigger: article,
			})
		})
	}, [])

	return (
		<section
			className={styles.featuredArticlesSection}
			id={id}
			ref={sectionRef}
		>
			<div className="container">
				<div className={styles.stickyBox} ref={stickyBoxRef}>
					{data?.title && (
						<h2 className={clsx(styles.title, 'h1 mb-56')} ref={titleRef}>
							{data.title}
						</h2>
					)}
					{data?.subtitle && (
						<p className={clsx(styles.subtitle, 'h6')} ref={subtitleRef}>
							{data.subtitle}
						</p>
					)}
				</div>

				{data?.featuredArticlesCollection && (
					<div className={styles.articleList}>
						{data.featuredArticlesCollection.items
							.map(normalizeSlide)
							.map((article, index) => {
								if (!article) return null
								const cardIndex = index % cardAlignments.length
								const cardAlignment = cardAlignments[cardIndex] || 'center'

								return (
									<div
										className={clsx(
											styles.articleContainer,
											styles[cardAlignment],
										)}
										key={article.id}
									>
										<div className={styles.articleCard}>
											<div className={styles.articleImage}>
												{article?.image && (
													<img
														alt={article.title || ''}
														className={styles.articleImage}
														src={article.image}
													/>
												)}
											</div>
											<div className={styles.articleContent}>
												{article.title && (
													<h3 className={styles.articleTitle}>
														{article.title}
													</h3>
												)}
												{article.caption && (
													<p
														className={styles.articleCaption}
													>
														{article.caption}
													</p>
												)}
												{article.description && (
													<RichText
														className={styles.articleDescription}
														data={article.description}
													/>
												)}
												{article.link && (
													<a
														className={clsx(styles.articleLink, 'button')}
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
