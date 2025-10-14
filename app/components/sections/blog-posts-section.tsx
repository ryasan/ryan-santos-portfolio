import ArticleCard from '~/components/article-card'
import styles from '~/styles/components/sections/blog-posts.section.module.scss'
import { normalizeSlide } from '~/utils'
import { useBlogFilter } from '~/contexts/blog-filter-context'
import { useEffect, useState } from 'react'
import { useMatchMedia } from '~/hooks'

interface BlogPostsSectionProps {
	data?: {
		title?: string
	}
}

export default function BlogPostsSection({ data }: BlogPostsSectionProps) {
	const [view, setView] = useState<'list' | 'grid'>('list')
	const { isMatching } = useMatchMedia('(max-width:768px)', false)
	const { filteredPosts } = useBlogFilter()

	useEffect(() => {
		if (isMatching) setView('grid')
		else setView('list')
	}, [isMatching])

	return (
		<section className={styles.blogPostsSection}>
			<div className="container">
				{data?.title && <h2 className="h5 mb-12">{data?.title}</h2>}
				<div className={styles.posts}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return <ArticleCard key={post.id} data={post} horizontal={view === 'list'} forceDescription />
					})}
				</div>
			</div>
		</section>
	)
}
