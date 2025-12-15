import RichText from '~/components/rich-text'
import clsx from 'clsx'
import styles from '~/styles/components/sections/experience-section.module.scss'
import { ExperienceSection as ExperienceSectionType } from '~/graphql/__generated/sdk'

type ExperienceSectionProps = {
	data?: ExperienceSectionType
	id?: string
}

function extractYear(date: string) {
	return date.split('-')[0]
}

export default function ExperienceSection({
	data,
	id,
}: ExperienceSectionProps) {
	return (
		<section className={styles.experienceSection} id={id}>
			<div className="container">
				<div className={styles.box}>
					{/* {data?.title && <h2 className="h3">{data?.title}</h2>} */}

					<div className={styles.experienceList}>
						{data?.experienceCollection?.items?.map((item, index) => {
							if (!item) return null

							return (
								<div className={styles.experienceItem} key={item.sys.id}>
									<div className={styles.count}>
										<div className={clsx(styles.countNumber, 'h2')}>
											{index < 10 ? `0${index + 1}` : index + 1}
										</div>
									</div>
									<div className={styles.info}>
										{item.jobTitle && (
											<div className={clsx(styles.jobTitle, 'h5')}>
												{item.jobTitle}
											</div>
										)}
										{item.company && (
											<div className={clsx(styles.company, 'h2')}>
												{item.company}
											</div>
										)}
										{item.description?.json && (
											<div className={clsx(styles.description)}>
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
