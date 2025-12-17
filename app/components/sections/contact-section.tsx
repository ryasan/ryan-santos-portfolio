import clsx from 'clsx'
import styles from '~/styles/components/sections/contact-section.module.scss'
import  { type ContactSection } from '~/graphql/__generated/sdk'
import {
	CodepenIcon,
	CopySimpleIcon,
	GithubIcon,
	LinkedinIcon,
} from '~/components/icons'
import { useState } from 'react'

const icons = {
	codepen: CodepenIcon,
	github: GithubIcon,
	linkedin: LinkedinIcon,
} as const

const getIcon = (icon?: string) => {
	const Icon = icons[icon?.toLowerCase() as keyof typeof icons]
	return Icon ? <Icon aria-hidden="true" className={styles.icon} /> : null
}
type ContactSectionProps = {
	data?: ContactSection
	id?: string
}

export default function ContactSection({ data, id }: ContactSectionProps) {
	const [copySuccess, setCopySuccess] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(data?.email || '')
		setCopySuccess(true)
		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	return (
		<section className={styles.contactSection} id={id}>
			<div className="container">
				<div className={styles.box}>
					{data?.title && (
						<h2 className={clsx(styles.title, 'h1 mb-56')}>{data.title}</h2>
					)}
					{data?.email && (
						<button
							className={clsx(styles.copyButton, 'button')}
							onClick={copyToClipboard}
							title="Copy to clipboard"
						>
							{copySuccess ? 'email copied!' : data.email}
							<CopySimpleIcon className={styles.copyIcon} />
						</button>
					)}
					<div className={styles.socialLinks}>
						{data?.socialLinksCollection?.items?.map((social) => {
							if (!social?.url || !social?.label) return null

							return (
								<a
									aria-label={social.label}
									href={social.url}
									key={social.sys.id}
									rel="noopener noreferrer"
									target="_blank"
								>
									{getIcon(social.icon || '')}
								</a>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
