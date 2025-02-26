import clsx from 'clsx'
import { Link } from '@remix-run/react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

import Button from '~/components/button'
import SectionLayout from '~/components/section-layout'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type Blog } from '~/types'
import { usePointerFollower } from '~/context/pointer-follower'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

const ns = 'blogs-section'

type BlogCardProps = {
	blog: Blog
	onMouseEnter(e: React.MouseEvent): void
	onMouseLeave(e: React.MouseEvent): void
}

function BlogCard({ blog, onMouseEnter, onMouseLeave }: BlogCardProps) {
	// const blogCardRef = useRef(null)
	// const isInView = useInView(blogCardRef, { once: true, amount: 0.4 })

	return (
		<Link
			className={`${ns}__blog`}
			to={`/blog/${blog.slug}`}
			// ref={blogCardRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			// style={{
			// 	opacity: isInView ? 1 : 0,
			// 	transform: isInView ? 'translateY(0)' : 'translateY(100px)',
			// }}
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
		</Link>
	)
}

type BlogsSectionProps = {
	blogs: Blog[]
}

export default function BlogsSection({ blogs }: BlogsSectionProps) {
	const rootClassName = clsx({
		[ns]: true,
	})

	const { setFollowerText, setMixBlendMode } = usePointerFollower()

	const blogsRef = useRef(null)
	const isInView = useInView(blogsRef, { once: true, amount: 0.4 })

	function handleMouseEnter() {
		setFollowerText('Drag')
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
							ref={blogsRef}
							// style={{
							// 	opacity: isInView ? 1 : 0,
							// 	transform: isInView ? 'translateY(0)' : 'translateY(100px)',
							// }}
						>
							<Swiper
								spaceBetween={30}
								freeMode={true}
								modules={[FreeMode, Pagination]}
								breakpoints={{
									320: { slidesPerView: 1.1 },
									768: { slidesPerView: 2.4 },
								}}
							>
								{blogs.map((blog, index) => (
									<SwiperSlide key={index}>
										<BlogCard
											blog={blog}
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						<div className={`${ns}__cta`}>
							<Button as="a" href="/blogs" variant="outline-black">
								View Posts
							</Button>
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
