import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import gsap from 'gsap'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { Blog, ContentfulTag } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils/normalize-data'
import { useEffect, useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useSearchParams } from '@remix-run/react'

type BlogSectionProps = {
	posts: Blog[]
	tags: ContentfulTag[]
}

export default function BlogSection({ posts, tags }: BlogSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)

	const [searchParams, setSearchParams] = useSearchParams()
	const [filteredPosts, setFilteredPosts] = useState<Blog[]>(posts)
	const [selectedTags, setSelectedTags] = useState<string[]>(() => {
		const tagsParam = searchParams.get('tags')
		return tagsParam ? tagsParam.split(',').filter(Boolean) : []
	})

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		)
	}

	const clearTags = () => {
		setSelectedTags([])
	}

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
	}, [selectedTags])

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

	useGSAP(() => {
		const section = sectionRef.current
		if (!section) return

		gsap.to(section, {
			opacity: 1,
			duration: 1,
		})
	}, [])

	return (
		<section className={styles.blogSection} ref={sectionRef}>
			<div className="container">
				<h1 className="h2 mb-40">Search insights by topics</h1>

				<div className={styles.tagList}>
					<button
						onClick={clearTags}
						className={clsx(
							styles.tag,
							selectedTags.length === 0 && styles.active,
						)}
					>
						All
					</button>

					{tags.map((tag) => {
						if (!tag.name) return null
						return (
							<button
								key={tag.id}
								className={clsx(
									styles.tag,
									selectedTags.includes(tag.name) && styles.active,
								)}
								onClick={() => tag.name && toggleTag(tag.name)}
							>
								{tag.name}
							</button>
						)
					})}
				</div>

				{/* <div className={styles.postList}>
					{filteredPosts.map(normalizeSlide).map((post) => {
						if (!post) return null
						return <ArticleCard key={post.id} data={post} forceDescription />
					})}
				</div> */}
			</div>
		</section>
	)
}
