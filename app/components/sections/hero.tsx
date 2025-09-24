import Avatar from '~/components/avatar'
import Link from '~/components/link'
import styles from '~/styles/components/sections/hero.module.scss'
import type { HeroSection } from '~/types'

type HeroProps = {
	data: HeroSection
}

const placeholderData = {
	title: `Ryan Santos`,
	subtitle: 'Frontend Engineer',
	link: {
		url: `https://medium.com/@ryansantos`,
		title: `medium.com`,
	},
	description: `I'm a frontend engineer with a passion for building beautiful and functional web applications.`,
}

function Hero({ data }: HeroProps) {
	return (
		<section className={styles.hero}>
			<div className="container">
				<div className={styles.box}>
					<div>
						<Avatar src={undefined} alt={undefined} />
					</div>
					<div className={styles.info}>
						<h1 className="mb-8">{placeholderData.title}</h1>
						<h2 className="mb-8 body-2">{placeholderData.subtitle}</h2>
						<Link className={styles.link} to={placeholderData.link.url}>
							{placeholderData.link.title}
						</Link>
						<p className="body-2">{placeholderData.description}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
