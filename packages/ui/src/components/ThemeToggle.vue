<template>
  <Button 
    @click="toggleDarkMode"
    :themeClasses="themeClasses"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Flex align="center" :gap="2">
      <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
      <span v-if="showLabel">{{ isDark ? 'Light' : 'Dark' }}</span>
    </Flex>
  </Button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';
import { THEME_CONTEXT_KEY } from '../constants/theme';
import Button from './Button.vue';
import Flex from './Flex.vue';

interface Props {
  themeClasses?: string;
  showLabel?: boolean;
}

withDefaults(defineProps<Props>(), {
  themeClasses: 'ghost',
  showLabel: false,
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
  throw new Error('ThemeToggle must be used within a ThemeProvider');
}

const { isDark, availableThemes, setTheme } = themeContext;

// Toggle between dark and light themes
const toggleDarkMode = () => {
  const currentVariant = isDark.value ? 'dark' : 'light';
  const targetVariant = currentVariant === 'dark' ? 'light' : 'dark';
  
  const targetTheme = availableThemes.value.find((theme: ThemeDefinition) => 
    theme.variant === targetVariant
  );
  
  if (targetTheme) {
    setTheme(targetTheme);
  }
};
</script>


