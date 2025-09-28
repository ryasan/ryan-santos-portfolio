import styles from '~/styles/components/theme-toggle.module.scss'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'
import { useFetcher } from '@remix-run/react'
import { useTheme } from '~/hooks'
import { MoonIcon, SunIcon } from '~/components/icons'

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
				<SunIcon className={styles.icon} aria-hidden="true" />
			</div>
			<div data-hide-on-theme={LIGHT_THEME}>
				<MoonIcon className={styles.icon} aria-hidden="true" />
			</div>
		</button>
	)
}

// function ThemeToggle({
// 	userPreference,
// }: {
// 	userPreference?: Theme | null
// }) {
// 	const fetcher = useFetcher<typeof action>()

// 	const [form] = useForm({
// 		id: 'theme-toggle',
// 		lastResult: fetcher.data?.result as any,
// 	})

// 	const mode = userPreference ?? 'system'
// 	const nextMode =
// 		mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'
// 	const modeLabel = {
// 		light: (
// 			<div>
// 				<Image src="/public/images/sun.svg" alt="Light" />
// 				<span className="sr-only">Light</span>
// 			</div>
// 		),
// 		dark: (
// 			<div>
// 				<Image src="/public/images/moon.svg" alt="Dark" />
// 				<span className="sr-only">Dark</span>
// 			</div>
// 		),
// 		system: (
// 			<div>
// 				<Image src="/public/images/laptop.svg" alt="System" />
// 				<span className="sr-only">System</span>
// 			</div>
// 		),
// 	}

// 	return (
// 		<fetcher.Form
// 			method="POST"
// 			{...getFormProps(form)}
// 			action="/resources/theme-toggle"
// 		>
// 			<input type="hidden" name="theme" value={nextMode} />
// 			<div>
// 				<button type="submit">{modeLabel[mode]}</button>
// 			</div>
// 		</fetcher.Form>
// 	)
// }
