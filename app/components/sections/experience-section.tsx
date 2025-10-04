import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/experience-section.module.scss'
import { ExperienceSection as ExperienceSectionType } from '~/graphql/__generated/sdk'

type ExperienceSectionProps = {
	data?: ExperienceSectionType
}

function extractYear(date: string) {
	return date.split('-')[0]
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
	return (
		<section className={styles.experienceSection}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && <h2 className="label">{data?.title}</h2>}

					<ul className={styles.experienceList}>
						{data?.experienceCollection?.items?.map((item) => {
							if (!item) return null

							return (
								<li className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.yearRange}>
										{item.startDate && item.endDate && (
											<div>
												{extractYear(item.startDate)} -{' '}
												{item.isCurrent ? 'now' : extractYear(item.endDate)}
											</div>
										)}
									</div>
									<div className={styles.info}>
										{item.title?.json && (
											<div className={styles.title}>
												<RichText data={item.title.json} />
											</div>
										)}
										{item.description?.json && (
											<div className={styles.description}>
												<RichText data={item.description.json} />
											</div>
										)}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</section>
	)
}
