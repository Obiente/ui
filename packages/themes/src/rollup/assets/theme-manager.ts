export interface ThemeManagerConfig {
  cookieName?: string;
  attributeName?: string;
  themes?: string[];
  defaultTheme?: string;
}

export class ObienteThemeManager {
  private cookieName: string;
  private attributeName: string;
  private themes: string[];
  private defaultTheme: string;
  private currentTheme: string;
  private previousTheme?: string;

  constructor(config: ThemeManagerConfig = {}) {
    this.cookieName = config.cookieName || 'obiente-theme';
    this.attributeName = config.attributeName || 'data-theme';
    this.themes = config.themes || [];
    this.defaultTheme = config.defaultTheme || '';
    this.currentTheme = this.getStoredTheme();
  }

  getStoredTheme(): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.cookieName) {
        return decodeURIComponent(value);
      }
    }
    
    try {
      return localStorage.getItem(this.cookieName) || this.defaultTheme;
    } catch {
      return this.defaultTheme;
    }
  }

  setTheme(theme: string): void {
    if (!this.themes.includes(theme)) {
      console.warn(`Theme '${theme}' is not available`);
      return;
    }

    this.previousTheme = this.currentTheme;
    this.currentTheme = theme;
    
    document.documentElement.setAttribute(this.attributeName, theme);
    this.updateThemeStylesheets(theme);
    this.setCookie(theme);
    this.setLocalStorage(theme);
    this.dispatchThemeChangeEvent(theme);
  }

  private updateThemeStylesheets(theme: string): void {
    const themeLinks = document.querySelectorAll('link[data-theme-css]');
    themeLinks.forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      const linkTheme = linkElement.getAttribute('data-theme-css');
      linkElement.disabled = linkTheme !== theme;
    });
  }

  private setCookie(theme: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `${this.cookieName}=${encodeURIComponent(theme)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  private setLocalStorage(theme: string): void {
    try {
      localStorage.setItem(this.cookieName, theme);
    } catch {}
  }

  private dispatchThemeChangeEvent(theme: string): void {
    window.dispatchEvent(new CustomEvent('obiente-theme-change', {
      detail: { 
        theme, 
        previousTheme: this.previousTheme,
        availableThemes: this.themes
      }
    }));
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  getAvailableThemes(): string[] {
    return [...this.themes];
  }

  toggleTheme(): void {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }

  async loadTheme(themeName: string, cssUrl: string): Promise<void> {
    if (this.themes.includes(themeName)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.setAttribute('data-theme-css', themeName);
    link.disabled = true;
    
    return new Promise((resolve, reject) => {
      link.onload = () => {
        this.themes.push(themeName);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  onThemeChange(callback: (event: CustomEvent) => void): () => void {
    const listener = callback as EventListener;
    window.addEventListener('obiente-theme-change', listener);
    
    return () => {
      window.removeEventListener('obiente-theme-change', listener);
    };
  }
}

// Global instance
declare global {
  interface Window {
    obienteTheme: ObienteThemeManager;
  }
}

if (typeof window !== 'undefined') {
  window.obienteTheme = new ObienteThemeManager();
}

export default ObienteThemeManager;
