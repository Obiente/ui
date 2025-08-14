/**
 * ThemeToggle Component  
 * Simple button to toggle between dark and light themes
 */

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
import { useTheme } from '../composables/use-theme';
import Button from './Button.vue';
import Flex from './Flex.vue';

interface Props {
  themeClasses?: string;
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  themeClasses: 'ghost',
  showLabel: false,
});

// Get theme context
const { isDark, toggleDarkMode } = useTheme();
</script>


