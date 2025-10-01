import ArticleCard from '~/components/article-card'
import Carousel from '~/components/carousel'
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

		console.warn(`Unknown slide type: ${slideType}`)
		return null
	})

	const slides = normalizedSlides?.map((slide, index) => (
		<ArticleCard key={index} {...slide} />
	))

	return (
		<div className={styles.carouselSection}>
			<Carousel
				slides={slides || []}
				slidesPerView={data?.slidesPerView}
				title={data?.title}
			/>
		</div>
	)
}
