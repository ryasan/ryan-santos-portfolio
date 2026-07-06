import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils/normalize-data'
import { useEffect, useState } from 'react'
import { useSearchParams } from '@remix-run/react'

type BlogSectionProps = {
	posts: Blog[]
	tags: ContentfulTag[]
}

export default function BlogSection({ posts, tags: _tags }: BlogSectionProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filteredPosts, setFilteredPosts] = useState<Blog[]>(posts)
	const [selectedTags] = useState<string[]>(() => {
		const tagsParam = searchParams.get('tags')
		return tagsParam ? tagsParam.split(',').filter(Boolean) : []
	})

	/*
	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		)
	}
	*/

	// Update URL parameters when filters change
	useEffect(() => {
		const params = new URLSearchParams()

		if (selectedTags.length > 0) {
			params.set('tags', selectedTags.join(','))
		}

		// Only update URL if params changed
		const newSearchString = params.toString()
		const currentSearchString = searchParams.toString()

		if (newSearchString !== currentSearchString) {
			setSearchParams(params, { replace: true })
		}
	}, [selectedTags, searchParams, setSearchParams])

	useEffect(() => {
		let filtered = [...posts]

		if (selectedTags.length > 0) {
			filtered = filtered.filter((post) => {
				const postTags = post.contentfulMetadata?.tags?.filter(Boolean) || []

				return selectedTags.some((selectedTag) =>
					postTags.some((tag) => tag && tag.name === selectedTag),
				)
			})
		}

		setFilteredPosts(filtered)
	}, [selectedTags, posts])

	return (
		<section className={styles.blogSection}>
			<div className="container">
				{/* <div className={styles.tagList}>
					{tags.map((tag) => {
						if (!tag.name) return null
						return (
							<button
								className={clsx(
									styles.tag,
									selectedTags.includes(tag.name) && styles.active,
								)}
								key={tag.id}
								onClick={() => tag.name && toggleTag(tag.name)}
							>
								{tag.name}
							</button>
						)
					})}
				</div> */}

				<h1 className={clsx(styles.title, 'h2')}>
					<strong>Latest</strong> <em>Blogs</em>
				</h1>

				<div className={styles.postList}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return (
							<ArticleCard
								data={post}
								forceDescription
								key={post.id}
							/>
						)
					})}
				</div>
			</div>
		</section>
	)
}
