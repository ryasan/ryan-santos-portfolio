import clsx from 'clsx'
import { motion, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { usePointerFollower } from '~/context/pointer-follower-context'

const ns = 'burger-menu'

const menuIconVariantsA: Variants = {
	open: {
		transformOrigin: '30%',
		transform: [
			'rotate(0) scaleX(1)',
			'rotate(0) scaleX(0)',
			'rotate(45deg) scaleX(0)',
			'rotate(45deg) scaleX(1)',
		],
		opacity: [1, 0, 0, 1],
	},
	closed: {
		transformOrigin: '30%',
		transform: [
			'rotate(45deg) scaleX(1)',
			'rotate(45deg) scaleX(0)',
			'rotate(0) scaleX(0)',
			'rotate(0) scaleX(1)',
		],
		opacity: [1, 0, 0, 1],
	},
}

const menuIconVariantsB: Variants = {
	open: {
		transformOrigin: '30%',
		transform: [
			'rotate(0) scaleX(1)',
			'rotate(0) scaleX(0)',
			'rotate(-45deg) scaleX(0)',
			'rotate(-45deg) scaleX(1)',
		],
		opacity: [1, 0, 0, 1],
	},
	closed: {
		transformOrigin: '30%',
		transform: [
			'rotate(-45deg) scaleX(1)',
			'rotate(-45deg) scaleX(0)',
			'rotate(0) scaleX(0)',
			'rotate(0) scaleX(1)',
		],
		opacity: [1, 0, 0, 1],
	},
}

function MenuIcon({ sidebarOpen }: { sidebarOpen: boolean }) {
	return (
		<span className={`${ns}__icon`}>
			<motion.span
				animate={sidebarOpen ? 'open' : 'closed'}
				variants={menuIconVariantsA}
				initial={false}
				transition={{
					duration: 0.5,
					times: [0, 0.3, 0.301, 1],
				}}
			/>
			<motion.span
				animate={sidebarOpen ? 'open' : 'closed'}
				variants={menuIconVariantsB}
				initial={false}
				transition={{
					duration: 0.5,
					times: [0, 0.3, 0.301, 1],
				}}
			/>
		</span>
	)
}

type BurgerMenuProps = {
	sidebarOpen: boolean
	toggleSidebar(state: boolean): void
}

const BurgerMenu = ({ sidebarOpen, toggleSidebar }: BurgerMenuProps) => {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const rootRef = useRef<HTMLButtonElement>(null)
	const { setFollowerSize, setMixBlendMode } = usePointerFollower()

	const handleMouseEnter = () => {
		setMixBlendMode(true)
		setFollowerSize(60)
	}

	const handleMouseLeave = () => {
		setFollowerSize().reset()
	}

	return (
		<button
			className={rootClassName}
			ref={rootRef}
			aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
			onClick={() => toggleSidebar(!sidebarOpen)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<MenuIcon sidebarOpen={sidebarOpen} />
		</button>
	)
}

export default BurgerMenu
