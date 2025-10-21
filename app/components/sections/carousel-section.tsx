import ArticleCard from '~/components/article-card'
import Carousel from '~/components/carousel'
import styles from '~/styles/components/sections/carousel-section.module.scss'
import { CarouselSection as CarouselSectionType } from '~/graphql/__generated/sdk'
import { normalizeSlide } from '~/utils'

type CarouselSectionProps = {
	data?: CarouselSectionType
}

export default function CarouselSection({ data }: CarouselSectionProps) {
	const slides = data?.slidesCollection?.items
		.map(normalizeSlide)
		.map((slide, index) => {
			if (!slide) return null
			return <ArticleCard key={slide?.id || index} data={slide} isBig forceDescription />
		})

	return (
		<section className={styles.carouselSection}>
			<Carousel
				slides={slides || []}
				slidesPerView={data?.slidesPerView}
				title={data?.title}
			/>
		</section>
	)
}
