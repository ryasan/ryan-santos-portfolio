import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { normalizeSlide } from '~/utils/normalize-data'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
import { useMemo, useRef } from 'react'
import { useSearchParams } from '@remix-run/react'

type BlogSectionProps = {
	posts: Blog[]
	tags: ContentfulTag[]
}

function parseTagsFromUrl(tagsParam: string | null) {
	if (!tagsParam) return []
	const tags = tagsParam
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean)

	return Array.from(new Set(tags)).sort()
}

export default function BlogSection({ posts, tags: _tags }: BlogSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const selectedTags = parseTagsFromUrl(searchParams.get('tags'))

	const toggleTag = (tagName: string) => {
		const next = new Set(selectedTags)
		if (next.has(tagName)) next.delete(tagName)
		else next.add(tagName)

		const params = new URLSearchParams(searchParams)
		const sortedTags = Array.from(next).sort()

		if (sortedTags.length > 0) {
			params.set('tags', sortedTags.join(','))
		} else {
			params.delete('tags')
		}

		setSearchParams(params, { replace: true })
	}

	const filteredPosts = useMemo(() => {
		if (selectedTags.length === 0) return posts

		return posts.filter((post) => {
			const postTags = post.contentfulMetadata?.tags?.filter(Boolean) || []

			return selectedTags.some((selectedTag) =>
				postTags.some((tag) => tag && tag.name === selectedTag),
			)
		})
	}, [selectedTags, posts])

	return (
		<section className={styles.blogSection} ref={sectionRef}>
			<div className="container">
				{/* Title */}
				<h1 className={clsx(styles.title, 'h2')}>
					<strong>Latest</strong> <em>Blogs</em>
				</h1>

				{/* Tag Filters */}
				<div className={styles.tagFilters}>
					{_tags.map((tag) => {
						const tagName = tag.name?.trim()
						if (!tagName) return null

						const isActive = selectedTags.includes(tagName)

						return (
							<button
								className={clsx('button', !isActive && 'button--outline')}
								key={tag.id}
								onClick={() => toggleTag(tagName)}
								title={tagName}
								type="button"
							>
								{tagName}
							</button>
						)
					})}
				</div>

				{/* Post list */}
				<div className={styles.postList}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return <ArticleCard data={post} forceDescription key={post.id} />
					})}
				</div>
			</div>
		</section>
	)
}
