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
import { useThemeSwitch } from '../composables';
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

// Use the modern theme system
const { isDark, toggleDarkMode } = useThemeSwitch();
</script>


