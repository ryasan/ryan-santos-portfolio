import clsx from 'clsx'
import styles from '~/styles/components/sections/contact-section.module.scss'
import type { ContactSection } from '~/graphql/__generated/sdk'
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
	return Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null
}
type ContactSectionProps = {
	id?: string
	data?: ContactSection
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
									key={social.sys.id}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
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
