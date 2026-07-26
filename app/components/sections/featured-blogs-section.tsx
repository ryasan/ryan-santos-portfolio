import ArticleCard from '~/components/article-card'
import { ArrowRightIcon } from '~/components/icons'
import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { type FeaturedArticlesSection as FeaturedArticlesSectionType } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const ns = 'featured-blogs-section'

type FeaturedBlogsSectionProps = {
	data?: FeaturedArticlesSectionType
	id?: string
}

export default function FeaturedBlogsSection({
	data,
	id,
}: FeaturedBlogsSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const header = headerRef.current
			const list = listRef.current

			if (!header || !list) return

			gsap.fromTo(
				header,
				{ opacity: 0, y: 24 },
				{
					duration: 0.8,
					ease: 'power2.out',
					opacity: 1,
					scrollTrigger: {
						once: true,
						start: 'top bottom-=80px',
						trigger: header,
					},
					y: 0,
				},
			)

			const cards = gsap.utils.toArray<HTMLElement>(
				list.querySelectorAll(`.${ns}__card`),
			)

			cards.forEach((card, index) => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 40 },
					{
						delay: index * 0.08,
						duration: 0.8,
						ease: 'power2.out',
						opacity: 1,
						scrollTrigger: {
							once: true,
							start: 'top bottom-=60px',
							trigger: card,
						},
						y: 0,
					},
				)
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section className={ns} id={id} ref={sectionRef}>
			<div className="container">
				<div className={`${ns}__header`} ref={headerRef}>
					{data?.title && (
						<h2 className={clsx(`${ns}__title`, 'h3')}>{data.title}</h2>
					)}
					<Link className={clsx(`${ns}__cta`, 'button button--outline')} to="/blog">
						View All Insights
						<ArrowRightIcon
							aria-hidden
							className={`${ns}__cta-icon`}
							fill="currentColor"
							height={24}
							width={24}
						/>
					</Link>
				</div>

				{data?.featuredArticlesCollection && (
					<div className={`${ns}__list`} ref={listRef}>
						{data.featuredArticlesCollection.items
							.map(normalizeSlide)
							.map((article) => {
								if (!article) return null

								return (
									<ArticleCard
										className={`${ns}__card`}
										data={article}
										forceDescription
										key={article.id}
									/>
								)
							})}
					</div>
				)}
			</div>
		</section>
	)
}
