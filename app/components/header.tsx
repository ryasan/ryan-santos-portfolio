import ThemeToggle from '~/components/theme-toggle'
import styles from '~/styles/components/header.module.scss'
import { LIGHT_THEME, DARK_THEME } from '~/utils/constants'
import { Link } from '@remix-run/react'

// @Todo: Fetch navigation data in Contentful

export default function Header() {
	return (
		<header className={styles.header}>
			<Link className={styles.logo} to="/" aria-label="Home page">
				<div data-hide-on-theme={DARK_THEME}>ryan-santos.com</div>
				<div data-hide-on-theme={LIGHT_THEME}>ryan-santos.com</div>
			</Link>
			<div className={styles.navigationBox}>
				<ThemeToggle
					darkImage="/public/images/sun.svg"
					lightImage="/public/images/moon.svg"
				/>
			</div>
		</header>
	)
}
