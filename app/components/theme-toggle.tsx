import styles from '~/styles/components/theme-toggle.module.scss'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'
import { MoonIcon, SunIcon } from '~/components/icons'
import { useFetcher } from '@remix-run/react'
import { useTheme } from '~/hooks'

export default function ThemeToggle() {
	const theme = useTheme()
	const fetcher = useFetcher()

	const isDarkMode = theme === DARK_THEME
	const ariaLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'

	const toggleTheme = () => {
		const updatedTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME

		fetcher.submit(
			{ theme: updatedTheme },
			{ method: 'post', action: '/resources/theme-toggle' },
		)
	}

	return (
		<button
			className={styles.themeToggle}
			onClick={toggleTheme}
			aria-label={ariaLabel}
			type="button"
		>
			<div data-hide-on-theme={DARK_THEME}>
				<MoonIcon className={styles.icon} aria-hidden="true" />
			</div>
			<div data-hide-on-theme={LIGHT_THEME}>
				<SunIcon className={styles.icon} aria-hidden="true" />
			</div>
		</button>
	)
}
