import styles from '~/styles/components/sections/hero-section.module.scss'
import { HeroSection as HeroSectionType } from '~/graphql/__generated/sdk'
import clsx from 'clsx'

type HeroSectionProps = {
	data?: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
	return (
		<section className={styles.heroSection}>
			<div className="container">
				<div className={styles.box}>
					<h1 className={clsx(styles.title, 'mb-20')}>Frontend Engineer</h1>
					<div className={styles.subtitle}>
						<div>Currently building <br /> things @ Envoy</div>
						<div>(2022 - Present)</div>
					</div>
				</div>
			</div>
		</section>
	)
}
