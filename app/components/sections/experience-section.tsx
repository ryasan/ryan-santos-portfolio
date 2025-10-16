import RichText from '~/components/rich-text'
import clsx from 'clsx'
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

					<div className={styles.experienceList}>
						{data?.experienceCollection?.items?.map((item) => {
							if (!item) return null

							return (
								<div className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.yearRange}>
										{item.startDate && item.endDate && (
											<div className="body-2">
												{extractYear(item.startDate)} -{' '}
												{item.isCurrent ? 'now' : extractYear(item.endDate)}
											</div>
										)}
									</div>
									<div className={styles.info}>
										{item.jobTitle && (
											<div className={clsx(styles.jobTitle, 'body-2')}>
												{item.jobTitle}
											</div>
										)}
										{item.company && (
											<h3 className={clsx(styles.company, 'h2')}>
												{item.company}
											</h3>
										)}
										{item.description?.json && (
											<div className={styles.description}>
												<RichText data={item.description.json} />
											</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
