import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import { ListBulletsIcon, SquaresFourIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils'
import { type ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'
import { useEffect, useState } from 'react'
import { useMatchMedia } from '~/hooks'

const ns = 'article-grid-section'

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
		<section className={ns} id={id}>
			<div className="container">
				<div className={`${ns}__header`}>
					<h2 className="h1">{data?.title}</h2>
					{!isMatching && (
						<div className={`${ns}__controls`}>
							<button
								aria-label="Switch to list view"
								className={clsx(
									`${ns}__control-button`,
									view === 'list' && `${ns}__control-button--active`,
								)}
								onClick={() => setView('list')}
								title="List view"
							>
								<ListBulletsIcon />
							</button>
							<button
								aria-label="Switch to grid view"
								className={clsx(
									`${ns}__control-button`,
									view === 'grid' && `${ns}__control-button--active`,
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
						`${ns}__article-list`,
						view === 'list' && `${ns}__article-list--list`,
						view === 'grid' && `${ns}__article-list--grid`,
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
