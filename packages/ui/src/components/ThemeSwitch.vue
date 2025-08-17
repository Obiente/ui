<template>
  <div class="oi-flex oi-items-center oi-gap-2">
    <label v-if="showLabel" class="oi-text-sm oi-font-medium oi-text-foreground">
      Theme:
    </label>
    <Select 
      v-model="selectedTheme" 
      @update:modelValue="handleThemeChange"
      :options="themeOptions"
      placeholder="Select theme"
      class="oi-min-w-32"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';
import { THEME_CONTEXT_KEY } from '../constants/theme';
import Select from './Select.vue';

interface Props {
  showLabel?: boolean;
  showVariant?: boolean;
}

withDefaults(defineProps<Props>(), {
  showLabel: false,
  showVariant: false,
});

// Theme context interface
interface ThemeContext {
  currentTheme: any;
  availableThemes: any;
  setTheme: (theme: ThemeDefinition) => void;
  isDark: any;
}

// Get theme context via injection
const themeContext = inject<ThemeContext | null>(THEME_CONTEXT_KEY, null);

if (!themeContext) {
  throw new Error('ThemeSwitch must be used within a ThemeProvider');
}

const { currentTheme, availableThemes, setTheme } = themeContext;

// Computed for selected theme
const selectedTheme = computed({
  get: () => currentTheme.value?.id || '',
  set: (value: string) => {
    if (value) {
      const theme = availableThemes.value.find((t: ThemeDefinition) => t.id === value);
      if (theme) {
        setTheme(theme);
      }
    }
  }
});

// Convert themes to Select options format
const themeOptions = computed(() => {
  return availableThemes.value.map((theme: ThemeDefinition) => ({
    label: theme.name,
    value: theme.id,
  }));
});

// Handle theme change - can be string or string[] from Select
const handleThemeChange = (value: string | string[]) => {
  const themeId = Array.isArray(value) ? value[0] : value;
  if (themeId) {
    const theme = availableThemes.value.find((t: ThemeDefinition) => t.id === themeId);
    if (theme) {
      setTheme(theme);
    }
  }
};
</script>


