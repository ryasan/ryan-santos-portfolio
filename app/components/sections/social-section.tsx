import Link from '~/components/link'
import styles from '~/styles/components/sections/social-section.module.scss'
import { SocialSection as SocialSectionType } from '~/graphql/__generated/sdk'
import {
	CodepenIcon,
	EnvelopeIcon,
	GithubIcon,
	LinkedinIcon,
} from '~/components/icons'

const icons = {
	codepen: CodepenIcon,
	email: EnvelopeIcon,
	github: GithubIcon,
	linkedin: LinkedinIcon,
} as const

const getIcon = (icon?: string) => {
	const Icon = icons[icon?.toLowerCase() as keyof typeof icons]
	return Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null
}

type SocialSectionProps = {
	data?: SocialSectionType
}

export default function SocialSection({ data }: SocialSectionProps) {
	return (
		<section className={styles.socialSection}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && <h2 className="label">{data.title}</h2>}

					<ul className={styles.socialList}>
						{data?.socialLinksCollection?.items?.map((social) => {
							if (!social?.url || !social?.label) return null

							return (
								<li className={styles.socialItem} key={social.sys.id}>
									{getIcon(social.icon || '')}
									<Link className="link" to={social.url}>
										{social.label}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</section>
	)
}
