import { useHints } from './use-hints'
import {  useRequestInfo } from './use-request-info'

export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  return requestInfo.userPrefs.theme ?? hints.theme;
}
