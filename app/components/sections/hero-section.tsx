import clsx from 'clsx'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { type ReactNode } from 'react'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	return (
		<section
			className={clsx('hero-section', data?.isTopOfPage && 'is-top-of-page')}
			id={id}
		>
			<div className="container">
				<div className="sticky-box">
					<div className="accent-wrapper">
						<div className="accent-container">
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
