import { ref, inject, readonly, computed, type Ref } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';
import { THEME_CONTEXT_KEY } from '../constants/theme';

export interface ThemeContext {
  currentTheme: Readonly<Ref<ThemeDefinition | null>>;
  availableThemes: Readonly<Ref<ThemeDefinition[]>>;
  setTheme: (theme: ThemeDefinition) => void;
  isDark: Readonly<Ref<boolean>>;
}

function applyTheme(theme: ThemeDefinition) {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply semantic color variables
  const { colors } = theme;
  
  // Base colors
  root.style.setProperty('--oi-color-background', colors.background);
  root.style.setProperty('--oi-color-foreground', colors.foreground);
  
  // Surface colors (map to CSS expectations)
  root.style.setProperty('--oi-color-surface', colors.surface.base);
  root.style.setProperty('--oi-color-surface-raised', colors.surface.raised);
  root.style.setProperty('--oi-color-surface-overlay', colors.surface.overlay);
  root.style.setProperty('--oi-color-surface-muted', colors.surface.muted);
  
  // Text colors (map to CSS expectations)
  root.style.setProperty('--oi-color-text', colors.text.primary);
  root.style.setProperty('--oi-color-text-muted', colors.text.secondary);
  root.style.setProperty('--oi-color-text-disabled', colors.text.disabled);
  
  // Border colors (map to CSS expectations)
  root.style.setProperty('--oi-color-border', colors.border.default);
  root.style.setProperty('--oi-color-border-muted', colors.border.muted);
  root.style.setProperty('--oi-color-border-strong', colors.border.strong);
  
  // Accent colors (map to CSS expectations)
  root.style.setProperty('--oi-color-primary', colors.accent.primary);
  root.style.setProperty('--oi-color-secondary', colors.accent.secondary);
  root.style.setProperty('--oi-color-accent', colors.accent.primary); // alias for compatibility
  root.style.setProperty('--oi-color-success', colors.accent.success);
  root.style.setProperty('--oi-color-warning', colors.accent.warning);
  root.style.setProperty('--oi-color-error', colors.accent.danger);
  root.style.setProperty('--oi-color-info', colors.accent.info);
  
  // Additional CSS variables that might be used
  root.style.setProperty('--oi-color-red', colors.accent.danger);
  root.style.setProperty('--oi-color-green', colors.accent.success);
  root.style.setProperty('--oi-color-muted', colors.surface.muted);
  
  // Interactive states
  root.style.setProperty('--oi-color-interactive-hover', colors.interactive.hover);
  root.style.setProperty('--oi-color-interactive-active', colors.interactive.active);
  root.style.setProperty('--oi-color-interactive-disabled', colors.interactive.disabled);
  root.style.setProperty('--oi-color-interactive-focus', colors.interactive.focus);
  
  // Set theme attributes
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-theme-variant', theme.variant);
  root.classList.toggle('dark', theme.variant === 'dark');
  
  console.log('🎨 Applied theme:', theme.id, 'with colors:', {
    background: colors.background,
    primary: colors.accent.primary,
    text: colors.text.primary
  });
}

export function createThemeContext(themes: ThemeDefinition[]): ThemeContext {
  const currentTheme = ref<ThemeDefinition | null>(null);
  const availableThemes = ref<ThemeDefinition[]>(themes);
  
  const isDark = computed(() => currentTheme.value?.variant === 'dark');
  
  const setTheme = (theme: ThemeDefinition) => {
    currentTheme.value = theme;
    applyTheme(theme);
  };
  
  // Set first theme as default
  if (themes.length > 0) {
    setTheme(themes[0]);
  }
  
  return {
    currentTheme: readonly(currentTheme),
    availableThemes: readonly(availableThemes) as Readonly<Ref<ThemeDefinition[]>>,
    setTheme,
    isDark: readonly(isDark)
  };
}

export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(THEME_CONTEXT_KEY);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeOptional(): ThemeContext | null {
  return inject<ThemeContext | null>(THEME_CONTEXT_KEY, null);
}

// THEME_CONTEXT_KEY is exported from constants/theme.ts
