import Avatar from '~/components/avatar'
import RichText from '~/components/rich-text'
import clsx from 'clsx'
import gsap from 'gsap'
import linkStyles from '~/styles/components/link.module.scss'
import styles from '~/styles/components/sections/blog-post-section.module.scss'
import { ArrowLeftIcon } from '~/components/icons'
import { Blog } from '~/graphql/__generated/sdk'
import {
	TwitterIcon,
	FacebookIcon,
	LinkedinIcon,
	CopySimpleIcon,
} from '~/components/icons'
import { formatDate } from '~/utils'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigate } from '@remix-run/react'
import { useRef, useState } from 'react'

type BlogPostSectionProps = {
	data?: Blog
}

export default function BlogPostSection({ data }: BlogPostSectionProps) {
	const [copySuccess, setCopySuccess] = useState(false)
	const { pathname } = useLocation()
	const sectionRef = useRef<HTMLElement>(null)
	const navigate = useNavigate()

	const name =
		data?.author?.firstName && data?.author?.lastName
			? `${data?.author?.firstName} ${data?.author?.lastName}`
			: ''

	const copyToClipboard = () => {
		navigator.clipboard.writeText(`${window.location.origin}${pathname}`)
		setCopySuccess(true)
		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	const shareOnTwitter = () => {
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
		window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
	}

	const shareOnLinkedIn = () => {
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
		window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
	}

	const shareOnFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
		window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
	}

	useGSAP(() => {
		const section = sectionRef.current
		if (!section) return

		gsap.to(section, {
			opacity: 1,
			duration: 1,
		})
	}, [])

	return (
		<section className={styles.blogPostSection} ref={sectionRef}>
			<div className={styles.header}>
				<div className="container">
					<button
						className={clsx(styles.linkBox, linkStyles.linkBox)}
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon className={clsx(styles.icon, linkStyles.icon)} />
						<span className={clsx('link', linkStyles.link)}>Back</span>
					</button>

					{data?.title && <h1 className="mb-32 h2">{data?.title}</h1>}

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
									<div className="body">{formatDate(data?.publishDate)}</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{data?.openGraphImage?.url && (
				<div className="container">
					<div className={styles.heroImage}>
						<img
							src={data?.openGraphImage?.url}
							alt={data?.openGraphImage?.title || ''}
						/>
					</div>
				</div>
			)}

			<div className="container">
				<div className={styles.layout}>
					{data?.blogBody?.json && (
						<div className={styles.blogBody}>
							{data?.blogBody?.json && <RichText data={data?.blogBody?.json} />}
						</div>
					)}

					<div className={styles.shareActions}>
						<button
							className={styles.shareCopyButton}
							onClick={copyToClipboard}
							title="Share this article via link"
						>
							<span>{copySuccess ? 'Copied' : 'Copy Link'}</span>
							<CopySimpleIcon className={styles.shareIcon} />
						</button>
						<button
							className={styles.shareButton}
							onClick={shareOnTwitter}
							title="Share this article on Twitter"
						>
							<TwitterIcon className={styles.shareIcon} />
						</button>
						<button
							className={styles.shareButton}
							onClick={shareOnLinkedIn}
							title="Share this article on LinkedIn"
						>
							<LinkedinIcon className={styles.shareIcon} />
						</button>
						<button
							className={styles.shareButton}
							onClick={shareOnFacebook}
							title="Share this article on Facebook"
						>
							<FacebookIcon className={styles.shareIcon} />
						</button>
					</div>
				</div>
			</div>

			{/* Tags - Post Tags */}
			{/* Related Posts - Post Related Posts */}
			{/* Comments - Post Comments */}
		</section>
	)
}
