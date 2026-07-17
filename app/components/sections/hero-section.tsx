import clsx from 'clsx'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'

const ns = 'hero-section'

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

			const words = gsap.utils.toArray<HTMLElement>(`.${ns}__word`)
			words.forEach((word, wordIndex) => {
				const chars = word.querySelectorAll(`.${ns}__char`)
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
			className={clsx(ns, data?.isTopOfPage && 'is-top-of-page')}
			id={id}
			ref={sectionRef}
		>
			<div className={`${ns}__container`}>
				<div className={`${ns}__sticky-box`} ref={stickyBoxRef}>
					<div className={`${ns}__accent-wrapper`}>
						<div className={`${ns}__accent-container`} ref={accentRef}>
							<div className={`${ns}__corner-bracket top-right`} />
							<div className={`${ns}__corner-bracket bottom-left`} />
							<div className={`${ns}__accent-label label-top-right code`}>
								[v2.6_PROD]
							</div>
							<div className={`${ns}__accent-label label-bottom-left code`}>
								[STACK: REMIX / GSAP / CONTENTFUL]
							</div>
						</div>

						{data?.titleWords && (
							<h1 className={`${ns}__title hero-title`}>
								{data.titleWords?.map((word, index) => {
									if (!word) return null

									return (
										<span className={`${ns}__word-mask`} key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span className={`${ns}__word`} key={wordIndex}>
														{singleWord.split('').map((char, charIndex) => (
															<span className={`${ns}__char`} key={charIndex}>
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
							<h1 className={`${ns}__title hero-title hero-title--mobile`}>
								{data.titleWordsMobile?.map((word, index) => {
									if (!word) return null

									return (
										<span className={`${ns}__word-mask`} key={index}>
											{word
												.split(' ')
												.map((singleWord, wordIndex) => (
													<span className={`${ns}__word`} key={wordIndex}>
														{singleWord.split('').map((char, charIndex) => (
															<span className={`${ns}__char`} key={charIndex}>
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
