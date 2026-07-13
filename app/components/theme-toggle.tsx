import styles from '~/styles/components/theme-toggle.module.scss'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'
import { MoonIcon, SunIcon } from '~/components/icons'
import { useTheme } from '~/hooks'
import { useFetcher } from '@remix-run/react'

export default function ThemeToggle() {
	const [theme, setTheme] = useTheme()
	const fetcher = useFetcher()

	const isDarkMode = theme === DARK_THEME
	const ariaLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'

	const toggleTheme = () => {
		const updatedTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME

		// 1. Instantly update the UI state (no reload!)
		setTheme(updatedTheme)

		// 2. Quietly update the cookie in the background so the next 
		// page load gets the correct cached HTML from Netlify
		fetcher.submit(
			{ theme: updatedTheme },
			{ action: '/resources/theme-toggle', method: 'post' },
		)
	}

	return (
		<button
			aria-label={ariaLabel}
			className={styles.themeToggle}
			onClick={toggleTheme}
			type="button"
		>
			<div data-hide-on-theme={DARK_THEME}>
				<MoonIcon aria-hidden="true" className={styles.icon} />
			</div>
			<div data-hide-on-theme={LIGHT_THEME}>
				<SunIcon aria-hidden="true" className={styles.icon} />
			</div>
		</button>
	)
}
