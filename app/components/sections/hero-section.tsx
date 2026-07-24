import { ArrowRightIcon } from '~/components/icons'
import { gsap } from 'gsap'
import { Link } from '@remix-run/react'
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
						<p className={`${ns}__eyebrow`}>Hello, I&apos;m Ryan.</p>
						<h1 className={`${ns}__title`}>
							Developing digital products with emphasis on{' '}
							<span className={`${ns}__title-accent`}>frontend web</span>
						</h1>
					</div>

					<div className={`${ns}__footer`}>
						<Link
							className={clsx('button', 'button--l', `${ns}__cta`)}
							to="#contact"
						>
							Let&apos;s Talk
							<ArrowRightIcon
								aria-hidden
								className={`${ns}__cta-icon`}
								fill="currentColor"
								height={28}
								width={28}
							/>
						</Link>
						<p className={`${ns}__description`}>
							I&apos;m a software engineer harnessing the power of web
							technologies to achieve online goals.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
