import clsx from 'clsx'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '~/components/button'
import SectionLayout from '~/components/section-layout'
import { usePointerFollower } from '~/providers/pointer-follower'
import { type Blog } from '~/types'

const ns = 'blogs-section'

type BlogCardProps = {
	blog: Blog
	onMouseEnter(e: React.MouseEvent): void
	onMouseLeave(e: React.MouseEvent): void
}

function BlogCard({ blog, onMouseEnter, onMouseLeave }: BlogCardProps) {
	const blogCardRef = useRef(null)
	const isInView = useInView(blogCardRef, { once: true, amount: 0.4 })

	return (
		// eslint-disable-next-line
		<a
			className={`${ns}__blog`}
			ref={blogCardRef}
			style={{
				opacity: isInView ? 1 : 0,
				transform: isInView ? 'translateY(0)' : 'translateY(100px)',
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className={`${ns}__blog-image`}>
				<img
					src={blog.openGraphImage.url}
					alt={blog.openGraphImage.title || blog.title}
					data-media
				/>
			</div>
			<div className={`${ns}__blog-content`}>
				<small>
					<strong>{blog.title}</strong> - {blog.description}
				</small>
			</div>
		</a>
	)
}

type BlogsSectionProps = {
	blogs: Blog[]
}

export default function BlogsSection({ blogs }: BlogsSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const { setFollowerText, setMixBlendMode } = usePointerFollower()

	function handleMouseEnter() {
		setFollowerText('Explore')
		setMixBlendMode(false)
	}

	function handleMouseLeave() {
		setFollowerText('')
	}

	return (
		<SectionLayout className={rootClassName} as="section" cursorColor="inverse">
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h2 className={`${ns}__title h1`}>
							<span>Latest</span>
							<span>
								<i>blogs</i>
							</span>
						</h2>

						<div
							className={`${ns}__blogs`}
							onMouseEnter={() => setMixBlendMode(false)}
						>
							{blogs.map((blog, index) => (
								<BlogCard
									key={index}
									blog={blog}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								/>
							))}
						</div>

						<div className={`${ns}__cta`} data-scroll data-scroll-speed="3">
							<Button as="a" href="/blogs" variant="outline-black">
								View Blogs
							</Button>
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
