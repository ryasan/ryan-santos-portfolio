import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/article-grid-section.module.scss'
import { ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'
import { ListBulletsIcon, SquaresFourIcon } from '~/components/icons'
import { normalizeData } from '~/utils'
import { useMatchMedia } from '~/hooks'
import { useEffect, useState } from 'react'

type ArticleGridSectionProps = {
	data?: ArticleGridSectionType
}

export default function ArticleGridSection({ data }: ArticleGridSectionProps) {
	const [view, setView] = useState<'list' | 'grid'>('list')
	const { isMatching } = useMatchMedia('(max-width:768px)', true)

	// prettier-ignore
	const normalizedArticles = data?.articlesCollection?.items?.map((article) => {
		if (!article) return null

		const articleType = article.__typename

		if (articleType === 'Blog') return normalizeData.fromBlogToCard(article)
		if (articleType === 'Projects') return normalizeData.fromProjectsToCard(article)
		else console.warn(`Unknown article type: ${articleType}`)
	})

	useEffect(() => {
		if (isMatching) setView('grid')
	}, [isMatching])

	return (
		<section className={styles.articleGridSection}>
			<div className="container">
				<div className={styles.header}>
					<h2 className="h1">{data?.title}</h2>
					<div className={styles.controls}>
						<button
							className={clsx(
								styles.controlButton,
								view === 'list' && styles.active,
							)}
							title="List view"
							aria-label="Switch to list view"
							onClick={() => setView('list')}
						>
							<ListBulletsIcon />
						</button>
						<button
							className={clsx(
								styles.controlButton,
								view === 'grid' && styles.active,
							)}
							title="Grid view"
							aria-label="Switch to grid view"
							onClick={() => setView('grid')}
						>
							<SquaresFourIcon />
						</button>
					</div>
				</div>

				<ul
					className={clsx(
						styles.articleList,
						view === 'list' && styles.list,
						view === 'grid' && styles.grid,
					)}
				>
					{normalizedArticles?.map((article) => {
						if (!article) return null

						return (
							<li key={article.id}>
								<ArticleCard data={article} horizontal={view === 'list'} isBig={false} />
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
