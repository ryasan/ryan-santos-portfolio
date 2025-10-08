import clsx from 'clsx'
import styles from '~/styles/components/sections/article-grid-section.module.scss'
import { ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'
import { ListBulletsIcon, SquaresFourIcon } from '~/components/icons'
import { useState } from 'react'

type ArticleGridSectionProps = {
	data?: ArticleGridSectionType
}

export default function ArticleGridSection({ data }: ArticleGridSectionProps) {
	const [view, setView] = useState<'list' | 'grid'>('list')

	return (
		<section className={styles.articleGridSection}>
			<div className="container">
				{/* Header - Title, Grid Controls */}
				<div className={styles.header}>
					<h2 className="h1">{data?.title}</h2>
					<div className={styles.controls}>
						<button
							className={clsx(styles.controlButton, view === 'list' && styles.active)}
							title="List view"
							aria-label="Switch to list view"
							onClick={() => setView('list')}
						>
							<ListBulletsIcon />
						</button>
						<button
							className={clsx(styles.controlButton, view === 'grid' && styles.active)}
							title="Grid view"
							aria-label="Switch to grid view"
							onClick={() => setView('grid')}
						>
							<SquaresFourIcon />
						</button>
					</div>
				</div>
				{/* List of Articles */}
			</div>
		</section>
	)
}
