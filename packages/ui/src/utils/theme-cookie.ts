/**
 * Theme Cookie Utility
 * 
 * This file contains utilities for persisting theme preferences in cookies
 */

const THEME_COOKIE_NAME = 'obiente-theme';
const THEME_COOKIE_DAYS = 365; // Store theme preference for 1 year

/**
 * Set theme cookie
 * @param themeId The theme ID to save
 */
export function setThemeCookie(themeId: string): void {
  // Create cookie that expires in 1 year
  const date = new Date();
  date.setTime(date.getTime() + (THEME_COOKIE_DAYS * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  
  document.cookie = `${THEME_COOKIE_NAME}=${themeId}${expires}; path=/; SameSite=Lax`;
}

/**
 * Get theme from cookie
 * @returns The saved theme ID or null if not found
 */
export function getThemeCookie(): string | null {
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

/**
 * Clear theme cookie
 */
export function clearThemeCookie(): void {
  document.cookie = `${THEME_COOKIE_NAME}=; Max-Age=-99999999; path=/; SameSite=Lax`;
}
