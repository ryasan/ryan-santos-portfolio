import clsx from 'clsx'
import styles from '~/styles/components/article-card.module.scss'
import { Link as RemixLink } from '@remix-run/react'
import { isExternalLink } from '~/utils'

export type NormalizedArticleCard = {
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
}

export default function ArticleCard({
	data,
	isBig = true,
	horizontal = false,
}: ArticleCardProps) {
	const Component = data.link ? RemixLink : 'div'
	const isExternal = isExternalLink(data.link || '')

	return (
		<Component
			to={data.link || ''}
			target={isExternal ? '_blank' : undefined}
			className={clsx(
				styles.articleCard,
				isBig && styles.bigCard,
				horizontal && styles.horizontal,
			)}
		>
			<div className={styles.imageWrapper}>
				{data.image && (
					<img
						className={styles.articleImage}
						src={data.image}
						alt={data.title || ''}
					/>
				)}
			</div>
			<div className={styles.content}>
				{data.eyebrow && <p className="badge mb-12">{data.eyebrow}</p>}
				{data.title && <h3 className="h3 mb-24">{data.title}</h3>}
				{data.description && horizontal && (
					<p className="body">{data.description}</p>
				)}
				{data.tags && (
					<div className={styles.tags}>
						{data.tags.map((tag) => (
							<p key={tag} className={clsx('badge', styles.tag)}>
								{tag}
							</p>
						))}
					</div>
				)}
			</div>
		</Component>
	)
}
