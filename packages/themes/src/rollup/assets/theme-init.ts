(function initObienteTheme() {
  'use strict';
  
  function getStoredTheme(): string {
    const cookieName = 'obiente-theme';
    const defaultTheme = 'catppuccin-latte';
    
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return decodeURIComponent(value || '');
      }
    }
    
    try {
      return localStorage.getItem(cookieName) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  }
  
  function applyTheme(theme: string): void {
    const attributeName = 'data-theme';
    document.documentElement.setAttribute(attributeName, theme);
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => updateStylesheets(theme));
    } else {
      updateStylesheets(theme);
    }
  }
  
  function updateStylesheets(theme: string): void {
    const themeLinks = document.querySelectorAll('link[data-theme-css]');
    themeLinks.forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      const linkTheme = linkElement.getAttribute('data-theme-css');
      linkElement.disabled = linkTheme !== theme;
    });
  }
  
  const theme = getStoredTheme();
  applyTheme(theme);
})();
