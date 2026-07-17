import clsx from 'clsx'
import { Link as RemixLink, useNavigate } from '@remix-run/react'
import { isExternalLink } from '~/utils'
import { type Asset } from '~/graphql/__generated/sdk'

const ns = 'article-card'

export type NormalizedArticleCard = {
	description?: string | null
	eyebrow?: string | null
	image?: Asset | null
	link?: string | null
	tags?: (string | undefined)[] | null
	title?: string | null
	type?: string | null
}

type ArticleCardProps = {
	className?: string
	data: NormalizedArticleCard
	forceDescription?: boolean
	horizontal?: boolean
	isBig?: boolean
}

export default function ArticleCard({
	className,
	data,
	forceDescription,
	horizontal,
	isBig,
}: ArticleCardProps) {
	const navigate = useNavigate()

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
				ns,
				isBig && 'big-card',
				horizontal && 'horizontal',
				className,
			)}
			target={isExternal ? '_blank' : undefined}
			to={data.link || ''}
		>
			<div className={`${ns}__image`}>
				{data.image && (
					<img
						alt={data.image?.description || ''}
						className={`${ns}__image`}
						src={data.image?.url || ''}
					/>
				)}
			</div>
			<div className={`${ns}__content`}>
				{data.eyebrow && (
					<p className={clsx('badge mb-12', `${ns}__eyebrow`)}>{data.eyebrow}</p>
				)}
				{data.title && (
					<h3 className={clsx('h6 mb-12', `${ns}__title`)}>{data.title}</h3>
				)}
				{data.description && (horizontal || forceDescription) && (
					<p className={clsx('body mb-20', `${ns}__description`)}>
						{data.description}
					</p>
				)}
				{data.tags && (
					<div className={`${ns}__tags`}>
						{data.tags.map((tag) => {
							if (!tag) return null

							return (
								<button
									className={clsx('link badge', `${ns}__tag`)}
									key={tag}
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()
										handleTagClick(tag)
									}}
									type="button"
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
