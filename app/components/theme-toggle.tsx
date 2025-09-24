import { useFetcher } from '@remix-run/react'
import Image from '~/components/image'
import styles from '~/styles/components/theme-toggle.module.scss'
import { useTheme } from '~/hooks'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'

type ThemeToggleProps = {
	darkImage?: string
	lightImage?: string
}

function ThemeToggle({ darkImage = '', lightImage = '' }: ThemeToggleProps) {
	const theme = useTheme()
	const fetcher = useFetcher()

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
			title="Toggle Theme"
			aria-label="Toggle Theme"
		>
			<div data-hide-on-theme={DARK_THEME}>
				<Image src={lightImage} alt="Dark Theme" />
			</div>
			<div data-hide-on-theme={LIGHT_THEME}>
				<Image src={darkImage} alt="Light Theme" />
			</div>
		</button>
	)
}

export default ThemeToggle
