<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, onMounted, watchEffect, ref, readonly, computed } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';
import { getAllThemes } from '@obiente/themes';
import { THEME_CONTEXT_KEY, THEME_STORAGE_KEY } from '../constants/theme';

// Props
interface Props {
  themes?: ThemeDefinition[];
  themePreference?: string | null;
}

const props = defineProps<Props>();
const themes = props.themes || getAllThemes();

// Simple theme application - just set data-theme attribute
function applyTheme(theme: ThemeDefinition) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme.id);
    document.documentElement.setAttribute('data-theme-variant', theme.variant);
    document.documentElement.classList.toggle('dark', theme.variant === 'dark');
  }
}

// Theme state
const currentTheme = ref<ThemeDefinition | null>(null);
const availableThemes = ref<ThemeDefinition[]>(themes);
const isDark = computed(() => currentTheme.value?.variant === 'dark');

const setTheme = (theme: ThemeDefinition) => {
  currentTheme.value = theme;
  if (typeof window !== 'undefined') {
    applyTheme(theme);
  }
};

// Simple cookie utilities
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(';').shift() || null : null;
};

const setCookie = (name: string, value: string): void => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

// Initialize theme - SSR prop > cookie > first theme
const initializeTheme = () => {
  // 1. Use Astro SSR theme preference
  if (props.themePreference) {
    const ssrTheme = themes.find(theme => theme.id === props.themePreference);
    if (ssrTheme) {
      setTheme(ssrTheme);
      return;
    }
  }
  
  // 2. Use saved cookie theme
  const savedThemeId = getCookie(THEME_STORAGE_KEY);
  if (savedThemeId) {
    const savedTheme = themes.find(theme => theme.id === savedThemeId);
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }
  }
  
  // 3. Fallback to first theme
  if (themes.length > 0) {
    setTheme(themes[0]);
  }
};

// SSR initialization
if (typeof window === 'undefined') {
  if (props.themePreference) {
    const ssrTheme = themes.find(theme => theme.id === props.themePreference);
    if (ssrTheme) {
      currentTheme.value = ssrTheme;
    }
  } else if (themes.length > 0) {
    currentTheme.value = themes[0];
  }
} else {
  initializeTheme();
}

// Create and provide context
provide(THEME_CONTEXT_KEY, {
  currentTheme: readonly(currentTheme),
  availableThemes: readonly(availableThemes),
  setTheme,
  isDark: readonly(isDark)
});

// Client-side initialization
onMounted(() => {
  if (currentTheme.value) {
    applyTheme(currentTheme.value);
  }
  initializeTheme();
});

// Persist theme changes to cookies
watchEffect(() => {
  if (currentTheme.value) {
    setCookie(THEME_STORAGE_KEY, currentTheme.value.id);
  }
});
</script>


