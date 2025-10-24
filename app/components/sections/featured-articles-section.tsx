import clsx from 'clsx'
import styles from '~/styles/components/sections/featured-articles-section.module.scss'
import type { Projects, Blog } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { normalizeSlide } from '~/utils'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const cardAlignments = ['left', 'right', 'center']

type FeaturedArticlesSectionProps = {
	data?: {
		title: string
		articles: (Projects | Blog)[]
	}
}

export default function FeaturedArticlesSection({
	data,
}: FeaturedArticlesSectionProps) {
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		const title = titleRef.current
		const subtitle = subtitleRef.current

		if (!title || !subtitle) return

		ScrollTrigger.create({
			trigger: title,
			start: 'bottom bottom-=200px',
			onEnter: () => {
				gsap.to(title, { opacity: 1, duration: 1, ease: 'power2.out' })
			},
		})

		ScrollTrigger.create({
			trigger: subtitle,
			start: 'bottom bottom-=200px',
			onEnter: () => {
				gsap.to(subtitle, { opacity: 1, duration: 1, ease: 'power2.out' })
			},
		})
	}, [])

	return (
		<section className={styles.featuredArticlesSection}>
			<div className="container">
				<div className={styles.stickyBox}>
					<h2 className={clsx(styles.title, 'h1 mb-56')} ref={titleRef}>
						{data?.title}
					</h2>
					<p className={clsx(styles.subtitle, 'body-1')} ref={subtitleRef}>
						(SCROLL TO EXPLORE)
					</p>
				</div>

				<div className={styles.articleList}>
					{data?.articles.map(normalizeSlide).map((article, index) => {
						if (!article) return null
						const cardIndex = index % cardAlignments.length
						const cardAlignment = cardAlignments[cardIndex] || 'center'

						return (
							<div
								className={clsx(styles.articleCard, styles[cardAlignment])}
								key={index}
							>
								<div className={styles.articleImage}>
									{article?.image && (
										<img
											className={styles.articleImage}
											src={article.image}
											alt={article.title || ''}
										/>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
