import clsx from 'clsx'
import styles from '~/styles/components/article-card.module.scss'

type ArticleCardProps = {
	eyebrow?: string
	title?: string
	description?: string
	image?: string
	link?: string
	big?: boolean
	horizontal?: boolean
}

export default function ArticleCard({
	eyebrow,
	title,
	description,
	image,
	link,
	big = true,
	horizontal = true,
}: ArticleCardProps) {
	return (
		<div
			className={clsx(
				styles.articleCard,
				big && styles.bigCard,
				horizontal && styles.horizontal,
			)}
		>
			<div className={styles.imageWrapper}>
				<img src={image} alt={title} className={styles.articleImage} />
			</div>
		</div>
	)
}
