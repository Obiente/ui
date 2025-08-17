<template>
  <div class="oi-flex oi-items-center oi-gap-2">
    <!-- Debug info -->
    <div v-if="debugMode" class="oi-text-xs oi-text-red-500 oi-p-2 oi-border oi-rounded">
      Debug: mounted={{ isMounted }}, context={{ !!themeContext }}, themes={{ availableThemes.length }}, hasThemes={{ hasThemes }}
    </div>
    
    <!-- Loading state -->
    <div v-if="!isMounted" class="oi-flex oi-align-center oi-gap-2 oi-text-color-text-muted">
      <span>🎨</span>
      <span class="oi-text-sm">Loading...</span>
    </div>
    
    <!-- No context state -->
    <div v-else-if="!themeContext" class="oi-flex oi-align-center oi-gap-2 oi-text-color-text-muted">
      <span>⚠️</span>
      <span class="oi-text-sm">No theme context</span>
    </div>
    
    <!-- No themes state -->
    <div v-else-if="!hasThemes" class="oi-flex oi-align-center oi-gap-2 oi-text-color-text-muted">
      <span>🎨</span>
      <span class="oi-text-sm">No themes available</span>
    </div>
    
    <!-- Theme controls -->
    <div v-else class="oi-flex oi-items-center oi-gap-2">
      <!-- Theme Toggle for Dark/Light -->
      <Button 
        @click="toggleDarkMode"
        variant="ghost"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="oi-p-2"
      >
        <span>{{ isDark ? '☀️' : '🌙' }}</span>
      </Button>
      
      <!-- Theme Selector Dropdown -->
      <Select
        v-model="selectedTheme"
        :options="themeOptions"
        placeholder="Select theme..."
        class="oi-min-w-48"
      />
      
      <!-- Debug current theme -->
      <span v-if="debugMode" class="oi-text-xs">
        Current: {{ currentTheme?.id || 'none' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, inject } from 'vue';
import { Button, Select, THEME_CONTEXT_KEY } from '@obiente/ui';
import type { ThemeDefinition } from '@obiente/themes';

// Track if component is mounted (client-side only)
const isMounted = ref(false);
const debugMode = ref(false); // Debug mode disabled
onMounted(() => {
  isMounted.value = true;
});

// Theme context interface - must match ThemeProvider exactly
interface ThemeContext {
  currentTheme: any;
  availableThemes: any;
  setTheme: (theme: ThemeDefinition) => void;
  isDark: any;
}

// Get theme context via injection - using same key as ThemeProvider
const themeContext = inject<ThemeContext | null>(THEME_CONTEXT_KEY, null);

// Safely access theme properties with proper checks
const currentTheme = computed(() => themeContext?.currentTheme?.value || null);
const availableThemes = computed(() => themeContext?.availableThemes?.value || []);
const isDark = computed(() => themeContext?.isDark?.value || false);

// Check if themes are available
const hasThemes = computed(() => availableThemes.value.length > 0);

// Format available themes for the Select component
const themeOptions = computed(() => {
  return availableThemes.value.map((theme: ThemeDefinition) => ({
    label: theme.name,
    value: theme.id
  }));
});

// Toggle dark mode - find corresponding theme variant
const toggleDarkMode = () => {
  if (!themeContext) return;
  
  const targetVariant = isDark.value ? 'light' : 'dark';
  const targetTheme = availableThemes.value.find((theme: ThemeDefinition) => 
    theme.variant === targetVariant
  );
  
  if (targetTheme) {
    themeContext.setTheme(targetTheme);
  }
};

// Computed theme value for Select v-model
const selectedTheme = computed({
  get: () => currentTheme.value?.id || '',
  set: (value: string) => {
    const theme = availableThemes.value.find((t: ThemeDefinition) => t.id === value);
    if (theme && themeContext) {
      themeContext.setTheme(theme);
    }
  }
});
</script>


