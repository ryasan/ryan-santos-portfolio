import clsx from 'clsx'
import styles from '~/styles/components/article-card.module.scss'
import { Link as RemixLink } from '@remix-run/react'
import { isExternalLink } from '~/utils'

type ArticleCardProps = {
	eyebrow?: string
	title?: string
	description?: string
	image?: string
	link?: string
	tags?: string[]
	isBig?: boolean
	horizontal?: boolean
}

export default function ArticleCard({
	eyebrow,
	title,
	description,
	image,
	link,
	tags,
	isBig = true,
	horizontal = false,
}: ArticleCardProps) {
	console.log(tags)
	const Component = link ? RemixLink : 'div'
	const isExternal = isExternalLink(link || '')

	return (
		<Component
			to={link || ''}
			target={isExternal ? '_blank' : undefined}
			className={clsx(
				styles.articleCard,
				isBig && styles.bigCard,
				horizontal && styles.horizontal,
			)}
		>
			<div className={styles.imageWrapper}>
				{image && (
					<img className={styles.articleImage} src={image} alt={title} />
				)}
			</div>
			<div className={styles.content}>
				{eyebrow && <p className="badge mb-12">{eyebrow}</p>}
				{title && <h3 className="h3 mb-24">{title}</h3>}
				{description && horizontal && <p className="body">{description}</p>}
				{tags && (
					<div className={styles.tags}>
						{tags.map((tag) => (
							<p key={tag} className={clsx("badge", styles.tag)}>{tag}</p>
						))}
					</div>
				)}
			</div>
		</Component>
	)
}
