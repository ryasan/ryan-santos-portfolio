import ArticleCard from '~/components/article-card'
import clsx from 'clsx'
import gsap from 'gsap'
import styles from '~/styles/components/sections/blog-section.module.scss'
import { CloseIcon } from '~/components/icons'
import { normalizeSlide } from '~/utils/normalize-data'
import { useBlogFilter } from '~/contexts/blog-filter-context'
import { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useMatchMedia } from '~/hooks'
import { useRef } from 'react'

export default function BlogSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const { tags, selectedTags, toggleTag, clearTags, filteredPosts } =
		useBlogFilter()

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
				<h2 className={clsx(styles.title, 'h2 mb-56')}>
					Thoughts on the <span>web</span>.
				</h2>

				<div className="h4 mb-40">Search insights by topics</div>

				<div className={styles.tagList}>
					<button
						onClick={clearTags}
						className={clsx(
							'button',
							selectedTags.length > 0 && 'button--outline',
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
									'button button--outline',
									selectedTags.includes(tag.name) && styles.active,
								)}
								onClick={() => tag.name && toggleTag(tag.name)}
							>
								{tag.name}
							</button>
						)
					})}
				</div>

				{/* <div className={styles.posts}>
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
				</div> */}
			</div>
		</section>
	)
}
