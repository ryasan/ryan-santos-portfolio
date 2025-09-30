import styles from '~/styles/components/sections/carousel-section.module.scss'
import { CarouselSection as CarouselSectionType } from '~/types'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type CarouselSectionProps = {
	data?: CarouselSectionType
}

export default function CarouselSection({ data }: CarouselSectionProps) {
	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 2,
		},
		slideChanged: () => {
			console.log('slide changed')
		},
	})

	return (
		<div className={styles.carouselSection}>
			<div ref={sliderRef} className="keen-slider">
				{/* {slides.map((slide, index) => (
					<div key={index} className="keen-slider__slide">
						{slide}
					</div>
				))} */}
				<div className="keen-slider__slide">1</div>
				<div className="keen-slider__slide">2</div>
				<div className="keen-slider__slide">3</div>
			</div>
		</div>
	)
}
