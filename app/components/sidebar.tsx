import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

const ns = 'sidebar'

const links = [
	{ title: 'Home', href: '#' },
	{ title: 'Projects', href: '#' },
	{ title: 'Blog', href: '#' },
	{ title: 'For Fun', href: '#' },
	{ title: 'Contact', href: '#' },
]

type SidebarProps = {
	className?: string
	isOpen: boolean
	toggleSidebar(state: boolean): void
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	return (
		<div className={rootClassName}>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className={`${ns}__backdrop`}
						onClick={() => toggleSidebar(false)}
					/>
				)}
			</AnimatePresence>

			<motion.div
				className={`${ns}__panel`}
				initial={{ x: '100%' }}
				animate={{ x: isOpen ? 0 : '100%' }}
				transition={{ duration: 0.5 }}
			>
				<div className={`${ns}__panel`}>
					<div className="container">
						<div className={`${ns}__header`}>
							<h2 className={`${ns}__title`}>Menu</h2>
						</div>
						<div className={`${ns}__content`}>
							<ul className={`${ns}__menu`}>
								{links.map((link, index) => (
									<li key={index} className={`${ns}__menu-item`}>
										<a href={link.href} className={`${ns}__menu-link h6`}>
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
