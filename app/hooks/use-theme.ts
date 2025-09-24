import { useHints } from './use-hints'
import {  useRequestInfo } from './use-request-info'

/**
 * @returns the theme from the user's preferences or the system preference
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  return requestInfo.userPrefs.theme ?? hints.theme;
}
