import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/article-grid-section.module.scss'
import { ListBulletsIcon, SquaresFourIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils'
import { type ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useState } from 'react'
import { useMatchMedia } from '~/hooks'

type ArticleGridSectionProps = {
	data?: ArticleGridSectionType
	id?: string
}

export default function ArticleGridSection({
	data,
	id,
}: ArticleGridSectionProps) {
	const [view, setView] = useState<'list' | 'grid'>('list')
	const { isMatching } = useMatchMedia('(max-width:768px)', false)

	useEffect(() => {
		if (isMatching) setView('grid')
	}, [isMatching])

	return (
		<section className={styles.articleGridSection} id={id}>
			<div className="container">
				<div className={styles.header}>
					<h2 className="h1">{data?.title}</h2>
					{!isMatching && (
						<div className={styles.controls}>
							<button
								aria-label="Switch to list view"
								className={clsx(
									styles.controlButton,
									view === 'list' && styles.active,
								)}
								onClick={() => setView('list')}
								title="List view"
							>
								<ListBulletsIcon />
							</button>
							<button
								aria-label="Switch to grid view"
								className={clsx(
									styles.controlButton,
									view === 'grid' && styles.active,
								)}
								onClick={() => setView('grid')}
								title="Grid view"
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
									data={article}
									forceDescription={isMatching}
									horizontal={view === 'list'}
									isBig={false}
									key={article.id}
								/>
							)
						})}
				</div>
			</div>
		</section>
	)
}
