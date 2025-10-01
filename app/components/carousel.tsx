import clsx from 'clsx'
import styles from '~/styles/components/carousel.module.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import { useKeenSlider } from 'keen-slider/react'
import { useMatchMedia } from '~/hooks'
import { useMemo } from 'react'
import 'keen-slider/keen-slider.min.css'

type CarouselProps = {
	title?: string
	slides: JSX.Element[]
	slidesPerView?: number
}

export default function Carousel({
	title,
	slides,
	slidesPerView = 2,
}: CarouselProps) {
	const { isMatching } = useMatchMedia('(max-width:768px)', true)

	const memoizedSliderOptions = useMemo(
		() => ({
			initial: 0,
			loop: false,
			slides: {
				perView: isMatching ? 1 : slidesPerView,
				spacing: 30,
			},
			created: (slider: any) => {
				slider.container.classList.add(styles.visible)
			},
		}),
		[isMatching],
	)

	const [sliderRef, instanceRef] = useKeenSlider(memoizedSliderOptions)

	return (
		<div className={styles.carousel}>
			<div className="container">
				<div className={clsx("mb-40", styles.header)}>
					{title && <h2 className="h1">{title}</h2>}
					<div className={styles.navigation}>
						<button
							className={clsx(styles.button, styles.buttonPrev)}
							title="Previous slide"
							onClick={() => instanceRef.current?.prev()}
						>
							<ArrowLeftIcon />
						</button>
						<button
							className={clsx(styles.button, styles.buttonNext)}
							title="Next slide"
							onClick={() => instanceRef.current?.next()}
						>
							<ArrowRightIcon />
						</button>
					</div>
				</div>
				{slides.length > 0 && (
					<div className={clsx('keen-slider', styles.slider)} ref={sliderRef}>
						{slides.map((slide, index) => (
							<div
								key={index}
								className={clsx('keen-slider__slide', styles.slide)}
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
