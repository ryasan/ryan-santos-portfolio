/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { motion, type Variants } from 'framer-motion'
import {
	useState,
	type AnchorHTMLAttributes,
	type ButtonHTMLAttributes,
} from 'react'
import Icon from '~/components/icons'
import { noop } from '~/utils'

const ns = 'button'

const transformVariants: Variants = {
	hidden: {
		y: '-100%',
	},
	visible: {
		y: '0%',
	},
}

const eclipseVariants: Variants = {
	hidden: {
		borderRadius: '50% 50% 0 0',
		y: 'calc(100% + 1px)',
	},
	visible: {
		borderRadius: '0%',
		y: '0',
	},
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		as?: 'button' | 'a'
		icon?: string
		variant?: 'default' | 'black' | 'white' | 'outline-black' | 'outline-white'
	}

export default function Button({
	children,
	as = 'button',
	className,
	href,
	icon,
	onClick,
	onMouseEnter = noop,
	onMouseLeave = noop,
	variant = 'default',
	...props
}: ButtonProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
		[`${ns}--${variant}`]: variant,
	})

	const [isHovered, setIsHovered] = useState(false)
	const isDownload = href?.startsWith('.')
	const isExternal = href?.startsWith('http')
	const component = as

	function handleMouseEnter(e: any) {
		if (typeof onMouseEnter === 'function') {
			onMouseEnter(e)
			setIsHovered(true)
		}
	}

	function handleMouseLeave(e: any) {
		if (typeof onMouseLeave === 'function') {
			onMouseLeave(e)
			setIsHovered(false)
		}
	}

	const getProps = () => {
		if (as === 'a') {
			return {
				...props,
				href,
				onClick,
				target: isExternal ? '_blank' : undefined,
				rel: isExternal ? 'noopener noreferrer' : props.rel,
			}
		}
		if (as === 'button') {
			return {
				...props,
				onClick,
			}
		}
		if (isDownload) {
			return {
				...props,
				href,
				download: true,
			}
		}
		return props as any
	}

	const MotionComponent = motion[component]

	return (
		<MotionComponent
			className={rootClassName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...getProps()}
		>
			<div className={`${ns}__content`}>
				<motion.span
					className={`${ns}__text`}
					animate={isHovered ? 'hidden' : 'visible'}
					variants={transformVariants}
				>
					{children}
					{icon && <Icon className={`${ns}__icon`} name={icon} />}
				</motion.span>
			</div>
			<motion.span
				className={`${ns}__eclipse`}
				animate={isHovered ? 'visible' : 'hidden'}
				variants={eclipseVariants}
				initial={false}
				transition={{ ease: 'linear' }}
			>
				{children}
				{icon && <Icon className={`${ns}__icon`} name={icon} />}
			</motion.span>
		</MotionComponent>
	)
}
