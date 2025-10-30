import RichText from '~/components/rich-text'
import clsx from 'clsx'
import styles from '~/styles/components/sections/featured-articles-section.module.scss'
import type { FeaturedArticlesSection } from '~/graphql/__generated/sdk'
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
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		const title = titleRef.current
		const subtitle = subtitleRef.current

		if (!title || !subtitle) return

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

		ScrollTrigger.create({
			trigger: subtitle,
			start: 'bottom bottom-=200px',
			onEnter: () => {
				gsap.to(subtitle, {
					opacity: 1,
					duration: 1,
					ease: 'power2.out',
				})
			},
		})
	}, [])

	return (
		<section className={styles.section} id={id}>
			<div className="container">
				<div className={styles.stickyBox}>
					{data?.title && (
						<h2 className={clsx(styles.title, 'h1 mb-56')} ref={titleRef}>
							{data.title}
						</h2>
					)}
					{data?.subtitle && (
						<p className={clsx(styles.subtitle, 'h5')} ref={subtitleRef}>
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
														className={styles.articleImage}
														src={article.image}
														alt={article.title || ''}
													/>
												)}
											</div>
											<div className={styles.articleContent}>
												{article.title && (
													<h3 className={clsx(styles.articleTitle, 'h3 mb-16')}>
														{article.title}
													</h3>
												)}
												{article.caption && (
													<p
														className={clsx(styles.articleCaption, 'h4 mb-16')}
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
														target="_blank"
														rel="noopener noreferrer"
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
