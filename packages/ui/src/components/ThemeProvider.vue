<template>
  <slot />
</template>

<script setup lang="ts">

import { provide, onMounted, watch } from 'vue';
import { createThemeContext, THEME_CONTEXT_KEY } from '../composables/use-theme';
import type { ThemeDefinition } from '@obiente/themes';

interface Props {
  themes: ThemeDefinition[];
  defaultTheme?: string;
  persistTheme?: boolean;
  useSystemPreference?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  persistTheme: true,
  useSystemPreference: true,
});

// Find initial theme
function findThemeById(id: string): ThemeDefinition | undefined {
  return props.themes.find(theme => theme.id === id);
}

function getInitialTheme(): ThemeDefinition | null {
  // Ensure themes array exists and has content
  if (!props.themes || props.themes.length === 0) {
    console.warn('ThemeProvider: No themes provided');
    return null;
  }
  
  // 1. Check for saved theme in localStorage (only on client)
  if (props.persistTheme && typeof window !== 'undefined') {
    const savedThemeId = localStorage.getItem('obiente-theme');
    if (savedThemeId) {
      const savedTheme = findThemeById(savedThemeId);
      if (savedTheme) return savedTheme;
    }
  }
  
  // 2. Check for default theme prop
  if (props.defaultTheme) {
    const defaultTheme = findThemeById(props.defaultTheme);
    if (defaultTheme) return defaultTheme;
  }
  
  // 3. Use system preference if enabled (only on client)
  if (props.useSystemPreference && typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const matchingTheme = props.themes.find(theme => 
      theme.variant === (prefersDark ? 'dark' : 'light')
    );
    if (matchingTheme) return matchingTheme;
  }
  
  // 4. Fallback to first available theme
  return props.themes[0];
}

// Create theme context only if we have valid data
let themeContext: ReturnType<typeof createThemeContext>;
let currentTheme: any;
let setTheme: any;
let setThemeById: any;

// Check if we have valid themes before proceeding
if (!props.themes || props.themes.length === 0) {
  console.error('ThemeProvider: No themes provided');
  throw new Error('ThemeProvider requires at least one theme to be provided');
}

const initialTheme = getInitialTheme();

if (!initialTheme) {
  console.error('ThemeProvider: Cannot initialize - no valid theme found');
  throw new Error('ThemeProvider requires at least one valid theme');
}

// Now we can safely create the theme context
themeContext = createThemeContext(props.themes, initialTheme);
({ currentTheme, setTheme, setThemeById } = themeContext);

// Provide context to children immediately
provide(THEME_CONTEXT_KEY, themeContext);

// Apply initial theme on mount
onMounted(() => {
  console.log('ThemeProvider mounted');
  console.log('Props.themes:', props.themes);
  console.log('Props.defaultTheme:', props.defaultTheme);
  console.log('Initial theme:', initialTheme);
  console.log('Theme context:', themeContext);
  console.log('Available themes in context:', themeContext.availableThemes.value);
  
  if (initialTheme && currentTheme.value) {
    console.log('Setting initial theme:', initialTheme.name);
    setTheme(initialTheme);
    
    // Debug: Check if CSS variables are applied
    setTimeout(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      console.log('Applied CSS variables:');
      console.log('--oi-color-primary:', styles.getPropertyValue('--oi-color-primary'));
      console.log('--oi-color-background:', styles.getPropertyValue('--oi-color-background'));
      console.log('--oi-color-text:', styles.getPropertyValue('--oi-color-text'));
      console.log('data-theme attribute:', root.getAttribute('data-theme'));
    }, 100);
  } else {
    console.error('ThemeProvider: No initial theme available for mounting');
  }
  
  // Listen for system preference changes
  if (props.useSystemPreference && typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (event: MediaQueryListEvent) => {
      // Only auto-switch if no user preference is saved
      if (typeof window !== 'undefined' && !localStorage.getItem('obiente-theme')) {
        const prefersDark = event.matches;
        const matchingTheme = props.themes.find(theme => 
          theme.variant === (prefersDark ? 'dark' : 'light')
        );
        if (matchingTheme) {
          setTheme(matchingTheme);
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    
    // Cleanup is handled by Vue's onUnmounted automatically
  }
});

// Watch for theme changes and update persistence
if (props.persistTheme) {
  watch(() => currentTheme.value, (newTheme) => {
    if (newTheme && typeof window !== 'undefined') {
      localStorage.setItem('obiente-theme', newTheme.id);
    }
  });
}

// Expose methods for parent components
defineExpose({
  setTheme,
  setThemeById,
  currentTheme,
});
</script>
