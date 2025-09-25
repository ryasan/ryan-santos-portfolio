import Avatar from '~/components/avatar'
import Link from '~/components/link'
import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/hero.module.scss'
import type { HeroSection } from '~/types'

type HeroProps = {
	data?: HeroSection
}

function Hero({ data }: HeroProps) {
	const hasAvatar = data?.avatar?.url
	const hasTitle = data?.title?.json
	const hasSubtitle = data?.subtitle?.json
	const hasDescription = data?.description?.json
	const hasLink = data?.link?.url && data?.link?.label

	return (
		<section className={styles.hero}>
			<div className="container">
				<div className={styles.box}>
					<div>
						{hasAvatar && (
							<Avatar src={data?.avatar?.url} alt={data?.avatar?.title} />
						)}
					</div>
					<div className={styles.info}>
						{hasTitle && <RichText data={data?.title.json} className="mb-8" />}
						{hasSubtitle && (
							<RichText data={data?.subtitle.json} className="mb-8" />
						)}
						{hasLink && (
							<Link className={styles.link} to={data?.link.url || ''}>
								{data?.link.label}
							</Link>
						)}
						{hasDescription && (
							<RichText data={data?.description.json} />
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
