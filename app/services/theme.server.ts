import * as cookie from 'cookie';
import { type Theme } from '~/types';

const cookieName = 'en_theme';

export function getTheme(request: Request): Theme | null {
  const cookieHeader = request.headers.get('cookie');
  const parsed = cookieHeader
    ? cookie.parse(cookieHeader)[cookieName]
    : 'light';
  if (parsed === 'light' || parsed === 'dark') return parsed;
  return null;
}

export function setTheme(theme: Theme | 'system') {
  if (theme === 'system') {
    return cookie.serialize(cookieName, '', { maxAge: -1, path: '/' });
  } else {
    return cookie.serialize(cookieName, theme, { maxAge: 31536000, path: '/' });
  }
}
