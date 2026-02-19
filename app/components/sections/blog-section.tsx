import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import gsap from 'gsap'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
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
	const titleRef = useRef<HTMLHeadingElement>(null)
	const postListRef = useRef<HTMLDivElement>(null)

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

	useGSAP(
		() => {
			const section = sectionRef.current
			const title = titleRef.current
			const postList = postListRef.current

			if (!section) return

			gsap.to(section, {
				duration: 1,
				opacity: 1,
			})

			if (title && postList) {
				gsap.fromTo(
					postList,
					{ y: 800 },
					{
						scrollTrigger: {
							end: 'bottom top',
							scrub: true,
							start: 'top bottom',
							trigger: section,
						},
						y: -400,
					},
				)

				gsap.fromTo(
					title,
					{ y: 150 },
					{
						scrollTrigger: {
							end: 'bottom top',
							scrub: true,
							start: 'top bottom',
							trigger: section,
						},
						y: -100,
					},
				)
			}
		},
		{ scope: sectionRef },
	)

	return (
		<section className={styles.blogSection} ref={sectionRef}>
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

				<h1 className={clsx(styles.title, 'h2')} ref={titleRef}>
					<strong>Latest</strong> <em>Blogs</em>
				</h1>

				<div className={styles.postList} ref={postListRef}>
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
