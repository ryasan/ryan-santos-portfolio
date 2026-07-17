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
import { formatDate } from '~/utils'
import { type Blog } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigate } from '@remix-run/react'
import { useRef, useState, lazy, Suspense } from 'react'

const Markdown = lazy(() => import('~/components/markdown'))
const ns = 'blog-post-section'

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
		<section className={ns} ref={sectionRef}>
			<div className={`${ns}__header`}>
				<div className="container">
					<button
						className={`${ns}__link-box`}
						onClick={() => navigate('/blog')}
					>
						<ArrowLeftIcon className={`${ns}__icon`} />
						<span className={`${ns}__link`}>Back</span>
					</button>

					{data?.title && <h1 className="mb-32 h4">{data?.title}</h1>}

					<div className={`${ns}__author`}>
						<Avatar
							alt={name}
							size="small"
							src={data?.author?.avatar?.url}
						/>
						{(name || data?.publishDate) && (
							<div className={`${ns}__author-info`}>
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
					<div className={`${ns}__hero-image`}>
						<img
							alt={data?.openGraphImage?.description || ''}
							src={data?.openGraphImage?.url}
						/>
					</div>
				</div>
			)}

			<div className="container">
				<div className={`${ns}__layout`}>
					{(data?.blogBodyMarkdown || data?.blogBody?.json) && (
						<div className={`${ns}__blog-body`}>
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

					<div className={`${ns}__share-actions`}>
						<button
							className={`${ns}__share-copy-button`}
							onClick={copyToClipboard}
							title="Share this article via link"
						>
							<span>{copySuccess ? 'Copied' : 'Copy Link'}</span>
							<CopySimpleIcon className={`${ns}__share-icon`} />
						</button>
						<button
							className={`${ns}__share-button`}
							onClick={shareOnTwitter}
							title="Share this article on Twitter"
						>
							<TwitterIcon className={`${ns}__share-icon`} />
						</button>
						<button
							className={`${ns}__share-button`}
							onClick={shareOnLinkedIn}
							title="Share this article on LinkedIn"
						>
							<LinkedinIcon className={`${ns}__share-icon`} />
						</button>
						<button
							className={`${ns}__share-button`}
							onClick={shareOnFacebook}
							title="Share this article on Facebook"
						>
							<FacebookIcon className={`${ns}__share-icon`} />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
