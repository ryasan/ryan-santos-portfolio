import clsx from 'clsx'
import styles from '~/styles/components/link.module.scss'
import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { ArrowUpRightIcon } from '~/components/icons'
import { Link as RemixLink } from '@remix-run/react'

type LinkProps = {
	to: string
	children: React.ReactNode
	className?: string
	target?: string
	rel?: string
} & Omit<RemixLinkProps, 'to' | 'children' | 'className'>

function isExternalLink(url: string): boolean {
	return (
		url.startsWith('http://') ||
		url.startsWith('https://') ||
		url.startsWith('mailto:') ||
		url.startsWith('tel:')
	)
}

export default function Link({
	to,
	children,
	className,
	target = '_blank',
	rel = 'noopener noreferrer',
	...rest
}: LinkProps) {
	const isExternal = isExternalLink(to)

	if (isExternal) {
		return (
			<a
				href={to}
				className={clsx(styles.linkBox, className)}
				target={target}
				rel={rel}
				{...rest}
			>
				<span className={clsx('link', styles.link)}>{children}</span>
				<ArrowUpRightIcon className={styles.icon} />
			</a>
		)
	}

	return (
		<RemixLink to={to} className={clsx(styles.linkBox, className)} {...rest}>
			<span className={clsx('link', styles.link)}>{children}</span>
		</RemixLink>
	)
}
