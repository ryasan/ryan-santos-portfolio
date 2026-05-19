import clsx from 'clsx'
import styles from '~/styles/components/link.module.scss'
import  { type LinkProps as RemixLinkProps, Link as RemixLink  } from '@remix-run/react'
import { ArrowUpRightIcon } from '~/components/icons'
import { isExternalLink } from '~/utils'

type LinkProps = {
	children: React.ReactNode
	className?: string
	inline?: boolean
	rel?: string
	target?: string
	to: string
} & Omit<RemixLinkProps, 'to' | 'children' | 'className'>

export default function Link({
	children,
	className,
	inline = false,
	rel = 'noopener noreferrer',
	target = '_blank',
	to,
	...rest
}: LinkProps) {
	const isExternal = isExternalLink(to)
	const linkBoxClass = clsx(
		inline ? styles.linkBoxInline : styles.linkBox,
		className,
	)
	const linkClass = clsx('link', inline ? styles.linkInline : styles.link)

	if (isExternal) {
		return (
			<a
				className={linkBoxClass}
				href={to}
				rel={rel}
				target={target}
				{...rest}
			>
				<span className={linkClass}>{children}</span>
				<ArrowUpRightIcon className={styles.icon} />
			</a>
		)
	}

	return (
		<RemixLink className={linkBoxClass} to={to} {...rest}>
			<span className={linkClass}>{children}</span>
		</RemixLink>
	)
}
