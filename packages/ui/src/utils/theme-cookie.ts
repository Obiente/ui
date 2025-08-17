import { THEME_STORAGE_KEY } from '../constants/theme';

const THEME_COOKIE_NAME = THEME_STORAGE_KEY; // 'obiente-theme-preference'
const THEME_COOKIE_DAYS = 365;

export function setThemeCookie(themeId: string): void {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (THEME_COOKIE_DAYS * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  
  document.cookie = `${THEME_COOKIE_NAME}=${themeId}${expires}; path=/; SameSite=Lax`;
}

export function getThemeCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = `${THEME_COOKIE_NAME}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  
  return null;
}

export function getThemeCookieFromHeader(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  
  const nameEQ = `${THEME_COOKIE_NAME}=`;
  const cookies = cookieHeader.split(';');
  
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(nameEQ)) {
      return trimmed.substring(nameEQ.length);
    }
  }
  
  return null;
}

export function clearThemeCookie(): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${THEME_COOKIE_NAME}=; Max-Age=-99999999; path=/; SameSite=Lax`;
}

export function generateThemeCookieScript(themeId: string): string {
  return `document.cookie = "${THEME_COOKIE_NAME}=${themeId}; path=/; SameSite=Lax; expires=${new Date(Date.now() + THEME_COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString()}";`;
}

export { THEME_COOKIE_NAME };
