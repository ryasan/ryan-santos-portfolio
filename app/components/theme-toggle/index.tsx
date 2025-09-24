import Image from '~/components/Image'
import styles from './theme-toggle.module.scss'
import { useTheme } from '~/hooks/use-theme'
import { DARK_THEME, LIGHT_THEME } from '~/utils/constants'

type ThemeToggleProps = {
	darkImage?: string
	lightImage?: string
}

function ThemeToggle({ darkImage, lightImage }: ThemeToggleProps) {
	const { toggleTheme } = useTheme()

	return (
		<button className={styles.themeToggle} onClick={toggleTheme} title="Toggle Theme">
			<div data-hide-on-theme={DARK_THEME}>
				<Image src={lightImage ?? ''} alt="Dark Theme" />
			</div>
			<div data-hide-on-theme={LIGHT_THEME}>
				<Image src={darkImage ?? ''} alt="Light Theme" />
			</div>
		</button>
	)
}

export default ThemeToggle
