import Avatar from '~/components/avatar'
import clsx from 'clsx'
import linkStyles from '~/styles/components/link.module.scss'
import styles from '~/styles/components/sections/blog-header-section.module.scss'
import { ArrowLeftIcon } from '~/components/icons'
import { Blog } from '~/graphql/__generated/sdk'
import { formatDate } from '~/utils'
import { useNavigate } from '@remix-run/react'

type BlogHeaderSectionProps = {
	data?: Blog
}

export default function BlogHeaderSection({ data }: BlogHeaderSectionProps) {
	const navigate = useNavigate()
	const name =
		data?.author?.firstName && data?.author?.lastName
			? `${data?.author?.firstName} ${data?.author?.lastName}`
			: ''

	const handleBack = () => {
		// Pop the current route
		navigate(-1)
	}

	return (
		<section className={styles.blogHeaderSection}>
			<div className="container">
				{/* Back Button */}
				<button
					className={clsx(styles.linkBox, linkStyles.linkBox)}
					onClick={handleBack}
				>
					<ArrowLeftIcon className={clsx(styles.icon, linkStyles.icon)} />
					<span className={clsx('link', linkStyles.link)}>Back</span>
				</button>

				<h1 className="mb-32">{data?.title}</h1>

				<div className={styles.author}>
					{data?.author?.avatar?.url && (
						<Avatar
							className={styles.avatar}
							src={data?.author?.avatar?.url}
							alt={name}
							size="small"
						/>
					)}
					<div className={styles.authorInfo}>
						{name && <h5 className="h5">{name}</h5>}
						{data?.publishDate && (
							<div className="body-2">
								{formatDate(data?.publishDate)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
