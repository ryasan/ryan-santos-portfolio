import Link from '~/components/link'
import { type SocialSection as SocialSectionType } from '~/graphql/__generated/sdk'
import {
	CodepenIcon,
	EnvelopeIcon,
	GithubIcon,
	LinkedinIcon,
} from '~/components/icons'
import styles from './social-section.module.css'


const icons = {
	codepen: CodepenIcon,
	email: EnvelopeIcon,
	github: GithubIcon,
	linkedin: LinkedinIcon,
} as const

const getIcon = (icon?: string) => {
	const Icon = icons[icon?.toLowerCase() as keyof typeof icons]
	return Icon ? <Icon aria-hidden="true" className={styles.icon} /> : null
}

type SocialSectionProps = {
	data?: SocialSectionType
	id?: string
}

export default function SocialSection({ data, id }: SocialSectionProps) {
	return (
		<section className={styles.root} id={id}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && <h2 className="label">{data.title}</h2>}

					<div className={styles.socialList}>
						{data?.socialLinksCollection?.items?.map((social) => {
							if (!social?.url || !social?.label) return null

							return (
								<div className={styles.socialItem} key={social.sys.id}>
									{getIcon(social.icon || '')}
									<Link className="link" to={social.url}>
										{social.label}
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
