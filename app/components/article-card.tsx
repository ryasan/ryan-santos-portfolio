import clsx from 'clsx'
import styles from '~/styles/components/article-card.module.scss'
import { Link as RemixLink, useNavigate } from '@remix-run/react'
import { isExternalLink } from '~/utils'
import { useState } from 'react'

export type NormalizedArticleCard = {
	type?: string | null
	eyebrow?: string | null
	title?: string | null
	description?: string | null
	image?: string | null
	link?: string | null
	tags?: (string | undefined)[] | null
}

type ArticleCardProps = {
	data: NormalizedArticleCard
	isBig?: boolean
	horizontal?: boolean
	forceDescription?: boolean
	disableImageAnimation?: boolean
}

export default function ArticleCard({
	data,
	isBig,
	horizontal,
	forceDescription,
	disableImageAnimation = false,
}: ArticleCardProps) {
	const navigate = useNavigate()
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const Component = data.link ? RemixLink : 'div'
	const isExternal = isExternalLink(data.link || '')

	const handleTagClick = (tag: string) => {
		if (!tag || !data.type) return

		const searchParams = new URLSearchParams({ tag })
		const path = `/${data.type}?${searchParams.toString()}`
		navigate(path)
	}

	return (
		<Component
			to={data.link || ''}
			target={isExternal ? '_blank' : undefined}
			className={clsx(
				styles.articleCard,
				isBig && styles.bigCard,
				horizontal && styles.horizontal,
				!disableImageAnimation && isImageLoaded
					? styles.loaded
					: styles.loading,
			)}
		>
			<div className={styles.articleImage}>
				{data.image && (
					<img
						className={styles.articleImage}
						src={data.image}
						alt={data.title || ''}
						onLoad={() => {
							setIsImageLoaded(true)
						}}
						ref={(img) => {
							if (img?.complete) {
								setIsImageLoaded(true)
							}
						}}
					/>
				)}
			</div>
			<div className={styles.content}>
				{data.eyebrow && <p className="badge mb-12">{data.eyebrow}</p>}
				{data.title && <h3 className="h5 mb-16">{data.title}</h3>}
				{data.description && (horizontal || forceDescription) && (
					<p className={clsx('body mb-16', styles.description)}>
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
										handleTagClick(tag)
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
