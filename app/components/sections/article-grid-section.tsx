import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/article-grid-section.module.scss'
import { ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'
import { ListBulletsIcon, SquaresFourIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils'
import { useMatchMedia } from '~/hooks'
import { useEffect, useState } from 'react'

type ArticleGridSectionProps = {
	data?: ArticleGridSectionType
}

export default function ArticleGridSection({ data }: ArticleGridSectionProps) {
	const [view, setView] = useState<'list' | 'grid'>('list')
	const { isMatching } = useMatchMedia('(max-width:768px)', false)

	useEffect(() => {
		if (isMatching) setView('grid')
	}, [isMatching])

	return (
		<section className={styles.articleGridSection}>
			<div className="container">
				<div className={styles.header}>
					<h2 className="h1">{data?.title}</h2>
					{!isMatching && (
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
					)}
				</div>

				<div
					className={clsx(
						styles.articleList,
						view === 'list' && styles.list,
						view === 'grid' && styles.grid,
					)}
				>
					{data?.articlesCollection?.items
						.map(normalizeSlide)
						.map((article) => {
							if (!article) return null

							return (
								<ArticleCard
									key={article.id}
									data={article}
									horizontal={view === 'list'}
									isBig={false}
								/>
							)
						})}
				</div>
			</div>
		</section>
	)
}
