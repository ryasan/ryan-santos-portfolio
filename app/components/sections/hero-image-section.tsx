import styles from '~/styles/components/sections/hero-image-section.module.scss'

type HeroImageSectionProps = {
	data?: {
		image: {
			url: string
			title: string
			description: string
		}
	}
}

export default function HeroImageSection({ data }: HeroImageSectionProps) {
	return (
		<section className={styles.heroImageSection}>
			{data?.image?.url && (
				<div className={styles.image}>
					<img src={data?.image?.url} alt={data?.image?.title} />
				</div>
			)}
		</section>
	)
}
