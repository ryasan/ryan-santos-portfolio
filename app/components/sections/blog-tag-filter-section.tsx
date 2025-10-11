import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-tag-filter-section.module.scss'
import { CloseIcon } from '~/components/icons'
import { useBlogFilter } from '~/contexts/blog-filter-context'

interface BlogTagFilterSectionProps {
	data: {
		title?: string
	}
}

export default function BlogTagFilterSection({
	data,
}: BlogTagFilterSectionProps) {
	const { tags, selectedTags, toggleTag, clearTags } = useBlogFilter()

	return (
		<section className={styles.blogTagFilterSection}>
			<div className="container">
				{data.title && <h2 className="h5 mb-12">{data.title}</h2>}
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
						<button onClick={clearTags} className={clsx('link badge', styles.tag)}>
							<CloseIcon className={styles.closeIcon} />
							<span className="sr-only">Clear all tags</span>
						</button>
					)}
				</div>
			</div>
		</section>
	)
}
