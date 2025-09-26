import Avatar from '~/components/avatar'
import Link from '~/components/link'
import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/hero.module.scss'
import type { HeroSection } from '~/types'

type HeroProps = {
	data?: HeroSection
}

export default function Hero({ data }: HeroProps) {
	return (
		<section className={styles.hero}>
			<div className="container">
				<div className={styles.box}>
					<div>
						{data?.avatar?.url && (
							<Avatar src={data?.avatar?.url} alt={data?.avatar?.title} />
						)}
					</div>
					<div className={styles.info}>
						{data?.title?.json && (
							<RichText data={data?.title.json} className="mb-8" />
						)}
						{data?.subtitle?.json && (
							<RichText data={data?.subtitle.json} className="mb-8" />
						)}
						{data?.link?.url && data?.link?.label && (
							<Link className={styles.link} to={data?.link.url || ''}>
								{data?.link.label}
							</Link>
						)}
						{data?.description?.json && (
							<RichText data={data?.description.json} />
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
