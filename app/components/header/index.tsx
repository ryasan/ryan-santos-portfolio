import ThemeToggle from '~/components/theme-toggle'
import styles from './header.module.scss'
import { LIGHT_THEME, DARK_THEME } from '~/utils/constants'

// @Todo: Fetch navigation data in Contentful

function Header() {
	return (
		<header className={styles.header}>
			<a className={styles.logo}>
				<div data-hide-on-theme={DARK_THEME}>RyanSantos.dev</div>
				<div data-hide-on-theme={LIGHT_THEME}>RyanSantos.dev</div>
			</a>
			<div className={styles.navigationBox}>
				<ThemeToggle />
			</div>
		</header>
	)
}

export default Header
