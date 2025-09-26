import { useFetcher } from '@remix-run/react'
import Image from '~/components/image'
import styles from '~/styles/components/theme-toggle.module.scss'
import { useTheme } from '~/hooks'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'

type ThemeToggleProps = {
	darkImage?: string
	lightImage?: string
}

export default function ThemeToggle({ darkImage = '', lightImage = '' }: ThemeToggleProps) {
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
