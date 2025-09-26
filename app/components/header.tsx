import ThemeToggle from '~/components/theme-toggle'
import styles from '~/styles/components/header.module.scss'
import { LIGHT_THEME, DARK_THEME } from '~/utils/constants'

// @Todo: Fetch navigation data in Contentful

export default function Header() {
	return (
		<header className={styles.header}>
			<a className={styles.logo}>
				<div data-hide-on-theme={DARK_THEME}>ryan-santos.com</div>
				<div data-hide-on-theme={LIGHT_THEME}>ryan-santos.com</div>
			</a>
			<div className={styles.navigationBox}>
				<ThemeToggle
					darkImage="/public/images/sun.svg"
					lightImage="/public/images/moon.svg"
				/>
			</div>
		</header>
	)
}
