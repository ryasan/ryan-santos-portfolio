import styles from '~/styles/components/sections/featured-articles-section.module.scss'
import type { Projects, Blog } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils/normalize-data'

type FeaturedArticlesSectionProps = {
	data?: {
		title: string
		articles: (Projects | Blog)[]
	}
}

export default function FeaturedArticlesSection({
	data,
}: FeaturedArticlesSectionProps) {
	console.log(data)
	return (
		<section className={styles.featuredArticlesSection}>
			<div className="container">
				<div className={styles.container}>
					<div className={styles.stickyContent}>
						<h2 className="h2">{data?.title}</h2>
						<p className="body-1">(SCROLL TO EXPLORE)</p>
					</div>
					<div className={styles.articles}>
						{data?.articles.map(normalizeSlide).map((article) => {
							if (!article || !article.image) return null
							console.log(article)
							return (
								<img
									className={styles.articleImage}
									src={article.image}
									alt={article.title || 'Featured Article'}
									key={article.id}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
