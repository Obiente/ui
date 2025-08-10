<template>
  <div :class="['ob-theme-provider', `ob-theme-${currentTheme}`, isDark ? 'ob-theme-dark' : 'ob-theme-light']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, computed, onMounted, watchEffect } from 'vue';
import { useTheme } from '../internal/use-theme';
import { setThemeCookie, getThemeCookie } from '../utils/theme-cookie';
import type { ThemeProviderProps } from '../types/theme';

import catppuccinMocha from '../themes/catppuccin-mocha';
import githubLight from '../themes/github-light';

/**
 * ThemeProvider Component
 * 
 * This component provides theming context to the application.
 * It manages theme switching, persistence, and default themes.
 */
export default defineComponent({
  name: 'ThemeProvider',
  
  props: {
    initialTheme: {
      type: String,
      default: ''
    },
    useSystemPreference: {
      type: Boolean,
      default: true
    },
    persistent: {
      type: Boolean,
      default: true
    },
    defaultTheme: {
      type: String,
      default: 'catppuccin-mocha'
    },
    availableThemes: {
      type: Array as () => string[],
      default: () => ['catppuccin-mocha', 'github-light']
    }
  },
  
  setup(props: ThemeProviderProps) {
    // All registered themes
    const registeredThemes = {
      'catppuccin-mocha': catppuccinMocha,
      'github-light': githubLight,
    };
    
    // Current theme state
    const currentTheme = ref(props.defaultTheme || 'catppuccin-mocha');
    
    // Determine if using dark mode
    const isDark = computed(() => {
      const theme = registeredThemes[currentTheme.value];
      return theme ? theme.flavor === 'dark' : false;
    });
    
    // Initialize theme system
    const { applyTheme } = useTheme();
    
    // Change theme function
    const changeTheme = (themeId: string) => {
      if (registeredThemes[themeId]) {
        currentTheme.value = themeId;
        applyTheme(registeredThemes[themeId]);
        
        // Persist theme choice if enabled
        if (props.persistent) {
          setThemeCookie(themeId);
        }
      } else {
        console.warn(`Theme "${themeId}" not found. Using default.`);
      }
    };
    
    // Toggle between light and dark mode
    const toggleDarkMode = () => {
      const current = registeredThemes[currentTheme.value];
      if (current.flavor === 'dark') {
        // Switch to light theme - find first light theme
        const lightTheme = Object.entries(registeredThemes).find(
          ([_, theme]) => theme.flavor === 'light'
        );
        if (lightTheme) {
          changeTheme(lightTheme[0]);
        }
      } else {
        // Switch to dark theme - find first dark theme
        const darkTheme = Object.entries(registeredThemes).find(
          ([_, theme]) => theme.flavor === 'dark'
        );
        if (darkTheme) {
          changeTheme(darkTheme[0]);
        }
      }
    };
    
    // Get list of available themes
    const getAvailableThemes = () => {
      return props.availableThemes.filter(id => id in registeredThemes);
    };
    
    // Provide theme context to children components
    provide('themeProvider', {
      current: currentTheme,
      isDark,
      changeTheme,
      toggleDarkMode,
      getAvailableThemes
    });
    
    // Initialize theme on mount
    onMounted(() => {
      let initialTheme = props.defaultTheme;
      
      // Check for saved theme in cookie if persistence enabled
      if (props.persistent) {
        const savedTheme = getThemeCookie();
        if (savedTheme && savedTheme in registeredThemes) {
          initialTheme = savedTheme;
        }
      }
      
      // Check for explicitly provided theme
      if (props.initialTheme && props.initialTheme in registeredThemes) {
        initialTheme = props.initialTheme;
      }
      
      // Check for system preference if enabled
      if (props.useSystemPreference && !props.initialTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          // Find a dark theme
          const darkTheme = Object.entries(registeredThemes).find(
            ([_, theme]) => theme.flavor === 'dark'
          );
          if (darkTheme) {
            initialTheme = darkTheme[0];
          }
        } else {
          // Find a light theme
          const lightTheme = Object.entries(registeredThemes).find(
            ([_, theme]) => theme.flavor === 'light'
          );
          if (lightTheme) {
            initialTheme = lightTheme[0];
          }
        }
      }
      
      // Apply the theme
      changeTheme(initialTheme);
      
      // Listen for system preference changes if enabled
      if (props.useSystemPreference) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
          // Only auto-switch if no explicit theme was set by user
          if (!getThemeCookie()) {
            const prefersDark = event.matches;
            const targetFlavor = prefersDark ? 'dark' : 'light';
            const matchingTheme = Object.entries(registeredThemes).find(
              ([_, theme]) => theme.flavor === targetFlavor
            );
            if (matchingTheme) {
              changeTheme(matchingTheme[0]);
            }
          }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        // Cleanup
        // onUnmounted(() => mediaQuery.removeEventListener('change', handleChange));
      }
    });
    
    // Watch for prop changes and update theme if needed
    watchEffect(() => {
      if (props.initialTheme && props.initialTheme !== currentTheme.value) {
        changeTheme(props.initialTheme);
      }
    });
    
    return {
      currentTheme,
      isDark,
      changeTheme,
      toggleDarkMode,
      getAvailableThemes
    };
  }
});
</script>

<style>
.ob-theme-provider {
  display: contents;
}
</style>
