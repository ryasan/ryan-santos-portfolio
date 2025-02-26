import clsx from 'clsx'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import SectionLayout from '~/components/section-layout'

const ns = 'site-header'

export default function Header() {
	const rootClassName = clsx({
		[ns]: true,
	})

	const myName = 'HelloWorld'.split('')

	return (
		<SectionLayout className={rootClassName} as="header" cursorColor="inverse">
			<div className="container-fluid">
				<Link className={`${ns}__title`} to="/">
					<small>
						{myName.map((letter, index, arr) => (
							<motion.span
								className={clsx({
									[`${ns}__letter`]: true,
									[`highlight`]: index > arr.indexOf('o'),
								})}
								key={index}
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{
									duration: 0.75,
									delay: 0.75 + index * 0.05,
									ease: 'linear',
								}}
							>
								{letter}
							</motion.span>
						))}
					</small>
				</Link>
				<nav className={`${ns}__nav`}>
					<span className={`${ns}__nav-text`}>
						<small>menu</small>
					</span>
				</nav>
			</div>
		</SectionLayout>
	)
}
