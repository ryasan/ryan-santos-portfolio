import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from '../styles/components/animate-presence.module.scss'

type AnimatePresenceProps = {
	children: React.ReactNode
	className?: string
	show?: boolean
	as?: React.ElementType
	enter?: 'fade' | 'slide' | 'zoom' | null
	exit?: 'fade' | 'slide' | 'zoom' | null
	speed?: 'fast' | 'medium' | 'slow'
}

const AnimatePresence = React.forwardRef(
	(
		{
			children,
			className,
			show = true,
			as = 'div',
			enter = 'fade',
			exit = 'fade',
			speed = 'medium',
		}: AnimatePresenceProps,
		forwardedRef: React.ForwardedRef<HTMLElement>,
	) => {
		const Component = as
		const [isVisible, setIsVisible] = useState(show)

		const onAnimationEnd = () => {
			if (!show) setIsVisible(false)
		}

		useEffect(() => {
			if (show) setIsVisible(true)
		}, [show])

		return isVisible ? (
			<Component
				className={clsx(
					styles[`${enter}-in`],
					styles[`${exit}-out`],
					styles[`duration-${speed}`],
					className,
				)}
				ref={forwardedRef}
				onAnimationEnd={onAnimationEnd}
			>
				{children}
			</Component>
		) : null
	},
)

export default AnimatePresence
