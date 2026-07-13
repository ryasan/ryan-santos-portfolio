import { useThemeContext } from '~/contexts/theme-context'

/**
 * @returns the theme from the user's preferences or the system preference
 */
export function useTheme() {
  const [themeState, setThemeState] = useThemeContext()
  
  const theme = themeState ?? 'dark';

  return [theme, setThemeState] as const;
}
