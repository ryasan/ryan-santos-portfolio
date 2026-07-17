import clsx from 'clsx'
import { type LinkProps as RemixLinkProps, Link as RemixLink } from '@remix-run/react'
import { ArrowUpRightIcon } from '~/components/icons'
import { isExternalLink } from '~/utils'

const ns = 'link-box'

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
	const linkBoxClass = clsx(ns, inline && `${ns}--inline`, className)
	const linkClass = clsx(`${ns}__link`, 'link', inline && `${ns}__link--inline`)

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
				<ArrowUpRightIcon className={`${ns}__icon`} />
			</a>
		)
	}

	return (
		<RemixLink className={linkBoxClass} to={to} {...rest}>
			<span className={linkClass}>{children}</span>
		</RemixLink>
	)
}
