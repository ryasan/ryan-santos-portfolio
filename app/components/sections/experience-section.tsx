import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/experience-section.module.scss'
import type { ExperienceSection } from '~/types'

type ExperienceSectionProps = {
	data?: ExperienceSection
}

function extractYear(date: string) {
	return date.split('-')[0]
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
	return (
		<section className={styles.experienceSection}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && (
						<h2 className="label">{data?.title}</h2>
					)}

					<ul className={styles.experienceList}>
						{data?.experienceCollection.items.map((item) => {
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
										{(item.jobTitle || item.company) && (
											<h3 className="mb-16">
												{[item.jobTitle, item.company]
													.filter(Boolean)
													.join(' @ ')}
											</h3>
										)}
										{item.description.json && (
											<RichText data={item.description.json} />
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
