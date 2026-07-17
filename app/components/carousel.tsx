import clsx from 'clsx'
import { ArrowLeftIcon, ArrowRightIcon } from '~/components/icons'
import { useKeenSlider } from 'keen-slider/react'
import { useMatchMedia } from '~/hooks'
import { useMemo } from 'react'

import 'keen-slider/keen-slider.min.css'

const ns = 'carousel'

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
				slider.container.classList.add(`${ns}__slider--visible`)
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
		<div className={ns}>
			<div className="container">
				<div className={clsx('mb-40', `${ns}__header`)}>
					{title && <h2 className="h1">{title}</h2>}
					<div className={`${ns}__navigation`}>
						<button
							className={clsx(`${ns}__button`, `${ns}__button--prev`)}
							onClick={() => instanceRef.current?.prev()}
							title="Previous slide"
						>
							<ArrowLeftIcon />
						</button>
						<button
							className={clsx(`${ns}__button`, `${ns}__button--next`)}
							onClick={() => instanceRef.current?.next()}
							title="Next slide"
						>
							<ArrowRightIcon />
						</button>
					</div>
				</div>
				{slides.length > 0 && (
					<div
						className={clsx('keen-slider', `${ns}__slider`)}
						ref={sliderRef}
					>
						{slides.map((slide, index) => (
							<div
								className={clsx('keen-slider__slide', `${ns}__slide`)}
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
