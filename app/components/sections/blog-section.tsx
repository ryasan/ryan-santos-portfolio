import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { CloseIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils/normalize-data'
import { useBlogFilter } from '~/contexts/blog-filter-context'
import { useEffect, useState } from 'react'
import { useMatchMedia } from '~/hooks'

export default function BlogSection() {
	const [view, setView] = useState<'list' | 'grid'>('list')
	const { isMatching } = useMatchMedia('(max-width:768px)', false)
	const { tags, selectedTags, toggleTag, clearTags, filteredPosts } =
		useBlogFilter()

	useEffect(() => {
		if (isMatching) setView('grid')
		else setView('list')
	}, [isMatching])

	return (
		<section className={styles.blogSection}>
			<div className="container">
				<h2 className="h5 mb-12">Search blog by topics</h2>

				<div className={styles.tagList}>
					{tags.map((tag) => {
						if (!tag.name) return null
						return (
							<button
								key={tag.id}
								className={clsx(
									'link badge',
									styles.tag,
									selectedTags.includes(tag.name) && styles.active,
								)}
								onClick={() => tag.name && toggleTag(tag.name)}
							>
								{tag.name}
							</button>
						)
					})}
					{selectedTags.length > 0 && (
						<button
							onClick={clearTags}
							className={clsx('link badge', styles.tag)}
						>
							<CloseIcon className={styles.closeIcon} />
							<span className="sr-only">Clear all tags</span>
						</button>
					)}
				</div>

				<div className={styles.posts}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return (
							<ArticleCard
								key={post.id}
								data={post}
								horizontal={view === 'list'}
								forceDescription
							/>
						)
					})}
				</div>
			</div>
		</section>
	)
}
