import styles from '~/styles/components/sections/hero-section.module.scss'
import { HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import { motion } from 'framer-motion'

type HeroSectionProps = {
	data?: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
	const words = ['Creative', 'Frontend', 'Engineer']

	return (
		<section className={styles.heroSection}>
			<div className="container">
				<div className={styles.box}>
					<h1 className={styles.title}>
						{words.map((word, index) => (
							<span className={styles.wordMask} key={index}>
								<motion.span
									className={styles.word}
									initial="hidden"
									animate="visible"
									variants={{
										hidden: {
											transform:
												'translateY(calc(100% + 10px)) perspective(1200px)',
										},
										visible: {
											transform: 'translateY(0) perspective(1200px)',
											transition: {
												duration: 0.75,
												ease: [0.6, 0.1, 0.25, 1],
												delay: index * 0.075,
											},
										},
									}}
									key={index}
								>
									{word}
								</motion.span>
								{index < words.length - 1 && <br />}
							</span>
						))}
					</h1>
					<motion.div
						className={styles.subtitle}
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {
								opacity: 0,
							},
							visible: {
								opacity: 1,
								transition: {
									duration: 1,
									delay: 0.75,
								},
							},
						}}
					>
						<div>
							Currently building <br /> things @ Envoy
						</div>
						<div>(2022 - Present)</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
