import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { normalizeSlide } from '~/utils/normalize-data'
import { type Blog, type ContentfulTag } from '~/graphql/__generated/sdk'
import { useMemo, useRef } from 'react'
import { useSearchParams } from '@remix-run/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

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
	const headerRef = useRef<HTMLDivElement>(null)
	const postListRef = useRef<HTMLDivElement>(null)
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

	useGSAP(
		() => {
			const header = headerRef.current
			const postList = postListRef.current

			if (header) {
				gsap.to(header, {
					delay: 0.5,
					duration: 1,
					ease: 'power2.out',
					opacity: 1,
				})
			}

			if (!postList) return

			const cards = gsap.utils.toArray<HTMLElement>(postList.children)

			cards.forEach((card) => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 100 },
					{
						duration: 1,
						ease: 'power2.out',
						opacity: 1,
						scrollTrigger: {
							once: true,
							start: 'top bottom-=150px',
							trigger: card,
						},
						y: 0,
					},
				)
			})
		},
		{ dependencies: [filteredPosts], revertOnUpdate: true, scope: sectionRef },
	)

	return (
		<section className={styles.blogSection} ref={sectionRef}>
			<div className="container">
				<div className={styles.header} ref={headerRef}>
					<h1 className={clsx(styles.title, 'h2')}>
						<strong>Latest</strong> <em>Blogs</em>
					</h1>
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
					<div className={styles.postList} ref={postListRef}>
						{filteredPosts.map(normalizeSlide).map((post) => {
							if (!post) return null
							return <ArticleCard data={post} forceDescription key={post.id} />
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
