import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';

const ns = 'site-header';

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
};

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
};

function MenuIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<span className={`${ns}__menu-icon`}>
			<motion.span
				animate={isOpen ? 'open' : 'closed'}
				variants={menuIconVariantsA}
				initial={false}
				transition={{
					duration: 0.5,
					times: [0, 0.3, 0.301, 1],
				}}
			/>
			<motion.span
				animate={isOpen ? 'open' : 'closed'}
				variants={menuIconVariantsB}
				initial={false}
				transition={{
					duration: 0.5,
					times: [0, 0.3, 0.301, 1],
				}}
			/>
		</span>
	);
}

type HeaderProps = {
	sidebarOpen: boolean;
	toggleSidebar: (state: boolean) => void;
};

export default function Header({ sidebarOpen, toggleSidebar }: HeaderProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<header className={rootClassName}>
			<div className="container-fluid">
				<span className={`${ns}__title`}>
					<small>Ryan Santos</small>
				</span>
				<nav className={`${ns}__nav`}>
					<span className={`${ns}__menu-text`}>
						<small>menu</small>
					</span>
					<button
						className={`${ns}__menu-button${sidebarOpen ? ' is-active' : ''}`}
						onClick={() => toggleSidebar(!sidebarOpen)}
						aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
					>
						<MenuIcon isOpen={sidebarOpen} />
					</button>
				</nav>
			</div>
		</header>
	);
}
