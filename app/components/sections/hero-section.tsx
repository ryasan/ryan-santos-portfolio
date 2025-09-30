import Avatar from '~/components/avatar'
import Link from '~/components/link'
import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/hero-section.module.scss'
import { HeroSection as HeroSectionType } from '~/types'

type HeroSectionProps = {
	data?: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
	return (
		<section className={styles.heroSection}>
			<div className="container">
				<div className={styles.box}>
					<div>
						{data?.avatar?.url && (
							<Avatar src={data?.avatar?.url} alt={data?.avatar?.title} />
						)}
					</div>
					<div className={styles.info}>
						{data?.title && data?.isTopOfPage && (
							<h1 className="mb-8">{data?.title}</h1>
						)}
						{data?.title && !data?.isTopOfPage && (
							<h2 className="h1 mb-8">{data?.title}</h2>
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
