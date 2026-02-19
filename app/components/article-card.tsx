import clsx from 'clsx'
import styles from '~/styles/components/article-card.module.scss'
import { Link as RemixLink, useNavigate } from '@remix-run/react'
import { isExternalLink } from '~/utils'
import { useState } from 'react'

export type NormalizedArticleCard = {
	description?: string | null
	eyebrow?: string | null
	image?: string | null
	link?: string | null
	tags?: (string | undefined)[] | null
	title?: string | null
	type?: string | null
}

type ArticleCardProps = {
	data: NormalizedArticleCard
	disableImageAnimation?: boolean
	forceDescription?: boolean
	horizontal?: boolean
	isBig?: boolean
}

export default function ArticleCard({
	data,
	disableImageAnimation = false,
	forceDescription,
	horizontal,
	isBig,
}: ArticleCardProps) {
	const navigate = useNavigate()
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const Component = data.link ? RemixLink : 'div'
	const isExternal = isExternalLink(data.link || '')

	const handleTagClick = (tag: string) => {
		if (!tag || !data.type) return

		const searchParams = new URLSearchParams({ tags: tag })
		const path = `/${data.type}?${searchParams.toString()}`
		navigate(path)
	}

	return (
		<Component
			className={clsx(
				styles.articleCard,
				isBig && styles.bigCard,
				horizontal && styles.horizontal,
				!disableImageAnimation && isImageLoaded
					? styles.loaded
					: styles.loading,
			)}
			target={isExternal ? '_blank' : undefined}
			to={data.link || ''}
		>
			<div className={styles.articleImage}>
				{data.image && (
					<img
						alt={data.title || ''}
						className={styles.articleImage}
						onLoad={() => {
							setIsImageLoaded(true)
						}}
						ref={(img) => {
							if (img?.complete) {
								setIsImageLoaded(true)
							}
						}}
						src={data.image}
					/>
				)}
			</div>
			<div className={styles.content}>
				{data.eyebrow && <p className={clsx('badge mb-12', styles.eyebrow)}>{data.eyebrow}</p>}
				{data.title && <h3 className={clsx('h6 mb-12', styles.title)}>{data.title}</h3>}
				{data.description && (horizontal || forceDescription) && (
					<p className={clsx('body mb-20', styles.description)}>
						{data.description}
					</p>
				)}
				{data.tags && (
					<div className={styles.tags}>
						{data.tags.map((tag) => {
							if (!tag) return null

							return (
								<button
									className={clsx('link badge', styles.tag)}
									key={tag}
									onClick={(e) => {
										e.preventDefault()
										// Uncomment this when filtering is implemented
										// handleTagClick(tag)
									}}
								>
									{tag}
								</button>
							)
						})}
					</div>
				)}
			</div>
		</Component>
	)
}
