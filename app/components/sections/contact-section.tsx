import clsx from 'clsx'
import styles from '~/styles/components/sections/contact-section.module.scss'
import {
	CodepenIcon,
	CopySimpleIcon,
	GithubIcon,
	LinkedinIcon,
} from '~/components/icons'
import { useState, useEffect } from 'react'

const email = 'ryasancodes@gmail.com'

export default function ContactSection() {
	const [copySuccess, setCopySuccess] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(email)
		setCopySuccess(true)
	}

	useEffect(() => {
		if (copySuccess) {
			setTimeout(() => {
				setCopySuccess(false)
			}, 1000)
		}
	}, [copySuccess])

	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.box}>
					<h2 className={clsx(styles.title, 'h1 mb-56')}>
						Let's get to know each other.
					</h2>
					<button
						className={clsx(styles.copyButton, 'button')}
						onClick={copyToClipboard}
						title="Copy to clipboard"
					>
						{copySuccess ? 'email copied!' : email}
						<CopySimpleIcon className={styles.copyIcon} />
					</button>
					<div className={styles.socialLinks}>
						<a
							href="https://linkedin.com/in/ryasan86"
							target="_blank"
							rel="noopener noreferrer"
						>
							<LinkedinIcon className={styles.icon} />
						</a>
						<a
							href="https://github.com/ryasan"
							target="_blank"
							rel="noopener noreferrer"
						>
							<GithubIcon className={styles.icon} />
						</a>
						<a
							href="https://codepen.io/ryasan86"
							target="_blank"
							rel="noopener noreferrer"
						>
							<CodepenIcon className={styles.icon} />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
