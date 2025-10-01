import clsx from 'clsx'
import styles from '~/styles/components/carousel.module.scss'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type CarouselProps = {
	slides: JSX.Element[]
	slidesPerView?: number
}

export default function Carousel({ slides, slidesPerView = 2 }: CarouselProps) {
	const [sliderRef] = useKeenSlider({
		slides: {
			perView: slidesPerView,
		},
		slideChanged: () => {
			console.log('slide changed')
		},
	})

	return (
		<div className={styles.carousel}>
			<div className={clsx('keen-slider', styles.slider)} ref={sliderRef}>
				{slides.map((slide, index) => (
					<div key={index} className={clsx('keen-slider__slide',styles.slide)}>
						{slide}
					</div>
				))}
			</div>
		</div>
	)
}
