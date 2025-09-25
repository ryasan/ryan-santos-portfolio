import Avatar from '~/components/avatar'
import Link from '~/components/link'
import styles from '~/styles/components/sections/hero.module.scss'
import type { HeroSection } from '~/types'
import RichText from '~/components/rich-text'

type HeroProps = {
	data?: HeroSection
}

function Hero({ data }: HeroProps) {
	const hasAvatar = Boolean(data?.avatar?.url)
	const hasTitle = Boolean(data?.title?.json)
	const hasSubtitle = Boolean(data?.subtitle?.json)
	const hasDescription = Boolean(data?.description?.json)
	const hasLink = Boolean(data?.link?.url) && Boolean(data?.link?.label)

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
