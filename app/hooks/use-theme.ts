import { useHints } from './use-hints'
import { useRequestInfo } from './use-request-info'
import { useThemeContext } from '~/contexts/theme-context'

/**
 * @returns the theme from the user's preferences or the system preference
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const [themeState, setThemeState] = useThemeContext()
  
  const theme = themeState ?? requestInfo.userPrefs.theme ?? hints.theme ?? 'dark';

  return [theme, setThemeState] as const;
}
