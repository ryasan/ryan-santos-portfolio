import Avatar from '~/components/avatar'
import RichText from '~/components/rich-text'
import clsx from 'clsx'
import linkStyles from '~/styles/components/link.module.scss'
import styles from '~/styles/components/sections/blog-post-section.module.scss'
import { ArrowLeftIcon } from '~/components/icons'
import { Blog } from '~/graphql/__generated/sdk'
import { formatDate } from '~/utils'
import { useNavigate } from '@remix-run/react'

type BlogPostSectionProps = {
	data?: Blog
}

export default function BlogPostSection({ data }: BlogPostSectionProps) {
	const navigate = useNavigate()
	const name =
		data?.author?.firstName && data?.author?.lastName
			? `${data?.author?.firstName} ${data?.author?.lastName}`
			: ''

	return (
		<section className={styles.blogPostSection}>
			<div className={styles.header}>
				<div className="container">
					<button
						className={clsx(styles.linkBox, linkStyles.linkBox)}
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon className={clsx(styles.icon, linkStyles.icon)} />
						<span className={clsx('link', linkStyles.link)}>Back</span>
					</button>

					{data?.title && <h1 className="mb-32">{data?.title}</h1>}

					<div className={styles.author}>
						<Avatar
							className={styles.avatar}
							src={data?.author?.avatar?.url}
							alt={name}
							size="small"
						/>
						{(name || data?.publishDate) && (
							<div className={styles.authorInfo}>
								{name && <h5 className="h5">{name}</h5>}
								{data?.publishDate && (
									<div className="body-2">{formatDate(data?.publishDate)}</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{data?.openGraphImage?.url && (
				<div className={styles.heroImage}>
					<img
						src={data?.openGraphImage?.url}
						alt={data?.openGraphImage?.title || ''}
					/>
				</div>
			)}

			{data?.blogBody?.json && (
				<div className={styles.blogBody}>
					<div className="container">
						{data?.blogBody?.json && <RichText data={data?.blogBody?.json} />}
					</div>
				</div>
			)}

			{/* Tags - Post Tags */}
			{/* Related Posts - Post Related Posts */}
			{/* Comments - Post Comments */}
			{/* Share Buttons - Post Share Buttons */}
		</section>
	)
}
