import { ArrowRightIcon } from '~/components/icons'
import { gsap } from 'gsap'
import { type HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { useRef } from 'react'

const ns = 'hero-section'

type HeroSectionProps = {
	data?: HeroSectionType
	id?: string
}

export default function HeroSection({ data, id }: HeroSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const container = containerRef.current

		if (!container) return

		gsap.to(container, {
			duration: 1,
			ease: 'power2.out',
			opacity: 1,
		})
	}, [])

	return (
		<section
			className={clsx(ns, data?.isTopOfPage && 'is-top-of-page')}
			id={id}
		>
			<div className={clsx(`${ns}__container`, 'container')} ref={containerRef}>
				<div className={`${ns}__content`}>
					<div className={`${ns}__intro`}>
						<p className={`${ns}__eyebrow`}>Hello! I&apos;m Ryan.</p>
						<h1 className={`${ns}__title`}>
							Building digital web experiences that{' '}
							<span className={`${ns}__title-accent`}>people love to use</span>
						</h1>
					</div>

					<div className={`${ns}__footer`}>
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
							Frontend Engineer harnessing the power of web
							technologies to achieve online goals.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
