import ArticleCard from '~/components/article-card'
import styles from '~/styles/components/sections/blog-posts.section.module.scss'
import { normalizeSlide } from '~/utils'
import { useBlogFilter } from '~/contexts/blog-filter-context'

interface BlogPostsSectionProps {
	data?: {
		title?: string
	}
}

export default function BlogPostsSection({ data }: BlogPostsSectionProps) {
	const { filteredPosts } = useBlogFilter()

	return (
		<section className={styles.blogPostsSection}>
			<div className="container">
				{data?.title && <h2 className="h5 mb-12">{data?.title}</h2>}
				<div className={styles.posts}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return <ArticleCard key={post.id} data={post} horizontal />
					})}
				</div>
			</div>
		</section>
	)
}
