import styles from '~/styles/components/theme-toggle.module.scss'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'
import { MoonIcon, SunIcon } from '~/components/icons'
import { useTheme } from '~/hooks'

export default function ThemeToggle() {
	const [theme, setTheme] = useTheme()

	const isDarkMode = theme === DARK_THEME
	const ariaLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'

	const toggleTheme = () => {
		const updatedTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME

		// 1. Instantly update the UI state
		setTheme(updatedTheme)

		// 2. Save to local storage
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', updatedTheme)
		}
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
