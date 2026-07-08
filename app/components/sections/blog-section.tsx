import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { ListBulletsIcon, SearchIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils/normalize-data'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from '@remix-run/react'

const HEADER_HEIGHT = 68
const TABLET_BREAKPOINT = 768

type BlogSectionProps = {
	posts: Blog[]
	tags: ContentfulTag[]
}

export default function BlogSection({ posts, tags: _tags }: BlogSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const filtersRef = useRef<HTMLDivElement>(null)
	const filtersBarRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
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

	useGSAP(
		() => {
			const filters = filtersRef.current
			const filtersBar = filtersBarRef.current
			const content = contentRef.current

			if (!filters || !filtersBar || !content) return

			const mm = gsap.matchMedia()

			mm.add(`(min-width: ${TABLET_BREAKPOINT + 1}px)`, () => {
				const pinOptions = {
					anticipatePin: 1,
					end: 'bottom bottom' as const,
					endTrigger: content,
					pinSpacing: false,
					start: `top top+=${HEADER_HEIGHT - 1}`,
				}

				const filtersPinTrigger = ScrollTrigger.create({
					...pinOptions,
					pin: filters,
					trigger: filters,
				})

				const filtersBarPin = ScrollTrigger.create({
					...pinOptions,
					pin: filtersBar,
					trigger: filtersBar,
				})

				return () => {
					filtersPinTrigger.kill()
					filtersBarPin.kill()
				}
			})

			return () => mm.revert()
		},
		{ dependencies: [filteredPosts.length], scope: sectionRef },
	)

	return (
		<section className={styles.blogSection} ref={sectionRef}>
			<div className="container">
				<div className={styles.grid}>
					{/* Pinned Filters Sidebar */}
					<div className={styles.filtersColumn}>
						<div className={styles.filters} ref={filtersRef}>
							{/* Search bar */}
							<div className={styles.search}>
								<input type="text" placeholder="Search" />
								<button type="submit" title="Search">
									<SearchIcon />
								</button>
							</div>
							{/* Date */}
							{/* Tags */}
						</div>
					</div>

					{/* Content */}
					<div className={styles.content} ref={contentRef}>
						{/* Title */}
						<h1 className={clsx(styles.title, 'h2')}>
							<strong>Latest</strong> <em>Blogs</em>
						</h1>

						{/* Pinned Filters Bar */}
						<div className={styles.filtersBar} ref={filtersBarRef}>
							<button
								className="button button--outline"
								type="button"
								title="Toggle filters"
							>
								<ListBulletsIcon />
								Filters
							</button>

							{/* Divider */}
							<div className={styles.divider}>
								{/* Divider */}
							</div>

							{/* Tags */}
							<div className={styles.tags}>
								{_tags.map((tag) => (
									<button
										className="button button--outline"
										key={tag.id}
										title={tag.name || ''}
										type="button"
									>
										{tag.name}
									</button>
								))}
							</div>
						</div>

						{/* Post list */}
						<div className={styles.postList}>
							{[...filteredPosts, ...filteredPosts, ...filteredPosts]
								.map(normalizeSlide)
								.map((post) => {
									if (!post) return null
									return (
										<ArticleCard data={post} forceDescription key={post.id} />
									)
								})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
