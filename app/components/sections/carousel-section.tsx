import ArticleCard from '~/components/article-card'
import Carousel from '~/components/carousel'
import clsx from 'clsx'
import styles from '~/styles/components/sections/carousel-section.module.scss'
import { CarouselSection as CarouselSectionType } from '~/types'
import { normalizeData } from '~/utils'

type CarouselSectionProps = {
	data?: CarouselSectionType
}

export default function CarouselSection({ data }: CarouselSectionProps) {
	const normalizedSlides = data?.slidesCollection?.items?.map((item) => {
		const slideType = item.__typename
		if (slideType === 'Blog') return normalizeData.fromBlogToCard(item)
		if (slideType === 'Projects') return normalizeData.fromProjectsToCard(item)
		return null
	})

	const slides = normalizedSlides?.map((slide) => (
		<ArticleCard key={slide?.eyebrow} {...slide} />
	))


	console.log(data)
	return (
		<div className={styles.carouselSection}>
			<div className="container">
				<h2 className={clsx("mb-32", styles.title)}>{data?.title}</h2>
				<Carousel slides={slides || []} slidesPerView={data?.slidesPerView} />
			</div>
		</div>
	)
}
