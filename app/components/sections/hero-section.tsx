import clsx from 'clsx'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const accentRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const section = sectionRef.current
			const stickyBox = stickyBoxRef.current
			const accent = accentRef.current

			if (!section || !stickyBox || !accent) return

			const words = gsap.utils.toArray<HTMLElement>('.word')
			words.forEach((word, wordIndex) => {
				const chars = word.querySelectorAll('.char')
				gsap.to(chars, {
					delay: wordIndex * 0.05,
					duration: 0.5,
					ease: 'power3.out',
					stagger: 0.003,
					y: 0,
				})
			})

			gsap.to(accent, {
				delay: 1.2,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})
		},
		{ scope: sectionRef },
	)

	return (
		<section
			className={clsx('hero-section', data?.isTopOfPage && 'is-top-of-page')}
			id={id}
			ref={sectionRef}
		>
			<div className="container">
				<div className="sticky-box" ref={stickyBoxRef}>
					<div className="accent-wrapper">
						<div className="accent-container" ref={accentRef}>
							<div className="corner-bracket top-right" />
							<div className="corner-bracket bottom-left" />
							<div className="accent-label label-top-right code">
								[v2.6_PROD]
							</div>
							<div className="accent-label label-bottom-left code">
								[STACK: REMIX / GSAP / CONTENTFUL]
							</div>
						</div>

						{data?.titleWords && (
							<h1 className="title hero-title">
								{data.titleWords?.map((word, index) => {
									if (!word) return null

									return (
										<span className="word-mask" key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span className="word" key={wordIndex}>
														{singleWord.split('').map((char, charIndex) => (
															<span className="char" key={charIndex}>
																{char}
															</span>
														))}
													</span>
												))
												.reduce<ReactNode[]>((acc, curr, wordIndex) => {
													if (wordIndex === 0) return [curr]
													return [...acc, ' ', curr]
												}, [])}
										</span>
									)
								})}
							</h1>
						)}

						{data?.titleWordsMobile && (
							<h1 className="title hero-title hero-title--mobile">
								{data.titleWordsMobile?.map((word, index) => {
									if (!word) return null

									return (
										<span className="word-mask" key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span className="word" key={wordIndex}>
														{singleWord.split('').map((char, charIndex) => (
															<span className="char" key={charIndex}>
																{char}
															</span>
														))}
													</span>
												))
												.reduce<ReactNode[]>((acc, curr, wordIndex) => {
													if (wordIndex === 0) return [curr]
													return [...acc, ' ', curr]
												}, [])}
										</span>
									)
								})}
							</h1>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
