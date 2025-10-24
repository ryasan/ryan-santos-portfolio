import clsx from 'clsx'
import styles from '~/styles/components/sections/featured-articles-section.module.scss'
import type { Projects, Blog } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils'

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
	return (
		<section className={styles.featuredArticlesSection}>
			<div className="container">
				<div className={styles.container}>
					<div className={styles.stickyContent}>
						<h2 className="h1 mb-56">{data?.title}</h2>
						<p className="body-1">(SCROLL TO EXPLORE)</p>
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
			</div>
		</section>
	)
}
