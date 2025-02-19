import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from '~/components/button'
import Icon from '~/components/icons'
import SectionLayout from '~/components/section-layout'
import { teleport } from '~/utils'
import { usePointerFollower } from '~/context/pointer-follower-context'

const ns = 'hero-section'

const socialLinks = [
	{
		icon: 'github',
		name: 'GitHub',
		url: 'https://github.com/ryasan',
	},
	{
		icon: 'linkedin',
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/ryasan86',
	},
	{
		icon: 'codepen',
		name: 'CodePen',
		url: 'https://codepen.io/ryasan86',
	},
]

export default function HeroSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const rootRef = useRef(null)
	const scrollDownRef = useRef(null)
	const delay = 0.75
	const textA = 'Ryan  Santos'.split(' ')
	const textB = 'Frontend  Engineer'.split(' ')

	const { resetFollowerSize, setFollowerSize } = usePointerFollower()

	function handleSocialLinkEnter() {
		setFollowerSize(0)
	}

	function handleSocialLinkLeave() {
		resetFollowerSize()
	}

	useEffect(() => {
		if (scrollDownRef.current) {
			teleport(scrollDownRef.current).toEnd(document.body)
		}
	}, [])

	// prettier-ignore
	return (
		<SectionLayout
			className={rootClassName}
			ref={rootRef}
			as="section"
			cursorColor="inverse"
			disableSmoothScroll
		>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h1 className={`${ns}__title`}>
							<span className={`${ns}__title-line`}>
								{textA.map((word, index) =>
									word === '' ? (
										' '
									) : (
										<span className={`${ns}__title-word`} key={index}>
											<motion.span
												initial={{ y: 150 }}
												animate={{ y: 0 }}
												transition={{
													duration: 0.35,
													delay: delay + index * 0.02,
													ease: 'easeInOut',
												}}
											>
												{word}
											</motion.span>
										</span>
									),
								)}
							</span>

							<span className={`${ns}__title-line`}>
								{textB.map((word, index) =>
									word === '' ? (
										' '
									) : (
										<span className={`${ns}__title-word`} key={index}>
											<motion.span
												initial={{ y: 150 }}
												animate={{ y: 0 }}
												transition={{
													duration: 0.35,
													delay: delay + (textA.length + index) * 0.02,
													ease: 'easeInOut',
												}}
											>
												{word}
											</motion.span>
										</span>
									),
								)}
							</span>
						</h1>

						<p className={`${ns}__description`}>
							<motion.span
								initial={{ y: 150 }}
								animate={{ y: 0 }}
								transition={{
									duration: 0.35,
									delay: (delay * 1.5) + (textA.length + textB.length) * 0.02,
									ease: 'easeInOut',
								}}
							>
								Building beautiful web experiences one line of code at a time.
							</motion.span>
						</p>

						<div className={`${ns}__cta`}>
							<motion.div
								initial={{ y: '100%' }}
								animate={{ y: 0 }}
								transition={{
									duration: 0.35,
									delay: (delay * 2) + (textA.length + textB.length) * 0.02,
									ease: 'easeOut',
								}}
							>
								<Button
									as="a"
									href="mailto:ryansantos86@gmail.com"
									rel="noopener noreferrer"
									target="_blank"
									variant="black"
									icon="arrow-right"
								>
									Let&apos;s Connect
								</Button>
							</motion.div>
						</div>

						<div className={`${ns}__social`}>
							{socialLinks.map((link, index) => (
								<motion.a
									key={index}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`${ns}__social-link`}
									onMouseEnter={handleSocialLinkEnter}
									onMouseLeave={handleSocialLinkLeave}
									initial={{ y: 150 }}
									animate={{ y: 0 }}
									transition={{
										duration: 0.35,
										delay: (delay * 2.5) + (textA.length + textB.length) * 0.02 + index * 0.02,
										ease: 'easeOut',
									}}
								>
									<Icon name={link.icon} />
									<span className="visually-hidden">{link.name}</span>
								</motion.a>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="scroll-down" ref={scrollDownRef}>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.5,
						delay: (delay * 3) + (textA.length + textB.length) * 0.02,
						ease: 'easeOut',
					}}
				>
					<span />
					<span>Scroll</span>
					<Icon name="chevron-down" />
				</motion.div>
			</div>
		</SectionLayout>
	)
}
