import { ArrowRightIcon } from '~/components/icons'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import clsx from 'clsx'

gsap.registerPlugin(SplitText)

const ns = 'hero-section'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const eyebrowRef = useRef<HTMLParagraphElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const footerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const eyebrow = eyebrowRef.current
			const title = titleRef.current
			const footer = footerRef.current

			SplitText.create(title, {
				onSplit(self) {
					gsap.set(title, { visibility: 'visible' })

					return gsap.fromTo(
						self.lines,
						{
							opacity: 0,
							x: 50,
						},
						{
							duration: 1.75,
							ease: 'power4',
							opacity: 1,
							stagger: 0.5,
							x: 0,
						},
					)
				},
				type: 'lines',
			})

			gsap.to(eyebrow, {
				delay: 2,
				duration: 1.2,
				ease: 'power3',
				opacity: 1,
			})

			gsap.to(footer, {
				delay: 2,
				duration: 1.2,
				ease: 'power3',
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
			<div className={clsx(`${ns}__container`, 'container')}>
				<div className={`${ns}__content`}>
					<div className={`${ns}__intro`}>
						<p className={`${ns}__eyebrow`} ref={eyebrowRef}>
							Hello! I&apos;m Ryan.
						</p>
						<h1 className={`${ns}__title`} ref={titleRef}>
							Building digital <br /> products & experiences for{' '}
							<span className={`${ns}__title-accent`}>modern brands</span>
						</h1>
					</div>

					<div className={`${ns}__footer`} ref={footerRef}>
						<a
							className={clsx('button', 'button--l', `${ns}__cta`)}
							href="mailto:ryansantos.dev@gmail.com"
						>
							Let&apos;s Talk
							<ArrowRightIcon
								aria-hidden
								className={`${ns}__cta-icon`}
								fill="currentColor"
								height={28}
								width={28}
							/>
						</a>
						<p className={`${ns}__description`}>
							Frontend Engineer harnessing the power of web technologies to
							achieve online goals.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
