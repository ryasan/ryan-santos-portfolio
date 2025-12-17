import clsx from 'clsx'
import styles from '~/styles/components/link.module.scss'
import  { type LinkProps as RemixLinkProps, Link as RemixLink  } from '@remix-run/react'
import { ArrowUpRightIcon } from '~/components/icons'
import { isExternalLink } from '~/utils'

type LinkProps = {
	children: React.ReactNode
	className?: string
	rel?: string
	target?: string
	to: string
} & Omit<RemixLinkProps, 'to' | 'children' | 'className'>

export default function Link({
	children,
	className,
	rel = 'noopener noreferrer',
	target = '_blank',
	to,
	...rest
}: LinkProps) {
	const isExternal = isExternalLink(to)

	if (isExternal) {
		return (
			<a
				className={clsx(styles.linkBox, className)}
				href={to}
				rel={rel}
				target={target}
				{...rest}
			>
				<span className={clsx('link', styles.link)}>{children}</span>
				<ArrowUpRightIcon className={styles.icon} />
			</a>
		)
	}

	return (
		<RemixLink className={clsx(styles.linkBox, className)} to={to} {...rest}>
			<span className={clsx('link', styles.link)}>{children}</span>
		</RemixLink>
	)
}
