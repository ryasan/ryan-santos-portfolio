import Avatar from '~/components/avatar'
import ClientOnly from '~/components/client-only'
import RichText from '~/components/rich-text'
import gsap from 'gsap'
import {
	ArrowLeftIcon,
	TwitterIcon,
	FacebookIcon,
	LinkedinIcon,
	CopySimpleIcon,
} from '~/components/icons'
import { formatPublishMeta } from '~/utils'
import { type Blog } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigate } from '@remix-run/react'
import { useRef, useState, lazy, Suspense } from 'react'
import styles from './blog-post-section.module.css'

const Markdown = lazy(() => import('~/components/markdown'))

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

	const shareUrl =
		typeof window !== 'undefined' && window.location
			? `${window.location.origin}${pathname}`
			: ''

	const shareTitle = data?.title || 'Check out this article'

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

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(`${window.location.origin}${pathname}`)
		setCopySuccess(true)
		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	useGSAP(() => {
		const section = sectionRef.current
		if (!section) return

		gsap.to(section, {
			duration: 1,
			opacity: 1,
		})
	}, [])

	return (
		<section className={styles.root} ref={sectionRef}>
			<div className={styles.header}>
				<div className="container">
					<button
						className={styles.linkBox}
						onClick={() => navigate('/blog')}
					>
						<ArrowLeftIcon className={styles.icon} />
						<span className={styles.link}>Back</span>
					</button>

					{data?.title && <h1 className="mb-32 h4">{data?.title}</h1>}

					<div className={styles.author}>
						<Avatar
							alt={name}
							size="small"
							src={data?.author?.avatar?.url}
						/>
						{(name || data?.publishDate) && (
							<div className={styles.authorInfo}>
								{name && <h5 className="h5">{name}</h5>}
								{(data?.publishDate ||
									data?.blogBodyMarkdown ||
									data?.blogBody?.json) && (
									<div className="body">
										{formatPublishMeta(
											data?.publishDate,
											data?.blogBodyMarkdown,
											data?.blogBody?.json,
										)}
									</div>
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
							alt={data?.openGraphImage?.description || ''}
							src={data?.openGraphImage?.url}
						/>
					</div>
				</div>
			)}

			<div className="container">
				<div className={styles.layout}>
					{(data?.blogBodyMarkdown || data?.blogBody?.json) && (
						<div className={styles.blogBody}>
							{data?.blogBodyMarkdown ? (
								<ClientOnly>
									<Suspense fallback={null}>
										<Markdown content={data.blogBodyMarkdown} />
									</Suspense>
								</ClientOnly>
							) : (
								data?.blogBody?.json && <RichText data={data.blogBody.json} />
							)}
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
		</section>
	)
}
