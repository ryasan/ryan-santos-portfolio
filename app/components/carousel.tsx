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
				perView: isMatching ? 1 : slidesPerView || 2,
				spacing: 30,
			},
		}),
		[isMatching, slidesPerView],
	)

	const [sliderRef, instanceRef] = useKeenSlider(memoizedSliderOptions)

	return (
		<div className={ns}>
			<div className="container">
				<div className={clsx(`${ns}__header`, 'mb-40')}>
					{title && <h2>{title}</h2>}
					<div className={`${ns}__navigation`}>
						<button
							className={clsx(`${ns}__button`, `${ns}__button--prev`)}
							disabled={instanceRef.current?.track.details.isBeginning}
							onClick={() => instanceRef.current?.prev()}
							title="Previous slide"
						>
							<ArrowLeftIcon />
						</button>
						<button
							className={clsx(`${ns}__button`, `${ns}__button--next`)}
							disabled={instanceRef.current?.track.details.isEnd}
							onClick={() => instanceRef.current?.next()}
							title="Next slide"
						>
							<ArrowRightIcon />
						</button>
					</div>
				</div>
				{slides.length > 0 && (
					<div className={clsx(`${ns}__slider`, 'keen-slider')} ref={sliderRef}>
						{slides.map((slide, index) => (
							<div
								className={clsx(`${ns}__slide`, 'keen-slider__slide')}
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
