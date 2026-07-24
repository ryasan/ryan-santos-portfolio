import clsx from 'clsx'
import { type ContactSection } from '~/graphql/__generated/sdk'
import {
	CodepenIcon,
	CopySimpleIcon,
	GithubIcon,
	LinkedinIcon,
} from '~/components/icons'
import { useState } from 'react'

const ns = 'contact-section'

const icons = {
	codepen: CodepenIcon,
	github: GithubIcon,
	linkedin: LinkedinIcon,
} as const

const getIcon = (icon?: string) => {
	const Icon = icons[icon?.toLowerCase() as keyof typeof icons]
	return Icon ? <Icon aria-hidden="true" className={`${ns}__icon`} /> : null
}

type ContactSectionProps = {
	data?: ContactSection
	id?: string
}

export default function ContactSection({ data, id }: ContactSectionProps) {
	const [copySuccess, setCopySuccess] = useState(false)

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(data?.email || '')
		setCopySuccess(true)
		setTimeout(() => {
			setCopySuccess(false)
		}, 2000)
	}

	return (
		<section className={ns} id={id}>
			<div className="container">
				<div className={`${ns}__box`}>
					{data?.title && (
						<h2 className={clsx(`${ns}__title`, 'h1', 'mb-56')}>{data.title}</h2>
					)}
					{data?.email && (
						<button
							className={clsx(`${ns}__copy-button`, 'button', 'button--l')}
							onClick={copyToClipboard}
							title="Copy to clipboard"
							type="button"
						>
							{copySuccess ? 'email copied!' : data.email}
							<CopySimpleIcon
								aria-hidden
								className={`${ns}__copy-icon`}
								fill="currentColor"
								height={28}
								width={28}
							/>
						</button>
					)}
					<div className={`${ns}__social-links`}>
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
