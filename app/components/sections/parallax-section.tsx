import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import SectionLayout from '~/components/section-layout'

const ns = 'parallax-section'

const images = [
	{ src: 'https://picsum.photos/id/1/800/1200', alt: 'Image 1' },
	{ src: 'https://picsum.photos/id/2/800/1200', alt: 'Image 2' },
	{ src: 'https://picsum.photos/id/3/800/1200', alt: 'Image 3' },
	{ src: 'https://picsum.photos/id/4/800/1200', alt: 'Image 4' },
	{ src: 'https://picsum.photos/id/5/800/1200', alt: 'Image 5' },
	{ src: 'https://picsum.photos/id/6/800/1200', alt: 'Image 6' },
]

export default function ParallaxSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => {
				return (prev + 1) % images.length
			})
		}, 2000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<SectionLayout className={rootClassName}>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<div
							className={`${ns}__text-container`}
							data-scroll
							data-scroll-speed="5"
						>
							<h2 className="h1">Be Bold</h2>
						</div>
						<div className={`${ns}__images`}>
							{images.map((image, index) => (
								<div key={index} className={`${ns}__image`}>
									<AnimatePresence>
										{activeIndex === index && (
											<motion.img
												key={index}
												src={image.src}
												alt={image.alt}
												data-media
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 1 }}
											/>
										)}
									</AnimatePresence>
								</div>
							))}
							<div
								className={`${ns}__text-container`}
								data-scroll
								data-scroll-speed="5"
							>
								<h2 className="h1">Be Bold</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
