import clsx from 'clsx'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import { useKeenSlider } from 'keen-slider/react'
import { useMatchMedia } from '~/hooks'
import { useMemo } from 'react'

import 'keen-slider/keen-slider.min.css'
import styles from './carousel.module.css'


type CarouselProps = {
	slides: (JSX.Element | null)[]
	slidesPerView?: number | null
	title?: string | null
}

export default function Carousel({
	slides,
	slidesPerView,
	title,
}: CarouselProps) {
	const { isMatching } = useMatchMedia('(max-width:768px)', true)

	const memoizedSliderOptions = useMemo(
		() => ({
			created: (slider: any) => {
				slider.container.classList.add(styles.visible!)
			},
			initial: 0,
			loop: false,
			slides: {
				perView: isMatching ? 1 : (slidesPerView || 2),
				spacing: 30,
			},
		}),
		[isMatching, slidesPerView],
	)

	const [sliderRef, instanceRef] = useKeenSlider(memoizedSliderOptions)

	return (
		<div className={styles.root}>
			<div className="container">
				<div className={clsx(styles.header, 'mb-40')}>
					{title && <h2 className="h1">{title}</h2>}
					<div className={styles.navigation}>
						<button
							className={styles.prev}
							onClick={() => instanceRef.current?.prev()}
							title="Previous slide"
						>
							<ArrowLeftIcon />
						</button>
						<button
							className={styles.next}
							onClick={() => instanceRef.current?.next()}
							title="Next slide"
						>
							<ArrowRightIcon />
						</button>
					</div>
				</div>
				{slides.length > 0 && (
					<div
						className={clsx(styles.slider, 'keen-slider')}
						ref={sliderRef}
					>
						{slides.map((slide, index) => (
							<div
								className={clsx(styles.slide, 'keen-slider__slide')}
								key={index}
							>
								{slide}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
